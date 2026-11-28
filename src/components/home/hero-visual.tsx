"use client";

import Image from "next/image";
import { Snowflake } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import acUnit from "../../../public/images/ac-unit.png";
import { VaporField } from "@/components/animations/vapor-field";
import styles from "./hero.module.css";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLImageElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    function syncVisibility() { setTabVisible(!document.hidden); }
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  const floating = visible && tabVisible && !reducedMotion;

  return (
    <div ref={ref} className={styles.visual} data-hero-visual>
      <div className={styles.halo} data-hero-halo aria-hidden="true" />
      <div className={styles.orbit} data-hero-orbit aria-hidden="true" />
      <div className={styles.unitParallax} data-hero-unit-parallax>
        <motion.div
          className={styles.floatingUnit}
          initial={false}
          animate={{ y: floating ? [0, -7, 0] : 0 }}
          transition={floating
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }}
        >
          <VaporField direction="down" unitRef={unitRef} />
          <Image
            ref={unitRef}
            src={acUnit}
            alt="White wall-mounted air conditioner with open cooling vents"
            className={styles.unitImage}
            sizes="(min-width: 1280px) 580px, (min-width: 1024px) 46vw, (min-width: 640px) 560px, 92vw"
            preload
          />
        </motion.div>
      </div>
      <div className={styles.temperatureWrap} data-hero-temp-wrap>
        <div className={styles.temperature}>
          <span className={styles.temperatureIcon}><Snowflake size={20} strokeWidth={1.5} aria-hidden="true" /></span>
          <div>
            <p className={styles.temperatureLabel}>Comfort setting</p>
            <p className={styles.temperatureValue}>22<span>°C</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
