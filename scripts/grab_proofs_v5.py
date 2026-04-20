#!/usr/bin/env python3
"""Vercel-breach reel proof capture.

Uses the persistent Playwright profile set up by scripts/launch_profile.py to
grab real evidence for the Vercel x Context.ai breach reel:

  1. Three X/Twitter hot-takes about the breach -> public/x_takes_v5/take_{1,2,3}.png
  2. A 1280x800 video scroll through vercel.com's KB bulletin  -> public/vercel_kb/vercel_kb.mp4
  3. Static screenshot of myaccount.google.com/permissions     -> public/google_perms/permissions.png

Usage:
    python scripts/grab_proofs_v5.py --all
    python scripts/grab_proofs_v5.py --x
    python scripts/grab_proofs_v5.py --kb
    python scripts/grab_proofs_v5.py --gperms
"""
from __future__ import annotations
import argparse
import subprocess
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

ROOT = Path(r"D:/video editor")
PROFILE_DIR = ROOT / ".playwright-profile"
PUBLIC = ROOT / "remotion-studio" / "public"
X_TAKES = PUBLIC / "x_takes_v5"
KB_OUT = PUBLIC / "vercel_kb"
GPERMS_OUT = PUBLIC / "google_perms"

FFMPEG = Path(
    r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
    r"imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
)


def _launch(p, width: int = 1280, height: int = 900, record_dir: Path | None = None):
    kwargs = dict(
        user_data_dir=str(PROFILE_DIR),
        headless=False,
        viewport={"width": width, "height": height},
        user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/131.0.0.0 Safari/537.36"
        ),
        locale="en-US",
        timezone_id="Asia/Kolkata",
        args=["--disable-blink-features=AutomationControlled"],
    )
    if record_dir is not None:
        kwargs["record_video_dir"] = str(record_dir)
        kwargs["record_video_size"] = {"width": width, "height": height}
    return p.chromium.launch_persistent_context(**kwargs)


def grab_x_takes() -> int:
    X_TAKES.mkdir(parents=True, exist_ok=True)
    # Targeted searches — breaking Vercel breach angles
    searches = [
        ("Vercel breach Context AI OAuth", "take_1.png"),
        ("Vercel security incident sensitive environment variables", "take_2.png"),
        ("revoke OAuth AI apps Google Workspace", "take_3.png"),
    ]

    with sync_playwright() as p:
        ctx = _launch(p)
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
                page.wait_for_timeout(1800)
                tweet = page.query_selector("article[data-testid='tweet']")
                if not tweet:
                    print(f"  no tweet found for '{query}'")
                    continue
                tweet.screenshot(path=str(X_TAKES / outname))
                print(f"  saved -> {X_TAKES / outname}")
            except PWTimeout:
                print(f"  timeout on '{query}'")
            except Exception as e:
                print(f"  error: {type(e).__name__}: {e}")

        ctx.close()
    captured = len(list(X_TAKES.glob("take_*.png")))
    print(f"\n[x] done. {captured}/3 takes captured in {X_TAKES}")
    return 0 if captured >= 2 else 1


def grab_kb_video(duration_s: int = 10) -> int:
    KB_OUT.mkdir(parents=True, exist_ok=True)
    for stale in KB_OUT.glob("*.webm"):
        stale.unlink()

    with sync_playwright() as p:
        ctx = _launch(p, width=1280, height=800, record_dir=KB_OUT)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        print("[kb] opening vercel.com/kb/bulletin/vercel-april-2026-security-incident")
        try:
            page.goto(
                "https://vercel.com/kb/bulletin/vercel-april-2026-security-incident",
                wait_until="commit",
                timeout=60000,
            )
        except PWTimeout:
            print("[kb] commit timeout — proceeding with partial load")
        page.wait_for_timeout(6000)
        # Kill cookie banners / any floating widgets
        page.evaluate(
            "() => document.querySelectorAll('[class*=cookie i],[id*=cookie i],"
            "[class*=banner i]').forEach(e => e.style.display='none')"
        )
        # Smooth scroll top -> bottom so the whole incident body is visible
        body_height = page.evaluate("() => document.body.scrollHeight")
        print(f"[kb] body height = {body_height}px, scrolling over {duration_s}s")
        steps = 40
        interval = duration_s / steps
        for i in range(steps + 1):
            y = int(min(body_height, 3600) * i / steps)
            page.evaluate(f"window.scrollTo({{top: {y}, behavior: 'instant'}})")
            page.wait_for_timeout(int(interval * 1000))
        # Also grab a full-page still
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        page.screenshot(path=str(KB_OUT / "vercel_kb_hero.png"), full_page=False)
        ctx.close()

    webms = list(KB_OUT.glob("*.webm"))
    if not webms:
        print("[kb] ERROR: no webm produced")
        return 1
    webm = webms[0]
    out_mp4 = KB_OUT / "vercel_kb.mp4"
    subprocess.run(
        [str(FFMPEG), "-y", "-loglevel", "error", "-i", str(webm),
         "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", str(out_mp4)],
        check=True,
    )
    webm.unlink()
    print(f"[kb] saved -> {out_mp4} ({out_mp4.stat().st_size / 1024 / 1024:.1f} MB)")
    return 0


def grab_gperms() -> int:
    GPERMS_OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = _launch(p, width=1280, height=900)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        print("[gperms] opening myaccount.google.com/permissions")
        try:
            page.goto(
                "https://myaccount.google.com/permissions",
                wait_until="domcontentloaded",
                timeout=30000,
            )
            page.wait_for_timeout(3500)
            page.screenshot(path=str(GPERMS_OUT / "permissions.png"), full_page=True)
            print(f"[gperms] saved -> {GPERMS_OUT / 'permissions.png'}")
        except Exception as e:
            print(f"[gperms] failed: {type(e).__name__}: {e}")
            ctx.close()
            return 1
        ctx.close()
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--x", action="store_true")
    ap.add_argument("--kb", action="store_true")
    ap.add_argument("--gperms", action="store_true")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    if not (args.x or args.kb or args.gperms or args.all):
        print("No capture selected. Use --x, --kb, --gperms, or --all.")
        return 1

    rc = 0
    if args.all or args.kb:
        rc |= grab_kb_video()
    if args.all or args.x:
        rc |= grab_x_takes()
    if args.all or args.gperms:
        rc |= grab_gperms()
    return rc


if __name__ == "__main__":
    sys.exit(main())
