import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Atlas Equity Group — written cash offers for land, all 50 states";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ink ground, wordmark + tagline, plat corner marks (design §8).
// NOTE: uses the default system serif; supply a Caslon .ttf here to match the
// brand face exactly when a binary asset is available.
export default function OpengraphImage() {
  const mark = {
    position: "absolute" as const,
    width: 18,
    height: 18,
    background: "#fbfaf7",
  };
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#14273b",
          color: "#fbfaf7",
          padding: 80,
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ ...mark, top: 32, left: 32 }} />
        <div style={{ ...mark, top: 32, right: 32 }} />
        <div style={{ ...mark, bottom: 32, left: 32 }} />
        <div style={{ ...mark, bottom: 32, right: 32 }} />

        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Atlas Equity Group
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 24,
            color: "rgba(251,250,247,0.8)",
          }}
        >
          Written cash offers for land. All 50 states.
        </div>
      </div>
    ),
    size
  );
}
