import type { MetadataRoute } from "next";
import { activeServices } from "@/data/services";
import { getSiteOrigin } from "@/lib/metadata";
export default function sitemap():MetadataRoute.Sitemap{const origin=getSiteOrigin();if(!origin)return [];return ["/","/services","/about","/projects","/faq","/contact","/book-service",...activeServices.map(s=>`/services/${s.slug}`)].map(path=>({url:new URL(path,origin).href}));}
