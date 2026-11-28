"use client";

import { useId, useState } from "react";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useLanguage } from "@/i18n/language-provider";
import ui from "@/components/ui/site-ui.module.css";
import styles from "@/components/ui/faq.module.css";

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const id = useId();
  const { messages } = useLanguage();

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];
  const normalized = query.trim().toLowerCase();
  const filtered = faqs.filter((f) => {
    if (category !== "All" && f.category !== category) return false;
    if (!normalized) return true;
    const localized = messages.faqs[f.id];
    const haystack = `${f.question} ${f.answer} ${localized?.question ?? ""} ${localized?.answer ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });

  return (
    <div>
      <div className={styles.controls}>
        <label className={styles.search} htmlFor={id}>
          {messages.faqExplorer.searchLabel}
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={messages.faqExplorer.searchPlaceholder}
          />
        </label>
        <div className={ui.chips} aria-label={messages.faqExplorer.categoriesAria}>
          {categories.map((c) => (
            <button
              type="button"
              className={ui.chip}
              aria-pressed={category === c}
              key={c}
              onClick={() => setCategory(c)}
            >
              {messages.faqExplorer.categories[c] ?? c}
            </button>
          ))}
        </div>
      </div>
      <p role="status" className={styles.count}>
        {filtered.length}{" "}
        {filtered.length === 1 ? messages.faqExplorer.countSingle : messages.faqExplorer.countPlural}
      </p>
      {filtered.length ? (
        <FaqAccordion items={filtered} />
      ) : (
        <div className={ui.empty}>
          <h3>{messages.faqExplorer.emptyTitle}</h3>
          <p>{messages.faqExplorer.emptyBody}</p>
          <button
            type="button"
            className={ui.outlineButton}
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            {messages.faqExplorer.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
