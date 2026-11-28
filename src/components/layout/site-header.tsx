"use client";

import { CompanyLogo } from "./company-logo";
import { ContactBar } from "./contact-bar";
import { MainNavigation } from "./main-navigation";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./header.module.css";

export function SiteHeader() {
  const { messages } = useLanguage();

  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skipLink}>{messages.common.skipToContent}</a>
      <ContactBar />
      <MainNavigation logo={<CompanyLogo />} />
    </header>
  );
}
