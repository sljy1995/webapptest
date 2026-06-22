# Conflict Studies & Insights — Webapp

**Live site:** https://sljy1995.github.io/webapptest

A weekly intelligence brief webapp covering five conflict theatres, plus monthly capability digests. All content is JSON files — no code changes ever needed.

---

## How to add a new weekly update

1. Upload the week's HTML brief file to Claude in a new chat
2. Paste this prompt:

> Convert the attached HTML brief to a weekly JSON file for the CS&I webapp and push it to GitHub repo `sljy1995/webapptest`. My GitHub token is `[YOUR TOKEN]`.

That's it. Claude converts the HTML, creates `content/weeklies/YYYY-MM-DD.json`, pushes it, and the manifest auto-updates via GitHub Actions within ~30 seconds.

---

## How to add a new monthly digest

1. Prepare the digest content (see format below)
2. Paste this prompt:

> Create a monthly digest JSON for [Month YYYY] for the CS&I webapp and push it to GitHub repo `sljy1995/webapptest`. My GitHub token is `[YOUR TOKEN]`. Here's the content: [paste content]

Claude creates `content/digests/YYYY-MM.json` and pushes it.

---

## Weekly JSON format

**Filename:** `content/weeklies/YYYY-MM-DD.json` — use the Monday start date of the week.

```json
{
  "week": "2026-06-29",
  "label": "Week of 29 Jun 2026",
  "statusChart": [
    {
      "theatre": "Russia–Ukraine",
      "phase": "Attritional War",
      "trend": "↑ Escalating",
      "progress": "1–2 sentence summary of this week's status."
    }
  ],
  "theatres": [
    {
      "id": "russia-ukraine",
      "theatreNum": "THEATRE 01",
      "title": "Russia – Ukraine",
      "subtitle": "One-line theme for this week",
      "articles": [
        {
          "tags": ["FIRES & STRIKES"],
          "headline": "Headline for this story",
          "body": "Body text. Wrap key facts in <span class='hl'>highlighted text</span> to show them in orange.",
          "sources": ["isw", "reuters"],
          "implicationLabel": "FIRES · GBAD",
          "implications": [
            "<strong>Bold lead-in</strong> — Explanation sentence."
          ]
        }
      ]
    }
  ]
}
```

**How cards work:** Each object inside `articles` becomes one card on screen. One article = one card. Add more objects to the array to get more cards for that theatre.

**All five theatre IDs** (use exactly these):
- `russia-ukraine` — THEATRE 01
- `israel-lebanon` — THEATRE 02
- `israel-gaza` — THEATRE 03
- `israel-us-iran` — THEATRE 04
- `thailand-cambodia` — THEATRE 05

**Status chart trend values:** `↑ Escalating` / `→ Holding` / `↓ De-escalating`

---

## Monthly digest JSON format

**Filename:** `content/digests/YYYY-MM.json`

```json
{
  "month": "2026-07",
  "label": "July 2026",
  "capabilities": {
    "manoeuvre": {
      "changed": "2–4 sentence summary of what changed in Manoeuvre this month.",
      "opportunities": [
        { "title": "Title", "body": "Explanation." }
      ],
      "vulnerabilities": [
        { "title": "Title", "body": "Explanation." }
      ],
      "capdevs": [
        { "title": "Title", "body": "Explanation." }
      ]
    },
    "sense-strike": { "changed": "...", "opportunities": [], "vulnerabilities": [], "capdevs": [] },
    "combat-support": { "changed": "...", "opportunities": [], "vulnerabilities": [], "capdevs": [] },
    "expeditionary": { "changed": "...", "opportunities": [], "vulnerabilities": [], "capdevs": [] },
    "unmanned": { "changed": "...", "opportunities": [], "vulnerabilities": [], "capdevs": [] }
  }
}
```

---

## Manifest — fully automatic

`content/manifest.json` is rebuilt automatically by a GitHub Actions workflow every time you push a weekly or digest JSON. **You never need to edit it manually.**

If the workflow hasn't run yet (first upload), you can trigger it manually: repo → Actions tab → "Auto-update manifest" → Run workflow.

---

## GitHub token

Needs `public_repo` scope. Generate at [github.com/settings/tokens](https://github.com/settings/tokens). Share the token with Claude when running update prompts.

---

## Repo structure

```
content/
  weeklies/       ← one YYYY-MM-DD.json per week
  digests/        ← one YYYY-MM.json per month
  manifest.json   ← auto-generated, do not edit
  methodology.png ← infographic shown in About
```
