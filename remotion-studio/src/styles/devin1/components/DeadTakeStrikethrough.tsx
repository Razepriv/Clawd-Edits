import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface DeadTakeStrikethroughProps {
  /** Preserved word rendered before the struck word (e.g. "CANVA"). */
  preserveWord: string;
  /** The word that gets slashed (e.g. "DEAD"). */
  struckWord: string;
  /** Frame on which the strikethrough begins drawing. Default 10. */
  strikeStartFrame?: number;
  /** Strike duration in frames. Default 10. */
  strikeDurationFrames?: number;
}

// Draws a bold crimson strike across one word of a two-word slam.
// Hook beat for the Canva-pipeline reel: renders `CANVA ~~DEAD~~` with the
// second word being slashed-through via an SVG stroke-dasharray draw-on.
// Lifted from the Nick-1 style-audit negation-slash pattern.
export function DeadTakeStrikethrough({
  preserveWord,
  struckWord,
  strikeStartFrame = 10,
  strikeDurationFrames = 10,
}: DeadTakeStrikethroughProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  // Entrance of the two words.
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 180, mass: 0.85 }, durationInFrames: 10 });
  const entryScale = interpolate(enter, [0, 1], [0.86, 1]);
  const entryOpacity = interpolate(enter, [0, 0.5, 1], [0, 1, 1]);
  const entryY = interpolate(enter, [0, 1], [60, 0]);

  // Strikethrough progress (0 → 1 over strikeDurationFrames).
  const strikeProgress = interpolate(
    frame,
    [strikeStartFrame, strikeStartFrame + strikeDurationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Approximate width for the strike: ~120 px per char at font-size 220.
  const struckLen = struckWord.length;
  const slashWidth = Math.max(220, struckLen * 135);
  const slashHeight = 32;
  const svgWidth = slashWidth + 40;
  const svgHeight = slashHeight + 20;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40%",
        pointerEvents: "none",
        opacity: entryOpacity,
        transform: `translateY(${entryY}px) scale(${entryScale})`,
        fontFamily: brand.fonts.emphasis,
      }}
    >
      {/* PRESERVED word (always visible, white) */}
      <span
        style={{
          fontSize: 220,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: brand.colors.textPrimary,
          textTransform: "uppercase",
          textShadow: "0 6px 22px rgba(0,0,0,0.85)",
          marginBottom: -12,
        }}
      >
        {preserveWord}
      </span>
      {/* STRUCK word (red) + slash overlay */}
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <span
          style={{
            fontSize: 220,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            backgroundImage: `linear-gradient(180deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.85))",
          }}
        >
          {struckWord}
        </span>

        {/* SVG strike drawn across the word, rotated slightly for a hand-drawn look */}
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -40%) rotate(-6deg)",
            pointerEvents: "none",
          }}
        >
          <line
            x1={20}
            y1={svgHeight / 2}
            x2={svgWidth - 20}
            y2={svgHeight / 2}
            stroke={brand.colors.accentBright}
            strokeWidth={22}
            strokeLinecap="round"
            strokeDasharray={slashWidth}
            strokeDashoffset={slashWidth - strikeProgress * slashWidth}
            filter="drop-shadow(0 4px 16px rgba(233,18,18,0.7))"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
}
