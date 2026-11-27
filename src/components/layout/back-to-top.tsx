"use client";
import { ChevronUp } from "lucide-react";
export function BackToTop(){return <button type="button" onClick={()=>{document.querySelector<HTMLElement>("#main-content")?.focus({preventScroll:true});window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}} className="inline-flex min-h-11 items-center gap-2 text-sm text-ice-white underline underline-offset-4">Back to top<ChevronUp size={18} aria-hidden="true"/></button>;}
