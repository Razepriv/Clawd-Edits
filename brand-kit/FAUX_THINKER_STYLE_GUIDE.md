# faux.thinker — Video Style Guide

> **Purpose**: Lock in every design decision made for @faux.thinker video edits so future renders stay visually consistent. The style will remain exactly as defined here unless the user explicitly asks to change an item in this file.

---

## 1. Identity

| | |
|---|---|
| Channel | **@faux.thinker** on Instagram |
| Display name | **Razeen Shaheed** |
| Positioning | **AI Agents and Automation Expert** |
| Tagline | *"I turn coffee into code, ideas into apps & Automations"* |
| Agency | **WebVerse Arena** — Chennai → "WE ARCHITECT UNFAIR PRIVILEGE" |
| CTA pattern | DM-gated delivery ("DM me…", "hit follow", "comment 'link'") |
| Avatar source | AI-generated avatar (HeyGen / Synthesia class), black hoodie, plant + warm-LED studio set |

## 2. Video technical specs (do not change)

| | |
|---|---|
| Aspect ratio | **9:16 vertical** — Instagram Reels native |
| Resolution | **1080 × 1920** |
| Frame rate | **25 fps** (matches source avatar video) |
| Codec | **H.264 High**, `yuv420p` |
| Audio | **AAC, 48 kHz stereo, 192 kbps** |
| Color space | BT.709 |
| Target length | 25–45 s (current intro Reel: 31.17 s) |

## 3. Brand tokens (from `remotion-studio/src/brand/tokens.ts`)

### Colors

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0A0A0A` | Pure near-black — card backdrops, fade-out target |
| `surface` | `#141419` | Dark card surfaces (ProfileCard, RevenueChart, DMToast, pills) |
| `textPrimary` | `#FFFFFF` | Card titles, caption base |
| `textSecondary` | `#9AA0A6` | Subtext, axis labels, metadata |
| **`accent`** | **`#E91212`** | **Primary brand red** — emphasis-caption bottom line, active caption word |
| **`accentBright`** | **`#FF2A2A`** | **Gradient highlight** — hotter red for bottom of emphasis caption gradient |
| `link` | `#5B8EFF` | Link text, verified tick, blue factoid highlight |
| `growthGreen` | `#2AE66E` | Up-arrows, positive numbers (RevenueChart) |
| `warningRed` | `#E91212` | Matches accent — Hemingway-style phrase highlights |
| `divider` | `rgba(255,255,255,0.15)` | Card 1-px borders |
| `shadow` | `rgba(0,0,0,0.45)` | Card drop shadow |

### Typography

| Role | Font | Weight | Substitute if unavailable |
|---|---|---|---|
| **Emphasis (big captions, pills, emphasis caption)** | **Archivo Black** | 900 | Bebas Neue, Druk Wide, Obviously Wide |
| UI cards (ProfileCard, DMToast, FactoidCard body) | **Inter** | 400–700 | system-ui, -apple-system |
| Decorative handwritten (ReadabilityScale label) | **Caveat** | 600 | Homemade Apple |

Font loading: `remotion-studio/src/index.css` imports from Google Fonts (`Archivo+Black`, `Inter`, `Caveat`).

### Component dimensions + animation constants

See `remotion-studio/src/styles/devin1/constants.ts`:
- Canvas: 1080 × 1920 @ 25 fps
- Caption font-size: 108 px (single-word captions at bottom), 168 px (emphasis caption)
- Pill font-size: 52 px (padding 20 × 36, radius 999)
- Card radius: 22 px, padding 22 px, shadow blur 40 px, backdrop blur 18 px
- Spring config baseline: damping 14, stiffness 180, mass 0.85

## 4. Motion-graphic vocabulary (components — keep these exactly)

All live in `remotion-studio/src/styles/devin1/components/`:

| Component | Purpose | Entry animation |
|---|---|---|
| `ProfileCard` | Creator name + followers + verified tick | Slide from left (-520 px → 0) + opacity fade + spring scale 0.94 → 1 |
| `RevenueChart` | Stats card with counter + line chart | Slide up from bottom (+220 px → 0) + opacity fade |
| `EmphasisCaption` | Narrative pivot slam (e.g. "NO FLUFF") | Scale 0.86 → 1 + translateY +60 → 0 (snappier spring) |
| `PillTag` | Rounded pill label with optional icon | Slide from left (-480 px → 0) + opacity fade |
| `URLPill` | URL with typing animation + blinking cursor | Slide up + typing character-by-character |
| `FactoidCard` | Info tooltip with `{{highlight}}` phrase | Slide up (+100 px → 0) + opacity fade |
| `ReadabilityScale` | 1–10 colored dots + triangle pointer | Pointer slides from 1 → target; dots above fade-above threshold |
| `AppIconFloat` | Center-anchored app icon with bob | Spring scale 0.78 → 1 + continuous sine-bob |
| `DMToast` | Instagram DM-style notification | Slide up from bottom (+160 px → 0) + opacity fade |
| `BrollCutaway` | Full-frame platform UI cutaway with label | Configurable slide_up / slide_down / fade / scale enter & exit |
| `SplitStackBroll` | **Canonical 3-layer 3D pop-out edit (CURRENT DEFAULT — v12 locked)** — (1) full-frame sharp B-roll covering 100% of the canvas edge-to-edge (no dark base), (2) floating frame in the lower 30–35% with mandatory side margins (never touches screen edges — this is what sells it as a floating card not a split-screen divider), (3) masked subject with body fully contained inside the frame on left/right/bottom; only the HEAD pops above the frame's top edge as the one and only breakout point. Drop shadow on frame for depth. See **§4.1** for exact parameter values. | Whole stack enters/exits together per chosen transition |
| `WordCaptions` | Word-by-word Submagic captions | Single word at a time, spring-pop per word |
| `MattedAvatar` | Alpha-matted avatar over platform UI (PiP) | No entrance animation (synced to B-roll window) |
| `OverlayVideo` | Blend-mode video layer (light leaks, shockwaves) | Handled by MP4 content itself |
| `GlitchFlash` | Programmatic RGB glitch burst | **RETIRED** — user felt it looked ugly; do not use |

### 4.1 `SplitStackBroll` — locked parameter values (v12)

These exact numbers produce the approved pop-out — **do not change without explicit user instruction**. File: `remotion-studio/src/styles/devin1/components/SplitStackBroll.tsx`.

| Prop | Locked value | Why |
|---|---|---|
| `brollHeightPercent` | **ignored** (B-roll is always 100%) | Legacy arg; kept for schema compat |
| `avatarMargin` | **86 px** | Mandatory side margin — floating frame never touches screen edges |
| `avatarRadius` | **40 px** | Corner radius of floating frame |
| `frameTopPercent` | **68** | Floating frame starts at y = 68% of canvas (y = 1306 px at 1080×1920) |
| `frameBottomPercent` | **96** | Floating frame ends at y = 96% (y = 1843 px) — leaves 4% bottom gap so card floats |
| `headOvershootPercent` | **14** | Subject container extends 14% above `frameTopPercent` (top = 54%, y ≈ 1037 px) — gives the head enough vertical room without over-extending |
| `MattedAvatarSequence.objectPositionY` | **16** | Biases the `object-fit: cover` crop so the top of the hair stays inside the visible area while the body lands inside the floating frame. **Lower than 16** → hair visible but face pops above frame (wrong); **higher than 16** → hair top gets clipped (v11 bug) |

**B-roll event entry/exit defaults** (per beat in `fauxThinkerIntroSpec.ts`):
- n8n (first in sequence): `enter: "slide_up"`, `enterDuration: 0.22 s`, `exit: "fade"`, `exitDuration: 0.20 s`
- Claude (middle): `enter: "fade"`, `exit: "fade"`, both `0.20 s`
- Cursor (last): `enter: "fade"`, `exit: "slide_down"`, `enterDuration: 0.20 s`, `exitDuration: 0.25 s`

**Frame card visual style** (hard-coded in component):
```css
background: linear-gradient(135deg, #141419 0%, #0A0A0A 100%)
border: 1px solid rgba(255,255,255,0.15)
box-shadow: 0 18px 44px rgba(0,0,0,0.55)
border-radius: 40px
```

**Label pill position**: `top: 44 px` of canvas (over the B-roll at top), centered. Font: Archivo Black 38 px uppercase, padding 12×28, radius 999, bg `rgba(20,20,25,0.85)`, backdrop-blur 12 px.

**Matted subject drop shadow**: `drop-shadow(0 6px 12px rgba(0,0,0,0.5))` — integrates the subject into the scene; do not remove.

**Geometry cheat sheet** (at 1080 × 1920):
- Frame card: x = 86–994, y = 1306–1843  (width 908, height 537)
- Subject container: x = 86–994, y = 1037–1843 (width 908, height 806 — 269 px taller than frame, all extending upward)
- Subject body stays inside frame on left / right / bottom; only head/hair breaks above top edge

## 5. Audio system

### Music bed (current)

**`remotion-studio/public/music_bed_v6.mp3`** → *Muscle Prodigy — A Champion Mindset*
- Volume: **0.11** (ducked well under VO)
- No crossfades; one track for the whole video

Alternate beds tried + rejected:
- ElevenLabs-generated lo-fi trap (v2–v5) → too generic
- Silent Partner / Kevin MacLeod tracks from `Packs/songs/` → available as alternatives

### SFX mapping (do not change without discussion)

| Moment | File | Volume |
|---|---|---|
| ProfileCard entrance | `sfx_pack/click.mp3` | 0.90 |
| RevenueChart entrance | `sfx_pack/click.mp3` | 0.95 |
| Each B-roll cutaway entry | `sfx_pack/swoosh_1.mp3` / `_2.mp3` / `_3.mp3` | 0.85–0.90 |
| Each light-leak transition | `sfx_pack/shutter.mp3` | 0.80 |
| "NO FLUFF" emphasis caption | `sfx_pack/no_fluff_braam.mp3` (cinematic BRAAM, ElevenLabs-generated) | 1.00 |
| DMToast entrance | `sfx/notification.mp3` (iMessage ding, ElevenLabs) | 0.85 |

**Files**:
- Primary pack: `remotion-studio/public/sfx_pack/` (from user's `Packs/SFX PACK/`, cleaned + renamed)
- ElevenLabs generated: `remotion-studio/public/sfx/` (used only when no pack equivalent exists)

**Retired**:
- `sfx/glitch_burst.mp3` — used in v5 with Veo glitch; user feedback "ugly"; do not use

## 6. Caption style (locked)

- **One word on screen at a time** (`windowSize: 1`)
- Strict speech window — component returns `null` when no word is actively spoken (prevents "duplicating" perception from v6)
- **Active word color**: `accentBright` (#FF2A2A)
- Inactive fallback: pure white (for multi-word windows if ever used)
- Font: Archivo Black, 108 px, uppercase
- Position: **`yPercent: 78`** (lower third, below emphasis caption and UI cards)
- Stroke: 1.5 px rgba(0,0,0,0.7)
- Shadow: `0 4px 12px rgba(0,0,0,0.85)`
- Per-word entry: spring scale 0.88 → 1, opacity 0 → 1 over 5 frames

**Hide captions during:**
- EmphasisCaption window (the emphasis caption IS the caption for that moment)
- DMToast window (the toast IS the caption for the CTA)
- Any B-roll cutaway where the cutaway label does the captioning job

## 7. B-roll strategy

| Use case | Method |
|---|---|
| Platform name is spoken ("n8n", "Claude", "Cursor", future tools) | **Playwright scrape** → 1080×1920 screenshot → FFmpeg Ken Burns zoom → 2 s MP4 in `platform_recordings/`, rendered as `stacked_broll` event using `SplitStackBroll` (canonical 3-layer head-pop-out edit — see §4.1 for locked params) |
| Avatar-over-platform PiP | **retired** in v8 in favour of canonical 3-layer edit — use `SplitStackBroll` (tool mentions), `MattedAvatar` PiP only for special cases |
| Abstract scenes not on a website ("voice agents for clinics") | **Veo 3 Fast** generation (paid, ~$0.60 per 6 s) |
| Meme / tech overlay accents | `Packs/Molob 300k FREE overlay pack/` — HUD 1/3/5, Hyperspeed, shockwaves, speed lines |

**Always prefer**: real scraped platform UIs > AI-generated B-roll. Scraping is free, more authentic, platform-accurate.

## 8. Transition system

| Layer | Source | Blend mode | SFX |
|---|---|---|---|
| **Light leak transitions** (between beats) | `light_leaks/ll_1..5.mp4` (extracted from `Packs/FREE Light Leak Transitions Pack - 4K.mp4`) | `screen` | `shutter.mp3` |
| **Energy Shockwave on NO FLUFF** | **retired in v9** (user felt blue was off-brand) — only audio cue now: `no_fluff_braam.mp3` | — | BRAAM |
| **Fade-to-black at end** | FFmpeg post-process: `fade=out:st=30.67:d=0.5` + audio `afade` | — | (none — music fade does the work) |

**Retired**: Veo-3-generated RGB glitch transition (v3, v4) — user feedback "ugly". Do not regenerate.

**User's .ffx transition packs** (in `Packs/Transition Pack #1–5/`, `Flashes Pack #1–2/`, CC packs): **require After Effects to render**. Until AE is installed, use the Light Leak + Molob packs which are already `.mp4` / `.mov` format.

## 9. Beat structure (narrative template)

Every faux.thinker Reel follows this arc (adapt timings per script length):

```
0%    — ProfileCard appears on creator's name word            (click SFX)
~15%  — RevenueChart or similar stats reveal                  (click SFX)
~30%  — Light-leak transition to content list                 (shutter SFX)
~50%  — B-roll cutaways for tool/platform mentions            (swoosh SFX)
~70%  — EmphasisCaption slam ("NO FLUFF" etc.)                 (flash + bass_drop SFX)
        + Energy Shockwave overlay
~85%  — Light leak → DMToast CTA                              (shutter → notification SFX)
100%  — Fade-to-black
```

## 10. Asset locations (single source of truth)

```
D:/video editor/
├── brand-kit/
│   ├── BRAND.md                        — identity + palette reference
│   └── FAUX_THINKER_STYLE_GUIDE.md    — THIS FILE
├── remotion-studio/
│   ├── src/
│   │   ├── brand/tokens.ts             — BRAND constants (FAUX_THINKER, DEVIN_JATHO)
│   │   ├── styles/devin1/
│   │   │   ├── constants.ts            — DEVIN1 design tokens
│   │   │   ├── fauxThinkerIntroSpec.ts — current Reel's ApplySpec
│   │   │   ├── Apply.tsx               — event → component dispatcher
│   │   │   └── components/             — 10 motion-graphic components
│   │   └── shared/
│   │       ├── types.ts                — Zod event schema
│   │       ├── OverlayVideo.tsx        — blend-mode video overlay
│   │       ├── MattedAvatar.tsx        — PNG alpha-sequence player (with PiP)
│   │       ├── ChromaKeyOverlay.tsx    — (unused — SVG chroma key)
│   │       └── GlitchFlash.tsx         — (retired)
│   └── public/
│       ├── avatar.mp4                   — uploaded avatar video
│       ├── music_bed_v6.mp3             — Muscle Prodigy bed
│       ├── matted_avatar/mat_####.png   — PNG alpha sequence (94 frames for current intro)
│       ├── platform_recordings/         — scraped platform UIs + Ken Burns MP4s
│       ├── logos/                       — n8n.svg, claude.png, cursor.png, webverse.png
│       ├── light_leaks/ll_1..5.mp4      — extracted transitions
│       ├── overlays/shockwave_trimmed.mp4
│       ├── sfx/                         — ElevenLabs generated (notification)
│       └── sfx_pack/                    — SFX PACK from user (swoosh, hit, click, shutter, etc.)
├── scripts/
│   ├── veo.py                           — Veo 3 wrapper (for B-roll generation)
│   ├── eleven_music.py                  — ElevenLabs Music
│   ├── eleven_sfx.py                    — ElevenLabs Sound Effects
│   └── matte_avatar.py                  — rembg → PNG alpha sequence
├── _audit/
│   ├── Video_insta_1/                   — source avatar audit (frames, transcript, audio)
│   └── outputs/                         — faux_thinker_intro_v1..v7.mp4
└── Packs/                               — user's purchased asset library (source materials)
```

## 11. Workflow conventions

- **Every new Reel** starts by copying `avatar.mp4` + updating `fauxThinkerIntroSpec.ts` with the new transcript word timestamps (run `faster-whisper` first via existing pipeline).
- **Word timestamps**: always source via `faster-whisper` on the avatar's extracted audio, `_audit/<video_name>/audio/transcript.json`.
- **Manual corrections**: Whisper mishears proper nouns. Apply known-word map:
  - `"Webversarina"` → `"WebVerse Arena"`
  - `"N10"` → `"n8n"`
  - (Extend this map as new Reels surface new mishears.)
- **Render pipeline**: `npm run dev` in `remotion-studio/` for live preview; `npx remotion render FauxThinker-Intro ...` for final.
- **Post-process**: all finals pass through FFmpeg for fade-out, audio normalization, and CRF 20 compression.

## 12. Locked decisions — do not change unless user asks

1. **Black + brand-red aesthetic** — never violet/purple, never blue-dominant
2. **Single-word captions with red accent** — not word-highlight of multiple
3. **Canonical 3-layer head-pop-out edit for tool-mention B-rolls** (v12 locked) — B-roll fills 100% of the frame; floating frame card sits in lower 30–35% with mandatory ≥80 px side margins (never edge-to-edge); body fully contained in frame; only the head breaks above the top edge. **Exact locked parameters in §4.1** (headOvershootPercent = 14, objectPositionY = 16, avatarMargin = 86, frameTopPercent = 68). All earlier variants retired.
4. **Light leaks with shutter SFX** between beats (not glitch flashes)
5. **EmphasisCaption stands alone** for narrative pivots — no shockwave overlay, only a BRAAM audio cue (shockwave retired v9, Veo glitch retired v5)
6. **Fade-to-black at end** (not hard cut)
7. **Muscle Prodigy — A Champion Mindset** music bed at 0.11 volume (until otherwise specified)
8. **SFX PACK files** for all diegetic element sounds (click, shutter, swoosh, bass, flash)
9. **Archivo Black** for all emphasis type (substitute for Obviously Wide)

---

## Changelog (append new entries as the style evolves)

- **v12 (2026-04-15)** — **Current state — user-approved, locked.** Final tune of the pop-out: `headOvershootPercent = 14`, `objectPositionY = 16`. Hair top fully visible, forehead/hair pops above the frame card, face and body contained inside the frame. See §4.1 for all locked parameter values.
- v11 — Canonical 3-layer spec implemented; head-crop issue (`headOvershootPercent = 12`, `objectPositionY = 35`) cropped the top of the hair at the matted container top. Fixed in v12.
- v10 — 4-layer attempt with body overflowing on left/right/top. Wrong — user clarified the body should stay inside and only head should break out.
- v9 — First 4-layer attempt. Layer 3 was the clipped original video (subject + bg), which visually stayed too large and didn't create the overflow illusion. Replaced in v10.
- v8 — Split-stack B-roll layout (top platform UI, bottom rounded speaker window). Captions filtered out of B-roll window to avoid overlapping speaker area.
- v7 — Captions single-word, matted avatar PiP, shutter SFX on transitions, click on pops, fade-out at end.
- v6 — added Submagic captions, avatar matting, light leaks, Energy Shockwave, SFX PACK integration, Muscle Prodigy music.
- v5 — 3 platform B-roll cutaways with labels + whoosh SFX, removed Veo glitch.
- v4 — word-anchored timing, enhanced entrance animations, 5 generated SFX.
- v3 — Veo 3 RGB-glitch transition (retired in v5).
- v2 — RevenueChart counter, larger pills, ElevenLabs music bed (retired in v6).
- v1 — first cut with ProfileCard, pill stack, EmphasisCaption, DMToast.
