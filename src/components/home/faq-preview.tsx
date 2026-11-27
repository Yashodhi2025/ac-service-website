import Link from "next/link";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import styles from "@/components/ui/site-ui.module.css";
export function FaqPreview(){return <section className={`${styles.section} ${styles.soft}`} aria-labelledby="faq-preview-heading"><ScrollReveal className={`page-container ${styles.twoColumns}`}><div data-scroll-reveal><p className={styles.eyebrow}>A little clarity</p><h2 className={styles.title} id="faq-preview-heading">Questions before the cool air?</h2><p className={styles.lead}>Understand the process before you request a visit. For equipment-specific advice, speak directly with ECME.</p><div className={styles.actions}><Link href="/faq" className={styles.outlineButton}>Explore All FAQs</Link></div></div><div data-scroll-reveal><FaqAccordion items={faqs.filter(f=>["book","confirmed","normal-full","cooling","pcb"].includes(f.id))}/></div></ScrollReveal></section>;}
