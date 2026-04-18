import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface BrandKitRevealProps {
  /** Brand name title on the card. */
  brandName: string;
  /** Small subtitle / meta line. */
  subtitle?: string;
  /** Logo image src. */
  logoSrc?: string;
  /** Three palette swatches (hex). Default uses brand tokens. */
  colors?: [string, string, string];
  /** Primary font family name (e.g. "Archivo Black"). */
  primaryFont?: string;
  /** Body font family name (e.g. "Inter"). */
  bodyFont?: string;
  /** Header above the card. */
  header?: string;
}

// Canva-style brand-kit card — for the beat-8 "my Canva brand kit this week"
// claim. Renders a dark card with a logo slot, three color swatches, and two
// font specimen rows. Enters with a slight tilt flip.
export function BrandKitReveal({
  brandName,
  subtitle,
  logoSrc,
  colors,
  primaryFont = "Archivo Black",
  bodyFont = "Inter",
  header = "BRAND KIT",
}: BrandKitRevealProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const resolveSrc = (src: string): string =>
    src.startsWith("http") || src.startsWith("file:") || src.startsWith("data:") ? src : staticFile(src);

  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 170 }, durationInFrames: 16 });
  const cardY = interpolate(entrance, [0, 1], [180, 0]);
  const cardOpacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);
  const cardRotate = interpolate(entrance, [0, 1], [6, 0]);

  const palette = colors ?? [brand.colors.accent, brand.colors.background, brand.colors.link];

  const cardWidth = 900;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8%",
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
          transform: `translateY(${cardY}px) rotate(${cardRotate}deg)`,
          opacity: cardOpacity,
          overflow: "hidden",
        }}
      >
        {/* Header strip */}
        <div
          style={{
            padding: "14px 24px",
            borderBottom: `1px solid ${brand.colors.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          <span
            style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: brand.colors.textSecondary,
            }}
          >
            {header}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#FEBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#28C840" }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Logo + name row */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 20,
                backgroundColor: palette[0],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 24px ${palette[0]}66`,
              }}
            >
              {logoSrc ? (
                <img src={resolveSrc(logoSrc)} alt="" style={{ width: "72%", height: "72%", objectFit: "contain" }} />
              ) : (
                <span style={{ fontFamily: brand.fonts.emphasis, fontSize: 42, color: brand.colors.textPrimary }}>
                  {brandName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 34, fontWeight: 700 }}>{brandName}</span>
              {subtitle ? (
                <span style={{ fontSize: 22, color: brand.colors.textSecondary }}>{subtitle}</span>
              ) : null}
            </div>
          </div>

          {/* Colors section */}
          <SectionLabel>Colors</SectionLabel>
          <div style={{ display: "flex", gap: 14 }}>
            {palette.map((hex, i) => {
              const swatchEnter = spring({
                frame: frame - 10 - i * 3,
                fps,
                config: { damping: 14, stiffness: 200 },
                durationInFrames: 10,
              });
              const scale = interpolate(swatchEnter, [0, 1], [0.7, 1]);
              const opacity = interpolate(swatchEnter, [0, 0.5, 1], [0, 1, 1]);
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 6,
                    opacity,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 18,
                      backgroundColor: hex,
                      border: `1px solid rgba(255,255,255,0.12)`,
                      boxShadow: `0 6px 18px rgba(0,0,0,0.45)`,
                    }}
                  />
                  <span style={{ fontSize: 20, color: brand.colors.textSecondary, fontVariantNumeric: "tabular-nums" }}>
                    {hex.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Typography section */}
          <SectionLabel>Typography</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontFamily: brand.fonts.emphasis,
                fontSize: 40,
                letterSpacing: "-0.01em",
                color: brand.colors.textPrimary,
              }}
            >
              {primaryFont}
              <span
                style={{
                  marginLeft: 14,
                  fontSize: 18,
                  fontFamily: brand.fonts.ui,
                  color: brand.colors.textSecondary,
                  letterSpacing: 0,
                }}
              >
                HEADLINES
              </span>
            </div>
            <div
              style={{
                fontFamily: brand.fonts.ui,
                fontSize: 26,
                color: brand.colors.textPrimary,
              }}
            >
              {bodyFont}
              <span
                style={{
                  marginLeft: 12,
                  fontSize: 18,
                  color: brand.colors.textSecondary,
                }}
              >
                body · captions · UI
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );

  function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          fontFamily: brand.fonts.emphasis,
          fontSize: 18,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: brand.colors.textSecondary,
        }}
      >
        {children}
      </div>
    );
  }
}
