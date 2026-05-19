"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-cream px-6 py-24 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">A small breath</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance">
          Something went quiet on our end.
        </h1>
        <p className="mt-6 text-ink-soft">
          Please try again. If it happens again, write to the team on WhatsApp
          at +971 50 572 3577.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center rounded-sm bg-sage px-7 text-sm font-light text-cream transition-colors hover:bg-sage-deep"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-sm border border-sand px-7 text-sm font-light text-ink transition-colors hover:border-sage"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
