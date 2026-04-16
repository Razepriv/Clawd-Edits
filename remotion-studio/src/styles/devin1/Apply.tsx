import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
import { BrandProvider } from "../../brand/BrandProvider";
import { DEVIN_JATHO, FAUX_THINKER } from "../../brand/tokens";
import { ChromaKeyOverlay } from "../../shared/ChromaKeyOverlay";
import { GlitchFlash } from "../../shared/GlitchFlash";
import { OverlayVideo } from "../../shared/OverlayVideo";
import { MattedAvatar } from "../../shared/MattedAvatar";
import { ApplySpec, OverlayEvent } from "../../shared/types";
import { AppIconFloat } from "./components/AppIconFloat";
import { BrollCutaway } from "./components/BrollCutaway";
import { SplitStackBroll } from "./components/SplitStackBroll";
import { WordCaptions } from "./components/WordCaptions";
import { DMToast } from "./components/DMToast";
import { EmphasisCaption } from "./components/EmphasisCaption";
import { FactoidCard } from "./components/FactoidCard";
import { PillTag } from "./components/PillTag";
import { ProfileCard } from "./components/ProfileCard";
import { ReadabilityScale } from "./components/ReadabilityScale";
import { RevenueChart } from "./components/RevenueChart";
import { URLPill } from "./components/URLPill";

// Apply composition — ingests an avatar video + a spec of overlay events
// anchored to absolute seconds in the avatar timeline, and renders the
// Devin 1 style on top.
//
// Audio-anchored pattern: no <Series>, no duration chains. Every overlay
// reads `t_start` directly and Sequence `from` is computed as t_start * fps.
// This means drift is impossible — the avatar's VO drives everything.
export function Devin1Apply(spec: ApplySpec) {
  const { fps } = useVideoConfig();
  const brand = spec.brandKey === "devin_jatho" ? DEVIN_JATHO : FAUX_THINKER;

  const resolveSrc = (src: string): string =>
    src.startsWith("http") || src.startsWith("file:") ? src : staticFile(src);

  return (
    <BrandProvider brand={brand}>
      <AbsoluteFill style={{ backgroundColor: brand.colors.background }}>
        {/* Base: avatar video covers full frame. */}
        <OffthreadVideo src={resolveSrc(spec.avatarVideoSrc)} muted={false} />

        {/* Optional music bed, ducked under avatar VO. */}
        {spec.musicSrc ? (
          <Audio src={resolveSrc(spec.musicSrc)} volume={spec.musicVolume} />
        ) : null}

        {/* Overlay events — each anchored to t_start (seconds). */}
        {spec.events.map((event, i) => {
          const from = Math.round(event.t_start * fps);
          const durationInFrames = Math.max(1, Math.round(event.duration * fps));
          return (
            <Sequence
              key={`${event.kind}-${i}-${event.t_start}`}
              from={from}
              durationInFrames={durationInFrames}
              name={`${event.kind}@${event.t_start.toFixed(2)}s`}
            >
              <RenderEvent event={event} resolveSrc={resolveSrc} />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </BrandProvider>
  );
}

interface RenderEventProps {
  event: OverlayEvent;
  resolveSrc: (src: string) => string;
}

function RenderEvent({ event, resolveSrc }: RenderEventProps) {
  switch (event.kind) {
    case "profile_card":
      return <ProfileCard name={event.name} followers={event.followers} verified={event.verified} />;
    case "revenue_chart":
      return (
        <RevenueChart
          label={event.label}
          subLabel={event.subLabel}
          growthValue={event.growthValue}
          baselineValue={event.baselineValue}
          axisLeft={event.axisLeft}
          axisRight={event.axisRight}
          valuePrefix={event.valuePrefix}
          valueSuffix={event.valueSuffix}
          growthOnRight={event.growthOnRight}
        />
      );
    case "emphasis_caption":
      return (
        <EmphasisCaption
          line1={event.line1}
          line2={event.line2}
          line2GradientStart={event.line2GradientStart}
          line2GradientEnd={event.line2GradientEnd}
          yPosition={event.yPosition}
        />
      );
    case "url_pill":
      return <URLPill url={event.url} framesPerChar={event.framesPerChar} showCursor={event.showCursor} />;
    case "factoid_card":
      return <FactoidCard text={event.text} />;
    case "readability_scale":
      return (
        <ReadabilityScale
          targetPosition={event.targetPosition}
          fadeAbove={event.fadeAbove}
          label={event.label}
        />
      );
    case "app_icon_float":
      return (
        <AppIconFloat
          icon={<img src={resolveSrc(event.iconSrc)} alt="" style={{ width: "72%", height: "72%", objectFit: "contain" }} />}
          backgroundColor={event.backgroundColor}
          size={event.size}
        />
      );
    case "pill_stack":
      return (
        <PillStackRenderer
          event={event}
          resolveSrc={resolveSrc}
        />
      );
    case "dm_toast":
      return <DMToast username={event.username} message={event.message} timeLabel={event.timeLabel} />;
    case "chroma_overlay":
      return (
        <ChromaKeyOverlay
          src={event.src}
          keyColor={event.keyColor}
          similarity={event.similarity}
          smoothness={event.smoothness}
          spill={event.spill}
          opacity={event.opacity}
        />
      );
    case "glitch_flash":
      return <GlitchFlash intensity={event.intensity} slices={event.slices} flash={event.flash} />;
    case "sfx":
      return <Audio src={resolveSrc(event.src)} volume={event.volume} />;
    case "broll_cutaway":
      return (
        <BrollCutaway
          src={event.src}
          enter={event.enter}
          exit={event.exit}
          enterDuration={event.enterDuration}
          exitDuration={event.exitDuration}
          label={event.label}
          totalDuration={event.duration}
        />
      );
    case "word_captions":
      return (
        <WordCaptions
          words={event.words}
          t_start={event.t_start}
          windowSize={event.windowSize}
          yPercent={event.yPercent}
        />
      );
    case "overlay_video":
      return (
        <OverlayVideo
          src={event.src}
          blendMode={event.blendMode}
          opacity={event.opacity}
          scale={event.scale}
        />
      );
    case "matted_avatar":
      return (
        <MattedAvatar
          patternPath={event.patternPath}
          firstFrameNumber={event.firstFrameNumber}
          scale={event.scale}
          xPercent={event.xPercent}
          yPercent={event.yPercent}
        />
      );
    case "stacked_broll":
      return (
        <SplitStackBroll
          brollSrc={event.brollSrc}
          avatarSrc={event.avatarSrc}
          avatarStartSeconds={event.avatarStartSeconds}
          mattedPatternPath={event.mattedPatternPath}
          mattedFirstFrame={event.mattedFirstFrame}
          label={event.label}
          totalDuration={event.duration}
          enter={event.enter}
          exit={event.exit}
          enterDuration={event.enterDuration}
          exitDuration={event.exitDuration}
          brollHeightPercent={event.brollHeightPercent}
          avatarMargin={event.avatarMargin}
          avatarRadius={event.avatarRadius}
        />
      );
  }
}

// PillStackRenderer supports two modes:
// - Classic: staggerFrames + uniform from=event.t_start (legacy).
// - Per-pill absolute: each pill.t_pill_start is an absolute second in the
//   avatar timeline; we compute the Sequence offset relative to event.t_start
//   so each pill pops exactly when its anchor word is spoken.
interface PillStackEvent {
  t_start: number;
  duration: number;
  pills: ReadonlyArray<{
    label: string;
    iconSrc?: string;
    t_pill_start?: number;
    pill_duration?: number;
  }>;
  from: "left" | "right";
  staggerFrames: number;
}

interface PillStackRendererProps {
  event: PillStackEvent;
  resolveSrc: (src: string) => string;
}

function PillStackRenderer({ event, resolveSrc }: PillStackRendererProps) {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      {event.pills.map((pill, idx) => {
        const offsetFrames =
          pill.t_pill_start !== undefined
            ? Math.max(0, Math.round((pill.t_pill_start - event.t_start) * fps))
            : idx * event.staggerFrames;
        const durationFrames =
          pill.pill_duration !== undefined
            ? Math.round(pill.pill_duration * fps)
            : Math.round(event.duration * fps) - offsetFrames;
        return (
          <Sequence
            key={idx}
            from={offsetFrames}
            durationInFrames={Math.max(1, durationFrames)}
            name={`pill-${pill.label}@${pill.t_pill_start ?? event.t_start + idx * (event.staggerFrames / fps)}`}
          >
            <div style={{ position: "absolute", top: 760 + idx * 150, left: 90 }}>
              <PillTag
                label={pill.label}
                from={event.from}
                icon={
                  pill.iconSrc ? (
                    <img src={resolveSrc(pill.iconSrc)} alt="" style={{ width: 36, height: 36 }} />
                  ) : undefined
                }
              />
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
