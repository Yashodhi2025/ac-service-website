"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import type { Locale } from "@/i18n/types";
import styles from "./header.module.css";

const OPTIONS: Array<{ code: Locale; key: "sinhala" | "english" }> = [
  { code: "si", key: "sinhala" },
  { code: "en", key: "english" },
];

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { locale, setLocale, messages } = useLanguage();

  return (
    <div
      className={mobile ? styles.mobileLangRow : styles.langSwitcherWrap}
      role="group"
      aria-label={messages.languageSwitcher.ariaLabel}
    >
      {mobile && (
        <span className={styles.mobileLangLabel}>
          <Globe size={16} aria-hidden="true" />
          {messages.languageSwitcher.mobileLabel}
        </span>
      )}
      <div className={`${styles.langSwitcher} ${mobile ? styles.langSwitcherMobile : ""}`}>
        {OPTIONS.map((opt) => {
          const active = locale === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              className={`${styles.langOption} ${active ? styles.langOptionActive : ""}`}
              aria-pressed={active}
              data-lang-option={opt.code}
              onClick={() => setLocale(opt.code)}
            >
              {messages.languageSwitcher[opt.key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
