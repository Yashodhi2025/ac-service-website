import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteOrigin } from "@/lib/metadata";
import { company } from "@/config/site";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope-variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteOrigin() ? new URL(getSiteOrigin()!) : undefined,
  alternates: getSiteOrigin() ? {canonical:getSiteOrigin()} : undefined,
  title: `${company.name} (ECME) | A/C Services`,
  description: company.description,
  applicationName: company.name,
  openGraph: {
    title: `${company.name} (ECME)`,
    description: company.description,
    siteName: company.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:company.name,telephone:company.phoneInternational,address:company.address,sameAs:[company.facebook],...(getSiteOrigin()?{url:getSiteOrigin()}:{} )}).replace(/</g,"\\u003c")}} />
      </body>
    </html>
  );
}
