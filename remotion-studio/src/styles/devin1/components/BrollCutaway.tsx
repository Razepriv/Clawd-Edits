import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

type TransitionKind = "fade" | "slide_up" | "slide_down" | "scale" | "none";

export interface BrollCutawayProps {
  src: string;
  enter: TransitionKind;
  exit: TransitionKind;
  enterDuration: number; // seconds
  exitDuration: number; // seconds
  label?: string;
  // Total sequence duration; used to compute exit timing.
  totalDuration: number; // seconds
}

// Full-frame B-roll cutaway — plays a platform recording on top of the avatar
// video, entering and exiting with a chosen transition and optional label.
export function BrollCutaway({
  src,
  enter,
  exit,
  enterDuration,
  exitDuration,
  label,
  totalDuration,
}: BrollCutawayProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const totalFrames = Math.round(totalDuration * fps);
  const enterFrames = Math.round(enterDuration * fps);
  const exitFrames = Math.round(exitDuration * fps);

  const enterProgress = interpolate(frame, [0, enterFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitProgress = interpolate(frame, [totalFrames - exitFrames, totalFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibility = Math.min(enterProgress, exitProgress);

  const { transform, opacity } = computeTransition(enter, exit, enterProgress, exitProgress, visibility);

  const resolvedSrc = src.startsWith("http") || src.startsWith("file:") ? src : staticFile(src);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform,
          opacity,
          overflow: "hidden",
          backgroundColor: brand.colors.background,
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

        {label ? (
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                padding: "14px 32px",
                borderRadius: 999,
                backgroundColor: "rgba(20,20,25,0.82)",
                color: brand.colors.textPrimary,
                fontFamily: brand.fonts.emphasis,
                fontSize: 44,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                backdropFilter: "blur(12px)",
                boxShadow: `0 16px 36px rgba(0,0,0,0.4)`,
              }}
            >
              {label}
            </span>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}

function computeTransition(
  enter: TransitionKind,
  exit: TransitionKind,
  enterProgress: number,
  exitProgress: number,
  visibility: number,
): { transform: string; opacity: number } {
  // Enter contributions
  let enterX = 0, enterY = 0, enterScale = 1, enterOpacity = 1;
  if (enter === "slide_up") enterY = (1 - enterProgress) * 200;
  else if (enter === "slide_down") enterY = (1 - enterProgress) * -200;
  else if (enter === "scale") enterScale = interpolate(enterProgress, [0, 1], [0.9, 1]);
  if (enter === "fade") enterOpacity = enterProgress;

  // Exit contributions
  let exitX = 0, exitY = 0, exitScale = 1, exitOpacity = 1;
  if (exit === "slide_up") exitY = (1 - exitProgress) * -200;
  else if (exit === "slide_down") exitY = (1 - exitProgress) * 200;
  else if (exit === "scale") exitScale = interpolate(exitProgress, [0, 1], [0.9, 1]);
  if (exit === "fade") exitOpacity = exitProgress;

  const tx = enterX + exitX;
  const ty = enterY + exitY;
  const scale = enterScale * exitScale;
  const op = enterOpacity * exitOpacity * (visibility > 0 ? 1 : 0);

  return {
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    opacity: op,
  };
}
