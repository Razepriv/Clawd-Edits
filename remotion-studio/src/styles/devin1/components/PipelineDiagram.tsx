import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface PipelineNode {
  /** Display label for the node (e.g. "CLAUDE DESIGN", "CANVA", "SHIP"). */
  label: string;
  /** Optional logo image src (path inside public/ or absolute URL). */
  logoSrc?: string;
  /** Gradient start color for the node background. */
  gradientStart?: string;
  /** Gradient end color. */
  gradientEnd?: string;
  /** Optional emoji/glyph fallback if no logo. */
  glyph?: string;
  /** If true, this node gets a brand-red highlight halo. */
  highlight?: boolean;
}

export interface PipelineDiagramProps {
  nodes: PipelineNode[];
  /** Header above the diagram. */
  header?: string;
  /** Stagger between node entrances (frames). Default 10. */
  staggerFrames?: number;
}

// Left-to-right pipeline flow with nodes + animated arrows drawing between
// them. Used for the beat-6 "It's a pipeline" reframe and optionally for
// beat 8 (the "pitch decks through Claude Design into Canva brand kit" flow).
export function PipelineDiagram({
  nodes,
  header = "THE PIPELINE",
  staggerFrames = 10,
}: PipelineDiagramProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const headerEnter = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 10 });
  const headerY = interpolate(headerEnter, [0, 1], [-24, 0]);
  const headerOpacity = interpolate(headerEnter, [0, 0.5, 1], [0, 1, 1]);

  const resolveSrc = (src: string): string =>
    src.startsWith("http") || src.startsWith("file:") || src.startsWith("data:") ? src : staticFile(src);

  const nodeSize = 180;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8%",
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
          marginBottom: 40,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.85)",
        }}
      >
        {header}
      </div>

      {/* Diagram row */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {nodes.map((node, i) => {
          const startFrame = 8 + i * staggerFrames;
          const nodeEnter = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 14, stiffness: 190, mass: 0.85 },
            durationInFrames: 12,
          });
          const nodeScale = interpolate(nodeEnter, [0, 1], [0.7, 1]);
          const nodeOpacity = interpolate(nodeEnter, [0, 0.5, 1], [0, 1, 1]);

          const gradStart = node.gradientStart ?? brand.colors.surface;
          const gradEnd = node.gradientEnd ?? brand.colors.background;

          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 18 }}
            >
              {/* Arrow before each non-first node */}
              {i > 0 ? (
                <ArrowDrawIn
                  startFrame={startFrame - 5}
                  color={brand.colors.accent}
                />
              ) : null}

              {/* Node capsule */}
              <div
                style={{
                  width: nodeSize,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  opacity: nodeOpacity,
                  transform: `scale(${nodeScale})`,
                }}
              >
                {/* Icon square */}
                <div
                  style={{
                    width: nodeSize,
                    height: nodeSize,
                    borderRadius: 30,
                    background: `linear-gradient(135deg, ${gradStart} 0%, ${gradEnd} 100%)`,
                    border: node.highlight
                      ? `2px solid ${brand.colors.accentBright}`
                      : `1px solid ${brand.colors.divider}`,
                    boxShadow: node.highlight
                      ? `0 0 44px rgba(255,42,42,0.55), 0 14px 32px rgba(0,0,0,0.45)`
                      : `0 14px 32px ${brand.colors.shadow}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {node.logoSrc ? (
                    <img
                      src={resolveSrc(node.logoSrc)}
                      alt=""
                      style={{ width: "70%", height: "70%", objectFit: "contain" }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 92,
                        lineHeight: 1,
                        color: brand.colors.textPrimary,
                      }}
                    >
                      {node.glyph ?? "•"}
                    </span>
                  )}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: brand.fonts.emphasis,
                    fontSize: 22,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: brand.colors.textPrimary,
                    textShadow: "0 2px 10px rgba(0,0,0,0.85)",
                    textAlign: "center",
                    maxWidth: nodeSize + 20,
                  }}
                >
                  {node.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// Small chevron-arrow SVG that draws in via stroke-dasharray.
function ArrowDrawIn({ startFrame, color }: { startFrame: number; color: string }) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [startFrame, startFrame + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shaftLen = 90;
  return (
    <svg width={shaftLen + 24} height={40} viewBox={`0 0 ${shaftLen + 24} 40`} style={{ opacity }}>
      {/* Shaft */}
      <line
        x1={4}
        y1={20}
        x2={shaftLen}
        y2={20}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={shaftLen}
        strokeDashoffset={shaftLen - progress * shaftLen}
      />
      {/* Arrowhead (chevron, drawn as a path) */}
      <path
        d={`M ${shaftLen - 4} 8 L ${shaftLen + 16} 20 L ${shaftLen - 4} 32`}
        stroke={color}
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={50}
        strokeDashoffset={50 - progress * 50}
      />
    </svg>
  );
}
