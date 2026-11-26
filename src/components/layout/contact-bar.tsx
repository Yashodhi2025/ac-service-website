import { Clock3, Mail, Phone } from "lucide-react";
import { company, contactLinks } from "@/config/site";
import styles from "./header.module.css";

export function ContactBar() {
  return (
    <div className={styles.contactBar}>
      <div className={`page-container ${styles.contactInner}`}>
        <a href={contactLinks.phone} className={styles.contactItem}>
          <Phone size={14} aria-hidden="true" />
          {company.phone}
        </a>
        <a href={contactLinks.email} className={styles.contactItem}>
          <Mail size={15} aria-hidden="true" />
          <span className={styles.emailAddress}>{company.email}</span>
          <span className={styles.emailLabel}>Email us</span>
        </a>
        <span className={`${styles.contactItem} ${styles.hours}`}>
          <Clock3 size={15} aria-hidden="true" />
          {company.workingHours}
        </span>
      </div>
    </div>
  );
}
