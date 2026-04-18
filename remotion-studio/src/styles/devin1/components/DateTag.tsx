import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface DateTagProps {
  /** Main text (e.g. "APRIL 17, 2026 · CLAUDE DESIGN LAUNCH"). */
  text: string;
  /** Optional leading glyph / icon unicode (e.g. "📅" or "✦"). */
  glyph?: string;
  /** Top offset in px from canvas top. Default 148 (safely below IG status bar 192 px). */
  topPx?: number;
  /** Accent color for the border + glyph. */
  accentColor?: string;
}

// Top-of-frame timestamp pill — sits above any other overlay inside the
// safe zone (y 148 px, well clear of IG status bar at top 10 %).
// For the new edit plan's 0-3 s "APRIL 17, 2026 · CLAUDE DESIGN LAUNCH"
// overlay during the split-screen contradiction hook.
export function DateTag({
  text,
  glyph = "✦",
  topPx = 200,
  accentColor,
}: DateTagProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const accent = accentColor ?? brand.colors.accent;

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 12 });
  const y = interpolate(entrance, [0, 1], [-60, 0]);
  const opacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Pulse the glyph every ~2s
  const pulsePhase = (frame / fps) * 2 * Math.PI;
  const glyphScale = 1 + 0.08 * Math.abs(Math.sin(pulsePhase / 2));

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: topPx,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 22px",
            borderRadius: 999,
            backgroundColor: "rgba(20,20,25,0.92)",
            border: `1px solid ${accent}`,
            boxShadow: `0 8px 22px rgba(0,0,0,0.6), 0 0 18px ${accent}44`,
            backdropFilter: "blur(12px)",
            fontFamily: brand.fonts.emphasis,
            fontSize: 26,
            letterSpacing: "0.14em",
            color: brand.colors.textPrimary,
            textTransform: "uppercase",
          }}
        >
          {glyph ? (
            <span
              style={{
                color: accent,
                fontSize: 28,
                transform: `scale(${glyphScale})`,
                display: "inline-block",
              }}
            >
              {glyph}
            </span>
          ) : null}
          <span>{text}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}
