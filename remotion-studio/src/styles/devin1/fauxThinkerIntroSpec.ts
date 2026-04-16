import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker intro Reel — v7.
// Fixes from v6 feedback:
//   - Captions: single-word at a time, strict speech window (no silences),
//     split into two events to avoid overlap with EmphasisCaption and DMToast.
//   - Matted avatar shrunk to PiP (scale 0.55, bottom-right) so platform
//     B-rolls are visibly dominant during the tool reveal.
//   - SFX rebalanced: shutter on light-leak transitions, click on card pops,
//     whoosh retained for B-roll cutaways.
//   - FFmpeg post-process: 0.5 s fade-to-black at end.
//
// Source: D:/video editor/video 1/Video_insta_1 (1).mp4 (31.17s, 25fps).

const ALL_WORDS = [
  { start: 0.0, end: 0.22, word: "I" },
  { start: 0.22, end: 0.36, word: "am" },
  { start: 0.36, end: 0.72, word: "Razeen," },
  { start: 1.1, end: 1.28, word: "solo" },
  { start: 1.28, end: 1.66, word: "founder" },
  { start: 1.66, end: 1.94, word: "of" },
  { start: 1.94, end: 2.56, word: "WebVerse Arena." },
  { start: 3.26, end: 3.4, word: "With" },
  { start: 3.4, end: 3.74, word: "AI" },
  { start: 3.74, end: 4.08, word: "tools" },
  { start: 4.08, end: 4.58, word: "and" },
  { start: 4.58, end: 4.7, word: "a" },
  { start: 4.7, end: 5.04, word: "laptop," },
  { start: 5.48, end: 5.56, word: "I" },
  { start: 5.56, end: 5.72, word: "have" },
  { start: 5.72, end: 6.08, word: "built" },
  { start: 6.08, end: 6.42, word: "voice" },
  { start: 6.42, end: 6.76, word: "agents" },
  { start: 6.76, end: 6.96, word: "for" },
  { start: 6.96, end: 7.24, word: "clinics," },
  { start: 7.92, end: 8.4, word: "automations" },
  { start: 8.4, end: 8.82, word: "that" },
  { start: 8.82, end: 9.06, word: "save" },
  { start: 9.06, end: 9.64, word: "20" },
  { start: 9.64, end: 10.04, word: "-plus" },
  { start: 10.04, end: 10.36, word: "hours" },
  { start: 10.36, end: 10.56, word: "a" },
  { start: 10.56, end: 10.84, word: "week" },
  { start: 10.84, end: 11.36, word: "and" },
  { start: 11.36, end: 11.72, word: "full" },
  { start: 11.72, end: 12.1, word: "apps" },
  { start: 12.1, end: 12.58, word: "shipped" },
  { start: 12.58, end: 12.78, word: "in" },
  { start: 12.78, end: 12.98, word: "days." },
  { start: 13.32, end: 13.44, word: "This" },
  { start: 13.44, end: 13.76, word: "page" },
  { start: 13.76, end: 14.02, word: "is" },
  { start: 14.02, end: 14.24, word: "where" },
  { start: 14.24, end: 14.46, word: "I" },
  { start: 14.46, end: 14.8, word: "share" },
  { start: 14.8, end: 15.2, word: "all" },
  { start: 15.2, end: 15.36, word: "of" },
  { start: 15.36, end: 15.54, word: "it." },
  { start: 16.12, end: 16.28, word: "Real" },
  { start: 16.28, end: 16.58, word: "tutorials" },
  { start: 16.58, end: 17.16, word: "using" },
  { start: 17.16, end: 17.66, word: "n8n," },
  { start: 18.04, end: 18.34, word: "Claude" },
  { start: 18.34, end: 18.58, word: "and" },
  { start: 18.58, end: 18.9, word: "Cursor," },
  { start: 19.78, end: 19.9, word: "real" },
  { start: 19.9, end: 20.16, word: "client" },
  { start: 20.16, end: 20.72, word: "projects," },
  { start: 21.3, end: 21.66, word: "honest" },
  { start: 21.66, end: 22.04, word: "tool" },
  { start: 22.04, end: 22.74, word: "breakdowns," },
  { start: 23.04, end: 23.12, word: "no" },
  { start: 23.12, end: 23.74, word: "sponsorships," },
  // "no fluff" owned by EmphasisCaption.
  { start: 24.92, end: 25.04, word: "If" },
  { start: 25.04, end: 25.18, word: "you" },
  { start: 25.18, end: 25.32, word: "are" },
  { start: 25.32, end: 25.42, word: "a" },
  { start: 25.42, end: 25.68, word: "solo" },
  { start: 25.68, end: 26.12, word: "founder" },
  { start: 26.12, end: 26.46, word: "or" },
  { start: 26.46, end: 26.74, word: "business" },
  { start: 26.74, end: 27.08, word: "owner" },
  { start: 27.08, end: 27.44, word: "figuring" },
  { start: 27.44, end: 27.72, word: "out" },
  { start: 27.72, end: 28.04, word: "AI," },
  // "hit follow. First tutorial drops this week." owned by DMToast visual.
];

// Index 56 = "If" — split point for two caption events.
// Filter out words that fall inside the stacked-B-roll window (16.12–20.72)
// so captions don't overlap the speaker window at the bottom of the split.
const WORDS_ACT_1 = ALL_WORDS
  .slice(0, 57)
  .filter((w) => w.start < 16.12 || w.start >= 20.72); // "I"..."sponsorships,"
const WORDS_ACT_2 = ALL_WORDS.slice(57); // "If"..."AI,"

export const FAUX_THINKER_INTRO_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar.mp4",
  duration: 31.17,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.11,
  events: [
    // ================= UI overlays =================
    // Beat 1 — ProfileCard on "Razeen" (0.36s)
    {
      kind: "profile_card",
      t_start: 0.36,
      duration: 5.2,
      name: "Razeen Shaheed",
      followers: "faux.thinker",
      verified: true,
    },
    { kind: "sfx", t_start: 0.32, src: "sfx_pack/click.mp3", volume: 0.9, duration: 0.6 },

    // Beat 2 — RevenueChart on "20" (9.0s)
    {
      kind: "revenue_chart",
      t_start: 9.0,
      duration: 4.0,
      label: "Hours saved",
      subLabel: "per week",
      growthValue: 20,
      baselineValue: 3,
      axisLeft: "Manual",
      axisRight: "With n8n",
      valuePrefix: "",
      valueSuffix: "h",
    },
    { kind: "sfx", t_start: 8.95, src: "sfx_pack/click.mp3", volume: 0.95, duration: 0.6 },

    // Beat 3 — Tool B-rolls: 4-layer split-stack with matted avatar popping
    // out of the cropped-background rectangle for a 3D effect.
    // Matted frame numbers: matted PNG sequence starts at t=16.8s (frame 1),
    // so for each stacked event: firstFrame = round((t_start - 16.8) * 25) + 1.
    {
      kind: "stacked_broll",
      t_start: 16.8,
      duration: 1.6,
      brollSrc: "platform_recordings/n8n_kenburns.mp4",
      avatarSrc: "avatar.mp4",
      avatarStartSeconds: 16.8,
      mattedPatternPath: "matted_avatar/mat_%04d.png",
      mattedFirstFrame: 1,
      label: "n8n",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.22,
      exitDuration: 0.2,
      brollHeightPercent: 63,
      avatarMargin: 32,
      avatarRadius: 40,
    },
    {
      kind: "stacked_broll",
      t_start: 17.95,
      duration: 1.4,
      brollSrc: "platform_recordings/claude_kenburns.mp4",
      avatarSrc: "avatar.mp4",
      avatarStartSeconds: 17.95,
      mattedPatternPath: "matted_avatar/mat_%04d.png",
      mattedFirstFrame: 29, // round((17.95 - 16.8) * 25) + 1
      label: "Claude",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.2,
      exitDuration: 0.2,
      brollHeightPercent: 63,
      avatarMargin: 32,
      avatarRadius: 40,
    },
    {
      kind: "stacked_broll",
      t_start: 18.85,
      duration: 1.7,
      brollSrc: "platform_recordings/cursor_kenburns.mp4",
      avatarSrc: "avatar.mp4",
      avatarStartSeconds: 18.85,
      mattedPatternPath: "matted_avatar/mat_%04d.png",
      mattedFirstFrame: 52, // round((18.85 - 16.8) * 25) + 1
      label: "Cursor",
      enter: "fade",
      exit: "slide_down",
      enterDuration: 0.2,
      exitDuration: 0.25,
      brollHeightPercent: 63,
      avatarMargin: 32,
      avatarRadius: 40,
    },
    // SFX: whoosh on each cutaway entry.
    { kind: "sfx", t_start: 16.78, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },
    { kind: "sfx", t_start: 17.93, src: "sfx_pack/swoosh_2.mp3", volume: 0.85, duration: 0.6 },
    { kind: "sfx", t_start: 18.83, src: "sfx_pack/swoosh_3.mp3", volume: 0.85, duration: 0.6 },

    // Beat 4 — "NO FLUFF" emphasis caption. Blue Energy Shockwave removed.
    // New attention-grabbing sound: cinematic BRAAM + sub-bass hit combo.
    {
      kind: "emphasis_caption",
      t_start: 24.16,
      duration: 2.4,
      line1: "NO",
      line2: "FLUFF",
      precursor: "none",
    },
    { kind: "sfx", t_start: 24.14, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 0.9 },

    // Beat 5 — DMToast on "hit follow" (28.5s)
    {
      kind: "dm_toast",
      t_start: 28.5,
      duration: 2.7,
      username: "faux.thinker",
      message: "First tutorial drops this week",
      timeLabel: "now",
    },
    { kind: "sfx", t_start: 28.48, src: "sfx/notification.mp3", volume: 0.85, duration: 0.8 },

    // ================= Light leak transitions (with shutter SFX) =================
    { kind: "overlay_video", t_start: 5.7, duration: 0.7, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 5.68, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.6 },

    { kind: "overlay_video", t_start: 13.3, duration: 0.8, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 13.28, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.6 },

    { kind: "overlay_video", t_start: 20.7, duration: 0.8, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 20.68, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.6 },

    { kind: "overlay_video", t_start: 23.4, duration: 0.7, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 23.38, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    { kind: "overlay_video", t_start: 26.6, duration: 0.8, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 26.58, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.6 },

    // ================= Word captions (two events, single word at a time) =================
    // Act 1: hook → proof → tools (stops before "no fluff").
    {
      kind: "word_captions",
      t_start: 0.36,
      duration: 23.38, // Ends at 23.74
      words: WORDS_ACT_1,
      windowSize: 1,
      yPercent: 78,
    },
    // Act 2: between emphasis caption and DM toast.
    {
      kind: "word_captions",
      t_start: 24.92,
      duration: 3.12, // Ends at 28.04 — DM toast takes over at 28.5
      words: WORDS_ACT_2,
      windowSize: 1,
      yPercent: 78,
    },
  ],
};
