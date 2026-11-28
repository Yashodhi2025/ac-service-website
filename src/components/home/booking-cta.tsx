import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { Phone } from "lucide-react";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { company,contactLinks,getWhatsAppUrl } from "@/config/site";
import styles from "@/components/ui/site-ui.module.css";
export function BookingCTA({service}:{service?:string}){
  const message=service?`Hello ${company.name}, I'd like to discuss ${service}.`:`Hello ${company.name}, I'd like to discuss an A/C service.`;
  return <section className={styles.cta} aria-label="Get in touch"><CoolingAtmosphere variant="transition" /><div className={`page-container ${styles.ctaInner}`}>
    <div className={styles.ctaCopy}><p className={styles.eyebrow}>Let’s talk comfort</p><h2 className={styles.title}>Your next step to better cooling.</h2><p>Tell ECME about your space and your A/C. We’ll discuss an assessment, the scope and the next steps.</p></div>
    <div><div className={styles.actions}><a className={styles.button} href={getWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21}/>WhatsApp ECME</a><a className={styles.outlineButton} href={contactLinks.phone}><Phone size={18} aria-hidden="true"/>{company.phone}</a></div><p><Link className="underline underline-offset-4" href={company.bookingHref}>Prefer a guided request? Book a Service</Link></p></div>
  </div></section>;
}
