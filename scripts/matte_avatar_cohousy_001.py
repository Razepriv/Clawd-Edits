#!/usr/bin/env python3
"""Matte avatar_cohousy_001.mp4 -> public/cohousy/matted_001/mat_%04d.png.

Runs rembg u2netp over every 1/25 s frame so the cohousy stacked B-roll
component can pop Santhosh's head above the B-roll cutaways. Identical
pipeline to matte_avatar_v5.py (constrained ORT arena, u2netp model,
manual composite) but writes to the isolated cohousy asset tree.
"""
from __future__ import annotations
import subprocess
import sys
import time
from pathlib import Path

AVATAR = Path(r"D:/video editor/remotion-studio/public/cohousy/avatar_cohousy_001.mp4")
FFMPEG = Path(
    r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
    r"imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
)
WORK = Path(r"D:/video editor/_audit/cohousy/matte")
OUT = Path(r"D:/video editor/remotion-studio/public/cohousy/matted_001")


def main() -> int:
    WORK.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    raw = WORK / "raw"
    raw.mkdir(exist_ok=True)
    matted = WORK / "matted"
    matted.mkdir(exist_ok=True)

    print("[1/3] Extracting frames at 540 px wide...", file=sys.stderr, flush=True)
    subprocess.run(
        [
            str(FFMPEG), "-y", "-i", str(AVATAR),
            "-vf", "fps=25,scale=540:-2",
            "-q:v", "2",
            str(raw / "f_%04d.jpg"),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    frames = sorted(raw.glob("*.jpg"))
    print(f"  {len(frames)} frames", file=sys.stderr, flush=True)

    print("[2/3] Running rembg u2netp with constrained ORT arena...", file=sys.stderr, flush=True)
    import gc
    import onnxruntime as ort
    from rembg.sessions.u2netp import U2netpSession
    from PIL import Image

    so = ort.SessionOptions()
    so.enable_cpu_mem_arena = False
    so.enable_mem_pattern = False
    so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_BASIC
    session = U2netpSession("u2netp", sess_opts=so, providers=["CPUExecutionProvider"])

    def _remove(img):
        from PIL import Image as PILImage
        masks = session.predict(img)
        mask = masks[0] if masks else PILImage.new("L", img.size, 0)
        out = img.convert("RGBA")
        out.putalpha(mask.resize(img.size, PILImage.LANCZOS))
        return out

    t0 = time.time()
    for i, jpg in enumerate(frames, 1):
        out_png = matted / (jpg.stem + ".png")
        if out_png.exists():
            continue
        img = Image.open(jpg).convert("RGB")
        result = _remove(img)
        result.save(out_png)
        img.close()
        result.close()
        if i % 32 == 0:
            gc.collect()
        if i % 25 == 0 or i == len(frames):
            elapsed = time.time() - t0
            eta = elapsed / i * (len(frames) - i)
            print(
                f"  {i}/{len(frames)}  elapsed={elapsed:.0f}s  eta={eta:.0f}s",
                file=sys.stderr,
                flush=True,
            )

    print("[3/3] Upscaling to 1080x1920 -> public/cohousy/matted_001/", file=sys.stderr, flush=True)
    subprocess.run(
        [
            str(FFMPEG), "-y", "-framerate", "25",
            "-i", str(matted / "f_%04d.png"),
            "-vf", "scale=1080:1920:flags=lanczos",
            str(OUT / "mat_%04d.png"),
        ],
        check=True,
        stderr=subprocess.DEVNULL,
    )
    count = len(list(OUT.glob("mat_*.png")))
    print(f"Done. {count} matted frames in {OUT}", file=sys.stderr, flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
