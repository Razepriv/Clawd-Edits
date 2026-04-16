---
tags:
  - style-audit
  - faux-thinker
  - reference-creator
creator: rpn
source_video: D:/video editor/Styles/rpn/rpn 1.mp4
duration_s: 53.86
resolution: 720x1280
fps: 23.98
cut_density: 1_per_1.8s
status: audited
audited: 2026-04-16
---

# rpn 1 — Style Audit

> **TL;DR** — 54-second LTX 2.3 product-launch reel. **Highest cut density audited (one cut per 1.8 s).** Only style that uses **persistent split-screen** as the default layout (B-roll top, face bottom, continuous) AND where the **B-roll IS the product's own output** (LTX 2.3 generated samples) rather than UI screenshots. Three distinct caption typographies stacked: retro-pixel body track + italic-serif emphasis + giant bold-sans product-name lock-up for the CTA. Gaming-creator studio backdrop with warm + red LED practicals, Mets cap + shotgun-mic consistency. The most *kinetic* and information-dense style in our audit set.

Source playbook: `D:/video editor/_audit/rpn/rpn 1/PLAYBOOK.md`
Source events: `D:/video editor/_audit/rpn/rpn 1/EVENTS.json`
Source frames: `D:/video editor/_audit/rpn/rpn 1/frames/` (215 frames @ 4 fps) + `frames_scene/` (30 scene cuts @ 0.25)

## The 6 signature elements worth stealing

1. **Product-own-output as B-roll** — if the product is generative (Veo, Flux, ElevenLabs, Suno), show its outputs directly as B-roll. Each B-roll doubles as proof. This only works for generative products, but when it does, it's devastatingly effective.
2. **Persistent split-screen (48/52)** — face never disappears; B-roll swaps constantly on top. No visible divider. Different energy from Nick 1's hook-only split or VC 1's rounded-frame wrapper.
3. **Dual-track caption stacking** — retro pixel body track + italic serif emphasis (for narrative pivots like "for free") + B-roll baked-in subtitles (from LTX samples or manually added) can stack 2–3 tracks simultaneously. Highest caption density in our audit set.
4. **Rapid-flash-montage at intensity peaks** — 5 scene cuts in under a second, used exactly twice (at 23.27 s and 26.0 s) for the "most downloaded / highest benchmarking" emphasis. Creates a real-time VFX punch without requiring actual VFX.
5. **Giant product-name lockup on CTA** — huge bold sans "Ltx" letters fill center-frame on the final face close-up. Acts as a brand ring-off. Stacked below it: smaller retro-pixel "I'LL SEND YOU" caption.
6. **Shotgun-mic + Mets-cap + hoodie as visual brand marks** — every shot of the host has these three anchors. Persistent framing makes the host instantly recognizable the next time they scroll.

## Format contrast with other styles

| Attribute | [[Styles Audits/Devin 1\|Devin 1]] | [[Styles Audits/Devin 2\|Devin 2]] | [[Styles Audits/Nick 1\|Nick 1]] | [[Styles Audits/VC 1\|VC 1]] | **rpn 1** |
|---|---|---|---|---|---|
| Duration | 69 s | 74 s | 45 s | 40 s | **54 s** |
| Cut density | 1/8 s | 1/10 s | 1/3.7 s | 1/2.5 s | **1/1.8 s** (max) |
| Face ratio | ~48 % | ~35 % | ~12 % | ~38 % | **~100 %** (split or full) |
| Layout default | Face-dominant | Face + full-screen | Face bookend + B-roll body | Rounded-frame wrapper | **Persistent split-screen** |
| B-roll source | Real UI + mocks | Real UI + mocks | Real UI screenshots | Real UI + 3D illustration + AI art | **Product's own generated output** |
| Caption style | Pivot-only slams | Pivot-only slams | Submagic dense pill | Submagic dense pill | **Dual-track pixel + italic serif + giant logo** |
| Transition SFX | Glitch | Glitch + flash | None | Whoosh + glitch | **Almost none** |

## Timeline map (30 cuts, condensed)

| t_start (s) | Beat |
|---|---|
| 0.00 | Split: LTX app home B-roll + face |
| 2.92 | B-roll swap: anime cel-shaded LTX sample |
| 4.42–7.05 | 3 rapid B-roll swaps ('consumer GPUs' beat) |
| 7.05 | Full-frame face: 'whether you have a PC, MacBook, Mac Mini' |
| 9.50 | Italic-serif 'for' emphasis caption |
| 10.80 | Italic-serif 'for free' emphasis caption |
| 12.14 | Split returns; ComfyUI node-graph LTX pipeline |
| 13.85 | Burning wheat-field LTX sample w/ Ltx smoke-logo |
| 16.31 | Hooded-figures forest LTX sample |
| 21.02 | LTX-restyled host close-up (match-cut) |
| 23.27–24.11 | **Rapid-flash montage** (5 cuts in <1 s) |
| 25.90–27.44 | Second rapid-swap cluster (4 cuts in 1.5 s) |
| 29.36 | Pixel caption 'VIDEO MODEL' |
| 32.20 | Close-up face LTX sample + 'AND WHAT WE GET' caption |
| 34.74 | Axe-warrior LTX sample w/ baked 'you can use it without restriction.' |
| 37.12 | Stacked caption 'LTX 2.3' (pixel) during axe scene |
| 39.75 | Riverside-woman LTX sample w/ baked 'And it's completely free' + pixel 'OVER YOUR DATA' |
| 43.38 | Driving-woman LTX sample w/ baked 'with open source in mind.' + pixel 'THIS' |
| 46.55 | Last LTX sample before CTA |
| 50.68 | **Full-frame face CTA** + giant 'Ltx' logo + pixel 'I'LL SEND YOU' |

## What to build for replication

Reusable Remotion components for `remotion-studio/src/shared/`:

- [ ] `<SplitScreen>` — 48/52 split, no divider, takes `top` and `bottom` children
- [ ] `<RetroPixelCaption>` — white ALL CAPS pixel font (Press Start 2P or VT323) with shadow
- [ ] `<ItalicSerifEmphasis>` — italic serif single-word/short-phrase overlay
- [ ] `<ProductNameLockup>` — giant bold sans brand-name overlay for CTA
- [ ] `<FlashMontage>` — helper for rapid-cut clusters (takes array of short clips + optional onset BPM sync)
- [ ] `<BakedSubtitleOverlay>` — faux-baked subtitle on a B-roll clip (for effects where we want to look like LTX's subtitle capability)

## Capture / generation pipeline needed

- **Fonts:** Press Start 2P (Google Fonts, free) + Cormorant Garamond Italic or Playfair Display Italic (both free) + Archivo Black or Syne Bold (free)
- **Product sample outputs:** depends on subject. For a faux.thinker reel about Veo 3, we'd need ~12 Veo generations at varying styles. For a reel about WebVerse Arena, we'd need clips of it in use.
- **Studio:** Razeen backdrop with warm + red LED practicals (our brand-red `#E91212` fits perfectly), mic consistently visible bottom-center
- **Music:** Chill driving lo-fi ~100 BPM ducked low

## Related

- [[Brand/Faux Thinker Style Guide]] — we already have a canonical head-pop-out format; rpn's split-screen is a legitimate **alternate format #2** that could be added as §5 "Alternate formats for generative-product showcases."
- [[Signature Effect Brief]] — the persistent split + dual-caption-track + giant-logo-lockup combination is a strong signature candidate if we commit to this format.
- [[Styles Audits/Nick 1]] — shares Submagic-density caption philosophy but very different face/B-roll ratio.
- [[Styles Audits/VC 1]] — shares "production-designed" philosophy but expresses it through different visual grammar.
- [[_Index]].

## Open questions

- [ ] Do we have a faux.thinker topic where B-roll = product's own output makes sense? (Probably: any showcase of Veo 3 / Flux / Suno / WebVerse Arena outputs.)
- [ ] Does Razeen's current recording setup work in persistent bottom-half framing, or do we need to re-frame the camera tighter to fit inside 52 % of a 9:16 canvas?
- [ ] Is retro-pixel captioning on-brand for faux.thinker? (Probably yes — reads as "developer-native" consistent with our brand voice.)
- [ ] Beat-detect rpn 1 music to confirm ~100 BPM and see if cuts are beat-synced (probably not strictly but worth confirming).
