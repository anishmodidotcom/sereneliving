"use client";

import dynamic from "next/dynamic";

import { LenisProvider } from "@/components/motion/lenis-provider";
import { Cursor } from "@/components/motion/cursor";
import { BookingSheetProvider } from "@/components/booking/booking-context";
import { ConciergeProvider } from "@/components/concierge/concierge-context";

const BookingSheet = dynamic(
  () =>
    import("@/components/booking/booking-sheet").then((m) => m.BookingSheet),
  { ssr: false },
);

const ConciergeBubble = dynamic(
  () =>
    import("@/components/concierge/concierge-bubble").then(
      (m) => m.ConciergeBubble,
    ),
  { ssr: false },
);

const ConciergePanel = dynamic(
  () =>
    import("@/components/concierge/concierge-panel").then(
      (m) => m.ConciergePanel,
    ),
  { ssr: false },
);

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <BookingSheetProvider>
        <ConciergeProvider>
          {children}
          <BookingSheet />
          <ConciergeBubble />
          <ConciergePanel />
          <Cursor />
        </ConciergeProvider>
      </BookingSheetProvider>
    </LenisProvider>
  );
}
