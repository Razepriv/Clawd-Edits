import { Img, staticFile, useCurrentFrame } from "remotion";

export interface MattedAvatarProps {
  patternPath: string; // e.g. "matted_avatar/mat_%04d.png"
  firstFrameNumber?: number;
  scale?: number; // 1 = full-frame, <1 = picture-in-picture
  xPercent?: number; // horizontal position (0–100), when scaled
  yPercent?: number; // vertical position (0–100), when scaled
}

// Plays a PNG alpha sequence synchronized to the enclosing Sequence frame 0.
// At frame N, displays pattern with (firstFrameNumber + N). When scale<1,
// anchors the avatar PiP-style at (xPercent, yPercent) — useful for
// showing platform UI behind while keeping presenter in corner.
export function MattedAvatar({
  patternPath,
  firstFrameNumber = 1,
  scale = 1,
  xPercent = 50,
  yPercent = 50,
}: MattedAvatarProps) {
  const frame = useCurrentFrame();
  const n = firstFrameNumber + frame;
  const padded = String(n).padStart(4, "0");
  const src = patternPath.replace("%04d", padded);

  if (scale >= 0.999) {
    return (
      <Img
        src={staticFile(src)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    );
  }

  const widthPercent = scale * 100;
  const heightPercent = scale * 100;
  // xPercent/yPercent interpreted as anchor point for the scaled element.
  const left = `calc(${xPercent}% - ${(widthPercent / 2)}%)`;
  const top = `calc(${yPercent}% - ${(heightPercent / 2)}%)`;
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left,
        top,
        width: `${widthPercent}%`,
        height: `${heightPercent}%`,
        objectFit: "cover",
        pointerEvents: "none",
        filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55))",
      }}
    />
  );
}
