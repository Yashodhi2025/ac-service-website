"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { projects } from "@/data/company-content";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";

const illustrativeAreas = [
  { image: "installation", label: "Installation" },
  { image: "full-service", label: "Servicing" },
  { image: "pcb-repair", label: "PCB repair" },
] as const;

export function RecentProjects() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    ensureGsap();

    const media = gsap.matchMedia(root);
    media.add(
      {
        desktop: MOTION_QUERIES.desktop,
        mobile: MOTION_QUERIES.mobile,
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.desktop);

        try {
          const eyebrow = root.querySelector<HTMLElement>("[data-proj-eyebrow]");
          const title = root.querySelector<HTMLElement>("[data-proj-title]");
          const explore = root.querySelector<HTMLElement>("[data-proj-explore]");
          const cards = root.querySelectorAll<HTMLElement>("[data-proj-card]");

          const headTl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 86%", once: true },
          });
          if (eyebrow) headTl.from(eyebrow, { x: -16, opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" }, 0);
          if (title) headTl.from(title, { clipPath: "inset(0% 0% 100% 0%)", y: 18, duration: 0.78, ease: "expo.out", clearProps: "clipPath,transform" }, 0.06);
          if (explore) headTl.from(explore, { x: isDesktop ? 16 : 0, y: isDesktop ? 0 : 10, opacity: 0, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity" }, 0.2);

          // Staggered image-mask reveals on gallery cards
          if (cards.length) {
            cards.forEach((card, index) => {
              const mask = card.querySelector<HTMLElement>("[data-proj-mask]");
              const imageStage = card.querySelector<HTMLElement>("[data-proj-image]");
              const label = card.querySelector<HTMLElement>("[data-proj-label]");

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: isDesktop ? cards[0] : card,
                  start: "top 88%",
                  once: true,
                },
                delay: isDesktop ? index * 0.13 : 0,
              });

              if (mask) {
                tl.from(
                  mask,
                  {
                    clipPath: "inset(16% 0% 0% 0% round 1rem)",
                    y: isDesktop ? 18 : 12,
                    duration: isDesktop ? 0.88 : 0.65,
                    ease: "expo.out",
                    clearProps: "clipPath,transform",
                  },
                  0
                );
              }

              if (imageStage) {
                tl.from(
                  imageStage,
                  {
                    scale: isDesktop ? 1.13 : 1.07,
                    duration: isDesktop ? 1.05 : 0.78,
                    ease: "expo.out",
                    clearProps: "transform",
                  },
                  0
                );
              }

              if (label) {
                tl.from(
                  label,
                  { y: 10, opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" },
                  0.24
                );
              }
            });
          }
        } catch {
          // Keep projects gallery visible if animation fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${styles.soft}`}
      aria-labelledby="recent-projects-heading"
      data-tone-section="projects"
    >
      <div className="page-container">
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow} data-proj-eyebrow>Recent Projects</p>
            <h2 id="recent-projects-heading" className={styles.title} data-proj-title>
              The details make the difference.
            </h2>
          </div>
          <Link href="/projects" className={styles.outlineButton} data-proj-explore>
            Explore Projects
          </Link>
        </div>
        <ProjectGallery preview />
        {!projects.length && (
          <div>
            <p className={styles.small}>
              Explore our service areas through illustrative photography below. These images are not completed ECME projects.
            </p>
            <div className={styles.editorial}>
              {illustrativeAreas.map((item) => (
                <figure key={item.image} data-proj-card>
                  <div className={styles.editorialImage} data-proj-mask>
                    <div className={styles.editorialStage} data-proj-image>
                      <Image
                        src={`/images/services/${item.image}.webp`}
                        alt={`Illustrative ${item.label.toLowerCase()} service photography`}
                        fill
                        sizes="(min-width:640px) 40vw, 92vw"
                      />
                    </div>
                  </div>
                  <figcaption className={styles.label} data-proj-label>
                    {item.label} · Illustration
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
