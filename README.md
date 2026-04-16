# Clawd-Edits

> **@faux.thinker** video production pipeline — Instagram Reels generated from an avatar MP4 + a typed spec. Built on **Remotion 4** + **FFmpeg** + **rembg** + **Playwright**, orchestrated with Claude Code.

Two reels shipped to date:

1. **`FauxThinker-Intro` v12** — 31 s WebVerse Arena intro (Razeen introduces himself + the channel)
2. **`FauxThinker-Opus` v2** — 79 s news-announcement reel on Anthropic's **Claude Opus 4.7** release (Apr 16 2026)

All decisions are locked in [`brand-kit/FAUX_THINKER_STYLE_GUIDE.md`](brand-kit/FAUX_THINKER_STYLE_GUIDE.md); deltas from v12 are in the changelog at the bottom of that file.

---

## What the repo contains

```
remotion-studio/        — Remotion 4 project (compositions, components, brand tokens)
  src/
    brand/              — Token-driven brand system (FAUX_THINKER + DEVIN_JATHO)
    styles/devin1/      — The composable style system powering every reel
      components/       — 14 motion-graphic components (ProfileCard, RevenueChart,
                          EmphasisCaption, SplitStackBroll head-pop-out, DMToast …)
      *Spec.ts          — ApplySpec per produced reel (intro, opus, samples)
    shared/             — Zod event schema, matted avatar player, overlay video,
                          glitch helpers (retired), etc.
  public/               — Music bed, SFX, light-leak transitions, scraped platform
                          UIs, logos. Large binaries (raw avatar / matted PNG
                          sequences / renders) are gitignored.

scripts/                — Python helpers
  matte_avatar.py       — rembg U-2-Net alpha matting for intro video
  matte_avatar_opus.py  — same, for the Opus launch avatar
  eleven_music.py       — ElevenLabs Music API wrapper
  eleven_sfx.py         — ElevenLabs Sound Effects wrapper
  veo.py                — Google Veo 3 Fast B-roll generator
  obsidian_sync.py      — PUT/DELETE/LIST a single note via Local REST API
  obsidian_sync_all.py  — Batch-push every note in _audit/obsidian_seed/

brand-kit/
  BRAND.md              — Channel identity + voice
  FAUX_THINKER_STYLE_GUIDE.md   — The locked production spec (v12)

_audit/
  obsidian_seed/        — Source-of-truth markdown notes that back the Obsidian vault
    _Index.md
    Brand/              — Style Guide + Brand Kit notes
    Styles Audits/      — Pixel-level breakdowns of 5 reference creators
                          (Devin 1, Devin 2, Nick 1, VC 1, rpn 1)
    Reels Produced/     — One note per shipped reel
    Signature Effect Brief.md
  <Creator>/<Video>/    — Per-video audit pack (EVENTS.json, PLAYBOOK.md,
                          word-level transcript, scene-change times)
```

## Pipeline in one diagram

```
avatar.mp4 ────┐
               │                              ┌──► matted PNG seq (rembg u2net)
               ▼                              │
   faster-whisper base  ─► word-level JSON    │
               │                              │
               ▼                              │
 ApplySpec.ts (events: ProfileCard,           │
               RevenueChart, EmphasisCaption, │
               SplitStackBroll, DMToast,      │
               WordCaptions, SFX, overlays)   │
               │                              │
               ▼                              │
   Remotion 4 composition  <─ platform scrapes (Playwright → Ken Burns MP4s)
               │
               ▼
    FFmpeg post (loudnorm + fade-out + CRF 20 + AAC 192 k)
               │
               ▼
   outputs/faux_thinker_*_vN.mp4  (9:16 · 1080×1920 · 25 fps)
```

## Quick start

Prereqs: Node 20+, Python 3.12+, Git, FFmpeg available on PATH (the repo uses the one bundled with the `imageio-ffmpeg` pip package when run).

```bash
# 1. Install Remotion deps
cd remotion-studio
npm install

# 2. Copy secrets scaffold
cd ..
cp .env.example .env   # then fill in ELEVENLABS_API_KEY, GOOGLE_API_KEY, OBSIDIAN_API_KEY

# 3. Install Python helpers
pip install faster-whisper rembg pillow requests python-dotenv imageio-ffmpeg playwright

# 4. Put your avatar video at remotion-studio/public/avatar.mp4
#    (or avatar_opus.mp4 for the Opus reel)

# 5. Matte the avatar (once, ~20 min for 80 s at 25 fps on CPU)
python scripts/matte_avatar_opus.py

# 6. Run the studio (preview)
cd remotion-studio
npm run dev
# open http://localhost:3000/FauxThinker-Opus

# 7. Render final
npx remotion render FauxThinker-Opus ../outputs/opus_raw.mp4 --codec h264 --crf 18

# 8. Post-process (fade-out + loudnorm + faststart)
ffmpeg -i ../outputs/opus_raw.mp4 \
  -vf "fade=out:st=78.67:d=0.5" \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11,afade=out:st=78.67:d=0.5" \
  -c:v libx264 -crf 20 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart \
  ../outputs/opus_final.mp4
```

## Produced reels

### `FauxThinker-Opus` v2 — Claude Opus 4.7 launch

| | |
|---|---|
| Duration | 79.30 s |
| Source VO | [`Video 2/Video_insta_2.mp4`](#) (not committed — user-specific) |
| Output | `outputs/faux_thinker_opus_v2.mp4` |
| Spec | [`remotion-studio/src/styles/devin1/opusLaunchSpec.ts`](remotion-studio/src/styles/devin1/opusLaunchSpec.ts) |
| Audit | [`_audit/Video 2/`](_audit/Video%202) |
| Obsidian note | [`_audit/obsidian_seed/Reels Produced/faux.thinker Opus 4.7 Launch v2.md`](<_audit/obsidian_seed/Reels Produced/faux.thinker Opus 4.7 Launch v2.md>) |
| Facts source | [anthropic.com/news/claude-opus-4-7](https://www.anthropic.com/news/claude-opus-4-7) |

### `FauxThinker-Intro` v12 — WebVerse Arena intro

| | |
|---|---|
| Duration | 31.17 s |
| Spec | [`remotion-studio/src/styles/devin1/fauxThinkerIntroSpec.ts`](remotion-studio/src/styles/devin1/fauxThinkerIntroSpec.ts) |
| Locked 3-layer head-pop-out | [`SplitStackBroll.tsx`](remotion-studio/src/styles/devin1/components/SplitStackBroll.tsx) — parameters documented in §4.1 of the style guide |

## Obsidian vault

The `_audit/obsidian_seed/` folder is the source of truth for the Obsidian vault that holds every production decision. Open Obsidian, install the Local REST API plugin (`:27124`), put `OBSIDIAN_API_KEY` in `.env`, then:

```bash
python scripts/obsidian_sync_all.py
```

Pushes all notes (preserves folder structure) into the vault.

## License

The code is MIT. The purchased asset packs under `Packs/` are **not** committed and are not redistributable. The avatar MP4 and matted PNG sequences are also not committed because they are user-specific outputs.
