"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useConcierge } from "./concierge-context";

export function ConciergePanel() {
  const { open, closePanel } = useConcierge();

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : closePanel())}>
      <SheetContent
        side="right"
        className="sm:max-w-[420px]"
        hideClose={false}
      >
        <SheetTitle className="sr-only">Ask Serene</SheetTitle>
        <div className="flex h-full items-center justify-center p-8 text-center text-sm text-ink-soft">
          Loading the concierge.
        </div>
      </SheetContent>
    </Sheet>
  );
}
