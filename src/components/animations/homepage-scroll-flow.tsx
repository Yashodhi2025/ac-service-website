"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";

export function HomepageScrollFlow({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

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
        const scrub = isDesktop ? 0.6 : 0.4;

        try {
          const problemFinder = root.querySelector<HTMLElement>('[data-tone-section="problem-finder"]');
          const howWeWork = root.querySelector<HTMLElement>('[data-tone-section="how-we-work"]');
          const whyChoose = root.querySelector<HTMLElement>('[data-tone-section="why-choose"]');
          const projects = root.querySelector<HTMLElement>('[data-tone-section="projects"]');
          const reviews = root.querySelector<HTMLElement>('[data-tone-section="reviews"]');
          const faq = root.querySelector<HTMLElement>('[data-tone-section="faq"]');
          const bookingCta = root.querySelector<HTMLElement>('[data-tone-section="booking-cta"]');

          // Shared CSS variables live on the root wrapper so bridges and adjacent sections stay 100% color-matched.
          if (problemFinder) {
            gsap.fromTo(
              root,
              { "--expertise-bg": "#eaf8fc", "--pf-bg": "#123b5d" },
              {
                "--expertise-bg": "#d3edf8",
                "--pf-bg": "#091b30",
                ease: "none",
                scrollTrigger: {
                  trigger: problemFinder,
                  start: "top 100%",
                  end: "top 30%",
                  scrub,
                },
              }
            );
          }

          if (howWeWork) {
            gsap.fromTo(
              root,
              { "--work-bg": "#d3edf8" },
              {
                "--work-bg": "#eaf8fc",
                ease: "none",
                scrollTrigger: {
                  trigger: howWeWork,
                  start: "top 96%",
                  end: "top 35%",
                  scrub,
                },
              }
            );
          }

          if (whyChoose) {
            gsap.fromTo(
              whyChoose,
              { "--section-bg": "#eef9fd" },
              {
                "--section-bg": "#ffffff",
                ease: "none",
                scrollTrigger: {
                  trigger: whyChoose,
                  start: "top 92%",
                  end: "top 35%",
                  scrub,
                },
              }
            );
          }

          if (projects) {
            gsap.fromTo(
              projects,
              { "--section-bg": "#f6fcfe" },
              {
                "--section-bg": "#eaf8fc",
                ease: "none",
                scrollTrigger: {
                  trigger: projects,
                  start: "top 92%",
                  end: "top 35%",
                  scrub,
                },
              }
            );
          }

          if (reviews) {
            gsap.fromTo(
              reviews,
              { "--section-bg": "#eef9fd" },
              {
                "--section-bg": "#ffffff",
                ease: "none",
                scrollTrigger: {
                  trigger: reviews,
                  start: "top 92%",
                  end: "top 35%",
                  scrub,
                },
              }
            );
          }

          if (faq && bookingCta) {
            gsap.fromTo(
              root,
              { "--faq-bg": "#eaf8fc", "--cta-bg": "#123b5d" },
              {
                "--faq-bg": "#d3edf8",
                "--cta-bg": "#091b30",
                ease: "none",
                scrollTrigger: {
                  trigger: bookingCta,
                  start: "top 100%",
                  end: "top 32%",
                  scrub,
                },
              }
            );
          }
        } catch {
          // Default CSS colors remain intact if ScrollTrigger fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
