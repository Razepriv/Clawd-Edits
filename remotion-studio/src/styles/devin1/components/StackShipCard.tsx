import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface StackTool {
  label: string;
  logoSrc?: string;
  gradientStart?: string;
  gradientEnd?: string;
  glyph?: string;
}

export interface StackShipCardProps {
  tools: StackTool[];
  /** Header text. Default "YOUR STACK". */
  header?: string;
  /** Label on the end-of-stack stamp. Default "SHIP". */
  shipLabel?: string;
  /** Frame when SHIP stamp lands. Default 32. */
  shipAtFrame?: number;
}

// 3-tile tool stack with a "+ SHIP" stamp landing at the end.
// For the beat-7 advice: "Pick two or three that play nice and ship."
// Each tile enters from below with a spring, the SHIP stamp lands last
// with a bigger scale bump + brand-red glow.
export function StackShipCard({
  tools,
  header = "YOUR STACK",
  shipLabel = "SHIP",
  shipAtFrame = 32,
}: StackShipCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const resolveSrc = (src: string): string =>
    src.startsWith("http") || src.startsWith("file:") || src.startsWith("data:") ? src : staticFile(src);

  const headerEnter = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 10 });
  const headerY = interpolate(headerEnter, [0, 1], [-30, 0]);
  const headerOpacity = interpolate(headerEnter, [0, 0.5, 1], [0, 1, 1]);

  const shipEnter = spring({
    frame: frame - shipAtFrame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.9 },
    durationInFrames: 14,
  });
  const shipScale = interpolate(shipEnter, [0, 1], [0, 1]);
  const shipOpacity = interpolate(shipEnter, [0, 0.4, 1], [0, 1, 1]);
  const shipRotate = interpolate(shipEnter, [0, 1], [-22, -10]);

  const tileSize = 180;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
        pointerEvents: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: brand.fonts.emphasis,
          fontSize: 30,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: brand.colors.textSecondary,
          marginBottom: 34,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.85)",
        }}
      >
        {header}
      </div>

      {/* Tiles row */}
      <div style={{ display: "flex", gap: 22, alignItems: "center", position: "relative" }}>
        {tools.map((tool, i) => {
          const startFrame = 8 + i * 10;
          const tileEnter = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 14, stiffness: 190, mass: 0.85 },
            durationInFrames: 12,
          });
          const tileY = interpolate(tileEnter, [0, 1], [60, 0]);
          const tileOpacity = interpolate(tileEnter, [0, 0.5, 1], [0, 1, 1]);
          const tileScale = interpolate(tileEnter, [0, 1], [0.8, 1]);

          const gradStart = tool.gradientStart ?? brand.colors.surface;
          const gradEnd = tool.gradientEnd ?? brand.colors.background;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                opacity: tileOpacity,
                transform: `translateY(${tileY}px) scale(${tileScale})`,
              }}
            >
              <div
                style={{
                  width: tileSize,
                  height: tileSize,
                  borderRadius: 28,
                  background: `linear-gradient(135deg, ${gradStart} 0%, ${gradEnd} 100%)`,
                  border: `1px solid ${brand.colors.divider}`,
                  boxShadow: `0 14px 32px ${brand.colors.shadow}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {tool.logoSrc ? (
                  <img
                    src={resolveSrc(tool.logoSrc)}
                    alt=""
                    style={{ width: "70%", height: "70%", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 92, color: brand.colors.textPrimary }}>{tool.glyph ?? "•"}</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: brand.fonts.emphasis,
                  fontSize: 22,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: brand.colors.textPrimary,
                  textShadow: "0 2px 10px rgba(0,0,0,0.85)",
                  textAlign: "center",
                  maxWidth: tileSize + 20,
                }}
              >
                {tool.label}
              </div>
            </div>
          );
        })}

        {/* SHIP stamp — absolute-positioned over the bottom-right */}
        <div
          style={{
            position: "absolute",
            right: -70,
            bottom: -40,
            padding: "18px 32px",
            borderRadius: 18,
            background: `linear-gradient(135deg, ${brand.colors.accentBright} 0%, ${brand.colors.accent} 100%)`,
            border: `3px solid ${brand.colors.textPrimary}`,
            boxShadow: `0 0 48px rgba(255,42,42,0.7), 0 14px 32px rgba(0,0,0,0.55)`,
            fontFamily: brand.fonts.emphasis,
            fontSize: 48,
            letterSpacing: "0.12em",
            color: brand.colors.textPrimary,
            textTransform: "uppercase",
            opacity: shipOpacity,
            transform: `scale(${shipScale}) rotate(${shipRotate}deg)`,
            transformOrigin: "center",
          }}
        >
          {shipLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
}
