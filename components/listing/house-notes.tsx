import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import type { Listing } from "@/data/listings";

export function HouseNotes({ listing }: { listing: Listing }) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">House notes</p>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
              A few things to know.
            </h2>
          </Reveal>
          <div className="md:col-span-8 grid gap-8 md:grid-cols-2">
            <Reveal delay={100}>
              <p className="eyebrow">Check in and out</p>
              <p className="mt-4 text-ink">{listing.checkIn}.</p>
              <p className="text-ink">{listing.checkOut}.</p>
            </Reveal>
            <Reveal delay={150}>
              <p className="eyebrow">The basics</p>
              <ul className="mt-4 space-y-2 text-ink">
                {listing.houseRules.map((r) => (
                  <li key={r}>{r}.</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
