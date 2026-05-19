import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function PullQuote() {
  return (
    <section className="relative bg-sage py-28 text-cream md:py-40">
      <Container>
        <Reveal>
          <p className="eyebrow text-cream/70">In their words</p>
        </Reveal>
        <Reveal delay={120}>
          <span
            aria-hidden
            className="mt-6 block font-display text-[clamp(6rem,14vw,12rem)] leading-none text-cream/30"
          >
            &ldquo;
          </span>
        </Reveal>
        <Reveal delay={200} className="mt-[-2rem] md:mt-[-3rem]">
          <blockquote className="max-w-4xl font-display text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[1.15] text-cream text-balance">
            <em className="italic">We came for four nights and stayed seven.</em>{" "}
            The bath alone is worth the trip. The home held all of us, and the
            team made it feel easy.
          </blockquote>
        </Reveal>
        <Reveal delay={300} className="mt-10 flex items-center gap-3">
          <span aria-hidden className="h-px w-10 bg-cream/40" />
          <p className="text-sm text-cream/80">Yusuke, from Japan</p>
        </Reveal>
      </Container>
    </section>
  );
}
