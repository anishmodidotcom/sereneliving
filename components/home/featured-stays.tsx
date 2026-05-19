import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { FEATURED_LISTINGS } from "@/data/listings";
import { formatCurrency } from "@/lib/format";

export function FeaturedStays() {
  const [primary, secondaryA, secondaryB] = FEATURED_LISTINGS;
  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow">A few we love</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05] text-balance">
              Three homes to begin with.
            </h2>
            <p className="mt-6 max-w-xl text-ink-soft md:text-lg">
              Hand-picked from the wider collection. A villa on the Palm, a
              quiet apartment in the Marina, and a one-bedroom that looks at the
              fountains.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {primary && (
            <Reveal className="md:col-span-7" delay={100}>
              <FeatureCard listing={primary} size="large" />
            </Reveal>
          )}
          <div className="md:col-span-5 grid gap-6 md:gap-8">
            {secondaryA && (
              <Reveal delay={200}>
                <FeatureCard listing={secondaryA} size="medium" />
              </Reveal>
            )}
            {secondaryB && (
              <Reveal delay={300}>
                <FeatureCard listing={secondaryB} size="medium" />
              </Reveal>
            )}
          </div>
        </div>

        <Reveal delay={400} className="mt-16">
          <Link
            href="/stays"
            className="group inline-flex items-center gap-3 text-sm font-light tracking-wide text-sage-deep underline-offset-4 hover:underline"
          >
            See every stay
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

function FeatureCard({
  listing,
  size,
}: {
  listing: (typeof FEATURED_LISTINGS)[number];
  size: "large" | "medium";
}) {
  return (
    <Link
      href={`/stays/${listing.slug}`}
      className="group block focus:outline-none"
    >
      <div
        className={`relative overflow-hidden rounded-sm bg-sand ${size === "large" ? "aspect-[4/5] md:aspect-[4/5]" : "aspect-[5/4]"}`}
      >
        <Image
          src={listing.heroImage}
          alt={listing.name}
          fill
          sizes={size === "large" ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 35vw, 100vw"}
          className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
          style={{ transitionDuration: "1200ms" }}
        />
      </div>
      <div className="mt-5 space-y-1.5">
        <p className="eyebrow">{listing.neighborhood}</p>
        <h3 className={`font-display ${size === "large" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} text-ink`}>
          {listing.name}
        </h3>
        <p className="text-sm text-ink-soft">
          from {formatCurrency(listing.basePrice, listing.currency)} a night
        </p>
      </div>
    </Link>
  );
}
