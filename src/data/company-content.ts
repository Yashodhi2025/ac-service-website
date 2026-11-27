// Publish only genuine, permission-cleared company material here.
export const projectCategories = ["Installation", "Repair", "Servicing", "Relocation", "PCB Repair"] as const;
export type Project = {
  id: string; title: string; category: (typeof projectCategories)[number]; description: string;
  image: string; imageAlt: string; location?: string; date?: string;
  comparison?: {before: string; after: string; beforeAlt: string; afterAlt: string};
};
export type Review = {id:string; name:string; quote:string; service?:string; sourceLabel:string; sourceUrl?:string; rating?:1|2|3|4|5};
export type TeamMember = {id:string; name:string; role:string; image?:string; bio:string};
export const projects: Project[] = [];
export const customerReviews: Review[] = [];
export const teamMembers: TeamMember[] = [];

export const companyBenefits = [
  {title:"Professional Technical Service", description:"A considered approach to assessment and the work agreed with you.", icon:"technical"},
  {title:"Comprehensive A/C Solutions", description:"Discuss installation, maintenance, repairs and specialist service needs in one conversation.", icon:"solutions"},
  {title:"Attention to Detail", description:"Care for the small details, from the initial checks to the final handover.", icon:"detail"},
  {title:"Clear Communication", description:"Understand the findings, proposed scope and next steps before work proceeds.", icon:"communication"},
  {title:"Customer-Focused Approach", description:"Start with your space, your concerns and the outcome you need.", icon:"customer"},
  {title:"Reliable Service Support", description:"A direct point of contact for service questions and follow-up discussions.", icon:"support"},
] as const;
