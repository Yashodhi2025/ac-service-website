import type { Metadata } from "next";
import { company } from "@/config/site";

// Set the real public origin at deployment; never invent a company domain.
export function getSiteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return undefined;
  try { const url = new URL(raw); return /^https?:$/.test(url.protocol) ? url.origin : undefined; } catch { return undefined; }
}
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const origin = getSiteOrigin();
  return { title:`${title} | ${company.name}`, description,
    alternates: origin ? {canonical:new URL(path, origin).href} : undefined,
    openGraph:{title:`${title} | ${company.shortName}`, description, siteName:company.name, type:"website"},
  };
}
