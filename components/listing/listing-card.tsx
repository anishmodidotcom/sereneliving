import Link from "next/link";
import Image from "next/image";

import type { Listing } from "@/data/listings";
import { formatCurrency } from "@/lib/format";

interface ListingCardProps {
  listing: Listing;
  aspect?: "tall" | "wide" | "square";
  priority?: boolean;
}

const aspectClass = {
  tall: "aspect-[3/4]",
  wide: "aspect-[5/4]",
  square: "aspect-square",
} as const;

export function ListingCard({
  listing,
  aspect = "wide",
  priority,
}: ListingCardProps) {
  return (
    <Link href={`/stays/${listing.slug}`} className="group block focus:outline-none">
      <div
        className={`relative overflow-hidden rounded-sm bg-sand ${aspectClass[aspect]}`}
      >
        <Image
          src={listing.heroImage}
          alt={listing.name}
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform ease-editorial group-hover:scale-[1.04]"
          style={{ transitionDuration: "1200ms" }}
        />
        {listing.goaLaunch && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-terracotta px-3 py-1 text-[10px] font-light uppercase tracking-[0.32em] text-cream">
            Newly opened
          </span>
        )}
      </div>
      <div className="mt-5 grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-1.5">
          <p className="eyebrow">{listing.neighborhood}</p>
          <h3 className="font-display text-2xl text-ink md:text-3xl">
            {listing.name}
          </h3>
          <p className="text-xs text-ink-soft">
            {listing.bedrooms} bedrooms &middot; {listing.bathrooms} baths
            &middot; sleeps {listing.maxGuests}
          </p>
        </div>
        <p className="text-sm text-ink-soft md:text-right">
          from{" "}
          <span className="text-ink">
            {formatCurrency(listing.basePrice, listing.currency)}
          </span>{" "}
          a night
        </p>
      </div>
    </Link>
  );
}
