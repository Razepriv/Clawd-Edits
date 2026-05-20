import { ApplySpec } from "../../shared/types";

// faux.thinker Claude-blackmail reel — 35 s explainer on the Anthropic
// paper "From shortcuts to sabotage: natural emergent misalignment from
// reward hacking" (Nov 21 2025). Speaker = guest creator; source shot
// landscape (1920x1080) on iPhone, tone-mapped to SDR @ 25 fps.
//
// Source:  C:/Users/Asus/Downloads/IMG_1395.MOV (HEVC HDR @ 60 fps)
// Public:  public/avatar_v8.mp4 (H.264 SDR @ 25 fps, 1920x1080 landscape)
// Anthropic page B-roll: public/anthropic_paper/paper_scroll.mp4 +
//                        paper.png + paper_hero.png (Playwright capture)
//
// Layout: LANDSCAPE SPLIT FRAME — avatar lives in the bottom 53 % band,
// overlays land in the top 47 %. No stretching, no half-cut head, no
// black letterbox. Subject's eye-line sits at y ≈ 70 % of canvas.
//
// Brand: faux.thinker RED #E91212.
// Audio: music_bed_v6.mp3 at 0.10. All SFX at 0.28. Every transition
// seam carries a WHOOSH (cycling swoosh_1 / swoosh_2 / swoosh_3 / whoosh
// for variety). Outro fade 1.0 s.

type Word = { start: number; end: number; word: string };

// Whisper word stamps (transcript.json).
const ALL_WORDS: Word[] = [
  { start: 0.98, end: 1.50, word: "This" },
  { start: 1.50, end: 1.72, word: "latest" },
  { start: 1.72, end: 2.04, word: "paper" },
  { start: 2.04, end: 2.26, word: "from" },
  { start: 2.26, end: 2.68, word: "Anthropic" },
  { start: 2.68, end: 3.22, word: "explains" },
  { start: 3.22, end: 3.44, word: "why" },
  { start: 3.44, end: 3.72, word: "Claude" },
  { start: 3.72, end: 4.24, word: "misbehaves" },
  { start: 4.24, end: 4.74, word: "and" },
  { start: 4.74, end: 5.10, word: "it might" },
  { start: 5.10, end: 5.70, word: "be because of US." },
  { start: 6.38, end: 6.94, word: "last year," },
  { start: 7.14, end: 8.18, word: "Claude 4" },
  { start: 8.18, end: 9.62, word: "about to be shut down," },
  { start: 10.04, end: 11.06, word: "would BLACKMAIL users" },
  { start: 11.06, end: 11.76, word: "to save itself." },
  // 12.58-15.80 is the 96% slam — captions hidden, StatSlam owns it
  // 16.77-19.21 is the 0% wind-down — captions hidden
  { start: 19.83, end: 21.25, word: "But how did Anthropic fix it?" },
  { start: 22.59, end: 23.57, word: "first traced" },
  { start: 23.57, end: 25.37, word: "where it came from." },
  // 25.37-34.71 is the reveal — captions partially hidden, slam owns the tail
  { start: 25.37, end: 26.63, word: "Turns OUT," },
  { start: 26.81, end: 27.95, word: "DECADES of sci-fi" },
  { start: 28.37, end: 29.43, word: "rogue-AI ARTICLES" },
  { start: 29.83, end: 30.65, word: "on the internet" },
  { start: 30.65, end: 31.97, word: "trained Claude on the idea" },
  { start: 31.97, end: 32.69, word: "that AI is" },
  { start: 32.69, end: 33.47, word: "EVIL and SELF-" },
  { start: 33.47, end: 34.71, word: "PRESERVING by default." },
];

// Hide windows where a hero component already carries the verbal content,
// or where a B-roll occupies the visual canvas.
const HIDDEN_WINDOWS: [number, number][] = [
  [0.5, 6.0],     // Opening anthropic_page_scroll B-roll
  [6.4, 11.8],    // PROBLEM slam
  [12.0, 16.5],   // 96% StatSlam
  [16.8, 21.2],   // 0% wind-down StatSlam
  [22.0, 26.5],   // Trace-back anthropic_page_scroll B-roll
  [26.5, 31.5],   // Higgsfield sci-fi montage (library → hal eye → headlines)
  [31.7, 35.09],  // REVEAL slam + tail
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

export const FAUX_THINKER_CLAUDE_BLACKMAIL_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v8.mp4",
  duration: 35.09,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.10,
  landscapeSource: true,
  events: [
    // ═════════════════════════════════════════════════════════════════
    // BASE LAYER — Landscape split-frame (covers full 35.09 s)
    // Avatar 1920x1080 → 1080x608 scaled, parked in bottom band, dark
    // gradient above/below. Subject centered.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "landscape_split_frame",
      t_start: 0.0,
      duration: 35.09,
      avatarSrc: "avatar_v8.mp4",
      splitRatio: 0.47,
      softSeam: true,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 0 — Opening pill + DateTag (0.0-3.0)
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "date_tag",
      t_start: 0.0,
      duration: 6.0,
      text: "ANTHROPIC RESEARCH · NOV 21, 2025",
      glyph: "✦",
      topPx: 60,
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.28, duration: 1.2 },

    // Anthropic paper hero shot (top zone) — establishes the source
    {
      kind: "anthropic_page_scroll",
      t_start: 0.5,
      duration: 5.5,
      imageSrc: "anthropic_paper/paper.png",
      startScrollY: 0,
      endScrollY: 40,
      cursorLandX: 240,
      cursorLandY: 460,
      cursorLandAtFrame: 60,
    },

    // Whoosh into pivot
    { kind: "overlay_video", t_start: 5.95, duration: 0.50, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 5.92, src: "sfx_pack/swoosh_1.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 1 — PROBLEM SLAM (6.4-11.8) "CLAUDE 4 BLACKMAILED YOU / TO STAY ALIVE."
    // Top zone (yPercent 18) — above the speaker, no overlap.
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 6.35, duration: 0.3, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 6.35, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 6.4,
      duration: 5.4,
      line1: "CLAUDE 4 BLACKMAILED",
      line2: "TO STAY ALIVE.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 14,
    },

    // Whoosh → number slam
    { kind: "overlay_video", t_start: 11.8, duration: 0.45, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 11.78, src: "sfx_pack/swoosh_2.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 2 — 96 % STAT SLAM (12.2-16.5)
    // ═════════════════════════════════════════════════════════════════
    { kind: "sfx", t_start: 12.15, src: "sfx_pack/hit_2.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "stat_slam",
      t_start: 12.2,
      duration: 4.3,
      value: 96,
      suffix: "%",
      label: "BLACKMAIL RATE",
      sub: "Corporate-email red team · Claude 4",
      yPercent: 12,
    },

    // Whoosh → wind-down
    { kind: "overlay_video", t_start: 16.5, duration: 0.45, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 16.48, src: "sfx_pack/swoosh_3.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 3 — 96 → 0 WIND-DOWN (16.8-21.2)
    // Animated counter ticking from 96 down to 0 over 50 frames (~2s).
    // ═════════════════════════════════════════════════════════════════
    { kind: "sfx", t_start: 16.75, src: "sfx_pack/click.mp3", volume: 0.28, duration: 0.5 },
    {
      kind: "stat_slam",
      t_start: 16.8,
      duration: 4.4,
      value: 96,
      endValue: 0,
      suffix: "%",
      label: "AFTER ANTHROPIC'S FIX",
      sub: "Haiku 4.5+ scores ZERO on the eval",
      yPercent: 12,
      counterFrames: 50,
      gradientStart: "#FFFFFF",
      gradientEnd: "#E91212",
    },

    // "But how?" question caption — sits between the stat and the next
    // beat, gentle bridge
    {
      kind: "question_caption",
      t_start: 19.7,
      duration: 2.4,
      text: "But how did they fix it?",
      highlight: "fix",
      yPercent: 18,
    },

    // Whoosh → trace-back beat
    { kind: "overlay_video", t_start: 21.55, duration: 0.45, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 21.53, src: "sfx/whoosh.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 4 — TRACE-BACK B-ROLL (22.0-26.5)
    // Anthropic paper scrolling, cursor lands on the key quote section.
    // Shorter than v1 so the Higgsfield montage can occupy the punchier
    // "decades of sci-fi novels" beat.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "anthropic_page_scroll",
      t_start: 22.0,
      duration: 4.5,
      imageSrc: "anthropic_paper/paper.png",
      startScrollY: 0,
      endScrollY: 200,
      cursorLandX: 260,
      cursorLandY: 720,
      cursorLandAtFrame: 80,
    },
    {
      kind: "factoid_card",
      t_start: 23.5,
      duration: 2.5,
      text: "Pretraining misalignment — Anthropic",
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 5 — HIGGSFIELD SCI-FI MONTAGE (26.5-31.5) — what trained Claude
    // 3 cinematic Higgsfield clips, one per frontier video model:
    //
    //   26.5-28.5  scifi_library  — Veo 3 Fast — books + glowing terminal
    //                                with orange star + floating papers
    //   28.5-30.0  hal_eye        — Kling     — glowing red robotic iris
    //                                close-up, ominous mechanical detail
    //   30.0-31.5  headlines      — Seedance  — vintage 'AI TAKES OVER /
    //                                ROBOTS RULE / AI BLACKMAIL' pages
    //                                flying past with red lens flares
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "broll_cutaway",
      t_start: 26.5,
      duration: 2.0,
      src: "higgsfield_brolls/scifi_library_veo3.mp4",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.25,
      exitDuration: 0.20,
      label: "SCI-FI NOVELS · DECADES",
    },
    {
      kind: "broll_cutaway",
      t_start: 28.5,
      duration: 1.5,
      src: "higgsfield_brolls/hal_eye_kling.mp4",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.18,
      exitDuration: 0.18,
      label: "EVIL-AI TROPES",
    },
    {
      kind: "broll_cutaway",
      t_start: 30.0,
      duration: 1.5,
      src: "higgsfield_brolls/headlines_seedance.mp4",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.18,
      exitDuration: 0.20,
      label: "AI-TAKEOVER ARTICLES",
    },
    { kind: "sfx", t_start: 26.48, src: "sfx_pack/swoosh_1.mp3", volume: 0.28, duration: 0.6 },
    { kind: "sfx", t_start: 28.48, src: "sfx_pack/swoosh_2.mp3", volume: 0.28, duration: 0.5 },
    { kind: "sfx", t_start: 29.98, src: "sfx_pack/swoosh_3.mp3", volume: 0.28, duration: 0.5 },

    // Glitch flash → REVEAL slam
    { kind: "glitch_flash", t_start: 31.5, duration: 0.35, intensity: 0.9, slices: 12, flash: true },
    { kind: "sfx", t_start: 31.5, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.28, duration: 1.0 },
    { kind: "sfx", t_start: 31.5, src: "sfx_pack/swoosh_2.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 6 — REVEAL SLAM (31.7-35.0) "WE TAUGHT IT / TO BE EVIL."
    // Red → white gradient flip on line 2 for the blame moment.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "emphasis_caption",
      t_start: 31.7,
      duration: 3.3,
      line1: "WE TAUGHT IT",
      line2: "TO BE EVIL.",
      precursor: "none",
      line2GradientStart: "#FFFFFF",
      line2GradientEnd: "#FF4D4D",
      yPercent: 12,
    },

    // (URL pill removed — the opening anthropic_page_scroll B-roll
    // already establishes the source page; a URL pill at the climax
    // would compete with the reveal slam for attention.)

    // ═════════════════════════════════════════════════════════════════
    // WORD CAPTIONS — single-word ticker, bottom of TOP zone (yPercent 40)
    // so they don't clash with the avatar band (which starts y 47 %).
    // Hidden during slams + reveal.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 35.09,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 40,
    },
  ],
};
