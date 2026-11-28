import { company, getWhatsAppUrl } from "@/config/site";

// Owner prefers natural Sri Lankan Sinhala-English mixed WhatsApp messages
// regardless of which UI language the visitor currently selected.
const sinhalaServiceNames: Record<string, string> = {
  "ac-installation": "A/C Installation",
  "ac-repair": "A/C Repair & Diagnostics",
  "normal-ac-service": "Normal A/C Service",
  "full-ac-service": "Full A/C Service",
  "removal-reinstallation": "A/C ගලවා නැවත සවිකිරීම (Removal & Reinstallation)",
  "inverter-pcb-repair": "Inverter Card (PCB) Repair",
  "gas-refilling-leak-checks": "Gas Refill සහ Leak Check",
  "preventive-maintenance": "Preventive Maintenance",
  "commercial-ac-services": "Commercial A/C Service",
};

const sinhalaProblemLabels: Record<string, string> = {
  "not-cooling": "A/C එක සීතල වෙන්නේ නැහැ",
  "water-leaking": "වතුර ලීක් වෙනවා",
  "unusual-noise": "අමුතු සද්දයක් එනවා",
  "not-turning-on": "A/C එක On වෙන්නේ නැහැ",
  "bad-smell": "නරක ගඳක් එනවා",
  "moving-ac": "A/C එක වෙනත් තැනකට මාරු කරන්න",
};

const sinhalaAcTypes: Record<string, string> = {
  "Wall-mounted split": "Wall-mounted Split A/C",
  Cassette: "Cassette A/C",
  Ducted: "Ducted A/C",
  "Other / not sure": "වෙනත් / හරියටම දන්නේ නැහැ",
};

const sinhalaProjectCategories: Record<string, string> = {
  All: "A/C Project එකක්",
  Installation: "A/C Installation වැඩක්",
  Repair: "A/C Repair වැඩක්",
  Servicing: "A/C Service වැඩක්",
  Relocation: "A/C Relocation වැඩක්",
  "PCB Repair": "Inverter Card (PCB) Repair වැඩක්",
};

export function getSinhalaServiceLabel(slugOrName?: string) {
  if (!slugOrName) return "A/C Service එකක්";
  return sinhalaServiceNames[slugOrName] ?? slugOrName;
}

export function buildGeneralWhatsAppMessage() {
  return `ආයුබෝවන් ${company.name}, මට A/C Service එකක් ගැන විස්තර දැනගන්න ඕනේ.`;
}

export function buildGeneralWhatsAppUrl() {
  return getWhatsAppUrl(buildGeneralWhatsAppMessage());
}

export function buildProblemWhatsAppMessage(problemId: string, fallbackLabel?: string) {
  const label = sinhalaProblemLabels[problemId] ?? fallbackLabel ?? "A/C ප්‍රශ්නයක්";
  return `ආයුබෝවන් ${company.name}, මගේ A/C එකේ ප්‍රශ්නය: ${label}. මේක check කරලා service එකක් book කරගන්න පුළුවන්ද?`;
}

export function buildServiceRequestWhatsAppMessage(serviceSlugOrName?: string) {
  if (!serviceSlugOrName) {
    return `ආයුබෝවන් ${company.name}, මට A/C Service එකක් ගැන කතා කරන්න ඕනේ. විස්තර දැනගන්න පුළුවන්ද?`;
  }
  const label = getSinhalaServiceLabel(serviceSlugOrName);
  return `ආයුබෝවන් ${company.name}, මට ${label} ගැන විස්තර දැනගන්න සහ book කරගන්න ඕනේ.`;
}

export function buildTeamTalkWhatsAppMessage() {
  return `ආයුබෝවන් ${company.name}, මගේ A/C Service අවශ්‍යතාවය ගැන කතා කරන්න පුළුවන්ද?`;
}

export function buildProjectWhatsAppMessage(category: string) {
  const label = sinhalaProjectCategories[category] ?? "A/C Project එකක්";
  return `ආයුබෝවන් ${company.name}, මට ${label} ගැන කතා කරන්න ඕනේ.`;
}

export function buildFeedbackWhatsAppMessage() {
  return `ආයුබෝවන් ${company.name}, මට ඔයාලගේ A/C Service එක ගැන මගේ අදහස (feedback) බෙදාගන්න ඕනේ.`;
}

export function buildBookingWhatsAppMessage(data: {
  serviceSlug: string;
  acType: string;
  brand?: string;
  units: number;
  issue: string;
  name: string;
  phone: string;
  location: string;
  date: string;
}) {
  const serviceName = getSinhalaServiceLabel(data.serviceSlug);
  const acTypeName = sinhalaAcTypes[data.acType] ?? data.acType;
  const brandValue = data.brand?.trim() || "සඳහන් කර නැත";

  return [
    `ආයුබෝවන් ${company.name}, මට A/C Service එකක් Book කරගන්න ඕනේ.`,
    "",
    `Service එක: ${serviceName}`,
    `A/C වර්ගය: ${acTypeName}`,
    `Brand / Model: ${brandValue}`,
    `Units ගණන: ${data.units}`,
    `ප්‍රශ්නය / අවශ්‍යතාවය: ${data.issue}`,
    "",
    `නම: ${data.name}`,
    `දුරකථන අංකය: ${data.phone}`,
    `ලිපිනය / ප්‍රදේශය: ${data.location}`,
    `කැමති දිනය: ${data.date}`,
    "",
    "මෙය Service Request එකක් බව මම දන්නවා. ලබාගත හැකි වේලාව සහ appointment එක confirm කරලා දෙන්න.",
  ].join("\n");
}

export function buildInquiryWhatsAppMessage(data: {
  name: string;
  phone: string;
  serviceSlug?: string;
  message: string;
}) {
  const serviceName = data.serviceSlug
    ? getSinhalaServiceLabel(data.serviceSlug)
    : "සාමාන්‍ය විමසීමක් (General Inquiry)";

  return [
    `ආයුබෝවන් ${company.name},`,
    "",
    `නම: ${data.name}`,
    `දුරකථන අංකය: ${data.phone}`,
    `Service එක: ${serviceName}`,
    `විස්තරය: ${data.message}`,
    "",
    "කරුණාකර මට කතා කරලා විස්තර ලබාදෙන්න.",
  ].join("\n");
}
