import Link from "next/link";

import { Container } from "./container";
import { Wordmark } from "./wordmark";

const STAYS_LINKS = [
  { href: "/stays?city=Dubai", label: "Stays in Dubai" },
  { href: "/goa", label: "The Quiet House, Goa" },
  { href: "/stays?city=London", label: "Stays in London" },
  { href: "/stays", label: "All stays" },
];

const COMPANY_LINKS = [
  { href: "/story", label: "Our story" },
  { href: "/journal", label: "Journal" },
  { href: "/concierge", label: "Concierge" },
  { href: "/contact", label: "Press & partnerships" },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com/sereneliving", label: "Instagram" },
  { href: "https://wa.me/971505723577", label: "WhatsApp" },
  { href: "mailto:stays@serenelivingdxb.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-cream-warm">
      <Container className="py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4 space-y-6">
            <Wordmark className="text-3xl md:text-4xl" />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Boutique homes for slow stays. Sixteen across Dubai, one in Goa,
              and a small house in London.
            </p>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-sage-deep hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5">
            <p className="eyebrow">Stays by city</p>
            <ul className="space-y-3">
              {STAYS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink transition-colors hover:text-sage-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5">
            <p className="eyebrow">Company</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink transition-colors hover:text-sage-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-5">
            <p className="eyebrow">Contact</p>
            <div className="space-y-3 text-sm text-ink">
              <a
                href="https://wa.me/971505723577"
                className="block transition-colors hover:text-sage-deep"
              >
                WhatsApp
                <br />
                +971 50 572 3577
              </a>
              <a
                href="mailto:stays@serenelivingdxb.com"
                className="block transition-colors hover:text-sage-deep"
              >
                stays@serenelivingdxb.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-sand pt-8 text-xs text-ink-soft md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} Serene Living. Holding company,
            Dubai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-sage-deep">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-sage-deep">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
