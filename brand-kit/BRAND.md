# Brand Kit — faux.thinker / WebVerse Arena

> Source material: Instagram profile screenshot (faux.thinker) + WebVerse Arena landing page screenshot (supplied by user 2026-04-15).
> This kit governs all generated videos for the @faux.thinker channel.

## Identity

| Field | Value |
|---|---|
| Channel | **@faux.thinker** on Instagram |
| Display name | **Razeen Shaheed** |
| Positioning | **AI Agents and Automation Expert** |
| Creator story | "I turn coffee into code, ideas into apps & Automations" |
| Expertise tag | "Master rapid development & AI Automations" |
| CTA pattern | "DM me your wildest..." → **DM-gated delivery** (parallel to Devin Jatho's "comment the word link" → IG DM reply) |
| External link | n8n.io/creators/faux-thinker |
| Agency | **WebVerse Arena** — Digital Agency, Chennai |
| Agency tagline | **"WE ARCHITECT UNFAIR PRIVILEGE."** |

## Voice

- Developer-direct, no corporate fluff.
- Coffee / code / automation motifs.
- Confident + slightly provocative ("UNFAIR PRIVILEGE", "your wildest...").
- Short sentences, strong verbs, no filler.

## Visual identity

### Color palette (extracted from provided screenshots)

| Role | Hex | Usage |
|---|---|---|
| Background primary | `#0A0A0A` pure near-black | Full-frame backgrounds |
| Background secondary | `#141419` very-dark-grey | Card surfaces, chrome |
| Text primary | `#FFFFFF` | Headlines, captions |
| Text secondary | `#9AA0A6` mid-grey | Subtext, metadata |
| **Accent (signature)** | `#E91212` → `#FF2A2A` **agency red** | Emphasis word, scroll cues, CTAs |
| Accent (Instagram gradient ring) | `#FFB640` / `#FF4D4D` / `#7538B0` / `#2D6FB3` | Only on avatar ring — do not use elsewhere |
| Verified / link | `#5B8EFF` blue | Link text only |

**This brand's signature accent is RED, not the Devin/purple-magenta.**
When we apply the Devin 1 emphasis-caption style to a faux.thinker video, the second-line gradient should swap from pink→magenta to **red** (`#FF2A2A` → `#E91212`) to stay on-brand. Keep the rest of the mechanic identical.

### Typography

- **Emphasis / headline:** heavy bold condensed uppercase sans-serif — the WebVerse Arena page uses essentially the same visual language as Devin 1's caption style. Matches what we already loaded: **Archivo Black** (free) as substitute for Obviously Wide / Druk Wide.
- **UI / body:** clean sans-serif — **Inter** (already in `remotion-studio`).
- **Decorative:** reserve for accent moments only.

### Layout signatures

- Pure-black canvas dominates. Anything else feels off-brand.
- Single red accent word per headline (never more than one red term — scarcity makes it work).
- Rounded dark cards for UI chrome (matches iOS-notification aesthetic from Devin 1).
- Minimal decoration — no gradients on page surfaces, no textures. Just black + red + white.

## Applied to our video pipeline

When generating styled Reels for @faux.thinker:

1. **Keep the chosen reference style's *mechanics*** (timing, animation curves, graphic vocabulary) — that's why we audited them.
2. **Swap the *accent color*** to `#E91212` / `#FF2A2A` red everywhere purple/magenta/blue would appear in the reference.
3. **Keep text primary white, backgrounds black** — these already match the reference styles' base tones.
4. **CTA component:** simulate IG DM toast (like Devin 1's end card) but with Razeen's avatar + "faux.thinker" username + a DM reply that fits the "DM your wildest..." invitation.
5. **Hook credibility numbers:** update profile-card component to show "@faux.thinker / 16 followers" (current state) or whatever the channel's growth is at generation time — script this to pull live so it stays current.
6. **Avoid overusing "unfair privilege"** tagline in captions — it's a strong phrase, keep it as a rare hook-closer, not a recurring element.

## Remotion tokens override

In `remotion-studio/src/styles/`, create a `_brand/` folder with `tokens.ts` that any style can import:

```ts
export const BRAND = {
  accent: "#E91212",
  accentBright: "#FF2A2A",
  background: "#0A0A0A",
  surface: "#141419",
  textPrimary: "#FFFFFF",
  textSecondary: "#9AA0A6",
  link: "#5B8EFF",
  fonts: {
    emphasis: "'Archivo Black', sans-serif",
    ui: "'Inter', system-ui, sans-serif",
  },
  channel: {
    handle: "faux.thinker",
    displayName: "Razeen Shaheed",
    tagline: "AI Agents and Automation Expert",
  },
} as const;
```

Each style composition should parameterize its accent color so "apply Devin 1 style to faux.thinker" reads from `BRAND.accent` rather than the reference's purple-magenta.
