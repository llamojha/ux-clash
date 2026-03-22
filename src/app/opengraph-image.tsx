import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "UX Clash"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: 48,
              height: 64,
              borderRadius: 8,
              backgroundColor: "#ef4444",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "16px solid transparent",
              borderBottom: "16px solid transparent",
              borderLeft: "16px solid #f5f5f5",
            }}
          />
          <div
            style={{
              width: 48,
              height: 64,
              borderRadius: 8,
              backgroundColor: "#22c55e",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.02em",
          }}
        >
          UX Clash
        </div>
        <div style={{ fontSize: 24, color: "#a1a1a1" }}>
          La arena competitiva de UX/UI en código
        </div>
      </div>
    ),
    { ...size },
  )
}
