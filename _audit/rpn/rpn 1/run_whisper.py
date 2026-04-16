from faster_whisper import WhisperModel
import json
m = WhisperModel("base", device="cpu", compute_type="int8")
segs, info = m.transcribe(r"D:\video editor\_audit\rpn\rpn 1\audio\audio.wav", language="en", word_timestamps=True, beam_size=1, vad_filter=False)
out = {"language": info.language, "duration": info.duration, "segments": []}
for s in segs:
    out["segments"].append({
        "start": round(s.start, 2),
        "end": round(s.end, 2),
        "text": s.text,
        "words": [{"start": round(w.start, 2), "end": round(w.end, 2), "word": w.word} for w in (s.words or [])]
    })
with open(r"D:\video editor\_audit\rpn\rpn 1\audio\transcript.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print("segments:", len(out["segments"]))
