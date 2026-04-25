import { ApplySpec } from "../../shared/types";

// faux.thinker basecamp reel — Raz's take on basecamp.apexaios.io as a
// LinkedIn alternative for builders. 41.77 s, English, 1080x1920 @ 25fps.
//
// Source:  D:/video editor/Videos/Video 7.mp4
// Public:  public/avatar_v7.mp4
// Hook:    public/hook_anime/basecamp_pivot_v1.mp4 (Veo 3 Fast)
// Matte:   public/matted_avatar_v7/mat_%04d.png (~1044 frames)
//
// Brand: faux.thinker (RED #E91212). Basecamp gold #F5C542 ONLY appears
// inside the basecamp B-roll videos — never leaks into faux.thinker chrome.
// SFX: 0.28. Music: music_bed_v6.mp3 at 0.10. Outro fade: 1.0 s.

type Word = { start: number; end: number; word: string };

const ALL_WORDS: Word[] = [
  { start: 0.00, end: 0.32, word: "Stop" },
  { start: 0.32, end: 0.66, word: "fixing" },
  { start: 0.66, end: 0.88, word: "your" },
  { start: 0.88, end: 1.22, word: "LinkedIn." },
  { start: 1.70, end: 1.96, word: "Something" },
  { start: 1.96, end: 2.32, word: "just" },
  { start: 2.32, end: 2.58, word: "made" },
  { start: 2.58, end: 2.74, word: "it" },
  { start: 2.74, end: 3.22, word: "irrelevant" },
  { start: 4.06, end: 4.36, word: "builders." },
  { start: 5.24, end: 5.40, word: "It's" },
  { start: 5.40, end: 5.62, word: "called" },
  { start: 5.62, end: 6.20, word: "basecamp." },
  { start: 6.74, end: 6.92, word: "You" },
  { start: 6.92, end: 7.12, word: "ship" },
  { start: 7.26, end: 7.52, word: "public." },
  { start: 8.12, end: 8.56, word: "Streaks," },
  { start: 9.08, end: 9.68, word: "peer reviews," },
  { start: 10.04, end: 10.78, word: "verified commits" },
  { start: 11.50, end: 11.92, word: "all feed" },
  { start: 12.06, end: 12.66, word: "a public score" },
  { start: 12.66, end: 14.04, word: "→ recruiters paid to search." },
  { start: 14.56, end: 15.50, word: "My honest take" },
  { start: 18.32, end: 19.04, word: "solo · Chennai" },
  { start: 19.66, end: 20.30, word: "NOT San Francisco." },
  { start: 36.40, end: 37.50, word: "Where are you putting your effort?" },
  { start: 37.94, end: 38.32, word: "basecamp" },
  { start: 38.60, end: 38.78, word: "GitHub" },
  { start: 39.40, end: 40.28, word: "your own audience?" },
  { start: 40.92, end: 41.38, word: "Drop it below." },
];

// Hide windows where a hero component already carries the verbal content.
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 3.0],     // hook clip (no captions)
  [3.0, 6.5],     // STOP FIXING / LINKEDIN slam
  [6.5, 14.5],    // mechanics list + URL pill + stats trio
  [21.0, 32.0],   // YES IF + NO IF + thesis slams
  [32.0, 36.0],   // cohort offer card
  [37.5, 41.77],  // CTA card
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame for stacked_broll given t_start (25 fps).
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_BASECAMP_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v7.mp4",
  duration: 41.77,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.10,
  events: [
    // ═════════════════════════════════════════════════════════════════
    // BEAT 0 — HOOK (0.0–3.0) — Veo: LinkedIn card cracks → terminal commits
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 3.0,
      src: "hook_anime/basecamp_pivot_v1.mp4",
      startFromSeconds: 0.0,
      label: "LINKEDIN ⤳ BASECAMP",
      tintColor: "rgba(233, 18, 18, 0.10)",
    },
    {
      kind: "date_tag",
      t_start: 0.0,
      duration: 3.0,
      text: "APR 2026 · COHORT 1 OPENS",
      glyph: "✦",
      topPx: 220,
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.28, duration: 1.2 },

    // Light-leak seam hook → avatar
    { kind: "overlay_video", t_start: 2.85, duration: 0.55, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 2.83, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 1 — LIVE PILL (3.2–6.4) "BASECAMP · COHORT 1 LIVE"
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "date_tag",
      t_start: 3.2,
      duration: 3.4,
      text: "● BASECAMP · COHORT 1 LIVE",
      glyph: "",
      topPx: 120,
      accentColor: "#E91212",
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 2 — CONTRADICTION SLAM (3.4–6.4) "STOP FIXING / YOUR LINKEDIN."
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 3.35, duration: 0.3, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 3.35, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 3.4,
      duration: 3.0,
      line1: "STOP FIXING",
      line2: "YOUR LINKEDIN.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 3 — basecamp B-ROLL #1 with HEAD-POP (6.5–13.0)
    // Live home_scroll.mp4 plays behind, Raz's matted head pops above.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 6.5,
      duration: 6.4,
      brollSrc: "basecamp/home_scroll.mp4",
      avatarSrc: "avatar_v7.mp4",
      avatarStartSeconds: 6.5,
      mattedPatternPath: "matted_avatar_v7/mat_%04d.png",
      mattedFirstFrame: matFrame(6.5),
      label: "BASECAMP · LIVE",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.28,
      exitDuration: 0.30,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 6.48, src: "sfx_pack/swoosh_1.mp3", volume: 0.28, duration: 0.6 },

    // URL pill while the B-roll plays (lower-third context)
    {
      kind: "url_pill",
      t_start: 7.0,
      duration: 5.5,
      url: "basecamp.apexaios.io",
      framesPerChar: 2,
      showCursor: true,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 4 — STATS TRIO PILL_STACK (8.4–13.0) — live numbers from home
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "pill_stack",
      t_start: 8.4,
      duration: 4.6,
      from: "left",
      staggerFrames: 6,
      pills: [
        { label: "2,847 BUILDERS" },
        { label: "12K+ MATCHES" },
        { label: "847 PLACED" },
      ],
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 5 — MECHANICS NUMBERED LIST (13.0–17.0) — feeds the score
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "numbered_list",
      t_start: 13.0,
      duration: 4.0,
      header: "ALL FEED YOUR BUILDER SCORE",
      staggerFrames: 8,
      centered: true,
      yPercent: 56,
      cardWidth: 760,
      items: [
        { text: "STREAKS", highlight: "STREAKS" },
        { text: "PEER REVIEWS", highlight: "PEER REVIEWS" },
        { text: "VERIFIED COMMITS", highlight: "VERIFIED" },
      ],
    },
    { kind: "sfx", t_start: 12.98, src: "sfx_pack/click.mp3", volume: 0.28, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 6 — CHENNAI CREDIBILITY PILL (18.0–20.6) — small mono badge
    // Sits subtly bottom-left during the "honest take from Chennai" line.
    // Reusing date_tag for the styled pill — never overdo it.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "factoid_card",
      t_start: 18.0,
      duration: 2.6,
      text: "CHENNAI · NOT SF",
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 7 — X TAKE FLASH-CUT #1 (15.5–18.0) — anti-LinkedIn sentiment
    // @intenxe_ops: "they want sheep, pre-packaged, dead systems"
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 15.5,
      duration: 2.5,
      imageSrc: "x_takes_v7/take_2.png",
      cardWidth: 820,
    },
    { kind: "sfx", t_start: 15.48, src: "sfx_pack/hit_2.mp3", volume: 0.28, duration: 0.5 },

    // Light-leak → YES/NO comparison
    { kind: "overlay_video", t_start: 20.6, duration: 0.5, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 20.58, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 8 — YES IF (20.9–23.6) "STUCK ON UPWORK? / THIS IS YOUR MOVE."
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "emphasis_caption",
      t_start: 20.9,
      duration: 2.7,
      line1: "STUCK ON UPWORK?",
      line2: "THIS IS YOUR MOVE.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },
    { kind: "sfx", t_start: 20.88, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 9 — NO IF (23.7–27.0) "ALREADY POSTING? / SKIP IT."
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 23.65, duration: 0.25, intensity: 0.8, slices: 8, flash: true },
    { kind: "sfx", t_start: 23.65, src: "sfx_pack/hit_2.mp3", volume: 0.28, duration: 0.5 },
    {
      kind: "emphasis_caption",
      t_start: 23.7,
      duration: 3.3,
      line1: "ALREADY POSTING?",
      line2: "SKIP IT.",
      precursor: "none",
      line2GradientStart: "#FFFFFF",
      line2GradientEnd: "#9AA0A6",
      yPercent: 66,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 10 — X TAKE FLASH-CUT #2 (26.5–29.0) — "10x more hireable" angle
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 26.5,
      duration: 2.5,
      imageSrc: "x_takes_v7/take_3.png",
      cardWidth: 820,
    },
    { kind: "sfx", t_start: 26.48, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 11 — THESIS SLAM (29.4–32.0) "PICK ONE. / BE UNDENIABLE."
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 29.35, duration: 0.3, intensity: 0.9, slices: 12, flash: true },
    { kind: "sfx", t_start: 29.35, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.28, duration: 1.0 },
    {
      kind: "emphasis_caption",
      t_start: 29.4,
      duration: 2.6,
      line1: "PICK ONE.",
      line2: "BE UNDENIABLE.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },

    // Light-leak → cohort offer
    { kind: "overlay_video", t_start: 32.0, duration: 0.5, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 31.98, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 12 — basecamp B-ROLL #2 with HEAD-POP (32.5–36.0)
    // Cohort/score detail of the homepage behind, Raz pops over for the
    // "Cohort 1 runs April to July, free for builders" beat.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 32.5,
      duration: 3.5,
      brollSrc: "basecamp/home_scroll.mp4",
      avatarSrc: "avatar_v7.mp4",
      avatarStartSeconds: 32.5,
      mattedPatternPath: "matted_avatar_v7/mat_%04d.png",
      mattedFirstFrame: matFrame(32.5),
      label: "COHORT 1 · APR–JUL · FREE",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.28,
      exitDuration: 0.30,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },

    // Cohort offer factoid (lower-third context, reinforces VO)
    {
      kind: "factoid_card",
      t_start: 33.4,
      duration: 2.4,
      text: "APR → JUL 2026 · FREE FOR BUILDERS",
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 13 — CTA (37.0–41.4) "Drop it below."
    // ═════════════════════════════════════════════════════════════════
    { kind: "overlay_video", t_start: 36.0, duration: 0.45, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 35.98, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "comment_prompt_card",
      t_start: 37.0,
      duration: 4.4,
      username: "faux.thinker",
      header: "DROP IT BELOW",
      prompt: "basecamp · github · your own audience",
    },
    { kind: "sfx", t_start: 37.0, src: "sfx/notification.mp3", volume: 0.28, duration: 0.7 },

    // ═════════════════════════════════════════════════════════════════
    // WORD CAPTIONS — single-word ticker, bottom safe zone (yPercent 80)
    // Hidden in the windows where a hero component carries the text.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 41.77,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 80,
    },
  ],
};
