"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface BookingTarget {
  listingSlug?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

interface BookingSheetState {
  open: boolean;
  target: BookingTarget;
  openSheet: (target?: BookingTarget) => void;
  closeSheet: () => void;
  setTarget: (target: BookingTarget) => void;
}

const BookingSheetContext = createContext<BookingSheetState | null>(null);

export function BookingSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [target, setTargetState] = useState<BookingTarget>({});

  const openSheet = useCallback((next?: BookingTarget) => {
    if (next) setTargetState((prev) => ({ ...prev, ...next }));
    setOpen(true);
  }, []);

  const closeSheet = useCallback(() => setOpen(false), []);

  const setTarget = useCallback(
    (next: BookingTarget) => setTargetState((prev) => ({ ...prev, ...next })),
    [],
  );

  const value = useMemo(
    () => ({ open, target, openSheet, closeSheet, setTarget }),
    [open, target, openSheet, closeSheet, setTarget],
  );

  return (
    <BookingSheetContext.Provider value={value}>
      {children}
    </BookingSheetContext.Provider>
  );
}

export function useBookingSheet() {
  const ctx = useContext(BookingSheetContext);
  if (!ctx) {
    throw new Error(
      "useBookingSheet must be used within a BookingSheetProvider",
    );
  }
  return ctx;
}
