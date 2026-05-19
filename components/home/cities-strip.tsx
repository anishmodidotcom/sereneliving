"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

const CITIES = [
  {
    name: "Dubai",
    href: "/stays?city=Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "London",
    href: "/stays?city=London",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Goa",
    href: "/goa",
    image:
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export function CitiesStrip() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-cream py-28 md:py-36">
      <Container>
        <Reveal>
          <p className="eyebrow">Where we keep homes</p>
        </Reveal>

        <div className="relative mt-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <Reveal delay={100}>
            <ul className="space-y-3 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[1] text-ink">
              {CITIES.map((c, i) => (
                <li
                  key={c.name}
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex items-center gap-6"
                >
                  <Link
                    href={c.href}
                    className="inline-block transition-colors duration-500 ease-editorial group-hover:text-sage-deep focus:outline-none focus-visible:text-sage-deep"
                  >
                    <span
                      className={
                        hovered === c.name
                          ? "italic"
                          : hovered && hovered !== c.name
                            ? "opacity-40"
                            : ""
                      }
                      style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
                    >
                      {c.name}.
                    </span>
                  </Link>
                  {i < CITIES.length - 1 && (
                    <span aria-hidden className="hidden h-px w-12 bg-sand md:block" />
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={250} className="hidden md:block">
            <div className="relative h-64 w-64 overflow-hidden rounded-sm bg-sand">
              {CITIES.map((c) => (
                <Image
                  key={c.name}
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="256px"
                  className="object-cover transition-opacity duration-700 ease-editorial"
                  style={{
                    opacity:
                      hovered === c.name
                        ? 1
                        : hovered === null && c.name === "Dubai"
                          ? 1
                          : 0,
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
