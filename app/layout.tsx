import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: "Serene Living | Boutique Stays in Dubai, Goa & London",
    template: "%s | Serene Living",
  },
  description:
    "Boutique short-term homes in Dubai, Goa and London. Slow luxury, soulful spaces, and stays that remember you.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://serenelivingdxb.com",
  ),
  openGraph: {
    title: "Serene Living",
    description:
      "Boutique short-term homes in Dubai, Goa and London. Stay somewhere that remembers you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${caveat.variable}`}
    >
      <body className="min-h-dvh bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
