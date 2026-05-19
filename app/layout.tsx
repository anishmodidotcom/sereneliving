import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteProviders } from "@/components/layout/site-providers";
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
    default: "Serene Living, Boutique Stays in Dubai, Goa and London",
    template: "%s, Serene Living",
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serene Living",
    description:
      "Boutique short-term homes in Dubai, Goa and London. Stay somewhere that remembers you.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
  width: "device-width",
  initialScale: 1,
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
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-sage focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <SiteProviders>{children}</SiteProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
