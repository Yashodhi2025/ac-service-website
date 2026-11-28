"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { activeServices } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { BookingCTA } from "@/components/home/booking-cta";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { useLanguage } from "@/i18n/language-provider";
import styles from "@/components/ui/site-ui.module.css";

export function ServicesPageContent() {
  const { messages } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={messages.servicesPage.heroEyebrow}
        title={messages.servicesPage.heroTitle}
        description={messages.servicesPage.heroDescription}
        image="/images/services/full-service.webp"
        imageAlt={messages.servicesCatalogue.cleaning?.imageAlt}
      />
      <section className={styles.section} aria-label={messages.servicesPage.sectionAria}>
        <div className="page-container">
          <nav className={styles.chips} aria-label={messages.servicesPage.categoriesAria}>
            {activeServices.map((service) => (
              <a className={styles.chip} key={service.id} href={`#${service.id}`}>
                {messages.servicesCatalogue[service.id]?.name ?? service.name}
              </a>
            ))}
          </nav>
          <ScrollReveal>
            {activeServices.map((service) => {
              const loc = messages.servicesCatalogue[service.id];
              const name = loc?.name ?? service.name;
              const short = loc?.short ?? service.short;
              const description = loc?.description ?? service.description;
              const scope = loc?.scope ?? service.scope;
              const imageAlt = loc?.imageAlt ?? service.imageAlt;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`${styles.serviceRow} ${styles.twoColumns}`}
                  data-scroll-reveal
                >
                  <figure>
                    <div className={styles.serviceImage}>
                      <Image src={service.image} alt={imageAlt} fill sizes="(min-width:1024px) 46vw, 92vw" />
                    </div>
                    <figcaption className={styles.caption}>{messages.common.illustrativePhoto}</figcaption>
                  </figure>
                  <div>
                    <p className={styles.eyebrow}>{short}</p>
                    <h2>{name}</h2>
                    <p className={styles.lead}>{description}</p>
                    <ul className={styles.list}>
                      {scope.slice(0, 2).map((item) => (
                        <li key={item}>
                          <Check size={18} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {service.confirmScope && (
                      <p className={styles.note}>{messages.servicesPage.confirmScopeNote}</p>
                    )}
                    <div className={styles.actions}>
                      <Link className={styles.outlineButton} href={`/services/${service.slug}`}>
                        {messages.servicesPage.exploreThisService}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>
      <BookingCTA />
    </main>
  );
}
