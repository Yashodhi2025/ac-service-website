"use client";

import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { company, contactLinks, getWhatsAppUrl } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { buildServiceRequestWhatsAppMessage } from "@/i18n/whatsapp";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";

export function BookingCTA({ service }: { service?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const { messages } = useLanguage();
  // Always generate WhatsApp inquiry in natural Sinhala-English for ECME's team.
  const whatsappUrl = getWhatsAppUrl(buildServiceRequestWhatsAppMessage(service));

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
    <section
      ref={rootRef}
      className={styles.cta}
      aria-label={messages.bookingCta.ariaLabel}
      data-tone-section="booking-cta"
    >
      <CoolingAtmosphere variant="transition" />
      <div className={`page-container ${styles.ctaInner}`}>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow} data-cta-eyebrow>{messages.bookingCta.eyebrow}</p>
          <h2 className={styles.title} data-cta-title>{messages.bookingCta.title}</h2>
          <p data-cta-copy>{messages.bookingCta.body}</p>
        </div>
        <div>
          <div className={styles.actions} data-cta-actions>
            <a className={styles.button} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={21} height={21} />
              {messages.common.whatsappEcme}
            </a>
            <a className={styles.outlineButton} href={contactLinks.phone}>
              <Phone size={18} aria-hidden="true" />
              {company.phone}
            </a>
          </div>
          <p data-cta-sublink>
            <Link className="underline underline-offset-4" href={company.bookingHref}>
              {messages.bookingCta.guidedLink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
