import type { Metadata } from "next";
import Image from "next/image";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "How Serene Living came to be. A decade of slow restoration, sixteen homes in Dubai, one in Goa, and a small house in London.",
};

export default function StoryPage() {
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-28 md:pt-40">
        <Container size="narrow" as="article" className="pb-32">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              We started with one house, and we kept going.
            </h1>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80"
                alt="A linen chair beside a window with soft afternoon light"
                fill
                sizes="(min-width: 768px) 920px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-16 space-y-8 text-lg leading-[1.85] text-ink md:text-xl">
            <Reveal>
              <p>
                The first home was in Jumeirah, in 2014. We were not building a
                hospitality company. We were two friends, an architect and a
                restaurateur, working on a single house we had bought together
                in a quiet street. We took our time. We worked with three local
                craftspeople. We finished a year later, six months over
                schedule and forty per cent over budget, which we thought of as
                a one-time event.
              </p>
            </Reveal>
            <Reveal>
              <p>
                A friend of a friend asked if she could stay there for a week
                between leases. She left a long handwritten note. The note is
                still in a drawer in the kitchen. A few weeks later we had
                three friends ask the same question. By the end of that year we
                had six homes, all in Dubai, all restored by the same small
                team, all let out by word of mouth.
              </p>
            </Reveal>
            <Reveal>
              <blockquote className="my-10 border-l-2 border-sage pl-8 font-display text-3xl italic leading-[1.2] text-sage-deep md:text-4xl">
                We don&rsquo;t sell nights. We sell the feeling of arriving.
              </blockquote>
            </Reveal>
            <Reveal>
              <p>
                Ten years later, we have sixteen homes in Dubai. Each one
                restored slowly, furnished with care, held to the same quiet
                standard we set with the first house. We have a team of four in
                Dubai, and another of three in Goa. We have a small house in
                London which we keep for the kind of guest who would like to
                live in Marylebone for a week.
              </p>
            </Reveal>
            <Reveal>
              <p>
                The Quiet House in Assagao is our first home outside Dubai. We
                have wanted to do this for years, and we waited until we found
                the right house, the right neighbourhood, and the right team
                to keep it running.
              </p>
            </Reveal>
            <Reveal>
              <blockquote className="my-10 border-l-2 border-sage pl-8 font-display text-3xl italic leading-[1.2] text-sage-deep md:text-4xl">
                Slow is not the same as quiet. It is a relationship with time.
              </blockquote>
            </Reveal>
            <Reveal>
              <p>
                We are still small. We answer the phone ourselves on most days.
                We choose the linens. We taste the coffee. We test the kitchen
                drawers before a home opens. We do not pretend any of this is
                special. We do, in our own way, take it seriously.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Thank you for reading. We hope you stay with us.
              </p>
              <p className="mt-2 font-script text-3xl text-terracotta">
                Aanya and Karim
              </p>
              <p className="text-sm text-ink-soft">Founders. Dubai.</p>
            </Reveal>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
