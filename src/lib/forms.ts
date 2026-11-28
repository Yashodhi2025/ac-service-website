import { z } from "zod";
import { activeServices } from "@/data/services";
import { enMessages } from "@/i18n/messages/en";
import type { Messages } from "@/i18n/types";

export function colomboToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
}

export function createInquirySchema(v: Messages["validation"]) {
  const phone = z
    .string()
    .trim()
    .min(1, v.phoneRequired)
    .max(24, v.phoneMax)
    .regex(/^[+\d\s()-]+$/, v.phoneFormat)
    .refine((value) => {
      const length = value.replace(/\D/g, "").length;
      return length >= 9 && length <= 15;
    }, v.phoneDigits);

  const name = z.string().trim().min(2, v.nameMin).max(80, v.nameMax);

  return z.object({
    name,
    phone,
    service: z
      .string()
      .max(100)
      .refine((value) => value === "" || activeServices.some((item) => item.slug === value), v.serviceListed),
    message: z.string().trim().min(10, v.messageMin).max(1500, v.messageMax),
  });
}

export function createBookingSchema(v: Messages["validation"]) {
  const phone = z
    .string()
    .trim()
    .min(1, v.phoneRequired)
    .max(24, v.phoneMax)
    .regex(/^[+\d\s()-]+$/, v.phoneFormat)
    .refine((value) => {
      const length = value.replace(/\D/g, "").length;
      return length >= 9 && length <= 15;
    }, v.phoneDigits);

  const name = z.string().trim().min(2, v.nameMin).max(80, v.nameMax);
  const service = z
    .string()
    .min(1, v.serviceRequired)
    .refine((value) => activeServices.some((item) => item.slug === value), v.serviceAvailable);

  return z.object({
    service,
    acType: z.enum(["Wall-mounted split", "Cassette", "Ducted", "Other / not sure"], {
      error: v.acTypeRequired,
    }),
    brand: z.string().trim().max(80, v.brandMax),
    units: z
      .number({ error: v.unitsNumber })
      .int(v.unitsInt)
      .min(1, v.unitsMin)
      .max(50, v.unitsMax),
    issue: z.string().trim().min(10, v.issueMin).max(1500, v.issueMax),
    name,
    phone,
    location: z.string().trim().min(8, v.locationMin).max(240, v.locationMax),
    date: z.iso
      .date({ error: v.dateValid })
      .refine((value) => value >= colomboToday(), v.dateFuture),
    acknowledgement: z.boolean().refine((value) => value, v.acknowledgementRequired),
  });
}

export const inquirySchema = createInquirySchema(enMessages.validation);
export type InquiryValues = z.infer<typeof inquirySchema>;

export const bookingSchema = createBookingSchema(enMessages.validation);
export type BookingValues = z.infer<typeof bookingSchema>;
