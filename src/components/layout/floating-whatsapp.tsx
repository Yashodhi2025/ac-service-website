"use client";

import { motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useLanguage } from "@/i18n/language-provider";
import { buildGeneralWhatsAppUrl } from "@/i18n/whatsapp";
import styles from "./floating-whatsapp.module.css";

export function FloatingWhatsApp() {
  const reducedMotion = useReducedMotion();
  const { messages } = useLanguage();
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={messages.nav.floatingWhatsAppAria}
      title={messages.nav.floatingWhatsAppTitle}
      className={styles.button}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <WhatsAppIcon width={26} height={26} />
    </motion.a>
  );
}
