"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { LISTINGS, type Listing } from "@/data/listings";
import { localQuote } from "@/lib/booking";
import { useBookingSheet } from "./booking-context";
import { CalendarRange } from "./calendar-range";
import { GuestPicker } from "./guest-picker";
import { GuestForm, type GuestFormValues } from "./guest-form";
import { PaymentStep } from "./payment-step";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDateRange, nightsBetween } from "@/lib/format";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = {
  1: "Dates",
  2: "Guests",
  3: "Your details",
  4: "Review and pay",
};

export function BookingSheet() {
  const { open, closeSheet, target } = useBookingSheet();
  const [step, setStep] = useState<Step>(1);
  const [listingSlug, setListingSlug] = useState<string | undefined>(
    target.listingSlug,
  );
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>(
    { start: null, end: null },
  );
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    note: "",
  });
  const [form, setForm] = useState<GuestFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    source: string;
  } | null>(null);

  useEffect(() => {
    if (target.listingSlug) setListingSlug(target.listingSlug);
    if (target.guests) {
      setGuests((g) => ({ ...g, adults: target.guests ?? g.adults }));
    }
  }, [target]);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setConfirmation(null);
  }, [open]);

  const listing: Listing | undefined = useMemo(
    () =>
      listingSlug
        ? LISTINGS.find((l) => l.slug === listingSlug)
        : LISTINGS[0],
    [listingSlug],
  );

  useEffect(() => {
    if (!listing) return;
    const today = new Date();
    const to = new Date();
    to.setDate(today.getDate() + 120);
    fetch(
      `/api/availability?listingId=${listing.hostawayListingId}&checkIn=${today.toISOString().slice(0, 10)}&checkOut=${to.toISOString().slice(0, 10)}`,
    )
      .then((r) => r.json())
      .then((data: { unavailable: string[] }) => {
        setUnavailable(new Set(data.unavailable ?? []));
      })
      .catch(() => setUnavailable(new Set()));
  }, [listing]);

  const quote = useMemo(() => {
    if (!listing || !range.start || !range.end) return null;
    return localQuote(listing, range.start, range.end);
  }, [listing, range]);

  function next() {
    setStep((s) => (s === 4 ? 4 : ((s + 1) as Step)));
  }
  function back() {
    setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)));
  }

  function validateForm() {
    if (!form.firstName) return "firstName";
    if (!form.lastName) return "lastName";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return "email";
    if (!form.phone || form.phone.length < 6) return "phone";
    if (!form.country) return "country";
    return null;
  }

  const canProceed =
    step === 1
      ? Boolean(range.start && range.end)
      : step === 2
        ? guests.adults >= 1
        : step === 3
          ? validateForm() === null
          : terms;

  async function submit() {
    if (!listing || !range.start || !range.end) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.hostawayListingId,
          checkIn: range.start.toISOString().slice(0, 10),
          checkOut: range.end.toISOString().slice(0, 10),
          guests: {
            adults: guests.adults,
            children: guests.children,
            infants: guests.infants,
          },
          guest: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            country: form.country,
            note: guests.note,
          },
        }),
      });
      const data = (await res.json()) as {
        reservationId?: string;
        source?: string;
        error?: string;
      };
      if (!res.ok || !data.reservationId) {
        throw new Error(data.error ?? "Reservation failed");
      }
      setConfirmation({
        id: data.reservationId,
        source: data.source ?? "mock",
      });
    } catch {
      setConfirmation({ id: "issue", source: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const nights =
    range.start && range.end ? nightsBetween(range.start, range.end) : 0;

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : closeSheet())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col bg-cream p-0 sm:max-w-[480px]"
      >
        <SheetTitle className="sr-only">Reserve {listing?.name ?? "a stay"}</SheetTitle>

        <div className="px-6 pt-7">
          <ProgressBar step={step} />
          <div className="mt-3 flex items-baseline justify-between">
            <p className="eyebrow">Step {step} of 4</p>
            <p className="text-xs text-ink-soft">{STEP_LABELS[step]}</p>
          </div>
          {listing && (
            <p className="mt-4 font-display text-2xl text-ink">{listing.name}</p>
          )}
        </div>

        {confirmation ? (
          <Confirmation
            confirmation={confirmation}
            listing={listing}
            range={range}
            onClose={closeSheet}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-ink-soft">
                      Pick your check in and check out. Crossed out days are
                      already booked.
                    </p>
                  </div>
                  <CalendarRange
                    range={range}
                    onSelect={setRange}
                    unavailable={unavailable}
                  />
                  {range.start && range.end && (
                    <p className="text-sm text-ink">
                      {formatDateRange(range.start, range.end)}.{" "}
                      <span className="text-ink-soft">
                        {nights} {nights === 1 ? "night" : "nights"}.
                      </span>
                    </p>
                  )}
                </div>
              )}

              {step === 2 && listing && (
                <GuestPicker
                  adults={guests.adults}
                  children={guests.children}
                  infants={guests.infants}
                  note={guests.note}
                  maxGuests={listing.maxGuests}
                  onChange={(g) => setGuests((prev) => ({ ...prev, ...g }))}
                />
              )}

              {step === 3 && (
                <GuestForm values={form} onChange={setForm} />
              )}

              {step === 4 && listing && (
                <PaymentStep
                  listing={listing}
                  quote={quote}
                  range={range}
                  guests={guests}
                  termsAccepted={terms}
                  onTermsChange={setTerms}
                  publishableKey={publishableKey}
                />
              )}
            </div>

            <div className="border-t border-sand/60 bg-cream/95 px-6 py-4 backdrop-blur">
              {step < 4 ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm">
                    {quote ? (
                      <div>
                        <p className="eyebrow">Running total</p>
                        <p className="mt-1 font-display text-xl text-ink">
                          {formatCurrency(quote.total, quote.currency)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-ink-soft">Pick dates for a quote.</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex h-11 items-center px-4 text-sm text-ink-soft hover:text-sage-deep"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canProceed}
                      className="inline-flex h-11 items-center rounded-sm bg-sage px-6 text-sm font-light text-cream transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex h-11 items-center px-4 text-sm text-ink-soft hover:text-sage-deep"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!canProceed || submitting}
                    className="inline-flex h-11 items-center rounded-sm bg-sage px-6 text-sm font-light text-cream transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Confirming." : "Confirm reservation"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((s) => (
        <span
          key={s}
          className={cn(
            "h-[2px] flex-1 rounded-full transition-colors duration-500 ease-editorial",
            s <= step ? "bg-sage" : "bg-sand",
          )}
        />
      ))}
    </div>
  );
}

function Confirmation({
  confirmation,
  listing,
  range,
  onClose,
}: {
  confirmation: { id: string; source: string };
  listing: Listing | undefined;
  range: { start: Date | null; end: Date | null };
  onClose: () => void;
}) {
  if (confirmation.source === "error") {
    return (
      <div className="flex-1 px-6 py-10 text-sm">
        <p className="eyebrow text-terracotta">A small issue</p>
        <p className="mt-4 font-display text-2xl text-ink">
          The reservation didn&rsquo;t go through.
        </p>
        <p className="mt-3 text-ink-soft">
          Please write to the concierge on WhatsApp at{" "}
          <a
            className="text-sage-deep underline-offset-4 hover:underline"
            href="https://wa.me/971505723577"
          >
            +971 50 572 3577
          </a>
          .
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex h-11 items-center rounded-sm border border-sand px-5 text-sm hover:border-sage"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-12 text-sm">
      <p className="eyebrow">It&rsquo;s done</p>
      <p className="mt-4 font-display text-3xl text-ink">
        We&rsquo;ve got it from here.
      </p>
      {listing && range.start && range.end && (
        <p className="mt-3 text-ink-soft">
          {listing.name}, {formatDateRange(range.start, range.end)}.
        </p>
      )}
      <p className="mt-6 text-ink-soft">
        Confirmation <span className="text-ink">{confirmation.id}</span> is on its
        way to your inbox. The concierge will reach you a few days before check
        in with everything you need.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-10 inline-flex h-11 items-center rounded-sm bg-sage px-6 text-sm text-cream hover:bg-sage-deep"
      >
        Close
      </button>
    </div>
  );
}
