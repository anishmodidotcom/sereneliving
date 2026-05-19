"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ConciergeState {
  open: boolean;
  initialMessage?: string;
  openPanel: (initial?: string) => void;
  closePanel: () => void;
}

const ConciergeContext = createContext<ConciergeState | null>(null);

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const openPanel = useCallback((initial?: string) => {
    setInitialMessage(initial);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, initialMessage, openPanel, closePanel }),
    [open, initialMessage, openPanel, closePanel],
  );

  return (
    <ConciergeContext.Provider value={value}>
      {children}
    </ConciergeContext.Provider>
  );
}

export function useConcierge() {
  const ctx = useContext(ConciergeContext);
  if (!ctx) {
    throw new Error("useConcierge must be used within a ConciergeProvider");
  }
  return ctx;
}
