import Link from "next/link";

import { Marquee } from "@/components/motion/marquee";

export function GoaBanner() {
  const items = [
    "Now in Goa",
    "Our first stay outside the city",
    "Reserve the opening week",
    "The Quiet House, Assagao",
    "Now in Goa",
    "A Portuguese-era villa, restored",
  ].map((text, i) => (
    <span
      key={i}
      className="flex items-center gap-12 font-display text-lg italic tracking-tight"
    >
      <span>{text}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-cream/70" />
    </span>
  ));

  return (
    <Link
      href="/goa"
      className="block w-full bg-terracotta py-4 text-cream transition-colors hover:bg-terracotta/90"
      aria-label="Visit our new Goa stay"
    >
      <Marquee items={items} speed={9} pauseOnHover />
    </Link>
  );
}
