import { PageHero } from "@/components/ui/page-hero";
import { FaqExplorer } from "@/components/faq/faq-explorer";
import { BookingCTA } from "@/components/home/booking-cta";
import { pageMetadata } from "@/lib/metadata";
import { faqs } from "@/data/faqs";
import styles from "@/components/ui/site-ui.module.css";
export const metadata=pageMetadata("Frequently Asked Questions","Find answers about A/C installation, servicing, diagnostics, inverter PCB repair, maintenance and requesting a visit from ECME.","/faq");
export default function FaqPage(){const structured={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))};return <main id="main-content" tabIndex={-1}><PageHero eyebrow="Questions, answered" title="Clarity before the next step." description="Browse the topics below or search for what is on your mind. Equipment-specific findings and service arrangements are confirmed directly with ECME." cta={false}/><section className={styles.section} aria-label="Search frequently asked questions"><div className="page-container"><FaqExplorer/></div></section><BookingCTA/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,"\\u003c")}}/></main>;}
