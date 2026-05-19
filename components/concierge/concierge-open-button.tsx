"use client";

import { useConcierge } from "./concierge-context";

interface ConciergeOpenButtonProps {
  initial?: string;
  variant?: "cream" | "sage";
}

export function ConciergeOpenButton({
  initial,
  variant = "cream",
}: ConciergeOpenButtonProps) {
  const { openPanel } = useConcierge();
  return (
    <button
      type="button"
      onClick={() => openPanel(initial)}
      className={
        variant === "cream"
          ? "inline-flex h-14 items-center justify-center rounded-sm border border-cream/70 px-10 text-sm font-light uppercase tracking-eyebrow text-cream transition-colors hover:bg-cream hover:text-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          : "inline-flex h-14 items-center justify-center rounded-sm bg-sage px-10 text-sm font-light uppercase tracking-eyebrow text-cream transition-colors hover:bg-sage-deep"
      }
    >
      Open the chat
    </button>
  );
}
