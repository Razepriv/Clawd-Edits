import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface URLPillProps {
  url: string;
  // Frames per typed character (default ~1 at 24fps = crisp typing).
  framesPerChar?: number;
  // Show blinking cursor after typing completes.
  showCursor?: boolean;
}

// Devin 1 URL pill — dark rounded pill, URL types in character-by-character
// with a blinking text cursor, then holds.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0080.jpg (vidyard.com/script-tim|)
//            _audit/Devin Jahod/Devin 1/frames/f_0168.jpg (hemingway|)
export function URLPill({ url, framesPerChar = 1, showCursor = true }: URLPillProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const typedChars = Math.min(Math.floor(frame / framesPerChar), url.length);
  const typedText = url.slice(0, typedChars);
  const doneTyping = typedChars >= url.length;

  // Cursor blinks at 2Hz once typing completes.
  const cursorVisible = doneTyping
    ? Math.floor(frame / (fps / 2)) % 2 === 0
    : true;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.85 },
    durationInFrames: 12,
  });
  const opacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const translateY = interpolate(entrance, [0, 1], [80, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "55%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "22px 44px",
          borderRadius: 999,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 22px 48px ${brand.colors.shadow}`,
          color: brand.colors.textPrimary,
          fontFamily: brand.fonts.ui,
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          backdropFilter: "blur(20px)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{typedText}</span>
        {showCursor ? (
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: "0.9em",
              marginLeft: 2,
              backgroundColor: brand.colors.textPrimary,
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
