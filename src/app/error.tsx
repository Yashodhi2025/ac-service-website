"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { messages } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1} className={`${styles.section} page-container`}>
      <p className={styles.eyebrow}>{messages.errorPage.eyebrow}</p>
      <h1 className={styles.title}>{messages.errorPage.title}</h1>
      <p className={styles.lead}>{messages.errorPage.lead}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={reset}>
          {messages.errorPage.tryAgain}
        </button>
        <Link className={styles.outlineButton} href="/contact">
          {messages.errorPage.contactEcme}
        </Link>
      </div>
    </main>
  );
}
