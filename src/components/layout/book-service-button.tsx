"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { company } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./header.module.css";

const MotionLink = motion.create(Link);

export function BookServiceButton({ onNavigate }: { onNavigate?: () => void }) {
  const reducedMotion = useReducedMotion();
  const { messages } = useLanguage();

  return (
    <MotionLink
      href={company.bookingHref}
      className={styles.bookButton}
      onClick={onNavigate}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <CalendarDays size={17} strokeWidth={1.8} aria-hidden="true" />
      {messages.common.bookService}
    </MotionLink>
  );
}
