# rpn 1 — Replication Playbook

**Source:** `D:/video editor/Styles/rpn/rpn 1.mp4`
**Duration:** 53.86 s · **Resolution:** 720 × 1280 · **FPS:** 23.98 · **Aspect:** 9:16
**Creator:** "rpn" — NYC-coded white male host, Mets cap, hoodie, gaming-creator studio with warm + red LED practicals
**Topic:** LTX 2.3 — new open-source video model that runs locally on consumer GPUs
**Tone:** Excited, gesture-heavy, power-user vibe. Focus on *what the model can produce* rather than the UI.

## Why this style is fascinating

rpn 1 is the **only** style in our audit where **B-roll IS the product's output** (LTX 2.3 generation samples), not a screen-capture of the product UI. This is a brilliant move when the product is generative: every B-roll doubles as live proof of the claim. It's also our highest cut-density audit — one cut every 1.8 seconds, with rapid flash-cut montages at intensity peaks.

It's also the only style that uses **persistent split-screen** as the default layout, not just for the opener. The top half runs the LTX samples through the full duration; the bottom half is the host, continuously.

---

## 1. Format & Layout

**Default:** persistent split-screen, B-roll top (~48 %), face bottom (~52 %), no divider line.

Exceptions (full-frame face):
- 7.05 – 12.14 s (emphasis beat for platform-agnostic "PC, MacBook, Mac Mini")
- 50.68 – 53.86 s (CTA with giant product-name logo overlay)

Everything else in between is split. The top B-roll swaps constantly (sometimes 5 swaps in 1 second); the bottom face stays continuous with smaller cuts.

Geometry (at render resolution 720 × 1280):
- Top region (B-roll): y = 0 to y ≈ 618 (approx 48 %)
- Bottom region (face): y ≈ 618 to y = 1280
- Divider: no visible line, just a content change; sometimes a thin dark border
- Captions: two tracks — one centered near the divider (retro pixel font), one within the B-roll region (subtitle-style, often baked-in)

---

## 2. A-Roll — Studio Spec

| Element | Spec |
|---|---|
| Backdrop | Dark gaming-creator studio. Warm off-camera practicals far left casting soft green-tinted bokeh. Red-lit monitor panels right side (looks like RGB keyboard glow + gaming-chair neon). Some greenery (plant) behind left. |
| Subject framing | Medium-tight — shoulders and head + hands visible as he gestures. Mic takes bottom-center vertical real estate. |
| Lighting | Key: warm practical mid-frame (soft). Fills: red & green LEDs from the rig itself. Creates cinematic "streamer-cave" ambience. |
| Wardrobe | Blue NY Mets cap with orange-red "NY" logo, black hoodie, wedding band visible on left hand. Consistent across cuts = continuous single recording session. |
| Mic | Large black shotgun/podcast condenser mic with visible pop filter, held upright by hand, bottom-center of frame. Always in shot — functions as a compositional anchor. |
| Gesture style | Very hand-heavy — fingers count, palms open for emphasis, occasional karate-chop "point" gestures. Adds energy to otherwise static framing. |
| Camera | Fixed, no zoom or pan. Shot on what looks like a mid-range mirrorless with a fast prime — shallow depth of field, slight background bokeh. |

Reference: `frames_scene/sc_009.jpg` (hands gesturing), `frames_scene/sc_030.jpg` (CTA), `frames/f_0085.jpg` (typical body beat).

---

## 3. Caption System — Dual-Track

rpn uses **three distinct caption typographies**, stacked as needed:

### 3a. Main narrator track — Retro pixel font

- **Typeface:** 8-bit pixel retro (looks like **Press Start 2P** or **VT323** or custom pixel font)
- **Color:** Pure white with subtle dark drop-shadow (2 px offset, 40 % opacity)
- **Size:** Medium — about 28–34 px at render resolution
- **Case:** ALL CAPS
- **Position:** Center-horizontal, placed near the vertical midpoint (over the split divider or in the upper face region)
- **Words per chunk:** 2–3
- **Used for:** 95 % of body captions — every normal narrative beat

Examples: "YOU NO LONGER", "SO WHETHER YOU", "VIDEO MODEL", "AND WHAT WE GET", "OVER YOUR DATA", "THIS", "I'LL SEND YOU"

### 3b. Emphasis track — Italic serif

- **Typeface:** Italic serif (looks like **Cormorant Garamond Italic** or **Playfair Display Italic**)
- **Color:** Pure white, no shadow
- **Size:** Medium-large — about 44–52 px
- **Case:** Lowercase, natural
- **Position:** Center-frame mid-height, overlaying the face
- **Duration:** ~1 s, floats in during a narrative pivot
- **Used for:** Pivot words — `for`, `for free`, `LTX 2.3` (when emphasized as product-name)

This is the direct analog of Devin's emphasis-caption slams, but with a *softer, more editorial* typographic voice — italic serif conveys "I'm leaning in" rather than "TAKE THIS AS LAW".

### 3c. Giant product-name lock-up — CTA only

- **Typeface:** Bold geometric sans-serif (looks like **Archivo Black** or **Syne Bold** or **Sora Black**)
- **Color:** Pure white, slight glow/outer stroke
- **Size:** Huge — fills ~60 % of frame width (letters ~140–180 px tall)
- **Case:** Mixed ("Ltx" with lowercase `tx`)
- **Position:** Center-frame, horizontally centered, overlaying the CTA face close-up
- **Duration:** ~2 s on the final shot
- **Used for:** The product-name moment in the CTA (only once, at 50.68 s)

Combined with a smaller retro-pixel caption "I'LL SEND YOU" below, this is a **stacked dual-caption** moment — highest information density of the whole video.

### 3d. Baked-into-B-roll subtitles

Several LTX 2.3 samples themselves have subtitle captions baked into them (e.g., "And it's completely free", "with open source in mind.", "It's multimodal"). The host's script is scripted *to match* whatever caption the LTX sample happens to show. This is either:
1. An LTX model feature (text-in-video generation)
2. Or the host added subtitle overlays to the B-roll during edit, styled to feel "baked in"

Either way, it's a clever callback device — you see the caption, then hear the host reinforce the same phrase.

---

## 4. The B-Roll System — LTX 2.3 Samples

Every B-roll is an **LTX 2.3 generation sample**, grouped by visual style:

| # | Time | B-roll description |
|---|---|---|
| 1 | 0.00–2.92 | LTX 2.3 app home screenshot — 'Next-generation quality, now supporting portrait' hero + 'Recent Projects' grid with 5 thumbnails (bear, rooster, cowboy, old man, nightclub man) |
| 2 | 2.92–4.42 | Anime-style cel-shaded face close-up (red eye-glow, yellow goggles) |
| 3 | 4.42–7.05 | 3 rapid swaps of LTX showreel samples |
| 4 | 12.14–13.85 | ComfyUI-style node graph of the LTX 2.3 pipeline (Prepare Frames, CLIP Text Encode, LTXVLatent, LTX Preprocess, LTXSampler, LTX KSA) — demonstrates local configurability |
| 5 | 13.85–16.31 | Cinematic wheat-field + burning farmhouse at dusk, 'Ltx' smoke-logo overlay |
| 6 | 16.31–21.02 | Misty forest with 3 hooded figures + glowing particles, caption 'It's multimodal' |
| 7 | 21.02–23.27 | LTX-restyled extreme close-up of someone matching the host (Mets cap + hoodie) |
| 8 | 23.27–26.86 | Rapid flash montage (5 cuts in <1 s) of LTX samples |
| 9 | 26.86–29.36 | Continuing LTX samples with retro-pixel caption 'VIDEO MODEL' |
| 10 | 29.36–34.74 | LTX close-up face samples |
| 11 | 34.74–39.75 | Axe-swinging fur-warrior in rocky cave ('you can use it without restriction' baked subtitle) |
| 12 | 39.75–43.38 | Young woman at riverside evening light ('And it's completely free' baked) |
| 13 | 43.38–46.55 | Denim-jacket woman driving vintage pickup ('with open source in mind.' baked) |
| 14 | 46.55–50.68 | Final LTX hold shot leading into CTA |

**Replication tip:** this style works only if you have access to the product's own output pipeline. For faux.thinker, we'd need to generate a showreel of our own content (via Veo 3, Flux, or whatever target model we're showcasing) and treat it as B-roll.

---

## 5. Timing Heuristics

| Heuristic | Value |
|---|---|
| Total duration | 53.86 s |
| Scene cuts (0.25 threshold) | 30 (highest in our audit set) |
| Average shot length | 1.8 s |
| Rapid-flash montage segments | 2 clusters: 5 cuts in 0.85 s (23.27–24.11 s), 4 cuts in 1.54 s (25.90–27.44 s) |
| Face-time ratio | 100 % (face is always visible, split or full) |
| Face-fullframe beats | 7.05–12.14 s (5.1 s) and 50.68–53.86 s (3.2 s) = ~8.3 s ≈ 15 % |
| Split-screen beats | ~85 % |
| Caption coverage | 100 % (always at least one caption track live) |

---

## 6. Audio

- **Music:** Chill driving lo-fi with bass-forward groove, slightly more aggressive than Nick, less cinematic than VC. Estimated ~100 BPM.
- **SFX:** Very subtle — a faint whoosh on some rapid-cut moments, but most cuts are silent. Similar "no SFX" policy to Nick.
- **VO:** Bright, de-essed, slightly compressed, higher pitch than Nick/VC. Has a distinct "NYC creator" accent character. Very consistent loudness.
- **Mic character:** Shotgun/condenser — you can hear he's close to it (proximity effect gives bass warmth).

---

## 7. How to Replicate for faux.thinker

If we want an "rpn-style" reel showcasing a generative AI product:

1. **Pick a generative AI subject** — anything with video/image/audio outputs we can show directly (Veo 3, Flux, ElevenLabs, Suno, Udio).
2. **Generate 8–14 sample outputs of varying styles** — fantasy, cinematic, close-up face, retro, action, stylized, etc. Aim for *range* — demonstrates versatility.
3. **Script the VO to pace with the B-roll swaps** — one new B-roll per narrative beat (3–5 s each) plus 1–2 rapid-flash montages at intensity peaks.
4. **Shoot Razeen in a persistent bottom-half framing** with mic visible bottom-center. Use our brand backdrop but with warm + red/pink LED practicals to mimic rpn's "streamer rig" energy (we can use faux.thinker brand-red `#E91212` for this).
5. **Build a `<SplitScreen>` Remotion component** — takes `topComponent` and `bottomComponent` children. 48/52 % split with no visible divider.
6. **Build a `<RetroPixelCaption>` component** — white ALL CAPS pixel font with shadow. Drop-in for Submagic-style dense captioning.
7. **Build an `<ItalicSerifEmphasis>` component** — italic serif single/short phrase overlay for narrative pivots. Lighter-touch than Devin's gradient slams.
8. **Build a `<ProductNameLockup>` component** — giant bold sans brand-name overlay for the CTA moment.
9. **Keep SFX minimal** — maybe one soft whoosh on the rapid-flash transitions, nothing else. Music bed carries rhythm.

---

## 8. Contrast Summary vs. Other Styles

| Attribute | Devin 1 | Devin 2 | Nick 1 | VC 1 | **rpn 1** |
|---|---|---|---|---|---|
| Duration | 69 s | 74 s | 45 s | 40 s | **54 s** |
| Cut density | 1/8 s | 1/10 s | 1/3.7 s | 1/2.5 s | **1/1.8 s** (highest) |
| Face ratio | ~48 % | ~35 % | ~12 % | ~38 % | **~100 %** (split or full) |
| Layout default | Face-dominant | Face + full-screen | Face bookend + B-roll body | Rounded-frame wrapper | **Persistent split-screen** |
| B-roll source | Real UI + mocks | Real UI + mocks | Real UI screenshots | Real UI + 3D illustration + AI art | **Product's own generated output** |
| Caption style | Pivot-only slams | Pivot-only slams | Submagic dense pill | Submagic dense pill | **Dual-track: pixel + italic serif + giant CTA logo** |
| Transition SFX | Glitch | Glitch + flash | None | Whoosh + glitch | **Almost none** |
| Emphasis typography | White→pink gradient | White/red flat | N/A | N/A | **Italic serif + giant logo lock-up** |

---

## 9. Open Items

- [ ] Build `<SplitScreen>`, `<RetroPixelCaption>`, `<ItalicSerifEmphasis>`, `<ProductNameLockup>` Remotion components.
- [ ] Source a pixel/retro font — Press Start 2P (Google Fonts, free) or VT323 (also free).
- [ ] Test-render a short faux.thinker reel using the rpn layout to see if persistent split feels too cramped on our existing avatar framing or if we need to re-shoot tighter.
- [ ] Beat-detect rpn 1 music to confirm ~100 BPM.
- [ ] Evaluate whether the "B-roll IS the product's own output" pattern fits any of our current target topics (probably: Veo 3 showreel, faux.thinker intro, any "what this tool can do" topic).
