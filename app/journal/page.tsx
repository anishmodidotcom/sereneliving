import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ARTICLES } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "A slow journal from the Serene Living team. Field notes, design notes, philosophy.",
};

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-28 md:pt-40">
        <Container className="pb-12">
          <Reveal>
            <p className="eyebrow">Journal</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              A slow journal.
            </h1>
            <p className="mt-6 max-w-xl text-ink-soft md:text-lg">
              Field notes, design notes, the occasional opinion. We write
              infrequently and on purpose.
            </p>
          </Reveal>
        </Container>

        <Container className="pb-32">
          {lead && (
            <Reveal className="mb-20 md:mb-28">
              <Link href={`/journal/${lead.slug}`} className="group block">
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-sand md:col-span-7">
                    <Image
                      src={lead.cover}
                      alt={lead.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
                      style={{ transitionDuration: "1200ms" }}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <p className="eyebrow">
                      {lead.category} &middot; {lead.readingMinutes} min read
                    </p>
                    <h2 className="mt-5 font-display text-3xl text-ink md:text-5xl">
                      {lead.title}
                    </h2>
                    <p className="mt-6 text-ink-soft md:text-lg">
                      {lead.excerpt}
                    </p>
                    <p className="mt-6 text-sm text-ink-soft">{lead.date}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
                      style={{ transitionDuration: "1200ms" }}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="eyebrow">
                      {a.category} &middot; {a.readingMinutes} min read
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{a.date}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
