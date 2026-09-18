Mobile Calorie & Recipe Companion

A UX/UI case study for a mobile calorie and macronutrient calculator.

KALORA is aimed at active adults aged 20–40 who train, cut, maintain or build.
The case study runs from brand to design system to a working prototype, and is
published as **three separate deliverable pages** — there is no landing page and
no presentation hub.

---

## Live demo

| | |
| --- | --- |
| **Branding / Stylescape** | **https://polya09.github.io/test-task-mobile-app/branding** |
| **Design System** | **https://polya09.github.io/test-task-mobile-app/design-system** |
| **Key Design Screens / Key Flows** | **https://polya09.github.io/test-task-mobile-app/app** |

Opening the site root redirects to **Branding / Stylescape**.

---

## User stories

1. **Calculate calories for a specific product or a custom dish.**
2. **Find a recipe that fits the user's remaining calories and macro targets.**

The prototype covers these two and nothing else. There is deliberately no
onboarding, authentication, subscription, notification, social feature or
shopping list.

---

## The three deliverables

| Route | Deliverable | What it is |
| ----- | ----------- | ---------- |
| `/branding` | Branding / Stylescape | One fixed 3840 × 2160 composition: wordmark, app icon, colour, typography, motifs and photography direction |
| `/design-system` | Design System | Thirteen documented sections — tokens, components and rules — measured rather than asserted |
| `/app` | Key Design Screens / Key Flows | The clickable prototype: five destinations, two pushed screens and four sheets |

---

## What the prototype does

**Five destinations** — Today, Log, Scan, Recipes, Targets — plus a dish builder
and a recipe detail screen, and four bottom sheets.

- **Today** — a calorie ring, macro bars, what is left, and the day's entries.
  A compact weekly strip reviews any previous day: selecting a date re-reads the
  ring, the remaining figures, the macro bars and the logged list. Past days are
  read-only.
- **Log** — search 27 foods and packaged products, reuse a saved dish, or
  re-add something logged earlier.
- **Scan** — a simulated barcode read, labelled as simulated throughout. There
  is no camera in a prototype and the interface says so.
- **Portion & calories** — the calculation itself. Macros are held per 100 g,
  100 ml or one piece, scaled by the portion, and the ring, the bars and the
  button's figure move together.
- **Dish builder** — compose a dish from its ingredients, divide by the servings
  it makes, and log it as one entry.
- **Recipes** — thirteen recipes ranked by whether one serving fits what is left
  today, with filters for goal, time and diet.
- **Recipe detail** — per-serving nutrition, the fit verdict as a sentence,
  ingredients and method.
- **Targets** — the calorie target and goal that decide what "fits" means.

**Every number is derived, never typed.** One function applies the Atwater
factors (4 / 4 / 9) to the same rounded grams the screen prints, so a card, a
ring and a sheet cannot disagree. The prototype opens on the day the design
system documents: 72 P / 135 C / 38 F = **1,170 kcal** of a **2,000 kcal**
target, leaving **830 kcal**.

**States** — loading, empty, validation, success and over-budget are implemented
where they carry the two flows, not as a gallery.

---

## Responsive widths

Designed mobile-first at **390 px** and verified at **390 px and 430 px**. Below
520 px the prototype fills the viewport; above it, it sits in a device frame with
a 390 / 430 width switch. The stylescape scales as one fixed composition at any
width; the design system is a normal responsive page.

---

## Accessibility and verification

Measured in Chromium against the production build, at 390 px and 430 px:

- **Both user flows** walked end to end across 41 captured states — **zero
  console errors, zero page errors, zero failed requests**.
- **Layout** — zero elements overflowed by an in-flow child, **zero horizontal
  page scroll**.
- **Touch targets** — every button, link, input, select and textarea measured,
  counting `::before` / `::after` hit-area padding: **zero below 44 × 44 px**.
- **Contrast** — every text node measured against its real composited backdrop.
  The only pairs below AA are **disabled** controls (3.18:1 and 3.66:1), which
  WCAG 1.4.3 exempts and which the design system documents at those ratios.
- **Keyboard** — a 3 px focus ring on tab; opening a sheet moves focus into the
  dialog, traps Tab inside it, closes on Escape and restores focus to the
  control that opened it.
- **Error and focus** — a field in error never shows the lime ring: error owns
  one coherent danger treatment, and focus is carried by weight inside it.
- **Data** — the seeded day, scaled from the food catalogue, returns
  72 P / 135 C / 38 F = 1,170 kcal and 830 kcal remaining, matching the design
  system exactly.

Every figure above is produced by a script driving the built site, not by
inspection.

---

## Requirements

- Node.js 20.19+ or 22.12+ (developed on Node 22)
- npm 10+

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

Served from the root, so open **http://localhost:5173/branding**,
**http://localhost:5173/design-system** and **http://localhost:5173/app**.

## Production build and preview

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/, usually http://localhost:4173
```

The build is based under `/test-task-mobile-app/` for GitHub Pages, so the
preview serves the pages at
**http://localhost:4173/test-task-mobile-app/branding**, and likewise for
`/design-system` and `/app`. Local development is unaffected.

---

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds the
site and publishes `dist/` to GitHub Pages. The build output is never committed.

Two details make client-side routes work on a static host:

- **Base path.** `vite.config.js` sets `base` to `/test-task-mobile-app/` for
  builds only. The router wears that base at the edges — reading
  `location.pathname` and writing a URL — so no route literal has to know about
  it, and `npm run dev` still serves from the root.
- **Real route pages.** GitHub Pages has no rewrite rule, so a direct request
  for `/branding`, or a browser refresh on it, would never reach the router. The
  build therefore emits each of the three routes as a real directory index —
  `dist/branding/index.html`, `dist/design-system/index.html`,
  `dist/app/index.html` — which Pages resolves itself. Direct navigation and
  refresh both return a genuine **200** with the URL intact: no redirect, no
  querystring rewrite, and no 404 status on a page that exists.
  `dist/404.html` is written as well, as the catch-all for any other path, and
  `public/.nojekyll` keeps every path served verbatim.

To enable it once in the repository: **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

---

## Project structure

```
index.html
.github/workflows/deploy-pages.yml   build and publish to GitHub Pages
public/
  favicon.svg                        app icon, reused as the tab icon
  .nojekyll                          serve every path verbatim
  images/                            photography, cropped in frame
src/
  main.jsx                           entry, font + stylesheet imports
  App.jsx                            base-aware history-API router, 3 routes
  pages/                             Branding, DesignSystem
  branding/                          the stylescape: board, sections, parts
  design-system/                     tokens, components and documentation
    data.js                          the reference day; computes every calorie
                                     figure and every contrast ratio
    ui/                              the reusable components
  app/                               the prototype
    AppPrototype.jsx                 device frame, router, sheet + toast layers
    store.jsx                        one reducer: day, targets, dishes, nav
    nutrition.js                     every number passes through here
    dates.js                         week arithmetic and date formats
    data/                            foods, recipes, days, photos
    screens/                         Today, Log, Scan, DishBuilder, Recipes,
                                     RecipeDetail, Targets
    sheets/                          Portion, Servings, Filters, Ingredient
    parts/                           Sheet, MacroReadout, WeekStrip
  styles/
    tokens.css                       brand tokens (--k-*) + system (--ds-*)
    base.css                         reset and app shell
    board.css                        viewer + board scaffolding
    stylescape.css                   board-pixel section styles
    design-system.css                the .ds-* component and board styles
    app.css                          prototype layout only
```

`tokens.css` is the single source of truth. Every `--ds-*` value either aliases
a `--k-*` brand token or is a documented derivation of one. No brand value was
changed after Stage 2.

---

## Typefaces

Self-hosted through npm, so nothing is fetched from a CDN at runtime.

| Family | Package | Licence |
| ------ | ------- | ------- |
| Sora | `@fontsource-variable/sora` | SIL OFL 1.1 |
| Inter | `@fontsource-variable/inter` | SIL OFL 1.1 |

## Photography

Seven images, all WebP. Four recipes carry a photograph of the dish they are;
the rest use the design system's recipe-glyph placeholder rather than borrowing
a photograph of something they are not. Every dish photograph is a transparent
cut-out, so none is left floating: each sits on a lit surface with a defined
edge and a contact shadow following the plate's alpha.

**Licence:** supplied by the client, licence on file. Replace this line with the
per-image source and licence before publishing anywhere public.
