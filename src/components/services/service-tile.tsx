import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ExpertiseService } from "@/config/expertise";
import styles from "./expertise.module.css";

export function ServiceTile({ service }: { service: ExpertiseService }) {
  const titleId = `expertise-${service.id}-title`;
  const descriptionId = `expertise-${service.id}-description`;

  return (
    <li className={`${styles.tile} ${styles[service.layout]}`} data-scroll-reveal>
      <Link
        href={`/services#${service.id}`}
        className={styles.tileLink}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className={styles.imageWrap}>
          <Image src={service.image} alt={service.imageAlt} fill sizes={service.sizes} className={styles.image} />
        </div>
        <span className={styles.scrim} aria-hidden="true" />
        <div className={styles.tileContent}>
          <h3 id={titleId} className={styles.tileTitle}>{service.name}</h3>
          <p id={descriptionId} className={styles.tileDescription}>{service.description}</p>
        </div>
        <span className={styles.tileArrow} aria-hidden="true"><ArrowUpRight size={21} strokeWidth={1.7} /></span>
      </Link>
    </li>
  );
}
