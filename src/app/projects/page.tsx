import { PageHero } from "@/components/ui/page-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { BookingCTA } from "@/components/home/booking-cta";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/ui/site-ui.module.css";
export const metadata=pageMetadata("Projects","Explore permission-cleared ECME project stories across installation, repairs, servicing, relocation and PCB repair.","/projects");
export default function ProjectsPage(){return <main id="main-content" tabIndex={-1}><PageHero eyebrow="Project journal" title="Every space has a cooling story." description="Explore customer work when genuine photographs and permission are available. No illustrative images are presented here as completed ECME projects." cta={false}/><section className={styles.section} aria-label="Project gallery"><div className="page-container"><ProjectGallery/></div></section><BookingCTA/></main>;}
