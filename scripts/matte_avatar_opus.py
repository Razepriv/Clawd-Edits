#!/usr/bin/env python3
"""Matte the Opus launch avatar (full 79s) -> public/matted_avatar_opus/mat_%04d.png."""
from __future__ import annotations
import subprocess, sys, time
from pathlib import Path

AVATAR = Path(r"D:/video editor/remotion-studio/public/avatar_opus.mp4")
FFMPEG = Path(r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe")
WORK   = Path(r"D:/video editor/_audit/Video 2/matte")
OUT    = Path(r"D:/video editor/remotion-studio/public/matted_avatar_opus")
WORK.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

raw = WORK / "raw"; raw.mkdir(exist_ok=True)
matted = WORK / "matted"; matted.mkdir(exist_ok=True)

print("[1/3] Extracting frames 540 wide...", file=sys.stderr, flush=True)
subprocess.run([str(FFMPEG),"-y","-i",str(AVATAR),"-vf","fps=25,scale=540:-2","-q:v","2", str(raw/"f_%04d.jpg")], check=True, stderr=subprocess.DEVNULL)
frames = sorted(raw.glob("*.jpg"))
print(f"  {len(frames)} frames", file=sys.stderr, flush=True)

print("[2/3] rembg u2net...", file=sys.stderr, flush=True)
from rembg import new_session, remove
from PIL import Image
session = new_session("u2net")
t0 = time.time()
for i, jpg in enumerate(frames, 1):
    out_png = matted / (jpg.stem + ".png")
    if out_png.exists(): continue
    img = Image.open(jpg)
    result = remove(img, session=session)
    result.save(out_png)
    if i % 25 == 0 or i == len(frames):
        el = time.time() - t0
        eta = el / i * (len(frames) - i)
        print(f"  {i}/{len(frames)}  elapsed={el:.0f}s  eta={eta:.0f}s", file=sys.stderr, flush=True)

print("[3/3] Upscaling matted sequence to 1080 width and writing to public/matted_avatar_opus/", file=sys.stderr, flush=True)
subprocess.run([str(FFMPEG),"-y","-framerate","25","-i",str(matted/"f_%04d.png"),"-vf","scale=1080:1920:flags=lanczos", str(OUT/"mat_%04d.png")], check=True, stderr=subprocess.DEVNULL)
count = len(list(OUT.glob("mat_*.png")))
print(f"Done. {count} matted frames in {OUT}", file=sys.stderr, flush=True)
