"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useBookingSheet } from "@/components/booking/booking-context";

export interface StaysFilters {
  city: "All" | "Dubai" | "Goa" | "London";
  bedrooms: number; // 0 = any
  guests: number; // 0 = any
}

interface FilterBarProps {
  initial: StaysFilters;
  onChange: (next: StaysFilters) => void;
}

export function FilterBar({ initial, onChange }: FilterBarProps) {
  const [filters, setFilters] = useState<StaysFilters>(initial);
  const [stuck, setStuck] = useState(false);
  const { openSheet } = useBookingSheet();

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-16 z-30 -mx-6 border-y border-sand/70 px-6 py-4 transition-all duration-500 ease-editorial md:top-20 md:-mx-12 md:px-12",
        stuck ? "bg-cream/90 backdrop-blur-md" : "bg-cream",
      )}
    >
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <Selector
          label="City"
          value={filters.city}
          options={["All", "Dubai", "Goa", "London"] as const}
          onSelect={(v) => setFilters((f) => ({ ...f, city: v }))}
        />
        <Selector
          label="Bedrooms"
          value={
            filters.bedrooms === 0
              ? "Any"
              : `${filters.bedrooms}${filters.bedrooms === 4 ? "+" : ""}`
          }
          options={["Any", "1", "2", "3", "4+"] as const}
          onSelect={(v) =>
            setFilters((f) => ({
              ...f,
              bedrooms: v === "Any" ? 0 : v === "4+" ? 4 : parseInt(v, 10),
            }))
          }
        />
        <Selector
          label="Guests"
          value={filters.guests === 0 ? "Any" : `${filters.guests}+`}
          options={["Any", "2", "4", "6", "8+"] as const}
          onSelect={(v) =>
            setFilters((f) => ({
              ...f,
              guests:
                v === "Any" ? 0 : v === "8+" ? 8 : parseInt(v, 10),
            }))
          }
        />
        <button
          type="button"
          onClick={() => openSheet()}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-sand bg-cream px-5 text-sm font-light text-ink transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <span className="eyebrow">Dates</span>
          <span className="text-sm">Pick</span>
        </button>
        <div className="ml-auto text-xs text-ink-soft">
          {filters.city !== "All" && `In ${filters.city}.`}{" "}
        </div>
      </div>
    </div>
  );
}

function Selector<T extends string>({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: readonly T[];
  onSelect: (val: T) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-sand bg-cream px-5 text-sm font-light text-ink transition-colors hover:border-sage hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <span className="eyebrow">{label}</span>
        <span className="text-sm">{value}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-ink-soft transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-40 mt-2 min-w-[10rem] overflow-hidden rounded-sm border border-sand bg-cream shadow-lg"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                role="option"
                aria-selected={opt === value}
                type="button"
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-sand/40",
                  opt === value ? "text-sage-deep" : "text-ink",
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
