import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface XHotTakeFlashcutProps {
  /**
   * Optional path to a real X/Twitter screenshot (relative to public/).
   * When provided, the component renders that image instead of the mock card.
   * Useful once you've captured actual X screenshots.
   */
  imageSrc?: string;
  /** Display name (used for mock card). */
  name?: string;
  /** Blurred handle (e.g. "@████___" — the component renders real handle text blurred via filter). */
  handle?: string;
  /** Whether handle should be blurred (default true per edit-plan brief). */
  blurHandle?: boolean;
  /** Body text of the take. */
  text?: string;
  /** Relative time label (e.g. "2h"). */
  timeLabel?: string;
  /** Like / retweet / reply counts for realism. */
  likes?: number;
  retweets?: number;
  replies?: number;
  /** Color of the avatar gradient (if no imageSrc). */
  avatarStart?: string;
  avatarEnd?: string;
  /** Card width. Default 820. */
  cardWidth?: number;
}

// Single X/Twitter-style hot-take card designed for flash-cutting. Three
// of these fire back-to-back in the edit plan (10-14 s). Card scales up
// from 0.9 → 1.0 with a tiny rotation wobble, holds, then fades out.
// Supports both a "drop in a real screenshot" mode (imageSrc prop) and a
// "render a realistic mock" mode when you don't have the screenshots yet.
export function XHotTakeFlashcut({
  imageSrc,
  name = "anon_dev",
  handle = "@████████",
  blurHandle = true,
  text = "Canva is DEAD. Claude Design just killed it overnight. 💀",
  timeLabel = "2h",
  likes = 1240,
  retweets = 312,
  replies = 87,
  avatarStart = "#1DA1F2",
  avatarEnd = "#14171A",
  cardWidth = 820,
}: XHotTakeFlashcutProps) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const brand = useBrand();

  const enter = spring({ frame, fps, config: { damping: 12, stiffness: 220, mass: 0.85 }, durationInFrames: 10 });
  const scale = interpolate(enter, [0, 1], [0.86, 1]);
  const opacityIn = interpolate(enter, [0, 0.5, 1], [0, 1, 1]);
  const tiltIn = interpolate(enter, [0, 1], [-3, 0]);

  // Fade out the last 6 frames so the flash-cut to the next take is clean.
  const opacityOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );
  const opacity = Math.min(opacityIn, opacityOut);

  const resolveSrc = (src: string): string =>
    src.startsWith("http") || src.startsWith("file:") || src.startsWith("data:") ? src : staticFile(src);

  const formatCount = (n: number): string =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
      }}
    >
      {imageSrc ? (
        // Real-screenshot mode
        <img
          src={resolveSrc(imageSrc)}
          alt=""
          style={{
            width: cardWidth,
            maxHeight: 1200,
            borderRadius: 22,
            border: `1px solid ${brand.colors.divider}`,
            boxShadow: `0 28px 58px ${brand.colors.shadow}`,
            transform: `scale(${scale}) rotate(${tiltIn}deg)`,
            filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.45))",
          }}
        />
      ) : (
        // Realistic mock mode
        <div
          style={{
            width: cardWidth,
            padding: 26,
            borderRadius: 22,
            backgroundColor: "#15202B", // X dark-mode background
            border: "1px solid #38444D",
            boxShadow: `0 28px 58px ${brand.colors.shadow}`,
            color: "#E7E9EA",
            fontFamily: "Chirp, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            transform: `scale(${scale}) rotate(${tiltIn}deg)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Head row: avatar + name + handle */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                background: `linear-gradient(135deg, ${avatarStart} 0%, ${avatarEnd} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "#E7E9EA" }}>{name}</span>
                <VerifiedBadge />
              </div>
              <span
                style={{
                  fontSize: 20,
                  color: "#71767B",
                  filter: blurHandle ? "blur(4px)" : "none",
                  letterSpacing: blurHandle ? "-0.05em" : 0,
                  userSelect: "none",
                }}
              >
                {handle} · {timeLabel}
              </span>
            </div>
            <DotsIcon />
          </div>

          {/* Body text */}
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#E7E9EA", whiteSpace: "pre-wrap" }}>
            {text}
          </div>

          {/* Engagement row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#71767B",
              fontSize: 18,
              paddingTop: 8,
              borderTop: "1px solid #283340",
            }}
          >
            <EngagementStat icon="💬" count={formatCount(replies)} />
            <EngagementStat icon="🔁" count={formatCount(retweets)} />
            <EngagementStat icon="♥" count={formatCount(likes)} color="#F91880" />
            <EngagementStat icon="📊" count={formatCount(likes * 8)} />
            <EngagementStat icon="🔖" count="" />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
}

function VerifiedBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.275.213-1.815.568s-.972.854-1.246 1.44c-.608-.223-1.264-.27-1.898-.14-.633.131-1.217.437-1.686.882-.445.47-.751 1.053-.882 1.687-.13.633-.083 1.29.14 1.897-.586.274-1.085.705-1.44 1.246-.354.54-.551 1.17-.568 1.816.017.647.213 1.276.568 1.817.355.54.854.972 1.44 1.245-.223.608-.27 1.264-.14 1.898.131.634.437 1.218.882 1.687.47.445 1.053.751 1.686.882.634.13 1.29.083 1.898-.14.274.586.705 1.085 1.246 1.44.54.354 1.17.551 1.815.568.647-.017 1.276-.214 1.817-.568.54-.355.972-.854 1.245-1.44.608.223 1.264.27 1.898.14.633-.131 1.217-.437 1.686-.882.445-.47.751-1.053.882-1.687.13-.634.083-1.29-.14-1.898.586-.273 1.085-.704 1.44-1.245.354-.541.551-1.17.568-1.817zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="#1D9BF0"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="5" cy="12" r="2" fill="#71767B" />
      <circle cx="12" cy="12" r="2" fill="#71767B" />
      <circle cx="19" cy="12" r="2" fill="#71767B" />
    </svg>
  );
}

interface EngagementStatProps {
  icon: string;
  count: string;
  color?: string;
}

function EngagementStat({ icon, count, color = "#71767B" }: EngagementStatProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, color }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      {count ? <span style={{ fontVariantNumeric: "tabular-nums" }}>{count}</span> : null}
    </div>
  );
}
