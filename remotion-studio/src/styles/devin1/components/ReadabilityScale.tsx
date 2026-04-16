import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface ReadabilityScaleProps {
  // Final position on the 1–10 scale (inclusive). Scale animates pointer to this value.
  targetPosition: number;
  // When the pointer settles, dots above this value fade out (threshold marker).
  fadeAbove?: number;
  label?: string;
}

// Devin 1 readability scale — italic label + 10 colored dots (green→red)
// + white triangle pointer. Animates pointer from left to targetPosition,
// then fades dots above fadeAbove.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0208.jpg, f_0216.jpg
export function ReadabilityScale({
  targetPosition,
  fadeAbove,
  label = "Readability",
}: ReadabilityScaleProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const totalDots = 10;
  // 0-based target index for SVG math.
  const targetIdx = Math.max(1, Math.min(totalDots, targetPosition)) - 1;

  // Pointer slides in from left (index 0) to targetIdx over 18 frames.
  const pointerSpring = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 110, mass: 0.9 },
    durationInFrames: 18,
  });
  const pointerIdx = interpolate(pointerSpring, [0, 1], [0, targetIdx]);

  // Dots above fadeAbove fade out after pointer settles (frames 24+).
  const fadeProgress = interpolate(frame, [24, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const width = 780;
  const leftMargin = 40;
  const rightMargin = 40;
  const usable = width - leftMargin - rightMargin;
  const step = usable / (totalDots - 1);

  // Dot color from green → yellow → orange → red.
  const dotColor = (i: number): string => {
    const palette = ["#27E25A", "#27E25A", "#27E25A", "#27E25A", "#C6E226", "#E2C126", "#E2A126", "#E27F26", "#E24F26", "#E22626"];
    return palette[i] ?? "#E22626";
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "45%",
        pointerEvents: "none",
      }}
    >
      <svg width={width} height={180} style={{ overflow: "visible" }}>
        {/* "Readability" handwritten label */}
        <text
          x={leftMargin}
          y={46}
          fontFamily={brand.fonts.handwritten}
          fontSize={56}
          fontWeight={600}
          fill={brand.colors.textPrimary}
        >
          {label}
        </text>

        {/* Horizontal rule */}
        <line
          x1={leftMargin}
          y1={108}
          x2={width - rightMargin}
          y2={108}
          stroke={brand.colors.textPrimary}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Dots + numeric labels */}
        {Array.from({ length: totalDots }, (_, i) => {
          const cx = leftMargin + i * step;
          const isFading = fadeAbove !== undefined && i + 1 > fadeAbove;
          const dotOpacity = isFading ? 1 - fadeProgress : 1;
          const labelOpacity = isFading ? 1 - fadeProgress : 0.9;
          return (
            <g key={i} opacity={dotOpacity}>
              <circle cx={cx} cy={108} r={18} fill={dotColor(i)} />
              <text
                x={cx}
                y={160}
                fontFamily={brand.fonts.handwritten}
                fontSize={36}
                fill={brand.colors.textPrimary}
                fillOpacity={labelOpacity}
                textAnchor="middle"
              >
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Pointer — white downward triangle above the scale */}
        <polygon
          points={`0,-22 22,-50 -22,-50`}
          fill={brand.colors.textPrimary}
          transform={`translate(${leftMargin + pointerIdx * step}, 108)`}
        />
      </svg>
    </div>
  );
}
