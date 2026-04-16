import { z } from "zod";

// One overlay event anchored to absolute time in the avatar video.
// Time is seconds (so it survives fps changes without drift).
export const OverlayEventSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("profile_card"),
    t_start: z.number(),
    duration: z.number(),
    name: z.string(),
    followers: z.string(),
    verified: z.boolean().default(true),
  }),
  z.object({
    kind: z.literal("revenue_chart"),
    t_start: z.number(),
    duration: z.number(),
    label: z.string().default("Average Revenue"),
    subLabel: z.string().default("per client"),
    growthValue: z.number(),
    baselineValue: z.number(),
    axisLeft: z.string().default("Year 1"),
    axisRight: z.string().default("Year 2"),
    valuePrefix: z.string().default("$"),
    valueSuffix: z.string().default(""),
    // When true, growth (green) renders on the right and baseline (grey) on
    // the left. Use for narratives that read "from X to Y" left-to-right.
    growthOnRight: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal("emphasis_caption"),
    t_start: z.number(),
    duration: z.number(),
    line1: z.string(),
    line2: z.string(),
    // Per-event gradient override (for reference-accurate replication).
    line2GradientStart: z.string().optional(),
    line2GradientEnd: z.string().optional(),
    // Optional pre-transition effect (e.g. rgb_glitch) timed to land at t_start.
    precursor: z.enum(["rgb_glitch", "none"]).default("rgb_glitch"),
    // "center" (default) sits at ~y 50 % which lands over the speaker in a
    // head-pop-out B-roll. "upper" (~y 25 %) sits in the clean B-roll zone
    // above the head breakout — use when the slam fires during a B-roll.
    yPosition: z.enum(["center", "upper"]).optional(),
  }),
  z.object({
    kind: z.literal("url_pill"),
    t_start: z.number(),
    duration: z.number(),
    url: z.string(),
    framesPerChar: z.number().default(1),
    showCursor: z.boolean().default(true),
  }),
  z.object({
    kind: z.literal("factoid_card"),
    t_start: z.number(),
    duration: z.number(),
    text: z.string(),
  }),
  z.object({
    kind: z.literal("readability_scale"),
    t_start: z.number(),
    duration: z.number(),
    targetPosition: z.number().min(1).max(10),
    fadeAbove: z.number().optional(),
    label: z.string().default("Readability"),
  }),
  z.object({
    kind: z.literal("app_icon_float"),
    t_start: z.number(),
    duration: z.number(),
    iconSrc: z.string(),
    backgroundColor: z.string().optional(),
    size: z.number().default(340),
  }),
  z.object({
    kind: z.literal("pill_stack"),
    t_start: z.number(),
    duration: z.number(),
    pills: z.array(
      z.object({
        label: z.string(),
        iconSrc: z.string().optional(),
        // Optional per-pill absolute start time (seconds). If set, this pill
        // appears at t_pill_start instead of t_start + idx*staggerFrames.
        // Use when you want each pill anchored to a specific word.
        t_pill_start: z.number().optional(),
        // Optional per-pill hold duration. Defaults to event duration.
        pill_duration: z.number().optional(),
      }),
    ),
    from: z.enum(["left", "right"]).default("left"),
    staggerFrames: z.number().default(4),
  }),
  z.object({
    kind: z.literal("dm_toast"),
    t_start: z.number(),
    duration: z.number(),
    username: z.string(),
    message: z.string(),
    timeLabel: z.string().default("now"),
  }),
  // Generic chroma-keyed overlay (Veo/Kling green-screen output).
  z.object({
    kind: z.literal("chroma_overlay"),
    t_start: z.number(),
    duration: z.number(),
    src: z.string(),
    keyColor: z.string().default("#00FF00"),
    similarity: z.number().default(0.4),
    smoothness: z.number().default(0.08),
    spill: z.number().default(0.2),
    opacity: z.number().default(1),
  }),
  // Remotion-native RGB glitch flash (no external asset needed).
  z.object({
    kind: z.literal("glitch_flash"),
    t_start: z.number(),
    duration: z.number(),
    intensity: z.number().default(0.85),
    slices: z.number().default(10),
    flash: z.boolean().default(true),
  }),
  // Submagic-style word-highlight captions driven by Whisper word timestamps.
  z.object({
    kind: z.literal("word_captions"),
    t_start: z.number(),
    duration: z.number(),
    words: z.array(z.object({
      start: z.number(),
      end: z.number(),
      word: z.string(),
    })),
    windowSize: z.number().default(3),
    yPercent: z.number().default(70),
  }),
  // Generic blend-mode overlay: light leak, shockwave, glow burst, grain.
  // The src MP4 is assumed to have a black background; blendMode=screen
  // drops the black and keeps only the bright/colored content.
  z.object({
    kind: z.literal("overlay_video"),
    t_start: z.number(),
    duration: z.number(),
    src: z.string(),
    blendMode: z.enum(["screen", "add", "lighten", "multiply", "normal"]).default("screen"),
    opacity: z.number().min(0).max(1).default(1),
    scale: z.number().default(1),
  }),
  // Alpha-matted PNG sequence overlay (e.g. the avatar cut out from
  // their original background, for "background behind avatar" compositing).
  z.object({
    kind: z.literal("matted_avatar"),
    t_start: z.number(),
    duration: z.number(),
    // e.g. "matted_avatar/mat_%04d.png" — %04d will be replaced by the
    // current 1-indexed frame number.
    patternPath: z.string(),
    firstFrameNumber: z.number().default(1),
    // Scale (0-1) — 1 = full frame, <1 = picture-in-picture.
    scale: z.number().default(1),
    // When scale<1, position the PiP. Percentages of frame.
    xPercent: z.number().default(50), // 50 = horizontally centered
    yPercent: z.number().default(50), // 50 = vertically centered
  }),
  // 4-layer split-stack B-roll: background + B-roll + clipped cropped-bg + matted avatar
  // popping out. Gives a "3D pop out" look where speaker's head rises above
  // the bottom rounded rectangle's top edge.
  z.object({
    kind: z.literal("stacked_broll"),
    t_start: z.number(),
    duration: z.number(),
    brollSrc: z.string(),
    avatarSrc: z.string(),
    avatarStartSeconds: z.number(),
    // Enables 3D pop-out: pattern path to matted PNG sequence. If omitted,
    // falls back to the simple 3-layer split-stack (no pop-out).
    mattedPatternPath: z.string().optional(),
    mattedFirstFrame: z.number().default(1),
    label: z.string().optional(),
    enter: z.enum(["fade", "slide_up", "slide_down", "scale", "none"]).default("fade"),
    exit: z.enum(["fade", "slide_up", "slide_down", "scale", "none"]).default("fade"),
    enterDuration: z.number().default(0.25),
    exitDuration: z.number().default(0.25),
    brollHeightPercent: z.number().default(63),
    avatarMargin: z.number().default(32),
    avatarRadius: z.number().default(40),
  }),
  // Sound-effect one-shot, anchored to a second in the avatar timeline.
  z.object({
    kind: z.literal("sfx"),
    t_start: z.number(),
    src: z.string(),
    volume: z.number().min(0).max(2).default(0.9),
    // duration is read from the file itself; we just need a short Sequence
    // window so Remotion renders the Audio tag. Default 2s is generous.
    duration: z.number().default(2.0),
  }),
  // Full-frame B-roll cutaway: covers the avatar video with a provided
  // MP4 for `duration` seconds, entering/exiting with an animation.
  z.object({
    kind: z.literal("broll_cutaway"),
    t_start: z.number(),
    duration: z.number(),
    src: z.string(),
    // Entry/exit transition: fade (opacity), slide_up (from bottom),
    // slide_down (from top), scale (grow from center), none.
    enter: z.enum(["fade", "slide_up", "slide_down", "scale", "none"]).default("slide_up"),
    exit: z.enum(["fade", "slide_up", "slide_down", "scale", "none"]).default("fade"),
    // Entry/exit transition duration in seconds.
    enterDuration: z.number().default(0.25),
    exitDuration: z.number().default(0.25),
    // Optional caption (e.g. "n8n") to overlay on the cutaway.
    label: z.string().optional(),
  }),
]);

export type OverlayEvent = z.infer<typeof OverlayEventSchema>;

// Full Apply composition input schema.
export const ApplySpecSchema = z.object({
  // Path to avatar video (relative to Remotion public/ OR absolute file://).
  avatarVideoSrc: z.string(),
  // Total video duration in seconds (must match the avatar video).
  duration: z.number(),
  // Brand to apply.
  brandKey: z.enum(["faux_thinker", "devin_jatho"]).default("faux_thinker"),
  // Ordered list of overlay events anchored to avatar timeline.
  events: z.array(OverlayEventSchema),
  // Optional music bed (replaces any generated music from pipeline).
  musicSrc: z.string().optional(),
  // Music volume relative to voice (default 0.15 = ducked well under VO).
  musicVolume: z.number().min(0).max(1).default(0.15),
});

export type ApplySpec = z.infer<typeof ApplySpecSchema>;
