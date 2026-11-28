"use client";

import Link from "next/link";
import {
  Building2, CalendarCheck, ChevronDown, Droplets,
  Fan, Move, Snowflake, Sparkles, Wrench, Cpu,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import styles from "./header.module.css";

const serviceIcons = {
  installation: Snowflake,
  repairs: Wrench,
  servicing: Fan,
  cleaning: Sparkles,
  gas: Droplets,
  maintenance: CalendarCheck,
  commercial: Building2,
  relocation: Move,
  pcb: Cpu,
};

type ServicesDropdownProps = {
  mobile?: boolean;
  active: boolean;
  onNavigate?: () => void;
};

export function ServicesDropdown({ mobile = false, active, onNavigate }: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reducedMotion = useReducedMotion();
  const { messages } = useLanguage();

  useEffect(() => {
    if (!open) return;

    function dismiss(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function navigate() {
    setOpen(false);
    onNavigate?.();
  }

  return (
    <li
      ref={containerRef}
      className={`${styles.servicesItem} ${mobile ? styles.mobileServices : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <div className={styles.servicesControl}>
        <Link
          href="/services"
          className={styles.navLink}
          aria-current={active ? "page" : undefined}
          onClick={navigate}
        >
          {messages.common.services}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className={styles.servicesToggle}
          aria-label={open ? messages.nav.closeServices : messages.nav.openServices}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => panelRef.current?.querySelector("a")?.focus());
            }
          }}
        >
          <ChevronDown size={15} aria-hidden="true" className={open ? styles.chevronOpen : ""} />
        </button>
      </div>
      <motion.div
        id={panelId}
        ref={panelRef}
        className={styles.servicesPanel}
        inert={!open}
        aria-hidden={!open}
        initial={false}
        animate={mobile
          ? { height: open ? "auto" : 0, opacity: open ? 1 : 0 }
          : { opacity: open ? 1 : 0, y: open ? 0 : 8 }}
        transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
        style={mobile ? undefined : { pointerEvents: open ? "auto" : "none" }}
      >
        <div className={styles.servicesSurface}>
          <p className={styles.dropdownLabel}>{messages.nav.dropdownLabel}</p>
          <ul className={styles.serviceGrid}>
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              const localized = messages.servicesCatalogue[service.id];
              return (
                <li key={service.id}>
                  <Link href={service.href} className={styles.serviceLink} onClick={navigate}>
                    <span className={styles.serviceIcon}><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
                    <span>
                      <span className={styles.serviceName}>{localized?.name ?? service.name}</span>
                      <span className={styles.serviceDescription}>{localized?.short ?? service.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </li>
  );
}
