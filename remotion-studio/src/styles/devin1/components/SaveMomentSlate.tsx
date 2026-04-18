import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface SaveMomentSlateProps {
  /** Main bold text (the "save moment" line). */
  text: string;
  /** Optional attribution / smaller tag above. */
  kicker?: string;
  /** Optional hint beneath the slab (e.g. "HOLD — SAVE THIS"). */
  hint?: string;
  /** Highlight one substring of the text in brand-red. */
  highlight?: string;
  /** Background dimming opacity over whatever's below. Default 0.80. */
  dimOpacity?: number;
}

// Full-frame "save-this-moment" slate. Dims whatever's behind and slams a
// bold one-liner centered in the safe zone. Holds 3 full seconds by design.
// Used for the 20-23 s beat in the new plan:
//   "It's not a replacement. It's a pipeline."
// Typography-heavy + center-anchored + subtle "HOLD" hint at the bottom so
// viewers know they're meant to screenshot / bookmark / share this frame.
export function SaveMomentSlate({
  text,
  kicker = "THE THESIS",
  hint = "SAVE THIS — YOUR STRATEGY FOR 2026",
  highlight,
  dimOpacity = 0.80,
}: SaveMomentSlateProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const brand = useBrand();

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 170 }, durationInFrames: 14 });
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const opacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Kicker fades in first, text follows.
  const kickerOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hintOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Optional substring-highlight splits the text into 3 spans.
  const renderText = (): React.ReactNode => {
    if (!highlight) return text;
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx < 0) return text;
    const before = text.slice(0, idx);
    const hit = text.slice(idx, idx + highlight.length);
    const after = text.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span
          style={{
            backgroundImage: `linear-gradient(180deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {hit}
        </span>
        {after}
      </>
    );
  };

  // Subtle cinema-bar vignette on the last 8 frames to feel like an ident.
  const idBarsOpacity = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames - 1],
    [0.25, 0.6],
    { extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Dim what's behind */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(10,10,10,${dimOpacity})`,
          opacity,
        }}
      />

      {/* Cinematic letterbox bars (top/bottom) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "12%",
          backgroundColor: `rgba(0,0,0,${idBarsOpacity})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "14%",
          backgroundColor: `rgba(0,0,0,${idBarsOpacity})`,
        }}
      />

      {/* Main slab — centered inside the safe zone (middle 70% horizontal) */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 15%",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {/* Kicker */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: brand.colors.accent,
            marginBottom: 28,
            opacity: kickerOpacity,
          }}
        >
          — {kicker} —
        </div>

        {/* Main text */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 96,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: brand.colors.textPrimary,
            textShadow: "0 6px 24px rgba(0,0,0,0.9)",
            opacity: textOpacity,
            maxWidth: "100%",
          }}
        >
          {renderText()}
        </div>

        {/* Hint */}
        {hint ? (
          <div
            style={{
              marginTop: 44,
              fontFamily: brand.fonts.emphasis,
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: brand.colors.textSecondary,
              opacity: hintOpacity,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ width: 30, height: 1, backgroundColor: brand.colors.textSecondary }} />
            {hint}
            <span style={{ width: 30, height: 1, backgroundColor: brand.colors.textSecondary }} />
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
