import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyBigStatProps {
  value: string;
  label: string;
  sub?: string;
  yPercent?: number;
}

// Giant stat slam with orange gradient number + orange underline sweep.
// Default positioning: below chin (y 62 %) so it never covers the face.
// Used for the "30+ FLATS / 98% OCCUPANCY / 100% ON-TIME RENT" trio.
export function CohousyBigStat({
  value,
  label,
  sub,
  yPercent = 62,
}: CohousyBigStatProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 210, mass: 0.8 },
    durationInFrames: 10,
  });
  const opacity = interpolate(rise, [0, 0.4, 1], [0, 1, 1]);
  const scale = interpolate(rise, [0, 1], [0.88, 1]);
  const translateY = interpolate(rise, [0, 1], [60, 0]);

  // Underline sweep animates from 0 → 100% over the first ~18 frames
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
          fontSize: 280,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          backgroundImage: `linear-gradient(180deg, ${COHOUSY_EXTRA.orange300} 0%, ${COHOUSY_EXTRA.orange500} 55%, ${COHOUSY_EXTRA.orange700} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 10px 24px rgba(255, 128, 2, 0.35))",
        }}
      >
        {value}
      </span>
      <span
        style={{
          marginTop: 8,
          height: 6,
          width: "58%",
          borderRadius: 6,
          backgroundColor: COHOUSY_EXTRA.orange500,
          transform: `scaleX(${underline})`,
          transformOrigin: "left center",
          boxShadow: `0 0 28px ${COHOUSY_EXTRA.orange500}`,
        }}
      />
      <span
        style={{
          marginTop: 20,
          fontSize: 54,
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
            marginTop: 10,
            fontSize: 32,
            letterSpacing: "0.04em",
            color: COHOUSY_EXTRA.orange200,
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
