"use client";

import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { company, contactLinks, getWhatsAppUrl } from "@/config/site";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";

export function BookingCTA({ service }: { service?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const message = service
    ? `Hello ${company.name}, I'd like to discuss ${service}.`
    : `Hello ${company.name}, I'd like to discuss an A/C service.`;

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
          const eyebrow = root.querySelector<HTMLElement>("[data-cta-eyebrow]");
          const title = root.querySelector<HTMLElement>("[data-cta-title]");
          const copy = root.querySelector<HTMLElement>("[data-cta-copy]");
          const actions = root.querySelector<HTMLElement>("[data-cta-actions]");
          const sublink = root.querySelector<HTMLElement>("[data-cta-sublink]");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 86%", once: true },
          });

          if (eyebrow) {
            tl.from(eyebrow, { x: -16, opacity: 0, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity" }, 0);
          }
          if (title) {
            tl.from(
              title,
              { clipPath: "inset(0% 0% 100% 0%)", y: 20, duration: 0.8, ease: "expo.out", clearProps: "clipPath,transform" },
              0.08
            );
          }
          if (copy) {
            tl.from(copy, { y: 14, opacity: 0, duration: 0.62, ease: "power3.out", clearProps: "transform,opacity" }, 0.2);
          }
          if (actions) {
            tl.from(
              actions,
              {
                x: isDesktop ? 24 : 0,
                y: isDesktop ? 0 : 14,
                opacity: 0,
                duration: 0.68,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
              0.24
            );
          }
          if (sublink) {
            tl.from(sublink, { y: 10, opacity: 0, duration: 0.52, ease: "power2.out", clearProps: "transform,opacity" }, 0.36);
          }
        } catch {
          // Leave CTA fully visible if animation fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.cta} aria-label="Get in touch" data-tone-section="booking-cta">
      <CoolingAtmosphere variant="transition" />
      <div className={`page-container ${styles.ctaInner}`}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow} data-cta-eyebrow>Let’s talk comfort</p>
          <h2 className={styles.title} data-cta-title>Your next step to better cooling.</h2>
          <p data-cta-copy>
            Tell ECME about your space and your A/C. We’ll discuss an assessment, the scope and the next steps.
          </p>
        </div>
        <div>
          <div className={styles.actions} data-cta-actions>
            <a className={styles.button} href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={21} height={21} />
              WhatsApp ECME
            </a>
            <a className={styles.outlineButton} href={contactLinks.phone}>
              <Phone size={18} aria-hidden="true" />
              {company.phone}
            </a>
          </div>
          <p data-cta-sublink>
            <Link className="underline underline-offset-4" href={company.bookingHref}>
              Prefer a guided request? Book a Service
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
