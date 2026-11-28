"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export default function NotFound() {
  const { messages } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1} className={`${styles.section} page-container`}>
      <p className={styles.eyebrow}>{messages.notFound.eyebrow}</p>
      <h1 className={styles.title}>{messages.notFound.title}</h1>
      <p className={styles.lead}>{messages.notFound.lead}</p>
      <div className={styles.actions}>
        <Link className={styles.button} href="/services">
          {messages.common.exploreServices}
        </Link>
        <Link className={styles.outlineButton} href="/">
          {messages.notFound.returnHome}
        </Link>
      </div>
    </main>
  );
}
