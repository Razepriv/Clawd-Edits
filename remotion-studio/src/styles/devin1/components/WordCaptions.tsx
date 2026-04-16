import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface TranscriptWord {
  start: number; // seconds (absolute)
  end: number;
  word: string;
}

export interface WordCaptionsProps {
  words: ReadonlyArray<TranscriptWord>;
  // Absolute start of this Sequence in the avatar timeline (seconds).
  // Required so we can translate frame → absolute time.
  t_start: number;
  // Number of words to show on screen at once. Default 3 — active word
  // plus 1 word on each side for readability.
  windowSize?: number;
  // Optional position override (default mid-lower).
  yPercent?: number;
}

// Submagic-style word-highlight captions: 2-3 words visible at once, current
// word pops with brand-red accent + subtle scale. Drives from Whisper
// word-level timestamps.
export function WordCaptions({
  words,
  t_start,
  windowSize = 3,
  yPercent = 70,
}: WordCaptionsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const nowSec = t_start + frame / fps;

  // Find the currently spoken word (STRICT: only within [start, end]).
  // Caption hides in silences — no upcoming/past words to avoid perceived
  // "duplication". If windowSize>1, the current word is padded with
  // adjacent words but still only within the full words array.
  let activeIdx = -1;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (nowSec >= w.start && nowSec < w.end) {
      activeIdx = i;
      break;
    }
  }

  if (activeIdx < 0) {
    // No word currently being spoken → render nothing.
    return null;
  }

  // Sliding window around the active word. windowSize=1 → just the active word.
  const half = Math.floor(windowSize / 2);
  const startIdx = Math.max(0, activeIdx - half);
  const endIdx = Math.min(words.length, startIdx + windowSize);
  const visible = words.slice(startIdx, endIdx);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${yPercent}%`,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          flexWrap: "wrap",
          maxWidth: "90%",
          padding: "0 40px",
        }}
      >
        {visible.map((word, i) => {
          const isActive = startIdx + i === activeIdx;
          const spokenAlready = nowSec >= word.end;
          return (
            <CaptionWord
              key={`${word.start}-${word.word}`}
              word={word}
              isActive={isActive}
              spokenAlready={spokenAlready}
              fps={fps}
              nowSec={nowSec}
              brandAccent={brand.colors.accent}
              brandAccentBright={brand.colors.accentBright}
              brandPrimary={brand.colors.textPrimary}
              brandSecondary={brand.colors.textSecondary}
              emphasisFont={brand.fonts.emphasis}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CaptionWordProps {
  word: TranscriptWord;
  isActive: boolean;
  spokenAlready: boolean;
  fps: number;
  nowSec: number;
  brandAccent: string;
  brandAccentBright: string;
  brandPrimary: string;
  brandSecondary: string;
  emphasisFont: string;
}

function CaptionWord({
  word,
  isActive,
  spokenAlready,
  fps,
  nowSec,
  brandAccent,
  brandAccentBright,
  brandPrimary,
  brandSecondary,
  emphasisFont,
}: CaptionWordProps) {
  // Snappy pop-in on the word's start. Settles quickly so the caption
  // feels locked to the word boundary, not floating.
  const pop = isActive
    ? spring({
        frame: Math.round((nowSec - word.start) * fps),
        fps,
        config: { damping: 14, stiffness: 220, mass: 0.7 },
        durationInFrames: 5,
      })
    : 1;
  const scale = isActive ? interpolate(pop, [0, 1], [0.88, 1]) : 1;
  const opacity = isActive ? interpolate(pop, [0, 1], [0, 1]) : 0.75;

  // Active word = brand red; inactive = white.
  const color = isActive ? brandAccentBright : brandPrimary;

  return (
    <span
      style={{
        fontFamily: emphasisFont,
        fontSize: 108,
        lineHeight: 1.02,
        letterSpacing: "-0.01em",
        color,
        textTransform: "uppercase",
        WebkitTextStroke: "1.5px rgba(0,0,0,0.7)",
        textShadow: "0 4px 12px rgba(0,0,0,0.85)",
        transform: `scale(${scale})`,
        opacity,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {word.word.trim()}
    </span>
  );
}
