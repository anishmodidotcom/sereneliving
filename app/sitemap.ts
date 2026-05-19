import type { MetadataRoute } from "next";

import { LISTINGS } from "@/data/listings";
import { ARTICLES } from "@/data/journal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://serenelivingdxb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/stays",
    "/goa",
    "/story",
    "/journal",
    "/concierge",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const listingRoutes = LISTINGS.map((l) => ({
    url: `${SITE_URL}/stays/${l.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const journalRoutes = ARTICLES.map((a) => ({
    url: `${SITE_URL}/journal/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...listingRoutes, ...journalRoutes];
}
