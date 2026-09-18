# KALORA — Stylescape (Stage 2), Design System (Stage 3), Prototype (Stage 4)

KALORA is an AI-assisted UX/UI concept for a mobile calorie and macronutrient
calculator, aimed at active adults aged 20–40 who train, cut, maintain or build.

This repository holds **Stage 2 (branding), Stage 3 (design system) and
Stage 4 (the interactive prototype)**. It is a small static front end
(React + Vite, no backend, no auth).

| Route            | Stage | Status                                                  |
| ---------------- | ----- | ------------------------------------------------------- |
| `/branding`      | 2     | **Built** — the stylescape, 3840 × 2160 fixed board      |
| `/design-system` | 3     | **Built** — the component library and documentation      |
| `/app`           | 4     | **Built** — the clickable mobile prototype               |

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

Then open **http://localhost:5173/branding**,
**http://localhost:5173/design-system** and **http://localhost:5173/app**.

## Production build and preview

```bash
npm run build        # outputs to dist/
npm run preview      # serves dist/ , usually http://localhost:4173
```

Then open **http://localhost:4173/branding**,
**http://localhost:4173/design-system** and **http://localhost:4173/app**.

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
    DesignSystem.jsx          /design-system
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
                              Progress, DataDisplay, Feedback, StatusIcon,
                              UiIcons, Header
    sections/                 Principles, Foundations, Actions, Forms,
                              Navigation, DataComponents, Feedback, Rules
  app/
    AppPrototype.jsx          /app — device frame, router, sheet + toast layers
    store.jsx                 one reducer: the day, targets, dishes, navigation
    nutrition.js              every number in the prototype passes through here
    data/
      foods.js                27 foods and packaged products, macros per basis
      recipes.js              13 recipes, macros per serving, tags, method
      days.js                 the live day and the sample days behind it
      photos.js               recipe photography manifest
    dates.js                  week arithmetic and the date formats
    screens/                  Today, Log, Scan, DishBuilder, Recipes,
                              RecipeDetail, Targets
    sheets/                   PortionSheet, ServingsSheet, FiltersSheet,
                              IngredientSheet
    parts/                    Sheet (focus-trapped overlay), MacroReadout,
                              WeekStrip
  styles/
    tokens.css                brand tokens (--k-*) + Stage 3 tokens (--ds-*)
    base.css                  reset and app shell
    board.css                 viewer + board scaffolding
    stylescape.css            board-pixel section styles
    design-system.css         the .ds-* component and board styles
    app.css                   Stage 4 layout only — no new colour or type values
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

## Stage 4 — the prototype (`/app`)

A clickable mobile product, not a gallery of screens. Five labelled
destinations, two screens that push over them and four sheets, all assembled
from Stage 3 components. No component was restyled and no token was added.

On a desktop the prototype sits in a device frame with a **390 px / 430 px**
width switch and a **Reset prototype** button. Below 520 px the frame
disappears and the app fills the viewport, which is the width it was designed
at in the first place.

### The two user stories, end to end

**1 — "Calculate the calories in a dish or a specific product."**

| | Route through the app |
| - | - |
| A packaged product | `Log` → search → **Portion & calories** sheet → *Add* → `Today` |
| A scanned product | `Scan` → *Simulate scan* → same sheet, barcode matched → `Today` |
| A dish you made | `Log` → *Dishes* → **Dish builder** → ingredients + servings → `Today` |
| A correction | `Today` → tap an entry → same sheet in edit mode → save or remove |

**2 — "Find a recipe that is suitable for me."**

`Recipes` → *For today* / filters → **Recipe detail** → *Log this meal* →
**Servings** sheet → `Today`, ring redrawn.

### "Suitable for me" is computed, never labelled

A recipe carries no verdict. `recipeFit()` compares one serving against what
is actually left of the day and returns one of three, each as a sentence with
a number in it:

| Verdict | Test | What the card says |
| ------- | ---- | ------------------ |
| **fits** | inside the calories *and* every macro left | "Fits your remaining 830 kcal" |
| **tight** | inside the calories, past one macro | "8 g over your remaining fat" |
| **over** | past the calories left today | "74 kcal over what's left today" |

Against the reference day — 830 kcal and 78 P / 70 C / 24 F left — the
thirteen recipes split 10 / 2 / 1. Change the target or the goal on `Targets`
and the whole list re-reads, because the comparison is made when the list is
rendered, not baked into the data.

Over budget is reported, never refused: the button still works. The app states
the number and the person decides.

### The numbers

`src/app/nutrition.js` is the only place calories are produced, and it does it
with the design system's own `kcal()`. A food holds macros per a stated basis
(100 g, 100 ml, or one piece); a portion scales them; they are rounded once, to
the grams that will actually be printed; and exactly those grams are handed to
`kcal()`. A card, a ring and a sheet cannot disagree, because all three read
the same rounded macros.

The prototype opens on the **Stage 3 reference day**, rebuilt from the
catalogue rather than copied:

| Portion | Macros | Energy |
| ------- | ------ | ------ |
| Rolled Oats 60 g | 8 P / 39 C / 5 F | 233 kcal |
| Greek Yogurt 150 g | 15 P / 8 C / 3 F | 119 kcal |
| Banana 118 g | 1 P / 27 C / 0 F | 112 kcal |
| Chicken Bowl, 1 serving | 42 P / 55 C / 15 F | 523 kcal |
| Almonds 30 g | 6 P / 6 C / 15 F | 183 kcal |
| **Total** | **72 P / 135 C / 38 F** | **1,170 kcal** |

That is the figure `/design-system` documents, to the gram, and the Chicken
Bowl's 523 kcal is the sum of four catalogue ingredients rather than a typed
number. `macroTargets(2000, 'cut')` likewise returns exactly the documented
150 / 205 / 62.

A dish rounds **once**, at the serving. Whole grams are not additive — round
each ingredient first and the error compounds — so no screen shows both a dish
total and a per-serving figure that invite division.

### States implemented

- **Loading** — `LoadingList` while a food or recipe search resolves; a spinner
  and a live barcode readout while the simulated scan runs.
- **Empty** — no foods logged today; no search match, offering to build the
  query as a dish; no recipe match, naming the filter to remove; no dishes yet;
  no ingredients in the builder.
- **Validation** — a portion outside 1–2,000 g, servings outside 1–10, a dish
  with no name, a calorie target outside 1,200–4,000 kcal. Each disables the
  primary and states the range; none of them says "invalid input".
- **Success** — a toast with the energy added and an Undo, and the ring and
  macro bars redrawn behind it.
- **Over budget** — a warning alert in the sheet before logging, on the recipe
  detail, and on `Today` once the day is past its target.

### The scan is simulated, and says so

There is no camera in a prototype, and pretending otherwise would be a lie told
in the user's own interface. The viewfinder is drawn honestly, a dashed panel
states **"Simulated scan — prototype only"**, and the triggers are labelled
*Simulate scan* and *Simulate an unknown barcode*. The three packaged products
and their barcodes are invented, so that no real product's nutrition is
misstated.

### Photography

Four recipes carry a photograph of the dish they actually are; the rest use the
design system's documented recipe-glyph placeholder rather than borrowing a
photograph of something they are not. The placeholder reserves the same 72 px
box, so a photographed card and a placeholder card are geometrically identical
and a list of them stays aligned.

Every dish photograph is a transparent cut-out, so none is left floating — each
gets a lit surface, a defined edge and a contact shadow that follows the plate's
alpha, the same rule the stylescape states. `object-fit: contain` throughout
means the plate is never cropped or stretched, in a 72 px thumbnail or a 4:3
hero.

| Recipe | File | Source |
| ------ | ---- | ------ |
| Grilled Chicken Salad | `photo-dish-chicken-salad.webp` | Stage 2, licensed |
| Cottage Cheese & Tomato Toast | `photo-dish-cottage-cheese-toast.webp` | Stage 4 |
| Herb Omelette with Greens | `photo-dish-herb-omelette.webp` | Stage 4 |
| Grilled Pear & Bacon Spinach Salad | `photo-dish-pear-bacon-salad.webp` | Stage 4 |

The three Stage 4 files were supplied at 1254 × 1254 and normalised on the
plate itself rather than on the alpha bounds — the soft shadow reaches the
source edge and would otherwise pull the centre off to one side. Every plate now
measures 792 px inside a 900 px square, so the three read at identical scale
wherever they appear. 900 px is set by the largest on-screen use: the 4:3 hero
at the 430 px device width, less its 24 px image padding, is 274 CSS px — 824 px
at DPR 3.

Re-encoded as WebP at quality 84: **1,316 KB → 734 KB**, measured at 3.2–3.3
RMSE against the decoded source composited on white and resampled to that
824 px display size. That is about 1.3% of the 0–255 range, which is not visible
at any size the app renders.

Alt text is written per photograph and used on the detail hero, where the image
carries the information. The card thumbnail is deliberately `alt=""`: the recipe
name is the next thing in the card, so describing the photograph there would
make a screen reader announce the same dish twice.

### What Stage 4 added to the design system

Every addition is optional and defaults to the previous behaviour, so the
documentation board renders identically (measured below).

| Component | Addition |
| --------- | -------- |
| `Header.jsx` | New `ScreenHeader` — the header the Navigation section already specified, made reusable |
| `Button`, `IconButton` | An incoming `className` is now **appended** rather than substituted, so a caller's marker class cannot strip a button of its variant — this was a real defect, and it was silently collapsing icon buttons below 44 px |
| `TextField`, `SearchField`, `NumberField`, `SelectField`, `TextArea` | Passing `onChange` switches the same control to a controlled one; the stepper's + / − become live and accept `max` |
| `FoodCard`, `RecipeCard` | `onAdd` / `onOpen` / `onSave` / `saved` / `note`, and a stretched hit area on the body |
| `NutritionCard`, `DayCard` | Accept their own `value`, `target`, `macros` and `meta` instead of only the reference day |
| `EmptyCard`, `StatePanel`, `Alert`, `Toast` | `onAction` |
| `BottomSheet` | `mode="overlay"` — the same sheet with a live scrim and working footer buttons, in place of the documentation's stand-in screen |
| `LoadingList` | A `label`, so "Searching foods" and "Finding recipes" announce correctly |

CSS that extends a `ds-*` component is scoped under `.ap-viewport`, so the
documentation board cannot shift by a pixel.

### Reviewing a previous day

A compact weekly strip sits between the Today header and the progress card:
the month and year with a week control either side, then seven day cells. The
header itself is untouched — same title, same subtitle, same Add food button —
and only the subtitle's text follows the selection. The page heading always
reads "Today"; the progress card names the day its own numbers belong to, so a
past day is never mislabelled.

Selecting a date re-reads the ring, the remaining calories, the remaining
macros, the macro bars and the logged list from that day. Nothing else on the
screen changes shape.

| | |
| - | - |
| Reference day | Thursday 16 September 2027 — 2027 is the year that falls on a Thursday, so the weekday labels agree with the copy the screen has always shown |
| Selected | lime fill, a heavier figure and `aria-current="date"` — never colour alone |
| Reference day, unselected | a control-border outline |
| Has entries | a dot under the figure, so the strip says where there is something to review |
| Future | disabled, and the next-week control stops at the week holding the reference day |
| Past day | read-only: Add food is disabled and entries are not tappable, because the log is a record of what happened |

Sample days, all derived through `kcal()` from the same food catalogue:

| Day | Entries | Energy | Left |
| --- | ------- | ------ | ---- |
| Friday 10 September | 6 | 1,387 kcal | 613 |
| Saturday 11 September | 7 | 1,399 kcal | 601 |
| Monday 13 September | 10 | 1,766 kcal | 234 |
| Tuesday 14 September | 7 | 1,191 kcal | 809 |
| Wednesday 15 September | — | 0 kcal | 2,000 |
| **Thursday 16 September** | **5** | **1,170 kcal** | **830** |

Wednesday is deliberately empty: a day you forgot to log is a real state, and
the screen has to have something to say about it.

`entries` in the store is still the reference day and nothing else, so every
screen that asks "what is left today?" — the recipe fit test, the portion
sheets, the Log screen's recents, Targets — keeps reading it unchanged. Past
days are a separate read-only map, and logging always returns to the live day.

At 390 px the seven columns divide 350 px of page width, so the strip takes the
small side padding and no column gap: each day cell is 47.4 × 64 px, clear of
the 44 px minimum. At 430 px it is 53.1 × 64 px.

### Error, focus, and the radius hierarchy

Two treatments were tightened after visual review.

**A field in error never shows the lime focus ring.** Two differently coloured
contours around one control is noise, not information, so error owns the whole
treatment and focus is expressed inside that one hue:

| State | Treatment |
| ----- | --------- |
| Resting | 2 px `--ds-danger` border, alert glyph, written message |
| Focused | 2 px `--ds-danger-ink` border plus a 2 px ring flush at offset 0 — the two merge into a single 4 px edge |

Weight carries the focus, not hue. Coral against danger ink is only **2.12:1**,
short of the 3:1 a focus indicator needs, but the 2 px of newly inked pixels
sit at **6.52:1** on the white field and **5.98:1** on the paper page, and meet
the 2 px minimum perimeter. Valid fields keep the documented lime ring
unchanged. The rule is written against `.ds-input` and `.ds-stepper`, which are
the shells for text, search, select, textarea and numeric alike.

**Radius is a four-step hierarchy**, every step from the documented scale, and
every nested element visibly smaller-cornered than its container:

| Token | | Used by |
| ----- | - | ------- |
| `--ds-radius-l` | 24 px | Large containers and major summary cards — the daily progress card, the macro summary, the dish builder's running total, the bottom sheet, the navigation bar |
| `--ds-radius-m` | 16 px | Standard cards, list bodies, panels and alerts — food and recipe cards, the logged list, state panels, the viewfinder |
| `--ds-radius-s` | 12 px | Every control and small tile — button, input, stepper, select, thumbnails, the remaining-macro tiles |
| `--ds-radius-xs` | 8 px | Macro bars and inline markers |
| `--ds-radius-pill` | — | Chips, tags, badges and compact status markers only |

A corner is perceived against the height it sits on, which is what the review
caught: the same 24 px that suits a 198 px card is two-thirds of a pill on a
72 px list row. For the same reason all controls were unified on 12 px — 16 px
is 73% of a pill on a 44 px button and 89% on a 36 px one, which is the shape
language the system reserves for chips.

Both changes are scoped under `.ap-viewport`, so the documentation board is
untouched.

### Quality checks performed

Built with `npm run build`, served from `dist/` and driven in Chromium.

- **Both flows walked end to end**, 41 captured states, **zero console errors,
  zero page errors, zero failed requests**.
- **Data.** The seeded day, scaled from the catalogue, returns
  72 P / 135 C / 38 F = 1,170 kcal and 830 kcal remaining — matching
  `/design-system` exactly. `macroTargets(2000, 'cut')` returns 150 / 205 / 62.
- **Layout at 390 px and 430 px**, every screen scrolled to its end: **zero
  elements overflowed by an in-flow child, zero horizontal page scroll**.
- **Touch targets.** Every button, link, input, select and textarea measured,
  counting the `::before` / `::after` hit-area padding: **zero below 44 × 44 px**,
  the seven day cells of the weekly strip included.
- **Contrast.** Every text node measured against its real composited backdrop:
  the only pairs below AA are **disabled** controls — a button at 3.18:1 and the
  future dates in the weekly strip at 3.66:1, the documented `--ds-text-disabled`
  value. WCAG 1.4.3 exempts disabled controls, and the design system already
  documents both ratios.
- **Keyboard.** The 3 px `--ds-focus` ring appears on Tab; opening a sheet moves
  focus into the dialog, Tab is trapped inside it, Escape closes it and focus
  returns to the control that opened it.
- **Error and focus.** Asserted on the live computed styles of a text field and
  a numeric field, in all three states: valid-focused keeps the lime ring at
  2 px / 2 px offset; error-resting is a 2 px coral border with no ring;
  error-focused is a 2 px danger-ink border with a 2 px danger-ink ring at
  offset 0 and no lime anywhere.
- **No regression.** `/branding` and `/design-system` were fingerprinted against
  `main` — every element's position, size, colour, type, border, radius, opacity
  and shadow — at 1440, 820, 430 and 390 px: **4,130 elements, zero differences**.
  The only pixel that changes anywhere is the site-shell "App" nav link, which is
  no longer greyed out because the route now exists.

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

## Quality checks — the stylescape

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

The prototype covers the two required user stories and nothing else. There is
deliberately **no** onboarding, authentication, subscription, notification,
social feature or shopping list.
