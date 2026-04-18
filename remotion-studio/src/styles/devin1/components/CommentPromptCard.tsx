import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface CommentPromptCardProps {
  /** Username shown next to the avatar glyph. Default "faux.thinker". */
  username?: string;
  /** The prompt text shown as placeholder inside the comment box. */
  prompt: string;
  /** Label above the box (e.g. "COMMENT BELOW"). */
  header?: string;
}

// Instagram-style comment prompt card — alternative to DMToast when the CTA
// is an open comment question rather than a DM-gated delivery.
// Used for the beat-8 Codex CTA: "Drop the model you are sticking with."
// Animates in from bottom and shows a blinking cursor inside the prompt box.
export function CommentPromptCard({
  username = "faux.thinker",
  prompt,
  header = "COMMENT BELOW",
}: CommentPromptCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 900;

  const entrance = spring({
    frame, fps,
    config: { damping: 18, stiffness: 180 },
    durationInFrames: 14,
  });
  const cardY       = interpolate(entrance, [0, 1], [180, 0]);
  const cardOpacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Typewriter: reveal the prompt one character every ~2 frames after the
  // card lands.
  const charStart = 10;
  const charsShown = Math.max(0, Math.floor((frame - charStart) / 2));
  const visiblePrompt = prompt.slice(0, Math.min(charsShown, prompt.length));
  const doneTyping = charsShown >= prompt.length;

  // Blinking cursor.
  const cursorOn = Math.floor(frame / 12) % 2 === 0;

  return (
    <AbsoluteFill style={{
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      paddingBottom: "8%",
      pointerEvents: "none",
    }}>
      <div style={{
        width: cardWidth,
        padding: "22px 26px",
        borderRadius: 24,
        backgroundColor: brand.colors.surface,
        border: `1px solid ${brand.colors.divider}`,
        boxShadow: `0 28px 58px ${brand.colors.shadow}`,
        color: brand.colors.textPrimary,
        fontFamily: brand.fonts.ui,
        backdropFilter: "blur(22px)",
        transform: `translateY(${cardY}px)`,
        opacity: cardOpacity,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>
        {/* Header: COMMENT BELOW + speech bubble glyph */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: brand.fonts.emphasis,
            fontSize: 26,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: brand.colors.textSecondary,
          }}>
            {header}
          </span>
          <SpeechBubbleIcon color={brand.colors.accent} />
        </div>

        {/* User row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 26,
            background: `linear-gradient(135deg, ${brand.colors.accentBright}, ${brand.colors.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: brand.fonts.emphasis, fontSize: 26, color: "white",
          }}>
            {username.trim().charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: 26, fontWeight: 700 }}>{username}</span>
        </div>

        {/* Comment input box */}
        <div style={{
          padding: "18px 22px",
          borderRadius: 16,
          border: `1px solid ${brand.colors.divider}`,
          backgroundColor: "rgba(0,0,0,0.35)",
          fontSize: 28,
          color: doneTyping ? brand.colors.textPrimary : brand.colors.textSecondary,
          minHeight: 60,
          display: "flex", alignItems: "center",
        }}>
          <span>{visiblePrompt}</span>
          {cursorOn ? (
            <span style={{
              display: "inline-block", width: 3, height: 30,
              backgroundColor: brand.colors.accent, marginLeft: 3, verticalAlign: "middle",
            }}/>
          ) : null}
        </div>

        {/* "Post" button (decorative) */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
          <div style={{
            padding: "10px 24px",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${brand.colors.accentBright}, ${brand.colors.accent})`,
            color: "white",
            fontFamily: brand.fonts.emphasis, fontSize: 22, letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: doneTyping ? 1 : 0.55,
          }}>
            Post
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function SpeechBubbleIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        fill={color}
      />
    </svg>
  );
}
