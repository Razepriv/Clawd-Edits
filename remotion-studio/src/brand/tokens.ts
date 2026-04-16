// Brand tokens — governs all styled Reels for @faux.thinker
// Source of truth: D:/video editor/brand-kit/BRAND.md
// Pattern adapted from claude-code-video-toolkit/lib/brand.ts

export interface BrandColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentBright: string;
  link: string;
  growthGreen: string;
  warningRed: string;
  divider: string;
  shadow: string;
}

export interface BrandFonts {
  emphasis: string; // heavy bold condensed uppercase
  ui: string; // UI cards, body copy
  handwritten: string; // decorative
}

export interface BrandChannel {
  handle: string;
  displayName: string;
  tagline: string;
  followers?: string;
  avatarSrc?: string;
}

export interface Brand {
  name: string;
  colors: BrandColors;
  fonts: BrandFonts;
  channel: BrandChannel;
}

export const FAUX_THINKER: Brand = {
  name: "faux.thinker",
  colors: {
    background: "#0A0A0A",
    surface: "#141419",
    textPrimary: "#FFFFFF",
    textSecondary: "#9AA0A6",
    accent: "#E91212",
    accentBright: "#FF2A2A",
    link: "#5B8EFF",
    growthGreen: "#2AE66E",
    warningRed: "#E91212",
    divider: "rgba(255,255,255,0.15)",
    shadow: "rgba(0,0,0,0.45)",
  },
  fonts: {
    emphasis: "'Archivo Black', 'Bebas Neue', sans-serif",
    ui: "'Inter', system-ui, -apple-system, sans-serif",
    handwritten: "'Caveat', 'Homemade Apple', cursive",
  },
  channel: {
    handle: "faux.thinker",
    displayName: "Razeen Shaheed",
    tagline: "AI Agents and Automation Expert",
    followers: "16 followers",
  },
} as const;

// Reference-style brand matches (unmodified from their videos) —
// useful when the goal is pixel-accurate replica testing.
export const DEVIN_JATHO: Brand = {
  name: "devin.jatho",
  colors: {
    background: "#0A0A0F",
    surface: "#141419",
    textPrimary: "#FFFFFF",
    textSecondary: "#9AA0A6",
    accent: "#A845FF",
    accentBright: "#FF4DA6",
    link: "#4A90E2",
    growthGreen: "#2AE66E",
    warningRed: "#E6444A",
    divider: "rgba(255,255,255,0.15)",
    shadow: "rgba(0,0,0,0.45)",
  },
  fonts: {
    emphasis: "'Archivo Black', 'Bebas Neue', sans-serif",
    ui: "'Inter', system-ui, -apple-system, sans-serif",
    handwritten: "'Caveat', cursive",
  },
  channel: {
    handle: "devinjatho",
    displayName: "Devin Jatho",
    tagline: "Viral script writer",
    followers: "329k followers",
  },
};
