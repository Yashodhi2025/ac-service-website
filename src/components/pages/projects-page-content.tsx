"use client";

import { PageHero } from "@/components/ui/page-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { BookingCTA } from "@/components/home/booking-cta";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export function ProjectsPageContent() {
  const { messages } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={messages.projectsPage.heroEyebrow}
        title={messages.projectsPage.heroTitle}
        description={messages.projectsPage.heroDescription}
        cta={false}
      />
      <section className={styles.section} aria-label={messages.projectsPage.sectionAria}>
        <div className="page-container">
          <ProjectGallery />
        </div>
      </section>
      <BookingCTA />
    </main>
  );
}
