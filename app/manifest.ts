import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Serene Living",
    short_name: "Serene",
    description:
      "Boutique short-term homes in Dubai, Goa and London. Slow luxury, soulful spaces, and stays that remember you.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F1EA",
    theme_color: "#83896F",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
