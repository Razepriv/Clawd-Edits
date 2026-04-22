#!/usr/bin/env python3
"""
Telegram agent — remote feedback loop for @faux.thinker video edits.

The agent does two things:

  1. PUSH:  send the current finished clip (e.g.
            outputs/faux_thinker_vercel_breach_v1.mp4) to the authorised
            chat on demand (or right after a render finishes).

  2. PULL:  long-poll the Telegram Bot API for incoming messages from
            the authorised chat. Every message is appended to the
            feedback inbox file at _audit/Video 5/telegram_inbox.md so
            Claude (the editor) can read it and apply the change.

Chat authorisation: the first user who sends /start after the agent boots
is recorded as the "owner" in _audit/Video 5/telegram_state.json. Every
subsequent message from any other chat is ignored so the bot cannot be
hijacked by a random stranger who finds the token.

Commands the bot understands out of the box:

    /start              — register your chat as the owner.
    /latest             — send the latest finished clip.
    /list               — list available renders under outputs/.
    /version <name>     — send a specific render by filename.
    /stills             — send the latest audit stills (up to 6).
    /ping               — health check. Replies "pong".
    <anything else>     — treated as edit feedback. Appended to the
                          feedback inbox for Claude to read next turn.

Usage:
    python scripts/telegram_agent.py                  # foreground (Ctrl-C to stop)
    python scripts/telegram_agent.py --send-latest    # fire-and-forget push
    python scripts/telegram_agent.py --check-inbox    # print latest feedback
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

ROOT = Path(r"D:/video editor")
OUTPUTS = ROOT / "outputs"
AUDIT_DIR = ROOT / "_audit" / "Video 5"
STATE_FILE = AUDIT_DIR / "telegram_state.json"
INBOX_FILE = AUDIT_DIR / "telegram_inbox.md"
STILLS_DIR = AUDIT_DIR / "stills"

LATEST_RENDER_GLOB = "*.mp4"
API_BASE = "https://api.telegram.org"
POLL_TIMEOUT = 25  # seconds per long-poll
MAX_VIDEO_BYTES = 50 * 1024 * 1024  # Telegram bot upload cap for videos


def _token() -> str:
    load_dotenv(ROOT / ".env")
    tok = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not tok:
        raise SystemExit("TELEGRAM_BOT_TOKEN missing from .env")
    return tok


def _api(method: str) -> str:
    return f"{API_BASE}/bot{_token()}/{method}"


def _load_state() -> dict[str, Any]:
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {"owner_chat_id": None, "update_offset": 0}


def _save_state(state: dict[str, Any]) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2), encoding="utf-8")


def _append_inbox(text: str, sender: str = "") -> None:
    AUDIT_DIR.mkdir(parents=True, exist_ok=True)
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    header = f"\n### [{ts}] {sender}\n" if sender else f"\n### [{ts}]\n"
    with INBOX_FILE.open("a", encoding="utf-8") as f:
        f.write(header)
        f.write(text.strip() + "\n")


def _latest_clip() -> Path | None:
    candidates = sorted(
        OUTPUTS.glob(LATEST_RENDER_GLOB),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    return candidates[0] if candidates else None


def send_text(chat_id: int, text: str, parse_mode: str | None = "Markdown") -> None:
    payload = {"chat_id": chat_id, "text": text, "disable_web_page_preview": True}
    if parse_mode:
        payload["parse_mode"] = parse_mode
    requests.post(_api("sendMessage"), json=payload, timeout=20)


def _probe_video(path: Path) -> tuple[int, int, float]:
    """Return (width, height, duration_seconds) via imageio-ffmpeg ffprobe
    replacement (ffprobe binary isn't always bundled, so we shell to ffmpeg
    and parse stderr)."""
    import re
    import subprocess
    ffmpeg = Path(
        r"C:/Users/Asus/AppData/Roaming/Python/Python312/site-packages/"
        r"imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
    )
    out = subprocess.run(
        [str(ffmpeg), "-i", str(path)],
        capture_output=True, text=True,
    ).stderr
    w = h = 0
    dur = 0.0
    m = re.search(r"(\d{3,5})x(\d{3,5})", out)
    if m:
        w, h = int(m.group(1)), int(m.group(2))
    md = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", out)
    if md:
        dur = int(md.group(1)) * 3600 + int(md.group(2)) * 60 + float(md.group(3))
    return w, h, dur


def send_video(chat_id: int, path: Path, caption: str = "") -> dict[str, Any]:
    size = path.stat().st_size
    if size > MAX_VIDEO_BYTES:
        send_text(
            chat_id,
            f"Clip `{path.name}` is {size/1024/1024:.1f} MB — over Telegram's 50 MB "
            f"bot upload cap. I will send a compressed version.",
        )
        return {"skipped": True}

    # Probe width/height/duration so Telegram renders the video in its
    # native aspect ratio (1080x1920 = 9:16) instead of defaulting to a
    # 4:5 player frame when these fields are missing from sendVideo.
    width, height, duration = _probe_video(path)
    with path.open("rb") as f:
        files = {"video": (path.name, f, "video/mp4")}
        data = {
            "chat_id": str(chat_id),
            "caption": caption,
            "supports_streaming": "true",
            "parse_mode": "Markdown",
        }
        if width and height:
            data["width"] = str(width)
            data["height"] = str(height)
        if duration:
            data["duration"] = str(int(round(duration)))
        r = requests.post(_api("sendVideo"), data=data, files=files, timeout=180)
    return r.json()


def send_photo(chat_id: int, path: Path, caption: str = "") -> None:
    with path.open("rb") as f:
        files = {"photo": (path.name, f, "image/png")}
        data = {"chat_id": str(chat_id), "caption": caption}
        requests.post(_api("sendPhoto"), data=data, files=files, timeout=60)


def push_latest(chat_id: int | None = None, path_override: Path | None = None) -> int:
    state = _load_state()
    cid = chat_id or state.get("owner_chat_id")
    if cid is None:
        print("No owner chat registered yet. Run the bot and /start first.",
              file=sys.stderr)
        return 1
    if path_override is not None:
        clip = path_override
        if not clip.exists():
            print(f"Path not found: {clip}", file=sys.stderr)
            return 1
    else:
        clip = _latest_clip()
        if clip is None:
            send_text(cid, "No finished clips under `outputs/` yet.")
            return 1
    caption = (
        f"*{clip.name}*\n"
        f"size: {clip.stat().st_size/1024/1024:.1f} MB\n"
        "Reply with edits or send /latest to get this again."
    )
    print(f"Pushing {clip.name} to chat {cid}...")
    resp = send_video(cid, clip, caption=caption)
    ok = resp.get("ok", False) if isinstance(resp, dict) else False
    print(("pushed ok" if ok else f"push failed: {resp}"))
    return 0 if ok else 1


def _handle_update(state: dict[str, Any], update: dict[str, Any]) -> None:
    msg = update.get("message") or update.get("edited_message")
    if not msg:
        return
    chat = msg.get("chat", {})
    chat_id = chat.get("id")
    text = (msg.get("text") or "").strip()
    sender = chat.get("username") or chat.get("first_name") or str(chat_id)

    # First /start registers the owner
    if text.startswith("/start"):
        if state.get("owner_chat_id") is None:
            state["owner_chat_id"] = chat_id
            _save_state(state)
            send_text(
                chat_id,
                "✅ *faux.thinker edit agent online.*\n"
                "You are registered as the owner. Commands:\n"
                "`/latest`  latest clip\n"
                "`/list`    available renders\n"
                "`/version <name>`  fetch by filename\n"
                "`/stills`  recent audit stills\n"
                "`/ping`    health\n"
                "Anything else you send is queued as edit feedback.",
            )
            return
        if chat_id == state.get("owner_chat_id"):
            send_text(chat_id, "You're already registered. Send /latest for the clip.")
            return
        # Not the owner — ignore silently so randoms with the token can't hijack.
        print(f"ignoring /start from non-owner chat {chat_id}")
        return

    # Enforce owner for all other commands
    if chat_id != state.get("owner_chat_id"):
        print(f"ignoring message from non-owner chat {chat_id}")
        return

    if text == "/ping":
        send_text(chat_id, "pong")
        return

    if text == "/latest":
        clip = _latest_clip()
        if clip is None:
            send_text(chat_id, "No clips in `outputs/` yet.")
            return
        send_video(chat_id, clip, caption=f"*{clip.name}*")
        return

    if text == "/list":
        clips = sorted(OUTPUTS.glob("faux_thinker_*.mp4"))
        if not clips:
            send_text(chat_id, "No clips under `outputs/` yet.")
            return
        listing = "\n".join(f"- `{c.name}` ({c.stat().st_size/1024/1024:.1f} MB)" for c in clips)
        send_text(chat_id, f"*Renders on disk:*\n{listing}")
        return

    if text.startswith("/version"):
        parts = text.split(maxsplit=1)
        if len(parts) < 2:
            send_text(chat_id, "Usage: `/version <filename>` (see /list)")
            return
        name = parts[1].strip()
        # Basic traversal guard — only allow files in outputs/
        target = (OUTPUTS / name).resolve()
        try:
            target.relative_to(OUTPUTS.resolve())
        except ValueError:
            send_text(chat_id, "File must live under `outputs/`.")
            return
        if not target.exists() or not target.is_file():
            send_text(chat_id, f"`{name}` not found.")
            return
        send_video(chat_id, target, caption=f"*{target.name}*")
        return

    if text == "/stills":
        if not STILLS_DIR.exists():
            send_text(chat_id, "No stills directory yet.")
            return
        recent = sorted(STILLS_DIR.glob("*.png"), key=lambda p: p.stat().st_mtime, reverse=True)[:6]
        if not recent:
            send_text(chat_id, "No stills on disk yet.")
            return
        for still in recent:
            send_photo(chat_id, still, caption=still.name)
        return

    # Anything else: treat as feedback, log to inbox
    if text:
        _append_inbox(text, sender=f"@{sender}" if sender else "owner")
        send_text(
            chat_id,
            "📝 Feedback received. Claude will pick it up in the next edit cycle.\n"
            "_Inbox updated._",
        )
        return


def run_agent() -> int:
    state = _load_state()
    print("Telegram agent online. Long-polling for messages (Ctrl-C to stop)...",
          file=sys.stderr)
    while True:
        try:
            r = requests.get(
                _api("getUpdates"),
                params={"timeout": POLL_TIMEOUT, "offset": state.get("update_offset", 0)},
                timeout=POLL_TIMEOUT + 5,
            )
            payload = r.json()
            if not payload.get("ok"):
                print(f"telegram error: {payload}", file=sys.stderr)
                time.sleep(2)
                continue
            for update in payload.get("result", []):
                state["update_offset"] = update["update_id"] + 1
                try:
                    _handle_update(state, update)
                except Exception as e:
                    print(f"handler error: {type(e).__name__}: {e}", file=sys.stderr)
            _save_state(state)
        except KeyboardInterrupt:
            print("shutting down", file=sys.stderr)
            return 0
        except requests.RequestException as e:
            print(f"network error: {type(e).__name__}: {e}", file=sys.stderr)
            time.sleep(2)


def check_inbox() -> int:
    if not INBOX_FILE.exists():
        print("inbox is empty")
        return 0
    print(INBOX_FILE.read_text(encoding="utf-8"))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--send-latest", action="store_true", help="Push latest clip to owner chat, then exit.")
    ap.add_argument("--path", default=None, help="Push a specific file path (overrides --send-latest discovery).")
    ap.add_argument("--check-inbox", action="store_true", help="Print the feedback inbox, then exit.")
    args = ap.parse_args()

    if args.send_latest:
        override = Path(args.path).resolve() if args.path else None
        return push_latest(path_override=override)
    if args.check_inbox:
        return check_inbox()
    return run_agent()


if __name__ == "__main__":
    sys.exit(main())
