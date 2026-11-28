"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { expertiseServices } from "@/config/expertise";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import { ServiceTile } from "./service-tile";
import styles from "./expertise.module.css";

export function Expertise() {
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
          const heading = root.querySelector<HTMLElement>("[data-exp-heading]");
          const eyebrow = root.querySelector<HTMLElement>("[data-exp-eyebrow]");
          const title = root.querySelector<HTMLElement>("[data-exp-title]");
          const desc = root.querySelector<HTMLElement>("[data-exp-desc]");
          const viewAll = root.querySelector<HTMLElement>("[data-exp-viewall]");
          const tiles = root.querySelectorAll<HTMLElement>("[data-exp-tile]");

          // Editorial heading entrance
          const headTl = gsap.timeline({
            scrollTrigger: {
              trigger: heading ?? root,
              start: "top 88%",
              once: true,
            },
          });

          if (eyebrow) {
            headTl.from(eyebrow, { x: -16, opacity: 0, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity" }, 0);
          }
          if (title) {
            headTl.from(
              title,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                y: 20,
                duration: 0.78,
                ease: "expo.out",
                clearProps: "clipPath,transform",
              },
              0.06
            );
          }
          if (desc) {
            headTl.from(desc, { y: 12, opacity: 0, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" }, 0.18);
          }
          if (viewAll) {
            headTl.from(
              viewAll,
              {
                x: isDesktop ? 18 : 0,
                y: isDesktop ? 0 : 10,
                opacity: 0,
                duration: 0.55,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0.22
            );
          }

          // Service images: staggered clip-path mask + subtle scale reveal
          if (isDesktop) {
            tiles.forEach((tile, index) => {
              const photoWrap = tile.querySelector<HTMLElement>("[data-exp-photo-wrap]");
              const photoStage = tile.querySelector<HTMLElement>("[data-exp-photo]");
              const tileTitle = tile.querySelector<HTMLElement>("[data-exp-tile-title]");
              const tileDesc = tile.querySelector<HTMLElement>("[data-exp-tile-desc]");
              const tileArrow = tile.querySelector<HTMLElement>("[data-exp-tile-arrow]");

              const tileTl = gsap.timeline({
                scrollTrigger: {
                  trigger: tile,
                  start: "top 90%",
                  once: true,
                },
                delay: (index % 3) * 0.08,
              });

              tileTl.from(
                tile,
                {
                  clipPath: "inset(12% 0% 0% 0% round 1.25rem)",
                  y: 20,
                  duration: 0.85,
                  ease: "expo.out",
                  clearProps: "clipPath,transform",
                },
                0
              );

              if (photoWrap) {
                tileTl.from(
                  photoWrap,
                  {
                    clipPath: "inset(0% 0% 14% 0%)",
                    duration: 0.9,
                    ease: "expo.out",
                    clearProps: "clipPath",
                  },
                  0
                );
              }

              if (photoStage) {
                tileTl.from(
                  photoStage,
                  {
                    scale: 1.14,
                    duration: 1.05,
                    ease: "expo.out",
                    clearProps: "transform",
                  },
                  0
                );
              }

              if (tileTitle) {
                tileTl.from(
                  tileTitle,
                  { y: 14, opacity: 0, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity" },
                  0.2
                );
              }
              if (tileDesc) {
                tileTl.from(
                  tileDesc,
                  { y: 12, opacity: 0, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity" },
                  0.28
                );
              }
              if (tileArrow) {
                tileTl.from(
                  tileArrow,
                  { scale: 0.72, rotation: -30, opacity: 0, duration: 0.5, ease: "back.out(1.4)", clearProps: "transform,opacity" },
                  0.28
                );
              }

              // Subtle vertical scroll parallax on service photography
              if (photoStage) {
                gsap.fromTo(
                  photoStage,
                  { yPercent: -3 },
                  {
                    yPercent: 3,
                    ease: "none",
                    scrollTrigger: {
                      trigger: tile,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.65,
                    },
                  }
                );
              }
            });
          } else {
            // Mobile: lightweight staggered clip-path & gentle scale
            tiles.forEach((tile) => {
              const photoStage = tile.querySelector<HTMLElement>("[data-exp-photo]");
              const tileTitle = tile.querySelector<HTMLElement>("[data-exp-tile-title]");
              const tileDesc = tile.querySelector<HTMLElement>("[data-exp-tile-desc]");

              const tileTl = gsap.timeline({
                scrollTrigger: {
                  trigger: tile,
                  start: "top 92%",
                  once: true,
                },
              });

              tileTl.from(
                tile,
                {
                  clipPath: "inset(8% 0% 0% 0% round 1.25rem)",
                  y: 14,
                  duration: 0.65,
                  ease: "power3.out",
                  clearProps: "clipPath,transform",
                },
                0
              );

              if (photoStage) {
                tileTl.from(
                  photoStage,
                  { scale: 1.08, duration: 0.8, ease: "power2.out", clearProps: "transform" },
                  0
                );
              }
              if (tileTitle) {
                tileTl.from(tileTitle, { y: 10, opacity: 0, duration: 0.48, ease: "power2.out", clearProps: "transform,opacity" }, 0.14);
              }
              if (tileDesc) {
                tileTl.from(tileDesc, { y: 8, opacity: 0, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity" }, 0.2);
              }
            });
          }
        } catch {
          // Keep all service tiles visible if animations fail.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="our-expertise" className={styles.section} aria-labelledby="expertise-heading" data-tone-section="expertise">
      <div className="page-container">
        <div className={styles.heading} data-exp-heading>
          <div className={styles.intro}>
            <p className={styles.eyebrow} data-exp-eyebrow>Complete A/C care</p>
            <h2 id="expertise-heading" className={styles.title} data-exp-title>Our Expertise</h2>
            <p className={styles.description} data-exp-desc>
              From the first installation to the finest repair, a little expertise
              makes all the difference to your comfort.
            </p>
          </div>
          <Link href="/services" className={styles.viewAll} data-exp-viewall>
            View All Services <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
        <ul className={styles.grid} aria-label="Our A/C services">
          {expertiseServices.map((service) => <ServiceTile key={service.id} service={service} />)}
        </ul>
      </div>
    </section>
  );
}
