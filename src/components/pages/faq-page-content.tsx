"use client";

import { PageHero } from "@/components/ui/page-hero";
import { FaqExplorer } from "@/components/faq/faq-explorer";
import { BookingCTA } from "@/components/home/booking-cta";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export function FaqPageContent() {
  const { messages } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={messages.faqPage.heroEyebrow}
        title={messages.faqPage.heroTitle}
        description={messages.faqPage.heroDescription}
        cta={false}
      />
      <section className={styles.section} aria-label={messages.faqPage.sectionAria}>
        <div className="page-container">
          <FaqExplorer />
        </div>
      </section>
      <BookingCTA />
    </main>
  );
}
