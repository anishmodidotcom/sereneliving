import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface ListingGalleryProps {
  images: string[];
  alt: string;
}

export function ListingGallery({ images, alt }: ListingGalleryProps) {
  const [a, b, c, d, e, f, g, h] = images;
  return (
    <section className="bg-cream-warm py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="eyebrow">A photo essay</p>
        </Reveal>

        <div className="mt-12 space-y-6 md:space-y-10">
          {a && (
            <Reveal>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-sand">
                <Image src={a} alt={alt} fill sizes="100vw" className="object-cover" />
              </div>
            </Reveal>
          )}

          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {b && (
              <Reveal delay={80}>
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={b} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            )}
            {c && (
              <Reveal delay={160}>
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={c} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            )}
          </div>

          <div className="grid items-start gap-6 md:grid-cols-12 md:gap-10">
            {d && (
              <Reveal className="md:col-span-5 md:mt-16" delay={80}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={d} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            )}
            {e && (
              <Reveal className="md:col-span-7" delay={160}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={e} alt={alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            )}
          </div>

          {f && (
            <Reveal>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-sand">
                <Image src={f} alt={alt} fill sizes="100vw" className="object-cover" />
              </div>
            </Reveal>
          )}

          {g && h && (
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              <Reveal delay={80}>
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={g} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm bg-sand">
                  <Image src={h} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
