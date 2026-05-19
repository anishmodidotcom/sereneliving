# Assets to provide

Everything below is currently a placeholder. Replace before launch.

## Brand identity

- [ ] `public/assets/logo-sage.png`, primary wordmark
- [ ] `public/assets/logo-white.png`, wordmark for dark surfaces
- [ ] `public/assets/fan-motif.svg`, art-deco fan above the e (also reused as the concierge icon)
- [ ] Replace the runtime `S` icon at `app/icon.tsx` with the real favicon once the SVG fan motif lands
- [ ] Final OG card if Unsplash gradient is not acceptable, currently generated at `app/opengraph-image.tsx`

## Photography

Every image URL in the codebase that matches `images.unsplash.com/photo-` is a placeholder. Search the codebase for that substring to find them all.

Sources to replace:
- `data/listings.ts`, hero + 9-image gallery for each of 18 listings
- `data/journal.ts`, cover image for each article
- `app/page.tsx` (via `components/home/hero.tsx`), home hero
- `app/goa/page.tsx`, hero + walkthrough rooms
- `components/home/cities-strip.tsx`, three city preview images
- `components/home/story-block.tsx`, philosophy image
- `app/story/page.tsx`, founders / studio photo
- `components/goa/sticky-words.tsx`, 4 sticky-scroll backgrounds

Ideal sizes (Next.js handles responsive automatically, but originals should clear these):
- Hero images: 2400 wide, 16:9 or 4:5
- Gallery images: 1800 wide
- Article covers: 1800 wide

## Video

- [ ] Home hero (optional, swap the KenBurns image for a 12 to 24 second loop, 1080p MP4 + WebM)
- [ ] `/goa` hero (same)

## Copy

- [ ] Founder names in `/story` are placeholders (Aanya and Karim)
- [ ] Founder photo in `/story` is a placeholder
- [ ] Addresses in `/contact` for Dubai (Alserkal, Warehouse 12), Goa and London need confirmation
- [ ] Goa launch month copy ("from the second week of November") should match actual opening

## Integrations

- [ ] Hostaway API key + account ID, populate `.env.local`
- [ ] Stripe live + test keys
- [ ] Resend API key + verified sending domain (currently expects `stays@serenelivingdxb.com`)
- [ ] WhatsApp Business number, currently +971 50 572 3577. Confirm before launch

## Legal

- [ ] `/privacy` and `/terms` pages, currently linked in the footer but not implemented
