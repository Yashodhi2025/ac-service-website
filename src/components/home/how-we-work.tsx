"use client";

import Link from "next/link";
import { ClipboardCheck, Gauge, MessagesSquare, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { company, getWhatsAppUrl } from "@/config/site";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
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
    ensureGsap();

    const steps = root.querySelectorAll<HTMLElement>("[data-work-step]");
    const rings = root.querySelectorAll<HTMLElement>("[data-work-ring]");
    const fills = root.querySelectorAll<HTMLElement>("[data-work-fill]");
    const heading = root.querySelector<HTMLElement>("[data-work-heading]");
    const title = root.querySelector<HTMLElement>("[data-work-title]");
    const media = gsap.matchMedia(root);

    media.add(
      {
        desktop: MOTION_QUERIES.desktop,
        mobile: MOTION_QUERIES.mobile,
        reduced: MOTION_QUERIES.reduced,
      },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        if (context.conditions?.reduced) {
          gsap.set(fills, { scaleX: 1, scaleY: 1 });
          return;
        }

        try {
          if (heading) {
            gsap.from(heading, {
              y: 16,
              opacity: 0,
              duration: 0.72,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: heading, start: "top 90%", once: true },
            });
          }

          if (title) {
            gsap.from(title, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.78,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: title, start: "top 90%", once: true },
            });
          }

          if (desktop) {
            gsap.from(steps, {
              y: 20,
              opacity: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: list, start: "top 88%", once: true },
            });
          } else {
            steps.forEach((step, index) => {
              gsap.from(step, {
                y: 16,
                opacity: 0,
                duration: 0.62,
                delay: index * 0.05,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: step, start: "top 92%", once: true },
              });
            });
          }

          gsap.set(fills, {
            transformOrigin: desktop ? "left center" : "center top",
            scaleX: desktop ? 0 : 1,
            scaleY: desktop ? 1 : 0,
          });

          const progressTl = gsap.timeline({
            scrollTrigger: {
              trigger: list,
              start: "clamp(top 84%)",
              // Clamp to the end of the page so the last step can always be reached.
              end: "clamp(bottom 46%)",
              scrub: desktop ? 0.55 : 0.4,
              invalidateOnRefresh: true,
            },
          });

          // Coordinate each step ring highlight seamlessly with the track progression
          rings.forEach((ring, index) => {
            const startAt = index * 0.95;
            progressTl.fromTo(
              ring,
              {
                borderColor: "rgb(0 199 232 / 28%)",
                boxShadow: "0 0 0 6px var(--work-bg, #eaf8fc), 0 0 0 rgb(0 199 232 / 0%)",
              },
              {
                borderColor: "rgb(0 199 232 / 85%)",
                boxShadow: "0 0 0 6px var(--work-bg, #eaf8fc), 0 8px 26px rgb(0 199 232 / 20%)",
                duration: 0.45,
                ease: "power1.out",
              },
              startAt
            );

            const fill = fills[index];
            if (fill) {
              progressTl.to(
                fill,
                { scaleX: 1, scaleY: 1, duration: 0.95, ease: "none" },
                startAt + 0.1
              );
            }
          });
        } catch {
          gsap.set(fills, { scaleX: 1, scaleY: 1 });
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="how-we-work" className={styles.section} aria-labelledby="work-heading" data-tone-section="how-we-work">
      <div className="page-container">
        <div className={styles.heading} data-work-heading>
          <p className={styles.eyebrow}>How We Work</p>
          <h2 id="work-heading" className={styles.title} data-work-title>Comfort in Four Simple Steps</h2>
        </div>
        <ol ref={listRef} className={styles.timeline} role="list">
          {workSteps.map(({ title, description, Icon }, index) => (
            <li key={title} className={styles.step} data-work-step>
              {index < workSteps.length - 1 && (
                <span className={styles.track} aria-hidden="true">
                  <span className={styles.fill} data-work-fill />
                </span>
              )}
              <div className={styles.iconRing} data-work-ring>
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
