#!/usr/bin/env python3
"""
Video 7 / basecamp reel proof capture. Uses the persistent Playwright profile.

Targets:
  1. Live basecamp.apexaios.io home (SPA — needs JS render)        -> public/basecamp/home.png
  2. Optional: scroll-recording of the home page                    -> public/basecamp/home_scroll.mp4
  3. 3 X takes about basecamp / build-in-public / LinkedIn-builders -> public/x_takes_v7/take_{1,2,3}.png

Usage:
    python scripts/grab_proofs_v7.py --basecamp
    python scripts/grab_proofs_v7.py --x
    python scripts/grab_proofs_v7.py --all
"""
from __future__ import annotations
import argparse
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

ROOT = Path(r"D:/video editor")
PROFILE_DIR = ROOT / ".playwright-profile"
PUBLIC = ROOT / "remotion-studio" / "public"
BC_OUT = PUBLIC / "basecamp"
X_OUT = PUBLIC / "x_takes_v7"


def launch(p, viewport=None, record_dir: Path | None = None):
    kwargs = {
        "user_data_dir": str(PROFILE_DIR),
        "headless": False,
        "viewport": viewport or {"width": 1280, "height": 1920},
        "user_agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/131.0.0.0 Safari/537.36"
        ),
        "locale": "en-US",
        "timezone_id": "Asia/Kolkata",
        "args": ["--disable-blink-features=AutomationControlled"],
    }
    if record_dir:
        kwargs["record_video_dir"] = str(record_dir)
        kwargs["record_video_size"] = {"width": viewport["width"], "height": viewport["height"]} if viewport else {"width": 1280, "height": 1920}
    return p.chromium.launch_persistent_context(**kwargs)


def grab_basecamp() -> int:
    BC_OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = launch(p, viewport={"width": 1280, "height": 1920})
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        print("[basecamp] loading home...")
        try:
            page.goto("https://basecamp.apexaios.io/", wait_until="networkidle", timeout=45000)
        except PWTimeout:
            page.goto("https://basecamp.apexaios.io/", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4000)
        # Hide cookie banners or signup modals if present
        page.evaluate("""() => document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],[class*="popup" i]').forEach(e => e.style.display = 'none')""")

        page.screenshot(path=str(BC_OUT / "home.png"), full_page=True)
        print(f"  -> {BC_OUT / 'home.png'}")

        # Also grab a viewport-sized hero shot
        page.screenshot(path=str(BC_OUT / "home_hero.png"), full_page=False)
        print(f"  -> {BC_OUT / 'home_hero.png'}")
        ctx.close()
    return 0


def grab_basecamp_scroll() -> int:
    """Record a smooth scroll-through of the basecamp home as MP4."""
    BC_OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            viewport={"width": 1080, "height": 1920},
            record_video_dir=str(BC_OUT),
            record_video_size={"width": 1080, "height": 1920},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            locale="en-US",
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto("https://basecamp.apexaios.io/", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)
        page.evaluate("""() => document.querySelectorAll('[class*="cookie" i],[id*="cookie" i]').forEach(e => e.style.display = 'none')""")

        steps = 36
        total_scroll = 4200
        for i in range(steps + 1):
            y = (total_scroll * i) // steps
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(200)
        ctx.close()

    webms = list(BC_OUT.glob("*.webm"))
    if webms:
        webm = webms[0]
        import subprocess
        ffmpeg = Path(r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe")
        out_mp4 = BC_OUT / "home_scroll.mp4"
        subprocess.run([str(ffmpeg), "-y", "-loglevel", "error", "-i", str(webm),
                        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                        "-pix_fmt", "yuv420p", "-r", "25", str(out_mp4)], check=True)
        webm.unlink()
        for extra in BC_OUT.glob("*.webm"):
            extra.unlink()
        print(f"[basecamp] scroll -> {out_mp4}")
    return 0


def grab_x() -> int:
    X_OUT.mkdir(parents=True, exist_ok=True)
    searches = [
        ('basecamp apexaios builder', "take_1.png"),
        ('LinkedIn dead builders', "take_2.png"),
        ('build in public hireable', "take_3.png"),
    ]
    with sync_playwright() as p:
        ctx = launch(p, viewport={"width": 1280, "height": 1400})
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        for query, outname in searches:
            print(f"[x] searching: {query}")
            try:
                page.goto(
                    f"https://x.com/search?q={query.replace(' ', '%20').replace('\"', '%22')}&src=typed_query&f=live",
                    wait_until="domcontentloaded",
                    timeout=25000,
                )
                page.wait_for_selector("article[data-testid='tweet']", timeout=15000)
                page.wait_for_timeout(2500)
                tweet = page.query_selector("article[data-testid='tweet']")
                if not tweet:
                    print(f"  no tweet")
                    continue
                tweet.screenshot(path=str(X_OUT / outname))
                print(f"  -> {X_OUT / outname}")
            except PWTimeout:
                print(f"  timeout for {query}")
            except Exception as e:
                print(f"  error: {type(e).__name__}: {e}")
        ctx.close()
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--basecamp", action="store_true")
    ap.add_argument("--basecamp-scroll", action="store_true")
    ap.add_argument("--x", action="store_true")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    if not (args.basecamp or args.basecamp_scroll or args.x or args.all):
        print("No target.")
        return 1

    rc = 0
    if args.all or args.basecamp:
        rc |= grab_basecamp()
    if args.all or args.basecamp_scroll:
        rc |= grab_basecamp_scroll()
    if args.all or args.x:
        rc |= grab_x()
    return rc


if __name__ == "__main__":
    sys.exit(main())
