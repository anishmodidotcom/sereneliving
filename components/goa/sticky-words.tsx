"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WORDS = ["Wake.", "Wander.", "Linger.", "Stay."] as const;
const IMAGES = [
  "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
];

export function StickyWords() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(
        Math.max(-rect.top / total, 0),
        1,
      );
      const idx = Math.min(
        WORDS.length - 1,
        Math.floor(progress * WORDS.length),
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-ink"
      style={{ height: `${WORDS.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-opacity duration-700 ease-editorial"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden
          />
        ))}
        <div aria-hidden className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[1.2em]">
            {WORDS.map((w, i) => (
              <span
                key={w}
                className="absolute inset-0 flex items-center justify-center font-display italic text-[clamp(4rem,16vw,12rem)] leading-none text-cream transition-all duration-700 ease-editorial"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active
                      ? "translateY(0)"
                      : i < active
                        ? "translateY(-30px)"
                        : "translateY(30px)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
