import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { GoaBanner } from "@/components/home/goa-banner";
import { FeaturedStays } from "@/components/home/featured-stays";
import { StoryBlock } from "@/components/home/story-block";
import { CitiesStrip } from "@/components/home/cities-strip";
import { PullQuote } from "@/components/home/pull-quote";
import { JournalPreview } from "@/components/home/journal-preview";
import { ConciergeTeaser } from "@/components/home/concierge-teaser";

export default function HomePage() {
  return (
    <>
      <Nav tone="auto" />
      <main id="main">
        <Hero />
        <GoaBanner />
        <FeaturedStays />
        <StoryBlock />
        <CitiesStrip />
        <PullQuote />
        <JournalPreview />
        <ConciergeTeaser />
      </main>
      <Footer />
    </>
  );
}
