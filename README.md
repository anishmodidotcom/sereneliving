# Serene Living

The brand site for Serene Living, a boutique short-term rental company with 16 homes in Dubai, one in Goa, and a small house in London.

This is a Next.js 15 application (App Router, TypeScript, Tailwind, React 19) prepared for Vercel deployment.

## Stack

- **Framework**: Next.js 15 (App Router) + React 19, TypeScript strict
- **Styling**: Tailwind 3, brand tokens (sage / cream / sand / terracotta / ink), Fraunces + Inter Tight + Caveat via `next/font`
- **Motion**: Framer Motion, GSAP-ready, Lenis smooth scroll, custom IntersectionObserver primitives
- **UI**: shadcn/ui (Sheet, Input, Label, Textarea, Button), Radix Dialog / Label
- **Data**: local TypeScript files in `/data` (migrate to Sanity later)
- **AI**: Anthropic SDK streaming concierge chat against `claude-sonnet-4-5`
- **Bookings**: stubs for Hostaway, Stripe and Resend that fall back to mocks until keys land
- **Analytics**: Vercel Analytics + Speed Insights

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial home with hero, Goa marquee, featured stays, story, cities strip, pull-quote, journal, concierge teaser |
| `/stays` | All stays grid with filters (city, bedrooms, guests, dates) |
| `/stays/[slug]` | Editorial listing detail (18 routes, generated statically) |
| `/goa` | Cinematic launch page for the Quiet House, Assagao |
| `/story` | Brand story |
| `/journal` | Magazine-style article index |
| `/journal/[slug]` | Article template |
| `/concierge` | Concierge services list + chat CTA |
| `/contact` | WhatsApp, email, addresses, contact form |
| `/api/availability` | Hostaway calendar wrapper |
| `/api/quote` | Itemised pricing |
| `/api/booking` | Hostaway reservation + Stripe PaymentIntent |
| `/api/concierge` | Streaming Anthropic chat |
| `/api/contact` | Resend contact form sender |

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Key | Required for | Behaviour when missing |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Concierge chat | Streams a graceful offline message pointing to WhatsApp |
| `HOSTAWAY_API_KEY`, `HOSTAWAY_ACCOUNT_ID` | Live availability & reservations | Returns deterministic mock data |
| `STRIPE_SECRET_KEY` | PaymentIntent on booking | Skipped, reservation still confirmed |
| `NEXT_PUBLIC_STRIPE_KEY` | Card field on the booking sheet | Renders an "offline, contact WhatsApp" panel |
| `RESEND_API_KEY` | Contact form delivery | Logs the submission and returns 200 |
| `NEXT_PUBLIC_SITE_URL` | Sitemap, OG URLs | Falls back to `https://serenelivingdxb.com` |

## Deploy to Vercel

1. Push to GitHub.
2. Import the repository in Vercel.
3. Add the env vars above. Leave the secrets empty for staging if needed, the app degrades gracefully.
4. Production domain: `serenelivingdxb.com`. Point the DNS A/AAAA/CNAME records once Vercel issues the certificate.

## Placeholder assets to replace before launch

- Every `images.unsplash.com/photo-` URL in `/data/listings.ts` and `/data/journal.ts` is a warm-toned Unsplash placeholder. Find and replace once the photographer delivers.
- `/public/assets/` is intentionally empty. The logo + fan motif belong here. See `TODO-ASSETS.md`.
- The hero on `/goa` references a still image. Swap for video poster + MP4 when the launch video is graded.

## Brand rules (do not violate)

- No em dashes in user-facing copy
- No emoji in the UI
- No purple, neon or non-brand gradients
- Brand colors only: sage, cream, sand, terracotta, ink
- Fraunces for headlines, Inter Tight for body, Caveat used once or twice as a script accent
- Mobile-first, every page works at 360px
- Keyboard accessibility on every interactive element, focus rings use sage

## Notes

- `prefers-reduced-motion` is respected throughout. Lenis, KenBurns, Reveal and StaggeredText all gate behind it.
- The booking flow lazy-loads, the concierge panel lazy-loads, and the home page hero uses `priority` only on the hero image.
- The site does not collect analytics from users with Do Not Track enabled (Vercel Analytics handles this).
