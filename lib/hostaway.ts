import { LISTINGS, getListing, type Listing } from "@/data/listings";
import { nightsBetween } from "./format";

const HOSTAWAY_API = "https://api.hostaway.com/v1";

function hasCreds() {
  return Boolean(process.env.HOSTAWAY_API_KEY && process.env.HOSTAWAY_ACCOUNT_ID);
}

export interface AvailabilityRange {
  date: string;
  available: boolean;
  price?: number;
}

export interface AvailabilityResponse {
  listingId: string;
  unavailable: string[];
  source: "mock" | "hostaway";
}

export interface ReservationPayload {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: { adults: number; children: number; infants: number };
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    note?: string;
  };
}

export interface ReservationResult {
  reservationId: string;
  status: "pending" | "confirmed";
  source: "mock" | "hostaway";
}

export interface QuoteInput {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface QuoteLine {
  label: string;
  amount: number;
  description?: string;
}

export interface QuoteResponse {
  currency: Listing["currency"];
  nightly: number;
  nights: number;
  lines: QuoteLine[];
  subtotal: number;
  total: number;
}

function deterministicUnavailable(seed: string, from: Date, to: Date) {
  const dates: string[] = [];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  const cursor = new Date(from);
  while (cursor <= to) {
    const stamp = cursor.toISOString().slice(0, 10);
    const dayHash = (hash + cursor.getDate() + cursor.getMonth() * 7) % 11;
    if (dayHash === 0 || dayHash === 1) dates.push(stamp);
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export async function getListingAvailability(
  listingHostawayId: string,
  checkIn: string,
  checkOut: string,
): Promise<AvailabilityResponse> {
  if (!hasCreds()) {
    return {
      listingId: listingHostawayId,
      unavailable: deterministicUnavailable(
        listingHostawayId,
        new Date(checkIn),
        new Date(checkOut),
      ),
      source: "mock",
    };
  }
  const url = new URL(`${HOSTAWAY_API}/listings/${listingHostawayId}/calendar`);
  url.searchParams.set("startDate", checkIn);
  url.searchParams.set("endDate", checkOut);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.HOSTAWAY_API_KEY}`,
      "Cache-Control": "no-cache",
    },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Hostaway calendar error: ${res.status}`);
  const data = (await res.json()) as { result: AvailabilityRange[] };
  return {
    listingId: listingHostawayId,
    unavailable: data.result.filter((d) => !d.available).map((d) => d.date),
    source: "hostaway",
  };
}

export async function getQuote(input: QuoteInput): Promise<QuoteResponse | null> {
  const listing =
    LISTINGS.find((l) => l.hostawayListingId === input.listingId) ??
    getListing(input.listingId);
  if (!listing) return null;
  const nights = nightsBetween(new Date(input.checkIn), new Date(input.checkOut));
  if (nights <= 0) return null;

  const nightly = listing.basePrice;
  const stay = nightly * nights;
  const cleaning = listing.cleaningFee;
  const lines: QuoteLine[] = [
    {
      label: `${nights} ${nights === 1 ? "night" : "nights"} at ${listing.currency} ${nightly.toLocaleString()}`,
      amount: stay,
    },
    { label: "Cleaning fee", amount: cleaning },
  ];

  const taxBase = stay + cleaning;
  if (listing.city === "Dubai") {
    const tourism = Math.round(taxBase * 0.05);
    lines.push({
      label: "Dubai tourism fee",
      amount: tourism,
      description: "Five percent, mandatory.",
    });
  } else if (listing.city === "Goa") {
    const gst = Math.round(taxBase * 0.12);
    lines.push({
      label: "GST",
      amount: gst,
      description: "Twelve percent on bookings under thirty days.",
    });
  } else if (listing.city === "London") {
    const vat = Math.round(taxBase * 0.2);
    lines.push({ label: "VAT", amount: vat });
  }

  const total = lines.reduce((s, l) => s + l.amount, 0);

  return {
    currency: listing.currency,
    nightly,
    nights,
    lines,
    subtotal: stay,
    total,
  };
}

export async function createReservation(
  payload: ReservationPayload,
): Promise<ReservationResult> {
  if (!hasCreds()) {
    return {
      reservationId: `mock-${Date.now()}`,
      status: "pending",
      source: "mock",
    };
  }

  const res = await fetch(`${HOSTAWAY_API}/reservations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HOSTAWAY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      listingMapId: payload.listingId,
      arrivalDate: payload.checkIn,
      departureDate: payload.checkOut,
      numberOfGuests:
        payload.guests.adults + payload.guests.children,
      guestFirstName: payload.guest.firstName,
      guestLastName: payload.guest.lastName,
      guestEmail: payload.guest.email,
      phone: payload.guest.phone,
      guestCountry: payload.guest.country,
      guestNote: payload.guest.note,
    }),
  });
  if (!res.ok) throw new Error(`Hostaway reservation error: ${res.status}`);
  const data = (await res.json()) as { result: { id: number; status: string } };
  return {
    reservationId: String(data.result.id),
    status: data.result.status === "confirmed" ? "confirmed" : "pending",
    source: "hostaway",
  };
}
