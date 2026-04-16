import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface RevenueChartProps {
  label?: string;
  subLabel?: string;
  // Values count up to these numbers; baseline stays static as comparison.
  growthValue: number;
  baselineValue: number;
  axisLeft?: string;
  axisRight?: string;
  // Growth curve shape — "exponential" matches Devin 1's card.
  curve?: "exponential" | "linear";
  // Count-up duration (frames). Default 24 = 1 s at 24fps.
  countUpFrames?: number;
  // Prefix (e.g. "$") and suffix (e.g. "h", "+") for non-currency values.
  valuePrefix?: string;
  valueSuffix?: string;
  // When true, the (green) growth value renders on the RIGHT side of the card
  // and the (grey) baseline value on the LEFT. Use when the narrative reads
  // low→high left-to-right (e.g. "benchmark went from 58% to 70%"). Default
  // false preserves the v12 Devin-1 layout (growth on left).
  growthOnRight?: boolean;
}

// Devin 1 revenue card — counter animates up to growthValue in green,
// baselineValue shown static in grey, green line chart draws in along an
// exponential curve synced to the counter.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0012.jpg – f_0020.jpg
export function RevenueChart({
  label = "Average Revenue",
  subLabel = "per client",
  growthValue,
  baselineValue,
  axisLeft = "Apr 2024",
  axisRight = "Apr 2025",
  curve = "exponential",
  countUpFrames = 24,
  valuePrefix = "$",
  valueSuffix = "",
  growthOnRight = false,
}: RevenueChartProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const progress = interpolate(frame, [0, countUpFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card slides in from bottom with bounce.
  const entrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 170, mass: 0.85 },
    durationInFrames: 14,
  });
  const entranceY = interpolate(entrance, [0, 1], [220, 0]);
  const entranceOpacity = interpolate(entrance, [0, 0.6, 1], [0, 1, 1]);

  // Ease-out cubic — makes the counter decelerate, matching Devin 1's feel.
  const eased = 1 - Math.pow(1 - progress, 3);

  const growthDisplay = Math.round(growthValue * eased);
  const baselineDisplay = Math.round(baselineValue);

  const cardWidth = 880;
  const cardHeight = 320;
  const chartWidth = cardWidth - 96;
  const chartHeight = 120;

  // Build an exponential growth path that reaches `eased` fraction of the full curve.
  const path = useCurveDPath(chartWidth, chartHeight, eased, curve);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "22%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: cardWidth,
          minHeight: cardHeight,
          padding: 32,
          borderRadius: 28,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 28px 58px ${brand.colors.shadow}`,
          color: brand.colors.textPrimary,
          fontFamily: brand.fonts.ui,
          backdropFilter: "blur(22px)",
          transform: `translateY(${entranceY}px)`,
          opacity: entranceOpacity,
        }}
      >
        {/* Header row: label + sub-label pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 600 }}>
          <span style={{ opacity: 0.9 }}>{label}</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              padding: "5px 14px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.08)",
              color: brand.colors.textSecondary,
            }}
          >
            {subLabel}
          </span>
        </div>

        {/* Values row — order flips when growthOnRight so narrative reads low→high. */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 52, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
          {growthOnRight ? (
            <>
              <span style={{ color: brand.colors.textSecondary }}>{valuePrefix}{baselineDisplay.toLocaleString("en-US")}{valueSuffix}</span>
              <span style={{ color: brand.colors.growthGreen }}>{valuePrefix}{growthDisplay.toLocaleString("en-US")}{valueSuffix}</span>
            </>
          ) : (
            <>
              <span style={{ color: brand.colors.growthGreen }}>{valuePrefix}{growthDisplay.toLocaleString("en-US")}{valueSuffix}</span>
              <span style={{ color: brand.colors.textSecondary }}>{valuePrefix}{baselineDisplay.toLocaleString("en-US")}{valueSuffix}</span>
            </>
          )}
        </div>

        {/* Chart */}
        <svg width={chartWidth} height={chartHeight} style={{ marginTop: 18, overflow: "visible" }}>
          {/* Baseline (grey flat line) */}
          <line
            x1={0}
            y1={chartHeight - 4}
            x2={chartWidth}
            y2={chartHeight - 4}
            stroke={brand.colors.textSecondary}
            strokeOpacity={0.4}
            strokeWidth={2}
          />
          {/* Growth curve — dynamically trimmed to the eased progress */}
          <path d={path} stroke={brand.colors.growthGreen} strokeWidth={5} fill="none" strokeLinecap="round" />
        </svg>

        {/* Axis labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 22, color: brand.colors.textSecondary }}>
          <span>{axisLeft}</span>
          <span>{axisRight}</span>
        </div>
      </div>
    </div>
  );
}

function useCurveDPath(w: number, h: number, progress: number, curve: "exponential" | "linear"): string {
  if (progress <= 0) return `M 0 ${h}`;
  const steps = 24;
  const stops: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * progress;
    const x = t * w;
    const yNorm = curve === "exponential" ? Math.pow(t, 2.5) : t;
    const y = h - yNorm * h;
    stops.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return stops.join(" ");
}
