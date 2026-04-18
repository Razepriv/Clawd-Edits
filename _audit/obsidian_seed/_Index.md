---
tags:
  - index
  - faux-thinker
  - video-production
updated: 2026-04-18
---

# faux.thinker Video Production — Knowledge Base

Everything about producing Instagram Reels for **@faux.thinker** lives here. Every decision, every reusable asset, every audited reference style, every finished Reel.

## Maps of content

```dataview
TABLE WITHOUT ID
  file.link as Note,
  file.mtime as Updated
FROM "Brand" OR "Styles Audits" OR "Reels Produced" OR "Pipeline" OR "Assets"
SORT file.mtime DESC
```

## The essentials

- [[Brand/Faux Thinker Style Guide|📐 Style guide]] — every locked decision for faux.thinker Reels. Read this first before editing any Reel.
- [[Brand/Brand Tokens|🎨 Brand tokens]] — colors, fonts, voice.
- [[Pipeline/Render Workflow|⚙️ Render workflow]] — exact steps to produce a new Reel from an uploaded avatar video.
- [[Signature Effect Brief|⭐ Signature effect]] — what makes a faux.thinker Reel recognizable.

## Styles audited (reference material we learn from)

- [[Styles Audits/Devin 1|Devin 1]] — *viral script writer* intro, 69.5 s, purple-magenta brand. **The foundation for our whole style system.** ✅ audited.
- [[Styles Audits/Devin 2|Devin 2]] — *Instagram caption SEO* tutorial, 74.2 s, outdoor+indoor locations, red emphasis captions. ✅ audited.
- [[Styles Audits/Nick 1|Nick 1]] — *Claude Code Skills library announcement*, 44.8 s, minimalist white studio, B-roll-dominant format (12 cuts / 45 s), Submagic dense captions. ✅ audited.
- [[Styles Audits/VC 1|VC 1]] *(Vibecoder)* — *drama-news explainer*, 40.5 s, AI-illustration villain hook + persistent rounded-frame wrapper + series title card + designed CTA card. Most production-designed style. ✅ audited.
- [[Styles Audits/rpn 1|rpn 1]] — *LTX 2.3 generative-product showcase*, 53.9 s, persistent split-screen, B-roll = product's own generated output, highest cut density audited (1 cut / 1.8 s), dual-track retro-pixel + italic-serif captions + giant bold-sans product-name lockup on CTA. ✅ audited.

## Reels produced

- [[Reels Produced/Faux Thinker Intro v12|faux.thinker Intro v12]] — ✅ approved, locked. 31.2 s intro Reel: Razeen introducing WebVerse Arena. 12 iteration versions; v12 is current canonical render.
- [[Reels Produced/faux.thinker Opus 4.7 Launch v2|faux.thinker Opus 4.7 Launch v2]] — ✅ approved (2026-04-17). 79.3 s news-announcement reel on Anthropic's Claude Opus 4.7 release. 6 head-pop-out B-rolls (Anthropic release page / Mythos / Rakuten / Literal / Pricing / Effort chart) + Claudebench 58→70 RevenueChart + 2 emphasis slams + DMToast "Opus" CTA. Facts cross-verified against the actual release page. Added `RevenueChart.growthOnRight` and `EmphasisCaption.yPosition` as backwards-compatible prop extensions.
- [[Reels Produced/faux.thinker Codex Launch v1|faux.thinker Codex Launch v1]] — ✅ approved (2026-04-18). 46.7 s news-opinion reel on OpenAI Codex multi-agent update. **First reel with an AI-generated anime hook clip** (Veo 3 Fast) + **8 brand-new Remotion components** (AnimeHookClip, MultiAgentOrchestra, TerminalAgentSim, SleepCycleOverlay, QuoteSlam, SideProjectBadge, ComparisonCard, CommentPromptCard). QuoteSlam "STAFF" is the new signature treatment for single-word kill-lines. Style guide bumped to v12.2.
- [[Reels Produced/faux.thinker Canva Pipeline v1|faux.thinker Canva Pipeline v1]] — ✅ approved (2026-04-18). 42.2 s contrarian take on Anthropic's Claude Design launch (Apr 17 2026) + Canva integration. Anime hook (tombstone crack + anime-Perkins rising with crystal tablet) + **8 brand-new Remotion components** (DeadTakeStrikethrough, HotTakesFeed, QuoteCard, ExportChipRow, PipelineDiagram, StackShipCard, BrandKitReveal, YearToggleCard). QuoteSlam "PIPELINE" is the signature line. Uses verbatim Perkins CEO quote from the launch page. Style guide bumped to v12.3.

## Pipeline & assets

- [[Pipeline/Render Workflow|Render workflow]]
- [[Pipeline/Matting Workflow|Avatar matting (rembg)]]
- [[Pipeline/Veo 3 Prompt Patterns|Veo 3 prompt patterns]]
- [[Pipeline/Playwright Scraping|Playwright platform scraping]]
- [[Assets/SFX Library|SFX library]]
- [[Assets/Platform Recordings|Platform recordings]]
- [[Assets/Logos|Logos]]
- [[Assets/Music Library|Music library]]

## Cumulative spend

| Vendor | Spend |
|---|---|
| ElevenLabs (music + SFX generation) | ~$0.60 |
| Veo 3 Fast (glitch test + probe, now retired) | ~$1.00 |
| Veo 3 Fast (Codex anime hook, Apr 18) | ~$0.90 |
| Veo 3 Fast (Canva anime hook, Apr 18) | ~$0.90 |
| Playwright scraping + rembg matting + FFmpeg compositing | $0 |
| **Total across all reels** | **~$3.40** |

## How this vault is organized

```
Brand/                   -- identity, style guide, tokens
Styles Audits/           -- one note per reference creator we audited
Reels Produced/          -- one note per actual render we shipped
Pipeline/                -- workflow docs, scripts, prompt patterns
Assets/                  -- inventories of reusable media (logos, SFX, music, platform recordings)
_Index.md                -- this file
Signature Effect Brief   -- what a "signature effect" is + what ours should be
```

All notes use `[[wikilinks]]` so the graph view shows relationships. Brand decisions link to the Reels that implemented them. Audits link to the components that copy their techniques.

## Status

- **Obsidian MCP set up** 2026-04-16 (config in `~/.claude.json`). Restart Claude Code once to activate; direct REST API writes work without restart.
- **Style guide v12 locked** — do not change component parameters without explicit user approval.
- **Awaiting**: transition .ffx → .mov conversion (needs After Effects), next avatar video upload.
