import { ImageResponse } from "next/og";

export const alt = "Serene Living, Boutique Stays in Dubai, Goa and London";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #F5F1EA 0%, #EFE7D6 60%, #D9CFBE 100%)",
          color: "#2C2C2A",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#6B7159",
          }}
        >
          Serene Living
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              lineHeight: 1.05,
              fontWeight: 300,
              maxWidth: 980,
            }}
          >
            Stay somewhere that remembers you.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#5C5C56",
              maxWidth: 800,
            }}
          >
            Boutique short-term homes in Dubai, Goa and London.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#5C5C56",
          }}
        >
          <span>serenelivingdxb.com</span>
          <span>Dubai &middot; Goa &middot; London</span>
        </div>
      </div>
    ),
    size,
  );
}
