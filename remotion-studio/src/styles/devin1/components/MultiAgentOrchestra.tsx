import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface AgentLane {
  /** Small uppercase label on the left (e.g. "BUG"). */
  badge: string;
  /** Full title (e.g. "Bug-fixer"). */
  title: string;
  /** Live status line (e.g. "Fixing issue #432"). */
  status: string;
  /** "running" pulses the dot; "done" shows a filled check. */
  state?: "running" | "done";
}

export interface MultiAgentOrchestraProps {
  lanes: AgentLane[];
  /** Header text. Default "MULTI-AGENT". */
  header?: string;
  /** Frames to stagger each lane's entrance. Default 6. */
  staggerFrames?: number;
}

// Visualises 3 parallel agents running on one machine — bug-fixer / test-runner
// / reviewer. Each lane slides in from the left, shows a pulsing brand-red
// status dot while "running", and a subtle progress bar that keeps moving.
// Purpose: beat-3 visual for the Codex reel ("Codex now runs multiple agents").
export function MultiAgentOrchestra({
  lanes,
  header = "MULTI-AGENT",
  staggerFrames = 6,
}: MultiAgentOrchestraProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 920;
  const laneHeight = 150;
  const headerHeight = 88;
  const cardHeight = headerHeight + lanes.length * laneHeight + 32;

  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 160, mass: 0.85 },
    durationInFrames: 16,
  });
  const cardY       = interpolate(cardEntrance, [0, 1], [220, 0]);
  const cardOpacity = interpolate(cardEntrance, [0, 0.5, 1], [0, 1, 1]);

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "14%", pointerEvents: "none" }}>
      <div
        style={{
          width: cardWidth,
          minHeight: cardHeight,
          padding: 28,
          borderRadius: 28,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 28px 58px ${brand.colors.shadow}`,
          fontFamily: brand.fonts.ui,
          color: brand.colors.textPrimary,
          backdropFilter: "blur(22px)",
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.02em" }}>{header}</span>
          <span style={{
            fontSize: 22, fontWeight: 500, padding: "6px 14px",
            borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)",
            color: brand.colors.textSecondary, fontFamily: brand.fonts.emphasis,
            letterSpacing: "0.06em",
          }}>
            {lanes.filter(l => (l.state ?? "running") === "running").length} RUNNING
          </span>
        </div>

        {/* Lanes */}
        {lanes.map((lane, i) => {
          const laneStart = 10 + i * staggerFrames;
          const laneEnter = spring({
            frame: frame - laneStart,
            fps,
            config: { damping: 18, stiffness: 170 },
            durationInFrames: 12,
          });
          const laneX       = interpolate(laneEnter, [0, 1], [-520, 0]);
          const laneOpacity = interpolate(laneEnter, [0, 0.4, 1], [0, 1, 1]);

          // Status dot pulses at ~1.5 Hz (every 25 frames).
          const pulsePhase = (frame - laneStart) / fps * 1.5 * Math.PI * 2;
          const pulse      = (lane.state ?? "running") === "running"
            ? 0.65 + 0.35 * Math.abs(Math.sin(pulsePhase))
            : 1;

          // Progress bar sweeps left-to-right then loops.
          const progressPeriod = 50;
          const progress = ((frame - laneStart) % progressPeriod) / progressPeriod;

          return (
            <div
              key={i}
              style={{
                padding: "16px 22px",
                borderRadius: 18,
                border: `1px solid ${brand.colors.divider}`,
                backgroundColor: "rgba(255,255,255,0.03)",
                transform: `translateX(${laneX}px)`,
                opacity: laneOpacity,
                display: "flex",
                alignItems: "center",
                gap: 18,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Status dot */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 7,
                  backgroundColor: (lane.state ?? "running") === "running" ? brand.colors.accent : brand.colors.growthGreen,
                  opacity: pulse,
                  boxShadow: `0 0 12px ${(lane.state ?? "running") === "running" ? brand.colors.accent : brand.colors.growthGreen}`,
                }}/>
                <span style={{
                  fontFamily: brand.fonts.emphasis, fontSize: 24, letterSpacing: "0.08em",
                  color: brand.colors.textSecondary,
                }}>
                  {lane.badge}
                </span>
              </div>

              {/* Title + status line */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: 26, fontWeight: 700 }}>{lane.title}</span>
                <span style={{ fontSize: 20, color: brand.colors.textSecondary, marginTop: 2 }}>
                  {lane.status}
                </span>
              </div>

              {/* Progress bar (absolute, at the bottom of the lane row) */}
              {(lane.state ?? "running") === "running" ? (
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <div style={{
                    width: `${progress * 100}%`, height: "100%",
                    background: `linear-gradient(90deg, ${brand.colors.accent}, ${brand.colors.accentBright})`,
                    opacity: laneOpacity,
                  }}/>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
