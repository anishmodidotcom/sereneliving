"use client";

import { useEffect, useState } from "react";

import type { QuoteResponse } from "@/lib/hostaway";
import { formatCurrency } from "@/lib/format";

interface PriceBreakdownProps {
  quote: QuoteResponse | null;
  compact?: boolean;
}

export function PriceBreakdown({ quote, compact }: PriceBreakdownProps) {
  if (!quote) {
    return (
      <div className="rounded-sm border border-dashed border-sand p-5 text-sm text-ink-soft">
        Pick dates to see the price.
      </div>
    );
  }
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <ul className="space-y-2.5 text-sm">
        {quote.lines.map((l) => (
          <li key={l.label} className="flex items-baseline justify-between gap-4">
            <span className="text-ink">
              {l.label}
              {l.description && (
                <span className="block text-[11px] text-ink-soft">
                  {l.description}
                </span>
              )}
            </span>
            <AnimatedNumber
              value={l.amount}
              currency={quote.currency}
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-sand pt-4 font-display text-lg">
        <span className="text-ink">Total</span>
        <AnimatedNumber
          value={quote.total}
          currency={quote.currency}
          big
        />
      </div>
    </div>
  );
}

function AnimatedNumber({
  value,
  currency,
  big,
}: {
  value: number;
  currency: QuoteResponse["currency"];
  big?: boolean;
}) {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const from = displayed;
    const to = value;
    if (from === to) return;
    const duration = 380;
    const start = performance.now();
    let rafId = 0;
    const step = (t: number) => {
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * eased));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span
      className={
        big ? "font-display text-2xl text-ink" : "tabular-nums text-ink"
      }
    >
      {formatCurrency(displayed, currency)}
    </span>
  );
}
