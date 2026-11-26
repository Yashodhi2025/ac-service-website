// Temporary identity and contact details. Replace these before launch.
export const company = {
  name: "Aeris Air",
  descriptor: "Air conditioning",
  phone: "+94 11 000 0000",
  email: "hello@aerisair.example",
  workingHours: "Mon–Sat · 8am–6pm",
  bookingHref: "/contact#book-service",
} as const;

export const contactLinks = {
  phone: `tel:${company.phone.replace(/[^+\d]/g, "")}`,
  email: `mailto:${company.email}`,
};

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
