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



