"""
Multilingual transcription for @faux.thinker reels — English + Hindi +
every other language faster-whisper supports.

Why large-v3-turbo: the old script used `small` which transcribes English
fine but has 15-25 % WER on Hindi. `large-v3-turbo` is the 809-M-param
distilled descendant of large-v3 and runs at ~8x real-time on the RTX
3050 Laptop GPU (4 GB VRAM) at int8_float16 — fast enough for
interactive use, and near-parity with large-v3 quality on Hindi, Tamil,
Bengali, Marathi, etc.

Defaults:
  model      = large-v3-turbo (override with --model)
  device     = cuda if available else cpu
  compute    = int8_float16 on cuda, int8 on cpu
  language   = autodetect (override with --language hi|en|ta|...)

Usage:
  python scripts/transcribe.py "D:/video editor/Videos/Video 5.mp4"
  python scripts/transcribe.py path/to/audio.wav --language hi
  python scripts/transcribe.py input.mp4 --model turbo --out-dir _audit/MyReel
  python scripts/transcribe.py input.mp4 --initial-prompt "faux.thinker"

Outputs (next to the input, or under --out-dir):
  transcript.txt   — human-readable timeline
  transcript.json  — segments + word timestamps (consumed by Remotion spec)
  transcript.srt   — standard subtitle file
"""
from __future__ import annotations

import argparse
import json
import os
import site
import subprocess
import sys
import time
from pathlib import Path


def _register_cuda_dlls() -> None:
    """ctranslate2 (the backend behind faster-whisper) needs cuBLAS + cuDNN
    + NVRTC at runtime. Windows doesn't ship these, so we install the
    nvidia-* pip wheels and (a) add them to PATH so Windows LoadLibrary
    finds them and (b) register with os.add_dll_directory for Python 3.8+
    semantics. Both are needed — ctranslate2 goes through LoadLibrary so
    PATH matters, but add_dll_directory helps with transitive deps."""
    if sys.platform != "win32":
        return
    candidates = []
    for base in [site.getusersitepackages(), *site.getsitepackages()]:
        for sub in (
            "nvidia/cublas/bin",
            "nvidia/cudnn/bin",
            "nvidia/cuda_nvrtc/bin",
            "nvidia/cuda_runtime/bin",
        ):
            full = os.path.normpath(os.path.join(base, sub))
            if os.path.isdir(full):
                candidates.append(full)

    if candidates:
        os.environ["PATH"] = os.pathsep.join(candidates) + os.pathsep + os.environ.get("PATH", "")
        for path in candidates:
            try:
                os.add_dll_directory(path)
            except (OSError, AttributeError):
                pass


_register_cuda_dlls()

from faster_whisper import WhisperModel  # noqa: E402

FFMPEG = Path(
    r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
    r"imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
)


def _ensure_wav(input_path: Path, out_dir: Path) -> Path:
    """If input is audio/video, extract 16-kHz mono WAV for whisper.
    If it's already a WAV at 16 kHz mono, reuse it."""
    if input_path.suffix.lower() == ".wav":
        return input_path
    wav = out_dir / "audio.wav"
    if wav.exists() and wav.stat().st_mtime > input_path.stat().st_mtime:
        return wav
    out_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(FFMPEG), "-y", "-i", str(input_path),
            "-vn", "-ac", "1", "-ar", "16000",
            "-c:a", "pcm_s16le", str(wav),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    return wav


def _pick_device(arg: str) -> tuple[str, str]:
    """Return (device, compute_type) picking CUDA if available."""
    if arg == "cpu":
        return ("cpu", "int8")
    if arg == "cuda":
        return ("cuda", "int8_float16")
    # auto
    try:
        import ctranslate2
        if ctranslate2.get_cuda_device_count() > 0:
            return ("cuda", "int8_float16")
    except Exception:
        pass
    return ("cpu", "int8")


def _srt_stamp(t: float) -> str:
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    ms = int(round((s - int(s)) * 1000))
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{ms:03d}"


def _ascii_safe(s: str) -> str:
    """Return a version of s that survives Windows cp1252 stdout so we
    can still print Hindi/Devanagari segments as the model emits them
    without crashing."""
    return s.encode("ascii", errors="replace").decode("ascii")


def transcribe(
    input_path: Path,
    out_dir: Path,
    model_size: str = "large-v3-turbo",
    device_arg: str = "auto",
    language: str | None = None,
    initial_prompt: str | None = None,
    beam_size: int = 5,
) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    wav = _ensure_wav(input_path, out_dir)
    device, compute_type = _pick_device(device_arg)

    print(
        f"[whisper] model={model_size}  device={device}  compute={compute_type}  "
        f"language={language or 'auto'}  input={wav.name}",
        flush=True,
    )
    t0 = time.time()
    model = WhisperModel(model_size, device=device, compute_type=compute_type)
    print(f"[whisper] loaded in {time.time()-t0:.1f}s, transcribing...", flush=True)

    segments, info = model.transcribe(
        str(wav),
        beam_size=beam_size,
        word_timestamps=True,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=300),
        language=language,
        initial_prompt=initial_prompt,
    )
    print(
        f"[whisper] detected language: {info.language} "
        f"(p={info.language_probability:.2f})",
        flush=True,
    )

    data: list[dict] = []
    lines: list[str] = []
    srt_lines: list[str] = []

    for seg in segments:
        words = []
        if seg.words:
            for w in seg.words:
                words.append({
                    "w": w.word,
                    "s": round(w.start, 2),
                    "e": round(w.end, 2),
                    "p": round(w.probability, 2),
                })
        text = seg.text.strip()
        data.append({
            "id": seg.id,
            "start": round(seg.start, 2),
            "end": round(seg.end, 2),
            "text": text,
            "words": words,
        })
        pretty = f"[{seg.start:6.2f} -> {seg.end:6.2f}] {text}"
        lines.append(pretty)
        print(_ascii_safe(pretty), flush=True)

        srt_lines.append(str(seg.id + 1))
        srt_lines.append(f"{_srt_stamp(seg.start)} --> {_srt_stamp(seg.end)}")
        srt_lines.append(text)
        srt_lines.append("")

    out_json = out_dir / "transcript.json"
    out_txt = out_dir / "transcript.txt"
    out_srt = out_dir / "transcript.srt"

    out_json.write_text(
        json.dumps(
            {
                "language": info.language,
                "language_probability": info.language_probability,
                "duration": info.duration,
                "model": model_size,
                "segments": data,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    out_txt.write_text("\n".join(lines), encoding="utf-8")
    out_srt.write_text("\n".join(srt_lines), encoding="utf-8")

    elapsed = time.time() - t0
    print(
        f"\n[whisper] wrote:\n  {out_json}\n  {out_txt}\n  {out_srt}\n"
        f"  duration {info.duration:.1f}s  wall {elapsed:.1f}s  "
        f"speed {info.duration/elapsed:.1f}x realtime",
        flush=True,
    )
    return {
        "language": info.language,
        "probability": info.language_probability,
        "duration": info.duration,
        "segments": len(data),
        "out_dir": str(out_dir),
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("input", help="Path to video or audio file")
    ap.add_argument("--model", default="large-v3-turbo",
                    help="faster-whisper model id (default: large-v3-turbo). "
                         "Try 'turbo', 'large-v3', 'distil-large-v3', 'small'.")
    ap.add_argument("--device", default="auto", choices=["auto", "cuda", "cpu"])
    ap.add_argument("--language", default=None,
                    help="Force a language (e.g. hi, en, ta, bn). Default auto-detect.")
    ap.add_argument("--initial-prompt", default=None,
                    help="Optional seed prompt — bias towards proper nouns, stack names, etc.")
    ap.add_argument("--out-dir", default=None,
                    help="Override output directory. Default: _audit/<input-stem>/")
    ap.add_argument("--beam-size", type=int, default=5)
    args = ap.parse_args()

    input_path = Path(args.input).resolve()
    if not input_path.exists():
        print(f"input not found: {input_path}", file=sys.stderr)
        return 2

    if args.out_dir:
        out_dir = Path(args.out_dir).resolve()
    else:
        # _audit/<Video 5>/ convention
        audit_root = Path(r"D:/video editor/_audit")
        # Prefer matching an existing "Video N" folder if the filename follows that pattern
        guess = audit_root / input_path.stem.title()
        out_dir = guess if guess.exists() else audit_root / input_path.stem

    try:
        result = transcribe(
            input_path,
            out_dir,
            model_size=args.model,
            device_arg=args.device,
            language=args.language,
            initial_prompt=args.initial_prompt,
            beam_size=args.beam_size,
        )
        print(json.dumps(result, indent=2))
        return 0
    except Exception as e:
        print(f"[whisper] ERROR: {type(e).__name__}: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
