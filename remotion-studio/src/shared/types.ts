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

  // ───────── Codex-reel components (v12.2 additions) ─────────
  // AnimeHookClip: full-frame anime/cartoon MP4 wrapper for the hook beat
  // with brand-red vignette + film-grain tint so the clip sits inside the
  // faux.thinker aesthetic instead of feeling foreign.
  z.object({
    kind: z.literal("anime_hook_clip"),
    t_start: z.number(),
    duration: z.number(),
    src: z.string(),
    startFromSeconds: z.number().optional(),
    label: z.string().optional(),
    tintColor: z.string().optional(),
  }),
  // MultiAgentOrchestra: 3-lane card visualising parallel agents (bug-fixer
  // / test-runner / reviewer) with pulsing status dots + progress bars.
  z.object({
    kind: z.literal("multi_agent_orchestra"),
    t_start: z.number(),
    duration: z.number(),
    header: z.string().optional(),
    lanes: z.array(
      z.object({
        badge: z.string(),
        title: z.string(),
        status: z.string(),
        state: z.enum(["running", "done"]).optional(),
      }),
    ),
    staggerFrames: z.number().optional(),
  }),
  // TerminalAgentSim: fake codex CLI with scripted log lines that appear on
  // schedule. Sits underneath MultiAgentOrchestra for beat-3 authenticity.
  z.object({
    kind: z.literal("terminal_agent_sim"),
    t_start: z.number(),
    duration: z.number(),
    title: z.string().optional(),
    lines: z.array(
      z.object({
        agent: z.string(),
        agentColor: z.string().optional(),
        text: z.string(),
        atFrame: z.number(),
        kind: z.enum(["command", "log", "ok", "fail"]).optional(),
      }),
    ),
  }),
  // SleepCycleOverlay: moon + ticking-clock metaphor for "while you sleep".
  z.object({
    kind: z.literal("sleep_cycle_overlay"),
    t_start: z.number(),
    duration: z.number(),
    label: z.string().optional(),
    phaseOffset: z.number().optional(),
  }),
  // QuoteSlam: huge hero-word typographic slam with italic pre-line + hand-
  // drawn underline sweep. Stronger than EmphasisCaption for single-word
  // kill-lines like "STAFF".
  z.object({
    kind: z.literal("quote_slam"),
    t_start: z.number(),
    duration: z.number(),
    preLine: z.string(),
    heroWord: z.string(),
    afterNote: z.string().optional(),
    heroGradientStart: z.string().optional(),
    heroGradientEnd: z.string().optional(),
    yPosition: z.enum(["center", "upper"]).optional(),
  }),
  // SideProjectBadge: small pill with ticking clock (e.g. "SIDE PROJECT / 2 WEEKS").
  z.object({
    kind: z.literal("side_project_badge"),
    t_start: z.number(),
    duration: z.number(),
    label: z.string(),
    meta: z.string().optional(),
    yPercent: z.number().optional(),
    xPercent: z.number().optional(),
  }),
  // ComparisonCard: two-column "left vs right" card with cross-fade toggle
  // that literalises a rhetorical pivot ("talk to AI vs let it run your machine").
  z.object({
    kind: z.literal("comparison_card"),
    t_start: z.number(),
    duration: z.number(),
    leftLabel: z.string(),
    rightLabel: z.string(),
    header: z.string().optional(),
    toggleAtFrame: z.number().optional(),
  }),
  // CommentPromptCard: Instagram comment-box with typewriter prompt — used
  // when the CTA is an open question, not a DM-gated delivery.
  z.object({
    kind: z.literal("comment_prompt_card"),
    t_start: z.number(),
    duration: z.number(),
    username: z.string().optional(),
    prompt: z.string(),
    header: z.string().optional(),
  }),

  // ───────── Canva-pipeline reel components (v12.3 additions) ─────────
  // DeadTakeStrikethrough: two-line hook with a crimson slash drawn across
  // the second word. For "Stop saying CANVA (is) DEAD" pattern.
  z.object({
    kind: z.literal("dead_take_strikethrough"),
    t_start: z.number(),
    duration: z.number(),
    preserveWord: z.string(),
    struckWord: z.string(),
    strikeStartFrame: z.number().optional(),
    strikeDurationFrames: z.number().optional(),
  }),
  // HotTakesFeed: Twitter-style scrolling feed of viral takes with staggered
  // entry. For "The takes were instant. Canva dead, Figma cooked, …".
  z.object({
    kind: z.literal("hot_takes_feed"),
    t_start: z.number(),
    duration: z.number(),
    header: z.string().optional(),
    takes: z.array(
      z.object({
        handle: z.string(),
        name: z.string(),
        text: z.string(),
        avatarSeed: z.number().optional(),
        timeLabel: z.string().optional(),
      }),
    ),
    staggerFrames: z.number().optional(),
  }),
  // QuoteCard: authoritative pull-quote card with brand header strip,
  // giant quotation mark, author footer. For CEO-quoted-in-launch moments.
  z.object({
    kind: z.literal("quote_card"),
    t_start: z.number(),
    duration: z.number(),
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    brandLogoSrc: z.string().optional(),
    brandColor: z.string().optional(),
    accentStart: z.string().optional(),
    accentEnd: z.string().optional(),
  }),
  // ExportChipRow: row of export-format chips with one chip igniting.
  // For "Export to Canva is a named feature" moments.
  z.object({
    kind: z.literal("export_chip_row"),
    t_start: z.number(),
    duration: z.number(),
    chips: z.array(
      z.object({
        label: z.string(),
        highlight: z.boolean().optional(),
        prefix: z.string().optional(),
      }),
    ),
    header: z.string().optional(),
    highlightStart: z.string().optional(),
    highlightEnd: z.string().optional(),
    igniteAtFrame: z.number().optional(),
    yPercent: z.number().optional(),
  }),
  // PipelineDiagram: L→R arrow flow showing pipeline steps. For "It's a
  // pipeline" + "pitch decks through Claude Design into Canva brand kit".
  z.object({
    kind: z.literal("pipeline_diagram"),
    t_start: z.number(),
    duration: z.number(),
    header: z.string().optional(),
    staggerFrames: z.number().optional(),
    nodes: z.array(
      z.object({
        label: z.string(),
        logoSrc: z.string().optional(),
        gradientStart: z.string().optional(),
        gradientEnd: z.string().optional(),
        glyph: z.string().optional(),
        highlight: z.boolean().optional(),
      }),
    ),
  }),
  // StackShipCard: 3-tile tool stack with a "+ SHIP" stamp landing last.
  // For "Pick two or three that play nice and ship".
  z.object({
    kind: z.literal("stack_ship_card"),
    t_start: z.number(),
    duration: z.number(),
    tools: z.array(
      z.object({
        label: z.string(),
        logoSrc: z.string().optional(),
        gradientStart: z.string().optional(),
        gradientEnd: z.string().optional(),
        glyph: z.string().optional(),
      }),
    ),
    header: z.string().optional(),
    shipLabel: z.string().optional(),
    shipAtFrame: z.number().optional(),
  }),
  // BrandKitReveal: Canva-style brand-kit card with logo + palette + fonts.
  z.object({
    kind: z.literal("brand_kit_reveal"),
    t_start: z.number(),
    duration: z.number(),
    brandName: z.string(),
    subtitle: z.string().optional(),
    logoSrc: z.string().optional(),
    colors: z.tuple([z.string(), z.string(), z.string()]).optional(),
    primaryFont: z.string().optional(),
    bodyFont: z.string().optional(),
    header: z.string().optional(),
  }),
  // YearToggleCard: year chips with one igniting (scanner → settle).
  // For "Which tool are you keeping in 2026?".
  z.object({
    kind: z.literal("year_toggle_card"),
    t_start: z.number(),
    duration: z.number(),
    years: z.array(z.union([z.string(), z.number()])),
    highlightedYear: z.union([z.string(), z.number()]),
    header: z.string().optional(),
    subtitle: z.string().optional(),
    settleAtFrame: z.number().optional(),
    yPercent: z.number().optional(),
  }),

  // ───────── Canva-pipeline v2 re-cut components (v12.4 additions) ─────────
  // SplitScreenContradiction: text-only split-screen hook (no face in frame).
  // Left = blurred hot take. Right = authoritative counter-quote.
  z.object({
    kind: z.literal("split_screen_contradiction"),
    t_start: z.number(),
    duration: z.number(),
    leftLabel: z.string(),
    leftBody: z.string(),
    rightLabel: z.string(),
    rightBody: z.string(),
    rightAuthor: z.string(),
    rightRole: z.string(),
    leftHue: z.string().optional(),
    rightHue: z.string().optional(),
  }),
  // DateTag: top-center timestamp pill for event framing.
  z.object({
    kind: z.literal("date_tag"),
    t_start: z.number(),
    duration: z.number(),
    text: z.string(),
    glyph: z.string().optional(),
    topPx: z.number().optional(),
    accentColor: z.string().optional(),
  }),
  // XHotTakeFlashcut: single X/Twitter card for flash-cut sequences.
  // Can render from a real screenshot (imageSrc) or a realistic mock.
  z.object({
    kind: z.literal("x_hot_take_flashcut"),
    t_start: z.number(),
    duration: z.number(),
    imageSrc: z.string().optional(),
    name: z.string().optional(),
    handle: z.string().optional(),
    blurHandle: z.boolean().optional(),
    text: z.string().optional(),
    timeLabel: z.string().optional(),
    likes: z.number().optional(),
    retweets: z.number().optional(),
    replies: z.number().optional(),
    avatarStart: z.string().optional(),
    avatarEnd: z.string().optional(),
    cardWidth: z.number().optional(),
  }),
  // AnthropicPageScroll: simulated browser scroll with cursor landing
  // + optional highlight ring around the landing target.
  z.object({
    kind: z.literal("anthropic_page_scroll"),
    t_start: z.number(),
    duration: z.number(),
    imageSrc: z.string(),
    startScrollY: z.number().optional(),
    endScrollY: z.number().optional(),
    cursorLandX: z.number().optional(),
    cursorLandY: z.number().optional(),
    cursorLandAtFrame: z.number().optional(),
    highlightBox: z
      .object({
        xPct: z.number(),
        yPct: z.number(),
        wPct: z.number(),
        hPct: z.number(),
      })
      .optional(),
  }),
  // SaveMomentSlate: full-frame bold-text moment, dims background, 3s hold.
  z.object({
    kind: z.literal("save_moment_slate"),
    t_start: z.number(),
    duration: z.number(),
    text: z.string(),
    kicker: z.string().optional(),
    hint: z.string().optional(),
    highlight: z.string().optional(),
    dimOpacity: z.number().optional(),
  }),
  // NumberedList: numbered list card with gradient number glyphs. Defaults
  // to horizontally centered + positioned BELOW the face (yPercent 62) so
  // it stays inside the safe zone without covering the speaker.
  z.object({
    kind: z.literal("numbered_list"),
    t_start: z.number(),
    duration: z.number(),
    items: z.array(
      z.object({
        text: z.string(),
        highlight: z.string().optional(),
      }),
    ),
    header: z.string().optional(),
    staggerFrames: z.number().optional(),
    yPercent: z.number().optional(),
    xPx: z.number().optional(),
    centered: z.boolean().optional(),
    cardWidth: z.number().optional(),
  }),
  // QuestionCaption: pinned question overlay with brand-red border + tape corner.
  z.object({
    kind: z.literal("question_caption"),
    t_start: z.number(),
    duration: z.number(),
    text: z.string(),
    highlight: z.string().optional(),
    subtitle: z.string().optional(),
    yPercent: z.number().optional(),
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
