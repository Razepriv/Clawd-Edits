import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";
import { DEVIN1 } from "../constants";

export interface EmphasisCaptionProps {
  line1: string;
  line2: string;
  // Override the brand accent gradient on line 2 if you want pixel-accuracy
  // to a reference video (e.g. Devin 1 uses pink→magenta, not red).
  line2GradientStart?: string;
  line2GradientEnd?: string;
  // Vertical placement. Default "center" sits at ~y=50% of canvas which lands
  // over the speaker in head-pop-out B-rolls. Use "upper" (~y=25%) when the
  // slam fires during a stacked_broll so it lands in the clean B-roll zone
  // above the head breakout instead of on top of the face.
  yPosition?: "center" | "upper";
}

// Devin 1 emphasis caption — two-line bold condensed uppercase.
// Line 1: white. Line 2: linear gradient (defaults to brand accent).
// Entrance: scale 95→100 + opacity 0→1 over ~3 frames.
// Reference frames: _audit/Devin Jahod/Devin 1/frames/f_0044.jpg, f_0200.jpg
export function EmphasisCaption({
  line1,
  line2,
  line2GradientStart,
  line2GradientEnd,
  yPosition = "center",
}: EmphasisCaptionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const gradStart = line2GradientStart ?? brand.colors.accentBright;
  const gradEnd = line2GradientEnd ?? brand.colors.accent;

  // Snappy scale-up + slight pop from below for extra "slam" feeling.
  const rise = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 200, mass: 0.8 },
    durationInFrames: 8,
  });

  const opacity = interpolate(rise, [0, 0.4, 1], [0, 1, 1]);
  const scale = interpolate(rise, [0, 1], [0.86, 1]);
  const translateY = interpolate(rise, [0, 1], [60, 0]);

  // "center" = ~y 50 % (paddingTop 45 %) = original v12 position, sits over face.
  // "upper"  = ~y 25 % (paddingTop 12 %) = sits in B-roll-only zone ABOVE the
  //           head-pop-out breakout (head starts ~y 54 % in the canonical 3-layer).
  const paddingTop = yPosition === "upper" ? "12%" : "45%";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: yPosition === "upper" ? "flex-start" : "center",
        paddingTop,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        fontFamily: brand.fonts.emphasis,
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontSize: DEVIN1.caption.fontSize,
          lineHeight: DEVIN1.caption.lineHeight,
          letterSpacing: `${DEVIN1.caption.tracking}em`,
          color: brand.colors.textPrimary,
          textTransform: "uppercase",
          textShadow: `0 4px ${DEVIN1.caption.dropShadowBlur}px rgba(0,0,0,${DEVIN1.caption.dropShadowOpacity}), ${DEVIN1.caption.outerGlow}`,
        }}
      >
        {line1}
      </span>
      <span
        style={{
          fontSize: DEVIN1.caption.fontSize,
          lineHeight: DEVIN1.caption.lineHeight,
          letterSpacing: `${DEVIN1.caption.tracking}em`,
          textTransform: "uppercase",
          backgroundImage: `linear-gradient(180deg, ${gradStart} 0%, ${gradEnd} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 4px ${DEVIN1.caption.dropShadowBlur}px rgba(0,0,0,${DEVIN1.caption.dropShadowOpacity}))`,
        }}
      >
        {line2}
      </span>
    </div>
  );
}
