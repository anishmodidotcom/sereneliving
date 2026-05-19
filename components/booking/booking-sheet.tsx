"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBookingSheet } from "./booking-context";

export function BookingSheet() {
  const { open, closeSheet } = useBookingSheet();

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : closeSheet())}>
      <SheetContent side="right" className="sm:max-w-[480px]">
        <SheetTitle className="sr-only">Reserve a stay</SheetTitle>
        <div className="flex h-full items-center justify-center p-8 text-center text-sm text-ink-soft">
          Loading reservation flow.
        </div>
      </SheetContent>
    </Sheet>
  );
}
