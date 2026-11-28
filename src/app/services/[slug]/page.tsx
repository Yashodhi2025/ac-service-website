import { notFound } from "next/navigation";
import { activeServices } from "@/data/services";
import { faqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/metadata";
import { ServiceDetailContent } from "@/components/pages/service-detail-content";

export function generateStaticParams() {
  return activeServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = activeServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return pageMetadata(
    service.name,
    `${service.description} Contact Earth Coolman Engineers to discuss your needs.`,
    `/services/${service.slug}`
  );
}

export default async function ServiceDetail({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = activeServices.find((s) => s.slug === slug);
  if (!service) notFound();
  const questions = faqs.filter(
    (f) => f.serviceIds?.includes(service.id) || ["book", "confirmed"].includes(f.id)
  );
  return <ServiceDetailContent service={service} questions={questions} />;
}
