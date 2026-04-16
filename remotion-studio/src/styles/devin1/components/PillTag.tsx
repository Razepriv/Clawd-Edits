import { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DEVIN1 } from "../constants";

export interface PillTagProps {
  label: string;
  icon?: ReactNode;
  // Slide-in direction; default "left" matches SHORT / SIMPLE pills.
  from?: "left" | "right";
  // Width the pill should size to; auto by default.
  width?: number | "auto";
}

// Devin 1 pill tag — reusable black rounded pill with uppercase label + optional icon.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0056.jpg (SHORT + SIMPLE)
//            _audit/Devin Jahod/Devin 1/frames/f_0264.jpg (LESS TIME + LESS EFFORT)
export function PillTag({ label, icon, from = "left", width = "auto" }: PillTagProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slide = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.85 },
    durationInFrames: 12,
  });

  const offsetX = interpolate(slide, [0, 1], [from === "left" ? -480 : 480, 0]);
  const opacity = interpolate(slide, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 36px",
        borderRadius: 999,
        backgroundColor: DEVIN1.colors.cardSurface,
        border: `1px solid ${DEVIN1.colors.cardBorder}`,
        boxShadow: `0 22px 48px rgba(0,0,0,${DEVIN1.card.shadowOpacity})`,
        color: DEVIN1.colors.textPrimary,
        fontFamily: DEVIN1.fonts.emphasis,
        fontSize: 52,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        width,
        transform: `translateX(${offsetX}px)`,
        opacity,
      }}
    >
      <span>{label}</span>
      {icon ? <span style={{ display: "inline-flex" }}>{icon}</span> : null}
    </div>
  );
}
