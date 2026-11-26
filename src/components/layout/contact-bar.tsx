import { MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { company, contactLinks } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import styles from "./header.module.css";

export function ContactBar() {
  return (
    <div className={styles.contactBar}>
      <div className={`page-container ${styles.contactInner}`}>
        <a href={contactLinks.phone} className={styles.contactItem}>
          <Phone size={14} aria-hidden="true" />
          {company.phone}
        </a>
        <a href={contactLinks.whatsapp} className={styles.contactItem} target="_blank" rel="noopener noreferrer" aria-label={`Message ${company.name} on WhatsApp (opens in a new tab)`}>
          <WhatsAppIcon width={16} height={16} />
          WhatsApp
        </a>
        <span className={`${styles.contactItem} ${styles.address}`}>
          <MapPin size={15} aria-hidden="true" />
          {company.address}
        </span>
        <a href={contactLinks.facebook} className={styles.contactItem} target="_blank" rel="noopener noreferrer" aria-label={`${company.name} on Facebook (opens in a new tab)`}>
          <FacebookIcon width={15} height={15} />
          <span className={styles.socialLabel}>Facebook</span>
        </a>
      </div>
    </div>
  );
}
