"use client";

import { PageHero } from "@/components/ui/page-hero";
import { BookingForm } from "@/components/forms/booking-form";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export function BookServicePageContent({ initialService }: { initialService?: string }) {
  const { messages } = useLanguage();
  const b = messages.bookServicePage;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={b.heroEyebrow}
        title={b.heroTitle}
        description={b.heroDescription}
        cta={false}
      />
      <section className={styles.section} aria-label={b.sectionAria}>
        <div className="page-container max-w-5xl">
          <p className={`${styles.note} mb-8`}>{b.inquiryNotice}</p>
          <BookingForm initialService={initialService} />
        </div>
      </section>
    </main>
  );
}
