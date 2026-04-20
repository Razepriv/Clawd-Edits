import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker Vercel x Context.ai breach reel (v1).
//
// Source: D:/video editor/Videos/Video 5.mp4 -> public/avatar_v5.mp4
// 49.44 s, 1080x1920 @ 25 fps — single continuous a-roll take, black hoodie
// in front of a plant-wall + warm strip-light backdrop.
//
// TOPIC: The Vercel April 2026 security incident (disclosed 2026-04-19,
// widely reported 2026-04-20). Root cause: a Vercel employee's Google
// Workspace account was compromised via an OAuth "Allow All" grant to
// Context.ai (an AI Office Suite). Context.ai itself was compromised in
// February via Lumma Stealer that harvested browser creds from one of
// their employees who had downloaded game exploits. The attacker then
// used the Google OAuth token to reach Vercel environment variables
// that were not marked "sensitive".
//
// SOURCES (used for on-screen URL pill + factoid authority):
//   - vercel.com/kb/bulletin/vercel-april-2026-security-incident
//   - thehackernews.com/2026/04/vercel-breach-tied-to-context-ai-hack.html
//   - bleepingcomputer.com (Vercel confirms breach, $2 M ransom)
//   - securityboulevard.com (Context.ai compromise link)
//
// IOC: OAuth App Client ID ...7bbvqj.apps.googleusercontent.com
//
// STRUCTURE:
//   0.0 - 3.0 s  HOOK         : Veo-3 Fast comic clip (server racks, Vercel
//                               triangle cracks, OAuth tokens + Google shards
//                               explode outward). Label "VERCEL IS BLEEDING".
//   3.0 - 8.4 s  SETUP        : Avatar + red "VERCEL BREACH · LIVE" pill.
//                               EmphasisCaption slam "ROTATE KEYS? / NOT THE
//                               STORY." with strike-through flip.
//   8.4 -14.0 s  PROOF #1     : Vercel KB bulletin B-roll (real screen cap),
//                               URL pill of KB link, factoid card "CONTEXT.AI -
//                               AI OFFICE SUITE / EMPLOYEE GRANTED 'ALLOW ALL'".
//  14.0 -18.0 s  PIVOT        : Google Workspace icon swoops in and flips red.
//                               app_icon_float over face.
//  18.0 -23.0 s  AUDIENCE     : QuestionCaption "HOW MANY AI TOOLS CAN STILL
//                               READ YOUR GMAIL?".
//  23.0 -28.0 s  RECEIPT      : DM toast styled as a Google security toast
//                               (127 apps / 83 unused).
//  28.0 -30.0 s  THESIS       : EmphasisCaption "THIS IS YOUR / ATTACK SURFACE.".
//  30.0 -31.5 s  LIST GATE    : Emphasis "3 THINGS TO DO / RIGHT NOW".
//  31.5 -36.0 s  STEP 1       : NumberedList item 1 ("REVOKE UNUSED AI APPS").
//  32.0 -36.0 s  PROOF #2     : X hot-take (@SecureChap — full Lumma Stealer
//                               attack-chain) stacked_broll with head pop-out.
//  36.0 -42.0 s  STEP 2       : NumberedList item 2 ("MARK VERCEL ENV VARS AS
//                               SENSITIVE"). IOC factoid.
//  36.5 -40.5 s  PROOF #3     : X hot-take (@NEARDevHub — official advisory).
//  42.0 -44.8 s  STEP 3       : NumberedList item 3 ("ROTATE EXPOSED KEYS").
//  42.5 -46.0 s  PROOF #4     : X hot-take (@PressBot/heygreendev — audit advice).
//  44.8 -47.4 s  EFFORT       : Avatar live B-roll stacked with head-pop-out
//                               ("AUDITING MY STACK · NOW").
//  47.4 -49.4 s  CTA          : CommentPromptCard "COMMENT 'AUDIT' below"
//                               with fade-out.
//
// SAFE ZONES (same as v2.4):
//   - Overlays live in middle 70 % horizontal (x 162..918).
//   - No text in top 10 % (y 0..192) or bottom 20 % (y 1536..1920).
//   - Right 15 % (x 918..1080) avoided for IG action buttons.
//   - Word captions at yPercent 78.
//
// Style: faux.thinker v12.4 (additive on the Canva pipeline v2.4 kit —
// no new components required; ticker/news strip deliberately omitted in v1).

type Word = { start: number; end: number; word: string };

// Whisper small.en word timestamps (VAD-filtered).
const ALL_WORDS: Word[] = [
  { start: 0.0, end: 0.46, word: "Vercel" },
  { start: 0.46, end: 0.84, word: "just" },
  { start: 0.84, end: 1.14, word: "got" },
  { start: 1.14, end: 1.36, word: "breached." },
  { start: 1.84, end: 2.04, word: "If" },
  { start: 2.04, end: 2.24, word: "you" },
  { start: 2.24, end: 2.56, word: "deploy" },
  { start: 2.56, end: 2.94, word: "there," },
  { start: 3.1, end: 3.3, word: "pay" },
  { start: 3.3, end: 3.64, word: "attention." },
  { start: 4.08, end: 4.48, word: "Everyone" },
  { start: 4.48, end: 4.68, word: "is" },
  { start: 4.68, end: 5.1, word: "saying," },
  { start: 5.2, end: 5.46, word: "rotate" },
  { start: 5.46, end: 5.72, word: "your" },
  { start: 5.72, end: 5.98, word: "keys." },
  { start: 6.54, end: 6.76, word: "That" },
  { start: 6.76, end: 6.94, word: "is" },
  { start: 6.94, end: 7.14, word: "not" },
  { start: 7.14, end: 7.34, word: "the" },
  { start: 7.34, end: 7.54, word: "real" },
  { start: 7.54, end: 7.8, word: "story." },
  { start: 8.4, end: 8.6, word: "The" },
  { start: 8.6, end: 8.96, word: "attacker" },
  { start: 8.96, end: 9.2, word: "did" },
  { start: 9.2, end: 9.42, word: "not" },
  { start: 9.42, end: 9.78, word: "break" },
  { start: 9.78, end: 10.04, word: "into" },
  { start: 10.04, end: 10.48, word: "Vercel." },
  { start: 10.86, end: 11.04, word: "They" },
  { start: 11.04, end: 11.36, word: "broke" },
  { start: 11.36, end: 11.6, word: "into" },
  { start: 11.6, end: 11.78, word: "an" },
  { start: 11.78, end: 11.98, word: "AI" },
  { start: 11.98, end: 12.28, word: "tool" },
  { start: 12.28, end: 12.46, word: "a" },
  { start: 12.46, end: 12.82, word: "Vercel" },
  { start: 12.82, end: 13.18, word: "employee" },
  { start: 13.18, end: 13.46, word: "was" },
  { start: 13.46, end: 13.94, word: "using." },
  { start: 14.9, end: 15.12, word: "That" },
  { start: 15.12, end: 15.38, word: "tool" },
  { start: 15.38, end: 15.64, word: "had" },
  { start: 15.64, end: 15.96, word: "Google" },
  { start: 15.96, end: 16.42, word: "Workspace" },
  { start: 16.42, end: 17.06, word: "access." },
  { start: 17.78, end: 17.98, word: "Now" },
  { start: 17.98, end: 18.24, word: "think," },
  { start: 18.48, end: 18.68, word: "how" },
  { start: 18.68, end: 18.92, word: "many" },
  { start: 18.92, end: 19.26, word: "random" },
  { start: 19.26, end: 19.5, word: "AI" },
  { start: 19.5, end: 19.86, word: "tools" },
  { start: 20.44, end: 20.58, word: "are" },
  { start: 20.58, end: 20.86, word: "still" },
  { start: 20.86, end: 21.28, word: "connected" },
  { start: 21.28, end: 21.54, word: "to" },
  { start: 21.54, end: 21.76, word: "your" },
  { start: 21.76, end: 22.08, word: "own" },
  { start: 22.08, end: 22.46, word: "Google" },
  { start: 22.46, end: 22.98, word: "account?" },
  { start: 23.72, end: 23.94, word: "Every" },
  { start: 23.94, end: 24.22, word: "shiny" },
  { start: 24.22, end: 24.5, word: "app" },
  { start: 24.5, end: 24.72, word: "you" },
  { start: 24.72, end: 25.06, word: "tested" },
  { start: 25.06, end: 25.3, word: "last" },
  { start: 25.3, end: 25.74, word: "month," },
  { start: 26.04, end: 26.3, word: "still" },
  { start: 26.3, end: 27.36, word: "authorized." },
  { start: 27.88, end: 28.1, word: "That" },
  { start: 28.1, end: 28.3, word: "is" },
  { start: 28.3, end: 28.52, word: "your" },
  { start: 28.52, end: 28.86, word: "attack" },
  { start: 28.86, end: 29.58, word: "surface." },
  { start: 30.08, end: 30.3, word: "Three" },
  { start: 30.3, end: 30.66, word: "things" },
  { start: 30.66, end: 31.1, word: "today." },
  { start: 31.64, end: 31.82, word: "One," },
  { start: 32.02, end: 32.3, word: "revoke" },
  { start: 32.3, end: 32.6, word: "every" },
  { start: 32.6, end: 32.82, word: "AI" },
  { start: 32.82, end: 33.08, word: "app" },
  { start: 33.08, end: 33.3, word: "you" },
  { start: 33.3, end: 33.56, word: "do" },
  { start: 33.56, end: 33.78, word: "not" },
  { start: 33.78, end: 34.04, word: "use" },
  { start: 34.04, end: 34.3, word: "from" },
  { start: 34.3, end: 34.66, word: "Google" },
  { start: 34.66, end: 35.62, word: "permissions." },
  { start: 36.18, end: 36.38, word: "Two," },
  { start: 36.6, end: 36.8, word: "your" },
  { start: 36.8, end: 37.06, word: "API" },
  { start: 37.06, end: 37.38, word: "keys" },
  { start: 37.38, end: 37.58, word: "on" },
  { start: 37.58, end: 37.92, word: "Vercel" },
  { start: 37.92, end: 38.14, word: "are" },
  { start: 38.14, end: 38.38, word: "not" },
  { start: 38.38, end: 38.76, word: "encrypted" },
  { start: 38.76, end: 39.0, word: "by" },
  { start: 39.0, end: 39.4, word: "default." },
  { start: 40.7, end: 40.96, word: "Mark" },
  { start: 40.96, end: 41.18, word: "them" },
  { start: 41.18, end: 41.6, word: "sensitive." },
  { start: 42.22, end: 42.5, word: "Three," },
  { start: 42.66, end: 42.96, word: "rotate" },
  { start: 42.96, end: 43.2, word: "the" },
  { start: 43.2, end: 43.74, word: "exposed" },
  { start: 43.74, end: 44.32, word: "ones." },
  { start: 44.78, end: 44.88, word: "I" },
  { start: 44.88, end: 45.06, word: "have" },
  { start: 45.06, end: 45.22, word: "been" },
  { start: 45.22, end: 45.56, word: "auditing" },
  { start: 45.56, end: 45.72, word: "my" },
  { start: 45.72, end: 45.98, word: "whole" },
  { start: 45.98, end: 46.26, word: "stack" },
  { start: 46.26, end: 46.52, word: "this" },
  { start: 46.52, end: 46.86, word: "morning." },
  { start: 47.36, end: 47.58, word: "Comment" },
  { start: 47.58, end: 47.98, word: "audit" },
  { start: 47.98, end: 48.18, word: "for" },
  { start: 48.18, end: 48.34, word: "my" },
  { start: 48.34, end: 48.62, word: "full" },
  { start: 48.62, end: 49.12, word: "checklist." },
];

// Windows where WordCaptions should be hidden (owned by hero components).
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 3.0],     // Hook clip
  [5.4, 7.9],     // EmphasisCaption "ROTATE KEYS? / NOT THE STORY"
  [10.0, 14.0],   // Vercel KB B-roll + URL pill
  [17.6, 23.05],  // QuestionCaption
  [23.2, 27.6],   // DM toast (google permissions receipt)
  [27.7, 30.1],   // Thesis EmphasisCaption
  [30.0, 31.6],   // List gate EmphasisCaption
  [32.0, 35.8],   // X take #1 (attack chain) + NumberedList step 1
  [36.3, 42.1],   // NumberedList steps 2 + IOC factoid + X take #2
  [42.1, 44.4],   // NumberedList step 3 + X take #3
  [44.4, 47.1],   // EffortBroll
  [47.3, 49.4],   // CTA card
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame given t_start seconds in a 25 fps matte.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_VERCEL_BREACH_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_v5.mp4",
  duration: 49.44,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.10,
  events: [
    // ═════════════════════════════════════════════════════════════════════
    // BEAT 0 — HOOK (0-3 s) : Veo-3 Fast cinematic comic hook clip.
    // Dark data-center corridor, black Vercel triangle cracks open,
    // red lightning + OAuth-token icons + shattered Google shards fly out.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 3.0,
      src: "hook_anime/vercel_bleeds_v1.mp4",
      startFromSeconds: 0.0,
      label: "VERCEL IS BLEEDING",
    },
    // DateTag anchors the news in time
    {
      kind: "date_tag",
      t_start: 0.0,
      duration: 3.0,
      text: "APR 20, 2026 · VERCEL × CONTEXT.AI",
      glyph: "✦",
      topPx: 220,
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.95, duration: 1.1 },
    { kind: "sfx", t_start: 1.4, src: "sfx_pack/glitch_1.mp3", volume: 0.65, duration: 0.8 },

    // Light-leak transition hook → a-roll (2.85-3.45)
    { kind: "overlay_video", t_start: 2.85, duration: 0.60, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.95, scale: 1 },
    { kind: "sfx", t_start: 2.83, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 1 — SETUP (3.0-8.0 s)
    //   • PillTag simulated via DateTag in "LIVE" mode (top strip)
    //   • EmphasisCaption slam "ROTATE KEYS? / NOT THE STORY." over the
    //     avatar when VO hits 5.5 s ("everyone is saying rotate your keys").
    // ═════════════════════════════════════════════════════════════════════
    // Pill-style red status on top through the SETUP beat
    {
      kind: "date_tag",
      t_start: 3.2,
      duration: 5.0,
      text: "VERCEL BREACH · LIVE",
      glyph: "●",
      topPx: 120,
      accentColor: "#ef2b3a",
    },
    {
      kind: "emphasis_caption",
      t_start: 5.5,
      duration: 2.4,
      line1: "ROTATE KEYS?",
      line2: "NOT THE STORY.",
      precursor: "rgb_glitch",
      line2GradientStart: "#ff4d4d",
      line2GradientEnd: "#ff0033",
      yPercent: 60, // strictly below chin — never on face
    },
    { kind: "sfx", t_start: 5.48, src: "sfx_pack/hit_1.mp3", volume: 0.85, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 2 — PROOF #1 : Vercel KB bulletin (8.5-14.0 s) — real screen cap
    // Head-pop-out stacked_broll so Raz's head stays in frame above the page.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 8.5,
      duration: 5.5,
      brollSrc: "vercel_kb/vercel_kb_letter.mp4",
      avatarSrc: "avatar_v5.mp4",
      avatarStartSeconds: 8.5,
      mattedPatternPath: "matted_avatar_v5/mat_%04d.png",
      mattedFirstFrame: matFrame(8.5),
      label: "VERCEL KNOWLEDGE BASE · BULLETIN",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.32,
      exitDuration: 0.32,
      brollHeightPercent: 60,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 8.48, src: "sfx_pack/swoosh_1.mp3", volume: 0.85, duration: 0.6 },

    // URL pill typewritering out the authoritative source
    {
      kind: "url_pill",
      t_start: 10.4,
      duration: 3.4,
      url: "vercel.com/kb/bulletin/vercel-april-2026-security-incident",
      framesPerChar: 1,
      showCursor: true,
    },
    { kind: "sfx", t_start: 10.38, src: "sfx_pack/click.mp3", volume: 0.8, duration: 0.4 },

    // Factoid card — the root cause in one line
    {
      kind: "factoid_card",
      t_start: 12.0,
      duration: 2.0,
      text: "CONTEXT.AI · AI OFFICE SUITE — EMPLOYEE GRANTED ‘ALLOW ALL’ OAUTH",
    },

    // Light-leak back to full a-roll
    { kind: "overlay_video", t_start: 13.95, duration: 0.50, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 13.93, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 3 — PIVOT (14.5-17.5 s) : Google Workspace icon swoops in when
    // VO says "That tool had Google Workspace access."
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "app_icon_float",
      t_start: 14.5,
      duration: 3.2,
      iconSrc: "logos/google_g.svg",
      backgroundColor: "#ffffff",
      size: 300,
    },
    { kind: "sfx", t_start: 14.48, src: "sfx_pack/swoosh_2.mp3", volume: 0.85, duration: 0.6 },
    // Small supporting factoid next to icon pop
    {
      kind: "factoid_card",
      t_start: 15.2,
      duration: 2.2,
      text: "GMAIL · DRIVE · CALENDAR · DOCS — ALL IN SCOPE",
    },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 4 — AUDIENCE TURN (17.6-23.0 s) : big pinned question below face
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "question_caption",
      t_start: 17.6,
      duration: 5.4,
      text: "How many AI tools can still read your Gmail?",
      highlight: "Gmail",
      subtitle: "OPEN myaccount.google.com/permissions",
      yPercent: 64,
    },
    { kind: "sfx", t_start: 17.58, src: "sfx/notification.mp3", volume: 0.9, duration: 0.7 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 5 — RECEIPT (23.2-27.5 s) : Google-security-toast styled DM
    // showing real-world scope of the average user's OAuth surface.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "dm_toast",
      t_start: 23.2,
      duration: 4.4,
      username: "Google Security",
      message:
        "You have 127 third-party apps connected to your account. 83 haven't been used in 60+ days.",
      timeLabel: "now",
    },
    { kind: "sfx", t_start: 23.18, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.4 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 6 — THESIS (27.7-30.0 s) : EmphasisCaption slam
    // "THIS IS YOUR / ATTACK SURFACE."
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "emphasis_caption",
      t_start: 27.7,
      duration: 2.3,
      line1: "THIS IS YOUR",
      line2: "ATTACK SURFACE.",
      precursor: "rgb_glitch",
      line2GradientStart: "#ff2a2a",
      line2GradientEnd: "#ff6a00",
      yPercent: 60, // strictly below chin — never on face
    },
    { kind: "sfx", t_start: 27.68, src: "sfx_pack/bass_drop.mp3", volume: 0.95, duration: 1.2 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 7 — LIST GATE (30.0-31.6 s) : "3 THINGS TO DO / RIGHT NOW"
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "emphasis_caption",
      t_start: 30.0,
      duration: 1.5,
      line1: "3 THINGS TO DO",
      line2: "RIGHT NOW.",
      precursor: "none",
      line2GradientStart: "#ff4d4d",
      line2GradientEnd: "#ff0033",
      yPercent: 60, // strictly below chin — never on face
    },
    { kind: "sfx", t_start: 29.98, src: "sfx_pack/riser.mp3", volume: 0.85, duration: 1.4 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 8 — NUMBERED LIST (31.6-44.4 s) : 3-step audit checklist, each
    // step revealed in sync with VO. Positioned below face, centered.
    // The list holds through the X-take proofs beneath.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "numbered_list",
      t_start: 31.6,
      duration: 12.8,
      header: "AUDIT CHECKLIST",
      staggerFrames: 108, // ~4.3 s between steps → lines up with VO 1,2,3
      centered: true,
      yPercent: 62,
      cardWidth: 820,
      items: [
        { text: "Revoke unused AI apps from Google",      highlight: "Revoke" },
        { text: "Mark every Vercel env var as ‘Sensitive’", highlight: "Sensitive" },
        { text: "Rotate exposed NPM + GitHub tokens",     highlight: "Rotate" },
      ],
    },
    { kind: "sfx", t_start: 31.58, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.4 },
    { kind: "sfx", t_start: 36.15, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.4 },
    { kind: "sfx", t_start: 42.18, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.4 },

    // IOC factoid card — credibility bullet for infosec audience
    {
      kind: "factoid_card",
      t_start: 38.2,
      duration: 3.8,
      text: "IOC · OAUTH CLIENT ID ends …7bbvqj.apps.googleusercontent.com",
    },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 9 — X TAKE PROOFS (32-44 s) : three real viral takes flash-cut
    // over the NumberedList. Each lands on the relevant step.
    //   take_1 = @SecureChap   — Lumma Stealer → Context.ai → Vercel chain
    //   take_2 = @NEARDevHub   — official advisory echo + Vercel KB thumb
    //   take_3 = @heygreendev  — "audit connected OAuth apps" — step 1 receipt
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "x_hot_take_flashcut",
      t_start: 32.2,
      duration: 3.2,
      imageSrc: "x_takes_v5/take_1.png",
      cardWidth: 860,
    },
    { kind: "sfx", t_start: 32.18, src: "sfx_pack/hit_2.mp3", volume: 0.85, duration: 0.5 },

    {
      kind: "x_hot_take_flashcut",
      t_start: 36.6,
      duration: 3.4,
      imageSrc: "x_takes_v5/take_2.png",
      cardWidth: 820,
    },
    { kind: "sfx", t_start: 36.58, src: "sfx_pack/hit_1.mp3", volume: 0.85, duration: 0.5 },

    {
      kind: "x_hot_take_flashcut",
      t_start: 42.4,
      duration: 2.2,
      imageSrc: "x_takes_v5/take_3.png",
      cardWidth: 820,
    },
    { kind: "sfx", t_start: 42.38, src: "sfx_pack/hit_2.mp3", volume: 0.85, duration: 0.5 },

    // Light-leak into EFFORT beat
    { kind: "overlay_video", t_start: 44.45, duration: 0.5, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.9, scale: 1 },
    { kind: "sfx", t_start: 44.43, src: "sfx_pack/shutter.mp3", volume: 0.8, duration: 0.5 },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 10 — EFFORT (44.8-47.1 s) : stacked_broll pops Raz's head above
    // a re-cut of the a-roll itself (as if showing a monitoring dashboard
    // behind him). Uses head-pop-out for the same "3D pop" feel.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "stacked_broll",
      t_start: 44.8,
      duration: 2.3,
      // Reuse the Vercel KB capture as the backdrop here — reinforces the
      // receipt "I've been reading the bulletin this morning".
      brollSrc: "vercel_kb/vercel_kb_letter.mp4",
      avatarSrc: "avatar_v5.mp4",
      avatarStartSeconds: 44.8,
      mattedPatternPath: "matted_avatar_v5/mat_%04d.png",
      mattedFirstFrame: matFrame(44.8),
      label: "AUDITING MY STACK · NOW",
      enter: "fade",
      exit: "fade",
      enterDuration: 0.25,
      exitDuration: 0.3,
      brollHeightPercent: 58,
      avatarMargin: 90,
      avatarRadius: 40,
    },

    // ═════════════════════════════════════════════════════════════════════
    // BEAT 11 — CTA (47.3-49.4 s)
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "comment_prompt_card",
      t_start: 47.3,
      duration: 2.1,
      username: "faux.thinker",
      header: "COMMENT TO UNLOCK",
      prompt: "Drop ‘AUDIT’ for my full checklist",
    },
    { kind: "sfx", t_start: 47.28, src: "sfx/notification.mp3", volume: 0.9, duration: 0.6 },

    // ═════════════════════════════════════════════════════════════════════
    // Word captions — single-word red at y 78 %, filtered out of the hero
    // windows above. Covers the full 49.44 s.
    // ═════════════════════════════════════════════════════════════════════
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 49.44,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 78,
    },
  ],
};
