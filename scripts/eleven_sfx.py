#!/usr/bin/env python3
"""
ElevenLabs Sound Effects API wrapper. Generates a short SFX from a text prompt.

Usage:
    python scripts/eleven_sfx.py \\
        --prompt "Quick whoosh, synth sweep, 0.3 seconds, modern UI transition" \\
        --duration 0.4 \\
        --output "remotion-studio/public/sfx/whoosh.mp3"
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

DEFAULT_ENV = Path("D:/video editor/.env")
API_URL = "https://api.elevenlabs.io/v1/sound-generation"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--prompt", required=True, help="Sound effect description")
    p.add_argument("--output", required=True, help="Output MP3 path")
    p.add_argument("--duration", type=float, default=1.0, help="Duration in seconds (0.5–22.0)")
    p.add_argument("--prompt-influence", type=float, default=0.3,
                   help="Prompt adherence 0–1 (lower=more creative, higher=more literal)")
    p.add_argument("--env", default=str(DEFAULT_ENV), help=".env file path")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    env_path = Path(args.env)
    if env_path.exists():
        load_dotenv(env_path)

    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        print("ERROR: ELEVENLABS_API_KEY not set", file=sys.stderr)
        return 1

    body = {
        "text": args.prompt,
        "duration_seconds": args.duration,
        "prompt_influence": args.prompt_influence,
    }
    print(f"SFX ({args.duration}s): {args.prompt[:60]}...", file=sys.stderr)
    resp = requests.post(
        API_URL,
        headers={"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        json=body,
        timeout=300,
        stream=True,
    )
    if resp.status_code != 200:
        print(f"ERROR {resp.status_code}: {resp.text[:400]}", file=sys.stderr)
        return 1

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with open(output, "wb") as fh:
        for chunk in resp.iter_content(chunk_size=1 << 16):
            if chunk:
                fh.write(chunk)
    print(f"Saved {output} ({output.stat().st_size / 1024:.1f} KB)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
