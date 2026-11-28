import { AboutPageContent } from "@/components/pages/about-page-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About ECME",
  "Meet the approach behind Earth Coolman Engineers: A/C care, clear communication and considered service in Polgasowita.",
  "/about"
);

export default function AboutPage() {
  return <AboutPageContent />;
}
