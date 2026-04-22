import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyMoneyFlowProps {
  amount: string;
  label: string;
  sub?: string;
  yPercent?: number;
}

const COIN_COUNT = 14;

// Animated rupee-coin stream dropping into a "RENT RECEIVED" receipt
// card. Used behind the "sirf rent receive karna" beat. Below-chin
// position so the speaker stays fully visible.
export function CohousyMoneyFlow({
  amount,
  label,
  sub,
  yPercent = 56,
}: CohousyMoneyFlowProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardRise = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 210, mass: 0.7 },
    durationInFrames: 10,
  });
  const cardOpacity = interpolate(cardRise, [0, 0.5, 1], [0, 1, 1]);
  const cardTy = interpolate(cardRise, [0, 1], [40, 0]);

  // Coins fall in a loop, respawning after reaching the receipt
  const coins = Array.from({ length: COIN_COUNT }, (_, i) => {
    const seed = i * 17 + 3;
    const xPct = (seed % 80) + 10; // 10-90%
    const phase = (seed * 7) % 60; // offset in frames
    const cycle = 90; // frames to fall
    const cf = (frame + phase) % cycle;
    const fall = cf / cycle;
    const topPct = -8 + fall * 65; // from above to landing zone
    const op = interpolate(fall, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
    const rot = (cf * 7) % 360;
    return { xPct, topPct, op, rot, key: i };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: `${yPercent}%`,
        pointerEvents: "none",
      }}
    >
      {/* Coin stream */}
      <div style={{ position: "absolute", inset: 0 }}>
        {coins.map((c) => (
          <div
            key={c.key}
            style={{
              position: "absolute",
              left: `${c.xPct}%`,
              top: `${c.topPct}%`,
              width: 52,
              height: 52,
              borderRadius: 26,
              background: `radial-gradient(circle at 35% 30%, ${COHOUSY_EXTRA.orange200}, ${COHOUSY_EXTRA.orange500} 55%, ${COHOUSY_EXTRA.orange700} 100%)`,
              boxShadow: `0 6px 16px rgba(255,128,2,0.5), inset 0 -3px 6px rgba(197,60,0,0.6)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${c.rot}deg)`,
              opacity: c.op,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 30,
              color: "#0F0A06",
              fontWeight: 900,
            }}
          >
            ₹
          </div>
        ))}
      </div>
      {/* Receipt card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "18%",
          marginLeft: "auto",
          marginRight: "auto",
          width: 760,
          background: "#FFFFFF",
          borderRadius: 22,
          padding: "28px 36px",
          boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,128,2,0.25)`,
          opacity: cardOpacity,
          transform: `translateY(${cardTy}px)`,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 22,
              letterSpacing: "0.14em",
              color: COHOUSY_EXTRA.orange700,
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(42,230,110,0.15)",
              color: "#16A34A",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            ● CREDITED
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 120,
            lineHeight: 1,
            color: COHOUSY_EXTRA.ink,
            letterSpacing: "-0.02em",
          }}
        >
          {amount}
        </div>
        {sub ? (
          <div
            style={{
              marginTop: 10,
              fontSize: 22,
              color: "#6B6259",
              fontWeight: 600,
            }}
          >
            {sub}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 18,
            height: 2,
            background: `repeating-linear-gradient(90deg, #E5D9CA, #E5D9CA 6px, transparent 6px, transparent 12px)`,
          }}
        />
      </div>
    </div>
  );
}
