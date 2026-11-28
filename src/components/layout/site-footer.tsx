import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { company, contactLinks, navigationLinks } from "@/config/site";
import { activeServices } from "@/data/services";
import { BackToTop } from "./back-to-top";
import { FooterMotion } from "./footer-motion";
import styles from "./footer.module.css";

export function SiteFooter() {
  const year = new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Colombo" }).format(new Date());

  return (
    <footer className={styles.footer}>
      <CoolingAtmosphere variant="footer" />
      <FooterMotion className={`page-container ${styles.inner}`}>
        <div className={styles.hairline} data-footer-hairline aria-hidden="true" />
        <div className={styles.grid}>
          <div className={styles.brand} data-footer-col>
            <Link href="/" className={styles.logo}>
              <Image src={company.logo} width={80} height={80} alt="ECME snowflake and sun logo" />
              <span>Earth Coolman<br />Engineers</span>
            </Link>
            <p>
              A/C installation, repair and maintenance. A considered approach to your comfort, with clear conversations at every step.
            </p>
            <div className={styles.social}>
              <a href={contactLinks.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookIcon />Facebook
              </a>
              <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon width={20} height={20} />WhatsApp
              </a>
            </div>
          </div>
          <nav aria-label="Footer navigation" data-footer-col>
            <h2>Explore</h2>
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
              <li><Link href={company.bookingHref}>Book a Service</Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer services" data-footer-col>
            <h2>A/C care</h2>
            <ul>
              {activeServices.map((service) => (
                <li key={service.id}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>
              ))}
            </ul>
          </nav>
          <div data-footer-col>
            <h2>Let’s talk</h2>
            <a className={styles.contact} href={contactLinks.phone}>
              <Phone size={18} aria-hidden="true" />{company.phone}
            </a>
            <address className={styles.contact}>
              <MapPin size={20} aria-hidden="true" /><span>{company.address}</span>
            </address>
            <Link className={styles.booking} href={company.bookingHref}>Request a Service</Link>
          </div>
        </div>
        <div className={styles.bottom} data-footer-bottom>
          <p>© {year} {company.name}. All rights reserved.</p>
          <BackToTop />
        </div>
      </FooterMotion>
    </footer>
  );
}
