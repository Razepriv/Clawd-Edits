// Devin 1 style tokens — extracted from the audit of Devin 1.mp4
// Source: D:/video editor/_audit/Devin Jahod/Devin 1/PLAYBOOK.md

export const DEVIN1 = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 24,
    aspectRatio: "9:16" as const,
  },
  colors: {
    background: "#0A0A0F",
    rimPurple: "#A845FF",
    rimPurpleFrom: "#6B2DFF",
    rimBlue: "#1A4B80",
    rimBlueTo: "#2D6FB3",
    textPrimary: "#FFFFFF",
    captionGradientStart: "#FF4DA6",
    captionGradientEnd: "#A845FF",
    growthGreen: "#2AE66E",
    baselineGrey: "#5C6671",
    warningRed: "#E6444A",
    cardSurface: "#141419",
    cardBorder: "rgba(255,255,255,0.15)",
    blueHighlight: "#4A90E2",
  },
  fonts: {
    // Emphasis caption — free substitute for Obviously Wide / Druk Wide.
    // "Archivo Black" via Google Fonts is the closest royalty-free match.
    emphasis: "'Archivo Black', 'Bebas Neue', sans-serif",
    // UI cards — SF Pro / Inter equivalent
    ui: "'Inter', system-ui, -apple-system, sans-serif",
    // Decorative handwritten (readability scale label)
    handwritten: "'Caveat', 'Homemade Apple', cursive",
  },
  timings: {
    captionIn: 3, // frames (at 24fps = 125ms) for scale+opacity rise
    captionHold: 28, // frames (~1.2s)
    captionOut: 4,
    pillSlideIn: 6, // frames
    pillStagger: 4, // frames between stacked pills
    rgbGlitchDuration: 2, // 1–2 frames, full-frame chroma split
    counterUpDuration: 24, // frames (1s)
  },
  // Card geometry (applied proportionally to 1080x1920 canvas)
  card: {
    borderRadius: 22,
    padding: 22,
    shadowBlur: 40,
    shadowOpacity: 0.45,
    backdropBlur: 18,
  },
  // Emphasis caption sizing
  caption: {
    fontSize: 168, // px at 1080x1920 — ~15.5% of frame width
    lineHeight: 1.05,
    tracking: -0.02, // letter-spacing as em
    dropShadowBlur: 14,
    dropShadowOpacity: 0.65,
    outerGlow: "0 0 6px rgba(255,255,255,0.25)",
  },
} as const;

export type Devin1Tokens = typeof DEVIN1;
