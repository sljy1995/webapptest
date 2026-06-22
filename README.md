# Conflict Studies & Insights — Webapp

A dark-themed intelligence brief webapp displaying weekly conflict updates and monthly digests across five theatres. Content is driven entirely by JSON files — no code changes needed for regular updates.

---

## Repo structure

```
/
├── index.html                  # App shell (do not edit)
├── style.css                   # Styling (do not edit)
├── app.js                      # App logic (do not edit)
├── apple-touch-icon.png        # Tab icon + sidebar logo
├── data.js                     # Legacy stub (do not edit)
│
└── content/
    ├── manifest.json           # ← EDIT THIS every update
    ├── methodology.png         # Default infographic (fallback for all weeks)
    │
    ├── weeklies/
    │   ├── YYYY-MM-DD.json     # One file per week
    │   └── ...
    │
    ├── digests/
    │   ├── YYYY-MM.json        # One file per month
    │   └── ...
    │
    └── infographics/           # Optional week-specific infographics
        ├── YYYY-MM-DD.png      # Named to match weekly date
        └── ...
```

---

## What to do each week

### Step 1 — Create the weekly JSON file

Copy `content/weeklies/_TEMPLATE_weekly.json`, rename it to `content/weeklies/YYYY-MM-DD.json` (use the **Monday start date** of the week, e.g. `2026-06-29.json`), and fill in the content.

Upload it to the repo at `content/weeklies/YYYY-MM-DD.json`.

### Step 2 — Update the manifest

Open `content/manifest.json`. Add the new date string to the `"weeklies"` array **in chronological order** (oldest first):

```json
"weeklies": [
  "2026-04-20",
  "2026-04-27",
  ...
  "2026-06-22",
  "2026-06-29"   ← add here
]
```

Upload the updated `manifest.json`.

### Step 3 — Upload the infographic (optional)

If you have a week-specific infographic, upload it as `content/infographics/YYYY-MM-DD.png` using the same date as the weekly JSON. If no file is found for that week, the app automatically falls back to `content/methodology.png`.

That's it. The app auto-populates the week selector, month nav, and status chart from the files.

---

## What to do each month

### Step 1 — Create the monthly digest JSON file

Copy `content/digests/_TEMPLATE_digest.json`, rename it to `content/digests/YYYY-MM.json` (e.g. `2026-07.json`), and fill in the content.

Upload it to the repo at `content/digests/YYYY-MM.json`.

### Step 2 — Update the manifest

Open `content/manifest.json`. Add the new month string to the `"digests"` array:

```json
"digests": [
  "2026-06",
  "2026-07"   ← add here
]
```

Upload the updated `manifest.json`.

### Step 3 — Update the "Click here for [Month]'s Digest" button (optional)

Open `index.html`, find line 35, and update the button text:

```html
<a href="#" class="digest-cta" onclick="showView('digest')">Click here for July's Digest</a>
```

---

## Using Claude to generate content

The fastest workflow is to feed Claude the raw HTML brief file and ask it to convert it. Use this prompt:

> I'm attaching this week's HTML brief. Please convert it to the weekly JSON format for my CS&I webapp and upload it to my GitHub repo at `sljy1995/webapptest` as `content/weeklies/YYYY-MM-DD.json`, then update `content/manifest.json` to include the new date. Use the same GitHub token as before.

Claude will:
1. Parse all five theatres, status chart rows, articles, tags, highlighted text, sources, and implications
2. Write the correctly formatted JSON
3. Push it directly to GitHub
4. Update the manifest

For the monthly digest, use:

> Please convert the attached monthly digest content into the digest JSON format for my CS&I webapp and upload it to `content/digests/YYYY-MM.json`, then update the manifest.

---

## Formatting rules for JSON content

### Highlighted text (orange on screen)
Wrap text in `<span class='hl'>...</span>`:
```
"body": "Russia launched <span class='hl'>656 drones and 73 missiles</span> in the largest assault of the war."
```

### Bold text in implications
Use `<strong>...</strong>` for the bold lead-in:
```
"<strong>Volume saturation defeats point defence</strong> — 992 simultaneous tracks overwhelm any single-layer GBAD architecture."
```

### Sources
List source names as short lowercase strings (no URLs needed — they're display-only labels):
```
"sources": ["isw", "reuters", "bbc"]
```

### Empty theatres
If a theatre has no update this week, include the theatre object with an empty `articles` array. The app will show a "no content" message gracefully:
```json
{
  "id": "thailand-cambodia",
  "theatreNum": "THEATRE 05",
  "title": "Thailand – Cambodia",
  "subtitle": "",
  "articles": []
}
```

---

## Status chart trend values

Use these exact strings for the `trend` field so the correct colour renders:

| Trend | String |
|---|---|
| Escalating | `↑ Escalating` |
| Holding | `→ Holding` |
| De-escalating | `↓ De-escalating` |

Phase pill colours are assigned automatically:
- **Red** — any phase containing "active", "attritional", or "collapsed"
- **Cyan** — any phase containing "ceasefire" or "holding"
- **Amber** — everything else

---

## Manifest reference

`content/manifest.json` is the only file the app reads to know what content exists. Keep it in sync with the files you upload.

```json
{
  "weeklies": [
    "2026-04-20",
    "2026-04-27"
  ],
  "digests": [
    "2026-06"
  ],
  "statusChart": []
}
```

`statusChart` at the top level is a legacy field — leave it as `[]`. Each weekly file carries its own status chart data.

---

## GitHub token

The GitHub Personal Access Token (PAT) required for Claude to push files directly needs the `public_repo` scope (or `repo` for a private repo). It expires based on what you set when you created it. If Claude reports auth errors, generate a new PAT at [github.com/settings/tokens](https://github.com/settings/tokens) and share the new token.

---

## Live site

The app is served via GitHub Pages at:
**https://sljy1995.github.io/webapptest**

To enable GitHub Pages (if not already on): repo Settings → Pages → Source: `main` branch, `/ (root)`.
