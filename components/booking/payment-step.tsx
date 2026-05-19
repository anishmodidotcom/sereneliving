"use client";

import { useEffect, useState } from "react";

import type { Listing } from "@/data/listings";
import type { QuoteResponse } from "@/lib/hostaway";
import { PriceBreakdown } from "./price-breakdown";
import { formatDateRange } from "@/lib/format";

interface PaymentStepProps {
  listing: Listing;
  quote: QuoteResponse | null;
  range: { start: Date | null; end: Date | null };
  guests: { adults: number; children: number; infants: number };
  termsAccepted: boolean;
  onTermsChange: (v: boolean) => void;
  publishableKey?: string;
}

export function PaymentStep({
  listing,
  quote,
  range,
  guests,
  termsAccepted,
  onTermsChange,
  publishableKey,
}: PaymentStepProps) {
  const hasStripe = Boolean(publishableKey);
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    setCardComplete(false);
  }, [quote?.total]);

  return (
    <div className="space-y-6">
      <div className="rounded-sm bg-cream-warm p-5">
        <p className="eyebrow">Your stay</p>
        <p className="mt-2 font-display text-xl text-ink">{listing.name}</p>
        <p className="text-sm text-ink-soft">{listing.neighborhood}</p>
        {range.start && range.end && (
          <p className="mt-3 text-sm text-ink">
            {formatDateRange(range.start, range.end)}.{" "}
            {guests.adults + guests.children}{" "}
            {guests.adults + guests.children === 1 ? "guest" : "guests"}
            {guests.infants > 0
              ? `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}.`
              : "."}
          </p>
        )}
      </div>

      <div>
        <p className="eyebrow">Itemised</p>
        <div className="mt-4">
          <PriceBreakdown quote={quote} />
        </div>
      </div>

      <div>
        <p className="eyebrow">Payment</p>
        {hasStripe ? (
          <div className="mt-4 space-y-3">
            <div className="rounded-sm border border-sand bg-cream p-4">
              <label className="block text-sm text-ink">
                Card number
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  onChange={(e) => setCardComplete(e.target.value.length >= 16)}
                  className="mt-1.5 w-full bg-transparent text-base text-ink placeholder:text-ink-soft/50 focus:outline-none"
                />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-sand pt-3">
                <label className="block text-sm text-ink">
                  Expiry
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="mt-1.5 w-full bg-transparent text-base text-ink placeholder:text-ink-soft/50 focus:outline-none"
                  />
                </label>
                <label className="block text-sm text-ink">
                  CVC
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    className="mt-1.5 w-full bg-transparent text-base text-ink placeholder:text-ink-soft/50 focus:outline-none"
                  />
                </label>
              </div>
            </div>
            <p className="text-xs text-ink-soft">
              Powered by Stripe. Your card is charged the full amount on
              confirmation. Refunds follow the cancellation policy.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-sm border border-sand bg-cream-warm p-5 text-sm text-ink-soft">
            Online payment is offline at the moment. Reach the concierge on{" "}
            <a
              className="text-sage-deep underline-offset-4 hover:underline"
              href="https://wa.me/971505723577"
            >
              WhatsApp +971 50 572 3577
            </a>{" "}
            and we will take care of it.
          </div>
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-ink">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded-sm border-sand text-sage focus:ring-sage"
        />
        <span>
          I have read the house notes, the cancellation policy, and the{" "}
          <a
            className="text-sage-deep underline-offset-4 hover:underline"
            href="/terms"
          >
            terms
          </a>
          .
        </span>
      </label>

      {hasStripe && !cardComplete && (
        <p className="text-xs text-ink-soft">
          The card field is a test placeholder. Stripe Payment Element will go
          here when keys are added.
        </p>
      )}
    </div>
  );
}
