import { CoolingAtmosphere } from "@/components/animations/cooling-atmosphere";
import { FooterContent } from "./footer-content";
import styles from "./footer.module.css";

export function SiteFooter() {
  const year = new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "Asia/Colombo" }).format(new Date());

  return (
    <footer className={styles.footer}>
      <CoolingAtmosphere variant="footer" />
      <FooterContent year={year} />
    </footer>
  );
}
