"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";

export function FooterMotion({ children, className }: { children: ReactNode; className?: string }) {
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
        try {
          const hairline = root.querySelector<HTMLElement>("[data-footer-hairline]");
          const columns = root.querySelectorAll<HTMLElement>("[data-footer-col]");
          const bottom = root.querySelector<HTMLElement>("[data-footer-bottom]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 92%",
              once: true,
            },
          });

          if (hairline) {
            tl.from(
              hairline,
              { scaleX: 0, transformOrigin: "left center", duration: 0.85, ease: "expo.out", clearProps: "transform" },
              0
            );
          }

          if (columns.length) {
            tl.from(
              columns,
              {
                y: isDesktop ? 20 : 14,
                opacity: 0,
                duration: isDesktop ? 0.68 : 0.55,
                stagger: isDesktop ? 0.09 : 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0.1
            );
          }

          if (bottom) {
            tl.from(
              bottom,
              { y: 12, opacity: 0, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity" },
              0.32
            );
          }
        } catch {
          // Leave footer visible if animation fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
