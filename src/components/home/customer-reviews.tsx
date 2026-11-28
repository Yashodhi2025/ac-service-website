"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { gsap } from "gsap";
import { customerReviews } from "@/data/company-content";
import type { Review } from "@/data/company-content";
import { contactLinks, getWhatsAppUrl } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { buildFeedbackWhatsAppMessage } from "@/i18n/whatsapp";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";
import css from "./reviews.module.css";

export function CustomerReviews({ items = customerReviews }: { items?: Review[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const rootRef = useRef<HTMLElement>(null);
  const { messages } = useLanguage();
  const current = items.length ? items[index % items.length] : undefined;

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
          const intro = root.querySelector<HTMLElement>("[data-rev-intro]");
          const card = root.querySelector<HTMLElement>("[data-rev-card]");
          const quote = root.querySelector<HTMLElement>("[data-rev-quote]");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 86%", once: true },
          });

          if (intro) {
            tl.from(
              intro,
              {
                x: isDesktop ? -22 : 0,
                y: isDesktop ? 0 : 14,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0
            );
          }

          if (card) {
            tl.from(
              card,
              {
                x: isDesktop ? 22 : 0,
                y: isDesktop ? 0 : 14,
                opacity: 0,
                duration: 0.72,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0.12
            );
          }

          if (quote) {
            tl.from(
              quote,
              { scale: 0.8, opacity: 0, duration: 0.55, ease: "back.out(1.4)", clearProps: "transform,opacity" },
              0.2
            );
          }
        } catch {
          // Leave reviews visible if animation setup fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${styles.white}`}
      aria-labelledby={`${id}-heading`}
      data-tone-section="reviews"
    >
      <div className={`page-container ${styles.twoColumns}`}>
        <div data-rev-intro>
          <p className={styles.eyebrow}>{messages.reviews.eyebrow}</p>
          <h2 id={`${id}-heading`} className={styles.title}>
            {messages.reviews.titleLine1}<br />{messages.reviews.titleLine2}
          </h2>
          <p className={styles.lead}>
            {messages.reviews.lead}
          </p>
          <div className={styles.actions}>
            <a className={styles.outlineButton} href={contactLinks.facebook} target="_blank" rel="noopener noreferrer">
              {messages.reviews.facebookButton}
            </a>
          </div>
        </div>
        <div
          className={css.review}
          role="region"
          aria-roledescription={current ? "carousel" : undefined}
          aria-label={messages.reviews.regionAria}
          data-rev-card
        >
          <Quote size={42} strokeWidth={1} aria-hidden="true" className={css.quoteIcon} data-rev-quote />
          {current ? (
            <>
              <div id={`${id}-slide`} aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -6 }}
                    transition={{ duration: reduce ? 0 : 0.22 }}
                  >
                    {current.rating !== undefined && (
                      <div className={css.stars} aria-label={`${current.rating} ${messages.reviews.starsSuffix}`}>
                        {Array.from({ length: Math.max(0, Math.min(5, Math.round(current.rating))) }, (_, i) => (
                          <Star key={i} size={17} fill="currentColor" aria-hidden="true" />
                        ))}
                      </div>
                    )}
                    <blockquote>{current.quote}</blockquote>
                    <p className={css.author}>
                      {current.name}
                      {current.service && <span>{current.service}</span>}
                    </p>
                    {current.sourceUrl ? (
                      <a className={styles.textLink} href={current.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {current.sourceLabel}
                      </a>
                    ) : (
                      <p className={styles.small}>{current.sourceLabel}</p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              {items.length > 1 && (
                <div className={css.controls}>
                  <button
                    type="button"
                    aria-label={messages.reviews.previousReview}
                    aria-controls={`${id}-slide`}
                    onClick={() => setIndex((index + items.length - 1) % items.length)}
                  >
                    <ChevronLeft />
                  </button>
                  <span>{(index % items.length) + 1} / {items.length}</span>
                  <button
                    type="button"
                    aria-label={messages.reviews.nextReview}
                    aria-controls={`${id}-slide`}
                    onClick={() => setIndex((index + 1) % items.length)}
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h3>{messages.reviews.emptyTitle}</h3>
              <p>{messages.reviews.emptyBody}</p>
              <a
                className={styles.textLink}
                href={getWhatsAppUrl(buildFeedbackWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                {messages.reviews.shareFeedback}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
