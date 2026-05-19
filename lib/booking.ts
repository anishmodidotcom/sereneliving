import type { Listing } from "@/data/listings";
import type { QuoteResponse } from "./hostaway";
import { nightsBetween } from "./format";

export function localQuote(
  listing: Listing,
  checkIn: Date,
  checkOut: Date,
): QuoteResponse | null {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return null;
  const stay = listing.basePrice * nights;
  const lines = [
    {
      label: `${nights} ${nights === 1 ? "night" : "nights"} at ${listing.currency} ${listing.basePrice.toLocaleString()}`,
      amount: stay,
    },
    { label: "Cleaning fee", amount: listing.cleaningFee },
  ];

  const taxBase = stay + listing.cleaningFee;
  if (listing.city === "Dubai") {
    lines.push({
      label: "Dubai tourism fee",
      amount: Math.round(taxBase * 0.05),
    });
  } else if (listing.city === "Goa") {
    lines.push({ label: "GST", amount: Math.round(taxBase * 0.12) });
  } else if (listing.city === "London") {
    lines.push({ label: "VAT", amount: Math.round(taxBase * 0.2) });
  }

  const total = lines.reduce((s, l) => s + l.amount, 0);
  return {
    currency: listing.currency,
    nightly: listing.basePrice,
    nights,
    lines,
    subtotal: stay,
    total,
  };
}

export function rangeDays(start: Date, end: Date) {
  const days: Date[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export const COUNTRIES = [
  "United Arab Emirates",
  "United Kingdom",
  "India",
  "United States",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Australia",
  "Canada",
  "Japan",
  "Singapore",
  "Saudi Arabia",
  "Other",
];
