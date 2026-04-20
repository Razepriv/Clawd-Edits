# Video 5 — Audit & Edit Breakdown

**Source:** `D:/video editor/Videos/Video 5.mp4`
**Date scanned:** 2026-04-20
**Style target:** faux.thinker v12.4 (Canva pipeline spec — anime hook → a-roll → overlays → CTA)

---

## 1. Technical profile

| Field | Value |
|---|---|
| Container / Codec | MP4 / H.264 (NVENC), AAC LC |
| Duration | **49.44 s** |
| Resolution | 1080 × 1920 (9:16 vertical) |
| Framerate | 25 fps |
| Bitrate (V/A) | 6.7 Mbps video / 128 kbps audio |
| Audio | 48 kHz stereo |
| File size | 42.4 MB |
| Encoder | `Lavf59.27.100` (likely OBS / mobile capture) |
| Cuts / scenes | **1** — single continuous take, no edits, no overlays present |

**Observation:** 49 s is ~10–15 s over the faux.thinker sweet spot for Reels/Shorts (35–40 s). Retention curves drop off after 45 s for this format. We should consider tightening.

---

## 2. Scene breakdown (a-roll only)

Same framing throughout: medium-close, eye-level, black hoodie, plant-wall + warm strip-light backdrop, natural gesture cadence. No B-roll, no on-screen text, no lower thirds, no music.

Frames sampled every 2 s (25 total) — all show consistent lighting, stable framing, no zoom, no cuts. Clean canvas for overlays.

---

## 3. Transcript (whisper small.en, VAD-filtered, word timestamps in `transcript.json`)

| # | t_start | t_end | Line | Beat function |
|---|---|---|---|---|
| 1 | 0.00 | 1.36 | "Vercel just got breached." | **HOOK** |
| 2 | 1.84 | 3.64 | "If you deploy there, pay attention." | Direct address |
| 3 | 4.08 | 5.98 | "Everyone is saying, rotate your keys." | Conventional wisdom setup |
| 4 | 6.54 | 7.80 | "That is not the real story." | **CONTRADICTION** |
| 5 | 8.40 | 10.48 | "The attacker did not break into Vercel." | Correction |
| 6 | 10.86 | 14.16 | "They broke into an AI tool a Vercel employee was using." | **REAL MECHANISM** |
| 7 | 14.90 | 17.06 | "That tool had Google Workspace access." | Pivot / stakes |
| 8 | 17.78 | 22.98 | "Now think, how many random AI tools are still connected to your own Google account?" | **AUDIENCE TURN** (direct Q) |
| 9 | 23.72 | 27.36 | "Every shiny app you tested last month, still authorized." | Reframe |
| 10 | 27.88 | 29.58 | "That is your attack surface." | **THESIS** |
| 11 | 30.08 | 31.10 | "Three things today." | List gate |
| 12 | 31.64 | 35.62 | "One — revoke every AI app you do not use from Google permissions." | Action 1 |
| 13 | 36.18 | 40.24 | "Two — your API keys on Vercel are not encrypted by default. Mark them sensitive." | Action 2 |
| 14 | 40.70 | 41.60 | "Mark them sensitive." | Emphasis repeat |
| 15 | 42.22 | 44.32 | "Three — rotate the exposed ones." | Action 3 |
| 16 | 44.78 | 46.86 | "I have been auditing my whole stack this morning." | Proof of effort |
| 17 | 47.36 | 49.12 | "Comment 'audit' for my full checklist." | **CTA** |

Whisper mis-hears "Vercel" → "Versal" — we'll caption it correctly.

---

## 4. Real-time news verified (today, 2026-04-20)

This is a **genuine, breaking** incident. Every claim in Raz's script checks out against official + press sources pulled this morning:

| Fact | Source |
|---|---|
| Incident disclosed Apr 19 2026 11:04 PST; updated Apr 19 6:01 PM PST | [Vercel KB bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) |
| Compromise via **Context.ai**, a third-party AI Office Suite used by an employee on enterprise account | [The Hacker News](https://thehackernews.com/2026/04/vercel-breach-tied-to-context-ai-hack.html) |
| Employee granted **"Allow All"** OAuth to Google Workspace | [Hacker News article above] |
| Attack chain: Context.ai employee → Lumma Stealer (Feb 2026, via game-exploit download) → browser creds + OAuth tokens → Vercel Workspace | [Security Boulevard](https://securityboulevard.com/2026/04/vercel-data-breach-linked-to-earlier-context-ai-compromise/) |
| IOC — OAuth App Client ID `110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com` | [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/) |
| Env vars marked **"sensitive"** NOT accessed; non-sensitive ones were | [Vercel KB bulletin] |
| Threat actor demanded **$2 M** on Telegram, claims 580 employee records + Linear + NPM/GitHub tokens, selling on BreachForums | [BleepingComputer] |
| Vercel engaged Mandiant (Google-owned) + law enforcement | [Help Net Security](https://www.helpnetsecurity.com/2026/04/20/vercel-breached/) |
| Crypto devs scrambling to lock API keys | [CoinDesk](https://www.coindesk.com/tech/2026/04/20/hack-at-vercel-sends-crypto-developers-scrambling-to-lock-down-api-keys) |
| CEO Guillermo Rauch: deployed "extensive protection measures and monitoring" + new sensitive-env-var UI | [The Register](https://www.theregister.com/2026/04/20/vercel_context_ai_security_incident/) |

---

## 5. Proposed faux.thinker v12.4 edit plan

### 5.1 Structural bones (mirrors Canva pipeline v2.4)

| Beat | t (s) | Component | Payload |
|---|---|---|---|
| **Anime hook clip** | 0.0 – 3.0 | `anime_hook_clip` | Veo 3 Fast render: dark server room, Vercel triangle logo on a monitor cracks open, OAuth-token chain explodes out → Google logo shatters. Label: "VERCEL IS BLEEDING" |
| DateTag | 0.0 – 3.0 | `date_tag` | "✦ APR 20, 2026 · VERCEL × CONTEXT.AI BREACH" |
| SFX braam | 0.0 | `sfx` | `no_fluff_braam.mp3` |
| Light-leak transition | 2.85 – 3.45 | `overlay_video` | `ll_1.mp4` screen-blend to avatar |
| **A-roll starts** | 3.0 | raw video | (hoodie shot) |
| Pill tag "VERCEL BREACH · LIVE" | 3.5 – 7.0 | `pill_tag` | red dot + white text |
| **Contradiction card** | 5.5 – 9.0 | `emphasis_caption` | "ROTATE YOUR KEYS? → NOT THE REAL STORY" with strike-through on first clause |
| **URL pill** (proof) | 9.0 – 14.0 | `url_pill` | `vercel.com/kb/bulletin/vercel-april-2026-security-incident` |
| **Factoid card** (root cause) | 11.0 – 16.0 | `factoid_card` | "CONTEXT.AI — AI Office Suite · Employee granted 'Allow All' OAuth" |
| **Google Workspace badge pop** | 15.0 – 18.0 | `app_icon_float` | GWS logo slides in, turns red |
| **Question caption** | 18.0 – 23.0 | `question_caption` | "HOW MANY AI TOOLS CAN STILL READ YOUR GMAIL?" centered, below face |
| **DM toast** (receipt) | 23.5 – 27.5 | `dm_toast` | Fake Google account permissions toast: "127 apps have access to your account. 83 unused." |
| **Thesis stamp** | 27.5 – 30.0 | `emphasis_caption` | "THIS IS YOUR ATTACK SURFACE." red stamp |
| **Numbered list reveal** | 30.0 – 31.2 | `numbered_list_intro` | "3 THINGS TO DO RIGHT NOW" |
| Step 1 card | 31.5 – 36.0 | `numbered_list` (`step: 1`) | "REVOKE UNUSED AI APPS → myaccount.google.com/permissions" |
| Step 2 card | 36.0 – 42.0 | `numbered_list` (`step: 2`) | "MARK VERCEL ENV VARS AS SENSITIVE" + mini UI mock of Vercel env var toggle |
| Step 3 card | 42.0 – 44.8 | `numbered_list` (`step: 3`) | "ROTATE EXPOSED KEYS (NPM, GITHUB, STRIPE)" |
| **Factoid — IOC** | 40.0 – 44.0 | `factoid_card` (small) | "IOC: Google OAuth Client ID ending `…7bbvqj`" mono-spaced |
| **Proof screen — Vercel KB** | 16.0 – 20.0 *parallel* | `platform_recording` (Ken-Burns) | Live screen recording of `vercel.com/kb/…` bulletin, pan-zoom |
| **Proof — X take** | 24.0 – 28.0 | `x_take` | Guillermo Rauch's Vercel post / an infosec reporter breaking the story |
| **Ticker strip (bottom)** | 3.0 – 47.0 | `news_ticker` (new component) | Rolling: "BLEEPINGCOMPUTER · $2M RANSOM DEMAND · 580 EMPLOYEE RECORDS CLAIMED · LUMMA STEALER · MANDIANT ENGAGED" |
| **CTA card** | 46.0 – 49.4 | `cta_card` | "COMMENT 'AUDIT' ↓" large + subtle arrow pulse |
| Fade-out | 48.5 – 49.4 | — | 0.9 s audio + video fade |

### 5.2 Audio

- Loudnorm `I=-16 TP=-1.5 LRA=11`
- Subtle typewriter SFX on each numbered list reveal
- Shutter SFX at 2.83 s (hook → a-roll seam)
- Low sub-drone bed (−18 LUFS under VO) from 3.0 – 46.0 s
- CTA riser lifts last 3 s

### 5.3 New component shopping list (if we don't already have them)

- `news_ticker` — horizontal marquee, dark red background, single-line
- `google_permissions_toast` — variant of `dm_toast` styled like Google's security notice
- Optionally: `vercel_env_mock` — mini UI that toggles "Sensitive" on

Everything else (`anime_hook_clip`, `pill_tag`, `url_pill`, `emphasis_caption`, `factoid_card`, `app_icon_float`, `numbered_list`, `x_take`, `platform_recording`, `cta_card`, `date_tag`) already exists in the v2.4 spec kit.

### 5.4 Assets we need to produce

1. **Hook clip** — 3.0 s Veo 3 Fast: server room, Vercel triangle logo breaches open, OAuth chain explodes, Google logo cracks. (parallel to Canva tombstone hook)
2. **Vercel KB screen recording** — Playwright capture of `vercel.com/kb/bulletin/vercel-april-2026-security-incident`, then ffmpeg pan-zoom crop like we did for Canva
3. **Guillermo Rauch / infosec reporter X take** — screenshot via Playwright persistent profile
4. **Google account permissions screenshot** — `myaccount.google.com/permissions` (real user's screen, optional — or mocked)
5. **Vercel sensitive env var UI screenshot** — from Vercel dashboard
6. **SFX** — we already have `no_fluff_braam.mp3`, `shutter.mp3`; need `typewriter_tick.mp3`, `sub_drone.mp3`, `cta_riser.mp3` (ElevenLabs SFX)
7. **Comic-style anime hook label** — "VERCEL IS BLEEDING" pill overlay on top of hook

### 5.5 Risks / open questions

- 49 s > 40 s ideal — do we trim the "mark them sensitive" repeat (line 14)?
- Script says "not encrypted by default" — Vercel's own KB nuance is "not stored in a sensitive manner unless marked". That's technically correct but worth a factoid stamp so audience understands the distinction.
- Legal tone — we're naming a specific company and a specific attack live the same day. Script stays factual, sourced, and recommends defensive actions only. No accusations beyond what's in Vercel's own bulletin.
