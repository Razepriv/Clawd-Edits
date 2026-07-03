# Setup — the faux.thinker stack on any system

Three steps. Windows / macOS / Linux — same commands, just adjust paths.

**Requires:** [Node.js 20+](https://nodejs.org), [Python 3.12](https://www.python.org/downloads/), [Git](https://git-scm.com/downloads). Nothing else — FFmpeg comes bundled via `imageio-ffmpeg`, and Playwright installs its own Chromium.

---

## Step 1 — Clone + install

```bash
# Clone
git clone https://github.com/Razepriv/Clawd-Edits.git
cd Clawd-Edits

# Remotion + node deps
cd remotion-studio && npm install && cd ..

# Python deps
python -m pip install --user faster-whisper playwright requests python-dotenv \
    pillow rembg[cpu] onnxruntime numpy imageio-ffmpeg gtts

# Playwright browser (Chromium only — enough for scraping)
python -m playwright install chromium
```

Ship time: ~5 minutes on a fresh box.

---

## Step 2 — Fill in `.env`

```bash
cp .env.example .env
# Then edit .env in your editor
```

Minimum keys for a *complete* reel:

| Key | Where to get it | What it powers |
|---|---|---|
| `GOOGLE_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Veo 3 hook clips (`scripts/veo.py`) |
| `HIGGSFIELD_API_KEY_ID` + `_SECRET` | [cloud.higgsfield.ai → API Management](https://cloud.higgsfield.ai) | Flux, DoP, Veo 3, Kling, Seedance B-rolls (`scripts/higgsfield.py`) |
| `ELEVENLABS_API_KEY` | [elevenlabs.io/app/settings/api-keys](https://elevenlabs.io) | Music + SFX generation |
| `TELEGRAM_BOT_TOKEN` | `@BotFather` on Telegram → `/newbot` | Delivering the finished reel to your phone |

Then run one-time Playwright profile login (X / GitHub / any site you want to scrape as authed):

```bash
python scripts/launch_profile.py
# Chromium opens → sign into x.com etc → close the window (cookies persist)
```

And register the Telegram bot as its owner:

```bash
python scripts/telegram_agent.py
# In Telegram, DM the bot with /start — you become the OWNER
```

---

## Step 3 — Ship your first reel

Drop your a-roll into `Videos/`, then run the pipeline:

```bash
# 1. Transcribe (English or Hindi — auto-detect)
python scripts/transcribe.py "Videos/MyVideo.mp4"

# 2. Matte the avatar for head-pop-out (~5-10 min on GPU, longer on CPU)
python scripts/matte_avatar_v5.py     # copy + rename for your video

# 3. Generate hook + B-rolls (Higgsfield / Veo — 3-8 min per clip)
python scripts/higgsfield.py broll \
    --model veo-3-fast \
    --prompt "your visual prompt" \
    --motion "cinematic dolly in" \
    --out "remotion-studio/public/higgsfield_brolls/hook.mp4"

# 4. Write the spec (copy an existing one as a template)
#    e.g. remotion-studio/src/styles/devin1/basecampSpec.ts
#    Register it in remotion-studio/src/Root.tsx

# 5. Render (4 chunks to keep memory low on Windows)
cd remotion-studio
TMPDIR=D:/remotion-temp TMP=D:/remotion-temp TEMP=D:/remotion-temp \
    npx remotion render <YourComposition> ../outputs/myreel_pA1.mp4 \
    --codec h264 --crf 18 --concurrency 1 --frames 0-260
# repeat for A2/B/C, then concat + grade + fade via FFmpeg
# (see the final "concat + LUT + fade" block in any prior reel commit)

# 6. Send to Telegram
python scripts/telegram_agent.py --send-latest \
    --path "outputs/myreel_final.mp4"
```

That's it. First reel ships in ~2 hours end-to-end; subsequent reels ~30 minutes once you copy an existing spec.

---

### Where the style lives

- **Brand tokens:** `remotion-studio/src/brand/tokens.ts` (`FAUX_THINKER`) and `remotion-studio/src/brand/cohousy.ts` (client brand — never mixed).
- **35 motion-graphic components:** `remotion-studio/src/styles/devin1/components/` (EmphasisCaption, StatSlam, LandscapeSplitFrame, PillTag, URLPill, NumberedList, QuestionCaption, DateTag, etc.)
- **Every reel is a `*Spec.ts` file** in `remotion-studio/src/styles/devin1/` — copy `basecampSpec.ts` or `claudeBlackmailSpec.ts` as a starting template.
- **The dispatcher** that turns spec events into React components: `remotion-studio/src/styles/devin1/Apply.tsx`.

### Windows-specific note

If your C: drive is tight on space, always set `TMPDIR=D:/remotion-temp` (or wherever) before `npx remotion render` — Remotion copies the entire `public/` folder to a temp dir per render and can blow past 20 GB on C:.

### Rotate anything exposed

If any API key ever gets pasted in a Claude chat, rotate it at the provider. `.env` and `.playwright-profile/` are gitignored and should never leave the machine.
