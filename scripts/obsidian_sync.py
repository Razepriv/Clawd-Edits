#!/usr/bin/env python3
"""
Push a local markdown file to the Obsidian vault via the Local REST API.

Usage:
    python scripts/obsidian_sync.py <local_md_path> <vault_relative_path>
    python scripts/obsidian_sync.py --delete <vault_relative_path>
    python scripts/obsidian_sync.py --list

Env:
    OBSIDIAN_API_KEY  (falls back to the hard-coded key set during setup)
    OBSIDIAN_BASE_URL (default https://127.0.0.1:27124)
"""
from __future__ import annotations

import argparse
import os
import sys
import urllib.parse
from pathlib import Path

import requests
import urllib3
from dotenv import load_dotenv

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv(Path(r"D:\video editor\.env"))


def api_key() -> str:
    key = os.environ.get("OBSIDIAN_API_KEY")
    if not key:
        raise RuntimeError(
            "OBSIDIAN_API_KEY not set. Put it in .env (see .env.example) or "
            "export it in the shell before running."
        )
    return key


def base_url() -> str:
    return os.environ.get("OBSIDIAN_BASE_URL", "https://127.0.0.1:27124")


def headers(content_type: str = "text/markdown") -> dict[str, str]:
    return {
        "Authorization": f"Bearer {api_key()}",
        "Content-Type": content_type,
    }


def put_note(vault_path: str, content: str) -> None:
    encoded = urllib.parse.quote(vault_path, safe="/")
    url = f"{base_url()}/vault/{encoded}"
    resp = requests.put(url, headers=headers(), data=content.encode("utf-8"), verify=False, timeout=30)
    if resp.status_code >= 400:
        print(f"ERROR {resp.status_code}: {resp.text[:500]}", file=sys.stderr)
        sys.exit(1)
    print(f"  ✓ {vault_path}", file=sys.stderr)


def delete_note(vault_path: str) -> None:
    encoded = urllib.parse.quote(vault_path, safe="/")
    url = f"{base_url()}/vault/{encoded}"
    resp = requests.delete(url, headers=headers(), verify=False, timeout=30)
    print(f"  delete {vault_path}: {resp.status_code}", file=sys.stderr)


def list_vault(folder: str = "") -> None:
    encoded = urllib.parse.quote(folder, safe="/")
    url = f"{base_url()}/vault/{encoded}"
    resp = requests.get(url, headers=headers(), verify=False, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    for f in data.get("files", []):
        print(f)


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("source_or_flag", nargs="?")
    p.add_argument("target", nargs="?")
    p.add_argument("--delete", action="store_true")
    p.add_argument("--list", action="store_true")
    p.add_argument("--folder", default="")
    args = p.parse_args()

    if args.list:
        list_vault(args.folder)
        return 0

    if args.delete:
        if not args.source_or_flag:
            p.error("--delete needs a vault path")
        delete_note(args.source_or_flag)
        return 0

    if not args.source_or_flag or not args.target:
        p.error("need <local_md_path> <vault_relative_path>")

    src = Path(args.source_or_flag)
    content = src.read_text(encoding="utf-8")
    put_note(args.target, content)
    return 0


if __name__ == "__main__":
    sys.exit(main())
