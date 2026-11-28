import { FaqPageContent } from "@/components/pages/faq-page-content";
import { pageMetadata } from "@/lib/metadata";
import { faqs } from "@/data/faqs";

export const metadata = pageMetadata(
  "Frequently Asked Questions",
  "Find answers about A/C installation, servicing, diagnostics, inverter PCB repair, maintenance and requesting a visit from ECME.",
  "/faq"
);

export default function FaqPage() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <FaqPageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
