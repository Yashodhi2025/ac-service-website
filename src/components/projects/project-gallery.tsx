"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, FolderOpen, X } from "lucide-react";
import { projects as companyProjects, projectCategories } from "@/data/company-content";
import type { Project } from "@/data/company-content";
import { getWhatsAppUrl } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { buildProjectWhatsAppMessage } from "@/i18n/whatsapp";
import { BeforeAfter } from "./before-after";
import ui from "@/components/ui/site-ui.module.css";
import styles from "./projects.module.css";

function ProjectLightbox({
  project,
  onClose,
  onPrevious,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const title = useId();
  const { messages } = useLanguage();

  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const categoryLabel = messages.projectGallery.categories[project.category] ?? project.category;

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("input,select,textarea,[contenteditable=true]")) return;
        if (e.key === "ArrowLeft") onPrevious?.();
        if (e.key === "ArrowRight") onNext?.();
      }}
    >
      <div className={styles.dialogInner}>
        <div className={styles.dialogHeader}>
          <div>
            <p className={ui.small}>
              {categoryLabel}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h2 id={title}>{project.title}</h2>
          </div>
          <button
            className={styles.iconButton}
            type="button"
            onClick={onClose}
            aria-label={messages.projectGallery.closeViewer}
            autoFocus
          >
            <X size={22} />
          </button>
        </div>
        {project.comparison ? (
          <BeforeAfter {...project.comparison} />
        ) : (
          <div className={styles.lightboxImage}>
            <Image src={project.image} alt={project.imageAlt} fill sizes="90vw" />
          </div>
        )}
        <p className={ui.lead}>{project.description}</p>
        {(onPrevious || onNext) && (
          <div className={ui.actions}>
            <button
              className={styles.iconButton}
              type="button"
              onClick={onPrevious}
              aria-label={messages.projectGallery.previousProject}
            >
              <ChevronLeft />
            </button>
            <button
              className={styles.iconButton}
              type="button"
              onClick={onNext}
              aria-label={messages.projectGallery.nextProject}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

export function ProjectGallery({
  items = companyProjects,
  preview = false,
}: {
  items?: Project[];
  preview?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { messages } = useLanguage();

  const filtered = items
    .filter((p) => category === "All" || p.category === category)
    .slice(0, preview ? 3 : undefined);
  const index = filtered.findIndex((p) => p.id === active);
  const selected = filtered[index];
  const close = useCallback(() => setActive(null), []);
  const localizedCategory = messages.projectGallery.categories[category] ?? category;

  return (
    <div>
      {!preview && (
        <div className={ui.chips} aria-label={messages.projectGallery.categoriesAria}>
          {["All", ...projectCategories].map((c) => (
            <button
              key={c}
              className={ui.chip}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setActive(null);
              }}
            >
              {messages.projectGallery.categories[c] ?? c}
            </button>
          ))}
        </div>
      )}
      {filtered.length ? (
        <motion.div layout={!reduce} className={styles.gallery}>
          <AnimatePresence initial={false}>
            {filtered.map((p) => (
              <motion.article
                layout={!reduce}
                key={p.id}
                data-proj-card
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
              >
                <button
                  type="button"
                  className={styles.projectButton}
                  onClick={() => setActive(p.id)}
                  aria-label={`${messages.projectGallery.viewPrefix} ${p.title}`}
                >
                  <span className={styles.projectImage} data-proj-mask>
                    <span className={styles.projectStage} data-proj-image>
                      <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width:1024px) 45vw, 92vw" />
                    </span>
                  </span>
                  <span className={styles.projectCategory} data-proj-label>
                    {messages.projectGallery.categories[p.category] ?? p.category}
                    {p.location ? ` · ${p.location}` : ""}
                  </span>
                  <span className={styles.projectTitle}>{p.title}</span>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className={ui.empty} role="status">
          <FolderOpen size={36} strokeWidth={1.3} aria-hidden="true" />
          <h3>
            {category === "All"
              ? messages.projectGallery.emptyAllTitle
              : `${messages.projectGallery.emptyCategoryTitlePrefix} ${localizedCategory} ${messages.projectGallery.emptyCategoryTitleSuffix}`}
          </h3>
          <p>{items.length ? messages.projectGallery.emptyWithItems : messages.projectGallery.emptyNoItems}</p>
          <a
            className={ui.outlineButton}
            href={getWhatsAppUrl(buildProjectWhatsAppMessage(category))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.projectGallery.discussProject}
          </a>
        </div>
      )}
      {selected && (
        <ProjectLightbox
          project={selected}
          onClose={close}
          onPrevious={
            filtered.length > 1
              ? () => setActive(filtered[(index + filtered.length - 1) % filtered.length].id)
              : undefined
          }
          onNext={
            filtered.length > 1 ? () => setActive(filtered[(index + 1) % filtered.length].id) : undefined
          }
        />
      )}
    </div>
  );
}
