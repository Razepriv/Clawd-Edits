import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface QuoteSlamProps {
  /** Small italic pre-line (e.g. "the first version of"). */
  preLine: string;
  /** The single hero word in huge sans (e.g. "STAFF"). */
  heroWord: string;
  /** Optional after-note beneath the hero word. */
  afterNote?: string;
  /** Override the hero-word gradient (defaults to brand red). */
  heroGradientStart?: string;
  heroGradientEnd?: string;
  /** Vertical placement: "center" (default) or "upper". */
  yPosition?: "center" | "upper";
}

// A bigger, more typographic cousin of EmphasisCaption. Stacks:
//   1. small italic serif pre-line
//   2. huge hero word with gradient fill
//   3. hand-drawn-style underline sweep (SVG stroke-dasharray draw-on)
//   4. optional small after-note
// Used for the "having STAFF" killer line in the Codex reel. Much stronger
// single-word hero emphasis than EmphasisCaption's two-line format.
export function QuoteSlam({
  preLine,
  heroWord,
  afterNote,
  heroGradientStart,
  heroGradientEnd,
  yPosition = "center",
}: QuoteSlamProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const gradStart = heroGradientStart ?? brand.colors.accentBright;
  const gradEnd   = heroGradientEnd   ?? brand.colors.accent;

  // Pre-line fades in first.
  const preEnter = spring({
    frame, fps,
    config: { damping: 18, stiffness: 180 },
    durationInFrames: 10,
  });
  const preOpacity = interpolate(preEnter, [0, 1], [0, 0.85]);
  const preY       = interpolate(preEnter, [0, 1], [18, 0]);

  // Hero word slams in 4 frames later.
  const heroStart = 4;
  const heroEnter = spring({
    frame: frame - heroStart, fps,
    config: { damping: 12, stiffness: 220, mass: 0.85 },
    durationInFrames: 10,
  });
  const heroOpacity = interpolate(heroEnter, [0, 0.4, 1], [0, 1, 1]);
  const heroScale   = interpolate(heroEnter, [0, 1], [0.8, 1]);
  const heroY       = interpolate(heroEnter, [0, 1], [72, 0]);

  // Underline draws after hero lands (frame 14+).
  const underlineStart = 14;
  const underlineProgress = interpolate(
    frame, [underlineStart, underlineStart + 10],
    [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const paddingTop = yPosition === "upper" ? "14%" : "38%";

  return (
    <AbsoluteFill style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: yPosition === "upper" ? "flex-start" : "center",
      paddingTop,
      pointerEvents: "none",
      textAlign: "center",
    }}>
      {/* Pre-line (italic serif) */}
      <span style={{
        fontFamily: "Playfair Display, Cormorant Garamond, Georgia, serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 44,
        color: brand.colors.textPrimary,
        opacity: preOpacity,
        transform: `translateY(${preY}px)`,
        textShadow: "0 2px 14px rgba(0,0,0,0.85)",
        letterSpacing: "0.01em",
        marginBottom: 6,
      }}>
        {preLine}
      </span>

      {/* Hero word */}
      <span style={{
        fontFamily: brand.fonts.emphasis,
        fontSize: 260,
        lineHeight: 0.95,
        letterSpacing: "-0.01em",
        textTransform: "uppercase",
        backgroundImage: `linear-gradient(180deg, ${gradStart} 0%, ${gradEnd} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.85))",
        opacity: heroOpacity,
        transform: `translateY(${heroY}px) scale(${heroScale})`,
      }}>
        {heroWord}
      </span>

      {/* Hand-drawn underline (SVG) */}
      <svg
        width={Math.max(260, heroWord.length * 120)}
        height={40}
        viewBox="0 0 600 40"
        style={{ marginTop: -12, opacity: heroOpacity }}
      >
        <path
          d="M 10 20 Q 150 4 300 22 T 590 18"
          stroke={gradEnd}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={600}
          strokeDashoffset={600 - underlineProgress * 600}
          filter="drop-shadow(0 2px 10px rgba(0,0,0,0.55))"
        />
      </svg>

      {/* After-note */}
      {afterNote ? (
        <span style={{
          fontFamily: brand.fonts.ui,
          fontSize: 32,
          fontWeight: 500,
          color: brand.colors.textSecondary,
          opacity: heroOpacity,
          marginTop: 18,
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}>
          {afterNote}
        </span>
      ) : null}
    </AbsoluteFill>
  );
}
