import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface YearToggleCardProps {
  /** Years shown in the toggle row (left → right). */
  years: (string | number)[];
  /** Which year is highlighted. Must match one in `years`. */
  highlightedYear: string | number;
  /** Header label above the chips. Default "KEEPING IN". */
  header?: string;
  /** Subtitle under the highlighted year (e.g. "THE ONES THAT PLAY NICE"). */
  subtitle?: string;
  /** Frame at which highlight cycles through other years and settles on highlighted. Default 18. */
  settleAtFrame?: number;
  /** Y anchor (% of canvas). Default 24. */
  yPercent?: number;
}

// Year-picker chip row with the target year igniting in brand red.
// For the beat-8 CTA framing: "Which tool are you keeping in 2026?"
// Optional subtitle adds the rhetorical answer beneath.
export function YearToggleCard({
  years,
  highlightedYear,
  header = "KEEPING IN",
  subtitle,
  settleAtFrame = 18,
  yPercent = 24,
}: YearToggleCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const headerEnter = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 10 });
  const headerOpacity = interpolate(headerEnter, [0, 0.5, 1], [0, 1, 1]);
  const headerY = interpolate(headerEnter, [0, 1], [-24, 0]);

  // Before settleAtFrame: a scanner moves across the years to build anticipation.
  // After: only `highlightedYear` stays lit.
  const scanFrame = frame; // Years animate in via their own enter spring.
  const scanPhase = (scanFrame / 4) % years.length; // one year per 4 frames

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: `${yPercent}%`,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: brand.colors.textSecondary,
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.85)",
          }}
        >
          {header}
        </div>

        {/* Year chips row */}
        <div style={{ display: "flex", gap: 16 }}>
          {years.map((y, i) => {
            const chipEnter = spring({
              frame: frame - 6 - i * 4,
              fps,
              config: { damping: 14, stiffness: 190, mass: 0.85 },
              durationInFrames: 10,
            });
            const chipOpacity = interpolate(chipEnter, [0, 0.5, 1], [0, 1, 1]);
            const chipScale = interpolate(chipEnter, [0, 1], [0.8, 1]);

            const isHighlighted = String(y) === String(highlightedYear);
            // Before settle: scanner decides which chip is "active";
            // After settle: only the real highlight is active.
            const scannerActive = frame < settleAtFrame && Math.floor(scanPhase) === i;
            const postSettleActive = frame >= settleAtFrame && isHighlighted;

            // Ignite animation (only settles on the highlighted year once)
            const settleProgress = isHighlighted
              ? interpolate(frame, [settleAtFrame, settleAtFrame + 10], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

            const active = scannerActive || postSettleActive;
            const glowOpacity = isHighlighted ? settleProgress : 0;
            // Small bump when settled
            const bumpScale = isHighlighted
              ? interpolate(frame, [settleAtFrame, settleAtFrame + 4, settleAtFrame + 10], [1, 1.12, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 1;

            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  padding: "18px 34px",
                  borderRadius: 20,
                  fontFamily: brand.fonts.emphasis,
                  fontSize: 72,
                  letterSpacing: "-0.01em",
                  color: active ? brand.colors.textPrimary : brand.colors.textSecondary,
                  transform: `scale(${chipScale * bumpScale})`,
                  opacity: chipOpacity,
                }}
              >
                {/* Base grey */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    backgroundColor: brand.colors.surface,
                    border: `1px solid ${brand.colors.divider}`,
                  }}
                />
                {/* Scanner highlight (before settle) */}
                {scannerActive ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 20,
                      border: `2px solid ${brand.colors.accent}`,
                      backgroundColor: "rgba(233,18,18,0.12)",
                    }}
                  />
                ) : null}
                {/* Settled highlight (brand gradient + glow) */}
                {isHighlighted ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 20,
                      background: `linear-gradient(135deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
                      opacity: glowOpacity,
                      boxShadow: `0 0 ${interpolate(glowOpacity, [0, 1], [0, 48])}px rgba(255,42,42,${interpolate(glowOpacity, [0, 1], [0, 0.6])})`,
                    }}
                  />
                ) : null}
                <span style={{ position: "relative", fontVariantNumeric: "tabular-nums" }}>{y}</span>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        {subtitle ? (
          <div
            style={{
              marginTop: 6,
              fontFamily: brand.fonts.ui,
              fontSize: 22,
              fontWeight: 500,
              color: brand.colors.textSecondary,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow: "0 2px 10px rgba(0,0,0,0.85)",
              opacity: interpolate(frame, [settleAtFrame + 4, settleAtFrame + 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
