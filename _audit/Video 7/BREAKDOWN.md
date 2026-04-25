# Video 7 — Audit & Edit Breakdown

**Source:** `D:/video editor/Videos/Video 7.mp4`
**Date scanned:** 2026-04-25
**Style target:** faux.thinker v12.4 (NEVER mix with cohousy)

---

## 1. Technical profile

| Field | Value |
|---|---|
| Container / Codec | MP4 / H.264 (Lavf58), AAC LC |
| Duration | **41.77 s** |
| Resolution | 1080 × 1920 (9:16 vertical) |
| Framerate | 25 fps |
| Bitrate | 5.6 Mbps total |
| Audio | 44.1 kHz **mono** (different from prior reels — fine for editing) |
| Cuts | 1 — single continuous take |

---

## 2. Scene

Same Raz framing as Video 6 (black hoodie, plant-wall, warm strip-lights). 21 sampled frames are consistent. Clean canvas for overlays.

---

## 3. Transcript (whisper small, CPU — `large-v3-turbo` hit a CUDA mkl_malloc OOM, fell back cleanly)

| # | t (s) | Line | Beat function |
|---|---|---|---|
| 1 | 0.00 – 6.20 | "Stop fixing your LinkedIn. Something just made it irrelevant for builders. It's called basecamp." | **HOOK + PRODUCT NAME** |
| 2 | 6.74 – 12.66 | "You ship in public. Streaks, peer reviews, verified commits — all feed a public score…" | **MECHANIC** |
| 3 | 12.66 – 19.04 | "…recruiters paid to search." | **PROOF / HIRING ANGLE** |
| 4 | 19.04 – 19.66 | "My honest take from someone running an agency solo from Chennai, not San Francisco." | **CREDIBILITY** |
| 5 | 19.66 – 25.58 | "If you're stuck on Upwork, this is your move." | **YES IF** |
| 6 | 25.58 – 31.80 | "If you already post your work publicly, skip it. Stacking three platforms doesn't make you hireable. Pick one — be undeniable." | **NO IF** + **THESIS** |
| 7 | 32.52 – 37.50 | "Cohort 1 runs April to July, free for builders." | **OFFER** |
| 8 | 37.94 – 41.38 | "Where are you putting your effort — basecamp, GitHub, or your own audience? Drop it below." | **CTA** |

---

## 4. basecamp.apexaios.io — verified context

Pulled live: tagline + brand palette + product mechanics from CSS + meta tags + a full Playwright screenshot.

| | |
|---|---|
| Tagline | **"Your virtual hacker house."** |
| Meta description | "Real-time rooms, build logs, community" / "Ship every day, stay accountable, grow together." |
| Featured stats on hero | **2,847** builders · **12K+** matches · **847** placements · **47** partner companies |
| Cohort 0 dates | "Apr–Jul 2026" (matches Raz's "Cohort 1 April to July" — likely the upcoming intake) |
| Core mechanic | **Builder Score** — "the reputation metric that unlocks access to paid cohorts, gated cohorts, and the teams hiring through Basecamp" |
| Feature 01 | **Live Voice Rooms** — co-working sessions, attendance tracked |
| Feature 02 | **Daily Build Streaks** — heatmaps & freezes |
| Feature 03 (truncated in screenshot) | "Certified Battles" or similar |
| Primary CTA | **"START YOUR BUILDER RECORD"** (gold pill) |
| Secondary CTA | "HIRING? SEARCH THE GRAPH" |

### Brand palette (from `assets/index-VhQmSGiB.css`)

| Role | Hex | Use |
|---|---|---|
| **Primary accent** | **#F5C542** | gold yellow — CTA pills, score numbers, headline highlight |
| Accent dark | #D9A441 | hover/press states |
| Background | #0A0A0A / #0C0C0C | near-black hacker terminal |
| Surface card | #1A1A1A / #1E1E1E / #222 | layered card stack |
| Cream paper | #F4F1EA | newspaper-zine sections |
| Text mid | #666 / #555 / #A0A0A0 | secondary copy |
| Reference contrast | #0A66C2 (LinkedIn blue), #1D9BF0 (X blue) | implies they're already drawing the comparison on-site |

### Aesthetic
**Newspaper × hacker zine.** Bold black serif/condensed display fonts ("Your virtual hacker house" with `virtual` and `house` in italic gold). Cream paper sections, hard column rules, big numerical stats — feels like a builder broadsheet.

---

## 5. Real-world chatter (X, captured)

| Take | Handle | Relevance |
|---|---|---|
| take_2 | **@intenxe_ops** (Mar 25) | "*even if man WANTED to lock in corporate, ain't no real ones... they want sheep, they want you pre-packaged in their DEAD systems. Getting a job ain't giving up on yourself. It's giving up TO a system that…*" — perfect anti-LinkedIn / pro-build-in-public sentiment |
| take_3 | **@suraj_sharma14** (Mar 28) | "*7 'Boring' Web3 Skills That Make You 10x More Hireable in 2026*" — directly maps to Raz's "be undeniable / hireable" thesis |

(I tried 3 X searches; one timed out. Two strong takes is enough — we don't need to overload the reel.)

---

## 6. Proposed faux.thinker v12.4 edit plan

faux.thinker red `#E91212` is the brand here, **NOT** basecamp gold. Basecamp gold lives only INSIDE the basecamp B-roll (where it belongs as the platform's own brand). Hard rule.

### 6.1 Beat sheet

| Beat | t (s) | Component | Payload |
|---|---|---|---|
| **Anime hook** | 0.0 – 3.0 | `anime_hook_clip` | Veo 3 Fast: dark workshop / hacker garage at night, an old LinkedIn-style profile card cracks down the middle in golden sparks; through the crack a glowing terminal monitor shows live commit logs streaming. Label: **"LINKEDIN ⤳ BASECAMP"** |
| DateTag | 0.0 – 3.0 | `date_tag` | "✦ APR 2026 · COHORT 1 OPENS" |
| Braam + light-leak seam | 0.0 + 2.85 | `sfx` × 2 | 0.28 volume |
| **Hero pill "BASECAMP · COHORT 1 LIVE"** | 3.2 – 7.0 | `date_tag` styled | red dot + white text, top-center |
| **Contradiction slam** | 5.0 – 8.0 | `emphasis_caption` (yPercent 66) | "STOP FIXING / YOUR LINKEDIN." |
| **Live basecamp B-roll #1** (head-pop) | 8.0 – 13.0 | `stacked_broll` w/ matted avatar | the live `home_scroll.mp4` plays behind, Raz's head pops over for the "ship in public" beat |
| **URL pill** | 9.0 – 14.0 | `url_pill` | `basecamp.apexaios.io` typewriter |
| **3-row factoid card** | 13.0 – 19.0 | `numbered_list` (centered, yPercent 56) | 1 STREAKS · 2 PEER REVIEWS · 3 VERIFIED COMMITS — header "ALL FEED YOUR BUILDER SCORE" |
| **Stat trio (live)** | 14.0 – 18.5 | `pill_stack` from-left | "2,847 BUILDERS · 12K+ MATCHES · 847 PLACED" — all numbers from the live page |
| **"FROM CHENNAI · NOT SF" pill** | 19.0 – 21.0 | `date_tag` style or `factoid_card` | small mono pill — credibility moment |
| **YES/NO comparison** | 21.0 – 31.5 | `emphasis_caption` (split into two sub-slams) | (a) "STUCK ON UPWORK? → THIS IS YOUR MOVE" (b) "ALREADY POSTING? → SKIP IT" |
| **THESIS slam** | 29.0 – 31.5 | `emphasis_caption` (yPercent 66) | "PICK ONE. / BE UNDENIABLE." |
| **X take #1 flash-cut** | 16.5 – 19.0 | `x_hot_take_flashcut` | @intenxe_ops "want sheep / pre-packaged" |
| **X take #2 flash-cut** | 27.5 – 30.0 | `x_hot_take_flashcut` | @suraj_sharma14 "10x more hireable in 2026" |
| **Cohort offer card** | 32.0 – 37.0 | `factoid_card` or new lockup | "COHORT 1 · APR → JUL · FREE FOR BUILDERS" with gold accent (component-internal, not brand-leak) |
| **Live basecamp B-roll #2** (head-pop) | 32.5 – 37.0 | `stacked_broll` | Cohort/score detail section of `home.png` behind, head-pop |
| **CTA card** | 37.0 – 41.4 | `comment_prompt_card` | username "faux.thinker" / header "DROP IT BELOW" / prompt "basecamp · github · your own audience" |
| Light-leak transitions | every cut | `overlay_video` | screen-blend `ll_1..ll_5` |
| Word captions | full duration | `word_captions` | bottom safe zone (yPercent 80), hidden during hero windows |

### 6.2 Audio / color (matches Vercel-breach + cohousy v2 preferences)

- **Music** — `music_bed_v6.mp3` at **0.10** (faux.thinker default)
- **SFX** — all events at **0.28** (your 25–30% range)
- **Outro** — **1.0 s fade-out** (audio + video)
- **Color grade** — same warm-highlight / teal-shadow + S-curve + vignette + unsharp LUT used on cohousy v2 and copilot-train

### 6.3 Assets to produce

1. **Hook clip** — 3 s Veo 3 Fast (LinkedIn card cracking → terminal commits flowing through, dark hacker garage)
2. **basecamp B-roll** — already captured: `public/basecamp/home.png` + `home_hero.png` + `home_scroll.mp4`
3. **X takes** — already captured: `take_2.png` + `take_3.png`
4. **Matted avatar sequence** — `matted_avatar_v7/mat_%04d.png` via the existing rembg pipeline
5. (No login needed — basecamp is fully public, X already authed)

### 6.4 Risks / open questions

- **"Cohort 1" vs "Cohort 0"** — your VO says "Cohort 1", the live page shows "Cohort 0 · Apr–Jul 2026". I'll caption as **"COHORT 1"** (your VO wins) but if there's a discrepancy you want me to flag, tell me which one is canonical.
- **Anti-LinkedIn framing** — your hook is "stop fixing your LinkedIn" which is provocative but not specific to LinkedIn-the-company. Safe.
- **Skip-it advice** — the "already posting publicly? skip it" line is genuinely useful to the audience and a smart retention hook (most reels just hype, this one filters). I'll keep it as a clean YES/NO comparison overlay.
- **Cohort gate timing** — "April to July" is exactly now → 3 months from now. Feels urgent. If you want to push the cohort opening even harder, I can fade in a counter ("APR · MAY · JUN · JUL — STARTS NOW") or keep it simple with the existing factoid.
