"use client";

import { useConcierge } from "./concierge-context";

export function ConciergeBubble() {
  const { openPanel } = useConcierge();
  return (
    <button
      type="button"
      onClick={() => openPanel()}
      aria-label="Open concierge chat"
      className="group fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream shadow-lg shadow-sage/30 transition-all duration-300 ease-editorial hover:bg-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:bottom-8 md:right-8"
    >
      <span className="absolute h-14 w-14 rounded-full bg-sage/40 opacity-70 transition-transform duration-1000 group-hover:scale-110 animate-[breathe_3.5s_ease-in-out_infinite]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative h-7 w-7"
        fill="none"
      >
        <path
          d="M16 6 C 9 14, 9 22, 16 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M16 6 C 13 14, 13 22, 16 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M16 6 C 19 14, 19 22, 16 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M16 6 C 23 14, 23 22, 16 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="16" cy="6" r="1.3" fill="currentColor" />
      </svg>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.18); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
