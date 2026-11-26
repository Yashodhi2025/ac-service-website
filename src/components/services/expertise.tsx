import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { expertiseServices } from "@/config/expertise";
import { ServiceTile } from "./service-tile";
import styles from "./expertise.module.css";

export function Expertise() {
  return (
    <section id="our-expertise" className={styles.section} aria-labelledby="expertise-heading">
      <ScrollReveal className="page-container">
        <div className={styles.heading} data-scroll-reveal>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Complete A/C care</p>
            <h2 id="expertise-heading" className={styles.title}>Our Expertise</h2>
            <p className={styles.description}>
              From the first installation to the finest repair, a little expertise
              makes all the difference to your comfort.
            </p>
          </div>
          <Link href="/services" className={styles.viewAll}>
            View All Services <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
        <ul className={styles.grid} aria-label="Our A/C services">
          {expertiseServices.map((service) => <ServiceTile key={service.id} service={service} />)}
        </ul>
      </ScrollReveal>
    </section>
  );
}
