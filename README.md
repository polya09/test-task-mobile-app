# KALORA — Brand Stylescape (Stage 2)

KALORA is an AI-assisted UX/UI concept for a mobile calorie and macronutrient
calculator, aimed at active adults aged 20–40 who train, cut, maintain or build.

This repository currently holds **Stage 2 only: the branding / stylescape**.
It is a small static front end (React + Vite, no backend, no auth) whose single
finished page renders one cohesive horizontal stylescape, designed at
**3840 × 2160 px (16:9)** and displayed responsively in the browser.

| Route            | Stage | Status                                  |
| ---------------- | ----- | --------------------------------------- |
| `/branding`      | 2     | **Built** — the stylescape              |
| `/design-system` | 3     | Reserved placeholder                    |
| `/app`           | 4     | Reserved placeholder                    |

Opening `/` redirects to `/branding`.

---

## Requirements

- Node.js 20.19+ or 22.12+ (developed on Node 22)
- npm 10+

## Install

```bash
npm install
```

## Local preview

```bash
npm run dev          # development server, printed URL, usually http://localhost:5173
```

Then open **http://localhost:5173/branding**.

## Production build and preview

```bash
npm run build        # outputs to dist/
npm run preview      # serves dist/ , usually http://localhost:4173
```

Then open **http://localhost:4173/branding**.

## Viewing the stylescape

The board is one fixed composition, always laid out at its designed 3840 × 2160 px
and scaled as a whole, so the proportions are identical on every screen.
The toolbar above the board offers:

- **Fit** — the entire 16:9 board inside the viewport (default)
- **50% / 100%** — zoom in and scroll/pan to inspect detail

---

## Project structure

```
index.html
scripts/
  generate-placeholders.mjs   regenerates the photography placeholders
public/
  favicon.svg                 app icon, reused as the tab icon
  images/*.svg                photography placeholders (see "Photography" below)
src/
  main.jsx                    entry, font + stylesheet imports
  App.jsx                     minimal history-API router (3 routes)
  pages/
    Branding.jsx              /branding
    Stub.jsx                  reserved stage 3 / stage 4 pages
  branding/
    BoardViewer.jsx           responsive fit/zoom frame for the fixed board
    Stylescape.jsx            the composition: every zone placed in board pixels
    sections/                 Intro, Colour, Typography, Motifs
    parts/                    Wordmark, AppIcon, PrecisionRing, PaceArcs,
                              RingConstruction, Icons, UiFragments
  styles/
    tokens.css                colour, type and geometry tokens
    base.css                  reset and app shell
    board.css                 viewer + board scaffolding
    stylescape.css            board-pixel section styles
```

`tokens.css` is deliberately the single source of truth for colour and type —
Stage 3 (`/design-system`) should extend that file rather than restate it.

---

## Brand summary (what the board argues)

- **Creative direction** — Bright Performance Nutrition. A well-lit training
  kitchen: not a clinic, not a gym floor.
- **Core concept** — *The Precision Ring*. One ring does four jobs: the letter
  **O** of the wordmark, the app icon, the calorie meter and the graphic
  language (*Pace Arcs*).
- **Logo** — an original geometric wordmark drawn as SVG paths on a 100-unit
  cap-height grid (stems 20, diagonals 22, bars 18). The O is the ring: a full
  neutral track plus a 72% electric-lime segment with a rounded cap, so it can
  never be misread as a C or a G. Shown as primary graphite on warm paper,
  reversed light on graphite, and as an app icon at three sizes.
- **Colour** — graphite `#1C1F23`, warm paper `#F7F5EF`, white `#FFFFFF`,
  muted `#6B6F76`, border `#E5E7E3`; electric lime `#C6F432` and deep lime
  `#557A00`; macros protein `#C6F432`, carbs `#FFA62B`, fat `#8FD0F7`;
  status coral `#FF5A4E`. **Graphite ink on lime, amber and blue — never white.**
- **Type** — Sora for the wordmark, headlines and hero numbers; Inter for body,
  labels and controls. Changing values use tabular figures.
- **Voice** — concise, factual, encouraging, never a verdict. Food is never
  called good, bad, clean, cheat or guilty.

---

## Typefaces

Self-hosted through npm, so nothing is fetched from a CDN at runtime:

| Family | Package                     | Licence     |
| ------ | --------------------------- | ----------- |
| Sora   | `@fontsource-variable/sora` | SIL OFL 1.1 |
| Inter  | `@fontsource-variable/inter`| SIL OFL 1.1 |

---

## Photography — placeholders, not licensed photos

**The images in `public/images/` are clearly marked placeholders, not
photographs.** This environment's network policy blocks outbound access to every
stock-photo host (Unsplash, Pexels, Pixabay, Wikimedia — all refused at the
egress proxy), so no royalty-free photograph could be downloaded and credited
honestly. Inventing a source URL or a licence line would have been worse than an
honest placeholder, so each frame ships as a locally generated SVG carrying the
crop, ratio and warm neutral tonality the real shot calls for, stamped
`PLACEHOLDER` and tagged in the interface.

| File                             | Frame ratio | Intended photograph                                                   |
| -------------------------------- | ----------- | --------------------------------------------------------------------- |
| `photo-hero-kitchen.svg`         | 640 × 1240  | Hero: top-down meal in a well-lit training kitchen, real portions      |
| `photo-lifestyle-groceries.svg`  | 860 × 560   | 45° lifestyle: diverse people cooking, training or carrying groceries  |
| `photo-topdown-bowl.svg`         | 305 × 260   | Top-down grain bowl on stone                                           |
| `photo-ingredients-linen.svg`    | 305 × 260   | Raw ingredients on linen                                               |
| `photo-recipe-thumb.svg`         | 150 × 150   | Recipe card thumbnail                                                  |

**Source / licence: none — generated in this repository by
`scripts/generate-placeholders.mjs`, no third-party rights involved.**

To replace them with real photography, drop licensed files into `public/images/`
under the same names (any web format), keep the frame ratios above, and record
the source URL and licence for each one in this table. Photography direction:
natural daylight; warm neutral surfaces (stone, linen, light wood); top-down for
meals, 45° for lifestyle; realistic serving sizes; clearly visible ingredients;
diverse people, unposed. Avoid floating cut-outs, dark food, bodybuilder poses,
clinical imagery and over-styled garnishes.

Regenerate the placeholders at any time with:

```bash
node scripts/generate-placeholders.mjs
```

---

## Quality checks performed

- `npm run build` completes with no errors or warnings.
- The board was inspected in Chromium at its full 3840 × 2160 design size and
  per band; no content is clipped and the only overlaps are the two intentional
  ones (app icon across the hero frame, progress card stepping off the graphite
  panel).
- Automated layout check: every zone measured against the board bounds — nothing
  extends past 3840 × 2160.
- Responsive sweep at 390, 768, 1280, 1920 and 2560 px wide: the board keeps a
  1.778 (16:9) ratio at every width, fits its frame at **Fit**, renders exactly
  3840 px wide at **100%**, and never causes horizontal page scroll.
- Automated contrast check over every text node on the board against its real
  backdrop: no pair falls below WCAG AA (4.5:1 body, 3:1 large text).
- No console errors and no failed requests.

---

## Scope

Stage 2 stops here. The design system, full mobile screens, user flows and the
final prototype are Stages 3 and 4 and are intentionally **not** in this
repository yet.
