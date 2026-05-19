"use client";

import { cn } from "@/lib/utils";

interface GuestPickerProps {
  adults: number;
  children: number;
  infants: number;
  maxGuests: number;
  note: string;
  onChange: (next: {
    adults: number;
    children: number;
    infants: number;
    note: string;
  }) => void;
}

export function GuestPicker({
  adults,
  children,
  infants,
  maxGuests,
  note,
  onChange,
}: GuestPickerProps) {
  const total = adults + children;
  const update = (
    field: "adults" | "children" | "infants",
    delta: number,
  ) => {
    const next = {
      adults,
      children,
      infants,
    };
    if (field === "infants") {
      next.infants = Math.max(0, infants + delta);
    } else {
      const newVal = Math.max(field === "adults" ? 1 : 0, next[field] + delta);
      const newTotal =
        (field === "adults" ? newVal : adults) +
        (field === "children" ? newVal : children);
      if (newTotal > maxGuests) return;
      next[field] = newVal;
    }
    onChange({ ...next, note });
  };

  return (
    <div className="space-y-4">
      <Row
        label="Adults"
        sub="13 years and over"
        value={adults}
        min={1}
        canDecrease={adults > 1}
        canIncrease={total < maxGuests}
        onDelta={(d) => update("adults", d)}
      />
      <Row
        label="Children"
        sub="2 to 12 years"
        value={children}
        min={0}
        canDecrease={children > 0}
        canIncrease={total < maxGuests}
        onDelta={(d) => update("children", d)}
      />
      <Row
        label="Infants"
        sub="Under 2 years"
        value={infants}
        min={0}
        canDecrease={infants > 0}
        canIncrease
        onDelta={(d) => update("infants", d)}
      />

      <div className="pt-4">
        <label className="block">
          <span className="eyebrow">Anything we should know</span>
          <textarea
            value={note}
            onChange={(e) =>
              onChange({ adults, children, infants, note: e.target.value })
            }
            placeholder="A note about the stay. Quiet floor, dog with us, anniversary, anything."
            rows={3}
            className="mt-3 w-full rounded-sm border border-sand bg-cream px-3 py-2 text-sm font-light text-ink placeholder:text-ink-soft/60 focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
          />
        </label>
      </div>

      <p className="text-xs text-ink-soft">
        The home sleeps up to {maxGuests}. Infants do not count toward the total.
      </p>
    </div>
  );
}

function Row({
  label,
  sub,
  value,
  canIncrease,
  canDecrease,
  onDelta,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  canIncrease: boolean;
  canDecrease: boolean;
  onDelta: (d: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-sand/60 py-3">
      <div>
        <p className="text-sm text-ink">{label}</p>
        <p className="text-xs text-ink-soft">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onDelta(-1)}
          disabled={!canDecrease}
          aria-label={`Decrease ${label}`}
          className={cn(
            "h-9 w-9 rounded-full border border-sand text-ink-soft transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
            !canDecrease && "cursor-not-allowed opacity-40",
          )}
        >
          &minus;
        </button>
        <span className="min-w-[2ch] text-center text-sm text-ink">{value}</span>
        <button
          type="button"
          onClick={() => onDelta(1)}
          disabled={!canIncrease}
          aria-label={`Increase ${label}`}
          className={cn(
            "h-9 w-9 rounded-full border border-sand text-ink-soft transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
            !canIncrease && "cursor-not-allowed opacity-40",
          )}
        >
          +
        </button>
      </div>
    </div>
  );
}
