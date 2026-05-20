#!/usr/bin/env python3
"""
Minimal Higgsfield API client (V2) for B-roll generation.

Higgsfield's public API exposes:
  - flux-pro/kontext/max/text-to-image  (text -> image)
  - /v1/text2image/soul                  (text -> image, Soul styles)
  - /v1/image2video/dop                  (image -> video, DoP camera moves)

Veo / Kling / Seedance live on the cloud UI but aren't in the public API.
For B-rolls we chain: Flux text-to-image -> DoP image-to-video.

Auth header:  Authorization: Key {KEY_ID}:{KEY_SECRET}
Base URL:     https://platform.higgsfield.ai

Usage:
    python scripts/higgsfield.py txt2img \\
        --prompt "HAL 9000 red lens..." \\
        --aspect 9:16 \\
        --out D:/.../still.png

    python scripts/higgsfield.py img2vid \\
        --image-url <hosted-url-or-path-of-still> \\
        --prompt "slow cinematic dolly in" \\
        --out D:/.../broll.mp4

    python scripts/higgsfield.py broll \\
        --prompt "<image prompt>" \\
        --motion "<camera motion prompt>" \\
        --aspect 9:16 \\
        --out D:/.../broll.mp4
    # ^ chains the two and writes the final mp4
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

BASE = "https://platform.higgsfield.ai"
TIMEOUT = 60
POLL_INTERVAL_S = 5
POLL_MAX_S = 1200  # 20 min — DoP image-to-video can take 5-15 min

DEFAULT_ENV = Path(r"D:/video editor/.env")


def _credentials() -> str:
    load_dotenv(DEFAULT_ENV)
    key_id = os.environ.get("HIGGSFIELD_API_KEY_ID") or os.environ.get("HF_API_KEY")
    secret = os.environ.get("HIGGSFIELD_API_KEY_SECRET") or os.environ.get("HF_SECRET")
    if not (key_id and secret):
        raise SystemExit(
            "Missing HIGGSFIELD_API_KEY_ID / HIGGSFIELD_API_KEY_SECRET in .env"
        )
    return f"{key_id}:{secret}"


def _headers() -> dict[str, str]:
    return {
        "Authorization": f"Key {_credentials()}",
        "Content-Type": "application/json",
        "User-Agent": "faux-thinker-broll/1.0",
    }


def _post(endpoint: str, payload: dict[str, Any]) -> dict[str, Any]:
    url = f"{BASE}/{endpoint.lstrip('/')}"
    print(f"[hf] POST {url}", file=sys.stderr, flush=True)
    r = requests.post(url, json=payload, headers=_headers(), timeout=TIMEOUT)
    if not r.ok:
        print(f"[hf] HTTP {r.status_code}: {r.text[:500]}", file=sys.stderr)
        r.raise_for_status()
    return r.json()


def _get(url: str) -> dict[str, Any]:
    r = requests.get(url, headers=_headers(), timeout=TIMEOUT)
    if not r.ok:
        print(f"[hf] HTTP {r.status_code}: {r.text[:500]}", file=sys.stderr)
        r.raise_for_status()
    return r.json()


def _poll(initial: dict[str, Any]) -> dict[str, Any]:
    """Poll until status == completed / failed / nsfw.

    Two response shapes are supported:
      - flat: { status, request_id, status_url, ... }
      - JobSet: { id, jobs:[{status, results}], input_params, ... }
    Both can be polled via `/requests/{id}/status`."""
    status = initial.get("status")
    if status in ("completed", "failed", "nsfw"):
        return initial
    status_url = initial.get("status_url")
    if not status_url:
        req_id = initial.get("request_id") or initial.get("id")
        if not req_id:
            raise RuntimeError(f"No status_url and no request_id: {initial}")
        status_url = f"{BASE}/requests/{req_id}/status"

    t0 = time.time()
    last_status: str | None = None
    while time.time() - t0 < POLL_MAX_S:
        time.sleep(POLL_INTERVAL_S)
        try:
            data = _get(status_url)
        except requests.HTTPError as e:
            print(f"[hf] poll error: {e}", file=sys.stderr)
            continue
        status = data.get("status")
        if status != last_status:
            print(f"[hf] status={status} ({time.time()-t0:.0f}s)", file=sys.stderr, flush=True)
            last_status = status
        if status in ("completed", "failed", "nsfw"):
            return data
    raise TimeoutError(f"Timed out after {POLL_MAX_S}s waiting for completion")


# ──────────────────────────────────────────────────────────────────────
# Endpoints
# ──────────────────────────────────────────────────────────────────────

def txt2img(prompt: str, aspect_ratio: str = "9:16", seed: int | None = None) -> dict[str, Any]:
    """Flux Pro Kontext text-to-image. Returns the full polled response.

    Note: the live platform.higgsfield.ai endpoint expects a FLAT payload
    (no `input` wrapper, despite what the V2 SDK docs imply)."""
    payload: dict[str, Any] = {
        "prompt": prompt,
        "aspect_ratio": aspect_ratio,
        "safety_tolerance": 2,
    }
    if seed is not None:
        payload["seed"] = seed
    resp = _post("flux-pro/kontext/max/text-to-image", payload)
    return _poll(resp)


def img2vid(
    image_url: str,
    prompt: str = "Slow cinematic dolly in, premium dop motion",
    model: str = "dop-turbo",
) -> dict[str, Any]:
    """DoP image-to-video. `image_url` must be a publicly reachable URL.

    Unlike Flux txt2img (flat), the DoP endpoint requires a `params`
    wrapper around the actual inputs. Returns a JobSet response with
    `id` + `jobs[]`."""
    payload = {
        "params": {
            "model": model,
            "prompt": prompt,
            "input_images": [{"type": "image_url", "image_url": image_url}],
        }
    }
    resp = _post("v1/image2video/dop", payload)
    return _poll(resp)


# ──────────────────────────────────────────────────────────────────────
# Result helpers
# ──────────────────────────────────────────────────────────────────────

def _first_media_url(data: dict[str, Any]) -> str:
    """Best-effort extraction of the result URL across response shapes."""
    # Direct shape: {"video": {"url": ...}} or {"images": [{"url": ...}]}
    if isinstance(data.get("video"), dict) and data["video"].get("url"):
        return data["video"]["url"]
    images = data.get("images")
    if isinstance(images, list) and images and images[0].get("url"):
        return images[0]["url"]
    # JobSet shape: {"jobs": [{"results": {"raw": {"url": ...}}}]}
    jobs = data.get("jobs")
    if isinstance(jobs, list) and jobs:
        results = jobs[0].get("results") or {}
        raw = results.get("raw") or {}
        if raw.get("url"):
            return raw["url"]
    raise RuntimeError(f"Could not find result URL in response: {json.dumps(data)[:500]}")


def _download(url: str, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"[hf] downloading -> {dest}", file=sys.stderr, flush=True)
    r = requests.get(url, timeout=120, stream=True)
    r.raise_for_status()
    with open(dest, "wb") as f:
        for chunk in r.iter_content(1024 * 64):
            f.write(chunk)
    return dest


# ──────────────────────────────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────────────────────────────

def cmd_txt2img(args: argparse.Namespace) -> int:
    data = txt2img(args.prompt, aspect_ratio=args.aspect, seed=args.seed)
    if data.get("status") != "completed":
        print(f"[hf] generation status={data.get('status')}: {data}", file=sys.stderr)
        return 1
    url = _first_media_url(data)
    print(f"[hf] result URL: {url}")
    _download(url, Path(args.out))
    print(args.out)
    return 0


def cmd_img2vid(args: argparse.Namespace) -> int:
    data = img2vid(args.image_url, prompt=args.prompt, model=args.model)
    if data.get("status") != "completed":
        print(f"[hf] generation status={data.get('status')}: {data}", file=sys.stderr)
        return 1
    url = _first_media_url(data)
    print(f"[hf] result URL: {url}")
    _download(url, Path(args.out))
    print(args.out)
    return 0


def cmd_broll(args: argparse.Namespace) -> int:
    """Chain: text -> image (Flux) -> video (DoP). Writes the final MP4."""
    print(f"[broll] step 1/2 — generating still", file=sys.stderr, flush=True)
    still_data = txt2img(args.prompt, aspect_ratio=args.aspect, seed=args.seed)
    if still_data.get("status") != "completed":
        print(f"[broll] still failed status={still_data.get('status')}", file=sys.stderr)
        return 1
    still_url = _first_media_url(still_data)
    print(f"[broll]   still URL: {still_url}", file=sys.stderr)

    # Save the still next to the video for debugging
    still_path = Path(args.out).with_suffix(".png")
    _download(still_url, still_path)

    print(f"[broll] step 2/2 — animating with DoP {args.model}", file=sys.stderr, flush=True)
    vid_data = img2vid(still_url, prompt=args.motion, model=args.model)
    if vid_data.get("status") != "completed":
        print(f"[broll] video failed status={vid_data.get('status')}", file=sys.stderr)
        return 1
    vid_url = _first_media_url(vid_data)
    print(f"[broll]   video URL: {vid_url}", file=sys.stderr)
    _download(vid_url, Path(args.out))
    print(args.out)
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_img = sub.add_parser("txt2img", help="Text-to-image via Flux Pro Kontext")
    p_img.add_argument("--prompt", required=True)
    p_img.add_argument("--aspect", default="9:16")
    p_img.add_argument("--seed", type=int, default=None)
    p_img.add_argument("--out", required=True)
    p_img.set_defaults(fn=cmd_txt2img)

    p_vid = sub.add_parser("img2vid", help="Image-to-video via DoP")
    p_vid.add_argument("--image-url", required=True)
    p_vid.add_argument("--prompt", default="Slow cinematic dolly in")
    p_vid.add_argument("--model", default="dop-turbo", choices=["dop-lite", "dop-turbo", "dop-standard"])
    p_vid.add_argument("--out", required=True)
    p_vid.set_defaults(fn=cmd_img2vid)

    p_br = sub.add_parser("broll", help="Chain text->image->video for a B-roll clip")
    p_br.add_argument("--prompt", required=True, help="Visual prompt for the still frame")
    p_br.add_argument("--motion", default="Slow cinematic dolly in, premium DoP camera move", help="Camera motion prompt")
    p_br.add_argument("--aspect", default="9:16")
    p_br.add_argument("--seed", type=int, default=None)
    p_br.add_argument("--model", default="dop-turbo", choices=["dop-lite", "dop-turbo", "dop-standard"])
    p_br.add_argument("--out", required=True)
    p_br.set_defaults(fn=cmd_broll)

    args = ap.parse_args()
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
