import Image from "next/image";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { company } from "@/config/site";
import styles from "./site-ui.module.css";

export function PageHero({eyebrow,title,description,image,imageAlt,cta=true}:{eyebrow:string;title:string;description:string;image?:string;imageAlt?:string;cta?:boolean}) {
  return <section className={styles.hero} aria-label={eyebrow}>
    <CoolingAtmosphere variant="transition" />
    <div className={`page-container ${styles.heroInner}`}>
      <div className={styles.heroCopy}><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1><p>{description}</p>{cta&&<div className={styles.actions}><Link className={styles.button} href={company.bookingHref}>Book a Service</Link></div>}</div>
      {image ? <figure className={styles.heroFigure}><div className={styles.heroPhoto}><Image src={image} alt={imageAlt??"Illustrative air-conditioning service photography"} fill sizes="(min-width:1024px) 45vw, 92vw" /></div><figcaption className={styles.caption}>Illustrative photography, not an ECME employee or completed project.</figcaption></figure> : <Snowflake size={160} strokeWidth={0.6} aria-hidden="true" className="hidden justify-self-center text-electric-cyan opacity-30 lg:block"/>}
    </div>
  </section>;
}
