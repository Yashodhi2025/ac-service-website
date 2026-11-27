import { Hero } from "@/components/home/hero";
import { Expertise } from "@/components/services/expertise";
import { AcProblemFinder } from "@/components/home/ac-problem-finder";
import { HowWeWork } from "@/components/home/how-we-work";
import { WhyChoose } from "@/components/home/why-choose";
import { RecentProjects } from "@/components/home/recent-projects";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { FaqPreview } from "@/components/home/faq-preview";
import { BookingCTA } from "@/components/home/booking-cta";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Expertise />
      <AcProblemFinder />
      <HowWeWork />
      <WhyChoose />
      <RecentProjects />
      <CustomerReviews />
      <FaqPreview />
      <BookingCTA />
    </main>
  );
}
