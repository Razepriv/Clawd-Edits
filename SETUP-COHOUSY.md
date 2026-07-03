# Setup + edit — cohousy reels on any system

This is the cohousy-specific companion to [`SETUP.md`](SETUP.md). Same repo, different brand + Hindi transcription + purpose-built components.

**Never mix cohousy with faux.thinker.** They live in isolated folders and use different brand tokens.
- faux.thinker → black canvas + red `#E91212` accent
- cohousy → warm-ink canvas + orange `#FF8002` accent

---

## Prerequisites — one-time, per machine

Do [`SETUP.md`](SETUP.md) first (Node 20+, Python 3.12, Git, `npm install` in `remotion-studio/`, Python deps, Playwright Chromium). Then the cohousy pipeline just needs:

- `HIGGSFIELD_API_KEY_ID` + `HIGGSFIELD_API_KEY_SECRET` in `.env` (for hook clips + B-rolls)
- `TELEGRAM_BOT_TOKEN` in `.env` (for delivery)
- The `Tiro Devanagari Hindi` font is loaded via Google Fonts inside the components — no separate install.

CUDA is *optional*. `scripts/transcribe.py` auto-falls-back to CPU if no NVIDIA card is present. On CPU expect ~2× realtime for Hindi; on a laptop RTX card ~10× realtime.

---

## Step-by-step: ship a new cohousy reel

### 1. Drop the source video into `Videos/`

```
D:/video editor/Videos/santhosh_new_pitch.mp4
```

Shot in portrait 1080×1920 at 25/30/60 fps, HEVC or H.264. Any iPhone / decent camera works.

### 2. Normalise (only if not already 1080×1920 @ 25 fps H.264 SDR)

If the source is HEVC 10-bit HDR (iPhone) or a wildly different framerate, first run the tone-map + downsample. Copy the block from `_audit/Video 8/BREAKDOWN.md` (the exact ffmpeg command with `zscale + tonemap=hable`) and adjust the input path. This is one command — 30 seconds on any system.

Skip if the source is already 1080×1920, 25 fps, H.264, 8-bit stereo.

### 3. Copy into `public/cohousy/` with a version tag

```
remotion-studio/public/cohousy/avatar_cohousy_002.mp4
```

**Naming rule:** every new cohousy reel gets its own version (`_002`, `_003`, …). Never overwrite `_001`.

### 4. Transcribe in Hindi

```bash
python scripts/transcribe.py "Videos/santhosh_new_pitch.mp4" \
    --language hi \
    --initial-prompt "cohousy, फ्लॅट, कॉन्सेप्ट, प्रॉपर्टी मॅनेजमेंट, टेनंट, रेंट"
```

The output lands at `_audit/santhosh_new_pitch/transcript.{txt,json,srt}`. The `--initial-prompt` seeds cohousy-specific vocab so whisper spells "प्रॉपर्टी मॅनेजमेंट" correctly instead of "propa mennejmet".

### 5. Matte the avatar for head-pop-out

Copy the existing matting script and swap the input/output paths:

```bash
cp scripts/matte_avatar_cohousy_001.py scripts/matte_avatar_cohousy_002.py
```

Then edit those two path constants at the top:

```python
AVATAR = Path(r"D:/video editor/remotion-studio/public/cohousy/avatar_cohousy_002.mp4")
OUT    = Path(r"D:/video editor/remotion-studio/public/cohousy/matted_002")
```

⚠ **These paths are hard-coded and absolute.** On a non-Windows machine, change the drive prefix (e.g. `/Users/you/video-editor/…`). This is the only file with hard-coded paths in the cohousy pipeline.

Then run:

```bash
python scripts/matte_avatar_cohousy_002.py
```

~5–10 min on GPU, ~30 min on CPU. Writes `public/cohousy/matted_002/mat_%04d.png`.

### 6. (Optional) Generate a Veo/Kling/Seedance hook clip

If the reel opens with a Veo-style intro (like the `cohousy_keys_v1` hook in reel #001):

```bash
python scripts/higgsfield.py broll \
    --model veo-3-fast \
    --prompt "Aerial shot of a Pune high-rise apartment tower at golden hour, camera rising past balconies, warm sunlight, cinematic real-estate promo style" \
    --motion "Slow vertical rise past the apartment windows" \
    --aspect 9:16 \
    --out "remotion-studio/public/cohousy/hook/cohousy_hero_v2.mp4"
```

Higgsfield returns an MP4 in ~3–6 min. Skip this step if the reel opens directly on Santhosh.

### 7. Copy the existing spec as your template

```bash
cp remotion-studio/src/cohousy/cohousy001Spec.ts \
   remotion-studio/src/cohousy/cohousy002Spec.ts
```

Now open `cohousy002Spec.ts` and edit:

- **`avatarVideoSrc`** → `"cohousy/avatar_cohousy_002.mp4"`
- **`duration`** → your new video's length in seconds
- **`ALL_WORDS`** → paste the word-timestamps from `transcript.json` (Hindi Devanagari)
- **`HIDDEN_WINDOWS`** → the [start, end] second-pairs where hero components own the visual (so word captions don't clash with them)
- **All `events[]`** — timings, copy, promise-list rows, big-stat numbers, comparison-box copy, CTA text
- **Any `stacked_broll` events** → point `mattedPatternPath` to `"matted_002/mat_%04d.png"`
- **Export name** → `COHOUSY_002_SPEC`

### 8. Register the new composition in `Root.tsx`

Open `remotion-studio/src/Root.tsx` and add:

```tsx
import { COHOUSY_002_SPEC } from "./cohousy/cohousy002Spec";

// …inside <>…</>:
<Composition
  id="Cohousy-002"
  component={Devin1Apply}
  fps={25}
  width={1080}
  height={1920}
  defaultProps={COHOUSY_002_SPEC}
  calculateMetadata={({ props }) => ({
    durationInFrames: Math.round(props.duration * 25),
  })}
/>
```

### 9. Sanity-check with stills before rendering

```bash
cd remotion-studio
TMPDIR=D:/remotion-temp npx remotion still Cohousy-002 \
    ../_audit/cohousy_002_sanity.png --frame=150
```

Open the PNG. Verify:
- Face is fully visible (never covered by text)
- Text sits below the chin, safely inside the 1080 × 1920 canvas
- Orange is the ONLY accent — no red bleeds in from faux.thinker

If any of that fails, adjust `yPercent` on the offending event before rendering the full reel.

### 10. Render in 4 chunks

40-second reel → total frames = 40 × 25 = 1000. Split into chunks so Windows doesn't OOM the compositor:

```bash
cd remotion-studio
TMPDIR=D:/remotion-temp npx remotion render Cohousy-002 \
    ../outputs/cohousy002_pA1.mp4 \
    --codec h264 --crf 18 --concurrency 1 --frames 0-249

TMPDIR=D:/remotion-temp npx remotion render Cohousy-002 \
    ../outputs/cohousy002_pA2.mp4 \
    --codec h264 --crf 18 --concurrency 1 --frames 250-499

TMPDIR=D:/remotion-temp npx remotion render Cohousy-002 \
    ../outputs/cohousy002_pB.mp4 \
    --codec h264 --crf 18 --concurrency 1 --frames 500-749

TMPDIR=D:/remotion-temp npx remotion render Cohousy-002 \
    ../outputs/cohousy002_pC.mp4 \
    --codec h264 --crf 18 --concurrency 1 --frames 750-999
```

`--concurrency 1` avoids GPU/RAM contention. Each chunk is ~2–3 minutes on RTX 3050, ~5 min on CPU.

### 11. Concat + colour grade + fade

Create `outputs/cohousy002_concat.txt`:

```
file 'cohousy002_pA1.mp4'
file 'cohousy002_pA2.mp4'
file 'cohousy002_pB.mp4'
file 'cohousy002_pC.mp4'
```

Then:

```bash
cd outputs
ffmpeg -y -f concat -safe 0 -i cohousy002_concat.txt -c copy cohousy002_raw.mp4

ffmpeg -y -i cohousy002_raw.mp4 \
  -vf "curves=r='0/0 0.30/0.34 0.70/0.74 1/1':g='0/0 0.30/0.31 0.70/0.69 1/0.98':b='0/0.03 0.30/0.33 0.70/0.67 1/0.94',eq=saturation=1.10:contrast=1.08:gamma=0.98,unsharp=5:5:0.55:5:5:0.0,vignette=PI/6:mode=forward,fade=t=out:st=39.0:d=1.0" \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=out:st=39.0:d=1.0" \
  -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart \
  cohousy_002_v1.mp4
```

Adjust the `st=39.0` fade start to `(duration − 1.0)` seconds — always end with a full 1-second audio + video fade. This is the same warm-highlight / teal-shadow LUT the previous cohousy reel + all faux.thinker reels use.

### 12. Deliver via Telegram

```bash
python scripts/telegram_agent.py --send-latest \
    --path outputs/cohousy_002_v1.mp4
```

The bot pushes the MP4 to your registered Telegram chat + logs the delivery. Under 50 MB → sends as native video; over 50 MB → sends as a file.

---

## Component quick-reference (cohousy-only)

| Component | What it does | Where to use it |
|---|---|---|
| `CohousyLogoLockup` (hero / outro) | Real cohousy logo + tagline reveal | Opening 3 s or CTA close |
| `CohousyPromiseList` | Staggered 4-row check-mark list | "We handle X, Y, Z" moments |
| `CohousyBigStat` | Giant orange gradient number | Stats trio ("30+ FLATS · 98% · 100%") |
| `CohousyMoneyFlow` | ₹ coins pouring into a rent-receipt card | "Rent aa gaya" beats |
| `CohousyComparisonBox` | BROKER × vs SYSTEM ✓ side-by-side | Pivot / disruption moments |
| `CohousyCTAFollow` | Orange follow-CTA with pulse arrow | Final call-to-action |

All above use `useBrand()` — swap the palette only through `src/brand/cohousy.ts`, never by hard-coding hex values inside a component.

---

## Common gotchas

1. **Wrong accent leaking.** If you see red in a rendered still, you accidentally imported a faux.thinker component into the cohousy spec. Only import from `src/cohousy/components/*` for cohousy reels.
2. **Word captions clashing with a component.** Add that beat's `[start, end]` range to `HIDDEN_WINDOWS` in the spec.
3. **Head-pop looks like it's floating.** The `mattedPatternPath` in your `stacked_broll` event points to the wrong `matted_00N/` folder — it must match the version tag of `avatarSrc`.
4. **Windows C: drive fills up mid-render.** Always set `TMPDIR=D:/remotion-temp` before `npx remotion render`. Remotion copies the entire `public/` folder to a temp dir on every render.
5. **Cohousy paths are absolute on Windows.** `scripts/matte_avatar_cohousy_00N.py` has hard-coded `D:/` paths. Edit those two lines when moving to Mac/Linux.

---

## Reel #001 ship-log (reference)

- Duration: 40.84 s, Hindi VO
- Speaker: Santhosh (peach shirt, plant-wall home studio)
- Beats: Hook question → Setup → Reveal ("Property Management") → Promise list → Rent-received receipt → Broker-vs-System comparison → Stats trio (30+ / 98% / 100%) → CTA
- Assets: `avatar_cohousy_001.mp4`, `hook/cohousy_keys_v1.mp4` (Veo 3 Fast), `matted_001/` (1021 PNG frames), `logos/cohousy_logo.png`
- Composition: `Cohousy-001` in `Root.tsx`
- Spec: `remotion-studio/src/cohousy/cohousy001Spec.ts`

Use it as the reference implementation.
