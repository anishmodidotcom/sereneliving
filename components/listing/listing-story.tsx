import { Reveal } from "@/components/motion/reveal";

interface ListingStoryProps {
  paragraphs: string[];
}

export function ListingStory({ paragraphs }: ListingStoryProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto w-full max-w-[680px] px-6 md:px-0">
        <Reveal>
          <p className="eyebrow">The home</p>
        </Reveal>
        <div className="mt-10 space-y-7 text-[1.0625rem] leading-[1.85] text-ink md:text-lg md:leading-[1.8]">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80} as="div">
              {i === 0 ? (
                <p>
                  <span className="float-left mr-3 mt-1 font-display text-[5.5rem] leading-[0.85] text-sage-deep">
                    {p[0]}
                  </span>
                  {p.slice(1)}
                </p>
              ) : (
                <p>{p}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
