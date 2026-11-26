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
  bookingHref: "/contact#book-service",
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

export const services = [
  {
    id: "installation",
    name: "A/C Installation",
    description: "New systems, fitted with care",
    icon: "installation",
  },
  {
    id: "repairs",
    name: "Repairs & Diagnostics",
    description: "Find the fault. Restore comfort.",
    icon: "repairs",
  },
  {
    id: "servicing",
    name: "Routine Servicing",
    description: "Keep your system at its best",
    icon: "servicing",
  },
  {
    id: "cleaning",
    name: "Deep Cleaning",
    description: "A fresh start for cleaner cooling",
    icon: "cleaning",
  },
  {
    id: "gas-refilling",
    name: "Gas Refilling & Leak Checks",
    description: "Refrigerant care and leak detection",
    icon: "gas",
  },
  {
    id: "maintenance",
    name: "Maintenance Plans",
    description: "Planned care, lasting performance",
    icon: "maintenance",
  },
  {
    id: "commercial",
    name: "Commercial A/C",
    description: "Cooling for workplaces and businesses",
    icon: "commercial",
  },
  {
    id: "relocation",
    name: "Relocation & Removal",
    description: "Careful disconnection and reinstallation",
    icon: "relocation",
  },
] as const;
