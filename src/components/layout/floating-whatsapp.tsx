"use client";

import { motion, useReducedMotion } from "motion/react";
import { company, contactLinks } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import styles from "./floating-whatsapp.module.css";

export function FloatingWhatsApp() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={contactLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${company.name} on WhatsApp (opens in a new tab)`}
      title="Chat with us on WhatsApp"
      className={styles.button}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <WhatsAppIcon width={26} height={26} />
    </motion.a>
  );
}
