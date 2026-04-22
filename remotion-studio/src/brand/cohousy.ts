// Cohousy brand tokens — completely isolated from the faux.thinker stack.
//
// Source: https://www.cohousy.com (CSS tokens extracted from
// /_next/static/chunks/8264a6c6ba3acd39.css). Logo at
// public/cohousy/logos/cohousy_logo.png.
//
// Palette anchor: #FF8002 (bright cohousy orange). Darker warm oranges
// (#FE6E00, #F05100, #C53C00) provide hover/press states + gradients.
// Warm cream (#FFF7ED → #FFEDD5) is the surface family. Typography is
// confident black + warm-grey neutrals — professional, trustworthy,
// urban real-estate positioning.

import type { Brand } from "./tokens";

export const COHOUSY: Brand = {
  name: "cohousy",
  colors: {
    // Cohousy reels use a LIGHT, warm, premium-realestate canvas — the
    // inverse of the faux.thinker pitch-black news aesthetic.
    background: "#0F0A06",      // near-black with a warm undertone (still legible)
    surface: "#1A130C",         // cards on top of background
    textPrimary: "#FFFFFF",
    textSecondary: "#C5BDB3",
    accent: "#FF8002",          // PRIMARY — the exact cohousy orange
    accentBright: "#FFB96D",    // lighter tint for highlights + gradient ends
    link: "#FFB96D",
    growthGreen: "#2AE66E",
    warningRed: "#E40014",
    divider: "rgba(255, 184, 109, 0.22)",   // warm orange divider
    shadow: "rgba(10, 6, 2, 0.55)",
  },
  fonts: {
    emphasis: "'Archivo Black', 'Bebas Neue', sans-serif",
    ui: "'Inter', system-ui, -apple-system, sans-serif",
    // Use Tiro Devanagari Hindi for Hindi overlay readability — Google
    // Fonts-hosted font with real Devanagari glyphs + matching Latin.
    handwritten: "'Tiro Devanagari Hindi', 'Caveat', serif",
  },
  channel: {
    handle: "cohousy",
    displayName: "Cohousy",
    tagline: "Flat management, done right.",
    followers: "Pune, India",
  },
};

// Extra cohousy-only swatches used by property-management components.
// Kept as a separate export so they don't bleed into the generic Brand
// interface (which other brands don't need).
export const COHOUSY_EXTRA = {
  // Tint ramp — matches CSS tokens from the live site
  orange50: "#FFF7ED",
  orange100: "#FFEDD5",
  orange200: "#FFD7A8",
  orange300: "#FFB96D",
  orange400: "#FF8B1A",
  orange500: "#FF8002",   // canonical
  orange600: "#FE6E00",
  orange700: "#F05100",
  orange800: "#C53C00",
  // Neutral companions
  ink: "#0F0A06",
  cream: "#FFF7ED",
  // Category tints for stat cards
  occupancy: "#FF8002",
  payment: "#2AE66E",
  management: "#FFB96D",
} as const;

export type CohousyExtraKey = keyof typeof COHOUSY_EXTRA;
