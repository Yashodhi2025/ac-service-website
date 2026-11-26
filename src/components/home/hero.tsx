"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { Snowflake } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { BookServiceButton } from "@/components/layout/book-service-button";
import { HeroVisual } from "./hero-visual";
import styles from "./hero.module.css";

const MotionLink = motion.create(Link);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia(root);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-reveal]", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 })
        .from("[data-hero-visual]", { y: 18, opacity: 0, duration: 1 }, 0.2);
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className={`page-container ${styles.inner}`}>
        <div className={styles.copy}>
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
    </section>
  );
}
