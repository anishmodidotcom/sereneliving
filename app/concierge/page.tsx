import type { Metadata } from "next";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ConciergeOpenButton } from "@/components/concierge/concierge-open-button";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "Pre-arrival concierge services for Serene Living guests. Quiet, considered, on call.",
};

const SERVICES = [
  {
    name: "Airport collection",
    note: "A black sedan from any Dubai airport. We meet you at the gate. We bring a bottle of water and a cold towel.",
  },
  {
    name: "A private chef for an evening",
    note: "Long, slow, around the kitchen table. We work with five chefs we trust. Vegetarian, regional Indian, modern Levantine, Italian, classic French. You choose.",
  },
  {
    name: "Yoga at home",
    note: "A teacher who comes to the home, on the terrace or the lawn. Forty-five minutes. Most mornings between six and nine.",
  },
  {
    name: "Massage at home",
    note: "Two therapists, two tables, two hours, two of you. Or a single ninety-minute deep tissue.",
  },
  {
    name: "Provisioning",
    note: "A welcome pantry stocked to your list before you arrive. Specifics please. We do not guess.",
  },
  {
    name: "Childcare",
    note: "Vetted nannies for the evening. Two hours minimum, two days notice.",
  },
  {
    name: "A driver for the week",
    note: "The same driver, the same car, for the whole stay. Most useful for long weekends across town.",
  },
  {
    name: "Restaurant reservations",
    note: "We know most of the floors. We can usually get a table we like with twenty-four hours notice.",
  },
  {
    name: "Boats",
    note: "Day charters out of the marina or off Bluewaters. Two crew, lunch on board. We pick the operator carefully.",
  },
  {
    name: "Tailoring and dry cleaning",
    note: "Same-day, pick up and drop off, with a real human you can call.",
  },
];

export default function ConciergePage() {
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-28 md:pt-40">
        <Container size="narrow" className="pb-12">
          <Reveal>
            <p className="eyebrow">Concierge</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Quiet, considered, on call.
            </h1>
            <p className="mt-6 text-ink-soft md:text-lg">
              Every Serene Living stay comes with a concierge. The team is real,
              the answers are quick. Below is a sample of what we are usually
              asked to arrange. If it is not on the list, ask anyway.
            </p>
          </Reveal>
        </Container>

        <section className="bg-cream py-20 md:py-28">
          <Container size="narrow">
            <Reveal>
              <ul className="divide-y divide-sand/70">
                {SERVICES.map((s, i) => (
                  <li
                    key={s.name}
                    className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-8"
                    style={{
                      transitionDelay: `${i * 40}ms`,
                    }}
                  >
                    <p className="md:col-span-4 font-display text-2xl text-ink">
                      {s.name}
                    </p>
                    <p className="md:col-span-8 text-ink-soft">{s.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="bg-sage py-24 text-cream md:py-32">
          <Container size="narrow">
            <Reveal>
              <p className="eyebrow text-cream/70">Ask anything</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-cream text-balance">
                The concierge is on right now.
              </h2>
              <p className="mt-6 max-w-xl text-cream/85 md:text-lg">
                Open the chat. The concierge knows every home we keep. Or write
                to the team on WhatsApp at +971 50 572 3577. We reply
                personally.
              </p>
              <div className="mt-10">
                <ConciergeOpenButton />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
