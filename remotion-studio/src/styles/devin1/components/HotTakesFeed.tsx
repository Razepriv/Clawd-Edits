import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface HotTake {
  /** Username handle, e.g. "@designbro". */
  handle: string;
  /** Display name, e.g. "Design Bro". */
  name: string;
  /** The take text. */
  text: string;
  /** Optional avatar gradient seed (0-5). Used to pick one of 6 colors. */
  avatarSeed?: number;
  /** Optional time label shown right of the name, e.g. "2m". */
  timeLabel?: string;
}

export interface HotTakesFeedProps {
  takes: HotTake[];
  /** Header pill text. Default "HOT TAKES". */
  header?: string;
  /** Frames between each take popping in. Default 16. */
  staggerFrames?: number;
}

// Twitter/X-style scrolling feed of viral takes — for the beat-4 mockery
// moment in the Canva-pipeline reel: "Canva dead, Figma cooked, design
// tools over". Each take pops in with a haptic bump.
const AVATAR_COLORS = [
  ["#FF3B79", "#7D2AE8"],  // pink→violet
  ["#00C4CC", "#5B8EFF"],  // teal→blue
  ["#FFB020", "#FF3B3B"],  // amber→red
  ["#2AE66E", "#00C4CC"],  // green→teal
  ["#FF6B6B", "#FFB020"],  // coral→amber
  ["#5B8EFF", "#7D2AE8"],  // blue→violet
];

export function HotTakesFeed({
  takes,
  header = "HOT TAKES",
  staggerFrames = 16,
}: HotTakesFeedProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  // Header pill entrance
  const headerEnter = spring({ frame, fps, config: { damping: 18, stiffness: 200 }, durationInFrames: 10 });
  const headerY = interpolate(headerEnter, [0, 1], [-40, 0]);
  const headerOpacity = interpolate(headerEnter, [0, 0.5, 1], [0, 1, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12%",
        gap: 18,
        pointerEvents: "none",
      }}
    >
      {/* Header pill */}
      <div
        style={{
          padding: "12px 28px",
          borderRadius: 999,
          backgroundColor: brand.colors.accent,
          color: brand.colors.textPrimary,
          fontFamily: brand.fonts.emphasis,
          fontSize: 32,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          boxShadow: `0 12px 28px rgba(233,18,18,0.4)`,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        {header}
      </div>

      {/* Stacked takes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 900 }}>
        {takes.map((take, i) => {
          const startFrame = 8 + i * staggerFrames;
          const takeEnter = spring({
            frame: frame - startFrame,
            fps,
            config: { damping: 14, stiffness: 190, mass: 0.8 },
            durationInFrames: 12,
          });
          const takeY = interpolate(takeEnter, [0, 1], [40, 0]);
          const takeOpacity = interpolate(takeEnter, [0, 0.5, 1], [0, 1, 1]);
          const takeScale = interpolate(takeEnter, [0, 1], [0.92, 1]);
          const [c1, c2] = AVATAR_COLORS[(take.avatarSeed ?? i) % AVATAR_COLORS.length];

          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "16px 20px",
                borderRadius: 18,
                backgroundColor: brand.colors.surface,
                border: `1px solid ${brand.colors.divider}`,
                boxShadow: `0 14px 32px ${brand.colors.shadow}`,
                fontFamily: brand.fonts.ui,
                color: brand.colors.textPrimary,
                opacity: takeOpacity,
                transform: `translateY(${takeY}px) scale(${takeScale})`,
                transformOrigin: "center",
              }}
            >
              {/* Avatar circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: brand.fonts.emphasis,
                  fontSize: 22,
                  color: "white",
                }}
              >
                {take.name.trim().charAt(0).toUpperCase()}
              </div>

              {/* Name row + take */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 22 }}>
                  <span style={{ fontWeight: 700 }}>{take.name}</span>
                  <span style={{ color: brand.colors.textSecondary }}>{take.handle}</span>
                  {take.timeLabel ? (
                    <>
                      <span style={{ color: brand.colors.textSecondary }}>·</span>
                      <span style={{ color: brand.colors.textSecondary }}>{take.timeLabel}</span>
                    </>
                  ) : null}
                </div>
                <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginTop: 2 }}>
                  {take.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
