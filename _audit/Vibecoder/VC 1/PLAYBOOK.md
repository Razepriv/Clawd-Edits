# VC 1 (Vibecoder) — Replication Playbook

**Source:** `D:/video editor/Styles/Vibecoder/VC 1.mp4`
**Duration:** 40.45 s · **Resolution:** 720 × 1280 · **FPS:** 23.98 · **Aspect:** 9:16
**Creator:** "Vibecoder" — solo host, dark studio, talks AI dev-tool news + reactions
**Series framing:** "Day N / BUILDING YOU 100x" — this is Day 130
**Topic:** Anthropic "leaked" that it's building a full-stack app builder inside Claude, threatening Replit & Lovable

## Why this style is interesting

Of the four reference creators we've audited, VC 1 is the most *production-designed*. It leans hardest on custom graphics (AI illustrations, title cards, decorated CTA) and uses a **persistent rounded-rectangle window frame** on every live shot to create a consistent "content inside a player" feel. It's also the only one that uses **AI-generated villain illustrations** as a hook device — a technique worth stealing.

---

## 1. Format & Layout Phases

| Phase | Time | Mode | What's on screen |
|---|---|---|---|
| Hook | 0.00 – 9.34 s | 3× AI-illustration full-bleed | Dramatic character art + heavy RGB glitch |
| Glitch bridge | 9.34 – 10.64 s | RGB-mosaic color-block flash | Abstract bars of teal/purple/blue/olive/brick |
| Title card | ~9.5 – 12.26 s | Animated typography | 'This is day 130 / BUILDING YOU 100x' on navy starfield |
| Explainer | 12.26 – 34.86 s | Rounded-frame closeup + rounded-frame B-roll alternation | Host in 15 px-pillarbox rounded window + tool screenshots using same frame |
| Insert | 29.86 – 34.86 s | Retro CRT illustration | 3D retro monitor with Claude sparkle/typing pill on screen |
| Bloodbath conclusion | 34.86 – 37.20 s | Rounded-frame closeup | Direct-to-camera "This is going to be a bloodbath" |
| CTA card | 37.20 – 38.79 s | Designed composition | White bg + mixed-typography CTA with hand-drawn decorations |
| Split tail | 38.79 – 39.33 s | CTA card top + face bottom | Transitional |
| Sign-off | 39.33 – 40.45 s | Rounded-frame closeup | "Follow for more videos" |

Compared to Nick 1 (face bookend + full-bleed B-roll body), VC 1 keeps the face visible about half the runtime but always **inside the rounded frame**, never full-bleed. And compared to Devin 1 (warm face-dominant), VC 1 leads with 9 seconds of AI illustrations before the host ever appears.

---

## 2. A-Roll — The Rounded-Frame Window

Every a-roll shot (and most B-roll shots) sit inside a **rounded-rectangle floating window** with black pillarbox margins:

| Parameter | Value (at render resolution) |
|---|---|
| Outer canvas | 720 × 1280 (9:16) |
| Window inset | ~15 px left/right, ~140 px top, ~170 px bottom (asymmetric — more room below for captions) |
| Window size | ~690 × 970 px |
| Corner radius | ~24–28 px |
| Background outside window | Pure black `#000000` |
| Drop shadow | None visible |
| Content inside | Face close-up OR full-bleed app screenshot, same geometry |

**Why it works:** viewers perceive everything shown as being "inside a player/device" — gives the reel a consistent wrapper regardless of whether the inner content is a face, a terminal, or a 3D illustration. Implement as a Remotion wrapper component `<RoundedFrame>` that any inner composition mounts into.

### Studio backdrop

- Teal-grey wall
- Framed colorful graffiti-style art on left (~x=60, visible half-cropped)
- Framed photo of red vintage car on right (~x=370)
- Lighting: warm soft key from frame-right, slight fill from left, very clean background
- Host wardrobe: black t-shirt with small gold/yellow circular chest logo (~20 px diameter, ~chest-center)
- Host framing: tight shoulders-up, eyeline at ~30 % from top of frame
- Microphone: not visible (probably lav or overhead)

Reference: `frames_scene/sc_005.jpg`, `frames/f_0070.jpg`, `frames/f_0145.jpg`.

---

## 3. The AI-Illustration Hook (signature)

First 9 seconds = **three stylized AI-generated character illustrations**, each intensified with RGB chromatic-fringe glitch + dramatic light-overlay treatments.

| Beat | Time | Illustration description | Visual treatment |
|---|---|---|---|
| 1 | 0.00 – 0.96 | Curly-haired villain in black suit at glass desk, glowing red-orange eyes, fire aura around head, tech-office background with AI-brain monitor | Warm orange/red cinematic grade, subtle RGB edge-fringe |
| 2 | 0.96 – 2.55 | Shocked face leaning over holographic screen, red pulse/heart glitch around head, retro-futurist office behind | Heavy cyan→red RGB chromatic aberration, wet/reflective specular highlights |
| 3 | 2.59 – 4.05 | Bald man in grey tee at desktop, entirely engulfed in red-lightning glitch web, corporate setting | Saturated red electrical overlay drawn over figure, strong motion-blur |

All three are the same *visual language* — "AI-news-anchor dystopia character illustrations," similar to how Devin uses ghost-motion-glitch transitions but as *standalone shots* rather than transitions. Generator is likely **Flux / Midjourney / SDXL** with prompts like:

> `cinematic illustration, stylized man in tech office, glowing red eyes, fire aura, dramatic overhead lighting, RGB chromatic aberration, 9:16 vertical composition, high contrast, [specific pose]`

**Replication tip:** script the hook with 3 dramatic metaphors (e.g., "heart attack", "collapse", "bloodbath") and generate one illustration per metaphor. Use a consistent character-sheet prompt so the three illustrations feel like the same "villain" universe.

---

## 4. The RGB Mosaic Glitch Bridge

Between the illustration hook and the title card (roughly 9.34 – 10.64 s), the video cuts to **abstract color-block glitch frames** — stacked horizontal bars in teal, purple, deep-blue, olive-green, and brick-red, with small floating rectangles of cyan/violet, over a dark starfield-noise background.

This feels like **pixel-sorting / bad-tape-glitch / databending** art. Duration ~30 frames. Purpose: aggressive visual reset between hook and title.

**How to build it in Remotion:**
1. Create an `<RgbMosaicGlitch />` component that renders 6–8 horizontal bars with hard-coded colors `#2CA89C`, `#8E3CBC`, `#2130C4`, `#7F8E1E`, `#9C3E26` (plus black), random heights
2. Each frame, pick a new random permutation of bar stack
3. Layer 1–3 small floating rectangles at random positions
4. Add a noise texture overlay at ~15 % opacity
5. Play for ~1.2 s between hook and title card

---

## 5. The Animated Title Card

Roughly 9.5 – 12.26 s: "This is day 130 / BUILDING YOU 100x" animated title on dark navy starfield.

| Parameter | Value |
|---|---|
| Background | Dark navy `#0B1018` + starfield noise texture |
| Primary text | 'BUILDING YOU 100x' — tall display sans, white, letter-spaced wide |
| Sub-text | 'This is' + 'day 130' |
| Letterblock accents | Teal, purple, deep-blue, olive-green, brick-red small solid rectangles peeking behind specific letters (like the mosaic-glitch bars sampled for each title word) |
| Animation | Each letter enters with subtle stagger + slight Y-offset scale-up; colored blocks pop in first, letters land on top; ~200ms per word |
| Font choice | Looks like **Archivo Black** or **Anton** or **Sora Black** — tall narrow condensed display |

**Replication:** Remotion `<SeriesTitleCard>` component, take props `{ day: number, title: string, taglineChips: string[] }`. Compose letters as individual `<div>` with `interpolate` for Y-offset + opacity. Play colored chips behind on a 100ms lead.

---

## 6. B-Roll Inventory

Every B-roll shot also uses the rounded-frame window. The inside is full-bleed app screenshot or illustration.

| # | Time | Source / mock | What it shows |
|---|---|---|---|
| 1 | 13.81 – 16.60 s | Rust-tinted rounded-rect frame w/ Claude desktop | 'Agent Fleet Overview' dashboard (8/12, 247, ACTIVE) + sticky-note callouts 'FIX AUTH FLOW by next week' / 'Don't forget to eat dinner' + terminal panel running `npx create-next-app@latest proposal-tracker` + 'Cogitating 24s +570 tokens' + 'Claude.' pill-logo at bottom |
| 2 | ~21 s (within 16.6–26.86 gap) | Rounded-rect Claude chat picker | Opus 4.5 chip + sessions list ('Document food logging APIs', 'Build comprehensive Swift SDK for OpenLifeLog API') |
| 3 | ~24.5 s | iOS-style settings list snippet | 'risks / irections / node' list with chevron arrows; hand-cursor icon tapping an arrow |
| 4 | 26.86 – 29.86 s | Rust-tinted rounded-rect w/ Claude Code terminal | Terminal running `openlifelog git:(main) × claude`, Claude Code v2.1.69 pixel-monster splash + '/remote-control is active' + a side sub-panel listing 'Code' tasks (Interactive session, Disconnected, Add password reset, etc.) |
| 5 | 29.86 – 34.86 s | 3D CRT-illustration metaphor still-life | Retro CRT monitor on messy tech desk; screen animates between Claude-sparkle (4-point pink/magenta star) and Claude-typing indicator pill (pink-orange gradient oval). Very "Pixar short" aesthetic |

**The Claude-sparkle on CRT is a very recognizable visual.** Easy to recreate: 3D rendered retro CRT asset (free on Polyhaven) + a compositing layer that alternates two Claude UI elements on the screen.

**Sticky-note callout trick (from beat 1):** drop a yellow/pink Post-it-note PNG over a screenshot with a sharpied handwritten message. Instantly personalizes an otherwise dry tool screenshot. Reusable across any reel.

---

## 7. The Designed CTA Card

At 37.20 – 38.79 s, the video cuts to a bespoke designed CTA card:

```
            ⬭ (outlined rounded rectangle chip, empty)
  ┌────┐
  │    ◢═══════════════════        (orange highlight sweep L→R)
  └────┘    C̲o̲m̲m̲e̲n̲t̲  ← cursor arrow tucked inside sweep
              "Builder"
              for the link.             [italic serif]

  ↪ purple tear-drop arrow             ◈ teal leaf chip
  ↘ small cursor triangle              ⬮ green-yellow marker swipe
```

**Typography:**
- "Comment" — Archivo Black / Sora Black, pure black, bold sans
- `"Builder"` — same family, bold, in straight quotes
- "for the link." — italic Playfair Display / editorial-style serif, black

**Colors:**
- Orange highlight sweep: `#F26A21`
- Hand-drawn decorations: purple `#8A6FE6`, teal `#2EA79A`, olive-green `#A8B635`, cursor black
- Background: near-white `#F7F7F6`

**Animation:**
- Orange sweep draws L→R across "Comment" in ~400 ms with a small black mouse-arrow cursor anchored to the leading edge (as if someone is dragging-highlighting the word)
- Hand-drawn decorations pop in on a 50–100ms stagger
- Submagic caption pill "the exclusive" lands below during the hold

**Why it works:** after 36 seconds of rounded-frame video-player framing, this card's magazine-layout aesthetic is a palate cleanser that signals "okay, action time." The mixed sans-serif / italic-serif typography reads "curated content creator brand" not "generic marketing."

Replicate as `<DesignedCTACard>` Remotion component with props `{ action: string, target: string, suffix: string }`.

---

## 8. Timing Heuristics

| Heuristic | Value |
|---|---|
| Total duration | 40.45 s |
| Scene cuts (0.18 threshold) | 16 (3 are flash-cut-pair hits) |
| Average shot length | 2.5 s (if we collapse the flash-pairs into single events, effective ~3.1 s) |
| Face-time ratio | ~38 % (15.5 s across 4 face clusters) |
| Illustration-hook ratio | ~23 % (9.3 s at the start) |
| B-roll / insert ratio | ~30 % (12 s across 5 inserts) |
| Title+CTA+glitch bridge | ~8 % (3.3 s) |
| Caption coverage | ~95 % |
| Longest single shot | ~5 s (retro CRT illustration) |
| Shortest | ~0.04 s (flash-cut pair frames) |

---

## 9. Audio

- **Music:** dramatic electronic / trailer-house bed, slightly higher energy than Nick 1. Noticeable ducked layers — a low rumbling pad under hook, brightening synths after title card.
- **Estimated BPM:** 105–115 (unconfirmed).
- **SFX:**
  - Subtle whoosh / sub-boom at each illustration cut (hook phase)
  - Harder impact SFX on the RGB-mosaic glitch bridge (multiple glitch-stutter layers)
  - Soft click/pop on title-card letter fly-ins
  - Small "tape-rewind" or reverse-whoosh into face close-up after title
  - Soft tape-hiss under CTA card
- **VO:** compressed + de-essed; slight reverberant tail (sounds like light plate reverb 10–15 %); urgent/energetic delivery, higher pitch than Nick.

---

## 10. How to Replicate for faux.thinker

If we want a "VC-style" explainer reel:

1. **Write a drama-hook script** — lead with a metaphor (heart attack / bloodbath / collapse). Think "news anchor breaking a story."
2. **Generate 3 villain illustrations** — Flux or Midjourney, consistent character prompt with different metaphor per shot.
3. **Build the `<RgbMosaicGlitch />` bridge component.**
4. **Build the `<RoundedFrame>` wrapper** — every face shot and every B-roll shot mounts through it.
5. **Record host close-ups against clean single-color backdrop** (teal or slate grey, like VC's studio) — tight shoulders-up. Add small personal-brand logo to t-shirt.
6. **Build the `<SeriesTitleCard>` component** — "Day N" framing is addictive, signals consistency. We could reframe as "Reel N" or "Week N".
7. **Sticky-note callouts on every tool screenshot** — add at least one Post-it with a casual human note (`"fix auth flow"`, `"deploy by fri"`) overlaid on each dry UI B-roll.
8. **Build the `<DesignedCTACard>`** with faux.thinker-brand orange (we can use `#E91212` faux.thinker red instead of VC's `#F26A21` orange).
9. **Add dramatic trailer-house music bed at ~110 BPM.**
10. **Add whoosh/boom SFX on illustration cuts** (contrast with Nick's zero-SFX approach).

---

## 11. Contrast Summary vs. Other Styles

| Attribute | Devin 1 | Devin 2 | Nick 1 | **VC 1** |
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

---

## 12. Open Items

- [ ] Build `<RoundedFrame>` + `<RgbMosaicGlitch>` + `<SeriesTitleCard>` + `<DesignedCTACard>` as reusable Remotion components in `shared/`.
- [ ] Capture + license a retro-CRT 3D asset (Polyhaven or Sketchfab, CC0 preferred).
- [ ] Build a Sticky-Note callout component (`<StickyNote>` with props `{ color: "yellow"|"pink", text: string, rotation: number }`).
- [ ] Generate 3 villain illustration prompts for a future faux.thinker reel and test-render them through Flux or Midjourney.
- [ ] Decide whether "Day N / BUILDING YOU 100x" pattern is valuable for faux.thinker — could frame as "@faux.thinker Day N — [topic]".
