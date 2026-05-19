import Link from "next/link";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="flex min-h-[60vh] items-center pt-28 md:pt-40">
        <Container size="narrow" className="py-24 text-center">
          <p className="eyebrow">Not on this floor</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
            We don&rsquo;t keep that page.
          </h1>
          <p className="mt-6 text-ink-soft md:text-lg">
            The link you followed may have been moved, or it may never have
            existed. Either way, here are a few places that are.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-sm bg-sage px-7 text-sm font-light text-cream transition-colors hover:bg-sage-deep"
            >
              Home
            </Link>
            <Link
              href="/stays"
              className="inline-flex h-12 items-center rounded-sm border border-sand px-7 text-sm font-light text-ink transition-colors hover:border-sage"
            >
              The stays
            </Link>
            <Link
              href="/goa"
              className="inline-flex h-12 items-center rounded-sm border border-sand px-7 text-sm font-light text-ink transition-colors hover:border-sage"
            >
              Goa
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
