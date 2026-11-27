"use client";
import { useId,useState } from "react";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import ui from "@/components/ui/site-ui.module.css";
import styles from "@/components/ui/faq.module.css";
export function FaqExplorer(){const[query,setQuery]=useState("");const[category,setCategory]=useState("All");const id=useId();const categories=["All",...new Set(faqs.map(f=>f.category))];const normalized=query.trim().toLowerCase();const filtered=faqs.filter(f=>(category==="All"||f.category===category)&&`${f.question} ${f.answer}`.toLowerCase().includes(normalized));
  return <div><div className={styles.controls}><label className={styles.search} htmlFor={id}>Search your questions<input id={id} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try installation, servicing or booking"/></label><div className={ui.chips} aria-label="FAQ categories">{categories.map(c=><button type="button" className={ui.chip} aria-pressed={category===c} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div></div><p role="status" className={styles.count}>{filtered.length} {filtered.length===1?"question":"questions"} found</p>{filtered.length?<FaqAccordion items={filtered}/>:<div className={ui.empty}><h3>No questions match those filters.</h3><p>Try another search or browse all questions.</p><button type="button" className={ui.outlineButton} onClick={()=>{setQuery("");setCategory("All");}}>Clear filters</button></div>}</div>;
}
