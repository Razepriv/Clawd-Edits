import { OffthreadVideo, staticFile } from "remotion";

type BlendMode = "screen" | "add" | "lighten" | "multiply" | "normal";

export interface OverlayVideoProps {
  src: string;
  blendMode?: BlendMode;
  opacity?: number;
  scale?: number;
}

// Generic blend-mode overlay. Intended for light leaks, shockwaves, grain,
// particle bursts — any video with a black background whose bright pixels
// should be composited on top of the base. CSS mix-blend-mode does the
// keying at render time (screen = max(base, overlay), which drops pure
// black from the overlay and keeps only the luminous content).
export function OverlayVideo({ src, blendMode = "screen", opacity = 1, scale = 1 }: OverlayVideoProps) {
  const resolved = src.startsWith("http") || src.startsWith("file:") ? src : staticFile(src);
  // CSS mix-blend-mode names differ slightly from our enum
  const cssBlend: React.CSSProperties["mixBlendMode"] =
    blendMode === "add" ? "color-dodge" : (blendMode as React.CSSProperties["mixBlendMode"]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        mixBlendMode: cssBlend,
        opacity,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <OffthreadVideo
        src={resolved}
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}
