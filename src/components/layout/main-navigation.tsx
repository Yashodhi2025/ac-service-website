"use client";

import { Menu, Phone, X } from "lucide-react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { company, contactLinks } from "@/config/site";
import { BookServiceButton } from "./book-service-button";
import { NavigationLinks } from "./navigation-links";
import styles from "./header.module.css";

export function MainNavigation({ logo }: { logo: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    function resize() {
      if (!desktop.matches) return;
      if (panelRef.current?.contains(document.activeElement)) {
        rootRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
      setMobileOpen(false);
    }

    function close() { setMobileOpen(false); }

    desktop.addEventListener("change", resize);
    window.addEventListener("popstate", close);
    window.addEventListener("hashchange", close);
    return () => {
      desktop.removeEventListener("change", resize);
      window.removeEventListener("popstate", close);
      window.removeEventListener("hashchange", close);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    function dismiss(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setMobileOpen(false);
    }

    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [mobileOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className={styles.mainNavigation}
        onClickCapture={(event) => {
          if ((event.target as Element).closest("a")) setMobileOpen(false);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && mobileOpen) {
            event.preventDefault();
            setMobileOpen(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <div className={`page-container ${styles.navInner}`}>
          {logo}
          <nav aria-label="Main navigation" className={styles.desktopNav}>
            <NavigationLinks />
          </nav>
          <div className={styles.desktopBooking}><BookServiceButton /></div>
          <button
            ref={toggleRef}
            type="button"
            className={styles.mobileToggle}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
        <motion.div
          ref={panelRef}
          id={panelId}
          className={styles.mobilePanel}
          inert={!mobileOpen}
          aria-hidden={!mobileOpen}
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.mobileScroll}>
            <div className="page-container">
              <nav aria-label="Mobile navigation">
                <NavigationLinks mobile onNavigate={() => setMobileOpen(false)} />
              </nav>
              <div className={styles.mobileBooking}>
                <BookServiceButton onNavigate={() => setMobileOpen(false)} />
                <a href={contactLinks.phone} className={styles.mobilePhone}>
                  <Phone size={16} aria-hidden="true" /> {company.phone}
                </a>
                <a href={contactLinks.whatsapp} className={styles.mobilePhone} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon width={18} height={18} /> WhatsApp {company.shortName}
                </a>
                <p className="text-center text-sm text-ocean-blue">{company.address}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
