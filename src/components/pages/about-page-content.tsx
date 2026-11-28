"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { company, contactLinks } from "@/config/site";
import { teamMembers, companyBenefits } from "@/data/company-content";
import { PageHero } from "@/components/ui/page-hero";
import { BookingCTA } from "@/components/home/booking-cta";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { useLanguage } from "@/i18n/language-provider";
import { buildGeneralWhatsAppUrl } from "@/i18n/whatsapp";
import styles from "@/components/ui/site-ui.module.css";

export function AboutPageContent() {
  const { messages } = useLanguage();
  const a = messages.aboutPage;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={a.heroEyebrow}
        title={a.heroTitle}
        description={a.heroDescription}
        image="/images/technician-illustration.webp"
        imageAlt={messages.whyChoose.photoAlt}
      />

      <section className={styles.section}>
        <ScrollReveal className={`page-container ${styles.twoColumns}`}>
          <div data-scroll-reveal>
            <p className={styles.eyebrow}>{a.whoEyebrow}</p>
            <h2 className={styles.title}>{a.whoTitle}</h2>
          </div>
          <div className={styles.prose} data-scroll-reveal>
            <p>
              {a.whoP1Prefix}
              {company.address}
              {a.whoP1Suffix}
            </p>
            <p>{a.whoP2}</p>
            <p>
              {a.whoP3Prefix}
              <a className={styles.textLink} href={contactLinks.phone}>
                {company.phone}
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div className={styles.prose}>
            <p className={styles.eyebrow}>{a.missionEyebrow}</p>
            <h2>{a.missionTitle}</h2>
            <p>{a.missionBody}</p>
          </div>
          <div className={styles.prose}>
            <p className={styles.eyebrow}>{a.visionEyebrow}</p>
            <h2>{a.visionTitle}</h2>
            <p>{a.visionBody}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="page-container">
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>{a.valuesEyebrow}</p>
              <h2 className={styles.title}>{a.valuesTitle}</h2>
            </div>
          </div>
          <ul className={styles.benefits}>
            {companyBenefits.map((benefit, index) => {
              const loc = messages.whyChoose.benefits[index] ?? benefit;
              return (
                <li className={styles.benefit} key={benefit.icon}>
                  <span className={styles.benefitIcon}>
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{loc.title}</h3>
                    <p>{loc.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={`page-container ${styles.split}`}>
          <figure>
            <div className={styles.photo}>
              <Image
                src="/images/services/pcb-repair.webp"
                alt={a.techPhotoAlt}
                fill
                sizes="(min-width:1024px) 43vw, 92vw"
              />
            </div>
            <figcaption className={styles.caption}>{a.techPhotoCaption}</figcaption>
          </figure>
          <div className={styles.prose}>
            <p className={styles.eyebrow}>{a.techEyebrow}</p>
            <h2>{a.techTitle}</h2>
            <p>{a.techBody}</p>
            <ul className={styles.list}>
              {a.techList.map((text) => (
                <li key={text}>
                  <Check size={18} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div>
            <p className={styles.eyebrow}>{a.teamEyebrow}</p>
            <h2 className={styles.title}>{a.teamTitle}</h2>
            <p className={styles.lead}>{a.teamLead}</p>
          </div>
          <div className={styles.team}>
            {teamMembers.length ? (
              teamMembers.map((member) => (
                <article key={member.id}>
                  {member.image && (
                    <Image src={member.image} width={160} height={160} alt={member.name} />
                  )}
                  <h3>{member.name}</h3>
                  <p className={styles.small}>{member.role}</p>
                  <p className={styles.lead}>{member.bio}</p>
                </article>
              ))
            ) : (
              <div className={styles.empty}>
                <h3>{a.teamEmptyTitle}</h3>
                <p>{a.teamEmptyBody}</p>
                <a
                  className={styles.outlineButton}
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.teamCta}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <BookingCTA />
    </main>
  );
}
