import Image from "next/image";
import { ClipboardCheck, Focus, Handshake, Layers3, MessagesSquare, Wrench } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ParallaxMedia } from "@/components/animations/parallax-media";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { companyBenefits } from "@/data/company-content";
import { company,getWhatsAppUrl } from "@/config/site";
import styles from "@/components/ui/site-ui.module.css";
const icons={technical:Wrench,solutions:Layers3,detail:Focus,communication:MessagesSquare,customer:Handshake,support:ClipboardCheck};
export function WhyChoose(){
  return <section id="why-choose-ecme" className={`${styles.section} ${styles.white}`} aria-labelledby="why-heading"><ScrollReveal className={`page-container ${styles.split}`}>
    <figure data-scroll-reveal><div className={styles.photo}><ParallaxMedia><Image src="/images/technician-illustration.webp" alt="Illustrative technician inspecting an indoor A/C unit" fill sizes="(min-width:1024px) 43vw, 92vw"/></ParallaxMedia></div><figcaption className={styles.caption}>Illustrative photography. This is not a photograph of the ECME team.</figcaption></figure>
    <div><div data-scroll-reveal><p className={styles.eyebrow}>Care behind the cooling</p><h2 id="why-heading" className={styles.title}>Why Choose Earth Coolman Engineers?</h2><p className={styles.lead}>A considered approach to your comfort, from understanding the problem to explaining the work.</p></div>
      <ul className={styles.benefits}>{companyBenefits.map(benefit=>{const Icon=icons[benefit.icon];return <li key={benefit.title} className={styles.benefit} data-scroll-reveal><span className={styles.benefitIcon}><Icon size={23} strokeWidth={1.5} aria-hidden="true"/></span><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div></li>;})}</ul>
      <div className={styles.actions} data-scroll-reveal><a className={styles.button} href={getWhatsAppUrl(`Hello ${company.name}, I'd like to talk about my A/C service needs.`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={21} height={21}/>Talk to Our Team</a></div>
    </div>
  </ScrollReveal></section>;
}
