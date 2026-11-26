import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, contactLinks, navigationLinks, services } from "@/config/site";

// Keep navigation destinations usable until their full pages are designed.
const destinations = navigationLinks.filter((link) => link.href !== "/");

export function generateStaticParams() {
  return destinations.map((link) => ({ section: link.href.slice(1) }));
}

export async function generateMetadata({ params }: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  const destination = destinations.find((link) => link.href === `/${section}`);
  if (!destination) notFound();
  return { title: `${destination.label} | ${company.name}` };
}

export default async function PlaceholderPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  const destination = destinations.find((link) => link.href === `/${section}`);
  if (!destination) notFound();

  return (
    <main id="main-content" tabIndex={-1} className="page-container space-y-6 py-12 sm:py-16">
      <h1 className="text-h3">{destination.label}</h1>
      <p className="text-ocean-blue">More details coming soon.</p>
      {section === "services" && (
        <ul className="max-w-2xl space-y-6">
          {services.map((service) => (
            <li key={service.id} id={service.id} className="space-y-2">
              <h2 className="text-h6">{service.name}</h2>
              <p className="text-base text-ocean-blue">{service.description}</p>
            </li>
          ))}
        </ul>
      )}
      {section === "contact" && (
        <section id="book-service" className="max-w-prose space-y-4">
          <h2 className="text-h5">Book a Service</h2>
          <p className="text-ocean-blue">Booking and contact details will be confirmed soon.</p>
          <p className="text-base text-ocean-blue">Temporary company details:</p>
          <ul className="space-y-2">
            <li><a className="underline underline-offset-4" href={contactLinks.phone}>{company.phone}</a></li>
            <li><a className="break-all underline underline-offset-4" href={contactLinks.email}>{company.email}</a></li>
            <li className="text-ocean-blue">{company.workingHours}</li>
          </ul>
        </section>
      )}
    </main>
  );
}
