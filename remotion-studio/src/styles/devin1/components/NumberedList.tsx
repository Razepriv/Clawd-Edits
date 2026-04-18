import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface NumberedListItem {
  /** List item text. */
  text: string;
  /** Optional highlight substring (rendered in brand-red gradient). */
  highlight?: string;
}

export interface NumberedListProps {
  items: NumberedListItem[];
  /** Card header above the list. */
  header?: string;
  /** Frames between each item entering. Default 10. */
  staggerFrames?: number;
  /** Y anchor (% of canvas). Default 62 (sits BELOW the face, above the IG caption band). */
  yPercent?: number;
  /** Optional X inset (px from left). Ignored when `centered` is true. */
  xPx?: number;
  /** When true, the card is horizontally centered via translateX(-50%). Default true. */
  centered?: boolean;
  /** Card width. Default 720 (fits inside the 70 % middle safe zone). */
  cardWidth?: number;
}

// Left-aligned numbered-list card. For the 27-32 s beat in the new edit
// plan: "1. Stop tool-hopping   2. Pick 2–3 that talk to each other   3. Ship"
// Each row enters sequentially; numbers have a brand-red gradient fill.
export function NumberedList({
  items,
  header = "THE RULE OF THREE",
  staggerFrames = 10,
  yPercent = 62,
  xPx,
  centered = true,
  cardWidth = 720,
}: NumberedListProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardEnter = spring({ frame, fps, config: { damping: 18, stiffness: 170 }, durationInFrames: 14 });
  // When centered: slide up from below. When left-aligned: slide in from the left.
  const cardY = centered ? interpolate(cardEnter, [0, 1], [50, 0]) : 0;
  const cardX = centered ? 0 : interpolate(cardEnter, [0, 1], [-80, 0]);
  const cardOpacity = interpolate(cardEnter, [0, 0.5, 1], [0, 1, 1]);

  const renderItemText = (item: NumberedListItem): React.ReactNode => {
    if (!item.highlight) return item.text;
    const idx = item.text.toLowerCase().indexOf(item.highlight.toLowerCase());
    if (idx < 0) return item.text;
    return (
      <>
        {item.text.slice(0, idx)}
        <span
          style={{
            backgroundImage: `linear-gradient(180deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 800,
          }}
        >
          {item.text.slice(idx, idx + item.highlight.length)}
        </span>
        {item.text.slice(idx + item.highlight.length)}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: centered ? "50%" : (xPx ?? 120),
          top: `${yPercent}%`,
          width: cardWidth,
          padding: "24px 28px",
          borderRadius: 24,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 24px 48px ${brand.colors.shadow}`,
          backdropFilter: "blur(18px)",
          fontFamily: brand.fonts.ui,
          color: brand.colors.textPrimary,
          opacity: cardOpacity,
          transform: centered
            ? `translateX(-50%) translateY(${cardY}px)`
            : `translateX(${cardX}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: brand.colors.textSecondary,
          }}
        >
          {header}
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => {
            const startFrame = 10 + i * staggerFrames;
            const itemEnter = spring({
              frame: frame - startFrame,
              fps,
              config: { damping: 14, stiffness: 190, mass: 0.85 },
              durationInFrames: 10,
            });
            const itemX = interpolate(itemEnter, [0, 1], [-40, 0]);
            const itemOpacity = interpolate(itemEnter, [0, 0.5, 1], [0, 1, 1]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                }}
              >
                {/* Number glyph */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: brand.fonts.emphasis,
                    fontSize: 30,
                    color: "white",
                    boxShadow: `0 6px 16px rgba(233,18,18,0.4)`,
                  }}
                >
                  {i + 1}
                </div>
                {/* Text */}
                <div
                  style={{
                    fontSize: 28,
                    lineHeight: 1.2,
                    fontWeight: 700,
                    color: brand.colors.textPrimary,
                    flex: 1,
                  }}
                >
                  {renderItemText(item)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
