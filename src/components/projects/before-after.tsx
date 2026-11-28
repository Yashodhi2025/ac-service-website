"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./projects.module.css";

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);
  const id = useId();
  const { messages } = useLanguage();

  return (
    <div>
      <div className={styles.comparison}>
        <Image src={before} alt={beforeAlt} fill sizes="(min-width:1024px) 75vw, 92vw" />
        <div className={styles.after} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={after} alt={afterAlt} fill sizes="(min-width:1024px) 75vw, 92vw" />
        </div>
        <span className={styles.beforeLabel}>{messages.projectGallery.beforeLabel}</span>
        <span className={styles.afterLabel}>{messages.projectGallery.afterLabel}</span>
        <span className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true" />
      </div>
      <label className={styles.slider} htmlFor={id}>
        {messages.projectGallery.compareLabel}
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          value={position}
          aria-valuetext={`${position}${messages.projectGallery.compareValueSuffix}`}
          onChange={(e) => setPosition(Number(e.target.value))}
        />
      </label>
    </div>
  );
}
