#!/usr/bin/env python3
"""
Veo 3 long-running prediction wrapper.

Submits a text-to-video (optionally image-to-video) generation to Google's
Gemini API Veo 3 endpoint, polls the operation until done, downloads the
resulting MP4, and prints its local path.

Requires GOOGLE_API_KEY env var (loads from D:/video editor/.env by default).

Usage
-----
Generate a 6s green-screen RGB-glitch asset, 9:16, save under assets/:

    python scripts/veo.py \\
        --prompt "1-second chromatic aberration glitch transition, red channel \\
                 shifts left, blue shifts right, horizontal scanline \\
                 distortion, white noise burst. Pure chroma-green \\
                 #00ff00 background, no subjects, crisp alpha edges" \\
        --aspect 9:16 \\
        --duration 6 \\
        --model veo-3.0-fast-generate-001 \\
        --output "D:/video editor/assets/transitions/rgb_glitch_01.mp4"

Dry-run (no API call, prints the request body that would be sent):

    python scripts/veo.py --prompt "..." --dry-run
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import requests
from dotenv import load_dotenv

DEFAULT_ENV = Path("D:/video editor/.env")
API_BASE = "https://generativelanguage.googleapis.com/v1beta"
DEFAULT_MODEL = "veo-3.0-fast-generate-001"
POLL_INTERVAL_S = 10
POLL_TIMEOUT_S = 600


@dataclass(frozen=True)
class VeoResult:
    local_path: Path
    operation_name: str
    remote_uri: str
    duration_seconds: int
    aspect_ratio: str
    model: str


def _api_key() -> str:
    key = os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise RuntimeError(
            "GOOGLE_API_KEY not set. Add it to .env or export it in your shell."
        )
    return key


def submit(
    prompt: str,
    model: str,
    aspect_ratio: str,
    duration_seconds: int,
    sample_count: int,
    negative_prompt: str | None,
    person_generation: str,
    image_path: Path | None,
) -> str:
    """Submit a Veo generation request. Returns the operation name."""
    url = f"{API_BASE}/models/{model}:predictLongRunning"
    instance: dict = {"prompt": prompt}
    if image_path is not None:
        import base64

        with open(image_path, "rb") as fh:
            b64 = base64.b64encode(fh.read()).decode("ascii")
        instance["image"] = {
            "bytesBase64Encoded": b64,
            "mimeType": _guess_image_mime(image_path),
        }

    parameters: dict = {
        "aspectRatio": aspect_ratio,
        "durationSeconds": duration_seconds,
        "sampleCount": sample_count,
        "personGeneration": person_generation,
    }
    if negative_prompt:
        parameters["negativePrompt"] = negative_prompt

    body = {"instances": [instance], "parameters": parameters}
    resp = requests.post(
        url,
        headers={"x-goog-api-key": _api_key(), "Content-Type": "application/json"},
        json=body,
        timeout=60,
    )
    resp.raise_for_status()
    data = resp.json()
    operation_name = data.get("name")
    if not operation_name:
        raise RuntimeError(f"No operation name in response: {data}")
    return operation_name


def poll(operation_name: str, interval_s: int = POLL_INTERVAL_S, timeout_s: int = POLL_TIMEOUT_S) -> dict:
    """Poll operation until done, returning the response payload."""
    url = f"{API_BASE}/{operation_name}"
    start = time.time()
    while True:
        resp = requests.get(url, headers={"x-goog-api-key": _api_key()}, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if data.get("done"):
            if "error" in data:
                raise RuntimeError(f"Veo operation failed: {data['error']}")
            return data.get("response", {})
        if time.time() - start > timeout_s:
            raise TimeoutError(
                f"Polling exceeded {timeout_s}s for {operation_name}"
            )
        elapsed = int(time.time() - start)
        print(f"  poll {elapsed}s … still generating", file=sys.stderr)
        time.sleep(interval_s)


def download(response_payload: dict, output_path: Path) -> tuple[Path, str]:
    """Download the first generated sample to output_path. Returns (local_path, remote_uri)."""
    samples: list = (
        response_payload.get("generateVideoResponse", {}).get("generatedSamples")
        or response_payload.get("generatedSamples")
        or []
    )
    if not samples:
        raise RuntimeError(f"No generated samples in response: {response_payload}")
    video = samples[0].get("video", {})
    uri = video.get("uri")
    if not uri:
        raise RuntimeError(f"Sample has no video.uri: {samples[0]}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    # The returned URI is behind API-key auth; use x-goog-api-key header.
    resp = requests.get(
        uri,
        headers={"x-goog-api-key": _api_key()},
        stream=True,
        timeout=600,
    )
    resp.raise_for_status()
    with open(output_path, "wb") as fh:
        for chunk in resp.iter_content(chunk_size=1 << 20):
            if chunk:
                fh.write(chunk)
    return output_path, uri


def generate(
    prompt: str,
    output_path: Path,
    model: str = DEFAULT_MODEL,
    aspect_ratio: str = "9:16",
    duration_seconds: int = 6,
    sample_count: int = 1,
    negative_prompt: str | None = None,
    person_generation: str = "allow_all",
    image_path: Path | None = None,
) -> VeoResult:
    operation_name = submit(
        prompt=prompt,
        model=model,
        aspect_ratio=aspect_ratio,
        duration_seconds=duration_seconds,
        sample_count=sample_count,
        negative_prompt=negative_prompt,
        person_generation=person_generation,
        image_path=image_path,
    )
    print(f"Submitted → {operation_name}", file=sys.stderr)
    response_payload = poll(operation_name)
    local, remote = download(response_payload, output_path)
    return VeoResult(
        local_path=local,
        operation_name=operation_name,
        remote_uri=remote,
        duration_seconds=duration_seconds,
        aspect_ratio=aspect_ratio,
        model=model,
    )


def _guess_image_mime(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in (".jpg", ".jpeg"):
        return "image/jpeg"
    if ext == ".png":
        return "image/png"
    if ext == ".webp":
        return "image/webp"
    raise ValueError(f"Unsupported image extension: {ext}")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--prompt", required=True, help="Text prompt describing the video")
    p.add_argument("--output", required=True, help="Local MP4 path to save the result")
    p.add_argument("--model", default=DEFAULT_MODEL,
                   choices=["veo-2.0-generate-001", "veo-3.0-generate-001", "veo-3.0-fast-generate-001",
                            "veo-3.1-generate-preview", "veo-3.1-fast-generate-preview", "veo-3.1-lite-generate-preview"],
                   help="Model ID")
    p.add_argument("--aspect", default="9:16", choices=["9:16", "16:9", "1:1"], help="Aspect ratio")
    p.add_argument("--duration", type=int, default=6, help="Duration seconds (Veo 3 supports 4-8)")
    p.add_argument("--sample-count", type=int, default=1, help="Number of samples (1-4)")
    p.add_argument("--negative-prompt", default=None, help="Things to avoid in generation")
    p.add_argument("--person-generation", default="allow_all",
                   choices=["dont_allow", "allow_adult", "allow_all"], help="Person generation policy")
    p.add_argument("--image", default=None, help="Optional input image (image-to-video)")
    p.add_argument("--env", default=str(DEFAULT_ENV), help=".env file path")
    p.add_argument("--dry-run", action="store_true", help="Print request body, don't call API")
    p.add_argument("--json", action="store_true", help="Emit JSON result to stdout")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    env_path = Path(args.env)
    if env_path.exists():
        load_dotenv(env_path)

    if args.dry_run:
        body = {
            "instances": [{"prompt": args.prompt}],
            "parameters": {
                "aspectRatio": args.aspect,
                "durationSeconds": args.duration,
                "sampleCount": args.sample_count,
                "personGeneration": args.person_generation,
            },
        }
        if args.negative_prompt:
            body["parameters"]["negativePrompt"] = args.negative_prompt
        print(f"POST {API_BASE}/models/{args.model}:predictLongRunning")
        print(json.dumps(body, indent=2))
        return 0

    try:
        result = generate(
            prompt=args.prompt,
            output_path=Path(args.output),
            model=args.model,
            aspect_ratio=args.aspect,
            duration_seconds=args.duration,
            sample_count=args.sample_count,
            negative_prompt=args.negative_prompt,
            person_generation=args.person_generation,
            image_path=Path(args.image) if args.image else None,
        )
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    payload = {
        "local_path": str(result.local_path),
        "operation_name": result.operation_name,
        "remote_uri": result.remote_uri,
        "duration_seconds": result.duration_seconds,
        "aspect_ratio": result.aspect_ratio,
        "model": result.model,
    }
    if args.json:
        print(json.dumps(payload, indent=2))
    else:
        print(f"Saved → {result.local_path}", file=sys.stderr)
        print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
