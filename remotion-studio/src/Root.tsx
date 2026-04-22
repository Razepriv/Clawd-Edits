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
import { FAUX_THINKER_CODEX_SPEC } from "./styles/devin1/codexLaunchSpec";
import { FAUX_THINKER_CANVA_SPEC } from "./styles/devin1/canvaPipelineSpec";
import { FAUX_THINKER_CANVA_V2_SPEC } from "./styles/devin1/canvaPipelineSpecV2";
import { FAUX_THINKER_VERCEL_BREACH_SPEC } from "./styles/devin1/vercelBreachSpec";
import { COHOUSY_001_SPEC } from "./cohousy/cohousy001Spec";

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

      {/* FauxThinker Codex launch Reel — 46 s OpenAI Codex reveal.
          Opens with a 2.4 s anime hook clip visualising code erupting from a
          laptop into 3 hologram agents, then lands on the avatar. Uses 7 new
          components: AnimeHookClip + MultiAgentOrchestra + TerminalAgentSim +
          SleepCycleOverlay + QuoteSlam ("STAFF") + SideProjectBadge +
          ComparisonCard + CommentPromptCard (open CTA). */}
      <Composition
        id="FauxThinker-Codex"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_CODEX_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />

      {/* FauxThinker Canva Pipeline reel — 42 s contrarian take on
          Anthropic's Claude Design launch (Apr 17 2026). Opens with an
          anime hook (Canva-tombstone crack + anime Perkins rising with a
          glowing crystal tablet), then runs through 8 new v12.3 components:
          DeadTakeStrikethrough, HotTakesFeed, QuoteCard (actual Perkins
          quote from the launch), ExportChipRow (PDF/PPTX/HTML/→Canva with
          Canva igniting), PipelineDiagram, StackShipCard, BrandKitReveal,
          YearToggleCard (scanner→settle on 2026). */}
      <Composition
        id="FauxThinker-CanvaPipeline"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_CANVA_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />

      {/* FauxThinker Canva Pipeline v2 — re-cut per user's new edit plan:
          - 0-3 s split-screen textual hook (no face in scene 1)
          - DateTag "APR 17, 2026 · CLAUDE DESIGN LAUNCH" top-center
          - 4-8 s AnthropicPageScroll with cursor landing on headline
          - 10-14 s 3× X hot-take flash-cut (blurred handles)
          - 14-18 s scroll down to Perkins quote on Anthropic page
          - 17-20 s QuoteCard with verbatim Perkins quote
          - 18-20 s ExportChipRow (PDF/PPTX/HTML/→Canva)
          - 20-23 s SaveMomentSlate "It's not a replacement. It's a pipeline."
          - 26-33 s NumberedList (3-rule advice)
          - 29-34 s Canva editor proof shot + stacked B-roll
          - 34-38 s QuestionCaption "Which tool are you keeping in 2026?"
          - 39-42 s CommentPromptCard CTA
          All overlays respect IG safe zones (middle 70 %, clear of
          top 10 % / bottom 20 % / right 15 %). 7 new v12.4 components. */}
      <Composition
        id="FauxThinker-CanvaPipeline-v2"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_CANVA_V2_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />

      {/* FauxThinker Vercel × Context.ai breach reel — 49 s breaking-news
          contrarian take on the Apr 19 2026 Vercel security incident.
          Opens with a Veo-3 Fast comic hook (data center + cracked Vercel
          triangle + exploding OAuth tokens / Google shards), then the
          a-roll with: real Vercel KB bulletin B-roll (head-pop-out),
          Google Workspace icon swoop, DM-toast "127 apps connected"
          receipt, 3-step audit checklist, three real X takes (@SecureChap
          attack-chain, @NEARDevHub advisory, @heygreendev audit-advice),
          IOC factoid, and a final "COMMENT AUDIT" CTA card. */}
      <Composition
        id="FauxThinker-VercelBreach"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={FAUX_THINKER_VERCEL_BREACH_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />

      {/* Cohousy reel #001 — Santhosh's 40.84 s Hindi pitch for cohousy's
          property-management service for Pune flat owners. Completely
          isolated brand (orange #FF8002 palette, Tiro Devanagari Hindi
          typography, purpose-built CohousyBigStat / CohousyPromiseList /
          CohousyComparisonBox / CohousyMoneyFlow / CohousyLogoLockup /
          CohousyCTAFollow components). Opens with a Veo-3 hook clip of a
          Pune skyline, brass apartment key + rupee-coin stream, then
          delivers the 4-row promise list, rent-receipt money flow,
          BROKER-vs-SYSTEM comparison, 30+/98%/100% stats trio, and a
          follow-for-details CTA. All overlays strictly below the chin. */}
      <Composition
        id="Cohousy-001"
        component={Devin1Apply}
        fps={25}
        width={1080}
        height={1920}
        defaultProps={COHOUSY_001_SPEC}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.duration * 25),
        })}
      />
    </>
  );
};
