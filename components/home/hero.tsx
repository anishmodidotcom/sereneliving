"use client";

import { useState } from "react";

import { KenBurns } from "@/components/motion/ken-burns";
import { StaggeredText } from "@/components/motion/staggered-text";
import { useBookingSheet } from "@/components/booking/booking-context";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Hero() {
  const { openSheet } = useBookingSheet();
  const reduced = useReducedMotion();
  const [scriptReady, setScriptReady] = useState(reduced);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <KenBurns
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2400&q=85"
        alt="A boutique living room with warm light, low linen sofas and a long oak table"
        fill
        priority
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
        duration={22}
        scale={1.1}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/60"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between px-6 pb-32 pt-28 md:px-12 md:pb-40 md:pt-40">
        <div
          className="self-end justify-self-end text-right text-cream/90 max-w-[15rem]"
          style={{
            opacity: scriptReady ? 1 : 0,
            transform: scriptReady ? "translate3d(0,0,0)" : "translate3d(0, -10px, 0)",
            transition: reduced
              ? "none"
              : "opacity 1.2s ease-out 1.5s, transform 1.2s ease-out 1.5s",
          }}
          onTransitionEnd={() => setScriptReady(true)}
        >
          <p className="font-script text-2xl leading-snug">
            a slower kind of luxury, if you'll let it find you.
          </p>
        </div>

        <div className="flex-1" />

        <div className="max-w-4xl text-cream">
          <p
            className="eyebrow text-cream/80"
            style={{
              animation: reduced ? "none" : "fade-up 800ms cubic-bezier(0.22,1,0.36,1) 200ms both",
              opacity: reduced ? 1 : 0,
            }}
          >
            Dubai &middot; London &middot; Goa
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.75rem)] leading-[1.02] text-cream text-balance">
            <span className="block">
              <StaggeredText
                text="Stay somewhere"
                as="span"
                stagger={70}
                delay={400}
              />
            </span>
            <span className="block">
              <StaggeredText
                text="that remembers you."
                as="span"
                stagger={70}
                delay={900}
                italicWords={["that"]}
                className="[&_.italic]:text-terracotta/95"
              />
            </span>
          </h1>
          <p
            className="mt-6 max-w-xl text-base text-cream/80 md:text-lg"
            style={{
              animation: reduced ? "none" : "fade-up 800ms cubic-bezier(0.22,1,0.36,1) 1700ms both",
              opacity: reduced ? 1 : 0,
            }}
          >
            Boutique homes for slow stays. Sixteen in Dubai, one in Goa, a small
            house in London. Each chosen for the way it makes you feel when you
            arrive, and the way it lets you leave.
          </p>
        </div>

        <div
          className="mt-8 md:mt-12"
          style={{
            animation: reduced ? "none" : "fade-up 800ms cubic-bezier(0.22,1,0.36,1) 2100ms both",
            opacity: reduced ? 1 : 0,
          }}
        >
          <BookingPill onOpen={() => openSheet()} />
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translate3d(0, 30px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
}

function BookingPill({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex w-full max-w-2xl flex-col rounded-full bg-cream/95 p-1.5 shadow-2xl shadow-ink/20 backdrop-blur-md md:flex-row md:items-center">
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 items-center gap-2 rounded-full px-5 py-3 text-left transition-colors hover:bg-sand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <span className="flex flex-col">
          <span className="eyebrow text-sage-deep">Where</span>
          <span className="mt-0.5 text-sm text-ink">Any city</span>
        </span>
      </button>
      <span aria-hidden className="hidden h-8 w-px bg-sand md:block" />
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 items-center gap-2 rounded-full px-5 py-3 text-left transition-colors hover:bg-sand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <span className="flex flex-col">
          <span className="eyebrow text-sage-deep">When</span>
          <span className="mt-0.5 text-sm text-ink">Pick dates</span>
        </span>
      </button>
      <span aria-hidden className="hidden h-8 w-px bg-sand md:block" />
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 items-center gap-2 rounded-full px-5 py-3 text-left transition-colors hover:bg-sand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <span className="flex flex-col">
          <span className="eyebrow text-sage-deep">Guests</span>
          <span className="mt-0.5 text-sm text-ink">2 adults</span>
        </span>
      </button>
      <button
        type="button"
        onClick={onOpen}
        className="ml-auto mt-1.5 inline-flex h-12 items-center justify-center rounded-full bg-sage px-7 text-sm font-light tracking-wide text-cream transition-colors hover:bg-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:mt-0"
      >
        Reserve
      </button>
    </div>
  );
}
