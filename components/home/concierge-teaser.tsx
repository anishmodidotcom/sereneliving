"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { useConcierge } from "@/components/concierge/concierge-context";

export function ConciergeTeaser() {
  const { openPanel } = useConcierge();
  return (
    <section className="bg-sage py-28 text-cream md:py-36">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-cream/70">Anytime</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] text-balance">
              Have a question? Ask Serene.
            </h2>
            <p className="mt-6 max-w-xl text-cream/80 md:text-lg">
              A real concierge chat, available around the clock. Ask about a
              home, the neighbourhood, a private chef for Friday, a yoga
              teacher in the morning. The concierge knows every stay we keep.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5 md:flex md:justify-end" delay={150}>
            <button
              type="button"
              onClick={() => openPanel()}
              className="inline-flex h-14 items-center justify-center rounded-sm border border-cream/70 px-10 text-sm font-light uppercase tracking-eyebrow text-cream transition-colors hover:bg-cream hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
            >
              Open the chat
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
