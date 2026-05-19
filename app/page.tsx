import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-24 pb-32">
        <Container>
          <Reveal>
            <p className="eyebrow">Foundation</p>
            <h1 className="font-display text-5xl md:text-7xl mt-4">
              Layout shell ready.
            </h1>
            <p className="mt-6 max-w-xl text-ink-soft">
              Hero, featured stays, story block, journal preview and concierge
              teaser ship next.
            </p>
          </Reveal>
        </Container>
      </main>
      <Footer />
    </>
  );
}
