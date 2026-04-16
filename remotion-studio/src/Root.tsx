import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Devin1Demo } from "./styles/devin1/Demo";
import { Devin1Apply } from "./styles/devin1/Apply";
import { DEVIN1 } from "./styles/devin1/constants";
import { DEVIN_JATHO, FAUX_THINKER } from "./brand/tokens";
import { DEVIN1_SAMPLE_SPEC } from "./styles/devin1/sampleSpec";
import { FAUX_THINKER_INTRO_SPEC } from "./styles/devin1/fauxThinkerIntroSpec";
import { FAUX_THINKER_OPUS_SPEC } from "./styles/devin1/opusLaunchSpec";

export const RemotionRoot = () => {
  return (
    <>
      {/* Scaffolded placeholder composition, kept for sanity. */}
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Devin 1 style applied with faux.thinker brand (RED accent). */}
      <Composition
        id="Devin1-FauxThinker"
        component={Devin1Demo}
        durationInFrames={768}
        fps={DEVIN1.canvas.fps}
        width={DEVIN1.canvas.width}
        height={DEVIN1.canvas.height}
        defaultProps={{ brand: FAUX_THINKER }}
      />

      {/* Devin 1 style applied with reference-accurate Devin Jatho brand
          (PURPLE/MAGENTA accent) — use this to compare against the audit. */}
      <Composition
        id="Devin1-Reference"
        component={Devin1Demo}
        durationInFrames={768}
        fps={DEVIN1.canvas.fps}
        width={DEVIN1.canvas.width}
        height={DEVIN1.canvas.height}
        defaultProps={{ brand: DEVIN_JATHO }}
      />

      {/* Devin 1 Apply — ingests an avatar video + spec of overlay events
          anchored to absolute seconds in the VO timeline. Swap in your own
          avatar video path and events to generate a styled Reel. */}
      <Composition
        id="Devin1-Apply"
        component={Devin1Apply}
        fps={DEVIN1.canvas.fps}
        width={DEVIN1.canvas.width}
        height={DEVIN1.canvas.height}
        defaultProps={DEVIN1_SAMPLE_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * DEVIN1.canvas.fps),
        })}
      />

      {/* FauxThinker intro Reel — applies the Devin 1 style to Razeen's
          31-second WebVerse Arena intro, rendered at 25 fps (source rate). */}
      <Composition
        id="FauxThinker-Intro"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_INTRO_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />

      {/* FauxThinker Opus 4.7 launch Reel — 79 s news-announcement reel on
          Anthropic's Claude Opus 4.7 release (Apr 16 2026). Uses the v12
          canonical 3-layer head-pop-out for 6 platform B-rolls, RevenueChart
          for CursorBench 58 -> 70, four EmphasisCaption slams, DMToast CTA. */}
      <Composition
        id="FauxThinker-Opus"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_OPUS_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />
    </>
  );
};
