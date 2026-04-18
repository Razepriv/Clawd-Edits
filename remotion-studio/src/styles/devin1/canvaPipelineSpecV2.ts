import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker Canva/Claude-Design pipeline reel — v2 re-cut.
//
// Source: D:/video editor/Videos/video_4.mp4 -> public/avatar_v4.mp4
// 42 s, 1080x1920 @ 25 fps.
//
// EDIT PLAN DIFF vs v1:
//   - 0-2 s hook = split-screen textual contradiction (NO face). Avatar
//     enters in scene 2, not scene 1.
//   - 0-3 s = DateTag "APRIL 17, 2026 · CLAUDE DESIGN LAUNCH" top-center.
//   - 4-7 s = AnthropicPageScroll (simulated browser scroll + cursor
//     landing on "Claude Design" headline).
//   - 10-14 s = 3 X hot-take screenshots flash-cut (real X-style cards
//     with blurred handles; swap imageSrc once real grabs are captured).
//   - 14-18 s = AnthropicPageScroll down to Perkins quote section.
//   - 17-20 s = QuoteCard with the verbatim Melanie Perkins line.
//   - 18-22 s = ExportChipRow (zoom-equivalent on "Export anywhere").
//   - 20-23 s = SaveMomentSlate "It's not a replacement. It's a pipeline."
//     (3 full seconds hold).
//   - 27-32 s = NumberedList "Stop tool-hopping / Pick 2-3 / Ship".
//   - 29-34 s = Canva dashboard proof shot (canva_editor_kb B-roll).
//   - 33-37 s = QuestionCaption "Which tool are you keeping in 2026?"
//
// SAFE ZONES:
//   - Overlays live in middle 70 % horizontal (x 162..918).
//   - No text in top 10 % (y 0..192) or bottom 20 % (y 1536..1920).
//   - Right 15 % (x 918..1080) avoided for IG action buttons.
//   - Word captions at yPercent 80 (1536 px) — RIGHT AT the bottom-20 %
//     boundary; reduced further down in v2 to yPercent 78 to keep them
//     inside the safe zone.
//
// Style: faux.thinker v12.4 — adds 7 new components on top of v12.3.
//
// Whisper mishears corrected (same as v1): Kanwa → Canva, PidgeDex → pitch decks.

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

// Windows where WordCaptions should be hidden (owned by hero components
// that already carry the verbal content).
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 3.20],     // SplitScreenContradiction hook
  [4.0, 8.40],     // AnthropicPageScroll (Claude Design headline)
  [9.22, 13.92],   // X Hot Takes flash-cut trio
  [14.4, 20.48],   // AnthropicPageScroll (Perkins) + QuoteCard + ExportChipRow
  [20.0, 23.30],   // SaveMomentSlate 3-second hold
  [26.26, 32.80],  // NumberedList — "the rule of three"
  [32.80, 37.50],  // Canva-editor proof shot window
  [33.00, 37.50],  // QuestionCaption hold (overlaps proof shot)
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame given t_start seconds in a 25 fps full-video matte.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_CANVA_V2_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v4.mp4",
  duration: 41.99,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.11,
  events: [
    // ═════════════════════════════════════════════════════════════════════
    // BEAT 0-1 — HOOK (0-3 s) : SplitScreenContradiction (text-only, no face)
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "split_screen_contradiction",
      t_start: 0.0,
      duration: 3.20,
      leftLabel: "THE TAKE",
      leftBody: "CANVA IS DEAD.",
      rightLabel: "THE LAUNCH",
      rightBody:
        "We're excited to build on our collaboration with Claude — bringing Claude Design into Canva.",
      rightAuthor: "Melanie Perkins",
      rightRole: "Co-Founder & CEO, Canva",
    },
    // DateTag stays through the hook into beat 2
    {
      kind: "date_tag",
      t_start: 0.0,
      duration: 3.20,
      text: "APR 17, 2026 · CLAUDE DESIGN LAUNCH",
      glyph: "✦",
      topPx: 220,
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.95, duration: 1.1 },

    // Light-leak transition from hook → avatar (3.05-3.75)
    { kind: "overlay_video", t_start: 3.05, duration: 0.70, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.95, scale: 1 },
    { kind: "sfx", t_start: 3.03, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 3 — AnthropicPageScroll #1 (4-8.4 s) : cursor lands on
    // "Introducing Claude Design by Anthropic Labs" headline
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "anthropic_page_scroll",
      t_start: 4.00,
      duration: 4.40,
      imageSrc: "platform_recordings/claude_design_hero.png",
      startScrollY: 0,
      endScrollY: 120,
      cursorLandX: 450,
      cursorLandY: 520,
      cursorLandAtFrame: 70, // ~2.8 s in → before exit
      highlightBox: { xPct: 14, yPct: 24, wPct: 72, hPct: 10 },
    },
    { kind: "sfx", t_start: 3.98, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },
    { kind: "sfx", t_start: 6.80, src: "sfx_pack/click.mp3", volume: 0.9, duration: 0.4 },

    // Light-leak into hot-take sequence
    { kind: "overlay_video", t_start: 8.80, duration: 0.60, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 8.78, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 4 — 3× X hot-take flash-cut (10-14 s), one per VO word
    // "Canva dead" / "Figma cooked" / "design tools over".
    // Real screenshots drop in via imageSrc when captured; mocks in the
    // meantime. Handles blurred per edit-plan brief.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 10.70,
      duration: 1.30,
      name: "design_bro",
      handle: "@designbro_xyz",
      blurHandle: true,
      text: "Canva is DEAD. Claude Design killed it overnight. 💀",
      timeLabel: "2h",
      likes: 2400,
      retweets: 512,
      replies: 143,
      avatarStart: "#FF3B79",
      avatarEnd: "#7D2AE8",
    },
    { kind: "sfx", t_start: 10.68, src: "sfx_pack/hit_1.mp3", volume: 0.85, duration: 0.5 },
    {
      kind: "x_hot_take_flashcut",
      t_start: 11.78,
      duration: 1.30,
      name: "figma_dev",
      handle: "@figma_____dev",
      blurHandle: true,
      text: "Figma is COOKED. Nobody's opening Figma in 6 months.",
      timeLabel: "4h",
      likes: 890,
      retweets: 203,
      replies: 67,
      avatarStart: "#00C4CC",
      avatarEnd: "#5B8EFF",
    },
    { kind: "sfx", t_start: 11.76, src: "sfx_pack/hit_2.mp3", volume: 0.85, duration: 0.5 },
    {
      kind: "x_hot_take_flashcut",
      t_start: 12.88,
      duration: 1.50,
      name: "ai_hype",
      handle: "@ai_____hype_",
      blurHandle: true,
      text: "Design tools are OVER. One Claude prompt replaces the entire stack.",
      timeLabel: "5h",
      likes: 1740,
      retweets: 421,
      replies: 198,
      avatarStart: "#FFB020",
      avatarEnd: "#FF3B3B",
    },
    { kind: "sfx", t_start: 12.86, src: "sfx_pack/hit_1.mp3", volume: 0.85, duration: 0.5 },

    // Light-leak back to page scroll
    { kind: "overlay_video", t_start: 14.10, duration: 0.55, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 14.08, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 5 — AnthropicPageScroll #2 (14.4-17.5 s) : scroll down to the
    // Perkins quote section + highlight ring.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "anthropic_page_scroll",
      t_start: 14.40,
      duration: 3.10,
      imageSrc: "platform_recordings/claude_design_perkins_quote.png",
      startScrollY: 0,
      endScrollY: 60,
      cursorLandX: 300,
      cursorLandY: 700,
      cursorLandAtFrame: 60,
      highlightBox: { xPct: 12, yPct: 28, wPct: 42, hPct: 40 },
    },
    { kind: "sfx", t_start: 14.38, src: "sfx_pack/swoosh_2.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 5b — QuoteCard (17.3-20.3 s) : pulled Perkins quote as a clean
    // pull-quote overlay.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "quote_card",
      t_start: 17.30,
      duration: 3.00,
      quote:
        "We're excited to build on our collaboration with Claude, making it seamless for people to bring ideas and drafts from Claude Design into Canva.",
      author: "Melanie Perkins",
      role: "Co-Founder & CEO, Canva",
      brandColor: "#00C4CC",
      accentStart: "#00C4CC",
      accentEnd: "#7D2AE8",
    },
    { kind: "sfx", t_start: 17.28, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 5c — ExportChipRow (18.4-20.4 s) : zoom-equivalent on
    // "Export anywhere" section — PDF / PPTX / HTML + Canva igniting.
    // Anchored higher (yPercent 70) so it sits BELOW the QuoteCard.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "export_chip_row",
      t_start: 18.40,
      duration: 2.00,
      header: "EXPORT TO",
      yPercent: 72,
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

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 6 — SaveMomentSlate (20.0-23.3 s) : 3-second hold of
    // "It's not a replacement. It's a pipeline."
    // Dims the frame behind; highest priority overlay.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "save_moment_slate",
      t_start: 20.00,
      duration: 3.30,
      kicker: "THE THESIS",
      text: "It's not a replacement. It's a pipeline.",
      highlight: "pipeline",
      hint: "SAVE THIS — YOUR 2026 STRATEGY",
      dimOpacity: 0.82,
    },
    { kind: "sfx", t_start: 19.98, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 1.1 },

    // Light-leak into advice beat
    { kind: "overlay_video", t_start: 23.25, duration: 0.60, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 23.23, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 7 — NumberedList (26.3-32.8 s) : "1. Stop tool-hopping
    // 2. Pick 2–3 that talk to each other  3. Ship"
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "numbered_list",
      t_start: 26.30,
      duration: 6.50,
      header: "THE RULE OF THREE",
      staggerFrames: 12,
      // Centered horizontally + below the face (y 62 % = y 1190 px) so the
      // card stays in the safe zone without covering the speaker.
      centered: true,
      yPercent: 62,
      cardWidth: 720,
      items: [
        { text: "Stop tool-hopping",          highlight: "Stop" },
        { text: "Pick 2–3 that talk to each other", highlight: "talk to each other" },
        { text: "Ship",                       highlight: "Ship" },
      ],
    },
    { kind: "sfx", t_start: 26.28, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 8a — Canva dashboard proof shot (29-34 s) : stacked B-roll of
    // the Canva editor (from the YouTube demo). Sits UNDER the still-lit
    // NumberedList for the overlap window.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 29.00,
      duration: 5.00,
      brollSrc: "platform_recordings/canva_editor_kb.mp4",
      avatarSrc: "avatar_v4.mp4",
      avatarStartSeconds: 29.00,
      mattedPatternPath: "matted_avatar_v4/mat_%04d.png",
      mattedFirstFrame: matFrame(29.00),
      label: "MY CANVA · THIS WEEK",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.28,
      exitDuration: 0.30,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 28.98, src: "sfx_pack/swoosh_3.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 9 — QuestionCaption (34.5-38.5 s) : pinned question
    // "Which tool are you keeping in 2026?" with 2026 highlighted.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "question_caption",
      t_start: 34.50,
      duration: 4.00,
      text: "Which tool are you keeping in 2026?",
      highlight: "2026",
      subtitle: "DROP IT BELOW \u2193",
      // Centered horizontally (component default) + positioned BELOW the
      // face (y 64 % = y 1229 px) so the speaker stays fully visible.
      yPercent: 64,
    },
    { kind: "sfx", t_start: 34.48, src: "sfx/notification.mp3", volume: 0.85, duration: 0.7 },

    // Light-leak into CTA tail
    { kind: "overlay_video", t_start: 38.50, duration: 0.55, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 38.48, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // Final CommentPromptCard (kept from v1 for CTA delivery)
    {
      kind: "comment_prompt_card",
      t_start: 39.00,
      duration: 2.99,
      username: "faux.thinker",
      header: "DROP IT BELOW",
      prompt: "The tool I'm keeping in 2026 is…",
    },

    // ═════════════════════════════════════════════════════════════════════
    // Word captions — single-word red, tight to bottom safe zone (y 78 %).
    // Filtered out of the 8 hidden windows above.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 41.99,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 78,
    },
  ],
};
