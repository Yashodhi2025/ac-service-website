import { activeServices } from "@/data/services";

// Company identity and contact details supplied by Earth Coolman Engineers.
export const company = {
  name: "Earth Coolman Engineers",
  shortName: "ECME",
  wordmark: "Earth Coolman",
  descriptor: "Engineers",
  phone: "0719701510",
  phoneInternational: "+94719701510",
  address: "No.121/11, Siyabalagoada, Polgasowita",
  facebook: "https://www.facebook.com/share/1FyfiNsQsW/",
  logo: "/images/brand/ecme-logo.png",
  description: "A/C installation, repairs and maintenance by Earth Coolman Engineers (ECME), Polgasowita. Call or WhatsApp 0719701510.",
  bookingHref: "/book-service",
} as const;

export const contactLinks = {
  phone: `tel:${company.phoneInternational}`,
  whatsapp: `https://wa.me/${company.phoneInternational.replace(/\D/g, "")}`,
  facebook: company.facebook,
};

export function getWhatsAppUrl(message: string) {
  return `${contactLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = activeServices.map(service=>({id:service.id,name:service.name,description:service.short,icon:service.icon,href:`/services/${service.slug}`}));
