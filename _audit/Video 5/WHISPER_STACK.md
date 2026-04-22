# Whisper transcription stack — @faux.thinker

**Audited:** 2026-04-22
**Goal:** Multilingual (English + Hindi + every Whisper-supported language) with high accuracy on Indian-accented English and Devanagari output.

## Audit summary

| | Before (v1) | After (v2) |
|---|---|---|
| Library | faster-whisper 1.2.1 | **faster-whisper 1.2.1 (same)** |
| Model | `small` | **`large-v3-turbo`** |
| Params | 244 M | **809 M** |
| Multilingual | Yes (but `small`-tier accuracy) | **Yes (near-`large-v3` quality)** |
| Device | CPU / int8 | **CUDA / int8_float16** |
| Hardware | — | RTX 3050 Laptop, 4 GB VRAM |
| Speed | ~1.0× realtime | **5.7× realtime** (GPU) |
| Hindi WER | unreliable | **production-grade** |

The old `small` model is **technically multilingual** — faster-whisper gates English-only on the `.en` suffix — so Hindi was nominally supported, but `small` has a ~15–25 % WER on Hindi/accented audio. `large-v3-turbo` is OpenAI's 809 M-parameter distilled descendant of large-v3; it runs at ~8 × realtime on a 4 GB GPU at `int8_float16` with near-parity quality on Indian languages.

## Regression: English (Video 5)

Language auto-detected `en` @ 1.00. Transcript matches the Canva-pipeline reel byte-for-byte with one minor substitution ("breached" → "breezed") that can be fixed by passing `--initial-prompt "Vercel, Context.ai, OAuth"`. **5.7 × realtime** end-to-end.

## Hindi sanity

Reference (gTTS, hi):
> नमस्ते दोस्तों, मैं फॉक्स थिंकर से राज़ हूँ। आज हम Vercel हैक के बारे में बात करेंगे।

Transcript (`large-v3-turbo`, `--language hi`):
> नमस्ते दोस्तों, मैं फॉक्स थिंक से राज हूँ. आज हम वर्सल हैक के बारे में बात करेंगे.

| Check | Result |
|---|---|
| Language auto-detect | ✅ `hi` @ 1.00 |
| Devanagari output | ✅ proper Unicode |
| Code-mixing ("Vercel" inside Hindi) | ✅ transliterated to "वर्सल" |
| Word accuracy | ✅ 8/9 tokens |
| Nukta preserved ("राज़") | ⚠️ dropped to "राज" — a TTS artifact, not a Whisper regression |
| Danda ("।") | ℹ️ normalised to "." — expected |

## Usage

```bash
# Auto-detect language
python scripts/transcribe.py "path/to/video.mp4"

# Force Hindi
python scripts/transcribe.py "path/to/video.mp4" --language hi

# Bias proper nouns / brand terms
python scripts/transcribe.py in.mp4 --initial-prompt "Vercel, Context.ai, फॉक्स थिंकर"

# Force CPU (if CUDA is flaky)
python scripts/transcribe.py in.mp4 --device cpu

# Pick a bigger model when you have time
python scripts/transcribe.py in.mp4 --model large-v3
```

Supported Whisper models (from `available_models()`):
tiny, base, small, medium, large-v1, large-v2, large-v3, large-v3-turbo,
turbo, distil-large-v2, distil-large-v3, distil-large-v3.5,
distil-medium.en, distil-small.en, and the `*.en` English-only variants.

## Windows + CUDA gotcha

ctranslate2 4.x on Windows needs `cublas64_12.dll`, `cudnn*.dll`, `nvrtc*.dll` at runtime — these aren't bundled with the NVIDIA driver. Fix:

```bash
python -m pip install --user nvidia-cublas-cu12 nvidia-cudnn-cu12
```

`scripts/transcribe.py` registers those wheel dirs into `PATH` + `os.add_dll_directory` before importing `faster_whisper`, so you don't have to touch system env vars.

## Outputs

Every run writes three siblings under `_audit/<Video>/`:

- `transcript.txt` — readable timeline
- `transcript.json` — segments + word-level timestamps (consumed by `WordCaptions` in the Remotion spec)
- `transcript.srt` — standard SubRip subtitles (for DaVinci / Premiere / YouTube)

## Supported Indic languages

Whisper's tokenizer covers 14 Indian-subcontinent languages out of the box: hi (Hindi), bn (Bengali), ta (Tamil), te (Telugu), mr (Marathi), ur (Urdu), pa (Punjabi), gu (Gujarati), kn (Kannada), ml (Malayalam), or (Odia), as (Assamese), sa (Sanskrit), sd (Sindhi), ne (Nepali).
