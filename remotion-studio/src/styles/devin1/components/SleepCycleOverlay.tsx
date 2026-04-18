import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface SleepCycleOverlayProps {
  /** Label shown next to the moon. Default "WHILE YOU SLEEP". */
  label?: string;
  /** Offset in seconds into the clock sweep. */
  phaseOffset?: number;
}

// Visual metaphor for the "while you sleep" line in beat 3. A translucent
// moon icon drifts into the top-right, pulling a soft starfield + a ticking
// clock with it. Fades out on exit. Ultra-subtle — doesn't steal focus from
// the MultiAgentOrchestra card sitting above the avatar.
export function SleepCycleOverlay({
  label = "WHILE YOU SLEEP",
  phaseOffset = 0,
}: SleepCycleOverlayProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const brand = useBrand();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120 },
    durationInFrames: 20,
  });
  const fadeIn  = interpolate(entrance, [0, 1], [0, 1]);
  const fadeOut = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut) * 0.92;

  // Slow drift: moon starts slightly right-offscreen, settles into position.
  const moonX = interpolate(entrance, [0, 1], [120, 0]);

  // Clock hand rotates one full turn per 3 seconds of beat time.
  const clockAngle = ((frame / fps) + phaseOffset) * 120;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {/* Ambient dark-blue wash */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 75% 25%, rgba(50,70,140,0.35) 0%, transparent 55%)",
        mixBlendMode: "screen",
      }}/>

      {/* Starfield */}
      {[...Array(24)].map((_, i) => {
        const seed = i * 37 % 1000;
        const x = (seed * 7 + 13) % 1080;
        const y = ((seed * 11 + 41) % 800);
        const tw = 0.5 + 0.5 * Math.abs(Math.sin((frame + i * 3) / 10));
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y, width: 3, height: 3, borderRadius: 2,
            backgroundColor: "#E8EEFF", opacity: tw * 0.9,
          }}/>
        );
      })}

      {/* Moon + label group, top-right */}
      <div style={{
        position: "absolute", top: 180, right: 60 + moonX,
        display: "flex", alignItems: "center", gap: 18,
      }}>
        {/* Label */}
        <span style={{
          fontFamily: brand.fonts.emphasis,
          fontSize: 34,
          letterSpacing: "0.06em",
          color: brand.colors.textPrimary,
          textShadow: "0 2px 12px rgba(0,0,0,0.8)",
        }}>
          {label}
        </span>

        {/* Crescent moon (CSS pseudo via box-shadow cutout) */}
        <div style={{
          position: "relative", width: 90, height: 90, borderRadius: 45,
          background: "radial-gradient(circle at 35% 35%, #F6EED8, #C4BB96)",
          boxShadow: "inset -22px -8px 0 0 rgba(8,10,30,0.88), 0 0 40px rgba(246,238,216,0.4)",
        }}/>

        {/* Ticking clock beside the moon */}
        <div style={{ position: "relative", width: 64, height: 64 }}>
          <div style={{
            position: "absolute", inset: 0,
            border: "3px solid rgba(232,238,255,0.8)",
            borderRadius: "50%",
            backgroundColor: "rgba(8,10,30,0.7)",
          }}/>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 3, height: 22, backgroundColor: "#E8EEFF",
            transformOrigin: "top left",
            transform: `translate(-50%, 0) rotate(${clockAngle}deg)`,
          }}/>
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            width: 4, height: 4, borderRadius: 3, backgroundColor: "#E8EEFF",
            transform: "translate(-50%, -50%)",
          }}/>
        </div>
      </div>
    </AbsoluteFill>
  );
}
