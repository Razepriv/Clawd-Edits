import {
  AbsoluteFill,
  interpolate,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

type TransitionKind = "fade" | "slide_up" | "slide_down" | "scale" | "none";

export interface SplitStackBrollProps {
  brollSrc: string;
  avatarSrc: string;
  avatarStartSeconds: number;
  mattedPatternPath?: string;
  mattedFirstFrame?: number;
  label?: string;
  totalDuration: number;
  enter?: TransitionKind;
  exit?: TransitionKind;
  enterDuration?: number;
  exitDuration?: number;
  // Corrected-spec geometry.
  brollHeightPercent?: number; // kept for backward compat; ignored (B-roll is always 100%)
  avatarMargin?: number; // side-margin for the floating frame (pixels)
  avatarRadius?: number; // corner radius of floating frame
  // Vertical extent of the floating frame as percent of canvas height.
  frameTopPercent?: number; // default 68 — frame starts here (lower portion)
  frameBottomPercent?: number; // default 96 — frame ends here (leaves 4% bottom gap)
  // How far the head extends above the frame's top edge, as percent of canvas.
  headOvershootPercent?: number; // default 12 — the ONLY breakout point
}

// SplitStackBroll — corrected 3-layer edit per the canonical spec:
//
//   Layer 1 — Full-frame B-roll (the star of the edit). Covers 100% of
//             the canvas edge-to-edge. No dark base visible anywhere.
//
//   Layer 2 — Floating frame in the lower 30-35%. Has MANDATORY side
//             margins so it never touches the screen edges — this is
//             what sells it as a floating card rather than a split-screen
//             divider. Soft drop shadow for elevation.
//
//   Layer 3 — Masked subject. Body fully CONTAINED inside the floating
//             frame (left, right, bottom). Only the HEAD pops above the
//             frame's top edge — the one and only breakout point that
//             creates the 3D depth illusion.
export function SplitStackBroll({
  brollSrc,
  avatarSrc,
  avatarStartSeconds,
  mattedPatternPath,
  mattedFirstFrame = 1,
  label,
  totalDuration,
  enter = "fade",
  exit = "fade",
  enterDuration = 0.25,
  exitDuration = 0.25,
  brollHeightPercent: _unused,
  avatarMargin = 86,
  avatarRadius = 40,
  frameTopPercent = 68,
  frameBottomPercent = 96,
  headOvershootPercent = 14,
}: SplitStackBrollProps) {
  void avatarSrc;
  void avatarStartSeconds;
  void _unused;

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
  const exitProgress = interpolate(
    frame,
    [totalFrames - exitFrames, totalFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const { transform, opacity } = computeTransition(enter, exit, enterProgress, exitProgress);

  const brollResolved =
    brollSrc.startsWith("http") || brollSrc.startsWith("file:") ? brollSrc : staticFile(brollSrc);

  // Subject container: same horizontal bounds as the floating frame (so body
  // is contained), but top extended above frame's top by headOvershootPercent
  // so the HEAD pops above. Bottom aligned with frame's bottom.
  const subjectTopPercent = frameTopPercent - headOvershootPercent;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        transform,
        opacity,
        backgroundColor: brand.colors.background,
      }}
    >
      {/* ═══ LAYER 1 — Full-frame B-roll ═══ */}
      <AbsoluteFill>
        <OffthreadVideo
          src={brollResolved}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Label pill at top of frame (over the B-roll) */}
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: "rgba(20,20,25,0.85)",
              color: brand.colors.textPrimary,
              fontFamily: brand.fonts.emphasis,
              fontSize: 38,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
            }}
          >
            {label}
          </span>
        </div>
      ) : null}

      {/* ═══ LAYER 2 — Floating frame (side margins mandatory) ═══ */}
      <div
        style={{
          position: "absolute",
          left: avatarMargin,
          right: avatarMargin,
          top: `${frameTopPercent}%`,
          bottom: `${100 - frameBottomPercent}%`,
          borderRadius: avatarRadius,
          background: `linear-gradient(135deg, ${brand.colors.surface} 0%, ${brand.colors.background} 100%)`,
          border: `1px solid ${brand.colors.divider}`,
          boxShadow: `0 18px 44px rgba(0,0,0,0.55)`,
          pointerEvents: "none",
        }}
      />

      {/* ═══ LAYER 3 — Masked subject ═══
          - Same horizontal bounds as frame (body contained)
          - Top extended above frame top by headOvershootPercent (head pops)
          - Bottom same as frame bottom (no bottom overflow)
          - objectFit cover + objectPosition "center 35%" biases the crop so
            the subject's head lands at the upper portion of the container
            while body fills the frame area */}
      {mattedPatternPath ? (
        <div
          style={{
            position: "absolute",
            left: avatarMargin,
            right: avatarMargin,
            top: `${subjectTopPercent}%`,
            bottom: `${100 - frameBottomPercent}%`,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <MattedAvatarSequence
            patternPath={mattedPatternPath}
            firstFrameNumber={mattedFirstFrame}
            objectPositionY={16}
          />
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

interface MattedProps {
  patternPath: string;
  firstFrameNumber: number;
  // Object-position Y as percent; biases which portion of the matted source
  // shows when objectFit is cover. Lower = shows more of the top (head).
  objectPositionY?: number;
}

function MattedAvatarSequence({
  patternPath,
  firstFrameNumber,
  objectPositionY = 35,
}: MattedProps) {
  const frame = useCurrentFrame();
  const n = firstFrameNumber + frame;
  const padded = String(n).padStart(4, "0");
  const src = patternPath.replace("%04d", padded);
  return (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `center ${objectPositionY}%`,
        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
      }}
    />
  );
}

function computeTransition(
  enter: TransitionKind,
  exit: TransitionKind,
  enterP: number,
  exitP: number,
): { transform: string; opacity: number } {
  let enterScale = 1;
  let enterY = 0;
  let enterOpacity = 1;
  if (enter === "slide_up") enterY = (1 - enterP) * 120;
  else if (enter === "slide_down") enterY = (1 - enterP) * -120;
  else if (enter === "scale") enterScale = interpolate(enterP, [0, 1], [0.94, 1]);
  if (enter === "fade") enterOpacity = enterP;

  let exitScale = 1;
  let exitY = 0;
  let exitOpacity = 1;
  if (exit === "slide_up") exitY = (1 - exitP) * -120;
  else if (exit === "slide_down") exitY = (1 - exitP) * 120;
  else if (exit === "scale") exitScale = interpolate(exitP, [0, 1], [0.94, 1]);
  if (exit === "fade") exitOpacity = exitP;

  return {
    transform: `translateY(${enterY + exitY}px) scale(${enterScale * exitScale})`,
    opacity: enterOpacity * exitOpacity,
  };
}
