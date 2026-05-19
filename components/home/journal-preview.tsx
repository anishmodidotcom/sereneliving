import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ARTICLES } from "@/data/journal";

export function JournalPreview() {
  const articles = ARTICLES.slice(0, 3);
  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">From the journal</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">
                A slower kind of writing.
              </h2>
            </div>
            <Link
              href="/journal"
              className="hidden text-sm font-light text-sage-deep underline-offset-4 hover:underline md:inline-block"
            >
              All articles &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 120}>
              <Link
                href={`/journal/${article.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
                    style={{ transitionDuration: "1200ms" }}
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <p className="eyebrow">
                    {article.category} &middot; {article.readingMinutes} min read
                  </p>
                  <h3 className="font-display text-2xl text-ink leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-ink-soft">{article.date}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 md:hidden">
          <Link
            href="/journal"
            className="text-sm font-light text-sage-deep underline-offset-4 hover:underline"
          >
            All articles &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
