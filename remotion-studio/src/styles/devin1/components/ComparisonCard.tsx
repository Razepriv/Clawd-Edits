import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface ComparisonCardProps {
  /** Left column label (the "old" / faded option). */
  leftLabel: string;
  /** Right column label (the "new" / highlighted option). */
  rightLabel: string;
  /** Small header above the card. */
  header?: string;
  /** Frame at which the right column takes over (starts faded, glows by this frame). */
  toggleAtFrame?: number;
}

// Two-column comparison card for the beat-7 philosophical pivot in the Codex
// reel ("talk to AI vs let it run your machine"). Left column starts at full
// opacity, right column starts faded. At toggleAtFrame the right column
// ignites into the brand-red gradient and the left fades to 30% — the
// cross-fade literalises the rhetorical pivot.
export function ComparisonCard({
  leftLabel,
  rightLabel,
  header = "THE QUESTION ISN'T",
  toggleAtFrame = 28,
}: ComparisonCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 940;
  const cardHeight = 430;

  const entrance = spring({
    frame, fps,
    config: { damping: 18, stiffness: 170 },
    durationInFrames: 14,
  });
  const cardY = interpolate(entrance, [0, 1], [180, 0]);
  const cardOpacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Toggle progress: 0 → left prominent, 1 → right prominent.
  const toggle = interpolate(
    frame, [toggleAtFrame, toggleAtFrame + 14],
    [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const leftOpacity  = interpolate(toggle, [0, 1], [1, 0.28]);
  const rightOpacity = interpolate(toggle, [0, 1], [0.45, 1]);
  const rightGlow    = interpolate(toggle, [0, 1], [0, 1]);

  // Subtle rightward slide of the "vs" divider.
  const divX = interpolate(toggle, [0, 1], [0, 4]);

  return (
    <AbsoluteFill style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      paddingTop: "16%",
      pointerEvents: "none",
    }}>
      <div style={{
        width: cardWidth,
        minHeight: cardHeight,
        padding: "28px 32px 36px",
        borderRadius: 28,
        backgroundColor: brand.colors.surface,
        border: `1px solid ${brand.colors.divider}`,
        boxShadow: `0 28px 58px ${brand.colors.shadow}`,
        color: brand.colors.textPrimary,
        fontFamily: brand.fonts.ui,
        backdropFilter: "blur(22px)",
        transform: `translateY(${cardY}px)`,
        opacity: cardOpacity,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}>
        {/* Header */}
        <div style={{
          fontFamily: brand.fonts.emphasis,
          fontSize: 28,
          letterSpacing: "0.14em",
          color: brand.colors.textSecondary,
          textAlign: "center",
          textTransform: "uppercase",
        }}>
          {header}
        </div>

        {/* Two-column row */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 20 }}>
          {/* LEFT */}
          <div style={{
            flex: 1,
            padding: "36px 24px",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.10)",
            backgroundColor: "rgba(255,255,255,0.03)",
            opacity: leftOpacity,
            textAlign: "center",
            filter: `grayscale(${interpolate(toggle, [0, 1], [0, 0.8])})`,
          }}>
            <div style={{
              fontSize: 22, fontWeight: 500, color: brand.colors.textSecondary,
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
            }}>
              which ai you
            </div>
            <div style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 88,
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: brand.colors.textPrimary,
            }}>
              {leftLabel}
            </div>
          </div>

          {/* VS divider */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            transform: `translateX(${divX}px)`,
          }}>
            <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.18)" }}/>
            <div style={{
              fontFamily: brand.fonts.emphasis, fontSize: 22,
              letterSpacing: "0.3em", padding: "6px 0",
              color: brand.colors.textSecondary,
            }}>
              VS
            </div>
            <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.18)" }}/>
          </div>

          {/* RIGHT */}
          <div style={{
            flex: 1,
            padding: "36px 24px",
            borderRadius: 22,
            border: `1px solid ${interpolate(rightGlow, [0, 1], [0.1, 0.4]) > 0.25 ? brand.colors.accent : "rgba(255,255,255,0.10)"}`,
            backgroundColor: "rgba(233,18,18,0.05)",
            boxShadow: `0 0 ${interpolate(rightGlow, [0, 1], [0, 40])}px rgba(255,42,42,${interpolate(rightGlow, [0, 1], [0, 0.35])})`,
            opacity: rightOpacity,
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 22, fontWeight: 500, color: brand.colors.textSecondary,
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10,
            }}>
              which one you let
            </div>
            <div style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 88,
              lineHeight: 0.95,
              textTransform: "uppercase",
              backgroundImage: `linear-gradient(180deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}>
              {rightLabel}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
