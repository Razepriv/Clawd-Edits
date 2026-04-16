import { interpolate, random, useCurrentFrame } from "remotion";
import { useBrand } from "../brand/BrandProvider";

export interface GlitchFlashProps {
  // Intensity 0–1. 0.8 matches Devin 1 reference feel.
  intensity?: number;
  // Number of horizontal slices displaced.
  slices?: number;
  // Whether to show a white flash at peak.
  flash?: boolean;
}

// Overlay-style RGB glitch flash. Unlike a TransitionSeries presentation, this
// is an AbsoluteFill that bursts a chromatic-aberration + slice-displacement +
// scanline effect over whatever is beneath it for its Sequence duration.
//
// Peak intensity hits at 50% through the sequence, then eases out.
// Zero API spend — pure SVG + CSS, adapted from the glitch transition in
// digitalsamba/claude-code-video-toolkit.
export function GlitchFlash({ intensity = 0.85, slices = 10, flash = true }: GlitchFlashProps) {
  const frame = useCurrentFrame();
  const brand = useBrand();

  // Intensity envelope — ramps 0 → 1 → 0 across the sequence.
  // We treat 24 frames as the "typical" burst length; longer sequences just
  // sustain the peak longer.
  const env = interpolate(frame, [0, 4, 10, 24], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * intensity;

  // Change noise pattern every 2 frames for authentic glitch chaos.
  const flickerFrame = Math.floor(frame / 2);

  const rgbShift = env * 40;
  const sliceHeight = 100 / slices;

  // Brand-tinted highlights — use accent color so the glitch feels on-brand.
  const accent = brand.colors.accent;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Solid dark tint with brand accent bleeding through — replaces what
          the avatar would show during the burst. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: brand.colors.background,
          opacity: env * 0.35,
          mixBlendMode: "multiply",
        }}
      />

      {/* Red channel ghost — shifted left */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: accent,
          opacity: env * 0.35,
          transform: `translateX(${-rgbShift}px)`,
          mixBlendMode: "screen",
        }}
      />
      {/* Cyan channel ghost — shifted right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#00E7FF",
          opacity: env * 0.25,
          transform: `translateX(${rgbShift}px)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Horizontal slice displacement bars */}
      {Array.from({ length: slices }, (_, i) => {
        const seed = `slice-${i}-${flickerFrame}`;
        const offset = (random(seed) - 0.5) * 160 * env;
        const jumpProb = random(`jump-${i}-${flickerFrame}`);
        const jump = jumpProb > 0.5 ? (random(`jd-${i}-${flickerFrame}`) > 0.5 ? 2.2 : -2.2) : 1;
        const visible = random(`vis-${i}-${flickerFrame}`) > 0.3;
        if (!visible || env < 0.1) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i * sliceHeight}%`,
              left: 0,
              width: "100%",
              height: `${sliceHeight}%`,
              backgroundColor: random(`c-${i}-${flickerFrame}`) > 0.5 ? "rgba(255,255,255,0.08)" : `${accent}22`,
              transform: `translateX(${offset * jump}px)`,
              mixBlendMode: "screen",
            }}
          />
        );
      })}

      {/* Scanline overlay */}
      {env > 0.2 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: env * 0.5,
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.55) 2px, rgba(0,0,0,0.55) 4px)",
          }}
        />
      ) : null}

      {/* Noise texture */}
      {env > 0.15 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: env * 0.25,
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      ) : null}

      {/* White flash at peak */}
      {flash && env > 0.75 && random(`flash-${flickerFrame}`) > 0.5 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "white",
            opacity: env * 0.2,
            mixBlendMode: "overlay",
          }}
        />
      ) : null}
    </div>
  );
}
