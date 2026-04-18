import { AbsoluteFill, Video, useCurrentFrame, useVideoConfig, interpolate, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface AnimeHookClipProps {
  /** Path to the anime MP4 relative to `public/`. */
  src: string;
  /** Offset into the anime MP4 to start playback (seconds). */
  startFromSeconds?: number;
  /** Optional top-of-frame caption pill (e.g. "CODEX JUST STOPPED BEING A CODING TOOL"). */
  label?: string;
  /** Background tint applied as a radial overlay. Default uses brand accent. */
  tintColor?: string;
}

// Full-frame anime/cartoon clip that plays over the avatar for the HOOK beat.
// A subtle vignette + brand-red radial tint bleeds onto the edges so the clip
// sits inside the faux.thinker aesthetic instead of feeling "foreign".
export function AnimeHookClip({
  src,
  startFromSeconds = 0,
  label,
  tintColor,
}: AnimeHookClipProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const brand = useBrand();

  const clipSrc = src.startsWith("/") || src.startsWith("http") ? src : staticFile(src);

  // Soft fade-in (first 4 frames) and fade-out (last 6 frames) — so the clip
  // blends into the a-roll instead of hard-cutting.
  const fadeIn  = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 6, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  // Label pill pops in on frame 2 with a spring-free scale lerp.
  const labelOpacity = interpolate(frame, [2, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelY       = interpolate(frame, [2, 10], [-18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: brand.colors.background }}>
      {/* 1. The anime clip itself, cover-fit. */}
      <Video
        src={clipSrc}
        startFrom={Math.round(startFromSeconds * fps)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* 2. Brand-red radial vignette so it feels faux.thinker, not Ghibli. */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${tintColor ?? brand.colors.background}cc 95%)`,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {/* 3. Subtle film grain / scanline (CSS gradient). */}
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
          opacity: 0.55,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* 4. Optional top-of-frame label pill (matches SplitStackBroll labelling). */}
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: brand.fonts.emphasis,
              fontSize: 38,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "12px 28px",
              borderRadius: 999,
              color: brand.colors.textPrimary,
              backgroundColor: "rgba(20,20,25,0.88)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${brand.colors.divider}`,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            }}
          >
            {label}
          </span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
