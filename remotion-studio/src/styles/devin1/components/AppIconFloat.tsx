import { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface AppIconFloatProps {
  icon: ReactNode; // SVG / img element
  backgroundColor?: string;
  size?: number;
}

// Devin 1 app-icon float — rounded-square icon on iOS-like surface,
// center-anchored with a subtle vertical bob + drop shadow.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0064.jpg (VidYard)
//            _audit/Devin Jahod/Devin 1/frames/f_0168.jpg (Hemingway)
export function AppIconFloat({ icon, backgroundColor, size = 340 }: AppIconFloatProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  // Entrance: scale up + opacity in.
  const entrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.8 },
    durationInFrames: 14,
  });
  const entranceScale = interpolate(entrance, [0, 1], [0.78, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Continuous bob after entrance settles.
  const bob = Math.sin((frame / fps) * Math.PI * 0.9) * 10;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.23,
          backgroundColor: backgroundColor ?? brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 40px 80px ${brand.colors.shadow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${bob}px) scale(${entranceScale})`,
          opacity,
        }}
      >
        {icon}
      </div>
    </div>
  );
}
