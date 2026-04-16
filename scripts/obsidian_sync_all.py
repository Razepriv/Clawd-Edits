#!/usr/bin/env python3
"""Batch-push every markdown note under _audit/obsidian_seed/ into the Obsidian
vault via the Local REST API. Safe to re-run: overwrites existing notes with
the on-disk version.

Preconditions:
  - Obsidian is open.
  - Local REST API plugin is running on https://127.0.0.1:27124 (or the URL set
    in $OBSIDIAN_BASE_URL).
  - $OBSIDIAN_API_KEY is set in .env or env (falls back to the session key in
    obsidian_sync.py if missing).

Usage:
    python scripts/obsidian_sync_all.py
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

SEED = Path(r"D:/video editor/_audit/obsidian_seed")
SCRIPT = Path(r"D:/video editor/scripts/obsidian_sync.py")


def main() -> int:
    if not SEED.exists():
        print(f"seed dir missing: {SEED}", file=sys.stderr)
        return 1

    md_files = sorted(SEED.rglob("*.md"))
    print(f"Pushing {len(md_files)} notes from {SEED} → vault root…")

    failures: list[str] = []
    for f in md_files:
        vault_path = f.relative_to(SEED).as_posix()  # preserves folder structure
        result = subprocess.run(
            [sys.executable, str(SCRIPT), str(f), vault_path],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            failures.append(vault_path)
            print(f"  FAIL {vault_path}: {result.stderr.strip().splitlines()[-1] if result.stderr else 'unknown'}")
        else:
            print(f"  OK   {vault_path}")

    if failures:
        print(f"\n{len(failures)} note(s) failed:", file=sys.stderr)
        for v in failures:
            print(f"  - {v}", file=sys.stderr)
        return 2
    print(f"\nAll {len(md_files)} notes synced.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
