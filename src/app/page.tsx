import { Hero } from "@/components/home/hero";
import { Expertise } from "@/components/services/expertise";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Expertise />
    </main>
  );
}
