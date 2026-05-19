import Image from "next/image";

import type { Listing } from "@/data/listings";

export function ListingHero({ listing }: { listing: Listing }) {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={listing.heroImage}
        alt={listing.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="eyebrow text-cream/80">{listing.neighborhood}</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-cream text-balance">
            {listing.name}
          </h1>
        </div>
      </div>
    </section>
  );
}

export function ListingMeta({ listing }: { listing: Listing }) {
  return (
    <div className="border-b border-sand/60 py-6">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-ink">
          <li>
            <span className="eyebrow mr-3">Bedrooms</span>
            {listing.bedrooms}
          </li>
          <li>
            <span className="eyebrow mr-3">Baths</span>
            {listing.bathrooms}
          </li>
          <li>
            <span className="eyebrow mr-3">Sleeps</span>
            {listing.maxGuests}
          </li>
          <li>
            <span className="eyebrow mr-3">Check in</span>
            {listing.checkIn}
          </li>
          <li>
            <span className="eyebrow mr-3">Check out</span>
            {listing.checkOut}
          </li>
        </ul>
      </div>
    </div>
  );
}
