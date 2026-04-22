import { interpolate, useCurrentFrame, useVideoConfig, spring, Img, staticFile } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyLogoLockupProps {
  tagline?: string;
  sub?: string;
  variant?: "hero" | "outro";
}

// Orange COHOUSY logo lockup reveal. `hero` variant sits at top with a
// pill; `outro` variant is a giant center lockup with the tagline
// underneath. Both use the real logo PNG from public/cohousy/logos/.
export function CohousyLogoLockup({
  tagline,
  sub,
  variant = "hero",
}: CohousyLogoLockupProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 190, mass: 0.9 },
    durationInFrames: 12,
  });
  const opacity = interpolate(rise, [0, 0.4, 1], [0, 1, 1]);
  const scale = interpolate(rise, [0, 1], [0.82, 1]);
  const tyHero = interpolate(rise, [0, 1], [-28, 0]);
  const tyOutro = interpolate(rise, [0, 1], [40, 0]);

  if (variant === "hero") {
    return (
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          opacity,
          transform: `translateY(${tyHero}px) scale(${scale})`,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.96)",
            borderRadius: 999,
            padding: "14px 30px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: `0 12px 32px rgba(255, 128, 2, 0.35), 0 0 0 2px ${COHOUSY_EXTRA.orange500}`,
          }}
        >
          <Img
            src={staticFile("cohousy/logos/cohousy_logo.png")}
            style={{ height: 64, width: "auto" }}
          />
          {tagline ? (
            <span
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 28,
                letterSpacing: "0.08em",
                color: COHOUSY_EXTRA.orange700,
                textTransform: "uppercase",
              }}
            >
              {tagline}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  // outro: full center lockup
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        background: "radial-gradient(circle at 50% 50%, rgba(255,128,2,0.18), rgba(15,10,6,0.75) 60%, rgba(15,10,6,0.92) 100%)",
        opacity,
        transform: `translateY(${tyOutro}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 36,
          padding: "42px 68px",
          boxShadow: `0 22px 58px rgba(0,0,0,0.55), 0 0 0 2px ${COHOUSY_EXTRA.orange500}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("cohousy/logos/cohousy_logo.png")}
          style={{ height: 140, width: "auto" }}
        />
        {tagline ? (
          <span
            style={{
              marginTop: 22,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 40,
              letterSpacing: "0.08em",
              color: COHOUSY_EXTRA.orange700,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {tagline}
          </span>
        ) : null}
        {sub ? (
          <span
            style={{
              marginTop: 8,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 26,
              color: "#6B6259",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {sub}
          </span>
        ) : null}
      </div>
    </div>
  );
}
