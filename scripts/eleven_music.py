#!/usr/bin/env python3
"""
ElevenLabs Music API wrapper. Generates an instrumental track from a prompt.

Usage:
    python scripts/eleven_music.py \\
        --prompt "Lo-fi trap instrumental, sparse kick, sub bass, 88 BPM half-time, modern hip-hop, no vocals, ducked mood for voiceover" \\
        --duration-ms 31000 \\
        --output "remotion-studio/public/music_bed.mp3"
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

DEFAULT_ENV = Path("D:/video editor/.env")
API_URL = "https://api.elevenlabs.io/v1/music"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--prompt", required=True, help="Music description / composition plan prompt")
    p.add_argument("--output", required=True, help="Output MP3 path")
    p.add_argument("--duration-ms", type=int, default=30000, help="Length in ms (10k–300k)")
    p.add_argument("--model", default="music_v1", help="Model ID")
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
        "prompt": args.prompt,
        "music_length_ms": args.duration_ms,
        "model_id": args.model,
    }
    print(f"Requesting {args.duration_ms}ms music from ElevenLabs ({args.model})", file=sys.stderr)
    resp = requests.post(
        API_URL,
        headers={"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
        json=body,
        timeout=600,
        stream=True,
    )
    if resp.status_code != 200:
        print(f"ERROR {resp.status_code}: {resp.text[:500]}", file=sys.stderr)
        return 1

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with open(output, "wb") as fh:
        for chunk in resp.iter_content(chunk_size=1 << 16):
            if chunk:
                fh.write(chunk)
    print(f"Saved → {output} ({output.stat().st_size / 1024:.1f} KB)", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
