"use client";

import { AudioLines, Check, Droplets, Move, Power, Snowflake, Sparkles, Wind } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { acProblems } from "@/config/ac-problems";
import { company, getWhatsAppUrl } from "@/config/site";
import { ensureGsap, MOTION_QUERIES } from "@/lib/gsap";
import styles from "./ac-problem-finder.module.css";

const problemIcons = {
  cooling: Snowflake,
  water: Droplets,
  noise: AudioLines,
  power: Power,
  smell: Wind,
  moving: Move,
};

type ProblemId = (typeof acProblems)[number]["id"];

export function AcProblemFinder() {
  const [selectedId, setSelectedId] = useState<ProblemId>(acProblems[0].id);
  const groupId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const selected = acProblems.find((problem) => problem.id === selectedId) ?? acProblems[0];
  const SelectedIcon = problemIcons[selected.icon];
  const bookingMessage = `Hello ${company.name}, I'd like to book an A/C service for: ${selected.label}. Could you help me arrange an assessment?`;
  const bookingUrl = getWhatsAppUrl(bookingMessage);

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
          const headLeft = root.querySelector<HTMLElement>("[data-pf-head-left]");
          const headRight = root.querySelector<HTMLElement>("[data-pf-head-right]");
          const leftPanel = root.querySelector<HTMLElement>("[data-pf-panel='left']");
          const rightPanel = root.querySelector<HTMLElement>("[data-pf-panel='right']");
          const layout = root.querySelector<HTMLElement>("[data-pf-layout]");

          if (isDesktop) {
            // Desktop: scroll-linked opposite-direction convergence for headings and panels
            const headTl = gsap.timeline({
              scrollTrigger: {
                trigger: root,
                start: "top 88%",
                end: "top 46%",
                scrub: 0.55,
              },
            });
            if (headLeft) headTl.fromTo(headLeft, { x: -32, opacity: 0.25 }, { x: 0, opacity: 1, ease: "none" }, 0);
            if (headRight) headTl.fromTo(headRight, { x: 32, opacity: 0.25 }, { x: 0, opacity: 1, ease: "none" }, 0);

            const panelTl = gsap.timeline({
              scrollTrigger: {
                trigger: layout ?? root,
                start: "top 92%",
                end: "top 44%",
                scrub: 0.6,
              },
            });
            if (leftPanel) {
              panelTl.fromTo(
                leftPanel,
                { x: -56, opacity: 0.15 },
                { x: 0, opacity: 1, ease: "none" },
                0
              );
            }
            if (rightPanel) {
              panelTl.fromTo(
                rightPanel,
                { x: 56, opacity: 0.15 },
                { x: 0, opacity: 1, ease: "none" },
                0
              );
            }
          } else {
            // Mobile: lightweight opposite-direction panel reveals (contained inside overflow: clip)
            if (headLeft) {
              gsap.from(headLeft, {
                x: -16,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: headLeft, start: "top 90%", once: true },
              });
            }
            if (headRight) {
              gsap.from(headRight, {
                x: 16,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: headRight, start: "top 90%", once: true },
              });
            }
            if (leftPanel) {
              gsap.from(leftPanel, {
                x: -20,
                opacity: 0,
                duration: 0.65,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: leftPanel, start: "top 90%", once: true },
              });
            }
            if (rightPanel) {
              gsap.from(rightPanel, {
                x: 20,
                opacity: 0,
                duration: 0.65,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: rightPanel, start: "top 90%", once: true },
              });
            }
          }
        } catch {
          // Leave interactive panels fully visible if animation setup fails.
        }
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="ac-problem-finder" className={styles.section} aria-labelledby="ac-problems-heading" data-tone-section="problem-finder">
      <CoolingAtmosphere />
      <div className="page-container">
        <div className={styles.heading}>
          <div data-pf-head-left>
            <p className={styles.eyebrow}>Let’s find your next step</p>
            <h2 id="ac-problems-heading" className={styles.title}>What&apos;s Wrong With Your A/C?</h2>
          </div>
          <p className={styles.intro} data-pf-head-right>
            Tell us what you&apos;re noticing. We&apos;ll suggest a service to discuss
            with {company.shortName}.
          </p>
        </div>

        <div className={styles.layout} data-pf-layout>
          <fieldset className={styles.choices} data-pf-panel="left">
            <legend className={styles.legend}>Choose the closest match</legend>
            <div className={styles.optionGrid}>
              {acProblems.map((problem) => {
                const Icon = problemIcons[problem.icon];
                const active = problem.id === selectedId;

                return (
                  <label key={problem.id} className={styles.choice}>
                    <input
                      type="radio"
                      name={`ac-problem-${groupId}`}
                      value={problem.id}
                      checked={active}
                      onChange={() => setSelectedId(problem.id)}
                      className={styles.radio}
                      aria-controls={`${groupId}-suggestion`}
                    />
                    <motion.span
                      className={styles.option}
                      tabIndex={-1}
                      whileHover={reducedMotion ? undefined : { y: -2 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={styles.problemIcon} size={26} strokeWidth={1.5} aria-hidden="true" />
                      <span className={styles.optionLabel}>{problem.label}</span>
                      <motion.span
                        className={styles.selectionCheck}
                        initial={false}
                        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.75 }}
                        transition={{ duration: reducedMotion ? 0 : 0.18 }}
                        aria-hidden="true"
                      >
                        <Check size={13} strokeWidth={2.2} />
                      </motion.span>
                    </motion.span>
                  </label>
                );
              })}
            </div>
            <p className={styles.choiceNote}>A little guidance. A clearer conversation.</p>
          </fieldset>

          <div id={`${groupId}-suggestion`} className={styles.suggestion} data-pf-panel="right">
            <div className={styles.suggestionHeader}>
              <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
              Suggested service
            </div>
            <div className={styles.contentSlot}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.id}
                  initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
                  className={styles.content}
                >
                  <div className={styles.selectedProblem}>
                    <SelectedIcon size={19} strokeWidth={1.5} aria-hidden="true" />
                    <span>For: {selected.label}</span>
                  </div>
                  <h3 className={styles.serviceTitle}>{selected.service}</h3>
                  <p className={styles.explanation}>{selected.explanation}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className={styles.assessmentNote}>
              A service suggestion, not a confirmed diagnosis. {company.shortName} will
              need to assess your A/C to confirm the cause and appropriate work.
            </p>
            <motion.a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookingButton}
              aria-label={`Book help for ${selected.label} with ${company.shortName} on WhatsApp (opens in a new tab)`}
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.2 }}
            >
              <WhatsAppIcon width={22} height={22} />
              Book on WhatsApp
            </motion.a>
          </div>
        </div>
        <div className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
          {selected.label}. Suggested service: {selected.service}. {selected.explanation}
        </div>
      </div>
    </section>
  );
}
