import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { KenBurns } from "@/components/motion/ken-burns";
import { StickyWords } from "@/components/goa/sticky-words";
import { GoaReserveButton } from "@/components/goa/goa-reserve-button";
import { LISTINGS } from "@/data/listings";

export const metadata: Metadata = {
  title: "Goa, slowly",
  description:
    "Our first stay outside the city. A Portuguese-era villa in Assagao, restored slowly. Open from this winter.",
};

const ROOMS = [
  {
    eyebrow: "The verandah",
    title: "Where most of the day will happen.",
    body:
      "A long verandah runs the front of the house, with a wooden swing at one end and a low table at the other. The morning sun reaches the chairs by half past seven. Most guests take their breakfast here.",
    image:
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "The garden",
    title: "Older than the house.",
    body:
      "There is a mango tree, a jackfruit tree, three frangipanis, and a hammock that holds two. The garden has been here longer than any of us, and we left it largely alone.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "The kitchen",
    title: "Built around one window.",
    body:
      "We rebuilt the kitchen during the restoration to give it a wide window onto the garden and a separate pantry behind it. The countertops are local laterite. The chairs at the long table are six different chairs.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=80",
  },
  {
    eyebrow: "The bedrooms",
    title: "Four, quiet, all linen.",
    body:
      "Four bedrooms, each with its own bath. Each room has blackout curtains, a slow ceiling fan, and a window onto the garden or the back lane. The master bath has the largest cast iron tub we have ever placed in a home.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function GoaPage() {
  const goa = LISTINGS.find((l) => l.slug === "the-quiet-house-assagao");
  if (!goa) return null;

  return (
    <>
      <Nav tone="auto" />
      <main id="main">
        {/* Hero */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
          <KenBurns
            src={goa.heroImage}
            alt={goa.name}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
            duration={26}
            scale={1.12}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70"
          />
          <Container className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
            <Reveal>
              <p className="eyebrow text-cream/80">
                A first chapter outside the city
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="mt-6 font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-cream text-balance">
                Goa, <em className="italic text-terracotta/95">slowly</em>.
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 max-w-xl text-cream/85 md:text-lg">
                A Portuguese-era villa in Assagao, restored across two slow
                years. Our first stay outside the city. Opening this winter.
              </p>
            </Reveal>
            <Reveal delay={450} className="mt-10">
              <GoaReserveButton slug={goa.slug} />
            </Reveal>
          </Container>
        </section>

        {/* Why Goa */}
        <section className="bg-cream py-28 md:py-40">
          <Container className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Why we chose Goa</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] text-ink text-balance">
                Because Dubai is fast,{" "}
                <em className="italic text-sage-deep">and we are tired.</em>
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
              <Reveal delay={150}>
                <p>
                  We have spent a decade restoring homes in a city that does not
                  sleep, and at some point a few of us realised we wanted a
                  different kind of work. Assagao came up in conversation more
                  than once. We started looking. We found the house in July, in
                  a season most people do not buy houses in Goa.
                </p>
              </Reveal>
              <Reveal delay={250}>
                <p>
                  We watched it through one full monsoon before we touched it.
                  We let the garden settle. We learned which neighbours kept
                  hours and which kept dogs. We took the work to the local
                  craftspeople who had restored other houses on the lane.
                </p>
              </Reveal>
              <Reveal delay={350}>
                <p>
                  The result is the same brand at half the pulse. The Quiet
                  House is the first home we have opened outside Dubai. It will
                  not be the last.
                </p>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Sticky words */}
        <StickyWords />

        {/* Room walkthrough */}
        <section className="bg-cream py-28 md:py-40">
          <Container>
            <Reveal>
              <p className="eyebrow">A walk through the house</p>
              <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
                Room by room.
              </h2>
            </Reveal>

            <div className="mt-20 space-y-32 md:space-y-48">
              {ROOMS.map((room, i) => (
                <Reveal key={room.eyebrow}>
                  <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
                    <div
                      className={`relative aspect-[4/5] overflow-hidden rounded-sm bg-sand md:col-span-7 ${
                        i % 2 === 1 ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={room.image}
                        alt={room.eyebrow}
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <p className="eyebrow">{room.eyebrow}</p>
                      <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                        {room.title}
                      </h3>
                      <p className="mt-6 text-ink-soft md:text-lg">{room.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Opening */}
        <section className="bg-terracotta py-28 text-cream md:py-36">
          <Container>
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <Reveal className="md:col-span-7">
                <p className="eyebrow text-cream/70">The opening</p>
                <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-balance">
                  Reserve the soft launch.
                </h2>
                <p className="mt-6 max-w-xl text-cream/85 md:text-lg">
                  We open the house from the second week of November. The
                  opening month is offered at our holding-rate, with the team
                  on site. Stays of seven nights and above through the season.
                </p>
              </Reveal>
              <Reveal className="md:col-span-5 md:flex md:items-end md:justify-end" delay={150}>
                <div className="flex flex-col gap-3">
                  <GoaReserveButton slug={goa.slug} variant="cream" />
                  <Link
                    href={`/stays/${goa.slug}`}
                    className="text-sm font-light text-cream/85 underline-offset-4 hover:underline"
                  >
                    View the house in detail &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
