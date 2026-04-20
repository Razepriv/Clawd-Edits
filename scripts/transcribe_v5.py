"""Transcribe Video 5 audio with faster-whisper + word timestamps."""
from faster_whisper import WhisperModel
import json, sys, os

AUDIO = r"D:/video editor/_audit/Video 5/audio.wav"
OUT_JSON = r"D:/video editor/_audit/Video 5/transcript.json"
OUT_TXT = r"D:/video editor/_audit/Video 5/transcript.txt"

# small.en is fast + good for clear English a-roll
model = WhisperModel("small", device="cpu", compute_type="int8")
print("[whisper] model loaded, transcribing...", flush=True)
segments, info = model.transcribe(
    AUDIO,
    beam_size=5,
    word_timestamps=True,
    vad_filter=True,
    vad_parameters=dict(min_silence_duration_ms=300),
)
print(f"[whisper] detected language: {info.language} (p={info.language_probability:.2f})", flush=True)

data = []
lines = []
for seg in segments:
    words = []
    if seg.words:
        for w in seg.words:
            words.append({"w": w.word, "s": round(w.start, 2), "e": round(w.end, 2), "p": round(w.probability, 2)})
    data.append({"id": seg.id, "start": round(seg.start, 2), "end": round(seg.end, 2), "text": seg.text.strip(), "words": words})
    lines.append(f"[{seg.start:6.2f} -> {seg.end:6.2f}] {seg.text.strip()}")
    print(lines[-1].encode('ascii', errors='replace').decode('ascii'), flush=True)

with open(OUT_JSON, "w", encoding="utf-8") as f:
    json.dump({"language": info.language, "duration": info.duration, "segments": data}, f, indent=2, ensure_ascii=False)
with open(OUT_TXT, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print(f"\n[whisper] wrote {OUT_JSON} + {OUT_TXT}")
