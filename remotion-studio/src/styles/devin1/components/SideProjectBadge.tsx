import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface SideProjectBadgeProps {
  /** Main label (e.g. "SIDE PROJECT"). */
  label: string;
  /** Secondary meta line (e.g. "2 WEEKS"). */
  meta?: string;
  /** Position anchor. */
  yPercent?: number;
  xPercent?: number;
}

// Small pill label with a ticking-clock glyph — used for the "side project /
// 2 weeks" beat in the Codex reel. Lives in the upper third so the speaker's
// face stays clean.
export function SideProjectBadge({
  label,
  meta,
  yPercent = 14,
  xPercent = 50,
}: SideProjectBadgeProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180 },
    durationInFrames: 12,
  });
  const x = interpolate(entrance, [0, 1], [-260, 0]);
  const o = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Ticking clock rotation.
  const clockAngle = ((frame / fps) * 90) % 360;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{
        position: "absolute",
        top: `${yPercent}%`,
        left: `${xPercent}%`,
        transform: `translate(-50%, 0) translateX(${x}px)`,
        opacity: o,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 24px",
        borderRadius: 999,
        backgroundColor: "rgba(20,20,25,0.90)",
        border: `1px solid ${brand.colors.divider}`,
        boxShadow: `0 12px 28px ${brand.colors.shadow}`,
        backdropFilter: "blur(18px)",
        fontFamily: brand.fonts.emphasis,
        color: brand.colors.textPrimary,
      }}>
        {/* Mini ticking clock */}
        <div style={{ position: "relative", width: 28, height: 28 }}>
          <div style={{
            position: "absolute", inset: 0,
            border: `2px solid ${brand.colors.accent}`,
            borderRadius: "50%",
            backgroundColor: "rgba(10,10,10,0.55)",
          }}/>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 2, height: 10, backgroundColor: brand.colors.accentBright,
            transformOrigin: "top left",
            transform: `translate(-50%, 0) rotate(${clockAngle}deg)`,
          }}/>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 3, height: 3, borderRadius: 2, backgroundColor: brand.colors.accentBright,
            transform: "translate(-50%, -50%)",
          }}/>
        </div>
        <span style={{ fontSize: 28, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {label}
        </span>
        {meta ? (
          <>
            <span style={{ width: 1, height: 22, backgroundColor: "rgba(255,255,255,0.20)" }}/>
            <span style={{
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: brand.colors.textSecondary,
              fontFamily: brand.fonts.ui,
              fontWeight: 600,
            }}>
              {meta}
            </span>
          </>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
