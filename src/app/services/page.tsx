import { ServicesPageContent } from "@/components/pages/services-page-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "A/C Services",
  "Explore installation, servicing, diagnostics, inverter PCB repair and other A/C care options with ECME.",
  "/services"
);

export default function ServicesPage() {
  return <ServicesPageContent />;
}
