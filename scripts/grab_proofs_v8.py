#!/usr/bin/env python3
"""Capture the Anthropic emergent-misalignment paper page + scroll-record."""
from __future__ import annotations
import argparse, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(r"D:/video editor")
PROFILE_DIR = ROOT / ".playwright-profile"
PUBLIC = ROOT / "remotion-studio" / "public"
OUT = PUBLIC / "anthropic_paper"
FFMPEG = Path(
    r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
    r"imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
)
URL = "https://www.anthropic.com/research/emergent-misalignment-reward-hacking"


def launch(p, viewport, record_dir=None):
    kwargs = {
        "user_data_dir": str(PROFILE_DIR),
        "headless": False,
        "viewport": viewport,
        "user_agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/131.0.0.0 Safari/537.36"
        ),
        "locale": "en-US",
        "args": ["--disable-blink-features=AutomationControlled"],
    }
    if record_dir:
        kwargs["record_video_dir"] = str(record_dir)
        kwargs["record_video_size"] = viewport
    return p.chromium.launch_persistent_context(**kwargs)


def grab_paper():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = launch(p, {"width": 1280, "height": 1920})
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        print("[anthropic] loading paper...")
        page.goto(URL, wait_until="domcontentloaded", timeout=45000)
        page.wait_for_timeout(3500)
        page.evaluate("""() => document.querySelectorAll('[class*=\"cookie\" i],[id*=\"cookie\" i]').forEach(e => e.style.display='none')""")
        page.screenshot(path=str(OUT / "paper.png"), full_page=True)
        print(f"  -> {OUT / 'paper.png'}")
        page.screenshot(path=str(OUT / "paper_hero.png"), full_page=False)
        print(f"  -> {OUT / 'paper_hero.png'}")
        ctx.close()


def grab_scroll():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            viewport={"width": 1280, "height": 1920},
            record_video_dir=str(OUT),
            record_video_size={"width": 1280, "height": 1920},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            locale="en-US",
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto(URL, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)
        page.evaluate("""() => document.querySelectorAll('[class*=\"cookie\" i],[id*=\"cookie\" i]').forEach(e => e.style.display='none')""")
        steps = 38
        total = 4400
        for i in range(steps + 1):
            y = (total * i) // steps
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(170)
        ctx.close()

    webms = list(OUT.glob("*.webm"))
    if webms:
        webm = webms[0]
        out_mp4 = OUT / "paper_scroll.mp4"
        subprocess.run([
            str(FFMPEG), "-y", "-loglevel", "error", "-i", str(webm),
            "-c:v", "libx264", "-preset", "medium", "-crf", "20",
            "-pix_fmt", "yuv420p", "-r", "25", str(out_mp4),
        ], check=True)
        webm.unlink()
        for extra in OUT.glob("*.webm"):
            extra.unlink()
        print(f"[anthropic] scroll -> {out_mp4}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--screenshot", action="store_true")
    ap.add_argument("--scroll", action="store_true")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    if not (args.screenshot or args.scroll or args.all):
        print("No target.")
        return 1

    if args.all or args.screenshot:
        grab_paper()
    if args.all or args.scroll:
        grab_scroll()
    return 0


if __name__ == "__main__":
    sys.exit(main())
