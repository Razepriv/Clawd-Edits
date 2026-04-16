import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface FactoidCardProps {
  // Pass a single string, and wrap the key phrase in {{ }}.
  // Example: "The average reading level in the U.S. is around {{7th-grade level}}."
  text: string;
}

// Devin 1 factoid card — dark rounded info tooltip with a blue selection
// highlight on the key phrase, like a browser mouse-selection.
// Reference: _audit/Devin Jahod/Devin 1/frames/f_0224.jpg
export function FactoidCard({ text }: FactoidCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.85 },
    durationInFrames: 14,
  });
  const opacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);
  const translateY = interpolate(entrance, [0, 1], [100, 0]);

  // Split text into parts, highlighting anything wrapped in {{ }}.
  const parts: { text: string; highlight: boolean }[] = [];
  const regex = /\{\{([^}]+)\}\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index), highlight: false });
    parts.push({ text: match[1], highlight: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), highlight: false });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 860,
          padding: "34px 40px",
          borderRadius: 26,
          backgroundColor: brand.colors.surface,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 26px 56px ${brand.colors.shadow}`,
          color: brand.colors.textPrimary,
          fontFamily: brand.fonts.ui,
          fontSize: 38,
          lineHeight: 1.28,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          opacity,
          transform: `translateY(${translateY}px)`,
          backdropFilter: "blur(24px)",
        }}
      >
        {parts.map((p, i) =>
          p.highlight ? (
            <span
              key={i}
              style={{
                backgroundColor: brand.colors.link,
                color: brand.colors.textPrimary,
                padding: "0 6px",
                borderRadius: 4,
                boxDecorationBreak: "clone",
              }}
            >
              {p.text}
            </span>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </div>
    </div>
  );
}
