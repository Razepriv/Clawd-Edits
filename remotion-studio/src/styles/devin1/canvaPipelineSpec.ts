import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker Canva/Claude-Design pipeline reel — v1.
//
// Source: D:/video editor/Videos/video_4.mp4 -> public/avatar_v4.mp4
//   duration 41.99 s, 1080x1920, 25 fps, AAC 48 kHz stereo, continuous
//   single-shot avatar with no scene cuts.
//
// Narrative (9 beats):
//   0  ANIME HOOK     0.00-3.20   [overlay] Canva-tombstone crack + anime
//                                 Perkins-style figure rising with crystal tablet
//   1  HOOK (VO)      0.00-1.92   "Stop saying Canva is dead."
//   2  SUPPORTING     2.40-5.98   "Their CEO just endorsed the tool supposedly killing them."
//   3  NAME REVEAL    6.36-8.66   "Anthropic dropped Claude Design yesterday."
//   4  HOT TAKES      9.22-13.92  "The takes were instant. Canva dead, Figma cooked, design tools over."
//   5  PROOF QUOTE    14.40-20.48 Perkins CEO quoted + Export to Canva named feature
//   6  REFRAME ★      20.94-25.70 "It's not a replacement. It's a pipeline."  → QuoteSlam "PIPELINE"
//   7  ADVICE         26.26-33.60 "Pick two or three that play nice and ship."
//   8  CRED + CTA     33.94-41.68 Pitch decks through Claude Design → Canva brand kit, comment 2026
//
// Style: faux.thinker v12.3 — adds 8 new components on top of the v12.2
// Codex-reel extensions (AnimeHookClip etc).

type Word = { start: number; end: number; word: string };

const ALL_WORDS: Word[] = [
  { start: 0.0, end: 0.44, word: "Stop" },
  { start: 0.44, end: 0.96, word: "saying" },
  { start: 0.96, end: 1.46, word: "Canva" },
  { start: 1.46, end: 1.68, word: "is" },
  { start: 1.68, end: 1.92, word: "dead." },
  { start: 2.4, end: 2.68, word: "Their" },
  { start: 2.68, end: 3.08, word: "CEO" },
  { start: 3.08, end: 3.58, word: "just" },
  { start: 3.58, end: 3.94, word: "endorsed" },
  { start: 3.94, end: 4.26, word: "the" },
  { start: 4.26, end: 4.54, word: "tool," },
  { start: 4.92, end: 5.28, word: "supposedly" },
  { start: 5.28, end: 5.66, word: "killing" },
  { start: 5.66, end: 5.98, word: "them." },
  { start: 6.36, end: 6.86, word: "Anthropic" },
  { start: 6.86, end: 7.32, word: "dropped" },
  { start: 7.32, end: 7.82, word: "Claude" },
  { start: 7.82, end: 8.1, word: "Design" },
  { start: 8.1, end: 8.66, word: "yesterday." },
  { start: 9.22, end: 9.3, word: "The" },
  { start: 9.3, end: 9.6, word: "takes" },
  { start: 9.6, end: 9.8, word: "were" },
  { start: 9.8, end: 10.34, word: "instant." },
  { start: 10.82, end: 11.14, word: "Canva" },
  { start: 11.14, end: 11.4, word: "dead," },
  { start: 11.82, end: 12.12, word: "Figma" },
  { start: 12.12, end: 12.44, word: "cooked," },
  { start: 12.88, end: 13.12, word: "design" },
  { start: 13.12, end: 13.5, word: "tools" },
  { start: 13.5, end: 13.92, word: "over." },
  { start: 14.4, end: 14.62, word: "Except" },
  { start: 14.62, end: 15.38, word: "Canva's" },
  { start: 15.38, end: 15.66, word: "own" },
  { start: 15.66, end: 16.08, word: "CEO" },
  { start: 16.08, end: 16.48, word: "is" },
  { start: 16.48, end: 16.82, word: "quoted" },
  { start: 16.82, end: 17.16, word: "in" },
  { start: 17.16, end: 17.26, word: "the" },
  { start: 17.26, end: 17.48, word: "launch." },
  { start: 18.38, end: 18.7, word: "Export" },
  { start: 18.7, end: 18.94, word: "to" },
  { start: 18.94, end: 19.34, word: "Canva" },
  { start: 19.34, end: 19.6, word: "is" },
  { start: 19.6, end: 19.7, word: "a" },
  { start: 19.7, end: 20.1, word: "named" },
  { start: 20.1, end: 20.48, word: "feature." },
  { start: 20.94, end: 21.16, word: "It's" },
  { start: 21.16, end: 21.34, word: "not" },
  { start: 21.34, end: 21.48, word: "a" },
  { start: 21.48, end: 21.86, word: "replacement." },
  { start: 22.36, end: 22.54, word: "It's" },
  { start: 22.54, end: 22.62, word: "a" },
  { start: 22.62, end: 22.96, word: "pipeline." },
  { start: 23.42, end: 23.52, word: "The" },
  { start: 23.52, end: 23.76, word: "ones" },
  { start: 23.76, end: 23.94, word: "who" },
  { start: 23.94, end: 24.28, word: "survive" },
  { start: 24.28, end: 24.6, word: "AI" },
  { start: 24.6, end: 25.16, word: "plug" },
  { start: 25.16, end: 25.48, word: "into" },
  { start: 25.48, end: 25.7, word: "it." },
  { start: 26.26, end: 26.52, word: "Not" },
  { start: 26.52, end: 26.84, word: "panic" },
  { start: 26.84, end: 27.12, word: "about" },
  { start: 27.12, end: 27.36, word: "it." },
  { start: 27.36, end: 28.0, word: "Stop" },
  { start: 28.0, end: 28.42, word: "ditching" },
  { start: 28.42, end: 28.64, word: "tools" },
  { start: 28.64, end: 29.04, word: "every" },
  { start: 29.04, end: 29.24, word: "time" },
  { start: 29.24, end: 29.64, word: "something" },
  { start: 29.64, end: 29.86, word: "new" },
  { start: 29.86, end: 30.2, word: "drops." },
  { start: 30.94, end: 31.14, word: "Pick" },
  { start: 31.14, end: 31.46, word: "two" },
  { start: 31.46, end: 31.62, word: "or" },
  { start: 31.62, end: 31.92, word: "three" },
  { start: 31.92, end: 32.28, word: "that" },
  { start: 32.28, end: 32.54, word: "play" },
  { start: 32.54, end: 32.76, word: "nice" },
  { start: 32.76, end: 33.36, word: "and" },
  { start: 33.36, end: 33.6, word: "ship." },
  { start: 33.94, end: 34.08, word: "I'm" },
  { start: 34.08, end: 34.24, word: "running" },
  { start: 34.24, end: 34.48, word: "pitch" },
  { start: 34.48, end: 34.72, word: "decks" },
  { start: 34.72, end: 35.1, word: "through" },
  { start: 35.1, end: 35.44, word: "Claude" },
  { start: 35.44, end: 35.7, word: "Design" },
  { start: 35.7, end: 36.18, word: "into" },
  { start: 36.18, end: 36.38, word: "my" },
  { start: 36.38, end: 36.86, word: "Canva" },
  { start: 36.86, end: 37.1, word: "brand" },
  { start: 37.1, end: 37.34, word: "kit" },
  { start: 37.34, end: 37.8, word: "this" },
  { start: 37.8, end: 38.14, word: "week." },
  { start: 38.56, end: 38.76, word: "Which" },
  { start: 38.76, end: 38.96, word: "tool" },
  { start: 38.96, end: 39.18, word: "are" },
  { start: 39.18, end: 39.42, word: "you" },
  { start: 39.42, end: 39.7, word: "keeping" },
  { start: 39.7, end: 39.96, word: "in" },
  { start: 39.96, end: 40.62, word: "2026?" },
  { start: 41.18, end: 41.32, word: "Drop" },
  { start: 41.32, end: 41.5, word: "it" },
  { start: 41.5, end: 41.68, word: "below." },
];

// Windows where captions are hidden (owned by major components).
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 3.20],     // AnimeHookClip + DeadTakeStrikethrough
  [9.22, 13.92],   // HotTakesFeed owns beat 4
  [14.4, 17.48],   // QuoteCard owns "CANVA'S OWN CEO"
  [17.48, 20.48],  // ExportChipRow owns "Export to Canva is a named feature"
  [20.94, 25.70],  // ComparisonCard + QuoteSlam "PIPELINE"
  [30.94, 33.60],  // StackShipCard owns "pick two or three that play nice and ship"
  [33.94, 38.14],  // PipelineDiagram + BrandKitReveal for credibility beat
  [38.56, 41.68],  // YearToggleCard + CommentPromptCard for CTA
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame given t_start seconds in a 25 fps full-video matte.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_CANVA_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v4.mp4",
  duration: 41.99,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.11,
  events: [
    // ================= BEAT 0 — ANIME HOOK OVERLAY =================
    // 3.2 s anime clip: moonlit graveyard, CANVA tombstone, brunette in
    // blue blazer rising with glowing crystal tablet. Literal visualisation
    // of "Stop saying Canva is dead."
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 3.20,
      src: "hook_anime/canva_rises.mp4",
      startFromSeconds: 0.1,
      label: "CLAUDE DESIGN × CANVA",
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.95, duration: 1.2 },

    // DeadTakeStrikethrough lands AFTER the anime fades out — at beat 1.5
    // during the "tool supposedly killing them" phrase (fires at 4.6s).
    {
      kind: "dead_take_strikethrough",
      t_start: 4.60,
      duration: 1.30,
      preserveWord: "CANVA",
      struckWord: "DEAD",
      strikeStartFrame: 8,
      strikeDurationFrames: 10,
    },
    { kind: "sfx", t_start: 4.58, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.85, duration: 0.9 },

    // Light leak transition anime → a-roll
    { kind: "overlay_video", t_start: 3.05, duration: 0.70, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.95, scale: 1 },
    { kind: "sfx", t_start: 3.02, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ================= BEAT 1-ish — ProfileCard (on opening) =================
    {
      kind: "profile_card",
      t_start: 3.30,
      duration: 1.20,
      name: "Razeen Shaheed",
      followers: "faux.thinker",
      verified: true,
    },
    { kind: "sfx", t_start: 3.28, src: "sfx_pack/click.mp3", volume: 0.9, duration: 0.6 },

    // ================= BEAT 3 — Claude Design name reveal (stacked B-roll) =================
    {
      kind: "stacked_broll",
      t_start: 6.36,
      duration: 2.60,
      brollSrc: "platform_recordings/cd_hero_kb.mp4",
      avatarSrc: "avatar_v4.mp4",
      avatarStartSeconds: 6.36,
      mattedPatternPath: "matted_avatar_v4/mat_%04d.png",
      mattedFirstFrame: matFrame(6.36),
      label: "CLAUDE DESIGN — APR 17",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.25,
      exitDuration: 0.25,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 6.34, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },

    // ================= BEAT 4 — HOT TAKES FEED =================
    // Light leak in
    { kind: "overlay_video", t_start: 8.90, duration: 0.50, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 8.88, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },
    {
      kind: "hot_takes_feed",
      t_start: 9.22,
      duration: 4.70,
      header: "HOT TAKES",
      staggerFrames: 26,
      takes: [
        { name: "Design Bro", handle: "@designbro", timeLabel: "2m", text: "Canva is DEAD. 💀" },
        { name: "Figma Fan",  handle: "@figmafan",  timeLabel: "3m", text: "Figma is COOKED." },
        { name: "AI Hype",    handle: "@ai.hype",   timeLabel: "4m", text: "Design tools are OVER." },
      ],
    },
    { kind: "sfx", t_start: 9.20, src: "sfx_pack/click.mp3", volume: 0.8, duration: 0.6 },

    // ================= BEAT 5 — PROOF: Perkins Quote + Export Chips =================
    // Light leak transition
    { kind: "overlay_video", t_start: 14.05, duration: 0.60, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 14.03, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // EmphasisCaption "CANVA'S OWN CEO" just before the QuoteCard lands
    {
      kind: "emphasis_caption",
      t_start: 14.40,
      duration: 1.30,
      line1: "CANVA'S OWN",
      line2: "CEO",
      precursor: "none",
      yPosition: "upper",
    },
    { kind: "sfx", t_start: 14.38, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 0.9 },

    // QuoteCard — the actual Perkins quote from the Anthropic launch page
    {
      kind: "quote_card",
      t_start: 15.80,
      duration: 4.70,
      quote: "We're excited to build on our collaboration with Claude, making it seamless for people to bring ideas and drafts from Claude Design into Canva.",
      author: "Melanie Perkins",
      role: "Co-Founder & CEO, Canva",
      brandColor: "#00C4CC",
      accentStart: "#00C4CC",
      accentEnd: "#7D2AE8",
    },
    { kind: "sfx", t_start: 15.78, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.6 },

    // ExportChipRow during "Export to Canva is a named feature"
    {
      kind: "export_chip_row",
      t_start: 18.35,
      duration: 2.20,
      header: "EXPORT TO",
      yPercent: 22,
      igniteAtFrame: 14,
      highlightStart: "#00C4CC",
      highlightEnd: "#7D2AE8",
      chips: [
        { label: "PDF" },
        { label: "PPTX" },
        { label: "HTML" },
        { label: "CANVA", prefix: "→", highlight: true },
      ],
    },
    { kind: "sfx", t_start: 18.33, src: "sfx_pack/swoosh_2.mp3", volume: 0.85, duration: 0.6 },

    // ================= BEAT 6 — REFRAME: "It's a PIPELINE" =================
    // Light leak
    { kind: "overlay_video", t_start: 20.60, duration: 0.60, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.95, scale: 1 },
    { kind: "sfx", t_start: 20.58, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ComparisonCard "REPLACEMENT vs PIPELINE"
    {
      kind: "comparison_card",
      t_start: 20.94,
      duration: 2.00,
      header: "IT'S NOT A",
      leftLabel: "REPLACEMENT",
      rightLabel: "PIPELINE",
      toggleAtFrame: 28,
    },

    // QuoteSlam "PIPELINE" — the signature line of the reel
    {
      kind: "quote_slam",
      t_start: 22.50,
      duration: 1.80,
      preLine: "it's a",
      heroWord: "PIPELINE",
      afterNote: "the ones who survive plug in",
      yPosition: "center",
    },
    { kind: "sfx", t_start: 22.48, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 1.0 },

    // ================= BEAT 7 — ADVICE: Stack + SHIP =================
    // Light leak
    { kind: "overlay_video", t_start: 30.40, duration: 0.60, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 30.38, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    {
      kind: "stack_ship_card",
      t_start: 30.94,
      duration: 2.70,
      header: "PICK 2 OR 3",
      shipLabel: "SHIP",
      shipAtFrame: 36,
      tools: [
        { label: "CLAUDE",    glyph: "*", gradientStart: "#D97757", gradientEnd: "#8B4A37" },
        { label: "CANVA",     glyph: "C", gradientStart: "#00C4CC", gradientEnd: "#7D2AE8" },
        { label: "CLAUDE CODE", glyph: ">_", gradientStart: "#141419", gradientEnd: "#0A0A0A" },
      ],
    },
    { kind: "sfx", t_start: 30.92, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.6 },
    // Ship stamp bass hit (when the stamp lands at shipAtFrame=36 → ~34.4s)
    { kind: "sfx", t_start: 32.34, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.80, duration: 0.7 },

    // ================= BEAT 8 — CRED (Pipeline + Brand kit) + CTA =================
    // Light leak
    { kind: "overlay_video", t_start: 33.75, duration: 0.55, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 33.73, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // PipelineDiagram: Claude Design → Canva → Ship
    {
      kind: "pipeline_diagram",
      t_start: 33.94,
      duration: 2.30,
      header: "MY PIPELINE THIS WEEK",
      nodes: [
        { label: "CLAUDE DESIGN", glyph: "✦", gradientStart: "#D97757", gradientEnd: "#8B4A37" },
        { label: "CANVA", logoSrc: "logos/canva_wordmark.svg", gradientStart: "#00C4CC", gradientEnd: "#7D2AE8", highlight: true },
        { label: "SHIP", glyph: "→", gradientStart: "#E91212", gradientEnd: "#FF2A2A" },
      ],
    },

    // BrandKitReveal — faux.thinker kit inside Canva
    {
      kind: "brand_kit_reveal",
      t_start: 36.24,
      duration: 1.90,
      header: "CANVA BRAND KIT",
      brandName: "faux.thinker",
      subtitle: "design system · Apr 2026",
      logoSrc: "logos/webverse.png",
      colors: ["#E91212", "#141419", "#00C4CC"],
      primaryFont: "Archivo Black",
      bodyFont: "Inter",
    },
    { kind: "sfx", t_start: 36.22, src: "sfx_pack/swoosh_3.mp3", volume: 0.85, duration: 0.6 },

    // YearToggleCard — "Keeping in 2026"
    {
      kind: "year_toggle_card",
      t_start: 38.20,
      duration: 2.00,
      header: "KEEPING IN",
      years: [2024, 2025, 2026],
      highlightedYear: 2026,
      subtitle: "THE ONES THAT PLAY NICE",
      yPercent: 18,
      settleAtFrame: 24,
    },
    { kind: "sfx", t_start: 38.18, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.9, duration: 0.8 },

    // CommentPromptCard — final CTA
    {
      kind: "comment_prompt_card",
      t_start: 40.00,
      duration: 1.99,
      username: "faux.thinker",
      header: "DROP IT BELOW",
      prompt: "The tool I'm keeping in 2026 is…",
    },
    { kind: "sfx", t_start: 39.98, src: "sfx/notification.mp3", volume: 0.85, duration: 0.8 },

    // ================= Word captions (filtered) =================
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 41.99,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 85,
    },
  ],
};
