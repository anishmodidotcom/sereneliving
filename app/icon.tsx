import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5F1EA",
          color: "#6B7159",
          fontFamily: "serif",
          fontSize: 40,
          fontWeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.02em",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
