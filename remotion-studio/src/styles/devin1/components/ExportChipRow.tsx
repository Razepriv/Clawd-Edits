import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface ExportChip {
  label: string;
  /** When true, this chip gets the ignite animation (brand color + glow). */
  highlight?: boolean;
  /** Optional leading glyph (e.g. "→"). */
  prefix?: string;
}

export interface ExportChipRowProps {
  chips: ExportChip[];
  /** Header label above the chip row. Default "EXPORT TO". */
  header?: string;
  /** Color of the highlighted chip gradient start. */
  highlightStart?: string;
  /** Color of the highlighted chip gradient end. */
  highlightEnd?: string;
  /** Frame at which the highlight ignites. Default 18. */
  igniteAtFrame?: number;
  /** Y anchor in canvas (%). */
  yPercent?: number;
}

// Row of export-format chips with one chip igniting on cue.
// Used for the beat-5 "Export to Canva is a named feature" moment.
// Renders as pills like [PDF] [PPTX] [HTML] [→ Canva] — the Canva chip
// fades from grey → brand-gradient with a soft shadow glow at igniteAtFrame.
export function ExportChipRow({
  chips,
  header = "EXPORT TO",
  highlightStart = "#00C4CC",
  highlightEnd = "#7D2AE8",
  igniteAtFrame = 18,
  yPercent = 26,
}: ExportChipRowProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const headerEnter = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 10 });
  const headerY = interpolate(headerEnter, [0, 1], [-24, 0]);
  const headerOpacity = interpolate(headerEnter, [0, 0.5, 1], [0, 1, 1]);

  // Ignite progress (0 → 1 over 10 frames after igniteAtFrame)
  const ignite = interpolate(frame, [igniteAtFrame, igniteAtFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          gap: 18,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: brand.colors.textSecondary,
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.85)",
          }}
        >
          {header}
        </div>

        {/* Chip row */}
        <div style={{ display: "flex", gap: 14, flexWrap: "nowrap" }}>
          {chips.map((chip, i) => {
            const chipEnter = spring({
              frame: frame - 6 - i * 4,
              fps,
              config: { damping: 16, stiffness: 180, mass: 0.8 },
              durationInFrames: 10,
            });
            const chipY = interpolate(chipEnter, [0, 1], [28, 0]);
            const chipOpacity = interpolate(chipEnter, [0, 0.5, 1], [0, 1, 1]);
            const chipScale = interpolate(chipEnter, [0, 1], [0.9, 1]);

            const isHighlighted = chip.highlight === true;
            const gradOpacity = isHighlighted ? ignite : 0;
            const greyOpacity = isHighlighted ? 1 - ignite : 1;

            // Little extra bump when the chip ignites
            const bumpScale = isHighlighted
              ? interpolate(frame, [igniteAtFrame, igniteAtFrame + 4, igniteAtFrame + 10], [1, 1.08, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 1;

            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  padding: "16px 26px",
                  borderRadius: 999,
                  fontFamily: brand.fonts.emphasis,
                  fontSize: 30,
                  letterSpacing: "0.06em",
                  color: brand.colors.textPrimary,
                  transform: `translateY(${chipY}px) scale(${chipScale * bumpScale})`,
                  opacity: chipOpacity,
                  overflow: "visible",
                }}
              >
                {/* Grey base layer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 999,
                    backgroundColor: brand.colors.surface,
                    border: `1px solid ${brand.colors.divider}`,
                    opacity: greyOpacity,
                  }}
                />
                {/* Highlight gradient layer */}
                {isHighlighted ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: `linear-gradient(135deg, ${highlightStart} 0%, ${highlightEnd} 100%)`,
                      opacity: gradOpacity,
                      boxShadow: `0 0 ${interpolate(ignite, [0, 1], [0, 40])}px rgba(0,196,204,${interpolate(ignite, [0, 1], [0, 0.6])})`,
                    }}
                  />
                ) : null}
                {/* Text */}
                <span style={{ position: "relative", display: "inline-flex", gap: 8 }}>
                  {chip.prefix ? <span style={{ opacity: 0.9 }}>{chip.prefix}</span> : null}
                  {chip.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
