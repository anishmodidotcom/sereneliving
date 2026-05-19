"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import type { Review } from "@/data/listings";

interface ReviewsBlockProps {
  reviews: Review[];
}

export function ReviewsBlock({ reviews }: ReviewsBlockProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            What guests have told us.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
          {visible.map((review, i) => (
            <Reveal key={`${review.reviewer}-${i}`} delay={i * 80}>
              <figure className="grid gap-6 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-2">
                  <span
                    aria-hidden
                    className="block font-display text-[6rem] leading-none text-sage/40"
                  >
                    &ldquo;
                  </span>
                </div>
                <blockquote className="md:col-span-10">
                  <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] text-ink text-pretty">
                    {review.text}
                  </p>
                  <figcaption className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
                    <span aria-hidden className="h-px w-10 bg-sand" />
                    <span>
                      {review.reviewer}, from {review.country}. {review.date}.
                    </span>
                  </figcaption>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>

        {reviews.length > 3 && (
          <Reveal delay={300} className="mt-14">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-3 text-sm font-light tracking-wide text-sage-deep underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
              aria-expanded={showAll}
            >
              {showAll ? "Show fewer reviews" : `See all ${reviews.length} reviews`}
              <span aria-hidden>{showAll ? "↑" : "↓"}</span>
            </button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
