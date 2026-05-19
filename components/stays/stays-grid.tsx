"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LISTINGS } from "@/data/listings";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ListingCard } from "@/components/listing/listing-card";
import { FilterBar, type StaysFilters } from "./filter-bar";

export function StaysGrid() {
  const params = useSearchParams();
  const initialCity = (params.get("city") as StaysFilters["city"]) ?? "All";

  const [filters, setFilters] = useState<StaysFilters>({
    city: ["All", "Dubai", "Goa", "London"].includes(initialCity)
      ? initialCity
      : "All",
    bedrooms: 0,
    guests: 0,
  });

  useEffect(() => {
    setFilters((f) => ({ ...f, city: initialCity ?? "All" }));
  }, [initialCity]);

  const filtered = useMemo(() => {
    return LISTINGS.filter((l) => {
      if (filters.city !== "All" && l.city !== filters.city) return false;
      if (filters.bedrooms > 0) {
        if (filters.bedrooms === 4 ? l.bedrooms < 4 : l.bedrooms !== filters.bedrooms) {
          return false;
        }
      }
      if (filters.guests > 0 && l.maxGuests < filters.guests) return false;
      return true;
    });
  }, [filters]);

  return (
    <Container className="pb-32">
      <FilterBar initial={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <Reveal className="py-32 text-center">
          <p className="eyebrow">Nothing in this set</p>
          <p className="mt-4 font-display text-3xl text-ink">
            We don&rsquo;t keep one of those, yet.
          </p>
          <p className="mt-4 text-ink-soft">
            Try fewer filters, or write to the concierge.
          </p>
        </Reveal>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {filtered.map((listing, i) => (
            <Reveal
              key={listing.id}
              delay={(i % 4) * 80}
              className={i % 3 === 1 ? "md:mt-16" : ""}
            >
              <ListingCard
                listing={listing}
                aspect={i % 3 === 0 ? "tall" : i % 3 === 1 ? "square" : "wide"}
                priority={i < 2}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
