import { z } from "zod";
import { activeServices } from "@/data/services";

export function colomboToday(){const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Colombo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());return ["year","month","day"].map(type=>parts.find(part=>part.type===type)?.value).join("-");}
const phone=z.string().trim().min(1,"Enter your phone number.").max(24,"Use a valid phone number.").regex(/^[+\d\s()-]+$/,"Use digits and a country code if needed.").refine(value=>{const length=value.replace(/\D/g,"").length;return length>=9&&length<=15;},"Enter a phone number with 9 to 15 digits.");
const name=z.string().trim().min(2,"Enter your name (at least 2 characters).").max(80,"Use no more than 80 characters.");
const service=z.string().min(1,"Choose a service.").refine(value=>activeServices.some(item=>item.slug===value),"Choose an available service.");
export const inquirySchema=z.object({name,phone,service:z.string().max(100).refine(value=>value===""||activeServices.some(item=>item.slug===value),"Choose a listed service."),message:z.string().trim().min(10,"Please describe your inquiry in at least 10 characters.").max(1500,"Use no more than 1,500 characters.")});
export type InquiryValues=z.infer<typeof inquirySchema>;
export const bookingSchema=z.object({
  service,
  acType:z.enum(["Wall-mounted split","Cassette","Ducted","Other / not sure"],{error:"Choose an A/C type or Not sure."}),
  brand:z.string().trim().max(80,"Use no more than 80 characters."),
  units:z.number({error:"Enter the number of units."}).int("Enter a whole number.").min(1,"Enter at least 1 unit.").max(50,"For more than 50 units, contact ECME directly."),
  issue:z.string().trim().min(10,"Describe your needs in at least 10 characters.").max(1500,"Use no more than 1,500 characters."),
  name,phone,
  location:z.string().trim().min(8,"Enter a service location with at least 8 characters.").max(240,"Use no more than 240 characters."),
  date:z.iso.date({error:"Choose a valid preferred date."}).refine(value=>value>=colomboToday(),"Choose today or a future date (Sri Lanka time)."),
  acknowledgement:z.boolean().refine(value=>value,"Please acknowledge that the date needs ECME confirmation."),
});
export type BookingValues=z.infer<typeof bookingSchema>;
