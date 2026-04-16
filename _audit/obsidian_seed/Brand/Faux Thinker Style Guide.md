---
tags:
  - brand
  - faux-thinker
  - style-guide
  - locked
version: v12
last_verified: 2026-04-17
canonical_path: D:/video editor/brand-kit/FAUX_THINKER_STYLE_GUIDE.md
---

# faux.thinker — Style Guide (index)

> **Source of truth:** `D:/video editor/brand-kit/FAUX_THINKER_STYLE_GUIDE.md` — this Obsidian note is an index / cross-link surface. Any change must be made in the canonical file first and then reflected here.

## What's locked (v12, 2026-04-15)

1. **9:16 vertical · 1080×1920 · 25 fps · H.264 High yuv420p · AAC 48 kHz stereo 192 k**
2. **Color:** brand-red `#E91212` + bright red `#FF2A2A` for gradient top; surface `#141419`; background `#0A0A0A`. No violet, no blue-dominant palettes.
3. **Type:** Archivo Black 900 (emphasis + pills + single-word captions) · Inter 400–700 (cards) · Caveat 600 (handwritten)
4. **Canonical 3-layer head-pop-out** for every tool mention — B-roll 100 % + floating frame card in lower 30-35 % with ≥86 px side margins + matted subject with only HEAD breaking above frame top.
   - `headOvershootPercent = 14`, `objectPositionY = 16`, `avatarMargin = 86`, `frameTopPercent = 68`, `avatarRadius = 40`
5. **Single-word red captions** at `yPercent: 78` (windowSize 1, strict speech window).
6. **Light-leak transitions + shutter SFX** at beat boundaries. No RGB glitch flashes (retired v5).
7. **EmphasisCaption** stands alone for narrative pivots — BRAAM audio only (shockwave overlay retired v9).
8. **Fade-to-black 0.5 s** at end + loudnorm -16 LUFS post-process.
9. **Music bed:** `music_bed_v6.mp3` (*Muscle Prodigy — A Champion Mindset*) at volume 0.11.
10. **DMToast CTA** with trigger word → deliverable payload (e.g. `Comment "Opus" → prompt template`).

## Component vocabulary

All in `remotion-studio/src/styles/devin1/components/`:

- `ProfileCard` · `RevenueChart` · `EmphasisCaption` · `PillTag` · `URLPill` · `FactoidCard` · `ReadabilityScale` · `AppIconFloat` · `DMToast` · `BrollCutaway` · **`SplitStackBroll` (canonical 3-layer head-pop-out — v12 locked)** · `WordCaptions` · `MattedAvatar` · `OverlayVideo`

Retired: `GlitchFlash` (v5, felt ugly) · Energy Shockwave overlay (v9, off-brand blue).

## Recent prop additions (v12.1, 2026-04-17 — backwards compatible)

- **`RevenueChart.growthOnRight?: boolean`** — when true, grows on the right side of the card so narrative reads low→high (e.g. "from 58 % to 70 %"). Default false = v12 original Devin-1 layout.
- **`EmphasisCaption.yPosition?: "center" | "upper"`** — "upper" positions the slam at ~y 25 % of canvas so it sits in the B-roll zone above the head-pop-out breakout instead of landing on the speaker's face. Default "center" preserves v12 behavior.

Both propagate through Zod (`shared/types.ts`) and `Apply.tsx` dispatcher.

## Related

- [[_Index]]
- [[Brand/Brand Kit (identity + palette)]]
- [[Signature Effect Brief]]
- [[Reels Produced/Faux Thinker Intro v12]]
- [[Reels Produced/faux.thinker Opus 4.7 Launch v2]]
