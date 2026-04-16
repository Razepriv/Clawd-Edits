---
tags:
  - style-audit
  - devin-jatho
  - instagram-reels
  - educational
creator: Devin Jatho
source_file: D:/video editor/Styles/Devin Jahod/Devin 2.mp4
duration_seconds: 74.16
status: complete
audited: 2026-04-16
related:
  - "[[Styles Audits/Devin 1]]"
  - "[[Brand/Faux Thinker Style Guide]]"
---

# Devin 2 — Replication Playbook

> Source: `D:\video editor\Styles\Devin Jahod\Devin 2.mp4`
> Target platform: Instagram Reels
> Auditor method: 4 fps frame sampling + 6 scene-change detections + faster-whisper transcript + ffmpeg audio analysis.
> Confidence tags: `[VERIFIED]` direct evidence · `[INFERRED]` reasoned from evidence · `[LOW]` best-effort.

---

## 1. Technical specs

| Property | Value |
|---|---|
| Duration | **74.16 s** |
| Aspect | **9:16 vertical** (720×1280 → upscale to 1080×1920 for replica) |
| Frame rate | **24 fps** (same as Devin 1) |
| Codec | H.264 High, yuv420p, BT.709 progressive |
| Video bitrate | ~683 kb/s |
| Audio | AAC HE-AAC, 44.1 kHz stereo, 65 kb/s |

Export spec for a replica: **1080 × 1920, 24 fps, H.264 High, CRF 20, AAC 192 kbps**.

## 2. Concept

**Genre:** "Instagram growth hack / platform-SEO tutorial" — short-form viral tutorial with real platform demos and pop-up UI graphics.

**Topic:** Instagram just started feeding posts into Google search → here are 3 steps to make sure your caption gets your Reel ranked first.

**Arc:**

1. **Hook (0–3.8 s)** — *"As of last week, Instagram dropped a massive update."* Outdoor rooftop shot with heavy RGB/ghost glitch + "AS OF LAST WEEK" emphasis caption.
2. **Problem setup (3.9–9.5 s)** — *"Every single video has potential to show up when someone searches on Google."* Google search overlay graphic (typing "how to go vi…"). Scene cut + glitch at 9.8 s.
3. **Urgency (9.8–19.9 s)** — *"95 million posts every day, your video will get buried if you don't optimize fast."* Google results page composite showing a real Devin reel embedded in search. Indoor shot with tools-preview graphic (Google G + answerthepublic icon).
4. **Promise (20.4–24.3 s)** — *"Here are 3 steps to make sure your video always pops up first."* Indoor chest-up shot with **"TO DO IT / FAST"** caption (white + red "FAST"). Scene cut + glitch at 24.7 s.
5. **Step 1: Enable Google setting (24.6–37.5 s)** — *"Go to profile → settings → scroll to account privacy → make sure it's turned on."* Full-screen IG profile page (`devinjatho`, 361 K followers) → IG Settings → Account Privacy menu with "SECRET" caption + toggle graphic at 10 s.
6. **Step 2: Answer The Public (37.7–54.2 s)** — *"Head to answerthepublic.com, search your topic, use the most popular wheel result as the first line of your caption."* Scene cut + glitch at 37.8 s (+flash cut pair 42.08→42.13). Full-screen AnswerThePublic landing → search entry form ("how to go viral") → WHEELS result showing highlighted orange wedge "how to go viral on instagram".
7. **Step 3: People Also Searched (54.2–68.2 s)** — *"Scroll to 'people also searched', copy those terms, build your caption with them."* Scene cut + glitch at 55.5 s. Indoor shot + fake IG caption overlay showing search-term–rich caption with bolded keywords (reels, without followers, overnight, Hashtags, for free).
8. **CTA payoff (68.5 s–end)** — *"Throw in hashtags and your video is perfectly…"* Indoor chest-up with "BECAUSE" caption (continues beyond clip cut).

---

## 3. Timeline — beat-by-beat

Every row points to `frames/f_####.jpg` (0.25 s samples) or `frames_scene/sc_###.jpg` (6 scene-change frames: 9.79, 24.67, 37.75, 42.08, 42.13, 55.46).

| t (s) | Event | On-screen | Frame |
|---|---|---|---|
| 0.00 | **Hook opens** — outdoor rooftop, Devin in tan open jacket + black tee, hands gesturing, city building + warm windows behind | Heavy RGB-ghost glitch overlay (full-frame) | `f_0001` |
| 0.00–3.76 | VO: *"As of last week, Instagram dropped a [redacted] massive update."* | | |
| ~3.0 | **Emphasis caption** slams in: **"AS OF / LAST WEEK"** — two-line condensed bold white uppercase, bottom-lower placement, textured film-look still behind | `f_0012` |
| 3.94–6.52 | VO: *"Every single one of your videos has potential to show up..."* | | |
| ~6.0 | **Google search overlay** appears — dark-grey full-screen overlay with "Google" wordmark + search pill typing "how to go vi\|" (cursor blinking) | `f_0024` |
| 6.76–9.54 | VO: *"...when someone searches on Google."* | | |
| **9.79** | **Scene cut + HEAVY GLITCH** (RGB-channel split + ghost/motion-blur + scan lines) — back to rooftop with Devin doing open-hand gesture | `sc_001` |
| 9.80–14.52 | VO: *"But with 95 million posts going up on Instagram every day..."* | | |
| ~14 | **Full-frame Google-results composite** — dark-grey mock Google SERP showing "How to go viral in IG and get more followers?" Reddit links, "Short videos" section with an actual Devin reel thumbnail embedded + a kayazlee TikTok | `f_0056` |
| 14.72–19.94 | VO: *"...your video will start to get buried if you don't start optimizing your caption for Google search and you need to do it fast."* | | |
| ~20 | **Indoor shot** — dark studio with floor-to-ceiling windows, city night skyline + warm-lit building behind. Devin chest-up seated at desk. | `f_0080` |
| ~20 | **Emphasis caption**: **"TO DO IT / FAST"** — "TO DO IT" in white, "FAST" in **BRAND RED** (new — Devin 1 was pink-magenta; Devin 2 uses red) | `f_0080` |
| 20.38–24.30 | VO: *"So here are three steps to make sure that your video always pops up first."* | | |
| **24.67** | **Scene cut + glitch** — indoor Devin mid-gesture, warm windows behind, tools-preview composite: Google G icon + AnswerThePublic mushroom icon + sparkle icon (AI?) floating at chest level | `sc_002` / `f_0100` |
| 24.64–28.36 | VO: *"So to start, you need to actually make sure that you have the Google setting turned on."* | | |
| ~28 | **Full-screen IG profile page** — real screenshot of Devin's `@devinjatho` profile: 169 posts / 361 K followers / 93 following. Bio: "Devin Jatho \| Content Marketing · Building Profitable Personal Brands · Traced $57 M+ in Organic Client Revenue · See What Built It 👇" · link `nexuscreator.com`. Below: profile pic ring (has "Note…" tooltip), 3 circular highlights (TESTIMONY / RESULTS / JOIN NEXUS), 6 post thumbnails (VIRAL FLOW, "A YOUNG BOY", etc.) | `f_0120` |
| 28.36–33.70 | VO: *"So go over to your profile, open up your profile settings and then scroll down until you see account privacy."* | | |
| ~34 | **Full-screen IG Settings menu** — dark mode Settings screen, scrolled to "Who can see your content" with **"Account Privacy"** row highlighted (a padlock icon + "Public" + chevron). Above: Notifications, Time management, For professionals (Insights / Meta Verified / Scheduled content / Creator tools and controls). Below: Close Friends / Crossposting / Blocked / Story, live and location / Messages and story replies / Tags and mentions / Comments | `f_0140` |
| ~36 | **Toggle animation reveal** — iOS-style toggle switch graphic appears over the settings, with **"SECRET"** emphasis caption (white bold). The toggle animates from off → on with a glow/pulse effect | `f_0040` *(earlier but graphic identical here)* |
| 35.20–37.54 | VO: *"And then you want to make sure that this setting is turned on."* | | |
| **37.75** | **Scene cut + glitch** — back to indoor Devin, hands typing-air gesture, Google search pill overlay low on frame (empty `Q` mic) | `sc_003` / `f_0160` |
| 37.74–41.88 | VO: *"Then second, head over to the website, answer the public dot com."* | | |
| **42.08 → 42.13** | **Flash cut pair** (0.04 s apart — single-frame white flash as SERP transition) | `sc_004`, `sc_005` |
| ~42 | **Full-screen AnswerThePublic landing page** — "AnswerThePublic by NP digital" header, "Enter a topic, brand or product…" search pill (empty), "You're using a free version of AnswerThePublic · 1 out of 3 free searches available for today · UPGRADE TO PRO", blue popup at bottom: "11th anniversary celebration · Get 5 months of AnswerThePublic for free · Valid July 17–28 · CLAIM OFFER NOW" | `sc_005` |
| 42.14–44.20 | VO: *"And then go ahead and search the topic of your video."* | | |
| ~44 | **AnswerThePublic search modal** — modal overlay "Search" with source tabs (Google / Bing / YouTube / TikTok / Amazon), **"how to go viral"** typed in input, Country "United States" 🇺🇸 + Language "English (US)", big orange "SEARCH" button | `f_0180` |
| 44.48–48.02 | VO: *"Now this will give you a wheel of the most popular searches for that topic."* | | |
| ~48 | **Full-screen WHEEL result** — AnswerThePublic Questions wheel. White background, tab-bar WHEELS (orange selected) / LIST / TABLES, "Questions" dropdown, a big circular wheel graphic with one **orange highlighted wedge** reading **"how to go viral on instagram"**. Below: "Showing People Also Ask from Google" + "⬇ Export ⌄" button | `f_0200` |
| 48.28–54.16 | VO: *"...choose the most popular one that best fits your video and then make that the first line of your caption."* | | |
| **55.46** | **Scene cut + glitch** — indoor Devin, clapping/hand-together gesture | `sc_006` |
| ~55 | **Full-frame fake IG caption card overlay** — dark glass card with IG heart + comment icons top-left, headline "How to go viral on instagram?" in grey, 4 candidate searches as captions with **yellow-bolded keywords**: "How to go viral on instagram **reels** / **without followers** / inst**overnight** / **Hashtags** / **for free**" | `f_0220` |
| 54.16–60.58 | VO: *"And then third, click on the search that you chose and then scroll down to find the people also searched section."* | | |
| ~62 | **Expanded fake caption card** — same card style but filled with full caption text: "How to go viral on instagram? · Do you want to have viral **reels**? Even **without followers**, you can go viral on instagram, **overnight**. Using the correct **Hashtags**, SEO and trends, you'll be viral **for free** in no time. · **#instagram**" (teal hashtag) | `f_0260` |
| 60.80–68.22 | VO: *"Copy these search terms over and then try to best create a summary of your video with these search terms."* | | |
| 68.46–72.26 | VO: *"And then once you're done, throw in a couple of hashtags and now your video is perfectly..."* | | |
| ~73 | **Outdoor reprise** — shot returns to outdoor rooftop, Devin hands-up gesture, **"BECAUSE"** emphasis caption appears (white bold, mid-chest placement) | `f_0295` |

---

## 4. Style elements

### 4.1 Dual-location shooting (new vs. Devin 1)

| Location | Used during | Look |
|---|---|---|
| **Outdoor rooftop / balcony** | Hook (0–9.8 s), step transitions (briefly), closing (~73 s) | Blue-hour dusk sky + warm yellow building windows behind. Higher-key, more natural. Heavy glitch effects concentrated here. |
| **Indoor studio with city-view windows** | Most of the tutorial body (10–73 s) | Dark studio with massive floor-to-ceiling windows showing night city skyline (building lights visible). Devin seated chest-up at a dark desk. Lower-key, more intimate. |

**Why it matters:** Devin 1 was single-location (indoor studio, purple LEDs). Devin 2 cuts between two locations for pace. This is a production-time choice — requires shooting both locations in one session.

### 4.2 Devin 2's wardrobe
- **Tan / beige open jacket** over **black tee** (both locations — same outfit throughout)
- Earring visible, same as Devin 1
- Small arm tattoo visible on right arm (not prominent in Devin 1)

### 4.3 Emphasis captions — **color shift from pink/magenta → RED**

Where Devin 1 used `#FF4DA6 → #A845FF` (pink→magenta gradient), Devin 2 uses **brand red**: second-line word rendered in **solid red (~`#E91212`)** with a subtle outer glow. No gradient — flat red.

Captions seen:
| Caption | Style | Time |
|---|---|---|
| "AS OF / LAST WEEK" | All white, two lines | ~3 s |
| "SECRET" | Single word, white | ~35 s (over IG settings) |
| "TO DO IT / **FAST**" | "TO DO IT" white + "FAST" flat red | ~20 s |
| "BECAUSE" | Single word, white | ~73 s |

Font style: same as Devin 1 — **heavy condensed uppercase bold** (Obviously Wide / Druk Wide class; **Archivo Black** as free substitute).

### 4.4 Transitions — heavier, more chaotic

Compared to Devin 1:
| Transition type | Count | Description |
|---|---|---|
| **Ghost/motion-blur glitch** | 3× (9.79, 24.67, 55.46 s) | More aggressive than Devin 1's simple RGB-split. Appears to combine: (a) duplicated frames with positional offset, (b) horizontal scan-line bands, (c) motion-blur streak. Could be AE `CC Force Motion Blur` + `CC Split` or similar preset. Full-frame, 1–3 frames long. |
| **RGB split** | Same glitch moments | Red/cyan offset on chroma channels |
| **Flash-cut pair** | 1× (42.08 → 42.13 s, 0.04 s apart) | Hard single-frame white flash transitioning into the AnswerThePublic page. Less common in Devin 1. |
| **Hard cuts** | ~6× unlabeled | Standard editor cuts between on-screen-graphic beats and talking-head beats |

### 4.5 Motion graphics vocabulary

Devin 2 uses a mostly-different graphic set vs. Devin 1 — because the content is different (SEO tutorial vs. script writing):

| Graphic | Description | Reused from Devin 1? |
|---|---|---|
| **Google search pill typing-animation** | Dark-grey overlay with "Google" wordmark and a search pill with character-by-character typing ("how to go vi\|") | ❌ new — but similar mechanic to Devin 1's URL-pill typing |
| **Google SERP mock** | Custom-built dark-mode Google results with Reddit links and a "Short videos" carousel embedding an actual Devin reel thumbnail | ❌ new (heavier custom UI mock) |
| **IG profile page full-screen** | Real screenshot of @devinjatho IG profile (169 posts / 361 K followers) as B-roll insert | ❌ new |
| **IG Settings full-screen** | Real screenshot of IG Settings, scrolled to "Account Privacy" | ❌ new |
| **iOS-style toggle switch graphic** | Animated switch turning from off → on with a white glow pulse, paired with "SECRET" caption | ❌ new |
| **Tools-preview composite** (Google G + ATP mushroom + sparkle) | Three icons floating at chest level on indoor shot | ⚠️ same *pattern* as Devin 1's VidYard + Hemingway icons composite |
| **AnswerThePublic full-page captures** | Landing / search modal / wheel result (3 distinct captures, real screenshots) | ❌ new |
| **Fake IG caption card overlay** | Dark-glass floating card, IG heart + comment icons, headline grey text, candidate captions with yellow-bolded keywords | ❌ new; **borrows card-language from Devin 1's factoid card** but styled as IG UI |

**Graphic component vocabulary reusable for future tutorials:**

1. **UI-native screen captures** (full-screen real app screenshots) → Devin uses **real IG, real AnswerThePublic** rather than mocking. Authentic and fast to produce.
2. **Dark-glass info card** → same `card-surface + subtle border + drop-shadow + backdrop-blur` language as Devin 1's iOS cards. Reused.
3. **Platform-icon float composite** → 2–3 icons floating at chest level, blurred script doc behind subject. Reused from Devin 1.
4. **Toggle-switch graphic** → animated UI control (not in Devin 1).
5. **Typing-pill overlay** → Google or app search bar with blinking cursor. Similar to Devin 1's URL pill.
6. **SERP/caption mock** → fake social card styled as IG or Google UI.

### 4.6 Lighting

- **Outdoor:** natural blue-hour + warm window lights + possible slight fill. Contrastier, more saturated.
- **Indoor:** dark base with warm window lights in the background — similar color tone to Devin 1 but **no magenta/purple rim light**. Instead it's amber/gold from city windows. Different brand wash.

### 4.7 Audio

- **Music bed:** sustained throughout, same style as Devin 1 (lo-fi / trap / hip-hop instrumental, ~90 BPM half-time). Waveform shows continuous energy, no dead air.
- **Heavy opening transient** (first 0.5 s) — same as Devin 1, suggests a bass-drop / sub-kick hook-boost.
- **Voiceover:** clean cardioid mic, close-mic'd, slight room tone. US English, semi-casual delivery. Includes a censored swear ("[redacted]") — suggests Devin's audience tolerates edgier language.

### 4.8 Concept-to-structure hierarchy (replication template)

```
HOOK WITH PLATFORM HEADLINE       0–4 s        "X just changed / dropped / updated"
CONSEQUENCE                        4–10 s       "Every Y now can…"
SCALE/URGENCY BUILD                10–20 s      Big number + "do it fast"
TURN CAPTION                       ~20 s        "TO DO IT FAST" or similar
PROMISE OF N STEPS                 20–25 s      "Here are N steps"
STEP 1 with full-screen app demo   25–38 s      Real app screenshots + UI graphic
STEP 2 with full-screen tool demo  38–55 s      Real tool screenshots + mock overlay
STEP 3 with caption/output demo    55–70 s      Result mockup + fake IG card
CTA + outdoor reprise              70+ s        "Throw in hashtags…" ending shot
```

---

## 5. How to replicate

### 5.1 Pre-production

- **Script to 65–80 s** at ~2.4–2.6 words/sec (faster than Devin 1 because more info-density).
- **Topic pick:** a PLATFORM-SPECIFIC growth hack that has a news-hook angle ("X just changed…"). Instagram, TikTok, LinkedIn, YouTube algorithm tweaks are perfect.
- **Record VO dry first**; then plan graphics to land on specific phrases.
- **Gather real screenshots** of every tool you'll mention — no mocks. Authenticity is half the appeal.

### 5.2 Shooting (A-roll)

Two locations:
- **Outdoor**: golden-hour to blue-hour on a rooftop or balcony with a city view behind. Use warm window lights as natural accent.
- **Indoor**: seated at a dark desk in front of large windows showing city skyline at night. No extra rim light needed — the city's window lights do the work.

**Wardrobe:** open tan/beige jacket over dark tee. Casual but composed.

Shoot each line 2–3 times per location. Outdoor usage: hook (~8 s) + closing (~4 s) only. Indoor: 60+ s body.

### 5.3 Edit stack

Same tools as Devin 1 replica (Premiere / CapCut Desktop / Remotion). Components to build / reuse from the existing `remotion-studio`:

**Reuse from Devin 1:**
- `EmphasisCaption` — **but add a `solidColor` mode** for the second line (flat color, no gradient) since Devin 2 uses flat red instead of gradient
- Platform-icon float composite (from `AppIconFloat`)
- URL pill / typing-pill pattern

**New components needed:**
- `ToggleSwitch` animated graphic (iOS-style toggle, off → on, with glow pulse)
- `IGCaptionCard` (fake IG caption styled overlay with bolded keywords)
- `SearchPill` (Google-style search pill with typing animation — variant of `URLPill`)
- `PlatformFullScreen` (just a wrapper that displays a scraped screenshot at full frame with enter/exit transition)

**Transitions to build:**
- **GhostMotionGlitch** — combined duplicated-frame-offset + scan-line + RGB-split, 2–3 frames. More intense than the simple `rgbSplit` from the toolkit.
- **FlashCutPair** — 1-frame white flash sandwiching a hard cut.

### 5.4 Capture strategy for platform screenshots

- Use **Playwright** (already wired in our pipeline) to capture:
  - `instagram.com/<your-handle>` full profile page (1080 × 1920 mobile viewport)
  - `instagram.com/accounts/privacy_and_security` or similar settings page
  - `answerthepublic.com` landing, search modal, wheel result
  - `google.com/search?q=<your-topic>` (mobile viewport, or custom mock if your topic doesn't have good SERP features)
- Apply **Ken Burns zoom** via FFmpeg for each — same pattern as `platform_recordings/*_kenburns.mp4`.

### 5.5 Grade

- Outdoor: crushed blacks, bump saturation +10, warm temp shift +200 K
- Indoor: crushed blacks, slight teal-orange split-toning (shadows teal, highlights warm)
- Both: film-grain overlay @ 10% opacity (Devin 2 reads slightly grainy)

### 5.6 Audio mix

Voice peaks −6 dBFS, avg −16 LUFS integrated. Music ducked to −26 LUFS under voice. No SFX visible in the pack — all transitions have music as their audio transition.

---

## 6. Confidence summary

| Element | Confidence |
|---|---|
| Duration / resolution / codec | `[VERIFIED]` |
| Cut timestamps | `[VERIFIED]` from scene detection |
| VO transcript | `[VERIFIED]` faster-whisper base |
| Two shooting locations | `[VERIFIED]` |
| Wardrobe / creator identity | `[VERIFIED]` |
| Flat-red emphasis caption (no gradient) | `[INFERRED]` from compressed JPEG — may actually have subtle gradient hidden by compression |
| Font family (Obviously Wide class) | `[LOW]` — same guess as Devin 1 |
| Music track identity / BPM | `[LOW]` — can't Shazam; BPM estimated |
| Ghost/motion-blur glitch recipe | `[INFERRED]` — specific AE plugin unclear without source project |
| IG profile + Settings screens are real captures vs. mocks | `[INFERRED]` — pixel fidelity of UI strongly suggests real captures |
| ATP screens are real captures | `[VERIFIED]` — "11th anniversary celebration" popup is a real ATP promotion |

---

## 7. Evidence files

- `frames/f_0001.jpg`–`f_0296.jpg` — 296 sampled frames at 0.25 s intervals
- `frames_scene/sc_001.jpg`–`sc_006.jpg` — 6 scene-change frames
- `audio/audio.wav` — mono 16 kHz
- `audio/waveform.png` / `spectrogram.png` — full audio analysis
- `audio/transcript.json` — word-level Whisper transcript (21 segments)
- `scene_times.txt` — cut timestamps
- `EVENTS.json` — machine-readable event log

Every claim above is backed by a frame or audio file in those assets.

---

## Related notes

- [[Styles Audits/Devin 1]] — sibling video, same creator, single-location, pink/magenta accent (vs. Devin 2's dual-location + red accent)
- [[Brand/Faux Thinker Style Guide]] — our canonical spec, mostly derived from Devin 1
- [[Signature Effect Brief]] — decision framework for what elements to make ours
