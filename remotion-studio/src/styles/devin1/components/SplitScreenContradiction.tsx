import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface SplitScreenContradictionProps {
  /** Left side (the "wrong" take). */
  leftLabel: string;
  leftBody: string;
  /** Right side (the "right" counter-quote). */
  rightLabel: string;
  rightBody: string;
  rightAuthor: string;
  rightRole: string;
  /** Background gradient hues. */
  leftHue?: string;
  rightHue?: string;
}

// First-frame visual hook: a split-screen textual contradiction — no face.
// Left half = a blurred/washed hot-take. Right half = the authoritative
// counter-quote. The eye is forced to resolve the contradiction BEFORE
// the avatar enters. Inspired by the v12.2 ComparisonCard but this lives
// at the hook moment and carries the full visual weight of the reel.
export function SplitScreenContradiction({
  leftLabel,
  leftBody,
  rightLabel,
  rightBody,
  rightAuthor,
  rightRole,
  leftHue = "#1a1213",
  rightHue = "#0d1f22",
}: SplitScreenContradictionProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const brand = useBrand();

  // Each side slides in from its own edge, staggered.
  const leftEnter = spring({ frame, fps, config: { damping: 16, stiffness: 170 }, durationInFrames: 14 });
  const leftX = interpolate(leftEnter, [0, 1], [-200, 0]);
  const leftOpacity = interpolate(leftEnter, [0, 0.4, 1], [0, 1, 1]);

  const rightEnter = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 170 }, durationInFrames: 14 });
  const rightX = interpolate(rightEnter, [0, 1], [200, 0]);
  const rightOpacity = interpolate(rightEnter, [0, 0.4, 1], [0, 1, 1]);

  // Exit fade in the last 10 frames of the component lifetime.
  // (Parent Sequence bounds it; we just fade opacity on both halves.)

  const halfHeight = height;
  const halfWidth = width / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.colors.background, pointerEvents: "none" }}>
      {/* LEFT half — the "Canva is dead" take (blurred, washed-out, crossed-out vibe) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: halfWidth,
          height: halfHeight,
          background: `linear-gradient(160deg, ${leftHue} 0%, #0a0a0a 100%)`,
          opacity: leftOpacity,
          transform: `translateX(${leftX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 40px",
          borderRight: `1px solid ${brand.colors.divider}`,
        }}
      >
        {/* Label pill top */}
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            backgroundColor: "rgba(233,18,18,0.22)",
            border: `1px solid ${brand.colors.accent}`,
            fontFamily: brand.fonts.emphasis,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: brand.colors.accent,
            marginBottom: 36,
          }}
        >
          {leftLabel}
        </div>
        {/* Washed / blurred body text */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 96,
            lineHeight: 1.02,
            textAlign: "center",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: brand.colors.textSecondary,
            filter: "blur(1.5px)",
            opacity: 0.85,
            textShadow: "0 4px 18px rgba(0,0,0,0.85)",
          }}
        >
          {leftBody}
        </div>
      </div>

      {/* RIGHT half — the endorsement quote */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: halfWidth,
          height: halfHeight,
          background: `linear-gradient(200deg, ${rightHue} 0%, #0a0a0a 100%)`,
          opacity: rightOpacity,
          transform: `translateX(${rightX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 40px",
        }}
      >
        {/* Label pill top */}
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #00C4CC 0%, #7D2AE8 100%)",
            fontFamily: brand.fonts.emphasis,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "white",
            marginBottom: 36,
          }}
        >
          {rightLabel}
        </div>
        {/* Giant open-quote */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 120,
            lineHeight: 0.6,
            color: "#00C4CC",
            opacity: 0.5,
            alignSelf: "flex-start",
            marginBottom: 10,
          }}
        >
          &ldquo;
        </div>
        {/* Quote body */}
        <div
          style={{
            fontFamily: brand.fonts.ui,
            fontSize: 36,
            lineHeight: 1.3,
            fontStyle: "italic",
            fontWeight: 500,
            color: brand.colors.textPrimary,
            marginBottom: 28,
          }}
        >
          {rightBody}
        </div>
        {/* Author footer */}
        <div
          style={{
            alignSelf: "stretch",
            borderTop: `1px solid ${brand.colors.divider}`,
            paddingTop: 14,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: brand.colors.textPrimary }}>
            {rightAuthor}
          </span>
          <span style={{ fontSize: 20, color: brand.colors.textSecondary, marginTop: 2 }}>
            {rightRole}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
