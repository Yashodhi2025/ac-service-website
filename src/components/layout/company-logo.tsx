import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/site";
import styles from "./header.module.css";

export function CompanyLogo() {
  return (
    <Link href="/" className={styles.logo} aria-label={`${company.name} home`}>
      <Image src={company.logo} alt={`${company.shortName} snowflake and sun logo`} width={128} height={128} className={styles.logoImage} sizes="64px" loading="eager" />
      <span>
        <span className={styles.wordmark}>{company.wordmark}</span>
        <span className={styles.descriptor}>{company.descriptor}</span>
      </span>
    </Link>
  );
}
