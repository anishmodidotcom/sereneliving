"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useBookingSheet } from "@/components/booking/booking-context";
import { useConcierge } from "./concierge-context";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const BOOK_MARKER = /\[BOOK:([a-z0-9-]+)\]/i;

export function ChatMessage({ role, content }: ChatMessageProps) {
  const router = useRouter();
  const { openSheet } = useBookingSheet();
  const { closePanel } = useConcierge();
  const isUser = role === "user";

  const match = content.match(BOOK_MARKER);
  const clean = match ? content.replace(match[0], "").trim() : content;

  function handleBook() {
    if (!match) return;
    const slug = match[1];
    closePanel();
    router.push(`/stays/${slug}`);
    setTimeout(() => openSheet({ listingSlug: slug }), 300);
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-sage text-cream"
            : "rounded-bl-sm bg-cream-warm text-ink",
        )}
      >
        <p className="whitespace-pre-wrap text-pretty">{clean}</p>
        {match && (
          <button
            type="button"
            onClick={handleBook}
            className="mt-3 inline-flex h-9 items-center rounded-sm bg-cream px-4 text-xs font-light uppercase tracking-eyebrow text-sage-deep transition-colors hover:bg-cream-warm"
          >
            Continue booking
          </button>
        )}
      </div>
    </div>
  );
}
