"use client";

import Link from "next/link";
import { ClipboardCheck, Gauge, MessagesSquare, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { company, getWhatsAppUrl } from "@/config/site";
import styles from "./how-we-work.module.css";

const workSteps = [
  {
    title: "Request a Service",
    description: "Contact us or send a WhatsApp inquiry.",
    Icon: MessagesSquare,
  },
  {
    title: "Technician Assessment",
    description: "Inspect the A/C and explain the required work.",
    Icon: ClipboardCheck,
  },
  {
    title: "Expert Service",
    description: "Carry out the agreed installation, repair or maintenance.",
    Icon: Wrench,
  },
  {
    title: "Final Testing",
    description: "Check performance and explain the completed work.",
    Icon: Gauge,
  },
];

export function HowWeWork() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const inquiryUrl = getWhatsAppUrl(`Hello ${company.name}, I'd like to request an A/C service.`);

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;
    gsap.registerPlugin(ScrollTrigger);

    const steps = root.querySelectorAll<HTMLElement>("[data-work-step]");
    const fills = root.querySelectorAll<HTMLElement>("[data-work-fill]");
    const heading = root.querySelector<HTMLElement>("[data-work-heading]");
    const media = gsap.matchMedia(root);

    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const desktop = Boolean(context.conditions?.desktop);
      if (context.conditions?.reduced) {
        gsap.set(fills, { scaleX: 1, scaleY: 1 });
        return;
      }

      if (heading) {
        gsap.from(heading, {
          y: 18,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: heading, start: "top 92%", once: true },
        });
      }

      if (desktop) {
        gsap.from(steps, {
          y: 22,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: list, start: "top 90%", once: true },
        });
      } else {
        steps.forEach((step, index) => {
          gsap.from(step, {
            y: 18,
            autoAlpha: 0,
            duration: 0.7,
            delay: index * 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: step, start: "top 92%", once: true },
          });
        });
      }

      gsap.set(fills, {
        transformOrigin: desktop ? "left center" : "center top",
        scaleX: desktop ? 0 : 1,
        scaleY: desktop ? 1 : 0,
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: "clamp(top 85%)",
          // Clamp to the end of the page so the last step can always be reached.
          end: "clamp(bottom 45%)",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(fills, { scaleX: 1, scaleY: 1, duration: 1, stagger: 1, ease: "none" });
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="how-we-work" className={styles.section} aria-labelledby="work-heading">
      <div className="page-container">
        <div className={styles.heading} data-work-heading>
          <p className={styles.eyebrow}>How We Work</p>
          <h2 id="work-heading" className={styles.title}>Comfort in Four Simple Steps</h2>
        </div>
        <ol ref={listRef} className={styles.timeline} role="list">
          {workSteps.map(({ title, description, Icon }, index) => (
            <li key={title} className={styles.step} data-work-step>
              {index < workSteps.length - 1 && (
                <span className={styles.track} aria-hidden="true">
                  <span className={styles.fill} data-work-fill />
                </span>
              )}
              <div className={styles.iconRing}>
                <span className={styles.iconCircle}><Icon size={40} strokeWidth={1.4} aria-hidden="true" /></span>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.stepCopy}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.description}>
                  {index === 0 ? (
                    <><Link href="/contact">Contact us</Link> or send a <a href={inquiryUrl} target="_blank" rel="noopener noreferrer">WhatsApp inquiry</a>.</>
                  ) : description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
