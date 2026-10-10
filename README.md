# Grow, Pip, Grow!

A static HTML/CSS/JavaScript implementation of the English picture-book PRD.

## Files

- `index.html`
- `style.css`
- `script.js`

## Run locally

You do **not** need Vite.

Option 1: open `index.html` directly in your browser.

Option 2: run a simple local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy to Vercel

Because this is a static site, you can deploy it without a build step.

Recommended Vercel settings:

- Framework Preset: `Other`
- Root Directory: folder containing `index.html`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

If Vercel requires an output directory in your setup, use the repository root and keep the project as a static site.

## Implemented features

- 10 story pages
- browser read-aloud using the Web Speech API
- word highlighting during read-aloud, with a timed fallback
- slow-audio mode
- 8 tappable vocabulary words
- 10 comprehension questions
- one retry + hint on wrong answers
- Pip growth progress
- result screen with score and vocabulary exploration count
- story retelling activity (drag or tap)
- emoji reaction and sentence builder
- mobile-first responsive layout

## Notes

Speech quality and exact word-boundary timing depend on the browser/device. Chrome and Edge generally provide the most consistent behavior.
