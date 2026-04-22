import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COHOUSY_EXTRA } from "../../brand/cohousy";

export interface CohousyPromiseRow {
  text: string;
  highlight?: string;
}

export interface CohousyPromiseListProps {
  header?: string;
  rows: CohousyPromiseRow[];
  staggerFrames?: number;
  yPercent?: number;
}

// Below-chin staggered check-list for the service promise ("We bring
// tenants / Collect rent / Handle maintenance / Handle legal"). Each
// row enters with a soft spring + orange circle-check.
export function CohousyPromiseList({
  header,
  rows,
  staggerFrames = 8,
  yPercent = 54,
}: CohousyPromiseListProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: `${yPercent}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pointerEvents: "none",
        padding: "0 72px",
      }}
    >
      {header ? (
        <span
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 42,
            letterSpacing: "0.1em",
            color: COHOUSY_EXTRA.orange300,
            textTransform: "uppercase",
            marginBottom: 24,
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
          }}
        >
          {header}
        </span>
      ) : null}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "rgba(15, 10, 6, 0.78)",
          borderRadius: 28,
          border: `2px solid ${COHOUSY_EXTRA.orange500}`,
          padding: "28px 36px",
          boxShadow: `0 12px 42px rgba(255, 128, 2, 0.25), 0 0 0 1px rgba(255, 184, 109, 0.15)`,
          backdropFilter: "blur(6px)",
        }}
      >
        {rows.map((row, i) => {
          const enter = spring({
            frame: frame - i * staggerFrames,
            fps,
            config: { damping: 16, stiffness: 220, mass: 0.7 },
            durationInFrames: 8,
          });
          const opacity = interpolate(enter, [0, 0.5, 1], [0, 1, 1]);
          const translateX = interpolate(enter, [0, 1], [-48, 0]);

          // Split row.text so we can colour the highlighted span in orange
          const hl = row.highlight;
          const parts = hl && row.text.includes(hl)
            ? [
                row.text.slice(0, row.text.indexOf(hl)),
                hl,
                row.text.slice(row.text.indexOf(hl) + hl.length),
              ]
            : null;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "14px 4px",
                borderBottom:
                  i < rows.length - 1
                    ? `1px solid rgba(255, 184, 109, 0.18)`
                    : "none",
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  background: `linear-gradient(135deg, ${COHOUSY_EXTRA.orange300}, ${COHOUSY_EXTRA.orange600})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 18px rgba(255, 128, 2, 0.5)`,
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12.5L10 18L20 6"
                    stroke="#0F0A06"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 40,
                  color: "#FFFFFF",
                  letterSpacing: "0.01em",
                  lineHeight: 1.15,
                }}
              >
                {parts ? (
                  <>
                    {parts[0]}
                    <span style={{ color: COHOUSY_EXTRA.orange500 }}>
                      {parts[1]}
                    </span>
                    {parts[2]}
                  </>
                ) : (
                  row.text
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
