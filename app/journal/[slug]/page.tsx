import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ARTICLES, getArticle } from "@/data/journal";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.cover }],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-28 md:pt-40">
        <Container size="narrow" as="article" className="pb-32">
          <Reveal>
            <p className="eyebrow">
              {article.category} &middot; {article.readingMinutes} min read
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-balance">
              {article.title}
            </h1>
            <p className="mt-6 text-sm text-ink-soft">{article.date}</p>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-sand">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 768px) 920px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-16 space-y-8 text-lg leading-[1.85] text-ink md:text-xl">
            {article.body.map((p, i) => (
              <Reveal key={i}>
                {i === 0 ? (
                  <p>
                    <span className="float-left mr-3 mt-1 font-display text-[5.5rem] leading-[0.85] text-sage-deep">
                      {p[0]}
                    </span>
                    {p.slice(1)}
                  </p>
                ) : (
                  <p>{p}</p>
                )}
              </Reveal>
            ))}
          </div>
        </Container>

        {related.length > 0 && (
          <section className="bg-cream-warm py-24 md:py-32">
            <Container>
              <Reveal>
                <p className="eyebrow">Also from the journal</p>
              </Reveal>
              <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
                {related.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 100}>
                    <Link href={`/journal/${a.slug}`} className="group block">
                      <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-sand">
                        <Image
                          src={a.cover}
                          alt={a.title}
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
                          style={{ transitionDuration: "1200ms" }}
                        />
                      </div>
                      <div className="mt-5">
                        <p className="eyebrow">
                          {a.category} &middot; {a.readingMinutes} min read
                        </p>
                        <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                          {a.title}
                        </h3>
                        <p className="mt-2 text-sm text-ink-soft">{a.date}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
