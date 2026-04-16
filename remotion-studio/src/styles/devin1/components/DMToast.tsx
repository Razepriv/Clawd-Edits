import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface DMToastProps {
  username: string;
  message: string;
  timeLabel?: string;
  // Optional avatar url (png/svg). If omitted, renders an IG-gradient circle.
  avatarSrc?: string;
}

// Devin 1 Instagram-style DM toast — slides up from below, shows IG logo,
// username, "now" timestamp, and message line. Used as the CTA payoff.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0278.jpg
export function DMToast({ username, message, timeLabel = "now", avatarSrc }: DMToastProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  // Slide up from bottom with bounce (iOS notification vibe).
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.9 },
    durationInFrames: 16,
  });
  const opacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);
  const translateY = interpolate(entrance, [0, 1], [160, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "48%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "22px 28px 22px 22px",
          borderRadius: 26,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 22px 48px ${brand.colors.shadow}`,
          color: brand.colors.textPrimary,
          fontFamily: brand.fonts.ui,
          minWidth: 780,
          opacity,
          transform: `translateY(${translateY}px)`,
          backdropFilter: "blur(22px)",
        }}
      >
        {/* Instagram logo / avatar circle */}
        <InstagramIcon size={58} />

        {/* Text column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>{username}</span>
            <span style={{ fontSize: 20, color: brand.colors.textSecondary }}>{timeLabel}</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, color: brand.colors.textPrimary, opacity: 0.92 }}>{message}</div>
        </div>

        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt=""
            style={{ width: 52, height: 52, borderRadius: 12, marginLeft: 8 }}
          />
        ) : null}
      </div>
    </div>
  );
}

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEDA77" />
          <stop offset="30%" stopColor="#F58529" />
          <stop offset="60%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect x={2} y={2} width={60} height={60} rx={16} fill="url(#ig-grad)" />
      <rect x={12} y={12} width={40} height={40} rx={11} fill="none" stroke="white" strokeWidth={3} />
      <circle cx={32} cy={32} r={9} fill="none" stroke="white" strokeWidth={3} />
      <circle cx={46} cy={18} r={2.6} fill="white" />
    </svg>
  );
}
