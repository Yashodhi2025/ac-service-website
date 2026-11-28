"use client";

import { MapPin, Phone } from "lucide-react";
import { company, contactLinks } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildGeneralWhatsAppUrl } from "@/i18n/whatsapp";
import styles from "@/components/ui/site-ui.module.css";

export function ContactPageContent() {
  const { messages } = useLanguage();
  const c = messages.contactPage;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        description={c.heroDescription}
        cta={false}
      />
      <section className={styles.section}>
        <div className={`page-container ${styles.twoColumns}`}>
          <div>
            <p className={styles.eyebrow}>{c.directEyebrow}</p>
            <h2 className={styles.title}>{c.directTitle}</h2>
            <p className={styles.lead}>{c.directLead}</p>
            <ul className={styles.contactList}>
              <li>
                <Phone size={22} aria-hidden="true" />
                <div>
                  <strong>{c.callTitle}</strong>
                  <a href={contactLinks.phone}>{company.phone}</a>
                </div>
              </li>
              <li>
                <WhatsAppIcon width={23} height={23} />
                <div>
                  <strong>{c.whatsappTitle}</strong>
                  <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    {c.whatsappMessagePrefix} {company.phone}
                  </a>
                </div>
              </li>
              <li>
                <FacebookIcon width={22} height={22} />
                <div>
                  <strong>{c.facebookTitle}</strong>
                  <a href={contactLinks.facebook} target="_blank" rel="noopener noreferrer">
                    {c.facebookLinkText}
                  </a>
                </div>
              </li>
              <li>
                <MapPin size={23} aria-hidden="true" />
                <div>
                  <strong>{c.addressTitle}</strong>
                  <address className="not-italic text-ocean-blue">{company.address}</address>
                </div>
              </li>
            </ul>
          </div>
          <InquiryForm />
        </div>
      </section>
      <section className={`${styles.section} ${styles.white}`} aria-labelledby="location-heading">
        <div className={`page-container ${styles.twoColumns}`}>
          <div>
            <p className={styles.eyebrow}>{c.locationEyebrow}</p>
            <h2 className={styles.title} id="location-heading">
              {c.locationTitle}
            </h2>
            <p className={styles.lead}>{c.locationLead}</p>
          </div>
          <div className={styles.mapPanel}>
            <MapPin size={36} strokeWidth={1.25} aria-hidden="true" />
            <h3 className="text-h5">{company.name}</h3>
            <p>{company.address}</p>
            <a className={styles.button} href={maps} target="_blank" rel="noopener noreferrer">
              {c.mapsButton}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
