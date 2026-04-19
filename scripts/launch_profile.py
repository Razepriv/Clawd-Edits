#!/usr/bin/env python3
"""
Launch Chromium pointed at the dedicated .playwright-profile/ directory.

Purpose: the user logs into their accounts (X / Canva / Gmail / Anthropic /
Claude / etc.) ONCE in this browser. Subsequent automated scrapes reuse the
cookies so we don't have to re-auth.

Usage:
    python scripts/launch_profile.py

Then in the browser that opens:
  1. Sign into X / Twitter
  2. Sign into Canva (canva.com)
  3. Optional: sign into Gmail, Anthropic, Claude, any other platform you'll
     want the agent to scrape later.

Close the browser window when you're done. The cookies persist.

Related: scripts/grab_proofs.py (once profile is set up) automates the
actual screenshot captures using this profile.
"""
from __future__ import annotations
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

PROFILE_DIR = Path(r"D:/video editor/.playwright-profile")


def main() -> int:
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[launch_profile] opening Chromium with profile at:\n  {PROFILE_DIR}\n")
    print("  LOG IN to the accounts you want the agent to reuse:")
    print("    - x.com / twitter.com")
    print("    - canva.com")
    print("    - (optional) gmail, anthropic.com, claude.ai, claude.com")
    print("\n  When you're done, CLOSE the browser window.")
    print("  Cookies persist in the profile dir; next run will reuse them.\n")

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            viewport={"width": 1280, "height": 900},
            # Reasonable defaults so sites don't flag us aggressively.
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/131.0.0.0 Safari/537.36"
            ),
            locale="en-US",
            timezone_id="Asia/Kolkata",
            # Slight anti-automation masking (less likely to trip bot checks
            # on X / Google when a real human is logging in).
            args=[
                "--disable-blink-features=AutomationControlled",
                "--start-maximized",
            ],
        )
        # Open a friendly landing page so user knows where to go
        page = context.pages[0] if context.pages else context.new_page()
        page.goto("https://x.com/login")

        print("[launch_profile] Browser open. Press Ctrl+C in this terminal")
        print("                 or close the browser window when done.\n")

        try:
            # Wait for user to close the browser manually.
            # Playwright's persistent context will block until the last page
            # is closed or context.close() is called.
            page.wait_for_event("close", timeout=0)
        except KeyboardInterrupt:
            print("\n[launch_profile] user interrupted, closing context...")
        except Exception as e:
            print(f"\n[launch_profile] wait ended: {type(e).__name__}")
        finally:
            try:
                context.close()
            except Exception:
                pass

    # Summary of what landed in the profile
    cookies_file = PROFILE_DIR / "Default" / "Cookies"
    if cookies_file.exists():
        size_kb = cookies_file.stat().st_size / 1024
        print(f"\n[launch_profile] profile saved: {cookies_file} ({size_kb:.1f} KB)")
    else:
        print("\n[launch_profile] warning: no Cookies file found in profile dir")

    print("[launch_profile] done. Tell the agent you're ready.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
