import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker Claude Opus 4.7 launch Reel — v1.
//
// Source: D:/video editor/Video 2/Video_insta_2.mp4 -> public/avatar_opus.mp4
//   duration 79.17s, 1080x1920, 25 fps, AAC 48kHz stereo, single continuous
//   avatar shot, no cuts in source.
//
// Narrative (11 beats):
//   1  HOOK            0.00-10.40  Anthropic dropped a new Claude model ...
//   2  PROMISE        10.96-12.96  Here is everything you need in 60 seconds.
//   3  NAME REVEAL    13.32-15.94  It is called Claude Opus 4.7.
//   4  CONTEXT MYTHOS 16.42-23.46  Mythos is still locked away ...
//   5  PROOF STAT 1   23.66-29.54  Benchmark 58% -> 70%  (CursorBench)
//   6  PROOF STAT 2   30.00-34.96  Rakuten 3x more production tasks
//   7  WARN BREAKING  35.64-39.76  Not a small update. Old prompts might break.
//   8  WARN LITERAL   40.08-47.50  4.7 follows instructions literally now.
//   9  WARN COST      47.86-55.24  Your API bill is going up.
//  10  HIDDEN INSIGHT 55.62-70.64  Low-effort 4.7 ~= medium-effort 4.6.
//  11  CRED + CTA     70.96-78.90  Comment "Opus" for prompt template.
//
// Style: faux.thinker v12 locked (see brand-kit/FAUX_THINKER_STYLE_GUIDE.md)
//   - ProfileCard anchored to start (no name spoken, introduces creator).
//   - 6 SplitStackBroll head-pop-out cutaways (Opus hero / Mythos / Rakuten /
//     Literal / API pricing / Effort chart) using the v12 canonical 3-layer
//     head-pop-out: full B-roll + lower floating frame card + matted speaker
//     with only HEAD breaking above frame top.
//   - 1 RevenueChart animated 58 -> 70 on CursorBench.
//   - 4 EmphasisCaption slams (OPUS 4.7 / NOT A SMALL UPDATE / LITERALLY /
//     LESS MONEY) — all per user request (overrides single-slam convention).
//   - DMToast CTA "Comment Opus -> prompt template v4.7".
//   - Single-word captions (Archivo Black, red accent on active word).
//   - Light leaks + shutter SFX between beats.
//
// Whisper mishears corrected:
//   - "with setting" -> "which setting" (beat 10, word index ~173)

type Word = { start: number; end: number; word: string };

// Full word list from faster-whisper (base) with inline mishear fix.
const ALL_WORDS: Word[] = [
  // Beat 1 HOOK
  { start: 0.00, end: 0.56, word: "Anthropic" },
  { start: 0.56, end: 0.90, word: "dropped" },
  { start: 0.90, end: 1.30, word: "a" },
  { start: 1.30, end: 1.58, word: "new" },
  { start: 1.58, end: 1.94, word: "Claude" },
  { start: 1.94, end: 2.08, word: "model" },
  { start: 2.08, end: 2.76, word: "three" },
  { start: 2.76, end: 3.08, word: "hours" },
  { start: 3.08, end: 3.42, word: "ago." },
  { start: 3.90, end: 4.14, word: "It" },
  { start: 4.14, end: 4.36, word: "is" },
  { start: 4.36, end: 4.66, word: "the" },
  { start: 4.66, end: 4.96, word: "second" },
  { start: 4.96, end: 5.22, word: "best" },
  { start: 5.22, end: 5.56, word: "model" },
  { start: 5.56, end: 5.92, word: "they" },
  { start: 5.92, end: 6.18, word: "have" },
  { start: 6.18, end: 6.50, word: "ever" },
  { start: 6.50, end: 6.76, word: "built" },
  { start: 7.14, end: 7.34, word: "and" },
  { start: 7.34, end: 7.58, word: "most" },
  { start: 7.58, end: 7.92, word: "people" },
  { start: 7.92, end: 8.12, word: "are" },
  { start: 8.12, end: 8.42, word: "going" },
  { start: 8.42, end: 8.62, word: "to" },
  { start: 8.62, end: 8.98, word: "miss" },
  { start: 8.98, end: 9.22, word: "what" },
  { start: 9.22, end: 9.58, word: "actually" },
  { start: 9.58, end: 10.40, word: "matters." },
  // Beat 2 PROMISE
  { start: 10.96, end: 11.18, word: "Here" },
  { start: 11.18, end: 11.38, word: "is" },
  { start: 11.38, end: 11.72, word: "everything" },
  { start: 11.72, end: 11.92, word: "you" },
  { start: 11.92, end: 12.18, word: "need" },
  { start: 12.18, end: 12.42, word: "in" },
  { start: 12.42, end: 12.60, word: "60" },
  { start: 12.60, end: 12.96, word: "seconds." },
  // Beat 3 NAME REVEAL (13.32-15.94) — hidden under EmphasisCaption + B-roll
  { start: 13.32, end: 13.48, word: "It" },
  { start: 13.48, end: 13.70, word: "is" },
  { start: 13.70, end: 14.02, word: "called" },
  { start: 14.02, end: 14.34, word: "Claude" },
  { start: 14.34, end: 14.80, word: "Opus" },
  { start: 14.80, end: 15.18, word: "4" },
  { start: 15.18, end: 15.66, word: "." },
  { start: 15.66, end: 15.94, word: "7." },
  // Beat 4 MYTHOS (16.42-23.46) — under B-roll
  { start: 16.42, end: 16.68, word: "The" },
  { start: 16.68, end: 16.96, word: "best" },
  { start: 16.96, end: 17.30, word: "model" },
  { start: 17.30, end: 17.96, word: "Mythos" },
  { start: 17.96, end: 18.30, word: "is" },
  { start: 18.30, end: 18.62, word: "still" },
  { start: 18.62, end: 19.18, word: "locked" },
  { start: 19.18, end: 19.46, word: "away." },
  { start: 20.02, end: 20.30, word: "Anthropic" },
  { start: 20.30, end: 20.68, word: "is" },
  { start: 20.68, end: 21.00, word: "testing" },
  { start: 21.00, end: 21.42, word: "safety" },
  { start: 21.42, end: 21.72, word: "stuff" },
  { start: 21.72, end: 22.04, word: "on" },
  { start: 22.04, end: 22.46, word: "4" },
  { start: 22.46, end: 22.82, word: "." },
  { start: 22.82, end: 23.18, word: "7" },
  { start: 23.18, end: 23.46, word: "first." },
  // Beat 5 STAT (23.66-29.54) — during RevenueChart
  { start: 23.66, end: 23.82, word: "It" },
  { start: 23.82, end: 24.06, word: "is" },
  { start: 24.06, end: 24.28, word: "a" },
  { start: 24.28, end: 24.48, word: "real" },
  { start: 24.48, end: 24.92, word: "jump." },
  { start: 25.22, end: 25.54, word: "Claude's" },
  { start: 25.54, end: 25.90, word: "own" },
  { start: 25.90, end: 26.34, word: "benchmark" },
  { start: 26.34, end: 26.72, word: "went" },
  { start: 26.72, end: 26.92, word: "from" },
  { start: 26.92, end: 27.52, word: "58%" },
  { start: 27.52, end: 27.94, word: "to" },
  { start: 27.94, end: 29.54, word: "70%." },
  // Beat 6 RAKUTEN (30.00-34.96) — under B-roll
  { start: 30.00, end: 30.52, word: "Rakuten" },
  { start: 30.52, end: 30.80, word: "says" },
  { start: 30.80, end: 30.98, word: "it" },
  { start: 30.98, end: 31.24, word: "solves" },
  { start: 31.24, end: 31.60, word: "3x" },
  { start: 31.60, end: 31.92, word: "more" },
  { start: 31.92, end: 32.34, word: "production" },
  { start: 32.34, end: 32.76, word: "tasks" },
  { start: 32.76, end: 33.14, word: "than" },
  { start: 33.14, end: 33.36, word: "the" },
  { start: 33.36, end: 33.62, word: "last" },
  { start: 33.62, end: 34.96, word: "version." },
  // Beat 7 WARN BREAKING (35.64-39.76) — emphasis + some caption
  { start: 35.64, end: 35.88, word: "This" },
  { start: 35.88, end: 36.04, word: "is" },
  { start: 36.04, end: 36.22, word: "not" },
  { start: 36.22, end: 36.36, word: "a" },
  { start: 36.36, end: 36.68, word: "small" },
  { start: 36.68, end: 37.08, word: "update." },
  { start: 37.48, end: 37.70, word: "Your" },
  { start: 37.70, end: 37.98, word: "old" },
  { start: 37.98, end: 38.34, word: "prompts" },
  { start: 38.34, end: 38.82, word: "might" },
  { start: 38.82, end: 39.76, word: "break." },
  // Beat 8 LITERAL (40.08-47.50) — under B-roll
  { start: 40.08, end: 40.48, word: "4" },
  { start: 40.48, end: 40.86, word: "." },
  { start: 40.86, end: 41.12, word: "7" },
  { start: 41.12, end: 41.50, word: "follows" },
  { start: 41.50, end: 41.94, word: "instructions" },
  { start: 41.94, end: 42.58, word: "literally" },
  { start: 42.58, end: 42.74, word: "now." },
  { start: 42.98, end: 43.20, word: "The" },
  { start: 43.20, end: 43.48, word: "lazy" },
  { start: 43.48, end: 43.96, word: "prompts" },
  { start: 43.96, end: 44.24, word: "you" },
  { start: 44.24, end: 44.48, word: "wrote" },
  { start: 44.48, end: 44.92, word: "six" },
  { start: 45.38, end: 45.72, word: "months" },
  { start: 45.72, end: 46.08, word: "ago," },
  { start: 46.08, end: 46.40, word: "retune" },
  { start: 46.40, end: 46.68, word: "them" },
  { start: 46.68, end: 46.98, word: "or" },
  { start: 46.98, end: 47.22, word: "get" },
  { start: 47.22, end: 47.50, word: "weird" },
  { start: 47.50, end: 47.86, word: "results." },
  // Beat 9 API BILL (47.86-55.24) — under B-roll
  { start: 47.86, end: 48.10, word: "Your" },
  { start: 48.10, end: 48.36, word: "API" },
  { start: 48.36, end: 48.70, word: "bill" },
  { start: 48.70, end: 48.92, word: "is" },
  { start: 48.92, end: 49.18, word: "going" },
  { start: 49.18, end: 49.36, word: "up." },
  { start: 49.92, end: 50.22, word: "New" },
  { start: 50.22, end: 50.66, word: "tokenizer," },
  { start: 50.66, end: 51.00, word: "more" },
  { start: 51.00, end: 51.42, word: "thinking," },
  { start: 51.42, end: 51.74, word: "more" },
  { start: 51.74, end: 52.08, word: "output" },
  { start: 52.08, end: 52.56, word: "tokens." },
  { start: 53.58, end: 53.86, word: "Cost" },
  { start: 53.86, end: 54.22, word: "control" },
  { start: 54.22, end: 54.48, word: "is" },
  { start: 54.48, end: 54.68, word: "on" },
  { start: 54.68, end: 54.92, word: "you" },
  { start: 54.92, end: 55.24, word: "now." },
  // Beat 10 HIDDEN INSIGHT (55.62-70.64) — under B-roll + emphasis
  { start: 55.62, end: 55.88, word: "And" },
  { start: 55.88, end: 56.08, word: "here" },
  { start: 56.08, end: 56.30, word: "is" },
  { start: 56.30, end: 56.46, word: "the" },
  { start: 56.46, end: 56.70, word: "part" },
  { start: 56.70, end: 57.04, word: "nobody" },
  { start: 57.04, end: 57.22, word: "is" },
  { start: 57.22, end: 57.44, word: "talking" },
  { start: 57.44, end: 57.62, word: "about." },
  { start: 58.50, end: 58.84, word: "Low" },
  { start: 58.84, end: 59.28, word: "effort" },
  { start: 59.28, end: 59.62, word: "4" },
  { start: 59.62, end: 60.00, word: "." },
  { start: 60.00, end: 60.30, word: "7" },
  { start: 60.30, end: 60.52, word: "is" },
  { start: 60.52, end: 61.00, word: "basically" },
  { start: 61.00, end: 61.22, word: "the" },
  { start: 61.22, end: 61.52, word: "same" },
  { start: 61.52, end: 61.96, word: "quality" },
  { start: 61.96, end: 62.26, word: "as" },
  { start: 62.26, end: 62.74, word: "medium" },
  { start: 62.74, end: 63.10, word: "effort" },
  { start: 63.10, end: 63.44, word: "4" },
  { start: 63.44, end: 63.80, word: "." },
  { start: 63.80, end: 64.30, word: "6." },
  { start: 64.94, end: 65.26, word: "Meaning" },
  { start: 65.26, end: 65.46, word: "you" },
  { start: 65.46, end: 65.68, word: "can" },
  { start: 65.68, end: 65.92, word: "get" },
  { start: 65.92, end: 66.22, word: "better" },
  { start: 66.22, end: 66.52, word: "work" },
  { start: 66.52, end: 66.80, word: "for" },
  { start: 66.80, end: 67.20, word: "less" },
  { start: 67.20, end: 67.68, word: "money" },
  { start: 67.68, end: 67.90, word: "if" },
  { start: 67.90, end: 68.06, word: "you" },
  { start: 68.06, end: 68.28, word: "know" },
  { start: 68.28, end: 68.58, word: "which" }, // was "with" in Whisper — corrected
  { start: 68.58, end: 68.94, word: "setting" },
  { start: 68.94, end: 69.18, word: "to" },
  { start: 69.18, end: 70.64, word: "use." },
  // Beat 11 CTA (70.96-78.90)
  { start: 70.96, end: 71.20, word: "I" },
  { start: 71.20, end: 71.46, word: "am" },
  { start: 71.46, end: 71.92, word: "rebuilding" },
  { start: 71.92, end: 72.24, word: "three" },
  { start: 72.24, end: 72.44, word: "of" },
  { start: 72.44, end: 72.62, word: "my" },
  { start: 72.62, end: 73.00, word: "client" },
  { start: 73.00, end: 73.42, word: "automations" },
  { start: 73.42, end: 73.62, word: "on" },
  { start: 73.62, end: 73.80, word: "this" },
  { start: 73.80, end: 73.80, word: "today." },
  { start: 74.46, end: 74.74, word: "Comment" },
  { start: 74.74, end: 74.94, word: "the" },
  { start: 74.94, end: 75.16, word: "word" },
  { start: 75.16, end: 75.60, word: "Opus" },
  { start: 75.60, end: 75.80, word: "and" },
  { start: 75.80, end: 75.94, word: "I" },
  { start: 75.94, end: 76.08, word: "will" },
  { start: 76.08, end: 76.24, word: "send" },
  { start: 76.24, end: 76.42, word: "you" },
  { start: 76.42, end: 76.60, word: "my" },
  { start: 76.60, end: 77.06, word: "updated" },
  { start: 77.06, end: 77.36, word: "prompt" },
  { start: 77.36, end: 77.76, word: "template" },
  { start: 77.76, end: 78.20, word: "for" },
  { start: 78.20, end: 78.44, word: "4" },
  { start: 78.44, end: 78.90, word: "." },
  { start: 78.70, end: 78.90, word: "7." },
];

// Windows where captions should be hidden (owned by B-roll labels,
// EmphasisCaptions or DMToast).
const HIDDEN_WINDOWS: [number, number][] = [
  [13.32, 15.94], // B-roll 1 + Emphasis OPUS 4.7
  [16.42, 23.46], // B-roll 2 Mythos
  [30.00, 34.96], // B-roll 3 Rakuten
  [36.00, 38.50], // Emphasis NOT A SMALL UPDATE
  [40.08, 47.50], // B-roll 4 Literal (emphasis LITERALLY at 42.0-44.0 sits inside)
  [47.86, 55.24], // B-roll 5 API bill
  [55.62, 70.64], // B-roll 6 Effort chart + emphasis LESS MONEY
  [72.50, 76.10], // DMToast window
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame given t_start seconds in a 25fps full-video matte.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_OPUS_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_opus.mp4",
  duration: 79.17,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.11,
  events: [
    // ================= BEAT 1 — ProfileCard (hook) =================
    {
      kind: "profile_card",
      t_start: 0.4,
      duration: 5.0,
      name: "Razeen Shaheed",
      followers: "faux.thinker",
      verified: true,
    },
    { kind: "sfx", t_start: 0.36, src: "sfx_pack/click.mp3", volume: 0.9, duration: 0.6 },

    // ================= BEAT 3 — OPUS 4.7 reveal (B-roll only — slam removed
    // because the B-roll label already shows "OPUS 4.7" over the speaker) ====
    {
      kind: "stacked_broll",
      t_start: 13.32,
      duration: 2.62,
      brollSrc: "platform_recordings/opus_hero_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 13.32,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(13.32),
      label: "OPUS 4.7",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.2,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 13.30, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },

    // ================= BEAT 4 — Mythos context (B-roll) =================
    {
      kind: "stacked_broll",
      t_start: 16.42,
      duration: 7.04,
      brollSrc: "platform_recordings/opus_mythos_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 16.42,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(16.42),
      label: "MYTHOS",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.22,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 16.40, src: "sfx_pack/swoosh_2.mp3", volume: 0.88, duration: 0.6 },

    // ================= BEAT 5 — RevenueChart 58 -> 70 (Claudebench) =================
    // growthOnRight: true so the 58% (grey, baseline) sits on the LEFT next to
    // "Opus 4.6" and the 70% (green, growth) sits on the RIGHT next to "Opus
    // 4.7" — matches the script's left-to-right "went from 58% to 70%" flow.
    {
      kind: "revenue_chart",
      t_start: 23.66,
      duration: 5.88,
      label: "Claudebench",
      subLabel: "Opus 4.6 -> 4.7",
      growthValue: 70,
      baselineValue: 58,
      axisLeft: "Opus 4.6",
      axisRight: "Opus 4.7",
      valuePrefix: "",
      valueSuffix: "%",
      growthOnRight: true,
    },
    { kind: "sfx", t_start: 23.62, src: "sfx_pack/click.mp3", volume: 0.95, duration: 0.6 },

    // ================= BEAT 6 — Rakuten 3x (B-roll) =================
    {
      kind: "stacked_broll",
      t_start: 30.00,
      duration: 4.96,
      brollSrc: "platform_recordings/opus_rakuten_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 30.00,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(30.00),
      label: "Rakuten",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.2,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 29.98, src: "sfx_pack/swoosh_3.mp3", volume: 0.88, duration: 0.6 },

    // ================= BEAT 7 — NOT A SMALL UPDATE (emphasis) =================
    {
      kind: "emphasis_caption",
      t_start: 36.00,
      duration: 2.60,
      line1: "NOT A SMALL",
      line2: "UPDATE",
      precursor: "none",
    },
    { kind: "sfx", t_start: 35.98, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 0.9 },

    // ================= BEAT 8 — LITERALLY (B-roll + emphasis) =================
    {
      kind: "stacked_broll",
      t_start: 40.08,
      duration: 7.42,
      brollSrc: "platform_recordings/opus_literal_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 40.08,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(40.08),
      label: "LITERALLY",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.22,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 40.06, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },
    // "TAKES IT / LITERALLY" emphasis slam removed — the B-roll label above
    // already reads "LITERALLY" over the speaker, so the slam was redundant
    // AND landing directly on Razeen's head inside the head-pop-out frame.

    // ================= BEAT 9 — API BILL (B-roll) =================
    {
      kind: "stacked_broll",
      t_start: 47.86,
      duration: 7.38,
      brollSrc: "platform_recordings/opus_pricing_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 47.86,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(47.86),
      label: "$5 / $25 per MTok",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.22,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 47.84, src: "sfx_pack/swoosh_2.mp3", volume: 0.88, duration: 0.6 },

    // ================= BEAT 10 — EFFORT CHART (B-roll) + LESS MONEY (emphasis) =================
    {
      kind: "stacked_broll",
      t_start: 55.62,
      duration: 15.02,
      brollSrc: "platform_recordings/opus_effort_kenburns.mp4",
      avatarSrc: "avatar_opus.mp4",
      avatarStartSeconds: 55.62,
      mattedPatternPath: "matted_avatar_opus/mat_%04d.png",
      mattedFirstFrame: matFrame(55.62),
      label: "EFFORT LEVELS",
      enter: "fade",
      exit: "slide_down",
      enterDuration: 0.22,
      exitDuration: 0.28,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 55.60, src: "sfx_pack/swoosh_3.mp3", volume: 0.88, duration: 0.6 },
    // "LESS / MONEY" slam — moved to yPosition "upper" so it lands in the
    // clean B-roll zone (the Effort chart) above Razeen's head-pop-out.
    {
      kind: "emphasis_caption",
      t_start: 66.80,
      duration: 2.40,
      line1: "LESS",
      line2: "MONEY",
      precursor: "none",
      yPosition: "upper",
    },
    { kind: "sfx", t_start: 66.78, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 0.9 },

    // ================= BEAT 11 — DMToast CTA =================
    {
      kind: "dm_toast",
      t_start: 72.60,
      duration: 3.50,
      username: "faux.thinker",
      message: "Comment \"Opus\" → prompt template for 4.7",
      timeLabel: "now",
    },
    { kind: "sfx", t_start: 72.58, src: "sfx/notification.mp3", volume: 0.85, duration: 0.8 },

    // ================= Light leak transitions (with shutter SFX) =================
    { kind: "overlay_video", t_start: 10.70, duration: 0.70, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 10.68, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    { kind: "overlay_video", t_start: 23.00, duration: 0.70, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 22.98, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    { kind: "overlay_video", t_start: 29.60, duration: 0.70, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 29.58, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    { kind: "overlay_video", t_start: 35.20, duration: 0.70, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 35.18, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    { kind: "overlay_video", t_start: 55.10, duration: 0.75, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 55.08, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    { kind: "overlay_video", t_start: 70.70, duration: 0.70, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 70.68, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ================= Word captions (one event covering whole video; words are
    // pre-filtered so they only fire outside the HIDDEN_WINDOWS above) =================
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 79.17,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 78,
    },
  ],
};
