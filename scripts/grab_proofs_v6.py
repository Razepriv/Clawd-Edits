#!/usr/bin/env python3
"""
Copilot-training-reel proof capture. Uses the persistent Playwright profile.

Proofs for Video 6:
  1. GitHub changelog post (public)                  -> public/github_copilot/changelog.png
  2. GitHub Copilot settings — Privacy toggle        -> public/github_copilot/settings.png (REQUIRES LOGIN)
  3. Optional: toggle flip video                     -> public/github_copilot/toggle_flip.mp4
  4. 3 X takes on the policy                         -> public/x_takes_v6/take_{1,2,3}.png
  5. HN thread                                       -> public/github_copilot/hn.png (public)

Usage:
    python scripts/grab_proofs_v6.py --auth-check    # verify which sites are logged in
    python scripts/grab_proofs_v6.py --gh-public     # changelog + HN (no login needed)
    python scripts/grab_proofs_v6.py --gh-settings   # settings toggle (REQUIRES LOGIN)
    python scripts/grab_proofs_v6.py --x             # X hot-takes
    python scripts/grab_proofs_v6.py --all           # everything
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
GH_OUT = PUBLIC / "github_copilot"
X_OUT = PUBLIC / "x_takes_v6"


def launch(p, record_dir: Path | None = None, viewport=None):
    kwargs = {
        "user_data_dir": str(PROFILE_DIR),
        "headless": False,
        "viewport": viewport or {"width": 1280, "height": 1600},
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
        kwargs["record_video_size"] = {"width": viewport["width"], "height": viewport["height"]} if viewport else {"width": 1280, "height": 1600}
    return p.chromium.launch_persistent_context(**kwargs)


def auth_check() -> int:
    results = []
    with sync_playwright() as p:
        ctx = launch(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        for site, url, success_marker in [
            ("github.com", "https://github.com/settings/copilot",
             lambda u: "/login" not in u and "/settings/copilot" in u),
            ("x.com", "https://x.com/home", lambda u: "/login" not in u and "/i/flow" not in u),
        ]:
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=25000)
                page.wait_for_timeout(2500)
                cur = page.url
                if success_marker(cur):
                    results.append((site, f"logged in (landed at {cur[:90]})"))
                else:
                    results.append((site, f"NOT logged in ({cur[:90]})"))
            except Exception as e:
                results.append((site, f"error: {type(e).__name__}: {e}"))
        ctx.close()

    print("\n=== AUTH CHECK RESULTS ===")
    for site, status in results:
        icon = "OK  " if "logged in" in status else "FAIL"
        print(f"  [{icon}] {site:<14} {status}")
    print()
    return 0 if all("logged in" in s for _, s in results) else 1


def grab_gh_public() -> int:
    GH_OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = launch(p, viewport={"width": 1280, "height": 1920})
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        # Changelog post
        print("[gh] capturing changelog...")
        page.goto(
            "https://github.blog/changelog/2026-03-25-updates-to-our-privacy-statement-and-terms-of-service-how-we-use-your-data/",
            wait_until="domcontentloaded", timeout=30000,
        )
        page.wait_for_timeout(2500)
        # Kill cookie banners
        page.evaluate("""() => document.querySelectorAll('[class*="cookie" i],[id*="cookie" i]').forEach(e=>e.remove())""")
        page.screenshot(path=str(GH_OUT / "changelog.png"), full_page=True)
        print(f"  -> {GH_OUT / 'changelog.png'}")

        # HN thread
        print("[gh] capturing HN thread...")
        page.goto("https://news.ycombinator.com/item?id=47548243",
                  wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(1500)
        page.screenshot(path=str(GH_OUT / "hn.png"))
        print(f"  -> {GH_OUT / 'hn.png'}")
        ctx.close()
    return 0


def grab_gh_settings() -> int:
    GH_OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        ctx = launch(p, viewport={"width": 1280, "height": 1920})
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        print("[gh] opening settings/copilot ...")
        page.goto("https://github.com/settings/copilot",
                  wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(3000)
        if "/login" in page.url:
            print("  FAIL: redirected to login. Run scripts/launch_profile.py and sign in first.",
                  file=sys.stderr)
            ctx.close()
            return 1
        page.screenshot(path=str(GH_OUT / "settings.png"), full_page=True)
        print(f"  -> {GH_OUT / 'settings.png'}")

        # Try to locate the privacy section specifically
        try:
            page.goto("https://github.com/settings/copilot/features",
                      wait_until="domcontentloaded", timeout=20000)
            page.wait_for_timeout(2000)
            page.screenshot(path=str(GH_OUT / "features.png"), full_page=True)
            print(f"  -> {GH_OUT / 'features.png'}")
        except Exception as e:
            print(f"  (features page optional — skip: {type(e).__name__})")
        ctx.close()
    return 0


def grab_x_takes() -> int:
    X_OUT.mkdir(parents=True, exist_ok=True)
    searches = [
        ('"Copilot" "opt out" April 24 training', "take_1.png"),
        ('GitHub Copilot privacy training data opt-out', "take_2.png"),
        ('GitHub Copilot Forgejo Gitea migration', "take_3.png"),
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
                    print(f"  no tweet found")
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
    ap.add_argument("--auth-check", action="store_true")
    ap.add_argument("--gh-public", action="store_true")
    ap.add_argument("--gh-settings", action="store_true")
    ap.add_argument("--x", action="store_true")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    if args.auth_check:
        return auth_check()

    if not (args.gh_public or args.gh_settings or args.x or args.all):
        print("No capture selected.")
        return 1

    rc = 0
    if args.all or args.gh_public:
        rc |= grab_gh_public()
    if args.all or args.gh_settings:
        rc |= grab_gh_settings()
    if args.all or args.x:
        rc |= grab_x_takes()
    return rc


if __name__ == "__main__":
    sys.exit(main())
