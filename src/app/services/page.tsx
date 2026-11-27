import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { activeServices } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { BookingCTA } from "@/components/home/booking-cta";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/ui/site-ui.module.css";
export const metadata=pageMetadata("A/C Services","Explore installation, servicing, diagnostics, inverter PCB repair and other A/C care options with ECME.","/services");
export default function ServicesPage(){return <main id="main-content" tabIndex={-1}><PageHero eyebrow="Our services" title="Care for every kind of cooling." description="From the first installation to a detailed repair, start with the service you need and discuss the right scope with ECME." image="/images/services/full-service.webp"/>
  <section className={styles.section} aria-label="Explore A/C services"><div className="page-container"><nav className={styles.chips} aria-label="Service categories">{activeServices.map(service=><a className={styles.chip} key={service.id} href={`#${service.id}`}>{service.name}</a>)}</nav><ScrollReveal>{activeServices.map(service=><article key={service.id} id={service.id} className={`${styles.serviceRow} ${styles.twoColumns}`} data-scroll-reveal><figure><div className={styles.serviceImage}><Image src={service.image} alt={service.imageAlt} fill sizes="(min-width:1024px) 46vw, 92vw"/></div><figcaption className={styles.caption}>Illustrative service photography.</figcaption></figure><div><p className={styles.eyebrow}>{service.short}</p><h2>{service.name}</h2><p className={styles.lead}>{service.description}</p><ul className={styles.list}>{service.scope.slice(0,2).map(item=><li key={item}><Check size={18} aria-hidden="true"/>{item}</li>)}</ul>{service.confirmScope&&<p className={styles.note}>Contact ECME to confirm the equipment, scope and availability for this service.</p>}<div className={styles.actions}><Link className={styles.outlineButton} href={`/services/${service.slug}`}>Explore This Service</Link></div></div></article>)}</ScrollReveal></div></section><BookingCTA/>
  </main>;}
