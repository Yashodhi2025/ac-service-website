"use client";
import { useId,useState } from "react";
import { motion,useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import styles from "./faq.module.css";
export function FaqAccordion({items}:{items:Faq[]}){
  const [open,setOpen]=useState<string|null>(null);const uid=useId();const reduce=useReducedMotion();
  return <div className={styles.accordion}>{items.map(item=>{const active=open===item.id;const id=`${uid}-${item.id}`;return <div className={styles.item} key={item.id}><h3><button type="button" id={`${id}-button`} aria-expanded={active} aria-controls={id} onClick={()=>setOpen(active?null:item.id)}>{item.question}<Plus size={20} aria-hidden="true" className={active?styles.rotated:undefined}/></button></h3><motion.div id={id} role="region" aria-labelledby={`${id}-button`} aria-hidden={!active} inert={!active} className={styles.answer} initial={false} animate={{height:active?"auto":0,opacity:active?1:0}} transition={{duration:reduce?0:.22}}><p>{item.answer}</p></motion.div></div>;})}</div>;
}
