import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DEVIN1 } from "../constants";

export interface ProfileCardProps {
  name: string;
  followers: string;
  verified?: boolean;
}

// Devin 1 profile card — dark rounded pill with bold name + verified tick + follower subtext.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0001.jpg
export function ProfileCard({ name, followers, verified = true }: ProfileCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-in from left with snappy spring bounce.
  const pop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
    durationInFrames: 12,
  });

  const translateX = interpolate(pop, [0, 1], [-520, 0]);
  const scale = interpolate(pop, [0, 1], [0.94, 1]);
  const opacity = interpolate(pop, [0, 0.6, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "42%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          padding: "18px 30px",
          borderRadius: DEVIN1.card.borderRadius,
          backgroundColor: DEVIN1.colors.cardSurface,
          border: `1px solid ${DEVIN1.colors.cardBorder}`,
          boxShadow: `0 22px 48px rgba(0,0,0,${DEVIN1.card.shadowOpacity})`,
          color: DEVIN1.colors.textPrimary,
          fontFamily: DEVIN1.fonts.ui,
          backdropFilter: `blur(${DEVIN1.card.backdropBlur}px)`,
          transform: `translateX(${translateX}px) scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          <span>{name}</span>
          {verified ? <VerifiedTick /> : null}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
            marginTop: 2,
          }}
        >
          {followers}
        </div>
      </div>
    </div>
  );
}

function VerifiedTick() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 1.5L14.3 3.4L17.3 2.9L18.5 5.7L21.2 6.9L20.7 9.9L22.5 12.2L20.7 14.5L21.2 17.5L18.5 18.7L17.3 21.5L14.3 21L12 22.9L9.7 21L6.7 21.5L5.5 18.7L2.8 17.5L3.3 14.5L1.5 12.2L3.3 9.9L2.8 6.9L5.5 5.7L6.7 2.9L9.7 3.4L12 1.5Z"
        fill="#4A90E2"
      />
      <path d="M8.5 12.5L11 15L16 9.5" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
