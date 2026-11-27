"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/config/site";
import { ServicesDropdown } from "./services-dropdown";
import styles from "./header.module.css";

export function NavigationLinks({ mobile = false, onNavigate }: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={mobile ? styles.mobileLinks : styles.desktopLinks}>
      {navigationLinks.map((link) => link.href === "/services" ? (
        <ServicesDropdown key={link.href} mobile={mobile} active={pathname === link.href || pathname.startsWith("/services/")} onNavigate={onNavigate} />
      ) : (
        <li key={link.href}>
          <Link href={link.href} className={styles.navLink} onClick={onNavigate} aria-current={pathname === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
