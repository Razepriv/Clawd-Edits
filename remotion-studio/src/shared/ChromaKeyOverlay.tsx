import { OffthreadVideo, staticFile } from "remotion";

export interface ChromaKeyOverlayProps {
  src: string;
  // If true or if src ends in .webm/.mov, render directly and trust the file's
  // embedded alpha channel. Otherwise apply an SVG feColorMatrix chroma key.
  alreadyKeyed?: boolean;
  keyColor?: string;
  similarity?: number;
  smoothness?: number;
  spill?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  opacity?: number;
}

// ChromaKeyOverlay — renders a green-screen or alpha-enabled video over
// whatever is beneath. For .webm / .mov inputs we trust the baked-in alpha
// (produced by a pre-processing FFmpeg chromakey pass). For .mp4 green-
// screen inputs we apply an SVG color matrix that keys out the green channel.
//
// Recommended path for Veo 3 assets:
//   scripts/veo.py generates .mp4 with pure green backdrop
//   ffmpeg chromakey=0x00FF00:0.22:0.12, format=yuva420p, libvpx-vp9 → .webm
//   pass the .webm into this component
// That avoids all SVG-filter fragility at render time.
export function ChromaKeyOverlay({
  src,
  alreadyKeyed,
  keyColor = "#00FF00",
  similarity = 0.4,
  smoothness = 0.08,
  spill = 0.2,
  blendMode,
  opacity = 1,
}: ChromaKeyOverlayProps) {
  const resolvedSrc = src.startsWith("http") || src.startsWith("file:") ? src : staticFile(src);
  const isAlphaContainer =
    alreadyKeyed || /\.(webm|mov)$/i.test(src);

  if (isAlphaContainer) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity,
          mixBlendMode: blendMode,
        }}
      >
        <OffthreadVideo
          src={resolvedSrc}
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  // SVG feColorMatrix fallback for raw green-screen .mp4 inputs.
  const filterId = `chroma-${keyColor.replace("#", "")}-${Math.round(similarity * 100)}`;
  const { r, g, b } = hexToRgb01(keyColor);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            {/* alpha = (R + B) - 1.5G + 0.3 — keys out green-dominant pixels,
                preserves white/red/cyan artifacts from the glitch */}
            <feColorMatrix
              type="matrix"
              values={
                `1 0 0 0 0
                 0 1 0 0 0
                 0 0 1 0 0
                 1 -1.5 1 0 ${0.3 - (r + b - 1.5 * g)}`
              }
            />
            <feComponentTransfer>
              <feFuncA type="linear" slope={1 / Math.max(smoothness, 0.02)} intercept={0} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <OffthreadVideo
        src={resolvedSrc}
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `url(#${filterId})`,
        }}
      />

      {spill > 0 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(255,0,255,${spill * 0.03})`,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </div>
  );
}

function hexToRgb01(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return { r, g, b };
}
