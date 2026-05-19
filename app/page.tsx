export default function ThemeCheck() {
  return (
    <main className="min-h-dvh bg-cream py-20">
      <div className="container-editorial space-y-20">
        <header className="space-y-4">
          <p className="eyebrow">Theme verification</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance">
            Stay somewhere that <em className="italic text-sage-deep">remembers</em> you.
          </h1>
          <p className="max-w-xl text-ink-soft text-lg">
            A quick visual check of the brand system. Colors, type and motion
            tokens should render exactly as locked in the brief.
          </p>
          <p className="font-script text-2xl text-terracotta">a soft note in the margin</p>
        </header>

        <section className="space-y-6">
          <p className="eyebrow">Palette</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Sage", className: "bg-sage", hex: "#83896F" },
              { name: "Sage deep", className: "bg-sage-deep", hex: "#6B7159" },
              { name: "Sage light", className: "bg-sage-light", hex: "#ACAF9E" },
              { name: "Cream", className: "bg-cream border border-sand", hex: "#F5F1EA" },
              { name: "Cream warm", className: "bg-cream-warm", hex: "#EFE7D6" },
              { name: "Sand", className: "bg-sand", hex: "#D9CFBE" },
              { name: "Terracotta", className: "bg-terracotta", hex: "#B8704F" },
              { name: "Ink", className: "bg-ink", hex: "#2C2C2A" },
              { name: "Ink soft", className: "bg-ink-soft", hex: "#5C5C56" },
            ].map((swatch) => (
              <div key={swatch.name} className="space-y-2">
                <div className={`${swatch.className} aspect-[5/4] rounded-sm`} />
                <div className="space-y-0.5">
                  <p className="text-sm">{swatch.name}</p>
                  <p className="text-xs text-ink-soft">{swatch.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="eyebrow">Typography</p>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-ink-soft mb-2">Display, Fraunces 300</p>
              <p className="font-display text-5xl">Pause, rewind, rejuvenate.</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft mb-2">Display italic, Fraunces 400 italic</p>
              <p className="font-display italic text-4xl text-sage-deep">a soulful return</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft mb-2">Body, Inter Tight 300</p>
              <p className="text-lg max-w-2xl">
                Sixteen boutique homes in Dubai. One quiet villa in Goa. A small
                house in London. Each restored with care, furnished with intent,
                and held to a standard you can feel the moment you arrive.
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-soft mb-2">Script, Caveat 400</p>
              <p className="font-script text-3xl text-terracotta">welcome home</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <p className="eyebrow">Surfaces</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-cream p-8 border border-sand rounded-sm">
              <p className="font-display text-xl mb-2">Cream</p>
              <p className="text-sm text-ink-soft">Default page surface</p>
            </div>
            <div className="bg-cream-warm p-8 rounded-sm">
              <p className="font-display text-xl mb-2">Cream warm</p>
              <p className="text-sm text-ink-soft">Alternating sections</p>
            </div>
            <div className="bg-sage p-8 rounded-sm text-cream">
              <p className="font-display text-xl mb-2">Sage</p>
              <p className="text-sm opacity-80">Primary brand surface</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <p className="eyebrow">Motion</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream-warm rounded-sm p-8 animate-fade-up">
              <p className="font-display text-xl mb-2">Fade up</p>
              <p className="text-sm text-ink-soft">800ms editorial easing</p>
            </div>
            <div className="rounded-sm p-8 bg-sage-light/30 overflow-hidden">
              <div className="bg-sand h-32 rounded-sm animate-ken-burns" />
              <p className="font-display text-xl mt-4 mb-1">Ken Burns</p>
              <p className="text-sm text-ink-soft">18s slow pan for hero imagery</p>
            </div>
          </div>
        </section>

        <div className="hairline" />
        <footer className="text-sm text-ink-soft">
          Step 1 complete. Awaiting confirmation before continuing.
        </footer>
      </div>
    </main>
  );
}
