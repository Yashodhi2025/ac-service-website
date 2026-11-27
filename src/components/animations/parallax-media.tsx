"use client";
import { useEffect,useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function ParallaxMedia({children}:{children:ReactNode}){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const element=ref.current;if(!element)return;gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia(element);media.add("(prefers-reduced-motion: no-preference)",()=>{gsap.fromTo(element,{yPercent:-3},{yPercent:3,ease:"none",scrollTrigger:{trigger:element.parentElement??element,start:"top bottom",end:"bottom top",scrub:.6}});});return()=>media.revert();},[]);return <div ref={ref} style={{position:"absolute",inset:"-5% 0",height:"110%"}}>{children}</div>;}
