import type { Metadata } from "next";
import { Suspense } from "react";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StaysGrid } from "@/components/stays/stays-grid";

export const metadata: Metadata = {
  title: "Our stays",
  description:
    "Sixteen homes in Dubai. One in Goa. A small house in London. Each chosen for the way it makes you feel.",
};

export default function StaysPage() {
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-32 md:pt-40">
        <Container className="pb-12">
          <Reveal>
            <p className="eyebrow">The collection</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Our stays.
            </h1>
            <p className="mt-6 max-w-xl text-ink-soft md:text-lg">
              Sixteen in Dubai. One in Goa. A small house in London. Each one
              chosen for how it makes you feel when you arrive.
            </p>
          </Reveal>
        </Container>
        <Suspense fallback={<div className="h-screen" />}>
          <StaysGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
