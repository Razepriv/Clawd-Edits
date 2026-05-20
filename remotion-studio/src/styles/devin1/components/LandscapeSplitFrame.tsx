import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface LandscapeSplitFrameProps {
  // Path to the 1920x1080 landscape avatar video (relative to public/).
  avatarSrc: string;
  // Top zone where overlays render. 0-1, fraction of canvas height.
  // Default 0.47 leaves 53% for the avatar band.
  splitRatio?: number;
  // Background color for the canvas above + below the avatar band.
  // Default = brand background (faux.thinker dark).
  bgColor?: string;
  // When true, draws a soft top + bottom vignette around the avatar band
  // so the seam feels intentional rather than a hard letterbox.
  softSeam?: boolean;
}

// LandscapeSplitFrame — base layer for landscape (1920x1080) source video
// composited into a 1080x1920 vertical canvas.
//
// Layout (default splitRatio = 0.47):
//   ┌──────────────────────────┐  y 0
//   │                          │
//   │   TOP ZONE  (47 %)       │  overlays/B-rolls/slams land here
//   │   = 902 px tall          │
//   │                          │
//   ├──────────────────────────┤  y 902 (splitY)
//   │                          │
//   │   AVATAR BAND (53 %)     │  1080 x 608 video, vertically centered
//   │   = 1018 px tall         │  inside this band
//   │                          │
//   └──────────────────────────┘  y 1920
//
// The avatar video itself is 1080x608 (16:9 fit to 1080 width). The band
// is 1018px tall, so the avatar sits with ~205px of dark padding above
// and below it — that's the "second bottom split" feel without dead
// letterbox bars. Subject's eye-line lands around y ≈ 70 % of canvas.
export function LandscapeSplitFrame({
  avatarSrc,
  splitRatio = 0.47,
  bgColor,
  softSeam = true,
}: LandscapeSplitFrameProps) {
  const brand = useBrand();
  const bg = bgColor ?? brand.colors.background;

  // 1920 x 1080 source → 1080 x 607.5 when scaled to canvas width
  const AVATAR_W = 1080;
  const AVATAR_H = 608;
  // Avatar band is everything below splitY (default 902 px → 1920)
  const splitY = Math.round(1920 * splitRatio);
  const bandH = 1920 - splitY;
  // Center the 608-tall avatar inside the band
  const avatarY = splitY + Math.round((bandH - AVATAR_H) / 2);

  const resolveSrc = (src: string) =>
    src.startsWith("http") || src.startsWith("file:") ? src : staticFile(src);

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      {/* Avatar landscape video, scaled to canvas width, centered in band */}
      <div
        style={{
          position: "absolute",
          top: avatarY,
          left: 0,
          width: AVATAR_W,
          height: AVATAR_H,
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={resolveSrc(avatarSrc)}
          muted={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Optional soft seam — vertical dark gradient above + below the avatar
          band, so the join feels intentional instead of letterbox-y. */}
      {softSeam ? (
        <>
          {/* Top seam — fades from full bg → transparent over 80 px */}
          <div
            style={{
              position: "absolute",
              top: avatarY - 80,
              left: 0,
              right: 0,
              height: 80,
              background: `linear-gradient(to bottom, ${bg} 0%, rgba(0,0,0,0) 100%)`,
              pointerEvents: "none",
            }}
          />
          {/* Bottom seam — fades from transparent → bg over 80 px */}
          <div
            style={{
              position: "absolute",
              top: avatarY + AVATAR_H,
              left: 0,
              right: 0,
              height: 80,
              background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${bg} 100%)`,
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}
    </AbsoluteFill>
  );
}
