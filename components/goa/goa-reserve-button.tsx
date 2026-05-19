"use client";

import { useBookingSheet } from "@/components/booking/booking-context";

interface GoaReserveButtonProps {
  slug: string;
  variant?: "default" | "cream";
}

export function GoaReserveButton({ slug, variant = "default" }: GoaReserveButtonProps) {
  const { openSheet } = useBookingSheet();
  return (
    <button
      type="button"
      onClick={() => openSheet({ listingSlug: slug })}
      className={
        variant === "cream"
          ? "inline-flex h-14 items-center justify-center rounded-sm bg-cream px-10 text-sm font-light uppercase tracking-eyebrow text-terracotta transition-colors hover:bg-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta"
          : "inline-flex h-14 items-center justify-center rounded-sm bg-terracotta px-10 text-sm font-light uppercase tracking-eyebrow text-cream transition-colors hover:bg-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      }
    >
      Reserve the Quiet House
    </button>
  );
}
