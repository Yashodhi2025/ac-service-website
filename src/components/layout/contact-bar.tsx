"use client";

import { MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { company, contactLinks } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildGeneralWhatsAppUrl } from "@/i18n/whatsapp";
import styles from "./header.module.css";

export function ContactBar() {
  const { messages } = useLanguage();
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <div className={styles.contactBar}>
      <div className={`page-container ${styles.contactInner}`}>
        <a href={contactLinks.phone} className={styles.contactItem}>
          <Phone size={14} aria-hidden="true" />
          {company.phone}
        </a>
        <a
          href={whatsappUrl}
          className={styles.contactItem}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={messages.contactBar.whatsappAria}
        >
          <WhatsAppIcon width={16} height={16} />
          {messages.contactBar.whatsappLabel}
        </a>
        <span className={`${styles.contactItem} ${styles.address}`}>
          <MapPin size={15} aria-hidden="true" />
          {company.address}
        </span>
        <a
          href={contactLinks.facebook}
          className={styles.contactItem}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={messages.contactBar.facebookAria}
        >
          <FacebookIcon width={15} height={15} />
          <span className={styles.socialLabel}>{messages.contactBar.facebookLabel}</span>
        </a>
      </div>
    </div>
  );
}
