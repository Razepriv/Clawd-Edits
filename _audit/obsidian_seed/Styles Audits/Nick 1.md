---
tags:
  - style-audit
  - faux-thinker
  - reference-creator
creator: Nick
source_video: D:/video editor/Styles/Nick/Nick 1.mp4
duration_s: 44.84
resolution: 720x1280
fps: 23.97
cut_density: 1_per_3.7s
status: audited
audited: 2026-04-16
---

# Nick 1 — Style Audit

> **TL;DR** — 45-second Claude Code Skills-library announcement. Fastest-cut, most B-roll-dense reel in our audit set (12 cuts in 45 s). A **face-bookend, B-roll-body** format: Nick appears only at the hook (0–4 s) and CTA (41–45 s); the middle 36 s is wall-to-wall platform screenshots. Submagic dark-pill captions throughout, switching to white-outline for the CTA. Minimalist studio (white wall + black acoustic panels). **No transitions** other than hard cuts and one white flash.

Source playbook: `D:/video editor/_audit/Nick/Nick 1/PLAYBOOK.md`
Source events: `D:/video editor/_audit/Nick/Nick 1/EVENTS.json`
Source frames: `D:/video editor/_audit/Nick/Nick 1/frames/` (179 frames @ 4 fps) + `frames_scene/` (12 scene-cut frames)

## Signature elements worth stealing

1. **B-roll-first narrative format** — face only as hook and CTA bookends (~12 % of runtime). Forces the script to be a clean "hook → claim → proof → steps → CTA" arc with each step becoming a full-bleed B-roll beat.
2. **Submagic-density captions** — dark translucent rounded-rect pill, 2–3 words per chunk, white bold sans. Renders from word-level whisper JSON. Compare with [[Styles Audits/Devin 1|Devin 1]] and [[Styles Audits/Devin 2|Devin 2]] which reserve captions for narrative pivots only (opposite philosophy).
3. **Single-use red accent** — one red diagonal slash across the SKILLS logo during "NOT using skills" = entire color budget. Everything else is black/white/grey. See [[Signature Effect Brief]] for how single-accent usage creates a signature.
4. **White-outline CTA caption shift** — swap from dark-pill to white-outline-only for the final ~4 s. Signals "speaking directly to camera now, not overlay explainer mode."
5. **Always-visible shotgun mic** — bottom-center mic wind-muff is a persistent framing anchor that viewers subconsciously lock onto.
6. **Zero transition SFX** — no whooshes, no clicks, no glitch. Hard cuts only + one white flash. Lets the music bed carry on uninterrupted and makes each cut feel clean rather than flashy.

## Format contrast with existing styles

| Attribute | [[Styles Audits/Devin 1\|Devin 1]] | [[Styles Audits/Devin 2\|Devin 2]] | **Nick 1** |
|---|---|---|---|
| Duration | 69 s | 74 s | **45 s** |
| Cut density | 1 per 8 s | 1 per 10 s | **1 per 3.7 s** |
| Face-time ratio | ~48 % | ~35 % | **~12 %** |
| Transitions | Ghost/RGB glitch | Ghost + flash-cut | **Hard cut + 1 white flash** |
| Caption philosophy | Pivot-only emphasis slams | Pivot-only emphasis slams | **Submagic dense, word-by-word** |
| Accent color | Pink-magenta gradient | Flat red `#E91212` | **Crimson `#E1251C` (slash only)** |
| Backdrop | Warm indoor + rooftop | Warm indoor + rooftop | **White minimalist indoor** |
| Layout default | Face-dominant | Face + full-screen alternation | **B-roll dominant, face bookend** |
| SFX | Glitch swooshes | Glitch swooshes + flash pops | **None** |

## Timeline map (scene cuts)

| # | t_start (s) | Beat | B-roll / A-roll |
|---|---|---|---|
| 0 | 0.00 | Hook opener | Face close-up |
| 1 | 1.42 | Split-screen reveal | Face + SKILLS logo + red slash |
| 2 | 4.17 | Desktop ZIP file | Full-bleed macOS wallpaper + zip |
| 3 | 6.63 | Claude prompt | Claude desktop 'What's new, Mahesh?' + tool-call toast |
| 4 | 12.43 | SKILLS home page | skills.so scroll Ken-Burns through leaderboard |
| 5 | 19.27 | Claude Code terminal | Dark terminal `/skills` panel |
| 6 | 22.77 | `frontend-design` card | Dark pill card on white bg |
| 7 | 24.53 | `ai-seo` card | Same template, different skill |
| 8 | 26.74 | Windows Terminal agent picker | Animated selection pulses |
| 9 | 33.87 | `apify-ultimate-scraper` detail | Cursor-hand taps copy button |
| 10 | 36.25 | Windows CMD empty | Fresh prompt waiting for paste |
| 11 | 40.96 | White flash | 1–2 frame full-white |
| 12 | 41.04 | CTA close-up | Face close-up, caption shifts to white-outline |

## What to build for replication

Reusable components we should add to `remotion-studio/src/shared/` or `remotion-studio/src/styles/nick1/`:

- [ ] `<SubmagicCaptionTrack>` — word-level whisper JSON in, dark-pill or white-outline captions out. Variant prop. (Used across body + CTA.)
- [ ] `<NegationSlash>` — SVG line with draw-on animation. Color + angle + duration props. Drop over any B-roll shot.
- [ ] `<SkillCardPill>` — breadcrumb + title + copy-command chip template. Used twice in beats 6–7; general-purpose for any "here's a tool" name-drop.
- [ ] `<AgentPickerTerminal>` — mock Windows Terminal agent-selector scene with animated selection pulses. Niche but reusable if we ever show a CLI picker in a faux.thinker reel.
- [ ] `<KenBurnsScroll>` — generic 2 %-scale + vertical-translation animation for long screenshots. (Could replace an ad-hoc implementation.)
- [ ] `<HandCursor>` — animated hand-pointer SVG that drifts to a target and taps. Reusable whenever we need to direct attention inside a B-roll screenshot.

## Capture pipeline needed

To actually replicate a Nick-style reel for faux.thinker we need:

- Playwright script that scrapes `skills.so` home page + arbitrary skill detail pages at 1.6–1.8x zoom into 720×1280 canvas with the top nav intact
- macOS desktop wallpaper asset (beige/sand Sequoia-like)
- ZIP file icon PNG at macOS resolution + filename-label style (blue selected pill + centered label below)
- Windows Terminal screenshot template (dark, Administrator Cmd title) — can be a PNG background + SVG overlay for prompt text
- Claude desktop app screenshot template with swappable prompt text + tool-call toast card component

See [[Pipeline/Playwright Scraping]] for current scraping patterns (needs extension for SKILLS-specific selectors).

## Related

- [[Brand/Faux Thinker Style Guide]] — shipped v12 of the head-pop-out component. Nick 1 format is *not* head-pop-out; worth adding a §5 "Alternate formats" section to the style guide that documents Nick's B-roll-first layout as an option for future reels.
- [[Signature Effect Brief]] — Nick's red-slash negation is a textbook example of single-accent signature usage.
- [[_Index]] — back to index.

## Open questions

- [ ] Should faux.thinker adopt the B-roll-first format for a non-intro reel? (Current intro v12 is face-dominant — but a "here's a new tool" explainer could lean Nick-style.)
- [ ] Do we build the Submagic-dense caption renderer now, or stay with pivot-only emphasis slams as our signature? (If dense, it becomes a parallel caption track, not a replacement.)
- [ ] Beat-detect the music bed to confirm ~95 BPM hypothesis.
