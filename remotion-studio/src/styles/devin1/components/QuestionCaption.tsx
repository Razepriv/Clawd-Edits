import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface QuestionCaptionProps {
  /** The question text. */
  text: string;
  /** Optional hint word highlighted inside the question (e.g. "2026"). */
  highlight?: string;
  /** Optional small sub-line under the question (e.g. "DROP IT BELOW \u2193"). */
  subtitle?: string;
  /** Y anchor (% of canvas). Default 62 — mid-lower, above the caption band. */
  yPercent?: number;
}

// Pinned question caption — sits mid-frame for the last 4 s of the reel.
// Per the new plan: "Which tool are you keeping in 2026?" held 33\u201337 s.
// The question hovers like a sticky note with a tape-corner effect; the
// highlighted keyword pulses subtly so the eye parks on it.
export function QuestionCaption({
  text,
  highlight,
  subtitle = "DROP IT BELOW \u2193",
  yPercent = 62,
}: QuestionCaptionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 860; // safe zone

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 180 }, durationInFrames: 14 });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const opacity = interpolate(enter, [0, 0.5, 1], [0, 1, 1]);
  const rotate = interpolate(enter, [0, 1], [-1.5, 0]);

  // Pulsing highlight (brightness wobble)
  const pulse = 0.85 + 0.15 * Math.abs(Math.sin((frame / fps) * 1.8 * Math.PI));

  const renderText = (): React.ReactNode => {
    if (!highlight) return text;
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span
          style={{
            backgroundImage: `linear-gradient(180deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            filter: `brightness(${pulse})`,
          }}
        >
          {text.slice(idx, idx + highlight.length)}
        </span>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: `${yPercent}%`,
          left: "50%",
          transform: `translate(-50%, 0) translateY(${y}px) rotate(${rotate}deg)`,
          width: cardWidth,
          padding: "22px 30px 26px",
          borderRadius: 20,
          backgroundColor: brand.colors.surface,
          border: `2px solid ${brand.colors.accent}`,
          boxShadow: `0 18px 40px ${brand.colors.shadow}, 0 0 28px rgba(233,18,18,0.35)`,
          backdropFilter: "blur(18px)",
          fontFamily: brand.fonts.ui,
          color: brand.colors.textPrimary,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Tape-corner decoration */}
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%) rotate(-4deg)",
            width: 88,
            height: 22,
            backgroundColor: "rgba(255,255,255,0.25)",
            border: `1px solid ${brand.colors.divider}`,
            borderRadius: 2,
          }}
        />

        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 44,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            textAlign: "center",
            textShadow: "0 2px 12px rgba(0,0,0,0.85)",
          }}
        >
          {renderText()}
        </div>

        {subtitle ? (
          <div
            style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: brand.colors.accent,
              marginTop: 4,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
