# Video 6 — Audit & Edit Breakdown

**Source:** `D:/video editor/Videos/vIDEO 6_1080p.mp4`
**Date scanned:** 2026-04-22
**Style target:** faux.thinker v12.4 (same kit used for the Vercel breach reel)

---

## 1. Technical profile

| Field | Value |
|---|---|
| Container / Codec | MP4 / H.264 NVENC, AAC LC |
| Duration | **42.28 s** |
| Resolution | 1080 × 1920 (9:16 vertical) |
| Framerate | 25 fps |
| Bitrate | 6.5 Mbps total |
| Audio | 48 kHz stereo |
| File size | 34.6 MB |
| Cuts / scenes | **1** — single continuous take, no overlays present |

**Observation:** 42 s is inside the faux.thinker sweet spot. No tightening needed.

---

## 2. Scene

Same setup as Video 5 + Vercel-breach reel: Raz in black hoodie, plant-wall + warm strip-light backdrop, medium-close eye-level framing. All 21 sampled frames are consistent. Clean canvas for overlays.

---

## 3. Transcript (whisper large-v3-turbo, CUDA)

Whisper dumped this as two dense blocks with VAD gaps. Re-beated by content for the edit:

| Beat | t (s) | Line |
|---|---|---|
| 1 HOOK | 0.0 – 4.8 | "24th April — GitHub starts training on every line of code you write" |
| 2 EXCEPT | 4.8 – 7.3 | "unless you flip one setting" |
| 3 SCOPE | 7.3 – 11.6 | "if you use Copilot Free, Pro, or Pro+" |
| 4 BLAST RADIUS | 11.6 – 16.2 | "client work, side projects, private repos — all of it" |
| 5 TELL | 16.2 – 20.2 | "here's a tell: Business and Enterprise users are exempt" |
| 6 CLASS LINE | 20.2 – 24.8 | "Microsoft's only training on people who can't afford lawyers" |
| 7 FIX SETUP | 24.8 – 27.0 | "fix it in 30 seconds" |
| 8 URL + STEP | 27.0 – 29.9 | "github.com/settings/copilot → disable the AI model training toggle. Done." |
| 9 PROOF (effort) | 29.9 – 33.2 | "I check every tool like this. Run the agency solo." |
| 10 STAKES | 33.2 – 36.2 | "One leaked client repo — it's over." |
| 11 CTA | 36.2 – 39.0 | "Comment 'opt out' — I'll DM the steps." |
| 12 KICKER | 39.0 – 42.0 | "Opting out or handing it over." |

(word-level timestamps live in `transcript.json` for the WordCaptions timing.)

---

## 4. Real-time news verified (today, 2026-04-22)

Every claim in the script checks out against authoritative sources:

| Fact | Source |
|---|---|
| Policy change announced Mar 25 2026, effective **Apr 24 2026** | [GitHub Changelog — Mar 25 2026](https://github.blog/changelog/2026-03-25-updates-to-our-privacy-statement-and-terms-of-service-how-we-use-your-data/) |
| Affects Copilot **Free / Pro / Pro+**; **Business + Enterprise exempt** | [GitHub Blog — Updates to interaction-data policy](https://github.blog/news-insights/company-news/updates-to-github-copilot-interaction-data-usage-policy/) |
| Model is **opt-out**, default = **training enabled** | [The Register — "We going to train on your data after all"](https://www.theregister.com/2026/03/26/github_ai_training_policy_changes/) |
| Exact fix path: `github.com/settings/copilot` → disable "Allow GitHub to use my data for AI model training" under Privacy | [GitHub Docs — Managing Copilot policies as individual subscriber](https://docs.github.com/copilot/how-tos/manage-your-account/managing-copilot-policies-as-an-individual-subscriber) |
| Interaction data includes inputs, outputs, code snippets, cursor context, comments, file names, repo structure, navigation patterns | [GitHub Privacy FAQ discussion #188488](https://github.com/orgs/community/discussions/188488) |
| Class framing ("only training on people who can't afford lawyers") mirrors the HN/community reaction — B/E exemption is the big trust break | [Hacker News thread — top reactions](https://news.ycombinator.com/item?id=47548243) |
| Dev migration chatter: Forgejo, Gitea, GitLab, Sourcehut, self-hosted | HN thread (same) |

---

## 5. Proposed faux.thinker v12.4 edit plan

Same structural spine as the Vercel breach reel — this one is the bigger cousin since the policy affects **every independent dev using Copilot Pro**.

### 5.1 Beat sheet

| Beat | t (s) | Component | Payload |
|---|---|---|---|
| **Anime hook** | 0.0 – 3.0 | `anime_hook_clip` | Veo 3 Fast: dark server room, giant GitHub Octocat silhouette, golden code-lines streaming OUT of a Copilot-branded laptop toward an ominous black AI brain. Label: "YOUR CODE IS THE MODEL NOW" |
| DateTag | 0.0 – 3.0 | `date_tag` | "✦ APR 24, 2026 · COPILOT TRAINS ON YOU" |
| Braam + light-leak seam | 0.0 + 2.85 | `sfx` × 2 | braam (0.30), shutter (0.30) |
| Pill "COPILOT · POLICY LIVE" | 3.2 – 7.5 | `date_tag` style hero pill | top-center red-on-black |
| **Contradiction slam** | 5.2 – 8.0 | `emphasis_caption` (yPercent 66) | "OPT-IN? / NO — OPT-OUT." |
| **GitHub blog B-roll** | 8.0 – 13.0 | `anthropic_page_scroll` (reuse) | Screenshot of github.blog changelog, cursor lands on "effective April 24, 2026" |
| URL pill (proof) | 10.0 – 15.5 | `url_pill` | `github.com/settings/copilot` typewriter |
| **Scope factoid** | 13.0 – 17.0 | `factoid_card` | "Free · Pro · Pro+ — including PRIVATE repos" |
| **Head-pop B-roll #1** | 16.0 – 20.2 | `stacked_broll` w/ matted avatar | GitHub settings page behind, Raz's head pops over — for the "tell" beat |
| **Class-line slam** | 20.2 – 24.5 | `emphasis_caption` (yPercent 66) | "BUSINESS & ENTERPRISE / EXEMPT." |
| **Receipt toast** (the tell) | 22.0 – 26.0 | `dm_toast` styled as GitHub notice | "Business: training disabled · Free/Pro/Pro+: enabled" |
| **3-step list** | 27.0 – 31.5 | `numbered_list` (centered, yPercent 62) | 1 Go to github.com/settings/copilot 2 Privacy → turn OFF "AI model training" 3 Save |
| **Mini UI mock** | 28.0 – 31.5 | rendered component (new or img) | Fake GitHub toggle snapping from ON (green) → OFF (grey) |
| **Effort receipt** | 32.0 – 35.0 | `factoid_card` | "6 TOOLS AUDITED THIS WEEK" |
| **Stakes slam** | 34.0 – 36.2 | `emphasis_caption` (yPercent 66) | "ONE LEAKED REPO / = GAME OVER." |
| **X hot takes flash-cut** | 29.0 – 32.0 | `x_hot_take_flashcut` × 3 (real screenshots from Playwright) | 1 GitHub official "interaction data only" spin 2 A dev's "I didn't get to decide to participate" quote 3 A Forgejo migration post |
| **Ticker strip** (bottom) | 3.5 – 38.0 | `pill_stack` or new news_ticker | "THE REGISTER · HN · 1.2K UPVOTES · FORGEJO · GITLAB · APR 24 ENABLED BY DEFAULT" |
| **CTA card** | 37.0 – 42.0 | `comment_prompt_card` | "Comment 'opt out' — DM-gated checklist" |

### 5.2 Audio/color

- SFX at **0.30** (same spec as cohousy v2 — your preference)
- **No fade-out** at tail (cut cleanly on kicker)
- Color grade: same **warm-highlight / teal-shadow + S-curve + vignette + unsharp** LUT that shipped on cohousy v2

### 5.3 Assets to produce

1. **Hook clip** — 3 s Veo 3 Fast (Octocat server room + code-stream into AI brain, orange/red/black, cinematic comic look to match Canva RIP + Vercel Bleeds style)
2. **GitHub blog + settings screenshots** — captured via Playwright (your persistent profile is already logged in)
3. **3 X takes** — GitHub-official defense, a dev's anger quote, a migration post
4. **Matted avatar sequence** — `matted_avatar_v6/mat_%04d.png` via the existing rembg pipeline
5. **Optional** — a 2-3 s B-roll of the real toggle flipping, captured in your browser

### 5.4 Risks / open questions

- **Legal nuance** — GitHub's line is "we don't train on private repo data at rest, only interaction data." Raz's line glosses this, which is fine for punchy takes but could invite pushback. I can stamp a small `factoid_card` calling that out ("*technically: 'interaction data' only — but that includes cursor context from private repos*") if you want to preempt the comments.
- **Apr 24 is two days away** — this is genuinely timely content with strong share-ability. Posting speed matters.
- The `class-line` ("people who can't afford lawyers") is provocative. I'll keep it in the VO (don't touch the source audio) but we can choose whether to echo it as an on-screen caption or soften to "Enterprise gets opt-in · everyone else gets opt-out."
