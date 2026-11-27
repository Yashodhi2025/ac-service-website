"use client";
import Link from "next/link";
import styles from "@/components/ui/site-ui.module.css";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main id="main-content" tabIndex={-1} className={`${styles.section} page-container`}><p className={styles.eyebrow}>Let’s try that again</p><h1 className={styles.title}>This page could not be displayed.</h1><p className={styles.lead}>Try loading it again, or contact ECME directly if you need help with a service.</p><div className={styles.actions}><button type="button" className={styles.button} onClick={reset}>Try Again</button><Link className={styles.outlineButton} href="/contact">Contact ECME</Link></div></main>;}
