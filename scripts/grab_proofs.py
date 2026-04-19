#!/usr/bin/env python3
"""
Reuse the persistent Playwright profile to capture real proofs for the
Canva Pipeline reel.

Captures three kinds of proof:
  1. Three X/Twitter hot-take screenshots   → public/x_takes/take_{1,2,3}.png
  2. A Canva editor screen recording         → public/canva_real/canva_demo.mp4
  3. Optional: Anthropic page scroll video   → public/anthropic_real/anthropic_scroll.mp4

Usage:
    python scripts/grab_proofs.py --auth-check       # just verify profile works
    python scripts/grab_proofs.py --x                # only X hot-takes
    python scripts/grab_proofs.py --canva            # only Canva recording
    python scripts/grab_proofs.py --anthropic        # only Anthropic scroll
    python scripts/grab_proofs.py --all              # everything

Prereqs:
    python scripts/launch_profile.py     (run once, sign in, close browser)
"""
from __future__ import annotations
import argparse
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

ROOT = Path(r"D:/video editor")
PROFILE_DIR = ROOT / ".playwright-profile"
PUBLIC = ROOT / "remotion-studio" / "public"
X_TAKES = PUBLIC / "x_takes"
CANVA_OUT = PUBLIC / "canva_real"
ANTHROPIC_OUT = PUBLIC / "anthropic_real"


def launch(p):
    """Open persistent context against the user's logged-in profile."""
    return p.chromium.launch_persistent_context(
        user_data_dir=str(PROFILE_DIR),
        headless=False,
        viewport={"width": 1280, "height": 900},
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/131.0.0.0 Safari/537.36"
        ),
        locale="en-US",
        timezone_id="Asia/Kolkata",
        args=[
            "--disable-blink-features=AutomationControlled",
        ],
    )


def auth_check() -> int:
    """Navigate to X, Canva, Anthropic — log what's signed in."""
    with sync_playwright() as p:
        ctx = launch(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        results = []

        # X
        try:
            page.goto("https://x.com/home", wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2500)
            url = page.url
            if "/login" in url or "/i/flow/login" in url:
                results.append(("x.com", "NOT logged in — redirected to login"))
            else:
                results.append(("x.com", f"logged in (landed at {url})"))
        except Exception as e:
            results.append(("x.com", f"error: {type(e).__name__}"))

        # Canva
        try:
            page.goto("https://www.canva.com/", wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2500)
            url = page.url
            if "login" in url.lower():
                results.append(("canva.com", "NOT logged in — redirected to login"))
            else:
                results.append(("canva.com", f"logged in (landed at {url})"))
        except Exception as e:
            results.append(("canva.com", f"error: {type(e).__name__}"))

        # Anthropic (public — always works)
        try:
            page.goto("https://www.anthropic.com/news/claude-design-anthropic-labs",
                      wait_until="domcontentloaded", timeout=15000)
            page.wait_for_timeout(1200)
            results.append(("anthropic.com", "reachable"))
        except Exception as e:
            results.append(("anthropic.com", f"error: {type(e).__name__}"))

        ctx.close()

    print("\n=== AUTH CHECK RESULTS ===")
    for site, status in results:
        icon = "OK" if ("logged in" in status or status == "reachable") else "FAIL"
        print(f"  [{icon}] {site:<16} {status}")
    print()
    return 0 if all(("logged in" in s or s == "reachable") for _, s in results) else 1


def grab_x_takes() -> int:
    """Search X for viral Canva-dead takes, screenshot 3 tweet cards."""
    X_TAKES.mkdir(parents=True, exist_ok=True)
    searches = [
        ('"Claude Design" Canva dead', "take_1.png"),
        ("Figma cooked Claude Design", "take_2.png"),
        ("design tools over Claude Design", "take_3.png"),
    ]

    with sync_playwright() as p:
        ctx = launch(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        for query, outname in searches:
            print(f"[x] searching: {query}")
            try:
                page.goto(
                    f"https://x.com/search?q={query.replace(' ', '%20')}&src=typed_query&f=live",
                    wait_until="domcontentloaded",
                    timeout=25000,
                )
                page.wait_for_selector("article[data-testid='tweet']", timeout=15000)
                page.wait_for_timeout(2000)
                # Grab the first tweet element
                tweet = page.query_selector("article[data-testid='tweet']")
                if not tweet:
                    print(f"  no tweet found for {query}")
                    continue
                tweet.screenshot(path=str(X_TAKES / outname))
                print(f"  saved → {X_TAKES / outname}")
            except PWTimeout:
                print(f"  timeout waiting for tweets on '{query}'")
            except Exception as e:
                print(f"  error: {type(e).__name__}: {e}")

        ctx.close()
    print(f"\n[x] done. {len(list(X_TAKES.glob('take_*.png')))} takes captured in {X_TAKES}")
    return 0


def grab_canva_video(duration_s: int = 20) -> int:
    """Record a 20 s screen session of the user's Canva home / recent designs."""
    CANVA_OUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            viewport={"width": 1280, "height": 800},
            record_video_dir=str(CANVA_OUT),
            record_video_size={"width": 1280, "height": 800},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/131.0.0.0 Safari/537.36"
            ),
            locale="en-US",
            args=["--disable-blink-features=AutomationControlled"],
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        print(f"[canva] opening canva.com (will record {duration_s} s)")
        page.goto("https://www.canva.com/", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)

        # Gentle scroll sequence so the video has visual motion
        steps = [0, 300, 600, 900, 600, 300, 0]
        interval = duration_s / len(steps)
        for y in steps:
            page.evaluate(f"window.scrollTo({{top: {y}, behavior: 'smooth'}})")
            page.wait_for_timeout(int(interval * 1000))

        print("[canva] closing context (video finalising)...")
        # The video is only written to disk when context closes.
        ctx.close()

    # Playwright writes video as <random>.webm — rename to canva_demo.mp4 (we re-encode)
    webms = list(CANVA_OUT.glob("*.webm"))
    if not webms:
        print("[canva] ERROR: no webm video produced")
        return 1
    webm = webms[0]
    # Convert webm → mp4 using ffmpeg
    ffmpeg = Path(r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe")
    import subprocess
    out_mp4 = CANVA_OUT / "canva_demo.mp4"
    subprocess.run(
        [str(ffmpeg), "-y", "-loglevel", "error", "-i", str(webm),
         "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", str(out_mp4)],
        check=True,
    )
    webm.unlink()
    # Also clean up any leftover .webm from previous runs
    for extra in CANVA_OUT.glob("*.webm"):
        extra.unlink()

    print(f"[canva] saved → {out_mp4} ({out_mp4.stat().st_size / 1024 / 1024:.1f} MB)")
    return 0


def grab_anthropic_scroll(duration_s: int = 8) -> int:
    """Record a smooth scroll-through of the Claude Design announcement page."""
    ANTHROPIC_OUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            viewport={"width": 1080, "height": 1920},
            record_video_dir=str(ANTHROPIC_OUT),
            record_video_size={"width": 1080, "height": 1920},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/131.0.0.0 Safari/537.36"
            ),
            locale="en-US",
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto("https://www.anthropic.com/news/claude-design-anthropic-labs",
                  wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(1500)
        # Hide cookie banner + nav for a clean capture
        page.evaluate("""() => {
            document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],header,nav')
                .forEach(e => e.style.display = 'none');
        }""")
        # Smooth scroll from top to Perkins quote section
        total_scroll = 3600
        steps = 40
        interval = duration_s / steps
        for i in range(steps + 1):
            y = (total_scroll * i) // steps
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(int(interval * 1000))
        ctx.close()

    webms = list(ANTHROPIC_OUT.glob("*.webm"))
    if not webms:
        print("[anthropic] ERROR: no webm video produced")
        return 1
    webm = webms[0]
    ffmpeg = Path(r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe")
    import subprocess
    out_mp4 = ANTHROPIC_OUT / "anthropic_scroll.mp4"
    subprocess.run(
        [str(ffmpeg), "-y", "-loglevel", "error", "-i", str(webm),
         "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", str(out_mp4)],
        check=True,
    )
    webm.unlink()
    print(f"[anthropic] saved → {out_mp4} ({out_mp4.stat().st_size / 1024 / 1024:.1f} MB)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--auth-check", action="store_true", help="Only verify logins, don't capture")
    ap.add_argument("--x", action="store_true", help="Capture X hot-take screenshots")
    ap.add_argument("--canva", action="store_true", help="Record Canva screen video")
    ap.add_argument("--anthropic", action="store_true", help="Record Anthropic page scroll")
    ap.add_argument("--all", action="store_true", help="Run all captures")
    args = ap.parse_args()

    if args.auth_check:
        return auth_check()

    if not (args.x or args.canva or args.anthropic or args.all):
        print("No capture selected. Use --auth-check, --x, --canva, --anthropic, or --all.")
        return 1

    rc = 0
    if args.all or args.x:
        rc |= grab_x_takes()
    if args.all or args.canva:
        rc |= grab_canva_video()
    if args.all or args.anthropic:
        rc |= grab_anthropic_scroll()
    return rc


if __name__ == "__main__":
    sys.exit(main())
