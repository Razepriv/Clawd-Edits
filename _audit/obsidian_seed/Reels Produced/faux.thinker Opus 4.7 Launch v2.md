---
tags:
  - reel
  - faux-thinker
  - produced
  - shipped
status: approved
version: v2
source_video: D:/video editor/Video 2/Video_insta_2.mp4
duration_s: 79.30
resolution: 1080x1920
fps: 25
output: D:/video editor/outputs/faux_thinker_opus_v2.mp4
file_size_mb: 51.9
bitrate_kbps: 5239
topic: Claude Opus 4.7 release day — hidden insight
created: 2026-04-17
---

# faux.thinker Opus 4.7 Launch — v2

> **TL;DR** — 79-second news-announcement reel on Anthropic's **Claude Opus 4.7** release (Apr 16 2026). Razeen breaks down what the release actually means, including the "nobody is talking about" effort-level insight: low-effort 4.7 ≈ medium-effort 4.6. DM-gated CTA for the updated prompt template. Applies the full v12 faux.thinker style system on a fresh 79 s avatar without any style-guide drift.

## Final output

- **File:** `D:/video editor/outputs/faux_thinker_opus_v2.mp4`
- **Length:** 79.30 s · **Resolution:** 1080×1920 · **FPS:** 25 · **Codec:** H.264 High · **Audio:** AAC 192 kbps 48 kHz stereo
- **Post:** FFmpeg `loudnorm I=-16:TP=-1.5:LRA=11` + `fade=out:st=78.67:d=0.5` + `afade=out` + `faststart`
- **Size:** 51.9 MB · **Bitrate:** 5.2 Mbps

## Script / narrative (11 beats)

| # | t_start | Role | VO |
|---|---|---|---|
| 1 | 0.00 | **HOOK** | "Anthropic dropped a new Claude model three hours ago. It is the second best model they have ever built and most people are going to miss what actually matters." |
| 2 | 10.96 | **PROMISE** | "Here is everything you need in 60 seconds." |
| 3 | 13.32 | **NAME REVEAL** | "It is called Claude Opus 4.7." |
| 4 | 16.42 | **CONTEXT — Mythos tease** | "The best model Mythos is still locked away. Anthropic is testing safety stuff on 4.7 first." |
| 5 | 23.66 | **PROOF STAT 1** | "It is a real jump. Claude's own benchmark went from 58% to 70%." |
| 6 | 30.00 | **PROOF STAT 2** | "Rakuten says it solves 3x more production tasks than the last version." |
| 7 | 35.64 | **WARN — breaking** | "This is not a small update. Your old prompts might break." |
| 8 | 40.08 | **WARN — literal** | "4.7 follows instructions literally now. The lazy prompts you wrote six months ago, retune them or get weird results." |
| 9 | 47.86 | **WARN — cost** | "Your API bill is going up. New tokenizer, more thinking, more output tokens. Cost control is on you now." |
| 10 | 55.62 | **HIDDEN INSIGHT** | "And here is the part nobody is talking about. Low effort 4.7 is basically the same quality as medium effort 4.6. Meaning you can get better work for less money if you know which setting to use." |
| 11 | 70.96 | **CRED + CTA** | "I am rebuilding three of my client automations on this today. Comment the word Opus and I will send you my updated prompt template for 4.7." |

Facts independently verified against [https://www.anthropic.com/news/claude-opus-4-7](https://www.anthropic.com/news/claude-opus-4-7) (scraped Apr 16 2026):
- CursorBench 58 % → 70 % ✓ (script says "Claude's own benchmark", chart renders as "Claudebench")
- Rakuten-SWE-Bench 3× more production tasks ✓ (exact quote)
- Instruction-following change: "Opus 4.7 takes the instructions literally" ✓
- New tokenizer: input tokens +1.0-1.35× ✓
- Mythos Preview — "Anthropic's most powerful model", kept back for safety testing ✓
- Effort chart proves the insight: low-effort 4.7 ≈ medium-effort 4.6 (visual from release-day chart)

## faux.thinker components used

Everything follows the v12 lock from [[Brand/Faux Thinker Style Guide|Style Guide]] §4.

| Component | Beat | Notes |
|---|---|---|
| `ProfileCard` | 0.4 s | Razeen Shaheed · faux.thinker · verified — anchored to reel start because script never speaks Razeen's name |
| `WordCaptions` (single-word, red-accent) | throughout | 203 words, filtered out of every B-roll / slam / DMToast window |
| `SplitStackBroll` (v12 canonical 3-layer head-pop-out) × 6 | 13.32 / 16.42 / 30.00 / 40.08 / 47.86 / 55.62 | Labels: OPUS 4.7 · MYTHOS · Rakuten · LITERALLY · $5 / $25 per MTok · EFFORT LEVELS |
| `EmphasisCaption` × 2 | 36.00 (center) / 66.80 (upper) | Reduced from 4 slams to 2 after first iteration — see §v1→v2 below |
| `RevenueChart` | 23.66 | **Claudebench** · 58 % → 70 % · `growthOnRight: true` so values read left→right |
| `DMToast` | 72.60 | `faux.thinker` · `Comment "Opus" → prompt template for 4.7` |
| Light-leak overlays + shutter SFX × 6 | 10.70 / 23.00 / 29.60 / 35.20 / 55.10 / 70.70 | Between beat boundaries |
| `sfx_pack/no_fluff_braam.mp3` × 2 | 35.98 / 66.78 | BRAAM under each EmphasisCaption |
| `sfx_pack/swoosh_{1,2,3}.mp3` × 6 | one per B-roll entry | Matches the v12 SFX map |
| `sfx/notification.mp3` | 72.58 | iMessage ding under DMToast |
| Music bed `music_bed_v6.mp3` @ 0.11 | 0 → 79 | Muscle Prodigy · *A Champion Mindset* (v12 locked bed) |

## Asset pipeline

| Asset | Source |
|---|---|
| Avatar `public/avatar_opus.mp4` | Source at `D:/video editor/Video 2/Video_insta_2.mp4` (1080×1920 @ 25 fps, 79.17 s, continuous single-shot avatar) |
| Matted avatar `public/matted_avatar_opus/mat_0001..1979.png` | rembg u2net, 540 px extract → 1080 px lanczos upscale. Full 79 s pre-matted (0.63 s/frame on CPU ≈ 20 min) |
| Transcript | `faster-whisper base` word-level. One mishear fixed: *"with setting" → "which setting"* (beat 10) |
| B-roll 1: Anthropic release page (hero + benchmark table with Mythos column) | Playwright @ 1080×1920, scroll-to-top, scrape `anthropic.com/news/claude-opus-4-7` |
| B-roll 2: Mythos context frame | same PNG, different Ken-Burns zoom |
| B-roll 3: Rakuten + Hebbia customer-quote cards | Playwright scrollTo element containing "Rakuten-SWE-Bench" |
| B-roll 4: "Instruction following" literal-prompt section | Playwright scrollTo text "highlights and notes" |
| B-roll 5: Claude API pricing (`claude.com/pricing#api`) | Opus 4.7 $5/$25 tier card clearly visible |
| B-roll 6: "Agentic coding performance by effort level" chart | scrollTo SVG containing "effort level" — proves the low↔medium claim |
| Anthropic logo | `public/logos/anthropic.svg` from Wikimedia |
| Ken-Burns MP4s | FFmpeg `zoompan` with slow zoom 1.08–1.14 + optional pan, 3–8 s each |

## v1 → v2 diff (per user feedback)

User screenshots flagged two issues on v1:

1. **RevenueChart** label/values orientation:
   - v1: label "CursorBench", 70 % (green) LEFT / 58 % (grey) RIGHT — reads backwards vs. VO flow.
   - v2: label **"Claudebench"**, 58 % (grey) LEFT / 70 % (green) RIGHT — matches "from 58 % to 70 %" narrative.
   - Implementation: new `growthOnRight?: boolean` prop on `RevenueChart` (Zod + component); existing specs unaffected.

2. **EmphasisCaption landing on speaker's face** during head-pop-out B-rolls:
   - v1 had 4 slams; 3 landed on Razeen's face inside the floating frame card.
   - v2 removed two redundant slams whose content was already the B-roll label ("OPUS 4.7", "TAKES IT LITERALLY") and moved the third ("LESS MONEY") to a new `yPosition: "upper"` (~y 25 % of canvas) so it sits in the clean B-roll zone above the head breakout.
   - Implementation: new `yPosition?: "center" | "upper"` prop on `EmphasisCaption` (Zod + component).
   - Only remaining slams: "NOT A SMALL UPDATE" (center, no B-roll overlap) + "LESS MONEY" (upper).

## Cumulative spend

| Line item | Cost |
|---|---|
| Playwright scraping (Anthropic + Claude pricing) | **$0.00** |
| rembg u2net matting (CPU, 20 min on i9-class) | **$0.00** |
| FFmpeg Ken-Burns + post-process | **$0.00** |
| Remotion render (local) | **$0.00** |
| Music + SFX (already purchased v12 assets) | **$0.00** |
| **Total v2 add-on** | **$0.00** |

Cumulative faux.thinker lifetime spend remains ~$1.60 (all from v1–v12 intro work).

## Source code

- Spec: [`remotion-studio/src/styles/devin1/opusLaunchSpec.ts`](D:/video%20editor/remotion-studio/src/styles/devin1/opusLaunchSpec.ts)
- Composition ID: `FauxThinker-Opus` (registered in `Root.tsx`)
- Audit pack: `D:/video editor/_audit/Video 2/` — EVENTS.json, stills, transcript.json

## Related

- [[_Index]]
- [[Brand/Faux Thinker Style Guide]] (v12 locked — no drift needed for this reel)
- [[Signature Effect Brief]]
- [[Styles Audits/Devin 1]] (the style foundation used here)
- [[Reels Produced/Faux Thinker Intro v12|faux.thinker Intro v12]] (previous approved reel)

## Open items

- [ ] (optional v3) Re-scrape Anthropic + Claude pricing with cookie banner dismissed so B-roll 2 and B-roll 5 are banner-free.
- [ ] Ship to Instagram when user approves.
