import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import type { Listing } from "@/data/listings";

interface NeighborhoodGuideProps {
  listing: Listing;
}

export function NeighborhoodGuide({ listing }: NeighborhoodGuideProps) {
  return (
    <section className="bg-cream-warm py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">The neighbourhood</p>
            <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              {listing.neighborhood}.
            </h2>
            <p className="mt-6 max-w-md text-ink-soft">
              A small list of places we send guests to. None of it is paid. All
              of it has been used.
            </p>
            <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-sm border border-sand bg-sand/40">
              <MapPlaceholder coords={listing.coordinates} label={listing.neighborhood} />
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={150}>
            <ul className="divide-y divide-sand/70">
              {listing.neighborhoodGuide.map((spot) => (
                <li key={spot.name} className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline">
                  <p className="md:col-span-4 font-display text-2xl text-ink">
                    {spot.name}
                  </p>
                  <div className="md:col-span-8">
                    <p className="eyebrow">{spot.kind}</p>
                    <p className="mt-2 text-ink-soft">{spot.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MapPlaceholder({
  coords,
  label,
}: {
  coords: { lat: number; lng: number };
  label: string;
}) {
  const lines: number[] = [];
  for (let i = 0; i < 12; i++) lines.push(i);
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 400 300"
        aria-label={`Approximate map of ${label}`}
        className="h-full w-full"
      >
        <rect width="400" height="300" fill="#EFE7D6" />
        {lines.map((l) => (
          <line
            key={`h${l}`}
            x1="0"
            y1={l * 25}
            x2="400"
            y2={l * 25}
            stroke="#D9CFBE"
            strokeWidth="0.5"
          />
        ))}
        {lines.map((l) => (
          <line
            key={`v${l}`}
            x1={l * 35}
            y1="0"
            x2={l * 35}
            y2="300"
            stroke="#D9CFBE"
            strokeWidth="0.5"
          />
        ))}
        <path
          d="M40 180 Q 120 60, 200 140 T 360 80"
          stroke="#83896F"
          strokeWidth="1.4"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M20 220 Q 100 240, 200 200 T 380 240"
          stroke="#83896F"
          strokeWidth="1.4"
          fill="none"
          opacity="0.35"
        />
        <circle cx="200" cy="150" r="6" fill="#B8704F" />
        <circle cx="200" cy="150" r="14" fill="#B8704F" opacity="0.18" />
      </svg>
      <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-eyebrow text-ink-soft">
        {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}
      </p>
    </div>
  );
}
