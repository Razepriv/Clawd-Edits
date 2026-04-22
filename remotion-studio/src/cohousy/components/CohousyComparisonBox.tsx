import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyComparisonBoxProps {
  leftLabel: string;
  leftTag: string;
  leftBullets: string[];
  rightLabel: string;
  rightTag: string;
  rightBullets: string[];
  yPercent?: number;
}

// Side-by-side "BROKER × vs ✓ SYSTEM" card. Left side renders in dull grey
// with an X mark; right side in brand orange with a check. Animates in
// with a staggered reveal (left first, then right wipe-in from right).
export function CohousyComparisonBox({
  leftLabel,
  leftTag,
  leftBullets,
  rightLabel,
  rightTag,
  rightBullets,
  yPercent = 48,
}: CohousyComparisonBoxProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterLeft = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 200, mass: 0.9 },
    durationInFrames: 10,
  });
  const enterRight = spring({
    frame: frame - 6,
    fps,
    config: { damping: 16, stiffness: 200, mass: 0.9 },
    durationInFrames: 10,
  });

  const leftOpacity = interpolate(enterLeft, [0, 0.5, 1], [0, 1, 1]);
  const leftX = interpolate(enterLeft, [0, 1], [-60, 0]);
  const rightOpacity = interpolate(enterRight, [0, 0.5, 1], [0, 1, 1]);
  const rightX = interpolate(enterRight, [0, 1], [60, 0]);

  const col = (
    highlight: boolean,
    label: string,
    tag: string,
    bullets: string[],
    opacity: number,
    translateX: number,
  ) => (
    <div
      style={{
        flex: 1,
        background: highlight
          ? `linear-gradient(160deg, rgba(255,128,2,0.15), rgba(254,110,0,0.05))`
          : "rgba(30, 20, 12, 0.72)",
        border: `2px solid ${highlight ? COHOUSY_EXTRA.orange500 : "rgba(255,255,255,0.18)"}`,
        borderRadius: 24,
        padding: "22px 24px 26px",
        opacity,
        transform: `translateX(${translateX}px)`,
        boxShadow: highlight
          ? `0 14px 40px rgba(255,128,2,0.35)`
          : `0 8px 24px rgba(0,0,0,0.45)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 42,
            letterSpacing: "0.06em",
            color: highlight ? COHOUSY_EXTRA.orange500 : "#B6AFA6",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: highlight ? COHOUSY_EXTRA.orange500 : "rgba(255,255,255,0.08)",
            color: highlight ? "#0F0A06" : "#8E877F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 36,
          }}
        >
          {highlight ? "✓" : "✕"}
        </span>
      </div>
      <span
        style={{
          display: "inline-block",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.12em",
          color: highlight ? "#FFFFFF" : "#C5BDB3",
          textTransform: "uppercase",
          background: highlight ? "rgba(255,128,2,0.2)" : "rgba(255,255,255,0.06)",
          padding: "6px 12px",
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        {tag}
      </span>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 26,
              color: highlight ? "#FFFFFF" : "#9A938A",
              lineHeight: 1.35,
              marginBottom: 8,
              paddingLeft: 18,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 12,
                width: 8,
                height: 8,
                borderRadius: 4,
                background: highlight ? COHOUSY_EXTRA.orange500 : "#5A5249",
              }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );

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
        pointerEvents: "none",
        padding: "0 38px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          gap: 18,
          alignItems: "stretch",
        }}
      >
        {col(false, leftLabel, leftTag, leftBullets, leftOpacity, leftX)}
        {col(true, rightLabel, rightTag, rightBullets, rightOpacity, rightX)}
      </div>
    </div>
  );
}
