"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";

const previewFaqs = faqs.filter((f) => ["book", "confirmed", "normal-full", "cooling", "pcb"].includes(f.id));

export function FaqPreview() {
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
          const intro = root.querySelector<HTMLElement>("[data-faq-intro]");
          const items = root.querySelectorAll<HTMLElement>("[data-faq-list] > div > div");

          if (intro) {
            gsap.from(intro, {
              y: 16,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: intro, start: "top 88%", once: true },
            });
          }

          if (items.length) {
            gsap.from(items, {
              y: 16,
              opacity: 0,
              duration: 0.58,
              stagger: isDesktop ? 0.08 : 0.06,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: items[0], start: "top 90%", once: true },
            });
          }
        } catch {
          // Leave FAQ preview visible if animation setup fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${styles.section} ${styles.soft}`}
      style={{ background: "var(--faq-bg, var(--color-ice-white))" }}
      aria-labelledby="faq-preview-heading"
      data-tone-section="faq"
    >
      <div className={`page-container ${styles.twoColumns}`}>
        <div data-faq-intro>
          <p className={styles.eyebrow}>A little clarity</p>
          <h2 className={styles.title} id="faq-preview-heading">Questions before the cool air?</h2>
          <p className={styles.lead}>
            Understand the process before you request a visit. For equipment-specific advice, speak directly with ECME.
          </p>
          <div className={styles.actions}>
            <Link href="/faq" className={styles.outlineButton}>Explore All FAQs</Link>
          </div>
        </div>
        <div data-faq-list>
          <FaqAccordion items={previewFaqs} />
        </div>
      </div>
    </section>
  );
}
