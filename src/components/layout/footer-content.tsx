"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { company, contactLinks, navigationLinks } from "@/config/site";
import { activeServices } from "@/data/services";
import { useLanguage } from "@/i18n/language-provider";
import { buildGeneralWhatsAppUrl } from "@/i18n/whatsapp";
import { BackToTop } from "./back-to-top";
import { FooterMotion } from "./footer-motion";
import styles from "./footer.module.css";

const labelKeyByHref = {
  "/": "home",
  "/services": "services",
  "/about": "about",
  "/projects": "projects",
  "/faq": "faq",
  "/contact": "contact",
} as const;

export function FooterContent({ year }: { year: string }) {
  const { messages } = useLanguage();
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <FooterMotion className={`page-container ${styles.inner}`}>
      <div className={styles.hairline} data-footer-hairline aria-hidden="true" />
      <div className={styles.grid}>
        <div className={styles.brand} data-footer-col>
          <Link href="/" className={styles.logo}>
            <Image src={company.logo} width={80} height={80} alt={messages.footer.logoAlt} />
            <span>Earth Coolman<br />Engineers</span>
          </Link>
          <p>{messages.footer.tagline}</p>
          <div className={styles.social}>
            <a href={contactLinks.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon />{messages.contactBar.facebookLabel}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon width={20} height={20} />{messages.contactBar.whatsappLabel}
            </a>
          </div>
        </div>
        <nav aria-label={messages.footer.exploreAria} data-footer-col>
          <h2>{messages.footer.exploreHeading}</h2>
          <ul>
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{messages.common[labelKeyByHref[link.href]]}</Link>
              </li>
            ))}
            <li>
              <Link href={company.bookingHref}>{messages.common.bookService}</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label={messages.footer.servicesAria} data-footer-col>
          <h2>{messages.footer.servicesHeading}</h2>
          <ul>
            {activeServices.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`}>
                  {messages.servicesCatalogue[service.id]?.name ?? service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div data-footer-col>
          <h2>{messages.footer.contactHeading}</h2>
          <a className={styles.contact} href={contactLinks.phone}>
            <Phone size={18} aria-hidden="true" />{company.phone}
          </a>
          <address className={styles.contact}>
            <MapPin size={20} aria-hidden="true" /><span>{company.address}</span>
          </address>
          <Link className={styles.booking} href={company.bookingHref}>
            {messages.footer.requestService}
          </Link>
        </div>
      </div>
      <div className={styles.bottom} data-footer-bottom>
        <p>© {year} {company.name}. {messages.footer.rightsReserved}</p>
        <BackToTop />
      </div>
    </FooterMotion>
  );
}
