import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface QuoteCardProps {
  /** The quoted text (without surrounding quote marks). */
  quote: string;
  /** Author name, e.g. "Melanie Perkins". */
  author: string;
  /** Author role/title, e.g. "Co-Founder and CEO, Canva". */
  role: string;
  /** Brand logo for the card chrome (left of the author block). Path or data URL. */
  brandLogoSrc?: string;
  /** Tinted background for the logo strip. */
  brandColor?: string;
  /** Optional gradient for the text highlight strip. */
  accentStart?: string;
  accentEnd?: string;
}

// Authoritative pull-quote card — used for the beat-5 "CEO quoted in the
// launch" moment. Renders as a dark rounded card with:
//   - a branded header strip (brand color + optional logo)
//   - a giant left quotation mark
//   - the quote body text
//   - author + role footer
export function QuoteCard({
  quote,
  author,
  role,
  brandLogoSrc,
  brandColor = "#00C4CC",
  accentStart,
  accentEnd,
}: QuoteCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 940;

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 170 }, durationInFrames: 16 });
  const cardY = interpolate(entrance, [0, 1], [200, 0]);
  const cardOpacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Quote text letter-fade (fade the text in over 14 frames after card lands)
  const textStart = 10;
  const textOpacity = interpolate(frame, [textStart, textStart + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stripGradient = accentStart && accentEnd
    ? `linear-gradient(135deg, ${accentStart} 0%, ${accentEnd} 100%)`
    : `linear-gradient(135deg, ${brandColor} 0%, ${brand.colors.accent} 100%)`;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: cardWidth,
          borderRadius: 28,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 28px 58px ${brand.colors.shadow}`,
          fontFamily: brand.fonts.ui,
          color: brand.colors.textPrimary,
          backdropFilter: "blur(22px)",
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          overflow: "hidden",
        }}
      >
        {/* Branded header strip */}
        <div
          style={{
            background: stripGradient,
            padding: "14px 26px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {brandLogoSrc ? (
            <img
              src={brandLogoSrc}
              alt=""
              style={{ height: 32, filter: "brightness(0) invert(1)" }}
            />
          ) : null}
          <span
            style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "white",
              fontWeight: 700,
            }}
          >
            FROM THE LAUNCH
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 34px 26px", position: "relative" }}>
          {/* Giant open-quote mark */}
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 20,
              fontSize: 120,
              lineHeight: 1,
              color: brandColor,
              opacity: 0.55,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          >
            &ldquo;
          </div>

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: brand.colors.textPrimary,
              paddingLeft: 28,
              opacity: textOpacity,
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            {quote}
          </div>

          {/* Author footer */}
          <div
            style={{
              marginTop: 22,
              paddingTop: 18,
              borderTop: `1px solid ${brand.colors.divider}`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              opacity: textOpacity,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 700 }}>{author}</span>
            <span style={{ fontSize: 22, color: brand.colors.textSecondary }}>{role}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
