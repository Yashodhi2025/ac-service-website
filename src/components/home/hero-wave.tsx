"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "./hero-wave.module.css";

// Same command count/types (M, C, L, L, Z) so GSAP interpolates smoothly with zero extra plugins.
const FILL_START = "M0,74 C360,126 1040,4 1440,56 L1440,120 L0,120 Z";
const FILL_END = "M0,98 C440,78 1000,78 1440,98 L1440,120 L0,120 Z";

const LINE_START = "M0,74 C360,126 1040,4 1440,56";
const LINE_END = "M0,98 C440,78 1000,78 1440,98";

export function HeroWave() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    const line = lineRef.current;
    if (!wrap || !fill || !line) return;
    ensureGsap();

    const media = gsap.matchMedia(wrap);
    media.add(
      {
        desktop: MOTION_QUERIES.desktop,
        mobile: MOTION_QUERIES.mobile,
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.desktop);
        try {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "top 96%",
              end: "bottom 18%",
              scrub: isDesktop ? 0.6 : 0.4,
              invalidateOnRefresh: true,
            },
          });

          tl.to(fill, { attr: { d: FILL_END }, ease: "none" }, 0).to(
            line,
            { attr: { d: LINE_END }, opacity: 0.25, ease: "none" },
            0
          );
        } catch {
          // Static curve remains rendered if animation fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <div ref={wrapRef} className={styles.waveWrap} aria-hidden="true" data-hero-wave>
      <svg
        className={styles.svg}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="ecme-hero-wave-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(0 199 232 / 0.1)" />
            <stop offset="42%" stopColor="rgb(0 199 232 / 0.85)" />
            <stop offset="72%" stopColor="rgb(234 248 252 / 0.75)" />
            <stop offset="100%" stopColor="rgb(255 140 36 / 0.45)" />
          </linearGradient>
        </defs>
        <path ref={fillRef} className={styles.fillPath} d={FILL_START} />
        <path ref={lineRef} className={styles.accentLine} d={LINE_START} />
      </svg>
    </div>
  );
}
