import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useBrand } from "../../../brand/BrandProvider";

export interface TerminalAgentLine {
  agent: string;          // e.g. "agent-1"
  agentColor?: string;    // e.g. "#FF2A2A"
  text: string;           // the command / output
  /** Absolute frame inside the beat when this line lands. */
  atFrame: number;
  /** Style hint: "command" shows $ prefix, "log" is plain, "ok" is green. */
  kind?: "command" | "log" | "ok" | "fail";
}

export interface TerminalAgentSimProps {
  /** Scripted timeline of lines. */
  lines: TerminalAgentLine[];
  /** Title bar text. */
  title?: string;
}

// Fake Codex CLI showing 3 agents running in parallel with colored prefixes.
// Authenticity anchor for beat-3 — the user sees the MultiAgentOrchestra card
// floating above a real-feeling terminal output stream.
export function TerminalAgentSim({
  lines,
  title = "codex \u2014 agent-mode",
}: TerminalAgentSimProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brand = useBrand();

  const cardWidth = 960;
  const cardHeight = 580;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
    durationInFrames: 14,
  });
  const cardY       = interpolate(entrance, [0, 1], [80, 0]);
  const cardOpacity = interpolate(entrance, [0, 0.5, 1], [0, 1, 1]);

  // Show lines progressively as their atFrame is reached.
  const visibleLines = lines.filter(l => frame >= l.atFrame);

  // Blinking cursor on the trailing line.
  const cursorOn = Math.floor(frame / 12) % 2 === 0;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "4%", pointerEvents: "none" }}>
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 18,
          backgroundColor: "#0B0B0F",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 28px 58px rgba(0,0,0,0.65)",
          color: "#D6D6D9",
          fontFamily: "ui-monospace, 'JetBrains Mono', Menlo, monospace",
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "#15151A",
        }}>
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#FF5F57" }}/>
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#FEBC2E" }}/>
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#28C840" }}/>
          <span style={{ marginLeft: 14, fontSize: 18, color: "#9AA0A6" }}>{title}</span>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "16px 22px", overflow: "hidden", fontSize: 22, lineHeight: 1.5 }}>
          {visibleLines.map((l, i) => {
            const prefixColor = l.agentColor ?? brand.colors.accent;
            const textColor =
              l.kind === "ok"   ? "#2AE66E" :
              l.kind === "fail" ? "#FF6B6B" :
              "#E6E6EA";
            const isLast = i === visibleLines.length - 1;
            return (
              <div key={i} style={{ whiteSpace: "pre", color: textColor, opacity: frame >= l.atFrame + 1 ? 1 : 0 }}>
                <span style={{ color: prefixColor, fontWeight: 700 }}>[{l.agent}]</span>
                {l.kind === "command" ? <span style={{ color: "#9AA0A6" }}>{" $ "}</span> : <span>{" "}</span>}
                <span>{l.text}</span>
                {isLast && cursorOn ? <span style={{ display: "inline-block", width: 12, height: 22, backgroundColor: "#E6E6EA", marginLeft: 4, verticalAlign: "bottom" }}/> : null}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}
