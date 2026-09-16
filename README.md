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
public/
  favicon.svg                 app icon, reused as the tab icon
  images/                     photography, cropped to frame (see below)
src/
  main.jsx                    entry, font + stylesheet imports
  App.jsx                     minimal history-API router (3 routes)
  pages/
    Branding.jsx              /branding
    Stub.jsx                  reserved stage 3 / stage 4 pages
  branding/
    BoardViewer.jsx           responsive fit/zoom frame for the fixed board
    Stylescape.jsx            the composition: every zone placed in board pixels
    photos.js                 photography manifest: src, frame, focal point, fit
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

## Photography

Four photographs, supplied by the client. Files are stored **full-frame** — no
pixel cropping — and each frame composes its own crop with `object-fit` and
`object-position`, wired through `src/branding/photos.js`. Re-framing a shot is
a one-line change to its `focus` value and never touches the layout.

| File | Frame (board px) | Fit | Focus | Placement |
| ---- | ---------------- | --- | ----- | --------- |
| `photo-hero-pear-salad.webp` | 640 × 1040 | cover | `49% 50%` | Hero block, top of the photography band |
| `photo-lifestyle-kitchen-phone.webp` | 860 × 560 | cover | `50% 42%` | Wide lifestyle block, bottom left |
| `photo-prep-parsley-hands.webp` | 305 × 260 | cover | `58% 50%` | Photography-direction frame |
| `photo-dish-chicken-salad.webp` | 305 × 260 and 150 × 150 | contain | `50% 50%` | Compact food frame and the recipe-card thumbnail |

Why those focus values:

- **Hero** — a portrait frame against a landscape source, so the visible window
  is the middle 41% of the width. Held just left of centre, that window contains
  the whole bowl with light surface either side, the pear above and the cutlery
  below. No text is laid over the dish.
- **Lifestyle** — near-identical ratios, biased slightly above centre to favour
  her, the phone and the prepared board. Its caption is capped in width so it
  rests on the blurred cabinetry and never crosses her face or the food.
- **Prep** — pushed right of centre so the crop lands on the hands, the sprig
  and the herbs rather than the dark oven along the left edge.
- **Dish** — a cut-out, so it is contained rather than covered, and never left
  floating: it sits on a lit surface with a defined edge and a contact shadow
  that follows the plate's alpha.

### Encoding

| | Original | Shipped |
| --- | --- | --- |
| Format | JPEG / PNG | WebP (alpha preserved on the cut-out) |
| Largest dimension | 4096–6720 px | 2000 px |
| Total weight | 55 MB | 1.1 MB (106–611 KB each) |

Aspect ratios are untouched — every image is scaled, never stretched. The
untouched originals remain in this branch's git history.

**Licence:** supplied by the client, licence on file. Replace this line with the
per-image source and licence before the board is published anywhere public.

## Quality checks performed

- `npm run build` completes with no errors or warnings.
- The board was inspected in Chromium at its full 3840 × 2160 design size, per
  band and per photographic frame; no content is clipped and the only overlaps
  are the two intentional ones (app icon across the hero frame, progress card
  stepping off the graphite panel).
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
