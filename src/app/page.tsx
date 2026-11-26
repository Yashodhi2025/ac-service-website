import { Hero } from "@/components/home/hero";
import { Expertise } from "@/components/services/expertise";
import { AcProblemFinder } from "@/components/home/ac-problem-finder";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Expertise />
      <AcProblemFinder />
    </main>
  );
}
