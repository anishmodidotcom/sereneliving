"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConcierge } from "./concierge-context";
import { ChatMessage } from "./chat-message";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "Show me Goa",
  "Quiet stays in Dubai",
  "Family-friendly",
  "Help me book",
];

const OPENING = {
  id: "opening",
  role: "assistant" as const,
  content:
    "Hello. I'm Serene, the concierge. I know the seventeen homes we keep and the neighbourhoods around them. Ask me about a stay, a dinner, a private chef, or anything in between.",
};

export function ConciergePanel() {
  const { open, closePanel, initialMessage } = useConcierge();
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setMessages([OPENING]);
    setDraft("");
    if (initialMessage) {
      void send(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const assistantId = `a-${Date.now()}`;
    setMessages((m) => [
      ...m,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setDraft("");
    setSending(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      if (!res.ok || !res.body) {
        throw new Error("Concierge stream failed");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const localAcc = acc;
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId ? { ...msg, content: localAcc } : msg,
          ),
        );
      }
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  "I lost the connection for a moment. Please try again, or reach the team on WhatsApp at +971 50 572 3577.",
              }
            : msg,
        ),
      );
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(draft);
  }

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : closePanel())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col bg-cream p-0 sm:max-w-[420px]"
      >
        <SheetTitle className="sr-only">Ask Serene, the concierge</SheetTitle>

        <header className="flex items-center gap-3 border-b border-sand/60 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-cream">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M12 4 C 7 11, 7 17, 12 21"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M12 4 C 17 11, 17 17, 12 21"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="4" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="font-display text-xl text-ink">Ask Serene</p>
            <p className="text-xs text-ink-soft">Concierge, on call</p>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-5 py-5"
          aria-live="polite"
        >
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
          {sending && messages.at(-1)?.content === "" && <TypingDots />}
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-sand/40 px-5 py-3">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void send(q)}
                className="rounded-full border border-sand bg-cream-warm px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-sage hover:text-sage-deep"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t border-sand/60 px-5 py-4"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
            placeholder="Type a message"
            rows={1}
            className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-sm border border-sand bg-cream px-3 py-2 text-sm focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
          />
          <button
            type="submit"
            disabled={sending || !draft.trim()}
            aria-label="Send message"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-sage text-cream transition-colors hover:bg-sage-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-cream-warm px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-sage"
            style={{
              animation: `dotPulse 1.2s infinite ease-in-out ${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
