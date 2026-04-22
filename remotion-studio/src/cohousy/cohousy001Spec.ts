import { ApplySpec } from "../shared/types";

// Cohousy reel #001 — Santhosh pitching property-management-as-a-service
// to Pune flat owners. 40.84 s of Hindi a-roll, rendered at 25 fps.
//
// Source:  D:/video editor/Videos/Santhosh_-_cohousy_-_001.mp4
// Public:  public/cohousy/avatar_cohousy_001.mp4
// Hook:    public/cohousy/hook/cohousy_keys_v1.mp4   (Veo 3 Fast,
//          used 0-3s — the end-text has Veo typos we cover with the
//          real logo lockup)
// Matte:   public/cohousy/matted_001/mat_%04d.png     (1021 frames)
//
// SAFE ZONES (9:16, 1080x1920):
//   - Avoid top 10 % for IG header, bottom 15 % for IG action buttons
//   - Speaker face roughly y 20..50 %
//   - Overlays below chin = y 54..82 % (default landing strip)
//
// VO beats (Hindi transcript, rounded to render-friendly seconds):
//   0.00-2.54 Hook line: "Pune mein flat hai, toh ye video aapke liye hai"
//   2.54-9.00 Setup: "Agar flat hai... empty, on rent, caretaker — jaan do"
//   9.00-13.12 Reveal: "Concept hai — property management"
//   13.88-20.96 Promise list: "Tenants lao, rent collect, maintenance, legal"
//   20.96-28.62 Pivot: "Sirf rent receive / broker nahi, system / monthly report"
//   28.62-40.82 Proof + CTA: "30+ flats, 98% occupancy, 100% on-time / Follow me"

type Word = { start: number; end: number; word: string };

// Transcript is in Devanagari. We spell each word for word-captions so a
// single-word ticker lands exactly on the spoken syllable. The most
// viewer-facing phrasing is kept in Hinglish where natural.
const ALL_WORDS: Word[] = [
  // 0.00-2.54 hook (covered by CohousyLogoLockup hero; word captions muted)
  { start: 0.00, end: 0.50, word: "पुने" },
  { start: 0.50, end: 0.90, word: "में" },
  { start: 0.90, end: 1.35, word: "फ्लाट" },
  { start: 1.35, end: 1.60, word: "है?" },
  { start: 1.60, end: 2.05, word: "ये" },
  { start: 2.05, end: 2.54, word: "वीडियो" },
  // 2.54-9.00 setup
  { start: 2.80, end: 3.30, word: "खाली" },
  { start: 3.30, end: 3.90, word: "हो," },
  { start: 4.00, end: 4.55, word: "रेंट" },
  { start: 4.55, end: 4.95, word: "पे" },
  { start: 5.00, end: 5.40, word: "हो," },
  { start: 5.70, end: 6.20, word: "कोई" },
  { start: 6.20, end: 6.70, word: "देख" },
  { start: 6.70, end: 7.10, word: "रहा" },
  { start: 7.10, end: 7.50, word: "हो…" },
  { start: 8.00, end: 8.50, word: "एक" },
  { start: 8.50, end: 8.90, word: "चीज़" },
  // 9.00-13.12 reveal
  { start: 9.20, end: 9.70, word: "इंडिया" },
  { start: 9.70, end: 10.00, word: "में" },
  { start: 10.00, end: 10.35, word: "एक" },
  { start: 10.35, end: 11.00, word: "कॉन्सेप्ट" },
  { start: 11.00, end: 11.20, word: "है" },
  { start: 11.50, end: 12.00, word: "जो" },
  { start: 12.00, end: 12.30, word: "लोग" },
  { start: 12.30, end: 12.70, word: "नहीं" },
  { start: 12.70, end: 13.10, word: "जानते" },
  // 20.96-28.62 pivot words
  { start: 21.10, end: 21.60, word: "सिर्फ़" },
  { start: 21.60, end: 22.00, word: "रेंट" },
  { start: 22.00, end: 22.50, word: "रिसीव" },
  { start: 22.50, end: 23.00, word: "करना" },
  // 28.62-40.82 proof words (covered by BigStat components; muted)
];

const HIDDEN_WINDOWS: [number, number][] = [
  // Hook lockup — captions hidden
  [0.00, 3.20],
  // Promise list beat — captions hidden to let the list breathe
  [13.50, 20.96],
  // Stats trio — captions hidden (component carries the text)
  [28.62, 40.84],
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

export const COHOUSY_001_SPEC: ApplySpec = {
  avatarVideoSrc: "cohousy/avatar_cohousy_001.mp4",
  duration: 40.84,
  brandKey: "cohousy",
  // No music bed for v1 — keep the VO dominant; we can add a soft
  // piano-pad in v2 once the content lands. musicVolume is still
  // required by zod default even without a src.
  musicVolume: 0.0,
  events: [
    // ═════════════════════════════════════════════════════════════════
    // BEAT 0 — HOOK CLIP (0.0-3.0) : Pune skyline + key + rupee stream
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 3.0,
      src: "cohousy/hook/cohousy_keys_v1.mp4",
      startFromSeconds: 0.0,
      // Warm orange vignette so the clip sits inside the cohousy palette.
      tintColor: "rgba(255, 128, 2, 0.12)",
    },
    // Clean orange lockup covers the Veo "MANAGGEMENT/RIIGHT" typo tail
    {
      kind: "cohousy_logo_lockup",
      t_start: 2.1,
      duration: 1.15,
      tagline: "FLAT MANAGEMENT, DONE RIGHT.",
      variant: "hero",
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.9, duration: 1.2 },

    // Shutter transition hook → avatar
    { kind: "overlay_video", t_start: 2.85, duration: 0.55, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 2.83, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 1 — LIVE PILL (3.2-8.0) : top-center orange pill with hook Q
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "cohousy_logo_lockup",
      t_start: 3.25,
      duration: 4.75,
      tagline: "PUNE · FLAT OWNERS",
      variant: "hero",
    },
    // Below-chin question caption that mirrors Santhosh's hook phrase
    {
      kind: "question_caption",
      t_start: 3.5,
      duration: 5.2,
      text: "पुणे में फ्लॅट है?",
      highlight: "फ्लॅट",
      subtitle: "खाली · रेंट पर · या कोई देख रहा है",
      yPercent: 62,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 2 — REVEAL (9.0-13.5) : "Concept hai — property management"
    // Big slam below the chin with orange gradient
    // ═════════════════════════════════════════════════════════════════
    // RGB glitch pre-slam
    { kind: "glitch_flash", t_start: 8.85, duration: 0.35, intensity: 0.85, slices: 10, flash: true },
    { kind: "sfx", t_start: 8.85, src: "sfx_pack/hit_1.mp3", volume: 0.9, duration: 0.6 },
    {
      kind: "emphasis_caption",
      t_start: 9.0,
      duration: 4.2,
      line1: "PROPERTY",
      line2: "MANAGEMENT.",
      precursor: "none",
      line2GradientStart: "#FFB96D",
      line2GradientEnd: "#F05100",
      yPercent: 58,
    },
    {
      kind: "factoid_card",
      t_start: 11.3,
      duration: 2.0,
      text: "INDIA में जिसे कोई नहीं जानता",
    },

    // Shutter → promise list
    { kind: "overlay_video", t_start: 13.55, duration: 0.5, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 13.53, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 3 — THE PROMISE (13.9-20.95) : 4-row check-list of services
    // Head-pops-out over KB style — Santhosh's face stays visible while
    // the orange list card sits below the chin.
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "cohousy_promise_list",
      t_start: 13.9,
      duration: 7.05,
      header: "हमारी ज़िम्मेदारी",
      yPercent: 48,
      staggerFrames: 28,
      rows: [
        { text: "TENANTS बुलाते हैं", highlight: "TENANTS" },
        { text: "RENT कलेक्ट करते हैं", highlight: "RENT" },
        { text: "MAINTENANCE हैंडल करते हैं", highlight: "MAINTENANCE" },
        { text: "LEGAL भी हम देखते हैं", highlight: "LEGAL" },
      ],
    },
    { kind: "sfx", t_start: 13.88, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.5 },

    // Shutter → money flow
    { kind: "overlay_video", t_start: 20.9, duration: 0.5, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 20.88, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 4 — RECEIVE (21.0-24.0) : rupee coins → rent receipt card
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "cohousy_money_flow",
      t_start: 21.0,
      duration: 3.1,
      amount: "₹ 42,500",
      label: "RENT RECEIVED",
      sub: "Auto-credited on the 5th of every month",
      yPercent: 48,
    },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 5 — BROKER vs SYSTEM (24.2-28.6) : side-by-side comparison
    // ═════════════════════════════════════════════════════════════════
    { kind: "glitch_flash", t_start: 24.1, duration: 0.3, intensity: 0.85, slices: 8, flash: true },
    { kind: "sfx", t_start: 24.1, src: "sfx_pack/hit_2.mp3", volume: 0.9, duration: 0.6 },
    {
      kind: "cohousy_comparison_box",
      t_start: 24.2,
      duration: 4.4,
      yPercent: 44,
      leftLabel: "BROKER",
      leftTag: "PURANA TARIKA",
      leftBullets: [
        "एक-एक डील के लिए कॉल",
        "कमीशन + चिंता",
        "कोई रिपोर्ट नहीं",
      ],
      rightLabel: "COHOUSY",
      rightTag: "ये एक SYSTEM है",
      rightBullets: [
        "मंथली रिपोर्ट",
        "फुल अकाउंटिबिलिटी",
        "आप सिर्फ़ रेंट रिसीव करो",
      ],
    },

    // Shutter → stats
    { kind: "overlay_video", t_start: 28.55, duration: 0.5, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 28.53, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 6 — PROOF STATS TRIO (28.7-37.0) : three big stat slams
    //   28.7-31.9  "30+ FLATS"
    //   31.9-34.5  "98% OCCUPANCY"
    //   34.5-37.0  "100% ON-TIME RENT"
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "cohousy_big_stat",
      t_start: 28.7,
      duration: 3.2,
      value: "30+",
      label: "FLATS IN PUNE",
      sub: "Under active management",
      yPercent: 50,
    },
    { kind: "sfx", t_start: 28.68, src: "sfx_pack/hit_1.mp3", volume: 0.9, duration: 0.6 },
    {
      kind: "cohousy_big_stat",
      t_start: 31.9,
      duration: 2.6,
      value: "98%",
      label: "OCCUPANCY RATE",
      sub: "Across our portfolio",
      yPercent: 50,
    },
    { kind: "sfx", t_start: 31.88, src: "sfx_pack/hit_2.mp3", volume: 0.9, duration: 0.6 },
    {
      kind: "cohousy_big_stat",
      t_start: 34.5,
      duration: 2.5,
      value: "100%",
      label: "ON-TIME RENT",
      sub: "Paid to owners every month",
      yPercent: 50,
    },
    { kind: "sfx", t_start: 34.48, src: "sfx_pack/hit_1.mp3", volume: 0.9, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════
    // BEAT 7 — CTA (37.0-40.8) : Follow for details
    // ═════════════════════════════════════════════════════════════════
    { kind: "overlay_video", t_start: 36.9, duration: 0.5, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 36.88, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },
    {
      kind: "cohousy_cta_follow",
      t_start: 37.05,
      duration: 3.75,
      headline: "FOLLOW FOR DETAILS",
      sub: "Pune मे flat है? DM करो.",
      handle: "@cohousy",
    },
    { kind: "sfx", t_start: 37.05, src: "sfx/notification.mp3", volume: 0.85, duration: 0.7 },

    // ═════════════════════════════════════════════════════════════════
    // WORD CAPTIONS — Devanagari single-word ticker, bottom safe zone.
    // Hidden during hook lockup, promise list, and stats trio (their
    // cards already carry the text).
    // ═════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 40.84,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 80,
    },
  ],
};
