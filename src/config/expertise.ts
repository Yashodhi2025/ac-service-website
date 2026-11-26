// Home-page editorial order matches the bento grid's visual and keyboard order.
export const expertiseServices = [
  {
    id: "installation",
    name: "A/C Installation",
    description: "The right system, thoughtfully fitted. Enjoy reliable cooling from the very first switch-on.",
    image: "/images/services/installation.webp",
    imageAlt: "Technician carefully fitting a white wall-mounted air conditioner",
    layout: "installation",
    sizes: "(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 92vw",
  },
  {
    id: "servicing",
    name: "Normal A/C Service",
    description: "Routine cleaning and checks to keep everyday cooling effortless.",
    image: "/images/services/normal-service.webp",
    imageAlt: "Technician brushing a removable air conditioner filter",
    layout: "routine",
    sizes: "(min-width: 1024px) 22vw, (min-width: 640px) 24vw, 48vw",
  },
  {
    id: "cleaning",
    name: "Full A/C Service",
    description: "A deeper clean for your system, from coils to the details in between.",
    image: "/images/services/full-service.webp",
    imageAlt: "Air conditioner coils being washed inside a protective cleaning bag",
    layout: "full",
    sizes: "(min-width: 1024px) 22vw, (min-width: 640px) 24vw, 48vw",
  },
  {
    id: "repairs",
    name: "A/C Repair",
    description: "Find the fault. Fix the cause. Get your comfort back with careful diagnostics and repair.",
    image: "/images/services/repair.webp",
    imageAlt: "Technician inspecting an open air conditioner with diagnostic equipment",
    layout: "repair",
    sizes: "(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 92vw",
  },
  {
    id: "relocation",
    name: "Removal & Reinstallation",
    description: "A fresh space, the same comfort. Careful removal and a precise fit at your next location.",
    image: "/images/services/reinstallation.webp",
    imageAlt: "Technician supporting a disconnected air conditioner at its mounting bracket",
    layout: "relocation",
    sizes: "(min-width: 1280px) 400px, (min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw",
  },
  {
    id: "pcb-repair",
    name: "Inverter PCB Repair",
    description: "Specialist attention for the electronics at the heart of your cooling system.",
    image: "/images/services/pcb-repair.webp",
    imageAlt: "Detailed bench repair of a disconnected inverter circuit board",
    layout: "pcb",
    sizes: "(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw",
  },
] as const;

export type ExpertiseService = (typeof expertiseServices)[number];
