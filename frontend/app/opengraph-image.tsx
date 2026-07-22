import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#08070c",
          backgroundImage: "linear-gradient(135deg, #121019 0%, #08070c 60%, #171b47 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #5b6ef5, #c74fe0, #5b6ef5)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 108,
            height: 108,
            borderRadius: 24,
            backgroundColor: "rgba(91,110,245,0.12)",
            border: "2px solid rgba(124,140,255,0.45)",
            marginBottom: 32,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3z"
              fill="none"
              stroke="#a3afff"
              strokeWidth="1.6"
            />
            <path d="M9 12l2 2 4-4" stroke="#a3afff" strokeWidth="1.6" fill="none" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#f5f3fa",
            letterSpacing: -2,
          }}
        >
          NHI Guardian
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "#9691ac",
            maxWidth: 880,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          AI-Powered Non-Human Identity Security Platform
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#d8a448",
          }}
        >
          Powered by Sidibe Enterprises
        </div>
      </div>
    ),
    { ...size }
  );
}
