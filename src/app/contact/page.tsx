import { ContactPageContent } from "@/components/pages/contact-page-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact ECME",
  "Call or WhatsApp 0719701510. Find Earth Coolman Engineers at No.121/11, Siyabalagoada, Polgasowita.",
  "/contact"
);

export default function ContactPage() {
  return <ContactPageContent />;
}
