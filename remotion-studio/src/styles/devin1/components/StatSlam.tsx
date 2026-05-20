import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface StatSlamProps {
  // The big animated number — supports plain integers (e.g. 96) or numeric
  // strings ("100%", "3M"). When a number is provided alongside `endValue`,
  // we animate a counter from `value` → `endValue` over the duration.
  value: number;
  // Optional end value — when set, we animate value → endValue with an
  // ease-out curve. Use this for "96 → 0" wind-downs.
  endValue?: number;
  // Suffix appended to the displayed value, e.g. "%".
  suffix?: string;
  // Label below the number (uppercase, smaller).
  label: string;
  // Optional sub-line under the label (sentence case, dimmer).
  sub?: string;
  // Y position (% of canvas height) for the TOP edge. Default 26 % so the
  // slam sits in the TOP zone of a LandscapeSplitFrame layout.
  yPercent?: number;
  // Override the gradient — defaults to faux.thinker red.
  gradientStart?: string;
  gradientEnd?: string;
  // How many frames to take the counter animation. Default 60 (~2.4s at 25fps).
  counterFrames?: number;
}

// Big number slam — animated counter from value → endValue with a snappy
// spring entrance + orange/red underline sweep. Default colors are
// faux.thinker red. Sits in the TOP zone of the LandscapeSplitFrame
// layout so it stays well above the speaker.
export function StatSlam({
  value,
  endValue,
  suffix = "",
  label,
  sub,
  yPercent = 26,
  gradientStart,
  gradientEnd,
  counterFrames = 60,
}: StatSlamProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const gradStart = gradientStart ?? "#FF4D4D";
  const gradEnd = gradientEnd ?? brand.colors.accent;

  // Spring entrance over first 10 frames
  const rise = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 200, mass: 0.85 },
    durationInFrames: 10,
  });
  const opacity = interpolate(rise, [0, 0.4, 1], [0, 1, 1]);
  const scale = interpolate(rise, [0, 1], [0.86, 1]);
  const translateY = interpolate(rise, [0, 1], [54, 0]);

  // Counter animation — starts AFTER the spring lands so the number
  // feels deliberate. Begins at frame 12, lasts `counterFrames`.
  const COUNTER_START = 12;
  const animatedValue =
    endValue === undefined
      ? value
      : Math.round(
          interpolate(
            frame,
            [COUNTER_START, COUNTER_START + counterFrames],
            [value, endValue],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        );

  // Underline sweep — 0→1 over first 22 frames
  const underline = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: `${yPercent}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        pointerEvents: "none",
        fontFamily: "'Archivo Black', 'Bebas Neue', sans-serif",
        textAlign: "center",
        padding: "0 48px",
      }}
    >
      <span
        style={{
          fontSize: 260,
          lineHeight: 0.9,
          letterSpacing: "-0.025em",
          backgroundImage: `linear-gradient(180deg, ${gradStart} 0%, ${gradEnd} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 10px 24px rgba(233, 18, 18, 0.45))`,
        }}
      >
        {animatedValue}
        {suffix}
      </span>
      <span
        style={{
          marginTop: 8,
          height: 6,
          width: "56%",
          borderRadius: 6,
          backgroundColor: gradEnd,
          transform: `scaleX(${underline})`,
          transformOrigin: "left center",
          boxShadow: `0 0 28px ${gradEnd}`,
        }}
      />
      <span
        style={{
          marginTop: 18,
          fontSize: 48,
          letterSpacing: "0.08em",
          color: "#FFFFFF",
          textTransform: "uppercase",
          textShadow: "0 2px 18px rgba(0,0,0,0.7)",
        }}
      >
        {label}
      </span>
      {sub ? (
        <span
          style={{
            marginTop: 8,
            fontSize: 26,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.72)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
            textShadow: "0 1px 8px rgba(0,0,0,0.55)",
          }}
        >
          {sub}
        </span>
      ) : null}
    </div>
  );
}
