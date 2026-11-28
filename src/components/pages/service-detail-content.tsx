"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import type { Faq } from "@/data/faqs";
import { getWhatsAppUrl } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { BookingCTA } from "@/components/home/booking-cta";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildServiceRequestWhatsAppMessage } from "@/i18n/whatsapp";
import styles from "@/components/ui/site-ui.module.css";

export function ServiceDetailContent({ service, questions }: { service: Service; questions: Faq[] }) {
  const { messages, locale } = useLanguage();
  const loc = messages.servicesCatalogue[service.id];
  const name = loc?.name ?? service.name;
  const short = loc?.short ?? service.short;
  const description = loc?.description ?? service.description;
  const imageAlt = loc?.imageAlt ?? service.imageAlt;
  const symptoms = loc?.symptoms ?? service.symptoms;
  const scope = loc?.scope ?? service.scope;
  const benefits = loc?.benefits ?? service.benefits;
  const askUrl = getWhatsAppUrl(buildServiceRequestWhatsAppMessage(service.slug));

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={messages.serviceDetail.heroEyebrow}
        title={name}
        description={description}
        image={service.image}
        imageAlt={imageAlt}
        cta={false}
      />
      <div className={`page-container ${styles.breadcrumbs}`}>
        <Link href="/">{messages.common.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/services">{messages.common.services}</Link>
        <span aria-hidden="true">/</span>
        <span>{name}</span>
      </div>

      <section className={styles.section}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div>
            <p className={styles.eyebrow}>{messages.serviceDetail.startingEyebrow}</p>
            <h2 className={styles.title}>{messages.serviceDetail.startingTitle}</h2>
            <p className={styles.lead}>
              {short}. {messages.serviceDetail.startingLeadSuffix}
            </p>
            <div className={styles.actions}>
              <Link className={styles.button} href={`/book-service?service=${service.slug}`}>
                {messages.serviceDetail.bookThisService}
              </Link>
              <a
                className={styles.outlineButton}
                href={askUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon width={20} height={20} />
                {messages.serviceDetail.askAboutService}
              </a>
            </div>
            {service.confirmScope && (
              <p className={styles.note}>{messages.serviceDetail.confirmScopeNote}</p>
            )}
          </div>
          <div className={styles.prose}>
            <h2>{messages.serviceDetail.reasonsTitle}</h2>
            <ul className={styles.list}>
              {symptoms.map((symptom) => (
                <li key={symptom}>
                  <Check size={18} aria-hidden="true" />
                  {symptom}
                </li>
              ))}
            </ul>
            <p className={styles.note}>{messages.serviceDetail.reasonsNote}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div className={styles.prose}>
            <h2>{messages.serviceDetail.discussTitle}</h2>
            <ul className={styles.list}>
              {scope.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.prose}>
            <h2>{messages.serviceDetail.whyMattersTitle}</h2>
            <ul className={styles.list}>
              {benefits.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="page-container">
          <p className={styles.eyebrow}>{messages.serviceDetail.processEyebrow}</p>
          <h2 className={styles.title}>{messages.serviceDetail.processTitle}</h2>
          <ol className={styles.process}>
            {messages.serviceDetail.processSteps.map((step) => (
              <li key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div>
            <p className={styles.eyebrow}>{messages.serviceDetail.faqEyebrow}</p>
            <h2 className={styles.title}>
              {locale === "en"
                ? `${messages.serviceDetail.faqTitlePrefix} ${name.toLowerCase()}${messages.serviceDetail.faqTitleSuffix}`
                : `${messages.serviceDetail.faqTitlePrefix}${name}`}
            </h2>
            <p className={styles.lead}>{messages.serviceDetail.faqLead}</p>
          </div>
          <FaqAccordion items={questions} />
        </div>
      </section>

      <BookingCTA service={service.slug} />
    </main>
  );
}
