import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export function StoryBlock() {
  return (
    <section className="bg-cream-warm py-28 md:py-36">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
                alt="A linen-covered chair beside a window with afternoon light"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-7 md:pl-8" delay={150}>
            <p className="eyebrow">Our philosophy</p>
            <blockquote className="mt-8 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-ink text-balance">
              We don&rsquo;t sell nights. We sell{" "}
              <em className="italic text-sage-deep">the feeling</em> of arriving.
            </blockquote>
            <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>
                Every home we keep has been restored slowly, furnished with
                intent, and held to a standard you can feel the moment you walk
                in. We choose the linens, we taste the coffee, we test the
                kitchen drawers.
              </p>
              <p>
                The result is short term rental that does not feel like one. A
                home, for the length of your stay, that asks nothing of you and
                gives more than it takes.
              </p>
            </div>
            <Link
              href="/story"
              className="mt-10 inline-flex items-center gap-3 text-sm font-light tracking-wide text-sage-deep underline-offset-4 hover:underline"
            >
              Read our story
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
