import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface AmenitiesListProps {
  amenities: string[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  const columns = chunk(amenities, Math.ceil(amenities.length / 3));
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">What&rsquo;s here</p>
          <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Quiet, considered, real.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-16">
          {columns.map((col, ci) => (
            <Reveal key={ci} delay={ci * 100}>
              <ul className="divide-y divide-sand/70">
                {col.map((a) => (
                  <li
                    key={a}
                    className="py-3.5 text-[1.0625rem] font-light leading-relaxed text-ink"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
