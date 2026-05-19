"use client";

import { useState } from "react";

import type { Listing } from "@/data/listings";
import { formatCurrency } from "@/lib/format";
import { useBookingSheet } from "@/components/booking/booking-context";
import { localQuote } from "@/lib/booking";

interface StickyBookingCardProps {
  listing: Listing;
}

export function StickyBookingCard({ listing }: StickyBookingCardProps) {
  const { openSheet } = useBookingSheet();
  const [guests, setGuests] = useState(2);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  const after = new Date(tomorrow);
  after.setDate(after.getDate() + 3);
  const previewQuote = localQuote(listing, tomorrow, after);

  return (
    <>
      <aside className="sticky top-24 hidden md:block">
        <div className="rounded-sm border border-sand bg-cream p-6 shadow-[0_8px_24px_-12px_rgba(44,44,42,0.18)]">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-3xl text-ink">
              {formatCurrency(listing.basePrice, listing.currency)}
            </p>
            <p className="text-xs text-ink-soft">per night</p>
          </div>

          <button
            type="button"
            onClick={() => openSheet({ listingSlug: listing.slug, guests })}
            className="mt-6 grid w-full grid-cols-2 overflow-hidden rounded-sm border border-sand text-left transition-colors hover:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span className="border-r border-sand px-4 py-3">
              <span className="eyebrow block">Check in</span>
              <span className="mt-1 block text-sm">Pick a date</span>
            </span>
            <span className="px-4 py-3">
              <span className="eyebrow block">Check out</span>
              <span className="mt-1 block text-sm">Pick a date</span>
            </span>
          </button>

          <div className="mt-3 flex items-center justify-between rounded-sm border border-sand px-4 py-3">
            <div>
              <p className="eyebrow">Guests</p>
              <p className="mt-1 text-sm">{guests} adults</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                aria-label="Decrease guests"
                className="h-8 w-8 rounded-full border border-sand text-ink-soft transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={() =>
                  setGuests((g) => Math.min(listing.maxGuests, g + 1))
                }
                aria-label="Increase guests"
                className="h-8 w-8 rounded-full border border-sand text-ink-soft transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openSheet({ listingSlug: listing.slug, guests })}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-sm bg-sage text-sm font-light tracking-wide text-cream transition-colors hover:bg-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            Reserve
          </button>

          {previewQuote && (
            <div className="mt-6 space-y-2 text-sm">
              <p className="eyebrow">Indicative total for three nights</p>
              <p className="font-display text-2xl text-ink">
                {formatCurrency(previewQuote.total, listing.currency)}
              </p>
              <p className="text-xs text-ink-soft">
                Final total adjusts to your dates and group.
              </p>
            </div>
          )}
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-cream/95 px-6 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl text-ink">
              {formatCurrency(listing.basePrice, listing.currency)}
            </p>
            <p className="text-xs text-ink-soft">per night</p>
          </div>
          <button
            type="button"
            onClick={() => openSheet({ listingSlug: listing.slug })}
            className="inline-flex h-11 items-center rounded-sm bg-sage px-6 text-sm font-light text-cream transition-colors hover:bg-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            Reserve
          </button>
        </div>
      </div>
    </>
  );
}
