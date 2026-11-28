"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/config/site";
import { useLanguage } from "@/i18n/language-provider";
import { ServicesDropdown } from "./services-dropdown";
import styles from "./header.module.css";

const labelKeyByHref = {
  "/": "home",
  "/services": "services",
  "/about": "about",
  "/projects": "projects",
  "/faq": "faq",
  "/contact": "contact",
} as const;

export function NavigationLinks({ mobile = false, onNavigate }: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { messages } = useLanguage();

  return (
    <ul className={mobile ? styles.mobileLinks : styles.desktopLinks}>
      {navigationLinks.map((link) => link.href === "/services" ? (
        <ServicesDropdown
          key={link.href}
          mobile={mobile}
          active={pathname === link.href || pathname.startsWith("/services/")}
          onNavigate={onNavigate}
        />
      ) : (
        <li key={link.href}>
          <Link
            href={link.href}
            className={styles.navLink}
            onClick={onNavigate}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {messages.common[labelKeyByHref[link.href]]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
