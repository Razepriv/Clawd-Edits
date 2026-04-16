#!/usr/bin/env python3
"""Extract avatar frames for a time window, run rembg, encode to alpha MOV."""
from __future__ import annotations

import argparse
import subprocess
import sys
import time
from pathlib import Path

AVATAR = Path("D:/video editor/remotion-studio/public/avatar.mp4")
FFMPEG = Path(
    "C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ss", type=float, required=True, help="Start time (seconds)")
    parser.add_argument("--duration", type=float, required=True, help="Duration (seconds)")
    parser.add_argument("--fps", type=int, default=25, help="Output fps")
    parser.add_argument("--width", type=int, default=540, help="Matting width (speed vs. quality)")
    parser.add_argument("--out-dir", required=True, help="Work directory")
    parser.add_argument("--out-png-seq", required=True, help="Output PNG sequence pattern (%04d)")
    args = parser.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    raw_dir = out_dir / "raw"
    matted_dir = out_dir / "matted"
    raw_dir.mkdir(exist_ok=True)
    matted_dir.mkdir(exist_ok=True)

    print(f"[1/3] Extracting frames from {AVATAR.name} at {args.ss}s for {args.duration}s", file=sys.stderr)
    subprocess.run(
        [
            str(FFMPEG), "-y",
            "-ss", str(args.ss),
            "-t", str(args.duration),
            "-i", str(AVATAR),
            "-vf", f"fps={args.fps},scale={args.width}:-2",
            "-q:v", "2",
            str(raw_dir / "f_%04d.jpg"),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    raw_frames = sorted(raw_dir.glob("*.jpg"))
    print(f"  extracted {len(raw_frames)} frames", file=sys.stderr)

    print(f"[2/3] Running rembg on {len(raw_frames)} frames (this takes ~13s/frame)", file=sys.stderr)
    from rembg import new_session, remove
    from PIL import Image

    session = new_session("u2net")
    t_start = time.time()
    for i, jpg in enumerate(raw_frames, 1):
        out_png = matted_dir / (jpg.stem + ".png")
        if out_png.exists():
            continue
        img = Image.open(jpg)
        result = remove(img, session=session)
        result.save(out_png)
        elapsed = time.time() - t_start
        eta = elapsed / i * (len(raw_frames) - i)
        print(f"  {i}/{len(raw_frames)}  elapsed={elapsed:.0f}s  eta={eta:.0f}s", file=sys.stderr, flush=True)

    print(f"[3/3] Upscaling to 1080 width and copying PNG sequence to {args.out_png_seq}", file=sys.stderr)
    # Copy PNG sequence directly — Remotion can consume PNG sequence via <Series> of <Img>.
    out_png_seq_path = Path(args.out_png_seq)
    out_png_seq_path.parent.mkdir(parents=True, exist_ok=True)
    # But first upscale back to full 1080 width so we don't lose sharpness.
    subprocess.run(
        [
            str(FFMPEG), "-y",
            "-framerate", str(args.fps),
            "-i", str(matted_dir / "f_%04d.png"),
            "-vf", "scale=1080:1920:flags=lanczos",
            str(out_png_seq_path).replace("%04d", "%04d"),  # keep pattern
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    print("Done.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
