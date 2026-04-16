import { AbsoluteFill, Sequence } from "remotion";
import { BrandProvider } from "../../brand/BrandProvider";
import { Brand, FAUX_THINKER } from "../../brand/tokens";
import { DEVIN1 } from "./constants";
import { AppIconFloat } from "./components/AppIconFloat";
import { DMToast } from "./components/DMToast";
import { EmphasisCaption } from "./components/EmphasisCaption";
import { FactoidCard } from "./components/FactoidCard";
import { PillTag } from "./components/PillTag";
import { ProfileCard } from "./components/ProfileCard";
import { ReadabilityScale } from "./components/ReadabilityScale";
import { RevenueChart } from "./components/RevenueChart";
import { URLPill } from "./components/URLPill";

export interface Devin1DemoProps {
  brand?: Brand;
}

// Full Devin 1 style showcase — each beat renders a different component so
// individual frames can be rendered and compared to the reference audit.
// Duration: 32 s at 24fps = 768 frames.
export function Devin1Demo({ brand = FAUX_THINKER }: Devin1DemoProps) {
  return (
    <BrandProvider brand={brand}>
      <AbsoluteFill style={{ backgroundColor: brand.colors.background, fontFamily: brand.fonts.ui }}>
        {/* Subtle rim-light wash using the brand accent color. Placeholder
            for where the user's avatar video will render in Apply.tsx. */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(60% 50% at 50% 40%, ${brand.colors.accent}33 0%, ${brand.colors.background} 70%)`,
          }}
        />

        {/* Beat 1 (0–3s @ 0): ProfileCard */}
        <Sequence from={0} durationInFrames={72} name="ProfileCard">
          <ProfileCard name={brand.channel.displayName} followers={brand.channel.followers ?? ""} verified />
        </Sequence>

        {/* Beat 2 (3–8s): RevenueChart */}
        <Sequence from={72} durationInFrames={120} name="RevenueChart">
          <RevenueChart growthValue={507113} baselineValue={317281} />
        </Sequence>

        {/* Beat 3 (8–10s): EmphasisCaption "NOW MY / GOAL" */}
        <Sequence from={192} durationInFrames={48} name="EmphasisCaption 1">
          <EmphasisCaption line1="NOW MY" line2="GOAL" />
        </Sequence>

        {/* Beat 4 (10–13s): URL pill with typing */}
        <Sequence from={240} durationInFrames={72} name="URLPill">
          <URLPill url="n8n.io/faux-thinker" framesPerChar={2} />
        </Sequence>

        {/* Beat 5 (13–16s): FactoidCard with highlighted phrase */}
        <Sequence from={312} durationInFrames={72} name="FactoidCard">
          <FactoidCard text="The average reading level in the U.S. is around {{7th-grade level}}." />
        </Sequence>

        {/* Beat 6 (16–20s): ReadabilityScale pointer slides to 7, dots 8–10 fade */}
        <Sequence from={384} durationInFrames={96} name="ReadabilityScale">
          <ReadabilityScale targetPosition={7} fadeAbove={7} />
        </Sequence>

        {/* Beat 7 (20–24s): AppIconFloat */}
        <Sequence from={480} durationInFrames={96} name="AppIconFloat">
          <AppIconFloat icon={<PlaceholderAppIcon />} />
        </Sequence>

        {/* Beat 8 (24–28s): PillTag stack */}
        <Sequence from={576} durationInFrames={96} name="Pills">
          <AbsoluteFill>
            <div style={{ position: "absolute", top: 820, left: 120 }}>
              <PillTag label="Rapid" />
            </div>
            <Sequence from={DEVIN1.timings.pillStagger} name="Pill 2">
              <div style={{ position: "absolute", top: 940, left: 120 }}>
                <PillTag label="Automation" />
              </div>
            </Sequence>
          </AbsoluteFill>
        </Sequence>

        {/* Beat 9 (28–32s): DMToast CTA payoff */}
        <Sequence from={672} durationInFrames={96} name="DMToast">
          <DMToast username={brand.channel.handle} message="Here's your automation blueprint" />
        </Sequence>
      </AbsoluteFill>
    </BrandProvider>
  );
}

function PlaceholderAppIcon() {
  return (
    <svg width={240} height={240} viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A2A" />
          <stop offset="100%" stopColor="#E91212" />
        </linearGradient>
      </defs>
      <path
        d="M60 70 Q60 55 75 55 L90 55 L90 185 L75 185 Q60 185 60 170 Z M110 55 L135 55 L135 185 L110 185 Z M155 55 L180 55 Q195 55 195 70 L195 170 Q195 185 180 185 L155 185 Z"
        fill="url(#pa-grad)"
      />
    </svg>
  );
}
