"use client";

import { gsap } from "gsap";
import { useEffect, useId, useRef } from "react";
import styles from "./airflow.module.css";

const streams = [
  "M80 8 C70 85 40 110 60 175 S140 260 90 335",
  "M180 8 C165 80 135 125 170 185 S240 260 200 335",
  "M290 8 C280 90 250 125 285 190 S350 265 310 335",
  "M400 8 C395 90 370 130 410 190 S470 265 440 335",
  "M510 8 C515 90 500 130 535 185 S590 260 565 335",
];

export function Airflow() {
  const rootRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia(root);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(root.querySelectorAll("[data-airflow-stream]"), {
        strokeDashoffset: "-=420",
        duration: 4.8,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      let visible = false;
      function syncPlayback() {
        if (visible && !document.hidden) tween.play();
        else tween.pause();
      }

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      });
      observer.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <svg ref={rootRef} className={styles.airflow} viewBox="0 0 620 350" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-electric-cyan)" stopOpacity="0.75" />
          <stop offset="0.6" stopColor="var(--color-electric-cyan)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--color-electric-cyan)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {streams.map((path, index) => (
        <g key={path}>
          <path d={path} stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.24" />
          <path
            data-airflow-stream
            d={path}
            pathLength="420"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="65 355"
            strokeDashoffset={index * 65}
          />
        </g>
      ))}
    </svg>
  );
}
