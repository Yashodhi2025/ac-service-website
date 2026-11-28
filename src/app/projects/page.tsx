import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Projects",
  "Explore permission-cleared ECME project stories across installation, repairs, servicing, relocation and PCB repair.",
  "/projects"
);

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
