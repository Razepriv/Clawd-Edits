import { ApplySpec } from "../../shared/types";

// ApplySpec for the @faux.thinker OpenAI Codex launch reel — v1.
//
// Source: D:/video editor/Videos/Insta_Video_3.mp4 -> public/avatar_codex.mp4
//   duration 46.49 s, 1080x1920, 25 fps, AAC 48 kHz stereo, continuous
//   single-shot avatar with no scene cuts.
//
// Narrative (9 beats):
//   0  ANIME HOOK      0.00-2.40   [overlay] anime visualisation of the hook
//   1  HOOK (VO)       0.00-2.38   "Codex just stopped being a coding tool."
//   2  STAKES          2.92-6.06   "OpenAI shipped six updates. One actually matters."
//   3  PROOF / DEMO    6.36-18.44  3-agent parallel flow + "while you sleep"
//   4  FRAME SHIFT     18.88-22.40 "The AI is queuing yours."
//   5  PAYOFF          23.30-29.10 "it is the first version of having STAFF."  ★
//   6  CRED / BALANCE  29.44-35.48 "not switching from Claude, side project / 2 weeks"
//   7  PHILOSOPHICAL   35.86-41.32 "talk to vs let it RUN YOUR MACHINE"        ★
//   8  CTA             42.08-46.26 "Drop the model you are sticking with."
//
// Style: faux.thinker v12 locked with Codex-reel additions (v12.2):
//   - AnimeHookClip overlay wraps the hook with an anime-style visualisation
//   - MultiAgentOrchestra + TerminalAgentSim + SleepCycleOverlay for beat 3
//   - QuoteSlam "STAFF" replaces a plain EmphasisCaption for beat 5 payoff
//   - ComparisonCard for beat 7 rhetorical pivot
//   - CommentPromptCard replaces DMToast for beat 8 (open comment question)
//   - SideProjectBadge for beat 6 credibility marker
//
// Whisper mishears corrected: "stop being"->"stopped being", "Open AI"->"OpenAI",
// "one test sit"->"one runs the test suite", "having stuff"->"having staff",
// "site project"->"side project".

type Word = { start: number; end: number; word: string };

const ALL_WORDS: Word[] = [
  { start: 0.0, end: 0.56, word: "Codex" },
  { start: 0.56, end: 0.88, word: "just" },
  { start: 0.88, end: 1.28, word: "stopped" },
  { start: 1.28, end: 1.56, word: "being" },
  { start: 1.56, end: 1.78, word: "a" },
  { start: 1.78, end: 2.02, word: "coding" },
  { start: 2.02, end: 2.38, word: "tool." },
  { start: 2.92, end: 3.34, word: "OpenAI" },
  { start: 3.34, end: 3.74, word: "shipped" },
  { start: 3.74, end: 4.04, word: "six" },
  { start: 4.04, end: 4.48, word: "updates." },
  { start: 4.9, end: 5.18, word: "One" },
  { start: 5.18, end: 5.66, word: "actually" },
  { start: 5.66, end: 6.06, word: "matters." },
  { start: 6.36, end: 6.72, word: "Codex" },
  { start: 6.72, end: 6.9, word: "now" },
  { start: 6.9, end: 7.14, word: "runs" },
  { start: 7.14, end: 7.68, word: "multiple" },
  { start: 7.68, end: 8.12, word: "agents" },
  { start: 8.12, end: 8.32, word: "on" },
  { start: 8.32, end: 8.46, word: "your" },
  { start: 8.46, end: 8.76, word: "machine." },
  { start: 9.44, end: 9.58, word: "One" },
  { start: 9.58, end: 9.94, word: "fixes" },
  { start: 9.94, end: 10.16, word: "a" },
  { start: 10.16, end: 10.3, word: "bug," },
  { start: 10.74, end: 10.96, word: "one" },
  { start: 10.96, end: 11.11, word: "runs" },
  { start: 11.11, end: 11.25, word: "the" },
  { start: 11.25, end: 11.39, word: "test" },
  { start: 11.39, end: 11.54, word: "suite" },
  { start: 11.98, end: 12.2, word: "one" },
  { start: 12.2, end: 12.58, word: "reviews" },
  { start: 12.58, end: 12.82, word: "the" },
  { start: 12.82, end: 13.14, word: "output" },
  { start: 13.14, end: 14.06, word: "while" },
  { start: 14.06, end: 14.32, word: "you" },
  { start: 14.32, end: 14.64, word: "sleep." },
  { start: 15.14, end: 15.4, word: "And" },
  { start: 15.4, end: 15.52, word: "when" },
  { start: 15.52, end: 15.68, word: "you" },
  { start: 15.68, end: 15.88, word: "wake" },
  { start: 15.88, end: 16.12, word: "up," },
  { start: 16.5, end: 16.6, word: "it" },
  { start: 16.6, end: 16.9, word: "tells" },
  { start: 16.9, end: 17.16, word: "you" },
  { start: 17.16, end: 17.52, word: "what" },
  { start: 17.52, end: 17.76, word: "to" },
  { start: 17.76, end: 17.98, word: "work" },
  { start: 17.98, end: 18.16, word: "on" },
  { start: 18.16, end: 18.44, word: "next." },
  { start: 18.88, end: 18.98, word: "The" },
  { start: 18.98, end: 19.32, word: "AI" },
  { start: 19.32, end: 19.68, word: "is" },
  { start: 19.68, end: 19.88, word: "no" },
  { start: 19.88, end: 20.22, word: "longer" },
  { start: 20.22, end: 20.56, word: "waiting" },
  { start: 20.56, end: 20.8, word: "for" },
  { start: 20.8, end: 21.14, word: "work." },
  { start: 21.54, end: 21.68, word: "It" },
  { start: 21.68, end: 21.82, word: "is" },
  { start: 21.82, end: 22.16, word: "queuing" },
  { start: 22.16, end: 22.4, word: "yours." },
  { start: 23.3, end: 23.5, word: "For" },
  { start: 23.5, end: 23.66, word: "a" },
  { start: 23.66, end: 23.88, word: "solo" },
  { start: 23.88, end: 24.26, word: "agency," },
  { start: 24.62, end: 24.78, word: "this" },
  { start: 24.78, end: 24.88, word: "is" },
  { start: 24.88, end: 25.2, word: "not" },
  { start: 25.2, end: 25.36, word: "a" },
  { start: 25.36, end: 25.8, word: "productivity" },
  { start: 25.8, end: 26.2, word: "boost." },
  { start: 26.84, end: 27.04, word: "It" },
  { start: 27.04, end: 27.18, word: "is" },
  { start: 27.18, end: 27.3, word: "the" },
  { start: 27.3, end: 27.78, word: "first" },
  { start: 27.78, end: 28.18, word: "version" },
  { start: 28.18, end: 28.44, word: "of" },
  { start: 28.44, end: 28.76, word: "having" },
  { start: 28.76, end: 29.1, word: "staff." },
  { start: 29.44, end: 29.5, word: "I" },
  { start: 29.5, end: 29.64, word: "am" },
  { start: 29.64, end: 29.88, word: "not" },
  { start: 29.88, end: 30.2, word: "switching" },
  { start: 30.2, end: 30.44, word: "from" },
  { start: 30.44, end: 30.88, word: "Claude," },
  { start: 31.82, end: 31.92, word: "but" },
  { start: 31.92, end: 32.18, word: "I" },
  { start: 32.18, end: 32.3, word: "am" },
  { start: 32.3, end: 32.5, word: "running" },
  { start: 32.5, end: 32.76, word: "this" },
  { start: 32.76, end: 33.0, word: "on" },
  { start: 33.0, end: 33.1, word: "a" },
  { start: 33.1, end: 33.36, word: "side" },
  { start: 33.36, end: 33.7, word: "project" },
  { start: 33.7, end: 33.96, word: "for" },
  { start: 33.96, end: 34.32, word: "two" },
  { start: 34.32, end: 34.52, word: "weeks" },
  { start: 34.52, end: 34.76, word: "to" },
  { start: 34.76, end: 34.96, word: "see" },
  { start: 34.96, end: 35.22, word: "what" },
  { start: 35.22, end: 35.48, word: "breaks." },
  { start: 35.86, end: 35.94, word: "The" },
  { start: 35.94, end: 36.34, word: "question" },
  { start: 36.34, end: 36.54, word: "is" },
  { start: 36.54, end: 36.76, word: "not" },
  { start: 36.76, end: 37.28, word: "which" },
  { start: 37.28, end: 37.54, word: "AI" },
  { start: 37.54, end: 37.76, word: "you" },
  { start: 37.76, end: 37.96, word: "talk" },
  { start: 37.96, end: 38.18, word: "to." },
  { start: 38.76, end: 39.0, word: "It" },
  { start: 39.0, end: 39.18, word: "is" },
  { start: 39.18, end: 39.58, word: "which" },
  { start: 39.58, end: 39.84, word: "one" },
  { start: 39.84, end: 40.16, word: "you" },
  { start: 40.16, end: 40.36, word: "let" },
  { start: 40.36, end: 40.74, word: "run" },
  { start: 40.74, end: 40.94, word: "your" },
  { start: 40.94, end: 41.32, word: "machine." },
  { start: 42.08, end: 42.2, word: "Are" },
  { start: 42.2, end: 42.32, word: "you" },
  { start: 42.32, end: 42.56, word: "trying" },
  { start: 42.56, end: 42.78, word: "it?" },
  { start: 44.38, end: 44.78, word: "Drop" },
  { start: 44.78, end: 45.04, word: "the" },
  { start: 45.04, end: 45.28, word: "model" },
  { start: 45.28, end: 45.54, word: "you" },
  { start: 45.54, end: 45.66, word: "are" },
  { start: 45.66, end: 45.94, word: "sticking" },
  { start: 45.94, end: 46.26, word: "with." },
];

// Windows where captions should be hidden (owned by big components).
const HIDDEN_WINDOWS: [number, number][] = [
  [0.0, 2.40],    // AnimeHookClip owns the hook entirely
  [6.36, 18.44],  // MultiAgentOrchestra + TerminalAgentSim + SleepCycleOverlay
  [21.54, 22.40], // EmphasisCaption "QUEUING YOURS"
  [26.84, 29.10], // QuoteSlam "STAFF"
  [32.00, 34.52], // SideProjectBadge holds focus
  [35.86, 41.32], // ComparisonCard
  [42.08, 46.26], // CommentPromptCard
];

const inHidden = (w: Word): boolean =>
  HIDDEN_WINDOWS.some(([a, b]) => w.start >= a && w.start < b);

const VISIBLE_WORDS: Word[] = ALL_WORDS.filter((w) => !inHidden(w));

// Helper: matted firstFrame given t_start seconds in a 25 fps full-video matte.
const matFrame = (t_start: number): number => Math.round(t_start * 25) + 1;

export const FAUX_THINKER_CODEX_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_codex.mp4",
  duration: 46.49,
  brandKey: "faux_thinker",
  musicSrc: "music_bed_v6.mp3",
  musicVolume: 0.11,
  events: [
    // ================= BEAT 0 — ANIME HOOK OVERLAY =================
    // 2.4 s anime clip visualising "Codex stopped being a coding tool".
    {
      kind: "anime_hook_clip",
      t_start: 0.0,
      duration: 2.40,
      src: "hook_anime/codex_hook.mp4",
      startFromSeconds: 0.2,
      label: "CODEX 2026",
    },
    { kind: "sfx", t_start: 0.0, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.95, duration: 1.2 },

    // ================= BEAT 0.5 — LIGHT LEAK TRANSITION (anime → a-roll) =================
    { kind: "overlay_video", t_start: 2.25, duration: 0.75, src: "light_leaks/ll_1.mp4", blendMode: "screen", opacity: 0.95, scale: 1 },
    { kind: "sfx", t_start: 2.22, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ================= BEAT 1 — ProfileCard on open (no name spoken) =================
    {
      kind: "profile_card",
      t_start: 2.60,
      duration: 3.30,
      name: "Razeen Shaheed",
      followers: "faux.thinker",
      verified: true,
    },
    { kind: "sfx", t_start: 2.58, src: "sfx_pack/click.mp3", volume: 0.9, duration: 0.6 },

    // ================= BEAT 3 — MULTI-AGENT ORCHESTRA + TERMINAL =================
    {
      kind: "stacked_broll",
      t_start: 6.36,
      duration: 3.08,
      brollSrc: "platform_recordings/codex_hero_kenburns.mp4",
      avatarSrc: "avatar_codex.mp4",
      avatarStartSeconds: 6.36,
      mattedPatternPath: "matted_avatar_codex/mat_%04d.png",
      mattedFirstFrame: matFrame(6.36),
      label: "CODEX — OPENAI",
      enter: "slide_up",
      exit: "fade",
      enterDuration: 0.25,
      exitDuration: 0.25,
      brollHeightPercent: 63,
      avatarMargin: 86,
      avatarRadius: 40,
    },
    { kind: "sfx", t_start: 6.34, src: "sfx_pack/swoosh_1.mp3", volume: 0.9, duration: 0.6 },

    {
      kind: "multi_agent_orchestra",
      t_start: 9.44,
      duration: 4.00,
      header: "YOUR MACHINE · PARALLEL",
      lanes: [
        { badge: "BUG",    title: "Bug-fixer",   status: "Fixing issue #432", state: "running" },
        { badge: "TEST",   title: "Test suite",  status: "Running 184 specs", state: "running" },
        { badge: "REVIEW", title: "Reviewer",    status: "Reviewing diff",    state: "running" },
      ],
    },
    {
      kind: "terminal_agent_sim",
      t_start: 10.20,
      duration: 3.20,
      title: "codex — agent-mode",
      lines: [
        { agent: "agent-1", agentColor: "#FF4141", text: "codex fix --issue 432",                   atFrame: 2,  kind: "command" },
        { agent: "agent-2", agentColor: "#2AE66E", text: "codex test --watch",                       atFrame: 10, kind: "command" },
        { agent: "agent-3", agentColor: "#5B8EFF", text: "codex review --pr 118",                    atFrame: 18, kind: "command" },
        { agent: "agent-1", agentColor: "#FF4141", text: "patched src/router.ts (+12 -4)",           atFrame: 28, kind: "log" },
        { agent: "agent-2", agentColor: "#2AE66E", text: "184/184 passing",                          atFrame: 40, kind: "ok" },
        { agent: "agent-3", agentColor: "#5B8EFF", text: "LGTM — 2 style nits flagged",              atFrame: 52, kind: "log" },
      ],
    },
    { kind: "sfx", t_start: 9.42, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.6 },

    // Sleep overlay — fires when VO hits "while you sleep"
    {
      kind: "sleep_cycle_overlay",
      t_start: 13.14,
      duration: 4.30,
      label: "WHILE YOU SLEEP",
    },

    // Light leak between beat 3 and beat 4
    { kind: "overlay_video", t_start: 18.40, duration: 0.70, src: "light_leaks/ll_2.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 18.38, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // ================= BEAT 4 — "QUEUING YOURS" emphasis =================
    {
      kind: "emphasis_caption",
      t_start: 21.50,
      duration: 1.20,
      line1: "QUEUING",
      line2: "YOURS",
      precursor: "none",
      yPosition: "center",
    },
    { kind: "sfx", t_start: 21.48, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 0.9 },

    // ================= BEAT 5 — QUOTE SLAM "STAFF" (the killer line) =================
    {
      kind: "quote_slam",
      t_start: 26.80,
      duration: 2.80,
      preLine: "the first version of",
      heroWord: "STAFF",
      afterNote: "for a solo agency",
      yPosition: "center",
    },
    { kind: "sfx", t_start: 26.78, src: "sfx_pack/no_fluff_braam.mp3", volume: 1.0, duration: 1.0 },

    // Light leak between beat 5 and beat 6
    { kind: "overlay_video", t_start: 29.20, duration: 0.65, src: "light_leaks/ll_3.mp4", blendMode: "screen", opacity: 0.85, scale: 1 },
    { kind: "sfx", t_start: 29.18, src: "sfx_pack/shutter.mp3", volume: 0.80, duration: 0.6 },

    // ================= BEAT 6 — SIDE PROJECT BADGE =================
    {
      kind: "side_project_badge",
      t_start: 32.20,
      duration: 3.20,
      label: "SIDE PROJECT",
      meta: "2 WEEKS",
      yPercent: 12,
    },
    { kind: "sfx", t_start: 32.18, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.6 },

    // Light leak between beat 6 and beat 7
    { kind: "overlay_video", t_start: 35.55, duration: 0.70, src: "light_leaks/ll_4.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 35.53, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ================= BEAT 7 — COMPARISON CARD "TALK TO vs RUN YOUR MACHINE" =================
    {
      kind: "comparison_card",
      t_start: 35.90,
      duration: 5.40,
      header: "THE QUESTION ISN'T",
      leftLabel: "TALK TO",
      rightLabel: "RUN YOUR MACHINE",
      toggleAtFrame: 70, // ≈2.8 s into the card at 25 fps — when VO hits "let it RUN"
    },
    { kind: "sfx", t_start: 35.88, src: "sfx_pack/click.mp3", volume: 0.85, duration: 0.6 },
    // Bass hit on the pivot word
    { kind: "sfx", t_start: 40.30, src: "sfx_pack/no_fluff_braam.mp3", volume: 0.85, duration: 0.8 },

    // Light leak between beat 7 and CTA
    { kind: "overlay_video", t_start: 41.55, duration: 0.70, src: "light_leaks/ll_5.mp4", blendMode: "screen", opacity: 0.90, scale: 1 },
    { kind: "sfx", t_start: 41.53, src: "sfx_pack/shutter.mp3", volume: 0.85, duration: 0.6 },

    // ================= BEAT 8 — COMMENT PROMPT CARD (open CTA, not DM-gated) =================
    {
      kind: "comment_prompt_card",
      t_start: 42.00,
      duration: 4.40,
      username: "faux.thinker",
      header: "COMMENT BELOW",
      prompt: "The model I'm sticking with is…",
    },
    { kind: "sfx", t_start: 41.98, src: "sfx/notification.mp3", volume: 0.85, duration: 0.8 },

    // ================= Single-word captions (filtered to avoid HIDDEN_WINDOWS) =================
    {
      kind: "word_captions",
      t_start: 0.0,
      duration: 46.49,
      words: VISIBLE_WORDS,
      windowSize: 1,
      yPercent: 85, // bumped from 78 → 85 because beat 3+ has heavy hand gestures in the 70-85% band
    },
  ],
};
