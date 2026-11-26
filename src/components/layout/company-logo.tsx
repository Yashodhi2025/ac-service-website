import Link from "next/link";
import { Snowflake } from "lucide-react";
import { company } from "@/config/site";
import styles from "./header.module.css";

export function CompanyLogo() {
  return (
    <Link href="/" className={styles.logo} aria-label={`${company.name} home`}>
      <span className={styles.logoMark}>
        <Snowflake size={25} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span>
        <span className={styles.wordmark}>{company.name}</span>
        <span className={styles.descriptor}>{company.descriptor}</span>
      </span>
    </Link>
  );
}
