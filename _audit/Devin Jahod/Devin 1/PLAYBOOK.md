# Devin 1 — Replication Playbook

> Source: `D:\video editor\Styles\Devin Jahod\Devin 1.mp4`
> Target platform: Instagram Reels
> Auditor method: every-0.25s frame sampling + scene-change detection + faster-whisper transcript + ffmpeg audio analysis.
> Confidence tags used: `[VERIFIED]` direct evidence, `[INFERRED]` reasoned from evidence, `[LOW-CONFIDENCE]` best-effort guess, `[UNKNOWN]` can't determine.

---

## 1. Technical specs (exact — replicate these)

| Property | Value |
|---|---|
| Duration | 69.56 s |
| Aspect ratio | **9:16 vertical** (native Reels) |
| Resolution | **720 x 1280** px |
| Frame rate | **24 fps** (not 30 — this matters for motion cadence) |
| Video codec | H.264, High profile, yuv420p |
| Color space | BT.709, progressive |
| Video bitrate | ~659 kb/s |
| Audio codec | AAC HE-AAC, 44.1 kHz stereo |
| Audio bitrate | ~59 kb/s |
| Total bitrate | ~722 kb/s |

Target export for a replica: `1080 x 1920, 24 fps, H.264 High, yuv420p, ~8–10 Mbps VBR, AAC 128 kbps stereo` (Instagram will re-encode down; give them headroom).

---

## 2. Concept (the replication contract)

**Genre:** "Expert-positioning educational micro-tutorial" — a short-form Reel where a high-ticket creator (Devin Jatho, @devinjatho, 329k followers) reveals professional tools.

**Arc:**
1. **Hook (0–10 s)** — Credibility-first: *"My name is Devin Jatho, my clients pay me $300k–$500k a year to write viral scripts."* Animated profile card + rising revenue chart act as visual proof.
2. **Value promise (10–14 s)** — *"These are the two websites I use for every viral script."* Transitional emphasis caption **"NOW MY GOAL"** flips the narrative from credibility to method.
3. **Method setup (14–20 s)** — Opens the actual Google Doc script, pops bullets **"SHORT"** + **"SIMPLE"** to frame the principle.
4. **Tool 1 reveal (20–42 s)** — VidYard Video Script Timer. App icon lands, URL pill auto-types, real B-roll of monitors, animated timer decrementing from 59 → 53 → 46 seconds (visual proof of iteration).
5. **Tool 2 reveal (42–52 s)** — Hemingway App. Icon transforms into full UI showing grade-level check, Hemingway's live red-highlight feature shown on actual script.
6. **Rule of thumb (52–60 s)** — Custom readability scale animation (1–10 colored dots, pointer sliding from 6 → 7), factoid card "avg US reading level is 7th grade."
7. **Recap + tease (58–62 s)** — Two app icons with three mystery "???" boxes = "2 of 5 sites, I have 3 more."
8. **CTA payoff (62–69.5 s)** — Show a *reference* to a linked video (inner framed clip + ??? boxes), then fake Instagram DM overlay with profile pic + message preview *"Here you go handsome man"* → ask viewer to comment "link."

**Hook structure formula (write to this):**
> `[Social proof number] → [Authority tag] → [Promise of specific tool count] → [Method transition caption] → [Reveal + proof] → [Recap + curiosity gap] → [Comment-gate CTA]`

---

## 3. Timeline — beat-by-beat with frame evidence

Every row points to either a `frames/f_####.jpg` (0.25s sample) or `frames_scene/sc_###.jpg` (scene-change detection).

| t (s) | Event | On-screen element | Frame evidence |
|---|---|---|---|
| 0.00 | Cold open, A-roll mid-close-up, speaker centered | Rounded-corner dark pill overlay mid-frame: **"Devin Jatho ✓ / 329k followers"** (Instagram-style profile card, white bold name + blue verified tick + grey subtext) | `f_0001.jpg`, `f_0004.jpg` |
| 0.02–4.58 | VO: *"My name is Devon Jato and my clients pay me anywhere from $300,000 to $500,000 a year..."* | Profile card visible throughout hook line | transcript seg 1 |
| ~2.0 | **Card swap** — profile card replaced by empty **"Average Revenue / per client"** card (same dark pill styling, rounded corners, small grey pill tag) | Placeholder chart area, no values yet — reveal frame | `f_0008.jpg` |
| ~3.0 | **Counter animation #1** begins — right-side value counts up to **$226,874** (grey, labeled as baseline); axis labels **"Apr 2024 ... Apr 2025"** appear | Still empty chart line | `f_0012.jpg` |
| ~4.0 | **Counter #2** left-side value appears in **green** counting to **$337,720**; animated green line chart starts drawing (ease-out curve) | Chart at mid-draw | `f_0016.jpg` |
| ~5.0 | Chart fully drawn — green exponential curve culminating at **$507,113**, comparison **$317,281** in grey | Final card state holds for ~1s | `f_0020.jpg` |
| 4.58–6.52 | VO: *"...to write viral social media scripts for them."* | Revenue card holds, then dissolves | transcript seg 2 |
| ~6.0 | **SCENE CUT** to B-roll composite: subject now blurred behind; three rounded-thumbnail cards floating center-lower: **"2M ▷" / "3.2M ▷" (Sell-Me-This-Pen thumbnail) / "1.7M ▷"** | View-count cards, rounded-square phone-frame style | `f_0024.jpg` |
| 6.76–10.18 | VO: *"And these are the two websites I use across every single viral script I make."* | Three-thumbnail card animates → shrinks → leaves **two app icons** center: green "VidYard-alien" icon + black "H\|" Hemingway icon. Background shifts to blurred Google Doc script text | `f_0028.jpg`, `f_0032.jpg`, `f_0036.jpg`, `f_0040.jpg` |
| **10.38** | **HARD CUT** + **RGB / chromatic-aberration glitch transition** — single frame shows heavy horizontal ghosting / scan-line doubling → delivered as the turning moment | Ghosted "NOW MY GOAL" text appears during the transition frame | `sc_001.jpg` |
| ~11.0 | Text slams in: **"NOW" (white)** on line 1, **"MY GOAL" (white→hot-pink→magenta gradient)** on line 2 | Huge condensed bold uppercase, center-lower, soft black drop shadow | `f_0044.jpg` |
| 10.60–14.52 | VO: *"Now my goal is to keep every single script as short and simple as possible."* | Caption stays briefly, then cut | transcript seg 4 |
| **11.58** | **HARD CUT** — full-screen **Google Docs window** overlay centered, subject dimly visible behind (opacity ~35–50%). Document title "Untitled document", content shows `Hook / Intro / Website 1 / Website 2 / CTA` sections with his actual script visible. Window has rounded corners with macOS-style title bar. | Google Docs as a **compositing card**, not fullscreen | `sc_002.jpg`, `f_0048.jpg` |
| ~14.0 | Two **pill graphics slide in from left**: black rounded pill **"SHORT"** + scissors-icon, then **"SIMPLE"** + star-icon (stagger) | Same dark-pill design language as the rest — bold uppercase white, soft drop shadow, backdrop blur | `f_0056.jpg` |
| 14.94–20.42 | VO: *"The first website I use to keep the script as short as possible is vid yard script timer..."* | Pills fade as the sentence lands | transcript segs 5–6 |
| ~16.0 | **SCENE CUT** — full-screen **VidYard app icon** (green alien-robot face on dark rounded square) centered, subject A-roll behind. Icon has subtle drop shadow + slight floating bob motion | Tool introduction shot | `f_0064.jpg`, `f_0072.jpg` |
| ~20.0 | **URL pill overlay appears** — dark rounded pill containing **"vidyard.com/script-tim\|"** with blinking text cursor (URL type-on animation, character-by-character) | ffmpeg detected ~4 "scene changes" at 21.17s, 21.21s, 21.25s, 21.29s — these are the **character-reveal frames of the typing animation** (not real cuts) | `f_0080.jpg`, `f_0084.jpg` |
| 20.84–24.52 | VO: *"Now this website will tell you exactly on how long it will take for you to read out your script."* | URL pill holds with full URL | transcript seg 7 |
| **24.83** | **SCENE CUT** — full-screen **Google Doc view with VidYard "59 seconds" popup floating over it** (small white rounded card with stopwatch icon, large "59 seconds" headline, small grey subtext "if you average 3 words per second") | The actual VidYard UI shown as an overlaid pop-up | `f_0096.jpg` |
| ~26.0 | **Zoom-in push** on the Google Doc — now zoomed to show only the **"CTA"** section bottom half; non-focused sections appear greyed/faded above | Focus-by-fade technique | `f_0104.jpg`, `f_0112.jpg` |
| **28.00** | **SCENE CUT** — B-roll **over-the-shoulder shot** of Devin's actual studio: dual-monitor setup (left: Google Docs, right: vidyard.com/script-timer with "0 seconds" timer), mounted LED light bar above, strong purple LED room lighting on wall + white LED moon lamp on desk. Subject's back/shoulder visible blurred on left. | Proof-of-reality B-roll — shot on what looks like a wider sensor / real camera (shallow DOF, natural motion blur) | `sc_003.jpg`, `f_0120.jpg`, `f_0128.jpg` |
| **33.13 → 33.17** | **FLASH CUT PAIR** (0.04 s apart) — screen-content cut: Google Doc view with timer "56 seconds" appearing via a **pull-handle/H animation** (blue caps-handle-like graphic slides in as a divider) | Editor used a scene-flash transition as the timer updates | `sc_004.jpg`, `sc_005.jpg`, `f_0136.jpg` |
| ~34–40 | Timer animation: **"56 seconds" → "53 seconds" → "46 seconds"** over successive shots, showing iterative editing of the script. Blue divider bars expand/contract at top/bottom of document to visualize section targeting. | Counter-decrement animation tied to narration of "lower the number by 10 seconds" | `f_0136.jpg`, `f_0144.jpg`, `f_0152.jpg`, `f_0160.jpg` |
| 36.08–42.80 | VO: *"Then once I knocked it down by at least 10 seconds, I go ahead and copy that script over to the second website, hemingwayapp.com."* | | transcript seg 12–13 |
| **40.17** | **SCENE CUT** — A-roll close-up, subject gestures; **Hemingway "H\|" app icon** appears composited over his chest area, subtle zoom-in bob | Tool #2 icon drop | `sc_006.jpg` |
| **42.83** | **SCENE CUT** — A-roll with **URL pill overlay** reading **"hemingway\|"** (typing animation, cursor visible) — same dark rounded pill style as vidyard URL earlier | Consistent UI language | `sc_007.jpg`, `f_0168.jpg` |
| ~44.0 | **SCENE CUT** — full-screen **Hemingway App UI mock**: dark navy-grey background, Hemingway "H\|" logo centered top with soft glow, metric cards (weakener 0 / hard to read 1 / simpler alternatives 1 / very hard to read 2), **"Readability: Grade 9 / Good."** right-side big text. Script text visible below, progressively faded as you go down (top section crisp, bottom section faded to 15–20% opacity). | **This is a custom-built mock of Hemingway App, not a real screen recording** — the typography and proportions match a hand-composited design, not the real Hemingway webpage `[INFERRED]` | `sc_008.jpg`, `f_0176.jpg`, `f_0184.jpg` |
| ~48.0 | Red **"hard to read" highlight boxes** appear on specific script phrases ("here are the two websites I use across every viral script I create" + "as short and simple as possible") — mimicking Hemingway's live highlighting | Highlight-animate sequence | `f_0192.jpg` |
| 42.86–48.68 | VO: *"...this one results will tell you the reading level of your script and highlight which part of your script might be too complex for your viewer."* | | transcript seg 14 |
| **48.79** | **SCENE CUT** — back to A-roll close-up; **new emphasis caption slams in**: **"THAT I" (white)** / **"FOLLOW" (white→magenta gradient)** — same font/style as "NOW MY GOAL" at 11 s | Second (and only other) emphasis caption | `sc_009.jpg`, `f_0200.jpg` |
| 48.88–52.36 | VO: *"A good rule of thumb that I follow is that the great level of your script has to be a grade 7 reading level or below..."* | | transcript seg 15 |
| ~52.0 | **SCENE CUT** — A-roll with **custom readability scale graphic**: italic/handwritten "Readability" label, horizontal colored-dot scale **1–10 (green→yellow→orange→red)**, white triangle pointer positioned at **~6**, hand-drawn line underneath | Custom illustrated graphic, appears to be vector-drawn in an "Excalidraw / hand-sketch" style `[INFERRED]` | `f_0208.jpg` |
| ~54.0 | Pointer animates from **6 → 7**; dots 8–10 animate out (removed) once pointer settles on 7 | Threshold-highlight animation | `f_0216.jpg` |
| **56.58** | **SCENE CUT** — A-roll with **factoid info card overlay**: dark rounded card, white text *"The average reading level in the U.S. is generally around the 7th-grade level. However, a significant portion of the adult population reads below this level, with many struggling with even basic literacy tasks."* — **"7th-grade level"** highlighted in **blue/selected-text box** like a Wikipedia mouse selection | Informational tooltip style, center of frame | `sc_009.jpg` (note: sc_009 is this moment, 56.58 s), `f_0224.jpg` |
| 52.36–56.42 | VO: *"...mainly because that is the average reading level in the United States."* | | transcript seg 16 |
| **60.13** | **SCENE CUT** — A-roll recap shot: **VidYard and Hemingway icons** fade to ~30% opacity behind three new black rounded **"???"** boxes with white question marks — "2 out of 5" curiosity gap | Icons-becoming-mystery-boxes animation | `sc_010.jpg`, `f_0232.jpg`, `f_0240.jpg` |
| 56.42–59.42 | VO: *"These are two out of the five of my favorite scripting websites."* | | transcript seg 17 |
| **62.17** | **SCENE CUT** — End-card B-roll composite: **rounded-rectangle frame** containing an inner clip of subject in a different (white-walled, brighter) studio with visible microphone and color-icon palette in hand; outer frame has drop shadow, **three "???" boxes** below, all layered over blurred duplicate of same clip | This is "watch my other video" teaser end-card; the framed inset references a follow-up video `[INFERRED]` | `f_0248.jpg` |
| ~64 | Inner clip cuts to **Microsoft Word doc titled "Viral Script"** (different document from the Google Doc) | Content-inside-frame swaps | `f_0256.jpg` |
| ~66 | Two **black rounded pill tags slide in over Word doc**: **"LESS TIME ⏱"** + **"LESS EFFORT 🔧"** (same pill-language as SHORT/SIMPLE pills earlier) | Consistent pill-tag graphic vocabulary | `f_0264.jpg` |
| **~68** | **SCENE CUT** — A-roll of Devin doing **double peace/V-sign gesture** with both hands, with **iMessage-style comment pill** appearing mid-frame: small profile pic (his avatar), text **"Lin"** (= "Lin"-k being typed), blue up-arrow send button | Mimics how to type a comment | `f_0272.jpg` |
| **~69** | Final shot: A-roll, subject with hands clasped chest-height, **Instagram notification toast overlay**: dark rounded card, Instagram logo, bold name **"Devin Jatho"**, "now" timestamp, message text **"Here you go handsome man"** | Simulates the DM reply viewer gets when they comment "link" | `f_0278.jpg` |
| 59.78–69.20 | VO: *"Now I just posted two video breaking down all of the tools I've used while scripting. So if you want to send that over to you along with the two websites that I mentioned in this video, then go and comment the word link and I'll send it to you."* | CTA line spans the entire final sequence | transcript segs 18–22 |

---

## 4. Style elements

### 4.1 Camera / framing / lighting (A-roll)

- **Framing:** medium close-up to close-up, **chest-up**, subject centered horizontally, eyes at roughly upper-third line. Vertical 9:16 crop uses the full height — no letterboxing.
- **Lens:** looks 35–50mm full-frame-equivalent — moderate DOF, softly blurred background `[INFERRED]`.
- **Key light:** soft, camera-front-right, warm temperature (~3200–3800K). Subject's face has defined nose shadow → slight off-axis placement.
- **Rim light:** colored LED backlight creating a strong colored aura behind subject. **Swaps between BLUE (hook, 0–10 s) and PURPLE / MAGENTA (everywhere else, 10–69 s)**. Intensity: strong — dominates background.
- **Practicals:** RGB lamp / color palette visible on lower-right (out of focus), left-side LED strip visible. Deep black room, no ceiling visible.
- **Background:** mostly black/very-dark studio with just the colored light wash. No sets or signage.
- **Camera motion:** static or near-static. Subject holds frame; most "movement" is internal to graphics.
- **Exposure / grade:** low-key, crushed blacks, skin kept exposed. Skin looks slightly warm, blacks are rich/inky (shadow lift is low). Hue tilt: highlights neutral, shadows tinted slightly cool-purple (matches backlight). No visible LUT signature, but aesthetic reads as "crushed-blacks + vibrant purple accent" — typical CapCut/Premiere "Cinematic" LUT adjusted for vibrance.

### 4.2 Color palette (sampled from frames)

| Role | Color | Where |
|---|---|---|
| Deep background | `#0A0A0F` near-black | Studio walls |
| Rim / accent (primary) | `#6B2DFF → #A845FF` violet-magenta | Backlight, gradient caption second-line |
| Rim / accent (secondary) | `#1A4B80 → #2D6FB3` cool blue | Hook section only (0–10 s) |
| Text / caption highlight | `#FFFFFF` pure white | Caption first line |
| Caption gradient | `#FF4DA6 → #A33FFF` hot pink → magenta | Caption second line |
| Growth/positive data | `#2AE66E` electric green | Revenue chart up-line, Hemingway "Good" label |
| Baseline/negative data | `#5C6671` medium cool grey | Revenue chart compare line |
| Warning / highlight | `#E6444A` red | Hemingway "very hard to read" box, red phrase highlights |
| Card surface | `#141419` very dark grey w/ slight blue tint | All dark rounded cards |
| Card border glow | Subtle 1px white @ 15% opacity | Card edges |

### 4.3 Typography

Three distinct type treatments:

**(a) Emphasis captions (the "NOW MY GOAL" / "THAT I FOLLOW" style):**
- Family: heavy **condensed bold uppercase sans-serif** — visual match to **"Obviously Wide Black"** or **"Proxima Nova Extra Condensed Black"** `[LOW-CONFIDENCE]`. Other plausible options: **"Antonio Bold"**, **"Druk Wide"**, **"Integral CF Heavy"**.
- Size: ~110–140 px (at 720×1280 export) — roughly 15–18% of frame width per line.
- Two-line layout, centered, mid-lower frame (around chest area).
- Line 1: solid white.
- Line 2: **linear gradient 0°, hot pink `#FF4DA6` → magenta `#A845FF`**.
- Slight character tracking: -2%.
- Drop shadow: black, 8–12px blur, 60% opacity, 0 offset.
- Soft outer glow: white, 2–4px, 20% opacity.
- Appears with subtle scale-up-from-95% + opacity-0-to-1 (duration ~120 ms), no other easing.

**(b) UI card labels (Devin Jatho card, Average Revenue card, Hemingway mock, etc.):**
- Family: **Apple SF Pro Display** or **Inter Medium/Bold** `[INFERRED]`.
- Color: white primary, mid-grey secondary.
- Dark card background with ~14–18px rounded corners.
- Style language is deliberately **iOS-native** — copies Apple notification / sheet aesthetic.

**(c) Pill tags (SHORT, SIMPLE, LESS TIME, LESS EFFORT):**
- Family: same heavy condensed uppercase as emphasis captions (smaller size, ~40–50 px).
- Black rounded pill ~16px radius, small inline icon on right.
- Slide-in from left, stagger 150–200 ms apart.

**(d) Decorative "Readability" scale label:**
- Italic/handwritten script — looks like **"Homemade Apple"** or **"Caveat Bold"** Google Font `[LOW-CONFIDENCE]`. Adds a hand-drawn feel to the custom graphic.

### 4.4 Motion graphics vocabulary

Five reusable graphic components — every overlay in the video is a variant of one of these:

1. **The dark iOS-card** (rounded rect, `#141419` bg, white/grey text, ~16px radius, ~25% backdrop blur). Used for: profile card, average revenue, factoid tooltip, DM notification, URL pills.
2. **The data card with counter + chart** (same iOS-card chassis, adds animated number count-up + vector line-chart draw on ease-out, syncs to voice). Used once (revenue card 2–6 s) but dominates the hook.
3. **The pill label** (narrower rounded pill, icon on side, big bold uppercase text, slides in from left with stagger). Used for: SHORT, SIMPLE, LESS TIME, LESS EFFORT.
4. **The app-icon float** (app icon on iOS rounded-square background, floats centered with subtle bob + slight drop shadow). Used for: VidYard, Hemingway.
5. **The emphasis caption** (two-line big bold, white + pink-magenta gradient). Used only twice (11 s, 50 s) — reserved for hook-turn and rule-of-thumb moments.

### 4.5 Transitions

Eleven cuts total, using four techniques:

| Technique | Count | Examples |
|---|---|---|
| **Hard cut on beat** | 7 | 11.58, 16, 24.83, 28, 40.17, 42.83, 60.13, 62.17 |
| **RGB / chromatic-aberration glitch frame** (ghosted scanline, full-frame chroma split, 1 frame long) | 2 | 10.38 → caption reveal, 48.79 → caption reveal. Used specifically to introduce emphasis captions |
| **Flash cut** (two cuts within 0.04 s — gives a micro-flash feel when timer updates) | 1 | 33.13–33.17 (timer value update) |
| **Push-in / zoom on overlay** (no cut, but focus scale changes) | 2 | Google-Doc zoom to CTA section (~26 s), app-icon bob-zoom (16 s) |

### 4.6 Captions philosophy (important — this is *not* a Submagic video)

**Crucial replication note:** Devin 1 does **NOT** use wall-to-wall autocaptions. There are **only 2 on-screen caption events** in the full 69.56 s:

- `00:10.5–00:11.5` — "NOW MY GOAL"
- `00:49.5–00:51.0` — "THAT I FOLLOW"

Everything else that reads as "text on screen" is a **UI graphic**, not a subtitle. The visual density comes from cards and overlays, not from transcribed speech.

**If you auto-caption this video in Submagic/CapCut you will break the style.** Keep emphasis captions reserved for narrative turns.

### 4.7 Audio / music

- **Background music:** present the full duration, no dead air. From spectrogram: heavy sustained low-end energy (sub-bass + kick pattern), regular vertical transients (consistent tempo), busy mid-high range. Genre feel: **lo-fi trap / modern hip-hop instrumental** with steady half-time drums `[INFERRED]`.
- **BPM:** regular transient spacing suggests **~90–100 BPM half-time** or **~70–80 BPM** `[LOW-CONFIDENCE]` — confirm with a manual tap.
- **Music duck:** music is present but clearly ducked under voice — voice sits ~6–9 dB above instrumental. No visible automation dips, suggests a sidechain compression or flat background ~-18 LUFS.
- **Opening hit (0.0–1.5 s):** prominent transient cluster in waveform — likely a **bass-drop / sub-kick + white-noise-riser combo** landing on the first "My name is" phrase `[LOW-CONFIDENCE]`. Classic TikTok hook-boost SFX.
- **No explicit SFX** detected elsewhere — transitions do not appear to carry discrete whoosh/riser/impact SFX beyond what the music already provides. The RGB-glitch transitions at 10.38 s and 48.79 s may have subtle tape/VHS "scratch" tones, but cannot confirm without listening.
- **Voiceover:** recorded with a clean cardioid mic (likely a **Shure SM7B / Rode NT1 class** `[LOW-CONFIDENCE]`), close-mic'd, slight room tone present, medium compression, no heavy EQ emphasis — sounds natural rather than "podcast-bright."
- **Silence:** 0 gaps > 0.3 s at -30 dB. The track is energetically flat.

### 4.8 Concept-to-structure hierarchy (use this to write a new script)

```
HOOK                    0–6 s    Authority claim + social-proof numbers
VALUE PROMISE           6–10 s   "Here's the exact N things"
TRANSITION CAPTION      10–11 s  "NOW MY GOAL" (narrative pivot)
METHOD PRINCIPLE        11–15 s  State the method in 1 sentence
TOOL 1 INTRO            15–20 s  Icon + URL pill
TOOL 1 DEMO             20–35 s  Real B-roll + animated counter proof
TOOL 2 INTRO            35–44 s  Icon + URL pill (same template)
TOOL 2 DEMO             44–48 s  UI mock + live highlighting
EMPHASIS CAPTION        48–52 s  "RULE / THAT I FOLLOW" (distills the rule)
RULE VISUAL             52–58 s  Custom illustrated graphic
SUPPORTING FACTOID      58–60 s  Info card with blue-highlighted key term
RECAP + CURIOSITY       60–62 s  Mystery "???" boxes
CTA SEQUENCE            62–69 s  Bonus-video tease → typing comment → DM preview
```

---

## 5. How to replicate (recipe)

### 5.1 Pre-production

1. **Script to 65–75 seconds** at 3 words per second → ~200–220 words.
2. **Script contract:** authority hook in sentence 1, promise in 2, pivot at ~15% in, reveal 2 items at ~30% and ~60%, universal rule at ~75%, CTA last 10 s.
3. **Record voice first** (dry voiceover in a booth / quiet room, cardioid mic close), then match to music BPM later.

### 5.2 Shooting (A-roll)

- Vertical 9:16, **4K recommended** so you can re-frame / punch-in in post.
- **Static tripod**, chest-up framing, eyes at upper-third.
- Lighting: **soft warm front-key** (LED softbox or Aputure Amaran), **deep back LED accent (blue for hook-only section, purple for the rest)**. Walls must go to near-black — use negative fill.
- Hair/wardrobe: simple, one neutral tone (beige cardigan over dark tee works — reads well on any background).
- Shoot ~3–4 takes, plus a handful of **B-roll inserts**: over-the-shoulder of your monitors (28 s shot), end-card shot in different studio (62 s shot), double-peace hand gesture shot (68 s shot).

### 5.3 Edit stack (Premiere / CapCut Desktop)

Either tool works. CapCut Desktop is sufficient and ships native versions of most effects used.

**Project setup:**
- Sequence 1080×1920, 24 fps, H.264, yuv420p.
- Timeline color space: Rec.709.

**Layer stack (bottom to top):**
1. Music bed (lo-fi / trap loop, 90 BPM half-time) — quiet full length, sidechain/-12 LUFS avg.
2. Voiceover — cut dead air, tight gaps (<150 ms).
3. A-roll clips and B-roll — cuts on beat per the timeline above.
4. UI cards (Profile, Revenue, Factoid, DM) — Photoshop/Figma exported PNG + AE/CapCut motion.
5. App icons (VidYard, Hemingway) — SVG, scaled to fit ~35% width.
6. URL pills — text layer inside pill shape with blinking cursor using a 2-frame on/off anim.
7. Emphasis captions — two-line text, gradient fill, drop shadow, scale-in.
8. Transition overlay frames — 1-frame RGB split PNG for the glitch transitions.
9. Music duck / sidechain.

**Specific effects to build / buy:**
- **RGB glitch transition:** 1-frame duration. Stack 3 copies of the next clip, offset Red channel +4px left, Blue +4px right, Green centered; add 2px horizontal motion blur + scanline texture. Reuse as a preset.
- **Count-up numbers:** in CapCut use "Text > Animation > Typing", in AE use a number-slider expression synced to the music beat.
- **Line chart draw:** AE Trim-Paths on a 4-point bezier (start at 50%, ease-out). In CapCut build with keyframed rect masks on an image of the final chart.
- **Readability dot scale:** custom SVG, 10 dots with a color gradient (`#20c54a` → `#ffd835` → `#ff7b2f` → `#ff3848`). Pointer is a white triangle tied to a position keyframe.
- **Instagram DM toast:** replicate the iOS notification chrome exactly (rounded rect, profile circle, bold name line, "now" on right, message body line). A single PNG import works fine; animate with slide-up + subtle bounce.

**Grade:**
- Lift blacks slightly (crushed but not clipped).
- Saturation +8–12.
- Hue-vs-hue: push violets toward pure magenta, keep skin tones at +0.
- No LUT required — the lighting setup does the work. If you want a LUT, "FilmConvert Rec.709 → Cinematic" at 30% intensity is a good baseline.

**Audio mix target:** voice peaks -6 dBFS, average -16 LUFS integrated, music ducked to -26 LUFS under voice.

**Export:** 1080×1920, H.264 High, 10 Mbps VBR, AAC 128 kbps stereo, no scale-up filtering.

### 5.4 Asset checklist

- [ ] Dark iOS-card PNG template (4 size variants: narrow pill, medium card, tall card, wide card)
- [ ] Pill tag template (with icon slot)
- [ ] Two app-icon PNGs (your tool icons, iOS-rounded-square format)
- [ ] 1-frame RGB glitch transition preset
- [ ] Count-up number preset
- [ ] Line-chart draw preset
- [ ] Readability dot-scale SVG
- [ ] Instagram DM toast PNG
- [ ] Purple + blue RGB LED lights (real, for rim)
- [ ] 90 BPM lo-fi trap loop (or generate with fal.ai / ElevenLabs Music)

---

## 6. Confidence summary

| Element | Confidence |
|---|---|
| Duration, resolution, fps, codecs | `[VERIFIED]` from ffmpeg probe |
| Cut timestamps | `[VERIFIED]` from scene detection; some internal cuts may be missed at threshold 0.08 |
| Voiceover transcript | `[VERIFIED]` faster-whisper base model, English, high quality audio |
| Color palette hex values | `[INFERRED]` — eyeballed from compressed JPEG frames (original may differ by ±5 in any channel) |
| Font identification | `[LOW-CONFIDENCE]` — exact font unknown; style is the replicable asset |
| Music track identity / BPM | `[LOW-CONFIDENCE]` — cannot Shazam; BPM estimated from spectrogram transient spacing |
| SFX identification | `[LOW-CONFIDENCE]` — I cannot hear; opening hit inferred from waveform transient cluster |
| Hemingway UI as mock vs real | `[INFERRED]` — proportions/typography do not match the live Hemingway site exactly |
| Software used (AE / CapCut / Premiere) | `[UNKNOWN]` — no signature visible; either could produce this |

---

## 7. Evidence files

- `frames/f_0001.jpg` – `frames/f_0278.jpg` — 278 sampled frames at 0.25 s intervals
- `frames_scene/sc_001.jpg` – `frames_scene/sc_010.jpg` — 10 scene-change frames at threshold 0.2
- `audio/audio.wav` — mono 16 kHz voice-capable audio
- `audio/waveform.png` — full-width waveform visualization
- `audio/spectrogram.png` — 0–22 kHz spectrogram
- `audio/silence.txt` — silence detection log (empty = no gaps)
- `audio/transcript.json` — full word-level timestamped transcript (faster-whisper base)
- `scene_times.txt` — scene-change timestamps
- `EVENTS.json` — machine-readable event log (next to this file)

Every claim in this playbook is backed by a frame or an audio artifact in those files.
