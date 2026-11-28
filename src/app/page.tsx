import { Hero } from "@/components/home/hero";
import { Expertise } from "@/components/services/expertise";
import { AcProblemFinder } from "@/components/home/ac-problem-finder";
import { HowWeWork } from "@/components/home/how-we-work";
import { WhyChoose } from "@/components/home/why-choose";
import { RecentProjects } from "@/components/home/recent-projects";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { FaqPreview } from "@/components/home/faq-preview";
import { BookingCTA } from "@/components/home/booking-cta";
import { HomepageScrollFlow } from "@/components/animations/homepage-scroll-flow";
import { SectionToneBridge } from "@/components/animations/section-tone-bridge";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HomepageScrollFlow>
        <Hero />
        <Expertise />
        <SectionToneBridge
          variant="light-to-dark"
          topVar="var(--expertise-bg, var(--color-ice-white))"
          bottomVar="var(--pf-bg, var(--color-midnight-navy))"
        />
        <AcProblemFinder />
        <SectionToneBridge
          variant="dark-to-light"
          topVar="var(--pf-bg, var(--color-midnight-navy))"
          bottomVar="var(--work-bg, var(--color-ice-white))"
        />
        <HowWeWork />
        <WhyChoose />
        <RecentProjects />
        <CustomerReviews />
        <FaqPreview />
        <SectionToneBridge
          variant="light-to-dark"
          topVar="var(--faq-bg, var(--color-ice-white))"
          bottomVar="var(--cta-bg, var(--color-midnight-navy))"
        />
        <BookingCTA />
      </HomepageScrollFlow>
    </main>
  );
}
