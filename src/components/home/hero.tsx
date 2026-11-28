"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { Snowflake } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { BookServiceButton } from "@/components/layout/book-service-button";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import { HeroVisual } from "./hero-visual";
import { HeroWave } from "./hero-wave";
import styles from "./hero.module.css";

const MotionLink = motion.create(Link);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

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
          const revealItems = root.querySelectorAll<HTMLElement>("[data-hero-reveal]");
          const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
          const unitParallax = root.querySelector<HTMLElement>("[data-hero-unit-parallax]");
          const halo = root.querySelector<HTMLElement>("[data-hero-halo]");
          const orbit = root.querySelector<HTMLElement>("[data-hero-orbit]");
          const tempWrap = root.querySelector<HTMLElement>("[data-hero-temp-wrap]");
          const copyStage = root.querySelector<HTMLElement>("[data-hero-copy]");

          // Preserve clean immediate arrival (no blocking intro or loading screen)
          const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
          entrance
            .from(revealItems, {
              y: 18,
              opacity: 0,
              duration: 0.72,
              stagger: 0.09,
              clearProps: "transform,opacity",
            })
            .from(
              visual,
              { y: 16, opacity: 0, duration: 0.85, clearProps: "transform,opacity" },
              0.16
            );

          // Scroll-driven depth as Hero flows into Our Expertise through the curved wave
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: isDesktop ? 0.7 : 0.45,
              invalidateOnRefresh: true,
            },
          });

          if (isDesktop) {
            if (unitParallax) scrollTl.to(unitParallax, { yPercent: 10, scale: 1.06, ease: "none" }, 0);
            if (halo) scrollTl.to(halo, { yPercent: -6, scale: 1.12, ease: "none" }, 0);
            if (orbit) scrollTl.to(orbit, { rotation: 14, scale: 1.06, ease: "none" }, 0);
            if (tempWrap) scrollTl.to(tempWrap, { y: -28, ease: "none" }, 0);
            if (copyStage) scrollTl.to(copyStage, { y: -18, ease: "none" }, 0);
          } else {
            if (unitParallax) scrollTl.to(unitParallax, { yPercent: 5, scale: 1.025, ease: "none" }, 0);
            if (halo) scrollTl.to(halo, { scale: 1.05, ease: "none" }, 0);
          }
        } catch {
          // Leave hero fully visible if animation setup fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className={`page-container ${styles.inner}`}>
        <div className={styles.copy} data-hero-copy>
          <p className={styles.eyebrow} data-hero-reveal>
            <Snowflake size={17} strokeWidth={1.6} aria-hidden="true" />
            Your Comfort. Our Expertise.
          </p>
          <h1 id="hero-heading" className={styles.headline} data-hero-reveal>
            <span>Perfect Cooling.</span>{" "}
            <span className={styles.headlineAccent}>Professional Care.</span>
          </h1>
          <p className={styles.description} data-hero-reveal>
            From seamless A/C installation to expert repairs and regular
            maintenance, we keep your space comfortable, season after season.
          </p>
          <div className={styles.actions} data-hero-reveal>
            <BookServiceButton />
            <MotionLink
              href="/services"
              className={styles.exploreButton}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Explore Services
            </MotionLink>
          </div>
        </div>
        <HeroVisual />
      </div>
      <HeroWave />
    </section>
  );
}
