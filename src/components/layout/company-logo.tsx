"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./header.module.css";

export function CompanyLogo() {
  const { messages } = useLanguage();

  return (
    <Link href="/" className={styles.logo} aria-label={messages.nav.logoAria}>
      <Image
        src={company.logo}
        alt={messages.footer.logoAlt}
        width={128}
        height={128}
        className={styles.logoImage}
        sizes="64px"
        loading="eager"
      />
      <span>
        <span className={styles.wordmark}>{company.wordmark}</span>
        <span className={styles.descriptor}>{company.descriptor}</span>
      </span>
    </Link>
  );
}
