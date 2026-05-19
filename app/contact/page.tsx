import type { Metadata } from "next";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Talk to us",
  description:
    "Reach Serene Living. WhatsApp, email, the studio in Dubai, the house in Goa.",
};

export default function ContactPage() {
  return (
    <>
      <Nav tone="solid" />
      <main id="main" className="pt-28 md:pt-40">
        <Container size="narrow" className="pb-24">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Talk to us.
            </h1>
            <p className="mt-6 text-ink-soft md:text-lg">
              The fastest line is WhatsApp. We answer in minutes most of the
              day. For partnerships and press, write to us. For everything else,
              the concierge is on the chat.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="eyebrow">Directly</p>
              <ul className="mt-6 space-y-5 text-lg">
                <li>
                  <a
                    href="https://wa.me/971505723577"
                    className="block text-ink underline-offset-4 transition-colors hover:text-sage-deep hover:underline"
                  >
                    WhatsApp +971 50 572 3577
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">
                    Reservations, the concierge, last-minute everything.
                  </p>
                </li>
                <li>
                  <a
                    href="mailto:stays@serenelivingdxb.com"
                    className="block text-ink underline-offset-4 transition-colors hover:text-sage-deep hover:underline"
                  >
                    stays@serenelivingdxb.com
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">
                    The slower channel. We read every message.
                  </p>
                </li>
                <li>
                  <a
                    href="mailto:partners@serenelivingdxb.com"
                    className="block text-ink underline-offset-4 transition-colors hover:text-sage-deep hover:underline"
                  >
                    partners@serenelivingdxb.com
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">
                    Press, partnerships, residencies.
                  </p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <p className="eyebrow">In person</p>
              <div className="mt-6 space-y-6 text-base text-ink">
                <div>
                  <p className="font-display text-xl">The studio. Dubai.</p>
                  <p className="mt-1 text-ink-soft">
                    Alserkal Avenue, Warehouse 12, Al Quoz 1.
                    <br />
                    By appointment, Tuesday to Saturday.
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl">The Quiet House. Goa.</p>
                  <p className="mt-1 text-ink-soft">
                    Assagao, North Goa.
                    <br />
                    Site visits during the soft launch by request.
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl">The Long Hall. London.</p>
                  <p className="mt-1 text-ink-soft">
                    Marylebone. By private appointment, on demand.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        <section className="bg-cream-warm py-24 md:py-32">
          <Container size="narrow">
            <Reveal>
              <p className="eyebrow">Write to the team</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Tell us what you need.
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <ContactForm />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
