# KALORA — Brand Stylescape (Stage 2) + Design System (Stage 3)

KALORA is an AI-assisted UX/UI concept for a mobile calorie and macronutrient
calculator, aimed at active adults aged 20–40 who train, cut, maintain or build.

This repository holds **Stage 2 (branding) and Stage 3 (design system)**.
It is a small static front end (React + Vite, no backend, no auth).

| Route            | Stage | Status                                             |
| ---------------- | ----- | -------------------------------------------------- |
| `/branding`      | 2     | **Built** — the stylescape, 3840 × 2160 fixed board |
| `/design-system` | 3     | **Built** — the component library and documentation |
| `/app`           | 4     | Reserved placeholder                                |

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

Then open **http://localhost:5173/branding** and
**http://localhost:5173/design-system**.

## Production build and preview

```bash
npm run build        # outputs to dist/
npm run preview      # serves dist/ , usually http://localhost:4173
```

Then open **http://localhost:4173/branding** and
**http://localhost:4173/design-system**.

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
  design-system/
    DesignSystemPage.jsx      /design-system — shell, contents rail, viewer controls
    data.js                   the reference day + the token tables; computes
                              every calorie figure and every contrast ratio
    docs/Primitives.jsx       Section, Block, Specimen, StateGrid, Spec, Table,
                              Callout, PhoneFrame — documentation scaffolding only
    ui/                       the reusable components:
                              Button, Inputs, Selection, BottomNav, Cards,
                              Progress, DataDisplay, Feedback, StatusIcon, UiIcons
    sections/                 Principles, Foundations, Actions, Forms,
                              Navigation, DataComponents, Feedback, Rules
  styles/
    tokens.css                brand tokens (--k-*) + Stage 3 tokens (--ds-*)
    base.css                  reset and app shell
    board.css                 viewer + board scaffolding
    stylescape.css            board-pixel section styles
    design-system.css         the .ds-* component and board styles
```

`tokens.css` is the single source of truth. Stage 3 **appends** to it rather
than restating it: every `--ds-*` value either aliases a `--k-*` brand token or
is a documented derivation of one. No brand value was changed.

---

## Stage 3 — the design system (`/design-system`)

A component library and documentation board, not a set of finished screens.
It is a normal responsive page (no fixed board), read top to bottom through a
sticky contents rail that tracks the section in view.

### What is on it

| # | Section | Contents |
| - | ------- | -------- |
| — | Principles | Five system principles and the reference dataset |
| 01 | Colour | Brand palette, semantic tokens, nutrition palette, surfaces |
| 02 | Typography | Sora + Inter, a 13-step scale, number treatment |
| 03 | Space, geometry, grid | 8 px scale, radii, borders, elevation, icon sizing, layout grid, icon set |
| 04 | Buttons | Primary, secondary, tertiary, icon, destructive — six states each |
| 05 | Inputs | Text, search, numeric, select, textarea — five states each |
| 06 | Selection | Segmented control, tabs, filter chips, tags, badges |
| 07 | Navigation | Labelled bottom navigation, screen header, view switch |
| 08 | Progress | Precision Ring, macro bars, goal indicator |
| 09 | Cards | Food, recipe, nutrition summary, daily progress, empty |
| 10 | Lists | List rows, dividers, tooltips |
| 11 | Messages | Alerts, toasts, bottom sheet |
| 12 | States | Loading, empty, success, warning, error |
| 13 | Rules | Touch targets, colour use, copy, exclusions, accessibility record |

### Viewer controls

- **Contents** — the rail; a drawer below 900 px, tracked by scroll-spy
- **Specs — show / hide** — the measured spec panel under each component, so
  the board reads either as a gallery or as a build sheet
- **Density — comfortable / compact** — section rhythm, for scanning a page
  this long

### Two things the page computes rather than states

1. **Nutrition.** `data.js` holds one reference day and derives every calorie
   figure from its macros with the Atwater factors (4 / 4 / 9). A card and a
   ring cannot disagree, because neither of them holds a number.
   The day: 72 P + 135 C + 38 F = 288 + 540 + 342 = **1,170 kcal**, leaving
   **830 kcal** of a **2,000 kcal** target.
2. **Contrast.** Every ratio the page prints is computed from the same hex
   values the components use (`ratio()` in `data.js`, WCAG 2.1 relative
   luminance), so the documentation cannot drift from the design.

### Decisions made in Stage 3

These extend the brand rather than reinterpret it, and are stated on the page:

- **Status gets its own ramp.** Carbohydrate amber and fat blue mean
  "macronutrient", always — so status uses `--ds-success-ink` (deep lime
  darkened), `--ds-warning-ink` (a separate darker amber), `--ds-danger-ink`
  (coral darkened for text) and a neutral `--ds-info-ink`.
- **`--ds-border-control` `#8E9289`.** The brand border `#E5E7E3` is 1.24:1 on
  white — fine for a divider, not for an input edge. The control border is
  3.17:1, clearing AA for non-text.
- **Coral is a fill, never error text.** `--k-coral` reads at 3.08:1 on white;
  error text uses `--ds-danger-ink` at 6.52:1.
- **A destructive action is never the lime primary.** In a confirmation the
  safe choice keeps the primary; the destructive action is outlined in danger
  ink.
- **Five system glyphs** (close, back, forward, chevron, check) drawn on the
  brand's 24 px grid with the same 2 px stroke, because the Stage 2 set is a
  product set and a component library also needs structural glyphs.

### Quality checks performed

Built with `npm run build`, served from `dist/` and inspected in Chromium at
1440, 1280, 820 and 390 px.

- **No console errors, no page errors, no failed requests.**
- **No clipping or overflow.** Every element inside the scroller measured
  against its own box: zero elements are overflowed by an in-flow child, and
  there is no horizontal page scroll at any width down to 390 px.
- **Touch targets.** Every button, link, input, select and textarea measured,
  counting the `::before` / `::after` hit-area padding that the small button,
  chip and segment variants document: **zero below 44 × 44 px**.
- **Contrast.** Every text node measured against its real composited backdrop.
  The only pairs below AA are **disabled controls**, which WCAG 1.4.3 exempts;
  they are still held at 3.18:1 or better.
- **Focus.** Keyboard focus verified to produce the 3 px `--ds-focus` ring at
  2 px offset on buttons and fields.
- **Interaction.** Specs show/hide, density, rail jump + scroll-spy, segmented
  control, tabs and bottom navigation all verified working in the browser.
- **`/branding` regression.** The stylescape still renders its 23 composition
  zones with no errors, unchanged.

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

Stages 2 and 3 stop here. Full mobile screens, user flows and the final
prototype are Stage 4 and are intentionally **not** in this repository yet.
