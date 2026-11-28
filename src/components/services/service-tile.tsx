"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ExpertiseService } from "@/config/expertise";
import { getServiceHref } from "@/data/services";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./expertise.module.css";

export function ServiceTile({ service }: { service: ExpertiseService }) {
  const { messages } = useLanguage();
  const localized = messages.expertise.tiles[service.id];
  const titleId = `expertise-${service.id}-title`;
  const descriptionId = `expertise-${service.id}-description`;

  return (
    <li className={`${styles.tile} ${styles[service.layout]}`} data-exp-tile>
      <Link
        href={getServiceHref(service.id)}
        className={styles.tileLink}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className={styles.imageWrap} data-exp-photo-wrap>
          <div className={styles.imageStage} data-exp-photo>
            <Image
              src={service.image}
              alt={localized?.imageAlt ?? service.imageAlt}
              fill
              sizes={service.sizes}
              className={styles.image}
            />
          </div>
        </div>
        <span className={styles.scrim} aria-hidden="true" />
        <div className={styles.tileContent}>
          <h3 id={titleId} className={styles.tileTitle} data-exp-tile-title>
            {localized?.name ?? service.name}
          </h3>
          <p id={descriptionId} className={styles.tileDescription} data-exp-tile-desc>
            {localized?.description ?? service.description}
          </p>
        </div>
        <span className={styles.tileArrow} data-exp-tile-arrow aria-hidden="true">
          <ArrowUpRight size={21} strokeWidth={1.7} />
        </span>
      </Link>
    </li>
  );
}
