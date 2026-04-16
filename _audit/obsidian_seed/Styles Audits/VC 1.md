---
tags:
  - style-audit
  - faux-thinker
  - reference-creator
creator: Vibecoder
source_video: D:/video editor/Styles/Vibecoder/VC 1.mp4
duration_s: 40.45
resolution: 720x1280
fps: 23.98
cut_density: 1_per_2.5s
status: audited
audited: 2026-04-16
---

# VC 1 (Vibecoder) — Style Audit

> **TL;DR** — 40-second drama-news explainer on Anthropic building a full-stack app builder inside Claude. The most **production-designed** style in our audit set: AI-generated villain illustrations for the 9 s hook, RGB-mosaic-glitch bridge, animated series title card ("Day 130 / BUILDING YOU 100x"), persistent rounded-rectangle window frame on every live shot, retro-CRT metaphor illustration insert, and a bespoke designed CTA card with mixed typography and hand-drawn decorations. High cut density (~1/2.5 s), trailer-house music, urgent VO. Strongest visual-design language of any creator audited.

Source playbook: `D:/video editor/_audit/Vibecoder/VC 1/PLAYBOOK.md`
Source events: `D:/video editor/_audit/Vibecoder/VC 1/EVENTS.json`
Source frames: `D:/video editor/_audit/Vibecoder/VC 1/frames/` (161 frames @ 4 fps) + `frames_scene/` (16 scene cuts at threshold 0.18)

## The 5 signature elements worth stealing

1. **AI-generated villain illustration hook** — 3 dramatic character illustrations with heavy RGB chromatic fringe + fire/lightning glitch metaphors as the opener (0–9 s). Nobody else in our audit set uses this. Instant pattern interrupt, clearly signals "dramatic story incoming."
2. **Rounded-rectangle window frame on every shot** — 15 px black pillarbox + ~24 px corner radius. Every face close-up and every B-roll screenshot sits inside this wrapper. Reads as "content inside a player/device." See [[Signature Effect Brief]] for how persistent framing creates a signature.
3. **Series title card** — "This is day 130 / BUILDING YOU 100x" animated typography on navy starfield with colored letterblock accents. Signals consistency to the viewer (they know this is day-N of a series), reinforces commitment cue.
4. **Designed CTA card with hand-drawn decorations** — mixed sans-serif ("Comment") + italic serif ("for the link.") typography, orange highlight sweep over the action word with a chasing mouse-cursor, scattered purple/teal/green hand-drawn accents. The only creator in our audit who uses a pre-designed CTA card instead of relying on face close-up for the ask.
5. **Retro CRT 3D illustration as metaphor B-roll** — a stylized 3D illustration of a CRT monitor with the target app's UI animating inside. Used in place of a screen-record when the point is metaphorical ("LLM can do the work") rather than literal.

## Format contrast with other styles

| Attribute | [[Styles Audits/Devin 1\|Devin 1]] | [[Styles Audits/Devin 2\|Devin 2]] | [[Styles Audits/Nick 1\|Nick 1]] | **VC 1** |
|---|---|---|---|---|
| Duration | 69 s | 74 s | 45 s | **40 s** |
| Cut density | 1/8 s | 1/10 s | 1/3.7 s | **1/2.5 s** |
| Face ratio | ~48 % | ~35 % | ~12 % | **~38 %** |
| Hook device | Face | Face | Face | **AI-illustration triplet** |
| Frame wrapper | None | None | None | **Persistent rounded-rect window** |
| Title card? | No | No | No | **Yes (series branding)** |
| CTA style | Face close-up | Face close-up | Face close-up | **Designed typography card + face** |
| Transition SFX | Glitch | Glitch + flash pops | None | **Whoosh + glitch-stutter** |
| Accent color | Pink-magenta gradient | Red `#E91212` | Red `#E1251C` slash | **Orange `#F26A21` sweep** |

## Timeline map (major beats)

| t_start (s) | Beat | Layout |
|---|---|---|
| 0.00 | Hook illustration #1 | Full-bleed AI art (villain with fire eyes) |
| 0.96 | Hook illustration #2 | Full-bleed AI art (shocked/heart-attack) |
| 2.59 | Hook illustration #3 | Full-bleed AI art (red lightning) |
| 4.05 | First host appearance | Rounded-frame closeup |
| 9.34 | RGB mosaic glitch bridge | Abstract color bars |
| 9.50 | Series title card | "This is day 130 / BUILDING YOU 100x" |
| 12.26 | Host explainer beat 1 | Rounded-frame closeup |
| 13.81 | B-roll insert — Claude desktop + sticky-notes | Rounded-frame screenshot |
| 16.60 | Host explainer beat 2 | Rounded-frame closeup |
| ~21.00 | B-roll — chat picker | Rounded-frame screenshot |
| ~24.50 | B-roll — iOS settings list + cursor | Rounded-frame screenshot |
| 26.86 | B-roll — Claude Code terminal | Rounded-frame screenshot |
| 29.86 | B-roll — retro CRT illustration | Rounded-frame 3D still-life |
| 34.86 | Host conclusion "bloodbath" | Rounded-frame closeup |
| 37.20 | Designed CTA card | White bg + mixed typography + orange sweep |
| 38.79 | Split CTA + face | Transitional |
| 39.33 | Sign-off "Follow for" | Rounded-frame closeup |

## What to build for replication

Reusable Remotion components to add under `remotion-studio/src/shared/`:

- [ ] `<RoundedFrame>` — wraps any inner composition with 15 px pillarbox + 24 px radius. The foundational wrapper for this style.
- [ ] `<AIVillainIllustration>` — renders a still illustration with optional RGB chromatic fringe + animated red lightning overlay. Inputs: `imageSrc`, `glitchIntensity`.
- [ ] `<RgbMosaicGlitch>` — abstract color-block bar glitch transition (~1.2 s). Uses the VC color palette (`#2CA89C`, `#8E3CBC`, `#2130C4`, `#7F8E1E`, `#9C3E26`).
- [ ] `<SeriesTitleCard>` — "Day N / BIG DISPLAY HEADLINE" typography with colored letterblock accents + starfield bg.
- [ ] `<DesignedCTACard>` — mixed-typography CTA with orange highlight sweep + cursor + hand-drawn accents. Props: `{ action, target, suffix }`.
- [ ] `<StickyNote>` — yellow/pink Post-it overlay with handwritten-style text + subtle rotation. Drop onto any dry UI B-roll.
- [ ] `<RetroCRTIllustration>` — 3D CRT render with a swap-slot for whatever UI element animates on its screen.

## Capture / generation pipeline needed

- **Flux or Midjourney** for the 3 hook villain illustrations (consistent character-sheet prompt, varied metaphors)
- **Retro CRT 3D asset** (free on Polyhaven / Sketchfab CC0) — composite Claude sparkle / typing pill onto the screen plane
- **Claude desktop screenshots** (already have Playwright pipeline — see [[Pipeline/Playwright Scraping]])
- **Sticky-note PNG** (yellow + pink variants) with transparent bg
- **Trailer-house music bed at ~110 BPM** — can generate via [[Assets/Music Library|ElevenLabs music]] or source from an existing lib

## Related

- [[Brand/Faux Thinker Style Guide]] — consider adding §6 "Alternate format: VC-style framed explainer" that documents the rounded-frame + villain-hook + designed-CTA combo as an option alongside our head-pop-out.
- [[Signature Effect Brief]] — VC's rounded-frame + designed CTA card are strong signature candidates if we ever adopt this style for faux.thinker.
- [[Styles Audits/Nick 1]] — shares Submagic dark-pill captions but opposite stylistic philosophy (Nick = minimalist, VC = highly designed).
- [[_Index]].

## Open questions

- [ ] Is VC's AI-illustration hook a "one reel only" move or a per-reel requirement (would need to generate 3 new illustrations per reel — nontrivial cost)?
- [ ] Does faux.thinker want the "Day N" framing? Could work as "Day N — [AI tool deep-dive]" recurring series.
- [ ] The rounded-frame window is expensive (reduces usable pixels by ~18 %). Worth it for the signature? Or do we pick it up only for "news/announcement" reels?
- [ ] Beat-detect music to confirm ~110 BPM hypothesis and whether cuts land on downbeats (they mostly don't in VC 1, but could add on-beat sync for our version).
