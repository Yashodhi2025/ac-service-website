"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "./section-tone-bridge.module.css";

// Matching SVG command structures so GSAP smoothly interpolates curve depth on scroll.
// Bottom extends to y=104 (beyond viewBox 100) to prevent any subpixel bottom seam.
const CURVE_START = "M0,18 C420,92 1020,-10 1440,54 L1440,104 L0,104 Z";
const CURVE_END = "M0,48 C480,32 960,32 1440,48 L1440,104 L0,104 Z";

const RIM_START = "M0,18 C420,92 1020,-10 1440,54";
const RIM_END = "M0,48 C480,32 960,32 1440,48";

type Props = {
  variant: "light-to-dark" | "dark-to-light";
  topVar?: string;
  bottomVar?: string;
};

export function SectionToneBridge({ variant, topVar, bottomVar }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rimRef = useRef<SVGPathElement>(null);
  const isLightToDark = variant === "light-to-dark";

  useEffect(() => {
    const el = ref.current;
    const path = pathRef.current;
    const rim = rimRef.current;
    if (!el || !path || !rim) return;
    ensureGsap();

    const media = gsap.matchMedia(el);
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
              trigger: el,
              start: "top 95%",
              end: "bottom 20%",
              scrub: isDesktop ? 0.6 : 0.4,
              invalidateOnRefresh: true,
            },
          });

          tl.to(path, { attr: { d: CURVE_END }, ease: "none" }, 0).to(
            rim,
            { attr: { d: RIM_END }, opacity: 0.16, ease: "none" },
            0
          );
        } catch {
          // Static bridge renders cleanly if animation setup fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  const bridgeStyle = {
    ...(topVar ? { "--bridge-top": topVar } : {}),
    ...(bottomVar ? { "--bridge-bottom": bottomVar } : {}),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={bridgeStyle}
      className={`${styles.bridge} ${isLightToDark ? styles.lightToDark : styles.darkToLight}`}
      aria-hidden="true"
      data-tone-bridge={variant}
    >
      <svg className={styles.svg} viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false">
        <path ref={pathRef} className={isLightToDark ? styles.fillDark : styles.fillLight} d={CURVE_START} />
        <path ref={rimRef} className={styles.rim} d={RIM_START} />
      </svg>
    </div>
  );
}
