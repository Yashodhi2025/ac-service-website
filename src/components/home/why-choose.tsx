"use client";

import Image from "next/image";
import { ClipboardCheck, Focus, Handshake, Layers3, MessagesSquare, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { companyBenefits } from "@/data/company-content";
import { getWhatsAppUrl } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { buildTeamTalkWhatsAppMessage } from "@/i18n/whatsapp";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "@/components/ui/site-ui.module.css";

const icons = {
  technical: Wrench,
  solutions: Layers3,
  detail: Focus,
  communication: MessagesSquare,
  customer: Handshake,
  support: ClipboardCheck,
};

export function WhyChoose() {
  const rootRef = useRef<HTMLElement>(null);
  const { messages } = useLanguage();

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
          const photoFrame = root.querySelector<HTMLElement>("[data-why-photo-frame]");
          const photoParallax = root.querySelector<HTMLElement>("[data-why-photo-parallax]");
          const caption = root.querySelector<HTMLElement>("[data-why-caption]");
          const eyebrow = root.querySelector<HTMLElement>("[data-why-eyebrow]");
          const title = root.querySelector<HTMLElement>("[data-why-title]");
          const lead = root.querySelector<HTMLElement>("[data-why-lead]");
          const benefits = root.querySelectorAll<HTMLElement>("[data-why-benefit]");
          const benefitIcons = root.querySelectorAll<HTMLElement>("[data-why-benefit-icon]");
          const cta = root.querySelector<HTMLElement>("[data-why-cta]");

          if (photoFrame) {
            gsap.from(photoFrame, {
              clipPath: "inset(10% 0% 0% 0% round 1.5rem 1.5rem 5rem 1.5rem)",
              duration: isDesktop ? 0.95 : 0.72,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: photoFrame, start: "top 88%", once: true },
            });
          }

          if (photoParallax) {
            gsap.from(photoParallax, {
              scale: isDesktop ? 1.08 : 1.05,
              duration: isDesktop ? 1.1 : 0.8,
              ease: "expo.out",
              clearProps: "scale",
              scrollTrigger: { trigger: photoFrame ?? photoParallax, start: "top 88%", once: true },
            });

            gsap.fromTo(
              photoParallax,
              { yPercent: isDesktop ? -5 : -2.5 },
              {
                yPercent: isDesktop ? 5 : 2.5,
                ease: "none",
                scrollTrigger: {
                  trigger: photoFrame ?? photoParallax,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: isDesktop ? 0.65 : 0.45,
                },
              }
            );
          }

          if (caption) {
            gsap.from(caption, {
              y: 10,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: caption, start: "top 95%", once: true },
            });
          }

          const headTl = gsap.timeline({
            scrollTrigger: { trigger: title ?? root, start: "top 88%", once: true },
          });
          if (eyebrow) {
            headTl.from(eyebrow, { x: -14, opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" }, 0);
          }
          if (title) {
            headTl.from(
              title,
              { clipPath: "inset(0% 0% 100% 0%)", y: 18, duration: 0.8, ease: "expo.out", clearProps: "clipPath,transform" },
              0.06
            );
          }
          if (lead) {
            headTl.from(lead, { y: 12, opacity: 0, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" }, 0.18);
          }

          if (benefits.length) {
            gsap.from(benefits, {
              y: 18,
              opacity: 0,
              duration: 0.62,
              stagger: isDesktop ? 0.08 : 0.06,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: benefits[0], start: "top 90%", once: true },
            });
          }

          if (benefitIcons.length && isDesktop) {
            gsap.from(benefitIcons, {
              scale: 0.8,
              rotation: -12,
              duration: 0.55,
              stagger: 0.08,
              ease: "back.out(1.4)",
              clearProps: "transform",
              scrollTrigger: { trigger: benefits[0], start: "top 90%", once: true },
            });
          }

          if (cta) {
            gsap.from(cta, {
              y: 14,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: cta, start: "top 94%", once: true },
            });
          }
        } catch {
          // Keep section visible if animation fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="why-choose-ecme"
      className={`${styles.section} ${styles.white}`}
      aria-labelledby="why-heading"
      data-tone-section="why-choose"
    >
      <div className={`page-container ${styles.split}`}>
        <figure>
          <div className={styles.photo} data-why-photo-frame>
            <div className={styles.photoParallax} data-why-photo-parallax>
              <Image
                src="/images/technician-illustration.webp"
                alt={messages.whyChoose.photoAlt}
                fill
                sizes="(min-width:1024px) 43vw, 92vw"
              />
            </div>
          </div>
          <figcaption className={styles.caption} data-why-caption>
            {messages.whyChoose.photoCaption}
          </figcaption>
        </figure>
        <div>
          <div>
            <p className={styles.eyebrow} data-why-eyebrow>{messages.whyChoose.eyebrow}</p>
            <h2 id="why-heading" className={styles.title} data-why-title>
              {messages.whyChoose.title}
            </h2>
            <p className={styles.lead} data-why-lead>
              {messages.whyChoose.lead}
            </p>
          </div>
          <ul className={styles.benefits}>
            {companyBenefits.map((benefit, index) => {
              const Icon = icons[benefit.icon];
              const localized = messages.whyChoose.benefits[index] ?? benefit;
              return (
                <li key={benefit.icon} className={styles.benefit} data-why-benefit>
                  <span className={styles.benefitIcon} data-why-benefit-icon>
                    <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{localized.title}</h3>
                    <p>{localized.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.actions} data-why-cta>
            <a
              className={styles.button}
              href={getWhatsAppUrl(buildTeamTalkWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon width={21} height={21} />
              {messages.whyChoose.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
