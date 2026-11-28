"use client";

import { useEffect, useRef } from "react";
import styles from "./cooling-atmosphere.module.css";

/** Edge-only decoration: the hero retains its separate, vent-anchored Canvas effect. */
export function CoolingAtmosphere({ variant = "section" }: { variant?: "section" | "transition" | "footer" }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-cooling-layer]"));
    const visible = new Set<Element>();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncPlayback() {
      for (const layer of layers) {
        layer.dataset.coolingState = reduced.matches ? "static"
          : visible.has(layer) && !document.hidden ? "running" : "paused";
      }
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      syncPlayback();
    }, { threshold: 0.01 });
    layers.forEach((layer) => observer.observe(layer));
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <div ref={rootRef} className={`${styles.field} ${variant === "section" ? "" : styles[variant]}`} data-cooling-atmosphere={variant} aria-hidden="true">
      <div className={styles.mist} data-cooling-layer="mist" data-cooling-state="paused">
        <span className={styles.wisp} />
        <span className={styles.wisp} />
        <span className={styles.wisp} />
      </div>
      <div className={styles.particles} data-cooling-layer="particles" data-cooling-state="paused">
        {Array.from({ length: 6 }, (_, index) => <span className={styles.particle} key={index} />)}
      </div>
    </div>
  );
}
