import { BookServicePageContent } from "@/components/pages/book-service-page-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Book a Service",
  "Prepare an A/C service request for ECME. Choose a service, share your unit details and preferred date, then send your request through WhatsApp.",
  "/book-service"
);

export default async function BookingPage({ searchParams }: PageProps<"/book-service">) {
  const { service } = await searchParams;
  return <BookServicePageContent initialService={typeof service === "string" ? service : undefined} />;
}
