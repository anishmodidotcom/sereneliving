"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Wordmark } from "./wordmark";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "./nav-links";
import { useBookingSheet } from "@/components/booking/booking-context";

interface NavProps {
  tone?: "auto" | "solid";
}

export function Nav({ tone = "solid" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { openSheet } = useBookingSheet();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPhotographic = tone === "auto" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-editorial",
        scrolled
          ? "bg-cream/80 shadow-[0_1px_0_rgba(217,207,190,0.5)] backdrop-blur-md"
          : tone === "auto"
            ? "bg-transparent"
            : "bg-cream/70 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
          aria-label="Serene Living, home"
        >
          <Wordmark tone={onPhotographic ? "cream" : "sage"} className="md:text-3xl" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-light tracking-wide transition-colors",
                onPhotographic
                  ? "text-cream/90 hover:text-cream"
                  : "text-ink hover:text-sage-deep",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openSheet()}
            className={cn(
              "hidden h-10 items-center rounded-sm px-5 text-xs font-light uppercase tracking-eyebrow transition-colors md:inline-flex",
              onPhotographic
                ? "border border-cream/70 text-cream hover:bg-cream hover:text-sage-deep"
                : "bg-sage text-cream hover:bg-sage-deep",
            )}
          >
            Reserve
          </button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
