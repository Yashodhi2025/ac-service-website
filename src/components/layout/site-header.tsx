import { CompanyLogo } from "./company-logo";
import { ContactBar } from "./contact-bar";
import { MainNavigation } from "./main-navigation";
import styles from "./header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <ContactBar />
      <MainNavigation logo={<CompanyLogo />} />
    </header>
  );
}
