"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "./wordmark";
import { NAV_LINKS } from "./nav-links";
import { useBookingSheet } from "@/components/booking/booking-context";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { openSheet } = useBookingSheet();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="rounded-full p-2 text-ink-soft transition-colors hover:bg-sand/40 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage md:hidden"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full bg-cream sm:max-w-md"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex items-center justify-between border-b border-sand/60 px-6 py-5">
          <Wordmark />
        </div>
        <nav className="flex-1 px-6 py-10">
          <ul className="space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block font-display text-3xl text-ink transition-colors hover:text-sage-deep"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
          <div className="mt-12 space-y-4">
            <p className="eyebrow">Reservations</p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSheet();
              }}
              className="block w-full rounded-sm bg-sage px-6 py-4 text-center text-sm font-light tracking-wide text-cream transition-colors hover:bg-sage-deep"
            >
              Reserve a stay
            </button>
            <a
              href="https://wa.me/971505723577"
              className="block text-center text-sm text-ink-soft transition-colors hover:text-sage-deep"
            >
              WhatsApp +971 50 572 3577
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
