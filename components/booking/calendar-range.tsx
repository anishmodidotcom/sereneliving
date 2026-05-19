"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

interface CalendarRangeProps {
  monthsToShow?: number;
  range: { start: Date | null; end: Date | null };
  onSelect: (range: { start: Date | null; end: Date | null }) => void;
  unavailable: Set<string>;
  minDate?: Date;
}

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarRange({
  monthsToShow = 2,
  range,
  onSelect,
  unavailable,
  minDate,
}: CalendarRangeProps) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const floor = minDate ?? today;

  const months = useMemo(() => {
    const cursor = startOfMonth(floor);
    return Array.from({ length: monthsToShow }, (_, i) => addMonths(cursor, i));
  }, [floor, monthsToShow]);

  function handleClick(d: Date) {
    if (unavailable.has(isoDay(d))) return;
    if (d < floor) return;
    if (!range.start || (range.start && range.end)) {
      onSelect({ start: d, end: null });
      return;
    }
    if (d <= range.start) {
      onSelect({ start: d, end: null });
      return;
    }
    // Disallow ranges that span unavailable days
    const cursor = new Date(range.start);
    while (cursor < d) {
      cursor.setDate(cursor.getDate() + 1);
      if (unavailable.has(isoDay(cursor))) {
        onSelect({ start: d, end: null });
        return;
      }
    }
    onSelect({ start: range.start, end: d });
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {months.map((m) => (
        <MonthGrid
          key={`${m.getFullYear()}-${m.getMonth()}`}
          month={m}
          range={range}
          unavailable={unavailable}
          floor={floor}
          onPick={handleClick}
        />
      ))}
    </div>
  );
}

function MonthGrid({
  month,
  range,
  unavailable,
  floor,
  onPick,
}: {
  month: Date;
  range: { start: Date | null; end: Date | null };
  unavailable: Set<string>;
  floor: Date;
  onPick: (d: Date) => void;
}) {
  const monthName = month.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDow = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  }

  const weekHeaders = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div>
      <p className="mb-4 text-center font-display text-lg text-ink">
        {monthName}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-eyebrow text-ink-soft">
        {weekHeaders.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <span key={i} aria-hidden />;
          const iso = isoDay(cell);
          const disabled = cell < floor || unavailable.has(iso);
          const isStart = range.start && sameDay(cell, range.start);
          const isEnd = range.end && sameDay(cell, range.end);
          const inRange =
            range.start &&
            range.end &&
            cell > range.start &&
            cell < range.end;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(cell)}
              className={cn(
                "relative aspect-square text-sm font-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-1 focus-visible:ring-offset-cream",
                disabled
                  ? "cursor-not-allowed text-ink-soft/30 line-through"
                  : "text-ink hover:bg-sand/50",
                inRange && "bg-sage-light/40 text-sage-deep",
                (isStart || isEnd) &&
                  "rounded-full bg-sage text-cream hover:bg-sage",
              )}
              aria-pressed={Boolean(isStart || isEnd)}
              aria-label={cell.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
