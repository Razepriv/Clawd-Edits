import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, staticFile, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface AnthropicPageScrollProps {
  /** Path (relative to public/) to the page screenshot to scroll through. */
  imageSrc: string;
  /** Starting scroll Y (px). Default 0. */
  startScrollY?: number;
  /** Ending scroll Y (px). Default 900. */
  endScrollY?: number;
  /** Cursor lands at these canvas coordinates when the scroll finishes. */
  cursorLandX?: number;
  cursorLandY?: number;
  /** When (frame) the cursor arrives at its landing spot. Default duration - 12. */
  cursorLandAtFrame?: number;
  /** Highlight box around the landing target (percent coords, optional). */
  highlightBox?: { xPct: number; yPct: number; wPct: number; hPct: number };
}

// Simulates a browser scrolling down through the Anthropic announcement
// page with a cursor arrow sliding across and landing on the "Claude
// Design" headline. Fires in the 4-7 s B-roll window of the new edit plan.
// This is a 100 % Remotion effect on a static scrape (no real browser).
export function AnthropicPageScroll({
  imageSrc,
  startScrollY = 0,
  endScrollY = 900,
  cursorLandX = 430,
  cursorLandY = 520,
  cursorLandAtFrame,
  highlightBox,
}: AnthropicPageScrollProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const brand = useBrand();

  const landFrame = cursorLandAtFrame ?? durationInFrames - 12;

  // Eased scroll (easeOutCubic) from 0 to duration - 14 frames
  const scrollT = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 14)],
    [0, 1],
    { extrapolateRight: "clamp" },
  );
  const scrollEased = 1 - Math.pow(1 - scrollT, 3);
  const scrollY = interpolate(scrollEased, [0, 1], [startScrollY, endScrollY]);

  // Cursor path: starts off bottom-right, curves up and in, lands at landFrame.
  const cursorStartFrame = 4;
  const cursorT = interpolate(
    frame,
    [cursorStartFrame, landFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const cursorEased = 1 - Math.pow(1 - cursorT, 2);
  const cursorX = interpolate(cursorEased, [0, 1], [width + 80, cursorLandX]);
  const cursorY = interpolate(cursorEased, [0, 1], [height - 120, cursorLandY]);
  const cursorOpacity = interpolate(frame, [cursorStartFrame, cursorStartFrame + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Click pulse on landing: brief scale-down then back.
  const clickPulse = interpolate(
    frame,
    [landFrame - 2, landFrame, landFrame + 2, landFrame + 6],
    [1, 0.82, 1.08, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Highlight ring fades in right when the cursor lands.
  const highlightOpacity = interpolate(frame, [landFrame - 2, landFrame + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frame entrance (the whole browser chrome slides up + fades)
  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 170 }, durationInFrames: 14 });
  const chromeY = interpolate(entrance, [0, 1], [60, 0]);
  const chromeOpacity = interpolate(entrance, [0, 0.4, 1], [0, 1, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: brand.colors.background, pointerEvents: "none" }}>
      {/* Fake browser window */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "4%",
          width: "92%",
          height: "86%",
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: "#f6f4f0",
          boxShadow: `0 28px 58px ${brand.colors.shadow}`,
          border: `1px solid ${brand.colors.divider}`,
          opacity: chromeOpacity,
          transform: `translateY(${chromeY}px)`,
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 18px",
            backgroundColor: "#e8e5e0",
            borderBottom: "1px solid #d7d3cd",
          }}
        >
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#FF5F57" }} />
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#FEBC2E" }} />
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#28C840" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 14,
              padding: "6px 14px",
              borderRadius: 14,
              backgroundColor: "white",
              border: "1px solid #d7d3cd",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 18,
              color: "#5a5855",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            anthropic.com/news/claude-design-anthropic-labs
          </div>
        </div>

        {/* Page content (scrollable via translateY) */}
        <div style={{ position: "relative", width: "100%", height: "calc(100% - 44px)", overflow: "hidden" }}>
          <img
            src={imageSrc.startsWith("http") || imageSrc.startsWith("file:") ? imageSrc : staticFile(imageSrc)}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              transform: `translateY(${-scrollY}px)`,
            }}
          />

          {/* Optional soft-amber spotlight glow around the landing target
              (replaces the earlier hard red rectangle that looked like a
              validation error). No border — just a radial-gradient wash
              that pulls the eye toward the right area. */}
          {highlightBox ? (
            <div
              style={{
                position: "absolute",
                left: `${highlightBox.xPct - 2}%`,
                top: `${highlightBox.yPct - 2}%`,
                width: `${highlightBox.wPct + 4}%`,
                height: `${highlightBox.hPct + 4}%`,
                background:
                  "radial-gradient(ellipse at center, rgba(255,220,150,0.28) 0%, rgba(255,220,150,0.12) 45%, transparent 75%)",
                opacity: highlightOpacity,
                pointerEvents: "none",
                filter: "blur(4px)",
              }}
            />
          ) : null}
        </div>
      </div>

      {/* Cursor arrow + click ping */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          transform: `scale(${clickPulse})`,
          opacity: cursorOpacity,
          pointerEvents: "none",
        }}
      >
        <svg width="32" height="40" viewBox="0 0 32 40">
          <path d="M2 2 L2 30 L10 22 L15 34 L20 32 L15 20 L26 20 Z" fill="white" stroke="#111" strokeWidth={2} strokeLinejoin="round" />
        </svg>
        {/* Click ripple when landed */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -30,
            width: 80,
            height: 80,
            borderRadius: 40,
            border: `3px solid ${brand.colors.accentBright}`,
            opacity: interpolate(frame, [landFrame, landFrame + 10], [0.8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(frame, [landFrame, landFrame + 10], [0.4, 1.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
