export type Service = {
  id: string; slug: string; name: string; short: string; description: string;
  image: string; imageAlt: string; icon: "installation" | "repairs" | "servicing" | "cleaning" | "gas" | "maintenance" | "commercial" | "relocation" | "pcb";
  enabled: boolean; confirmScope: boolean; scope: string[]; symptoms: string[]; benefits: string[];
};

// Enable/disable services here. Confirm additional service scope with the owner.
export const serviceCatalogue: Service[] = [
  { id:"installation", slug:"ac-installation", name:"A/C Installation", short:"A considered fit for your space", icon:"installation", image:"installation", imageAlt:"Illustrative technician fitting a wall-mounted air conditioner", enabled:true, confirmScope:false,
    description:"Plan a new A/C installation around your room, the equipment and the practical details of a careful fit.",
    scope:["Discuss the room, usage and equipment requirements.","Assess suitable indoor and outdoor unit positions.","Agree the installation scope before work begins.","Check operation and explain basic care after installation."],
    symptoms:["Installing A/C in a new space","Replacing an existing unit","Unsure where equipment should be positioned"], benefits:["A layout considered for your room","Clear discussion of the installation work","A handover that explains everyday use"] },
  { id:"repairs", slug:"ac-repair", name:"A/C Repair & Diagnostics", short:"Understand the problem before the repair", icon:"repairs", image:"repair", imageAlt:"Illustrative A/C inspection with diagnostic equipment", enabled:true, confirmScope:false,
    description:"When cooling changes or a unit stops working, an assessment helps establish the cause and the appropriate next step.",
    scope:["Listen to the symptoms you have noticed.","Inspect the unit and relevant controls.","Explain findings and discuss the proposed repair.","Review operation after the agreed work."],
    symptoms:["Not cooling as expected","Unfamiliar sounds or repeated shutdowns","A unit that will not turn on"], benefits:["An assessment before a repair decision","A chance to discuss the proposed work","A performance check after the repair"] },
  { id:"servicing", slug:"normal-ac-service", name:"Normal A/C Service", short:"Everyday care for everyday comfort", icon:"servicing", image:"normal-service", imageAlt:"Illustrative cleaning of a removable A/C filter", enabled:true, confirmScope:false,
    description:"Routine cleaning and condition checks help you understand how your A/C is performing and what care it needs.",
    scope:["Review the unit's condition and service needs.","Clean accessible filters and relevant surfaces as agreed.","Check drainage and basic operation.","Explain any findings that need further attention."],
    symptoms:["A routine service is due","Dust on filters or reduced airflow","Unsure what maintenance is needed"], benefits:["Attention to regular care","An overview of the unit's condition","Practical guidance for ongoing maintenance"] },
  { id:"cleaning", slug:"full-ac-service", name:"Full A/C Service", short:"A deeper look. A more thorough clean.", icon:"cleaning", image:"full-service", imageAlt:"Illustrative evaporator-coil cleaning with a protective bag", enabled:true, confirmScope:false,
    description:"Discuss a more detailed service when a unit needs attention beyond routine cleaning. The exact scope follows assessment.",
    scope:["Inspect filters, coils and drainage condition.","Agree the cleaning and service requirements.","Carry out the appropriate deeper cleaning.","Check operation and explain the completed service."],
    symptoms:["Visible build-up inside the unit","An unpleasant smell","Routine cleaning has not resolved concerns"], benefits:["A cleaning scope based on condition","Attention to less accessible areas","A clear explanation of any further issues"] },
  { id:"relocation", slug:"removal-reinstallation", name:"Removal & Reinstallation", short:"Taking your comfort somewhere new", icon:"relocation", image:"reinstallation", imageAlt:"Illustrative technician supporting a disconnected A/C unit", enabled:true, confirmScope:false,
    description:"Moving an A/C calls for planning at both ends. Talk through removal, the new location and the work required to reinstall it.",
    scope:["Review the existing installation and new location.","Discuss equipment suitability and removal arrangements.","Carry out the agreed removal and reinstallation.","Check operation at the new location."],
    symptoms:["Moving home or workplace","Changing a unit's position","Removing equipment before renovation"], benefits:["Planning for both locations","Careful handling of the equipment","A check after reinstallation"] },
  { id:"pcb-repair", slug:"inverter-pcb-repair", name:"Inverter PCB Repair", short:"Care for the electronics behind the cooling", icon:"pcb", image:"pcb-repair", imageAlt:"Illustrative bench inspection of a disconnected inverter board", enabled:true, confirmScope:false,
    description:"If an assessment points to the inverter control board, discuss whether a board-level inspection and repair is suitable for your unit.",
    scope:["Record the unit model and reported behaviour.","Assess whether the control board needs attention.","Discuss repair options and component availability.","Test the agreed work where appropriate."],
    symptoms:["A suspected control-board issue","Error indications requiring assessment","Intermittent operation that needs diagnosis"], benefits:["Board work considered after assessment","Clear discussion of repair feasibility","Options based on the equipment and findings"] },
  { id:"gas-refilling", slug:"gas-refilling-leak-checks", name:"Gas Refilling & Leak Checks", short:"Find out why refrigerant attention is needed", icon:"gas", image:"repair", imageAlt:"Illustrative technician assessing an A/C system", enabled:true, confirmScope:true,
    description:"Refrigerant work should follow an assessment of the system. Ask ECME about leak checks and the appropriate refrigerant service for your equipment.",
    scope:["Discuss cooling symptoms and unit details.","Assess whether refrigerant or a leak is involved.","Confirm refrigerant type, scope and availability.","Review operation after the agreed work."],
    symptoms:["Cooling performance has changed","A refrigerant issue has been suggested","You need a leak assessment"], benefits:["Assessment rather than an assumed refill","Equipment-specific scope discussion","A clearer understanding of the next step"] },
  { id:"maintenance", slug:"preventive-maintenance", name:"Preventive Maintenance", short:"A considered plan for regular care", icon:"maintenance", image:"normal-service", imageAlt:"Illustrative routine A/C filter maintenance", enabled:true, confirmScope:true,
    description:"Discuss planned care around equipment condition, usage and the needs of your home or workplace. Scheduling and scope are agreed with ECME.",
    scope:["List the units and how they are used.","Review their condition and maintenance needs.","Discuss a suitable service schedule and scope.","Review findings at each agreed visit."],
    symptoms:["Multiple units need regular care","You want to plan maintenance ahead","Equipment is used frequently"], benefits:["A schedule discussed around usage","A record of issues to follow up","Clearer planning for routine care"] },
  { id:"commercial", slug:"commercial-ac-services", name:"Commercial A/C Services", short:"Cooling care for working spaces", icon:"commercial", image:"installation", imageAlt:"Illustrative A/C installation work; not a completed commercial project", enabled:true, confirmScope:true,
    description:"Share your workplace requirements, equipment details and access arrangements so ECME can discuss suitable assessment and service options.",
    scope:["Discuss the space, equipment and operating needs.","Confirm the systems and work ECME can support.","Agree access, scope and service arrangements.","Explain findings and completed work."],
    symptoms:["A workplace cooling issue","Several units require servicing","Planning installation or equipment changes"], benefits:["A conversation about site requirements","Scope confirmed before arrangements","Service planning around the equipment"] },
].map(service => ({...service, image:`/images/services/${service.image}.webp`})) as Service[];

export const activeServices = serviceCatalogue.filter(service => service.enabled);
export const getServiceById = (id: string) => activeServices.find(service => service.id === id);
export const getServiceHref = (id: string) => {
  const service = getServiceById(id);
  return service ? `/services/${service.slug}` : "/services";
};
