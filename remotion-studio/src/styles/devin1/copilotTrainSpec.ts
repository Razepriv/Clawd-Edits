import { ApplySpec } from "../../shared/types";

// faux.thinker Copilot-training reel — Raz's breaking-news take on
// GitHub Copilot starting to train on every line of user code by
// default on April 24, 2026 (opt-out model, announced Mar 25 2026).
//
// Source:  D:/video editor/Videos/vIDEO 6_1080p.mp4
// Public:  public/avatar_v6.mp4 (42.28 s, 1080x1920 @ 25 fps)
// Hook:    public/hook_anime/copilot_siphon_v1.mp4 (Veo 3 Fast, 0-3 s)
// Matte:   public/matted_avatar_v6/mat_%04d.png  (1057 frames, rembg)
//
// Brand: faux.thinker (RED accent #E91212). NEVER mix with cohousy.
// SFX volumes: 0.28 across the board (user preference, cohousy v2 pattern).
// Outro fade-out: YES, 1.0 s audio + video fade for a clean tail.
// Music bed: music_bed_v6.mp3 at 0.10 volume (ducked well under VO).
//
// Real-time news sources cited in overlays (all verified 2026-04-22):
//   - GitHub Changelog  https://github.blog/changelog/2026-03-25-updates-to-our-privacy-statement-and-terms-of-service-how-we-use-your-data/
//   - The Register      https://www.theregister.com/2026/03/26/github_ai_training_policy_changes/
//   - HN thread         https://news.ycombinator.com/item?id=47548243
//   - Opt-out path      github.com/settings/copilot (Privacy section)
//
// Real X takes (captured via Playwright persistent profile):
//   - take_1.png  @Splatoon1ikahan  — toggle flipped to "Disabled"
//                 (shows the TARGET state after opting out)
//   - take_2.png  @DrSouvic         — toggle "Enabled" by default,
//                 exact URL + Privacy section visible
//
// SAFE ZONES (1080x1920 9:16):
//   - Overlays middle 70 % horizontal (x 108..972)
//   - Top 10 % clear for IG header, bottom 18 % clear for action buttons
//   - Face sits ~y 20..50 % — slams pin at yPercent 66 via the
//     EmphasisCaption auto-fit.
type Word = { start: number; end: number; word: string };

// All word timestamps from whisper large-v3-turbo (transcript.json).
const ALL_WORDS: Word[] = [
  { start: 0.00, end: 0.60, word: "24th" },
  { start: 0.60, end: 0.98, word: "April" },
  { start: 0.98, end: 1.74, word: "GitHub" },
  { start: 1.74, end: 2.08, word: "starts" },
  { start: 2.08, end: 2.42, word: "training" },
  { start: 2.42, end: 2.78, word: "on" },
  { start: 2.78, end: 3.22, word: "every" },
  { start: 3.22, end: 3.44, word: "line" },
  { start: 3.44, end: 3.58, word: "of" },
  { start: 3.58, end: 3.80, word: "code" },
  { start: 3.80, end: 3.94, word: "you" },
  { start: 3.94, end: 4.24, word: "write" },
  { start: 4.24, end: 4.90, word: "unless" },
  { start: 4.90, end: 5.16, word: "you" },
  { start: 5.16, end: 5.48, word: "flip" },
  { start: 5.48, end: 5.88, word: "one" },
  { start: 5.88, end: 6.24, word: "setting." },
  { start: 6.24, end: 6.72, word: "If" },
  { start: 6.72, end: 6.84, word: "you" },
  { start: 6.84, end: 7.18, word: "use" },
  { start: 7.18, end: 7.70, word: "Copilot" },
  { start: 7.70, end: 8.14, word: "Free," },
  { start: 8.14, end: 8.74, word: "Pro," },
  { start: 8.74, end: 9.12, word: "or" },
  { start: 9.12, end: 9.40, word: "Pro" },
  { start: 9.40, end: 9.76, word: "Plus —" },
  { start: 9.76, end: 10.44, word: "client" },
  { start: 10.44, end: 10.80, word: "work," },
  { start: 10.80, end: 11.24, word: "side" },
  { start: 11.24, end: 11.78, word: "projects," },
  { start: 11.78, end: 12.30, word: "private" },
  { start: 12.30, end: 12.80, word: "repos —" },
  { start: 12.80, end: 13.50, word: "all" },
  { start: 13.50, end: 13.80, word: "of" },
  { start: 13.80, end: 14.30, word: "it." },
  { start: 14.30, end: 15.00, word: "Here's" },
  { start: 15.00, end: 15.20, word: "a" },
  { start: 15.20, end: 15.70, word: "tell:" },
  { start: 15.70, end: 16.40, word: "Business" },
  { start: 16.40, end: 16.80, word: "and" },
  { start: 16.80, end: 17.80, word: "Enterprise" },
  { start: 17.80, end: 18.30, word: "users" },
  { start: 18.30, end: 18.60, word: "are" },
  { start: 18.60, end: 19.20, word: "exempt." },
  { start: 19.20, end: 20.30, word: "Microsoft's" },
  { start: 20.30, end: 20.70, word: "only" },
  { start: 20.70, end: 21.40, word: "training" },
  { start: 21.40, end: 21.80, word: "on" },
  { start: 21.80, end: 22.30, word: "people" },
  { start: 22.30, end: 22.60, word: "who" },
  { start: 22.60, end: 22.90, word: "can't" },
  { start: 22.90, end: 23.30, word: "afford" },
  { start: 23.30, end: 24.20, word: "lawyers." },
  { start: 24.20, end: 25.00, word: "Fix" },
  { start: 25.00, end: 25.20, word: "it" },
  { start: 25.20, end: 25.40, word: "in" },
  { start: 25.40, end: 25.80, word: "30" },
  { start: 25.80, end: 26.50, word: "seconds:" },
  { start: 26.50, end: 27.50, word: "github.com" },
  { start: 27.50, end: 28.10, word: "slash" },
  { start: 28.10, end: 28.50, word: "settings" },
  { start: 28.50, end: 29.00, word: "slash" },
  { start: 29.00, end: 29.60, word: "copilot," },
  { start: 29.60, end: 30.30, word: "disable" },
  { start: 30.30, end: 30.60, word: "AI" },
  { start: 30.60, end: 31.00, word: "training." },
  { start: 31.00, end: 31.80, word: "Done." },
  { start: 31.80, end: 32.40, word: "I" },
  { start: 32.40, end: 32.80, word: "check" },
  { start: 32.80, end: 33.20, word: "every" },
  { start: 33.20, end: 33.60, word: "tool" },
  { start: 33.60, end: 33.90, word: "like" },
  { start: 33.90, end: 34.30, word: "this." },
  { start: 34.30, end: 35.00, word: "Run" },
  { start: 35.00, end: 35.20, word: "the" },
  { start: 35.20, end: 35.70, word: "agency" },
  { start: 35.70, end: 36.20, word: "solo." },
  { start: 36.20, end: 36.80, word: "One" },
  { start: 36.80, end: 37.30, word: "leaked" },
  { start: 37.30, end: 37.80, word: "client" },
  { start: 37.80, end: 38.30, word: "repo —" },
  { start: 38.30, end: 38.80, word: "it's" },
  { start: 38.80, end: 39.30, word: "over." },
  { start: 39.30, end: 39.80, word: "Comment" },
  { start: 39.80, end: 40.10, word: "'opt" },
  { start: 40.10, end: 40.50, word: "out' —" },
  { start: 40.50, end: 41.00, word: "I'll" },
  { start: 41.00, end: 41.40, word: "DM" },
  { start: 41.40, end: 41.70, word: "the" },
  { start: 41.70, end: 42.10, word: "steps." },
];

// Windows where WordCaptions are hidden (owned by hero components).
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 3.0],      // hook clip
  [5.0, 8.0],      // OPT-OUT slam
  [14.5, 18.0],    // SCOPE factoid + B-roll
  [19.5, 24.0],    // CLASS-LINE slam
  [24.5, 32.0],    // NumberedList + URL pill + X flash-cut
  [34.5, 37.0],    // Changelog B-roll (head-pop)
  [37.0, 39.3],    // STAKES slam
  [39.3, 42.28],   // CTA card
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: first matted frame number given a t_start in seconds.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_COPILOT_TRAIN_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v6.mp4",
  duration: 42.28,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.10,
  events: [
    // ═════════════════════════════════════════════════════════════════
    // BEAT 0 — HOOK CLIP (0.0-3.0) : server room + Octocat + code siphon
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 3.0,
      src: "hook_anime/copilot_siphon_v1.mp4",
      startFromSeconds: 0.0,
      label: "YOUR CODE · THE MODEL",
      tintColor: "rgba(233, 18, 18, 0.12)",
    },
    {
      kind: "date_tag",
      t_start: 0.0,
      duration: 3.0,
      text: "APR 24, 2026 · COPILOT TRAINS ON YOU",
      glyph: "✦",
      topPx: 220,
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.28, duration: 1.2 },

    // Light-leak seam hook -> avatar
    { kind: "overlay_video", t_start: 2.85, duration: 0.55, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 2.83, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 1 — LIVE PILL (3.2-7.0) : "COPILOT · POLICY LIVE"
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "date_tag",
      t_start: 3.2,
      duration: 4.0,
      text: "● COPILOT · POLICY LIVE",
      glyph: "",
      topPx: 120,
      accentColor: "#E91212",
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 2 — CONTRADICTION SLAM (5.0-8.0) : OPT-IN? / NO — OPT-OUT.
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 4.95, duration: 0.3, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 4.95, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 5.00,
      duration: 3.0,
      line1: "OPT-IN?",
      line2: "NO — OPT-OUT.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 3 — SCOPE FACTOID + URL PILL (8.5-14.0)
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "url_pill",
      t_start: 8.5,
      duration: 5.5,
      url: "github.com/settings/copilot",
      framesPerChar: 2,
      showCursor: true,
    },
    {
      kind: "factoid_card",
      t_start: 10.8,
      duration: 3.0,
      text: "FREE · PRO · PRO+ — including PRIVATE repos",
    },
    { kind: "sfx", t_start: 8.48, src: "sfx_pack/click.mp3", volume: 0.28, duration: 0.5 },

    // Light-leak -> "the tell" beat
    { kind: "overlay_video", t_start: 14.0, duration: 0.5, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 13.98, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 4 — "THE TELL" — HN head-pop B-roll (14.5-19.5)
    // ═════════════════════════════════════════════════════════════════
    // stacked_broll with matted avatar → HN thread screenshot behind Raz
    {
      kind: "stacked_broll",
      t_start: 14.5,
      duration: 5.0,
      brollSrc: "github_copilot/hn.mp4",
      avatarSrc: "avatar_v6.mp4",
      avatarStartSeconds: 14.5,
      mattedPatternPath: "matted_avatar_v6/mat_%04d.png",
      mattedFirstFrame: matFrame(14.5),
      label: "HN · 1.2k+ UPVOTES",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.28,
      exitDuration: 0.30,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 14.48, src: "sfx_pack/swoosh_1.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 5 — CLASS-LINE SLAM (19.5-24.0)
    // Softened caption + the VO still delivers the spicier line.
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 19.45, duration: 0.3, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 19.45, src: "sfx_pack/hit_2.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 19.50,
      duration: 4.5,
      line1: "ENTERPRISE: OPT-IN",
      line2: "EVERYONE ELSE: OPT-OUT",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },

    // Light-leak -> fix steps
    { kind: "overlay_video", t_start: 24.0, duration: 0.5, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 23.98, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 6 — X FLASH-CUT #1 (24.3-27.0) : toggle ENABLED (default)
    // — @DrSouvic take showing real settings page + URL + Enabled state
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 24.3,
      duration: 2.7,
      imageSrc: "x_takes_v6/take_2.png",
      cardWidth: 860,
    },
    { kind: "sfx", t_start: 24.28, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 7 — NUMBERED FIX LIST (27.0-31.8)
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "numbered_list",
      t_start: 27.0,
      duration: 4.8,
      header: "FIX IT IN 30 SECONDS",
      staggerFrames: 10,
      centered: true,
      yPercent: 55,
      cardWidth: 820,
      items: [
        { text: "github.com/settings/copilot", highlight: "github.com" },
        { text: "Privacy → AI model training", highlight: "AI model training" },
        { text: "Toggle OFF → Save", highlight: "OFF" },
      ],
    },
    { kind: "sfx", t_start: 26.98, src: "sfx_pack/click.mp3", volume: 0.28, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 8 — X FLASH-CUT #2 (29.2-31.7) : toggle DISABLED (target)
    // — @Splatoon1ikahan showing the Disabled state after opt-out
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 29.2,
      duration: 2.5,
      imageSrc: "x_takes_v6/take_1.png",
      cardWidth: 780,
    },
    { kind: "sfx", t_start: 29.18, src: "sfx_pack/hit_2.mp3", volume: 0.28, duration: 0.5 },

    // Light-leak -> effort beat
    { kind: "overlay_video", t_start: 31.7, duration: 0.5, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 31.68, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 9 — CHANGELOG B-ROLL w/ HEAD-POP (32.0-35.5)
    // "I check every tool like this. Run the agency solo."
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 32.0,
      duration: 3.5,
      brollSrc: "github_copilot/changelog.mp4",
      avatarSrc: "avatar_v6.mp4",
      avatarStartSeconds: 32.0,
      mattedPatternPath: "matted_avatar_v6/mat_%04d.png",
      mattedFirstFrame: matFrame(32.0),
      label: "GITHUB CHANGELOG · MAR 25",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.28,
      exitDuration: 0.30,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 10 — STAKES SLAM (35.5-39.3)
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 35.48, duration: 0.3, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 35.48, src: "sfx_pack/hit_1.mp3", volume: 0.28, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 35.55,
      duration: 3.7,
      line1: "ONE LEAKED REPO",
      line2: "= GAME OVER.",
      precursor: "none",
      line2GradientStart: "#FF4D4D",
      line2GradientEnd: "#E91212",
      yPercent: 66,
    },

    // Light-leak -> CTA
    { kind: "overlay_video", t_start: 39.2, duration: 0.45, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 39.18, src: "sfx_pack/shutter.mp3", volume: 0.28, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 11 — CTA + KICKER (39.3-42.28)
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "comment_prompt_card",
      t_start: 39.3,
      duration: 2.98,
      username: "faux.thinker",
      header: "COMMENT TO GET THE DM",
      prompt: "opt out",
    },
    { kind: "sfx", t_start: 39.3, src: "sfx/notification.mp3", volume: 0.28, duration: 0.7 },

    // ═════════════════════════════════════════════════════════════════
    // WORD CAPTIONS — single-word ticker, bottom safe zone (y 80%)
    // Hidden in windows where a hero component already carries the text.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 42.28,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 80,
    },
  ],
};
