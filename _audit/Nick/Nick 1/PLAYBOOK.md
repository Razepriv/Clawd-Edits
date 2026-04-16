# Nick 1 — Replication Playbook

**Source:** `D:/video editor/Styles/Nick/Nick 1.mp4`
**Duration:** 44.84 s · **Resolution:** 720 × 1280 · **FPS:** 23.97 · **Aspect:** 9:16
**Cut density:** 12 scene cuts / 45 s ≈ **one every 3.7 s** (highest of any style audited so far)
**Narrative:** Claude Code Skills library announcement + 3-step install walkthrough + CTA
**Tone:** Fast, dense, minimalist, demo-heavy. No glitch. No emphasis slams. Submagic-style captions throughout.

---

## 1. Format & Layout Phases

Nick 1 is **not** a head-pop-out style. It's a classic *face-bookend, B-roll-body* reel with **three distinct layout modes**:

| Phase | Time | Mode | What's on screen |
|---|---|---|---|
| Opener | 0.00 – 1.42 s | Face close-up (100 %) | Just Nick, dead-center framing, no B-roll yet |
| Hook graphic | 1.42 – 4.17 s | **Split-screen** (B-roll top 50 % · face bottom 50 %) | SKILLS logo + red negation slash on top; Nick underneath |
| Body demo | 4.17 – 40.96 s | Full-bleed B-roll (100 %) | Screen captures fill the frame; face disappears entirely |
| CTA payoff | 40.96 – 44.84 s | Face close-up (100 %) | Return to Nick, tighter crop, caption style shifts to white-outline |

**Key insight:** the split-screen is used only **once**, as a visual setup for the SKILLS-logo reveal + the negation slash. As soon as the VO pivots from hook to explainer, Nick disappears and the B-roll takes the whole canvas. He only comes back for the final CTA.

This is the **opposite** of our faux.thinker canonical 3-layer head-pop-out, which keeps the subject visible throughout. Worth cataloguing as an alternate format option.

---

## 2. A-Roll — Setup Spec

| Element | Spec |
|---|---|
| **Backdrop** | Plain white wall. Two black acoustic-foam panels (square, velvet-texture) on right side at roughly 20 % and 35 % of frame height. |
| **Subject framing** | Tight close-up — head fills roughly 60 % of frame height. Eyeline at ~35 % from top. |
| **Lighting** | Soft, flat, slightly cool-white key. No hair light. No practicals. Reads as ring-light + window. |
| **Wardrobe** | Black hoodie + black shirt underneath. No jewelry. No logos. |
| **Mic** | Shotgun mic with wind-muff visible from bottom center, pointing up at chin. Consistent visual anchor. |
| **Camera** | Fixed, no handheld wobble. No push-in. No rack focus. |
| **Audio characteristic** | Very clean treble, minimal room tone, suggests post-processed with noise-gate + soft compressor. |

Reference frame: `frames/f_0001.jpg` (opener) and `frames_scene/sc_012.jpg` (CTA).

---

## 3. Caption System

Nick uses **two caption styles**, switched by beat role:

### 3a. Body captions — Submagic dark-pill

- **Typeface:** Bold sans-serif (looks like Inter/Manrope Bold or Proxima Nova Black, weight 800+)
- **Color:** Pure white
- **Background:** Dark translucent rounded-rectangle pill (~`rgba(40,40,40,0.85)`), corner radius ~18 px
- **Padding:** ~12 px horizontal · ~6 px vertical
- **Words per chunk:** 2–3
- **Position:**
  - In split-screen phase (1.4–4.2 s): directly under the split divider (≈ y = 45 % of frame)
  - In full-bleed B-roll phase (4.2–40.9 s): bottom-center (≈ y = 70 % of frame)
- **Duration per chunk:** matches word spoken timing — hard cut in / out, no fade
- **Cadence example:** `"If you're"` → `"using Claude"` → `"code"` → `"but not using"` → `"skills, you're"`

### 3b. CTA captions — White outline, no pill

- Same bold typeface, weight bumped a little larger
- **Color:** White
- **Outline:** Thin black outline (~2 px) — no fill pill
- **Position:** Bottom-center, over the face
- **Used from:** 41.04 s to end only
- **Cadence example:** `"So go try"` → `"Just comment"` → `"and I'll"`

**Replication tip:** Implement as a `SubmagicCaption` component with a `variant: "pill" | "outline"` prop. Submagic itself auto-generates these from a transcript — we can do the same by feeding the faster-whisper word-level JSON into a simple batcher that chunks on 2–3 word boundaries or commas.

---

## 4. B-Roll Inventory (in order)

| # | Time | Source / mock | What to capture |
|---|---|---|---|
| 1 | 1.42–4.17 | **SKILLS logo still** | Black canvas. White distressed/stencil block letters 'SKILLS'. Subtitle 'THE OPEN AGENT SKILLS ECOSYSTEM'. Subtle RGB-channel offset fringe. Use as-is or recreate in AE/Figma. |
| 2 | 4.17–6.63 | **macOS desktop screenshot** | Beige/sand Sequoia-like wallpaper + one ZIP file icon centered, filename `crabracadabra-brand-guidelines.zip` selected (blue label), cursor hovering. |
| 3 | 6.63–12.43 | **Claude desktop app** | 'What's new, Mahesh?' heading + empty prompt input. Sonnet 4.5 chip bottom-left. Research toggle. Orange send arrow. Overlay a small **tool-call toast card** at ~11 s: `Checking for the Crabracadabra brand guidelines skill` with the red Skills icon. |
| 4 | 12.43–19.27 | **SKILLS home page** (skills.so or similar) | Top nav: ▲ logo, Skills (active), Official (NEW pill), Audits, Docs. Hero: the same SKILLS lockup + blurb 'Skills are reusable capabilities for AI agents…'. 'TRY IT NOW' section with `$ npx skills find <query>` chip. 'AVAILABLE FOR THESE AGENTS' icon row (Claude, Ghost, monk-head, box). 'SKILLS LEADERBOARD' list below. **Animate a subtle scroll-down Ken-Burns through the leaderboard.** |
| 5 | 19.27–22.77 | **Terminal running Claude Code with skills** | Dark terminal. Claude Code splash + `/skills` panel open. Two-column layout (skill list on left, settings on right). Slight zoom-in animation. |
| 6 | 22.77–24.53 | **Skill-card pill** (`frontend-design`) | White background. Centered-top: dark rounded-rect card showing `skills / anthropics / skills / frontend-design` breadcrumb + big `frontend-design` title + copy-command chip `$ npx skills add https://github.com/…` + copy icon. |
| 7 | 24.53–26.74 | **Skill-card pill** (`ai-seo`) | Same template, swap to `skills / coreyhaines31 / marketingskills / ai-seo`. |
| 8 | 26.74–33.87 | **Windows Terminal with agent picker** | Dark terminal window titled 'Administrator: Cmd'. Green-bullet list of primary agents (Antigravity, Cline, Codex, Cursor, Deep Agents, Firebender, Gemini CLI, GitHub Copilot, Kimi Code CLI, OpenCode, Warp). 'Additional agents' separator. Search input with cursor. Radio list (Augment, IBM Bob, Claude Code, OpenClaw, CodeBuddy, Command Code, Continue, Cortex Code + '↓ 23 more'). Footer: `Selected: Amp, Antigravity, Cline +9 more`. **Animate selection pulses** on Antigravity → Codex → Claude Code underline → iFlow CLI underline, timed to VO mentions. |
| 9 | 33.87–36.25 | **apify-ultimate-scraper detail page** | Same SKILLS site, detail view. Breadcrumb. Title. Copy command. SUMMARY paragraph. **Animate a hand-cursor icon drifting up to tap the copy button.** |
| 10 | 36.25–40.96 | **Windows Command Prompt (empty)** | Fresh `C:\Users\shahb>` prompt. Microsoft Windows banner. Blinking cursor. Hand-cursor icon mid-frame. |

**All transitions are hard cuts.** The only exception is a 1–2 frame white flash at 40.96 s between the CMD window and the face close-up.

---

## 5. The Red-Slash Negation Graphic (signature moment)

At 1.9–3.8 s, while the SKILLS logo sits in the top half of the split-screen, a **red diagonal slash** draws itself across the logo (upper-right → lower-left), visually meaning *"NOT using skills"*.

| Parameter | Value |
|---|---|
| Color | `#E1251C` (crimson) |
| Angle | ≈ 60° (upper-right to lower-left) |
| Stroke width | ~22 px at render resolution |
| Animation | SVG `stroke-dashoffset` draw-on, ~400 ms duration, ease-out |
| Trigger timing | Draw-on starts ~200 ms before the word "not" lands, completes on "skills" |
| Endpoint holds | Stays visible through end of split-screen (to 4.17 s), then hard-cut gone |

**Why it works:** it's the single red element in an otherwise black-and-white video. Instant eye-draw, visually reinforces the negation, disappears fast enough not to feel gimmicky.

Easy to implement as a Remotion component using `interpolate` on `strokeDashoffset` of a single `<line>` inside an SVG overlay.

---

## 6. Timing Heuristics

| Heuristic | Value |
|---|---|
| Average shot length | 3.74 s |
| Shortest shot | 1.76 s (`frontend-design` card, beat 6) |
| Longest shot | 7.13 s (`SKILLS home page`, beat 4 — accommodates the Ken-Burns scroll) |
| Face-time ratio | ≈ 12 % (5.2 s face ÷ 44.8 s total) |
| B-roll ratio | ≈ 82 % (36.8 s full-bleed screenshots) |
| Split-screen ratio | ≈ 6 % (2.8 s) |
| Caption coverage | ~95 % of runtime has a caption |

Compared to Devin 1 (face-time ~48 %, emphasis captions only on narrative pivots), Nick is a **"B-roll-first" format** with face used only as a hook-and-CTA anchor.

---

## 7. Audio

- **Music bed:** subtle driving electronic/lo-fi, continuous through entire video, low ducked under VO.
- **Estimated BPM:** 90–100 (not confirmed; would need beat detection).
- **Hard cuts land on off-beat** (no musical sync to cuts), which is fine because music is so backgrounded it's not carrying rhythm.
- **No SFX** — no swooshes, no clicks on cuts, no typing sounds on terminals. Very minimal.
- **VO characteristic:** compressed, de-essed, slight brightening EQ on top end; consistent loudness throughout.

To replicate: pick a chill lo-fi or driving-electronic instrumental at ~95 BPM, duck to about -18 dB under VO, and **do not add transition SFX.**

---

## 8. How to Replicate for faux.thinker

If we want a "Nick-style" variant for an @faux.thinker reel:

1. **Shoot Razeen face close-up** against a plain white wall with dark acoustic panels — easy to fake with a clean matte background replacement. Lock wide enough to fit mic bottom-center.
2. **Write script to match this arc:** hook (2 s) → claim (3 s) → proof (7 s) → 5–6 demo cuts (3–4 s each) → CTA (4 s). Total ~45 s.
3. **Shoot ONLY the hook and CTA as a-roll.** Everything in the middle is full-bleed B-roll.
4. **Use the skill-card pill pattern** — it's a clean reusable template for mentioning any tool (n8n, Claude, Cursor, Remotion, etc.) — title + breadcrumb + copy-command chip on white.
5. **Use Submagic dark-pill captions for the body, white-outline for the CTA.**
6. **Pick one single-color accent** (for us: brand-red `#E91212`) and deploy it once, as a negation or highlight graphic at the hook. Do not use the accent again.
7. **Zero transition SFX. Hard cuts only.** Maybe one 2-frame white flash as the hook-to-body transition or body-to-CTA transition.
8. **B-roll capture rig:**
   - Playwright/Chromium screenshots of the target UIs
   - Canvas size 720 × 1280 with app zoomed to 1.5–1.8x so type reads at Reel scale
   - Export as PNG or PNG sequence if any in-screen animation is needed (e.g., selection pulses, scroll Ken-Burns)
9. **Ken-Burns every static B-roll slightly.** Even a 2 % scale-up over the shot duration keeps the eye engaged.

---

## 9. Contrast Summary vs. Devin Styles

| Attribute | Devin 1 | Devin 2 | **Nick 1** |
|---|---|---|---|
| Duration | 69 s | 74 s | **45 s** |
| Cut density | 1/8 s | 1/10 s | **1/3.7 s** |
| Face ratio | ~48 % | ~35 % | **~12 %** |
| Transition style | Ghost/RGB glitch | Ghost + flash-cut | **Hard cut only + 1 white flash** |
| Caption philosophy | Narrative-pivot emphasis slams | Narrative-pivot emphasis slams | **Submagic word-by-word (dense)** |
| Accent color usage | Pink-magenta gradient ×3 | Flat red `#E91212` ×1 | **Red `#E1251C` ×1 (slash only)** |
| Backdrop | Warm indoor + rooftop | Warm indoor + rooftop | **White minimalist indoor only** |
| Mic visible? | Sometimes | Sometimes | **Always (bottom-center anchor)** |
| Layout default | Face-dominant | Face + full-screen alternation | **B-roll dominant, face bookend** |
| SFX | Glitch swooshes, flash pops | Glitch swooshes, flash pops | **None** |

Nick 1 is the tightest, most information-dense of the three. It's the best reference for content that needs to show a lot of UI in very little time.

---

## 10. Open Items

- [ ] Beat-detection pass on the music bed to confirm BPM (would decide whether to sync a CTA caption "pop" to a downbeat).
- [ ] Capture the signature red-slash negation graphic as a reusable Remotion component (`<NegationSlash />`).
- [ ] Build a `SubmagicCaptionTrack` Remotion component that takes word-level whisper JSON and a `variant: 'pill' | 'outline'` prop and produces the exact visual treatment.
- [ ] Build a reusable `<SkillCardPill />` Remotion component (breadcrumb + title + copy-command chip on white) — valid for any tool we want to name-drop in future reels.
- [ ] Scrape SKILLS home page (skills.so) at 1.6x zoom into 720×1280 for future use.
