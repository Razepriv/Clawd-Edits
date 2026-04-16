import { ApplySpec } from "../../shared/types";

// Example Devin 1 Apply spec — mirrors the reference video's structure
// so you can see how a full 70s Reel is described.
// Replace `avatarVideoSrc` with your actual uploaded avatar video file name
// placed under remotion-studio/public/.
export const DEVIN1_SAMPLE_SPEC: ApplySpec = {
  avatarVideoSrc: "avatar_placeholder.mp4",
  duration: 70,
  brandKey: "faux_thinker",
  musicVolume: 0.15,
  events: [
    {
      kind: "profile_card",
      t_start: 0.0,
      duration: 5.0,
      name: "Razeen Shaheed",
      followers: "16 followers",
      verified: true,
    },
    {
      kind: "revenue_chart",
      t_start: 2.0,
      duration: 4.5,
      label: "Automations shipped",
      subLabel: "per month",
      growthValue: 42,
      baselineValue: 6,
      axisLeft: "Q1",
      axisRight: "Q2",
      valuePrefix: "",
      valueSuffix: "",
    },
    {
      kind: "emphasis_caption",
      t_start: 10.4,
      duration: 1.5,
      line1: "NOW MY",
      line2: "GOAL",
      precursor: "rgb_glitch",
    },
    {
      kind: "pill_stack",
      t_start: 14.0,
      duration: 3.0,
      pills: [{ label: "Rapid" }, { label: "Automation" }],
      from: "left",
      staggerFrames: 4,
    },
    {
      kind: "url_pill",
      t_start: 20.0,
      duration: 5.0,
      url: "n8n.io/faux-thinker",
      framesPerChar: 2,
      showCursor: true,
    },
    {
      kind: "factoid_card",
      t_start: 56.6,
      duration: 3.5,
      text: "Most creators spend {{80% of their time}} on repetitive work.",
    },
    {
      kind: "readability_scale",
      t_start: 52.0,
      duration: 4.0,
      targetPosition: 7,
      fadeAbove: 7,
      label: "Readability",
    },
    {
      kind: "emphasis_caption",
      t_start: 48.8,
      duration: 1.6,
      line1: "THAT I",
      line2: "FOLLOW",
      precursor: "rgb_glitch",
    },
    {
      kind: "dm_toast",
      t_start: 66.0,
      duration: 4.0,
      username: "faux.thinker",
      message: "Here's your automation blueprint",
      timeLabel: "now",
    },
  ],
};
