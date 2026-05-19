"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Values {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    topic: "Reservation",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patch<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Send failed");
      setSent(true);
    } catch {
      setError(
        "We could not send that just now. Please write to stays@serenelivingdxb.com.",
      );
    }
  }

  if (sent) {
    return (
      <div className="rounded-sm border border-sand bg-cream p-8 text-center">
        <p className="eyebrow">Sent</p>
        <p className="mt-4 font-display text-2xl text-ink">
          Thank you. We have your note.
        </p>
        <p className="mt-3 text-ink-soft">
          A reply will come from a real person, usually within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={values.name}
            onChange={(e) => patch("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => patch("email", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <select
          id="topic"
          value={values.topic}
          onChange={(e) => patch("topic", e.target.value)}
          className="flex h-11 w-full rounded-sm border border-sand bg-cream px-3 py-2 text-sm font-light text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
        >
          <option>Reservation</option>
          <option>Press</option>
          <option>Partnerships</option>
          <option>Concierge</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => patch("message", e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        className="inline-flex h-12 items-center rounded-sm bg-sage px-8 text-sm font-light tracking-wide text-cream transition-colors hover:bg-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        Send
      </button>
    </form>
  );
}
