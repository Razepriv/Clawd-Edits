import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyCTAFollowProps {
  headline: string;
  sub: string;
  handle?: string;
}

// Orange "FOLLOW FOR DETAILS →" CTA card with a subtle pulse arrow.
// Sits below the chin and hovers with a small float animation so it
// feels alive without being distracting.
export function CohousyCTAFollow({
  headline,
  sub,
  handle = "@cohousy",
}: CohousyCTAFollowProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200, mass: 0.8 },
    durationInFrames: 10,
  });
  const opacity = interpolate(rise, [0, 0.4, 1], [0, 1, 1]);
  const translateY = interpolate(rise, [0, 1], [60, 0]);

  // Slow float
  const floatY = Math.sin((frame - 10) / 14) * 6;
  // Arrow pulse
  const arrowPulse = 1 + 0.12 * Math.sin((frame - 5) / 6);

  return (
    <div
      style={{
        position: "absolute",
        top: "60%",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 48px",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${translateY + floatY}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          background: `linear-gradient(135deg, ${COHOUSY_EXTRA.orange500} 0%, ${COHOUSY_EXTRA.orange700} 100%)`,
          borderRadius: 32,
          padding: "28px 36px",
          boxShadow: `0 20px 58px rgba(255,128,2,0.45), 0 0 0 2px rgba(255,255,255,0.12)`,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.14em",
              color: "rgba(15,10,6,0.7)",
              textTransform: "uppercase",
            }}
          >
            {handle}
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 56,
              lineHeight: 1,
              color: "#0F0A06",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 26,
              color: "rgba(15,10,6,0.8)",
            }}
          >
            {sub}
          </div>
        </div>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            background: "#0F0A06",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${arrowPulse})`,
            boxShadow: `0 0 0 3px rgba(255,255,255,0.15)`,
          }}
        >
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke={COHOUSY_EXTRA.orange500}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
