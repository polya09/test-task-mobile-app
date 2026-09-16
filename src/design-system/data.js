/**
 * The single dataset the whole design system is documented with.
 *
 * Every number below is derived, not invented. Atwater factors are
 * 4 kcal/g protein, 4 kcal/g carbohydrate, 9 kcal/g fat, and `kcal()`
 * is the only place calories are produced, so nothing can drift.
 */

export const ATWATER = { p: 4, c: 4, f: 9 }

export const kcal = ({ p, c, f }) => p * ATWATER.p + c * ATWATER.c + f * ATWATER.f

/** Daily targets for the reference profile: 78 kg adult, cutting, trains 4x/week. */
export const TARGET = { kcal: 2000, p: 150, c: 205, f: 62 }
// 150*4 + 205*4 + 62*9 = 600 + 820 + 558 = 1,978 kcal — the 2,000 kcal target
// rounded to the nearest 25, which is how the app states goals.

/** What the reference day contains so far. */
export const LOGGED = [
  { id: 'oats', name: 'Rolled Oats', serving: '60 g', macros: { p: 8, c: 39, f: 5 }, time: '07:20' },
  { id: 'yogurt', name: 'Greek Yogurt', serving: '150 g', macros: { p: 15, c: 8, f: 3 }, time: '07:20' },
  { id: 'banana', name: 'Banana', serving: '118 g', macros: { p: 1, c: 27, f: 0 }, time: '10:05' },
  { id: 'bowl', name: 'Chicken Bowl', serving: '1 bowl', macros: { p: 42, c: 55, f: 15 }, time: '13:15' },
  { id: 'almonds', name: 'Almonds', serving: '30 g', macros: { p: 6, c: 6, f: 15 }, time: '16:40' },
]

export const CONSUMED = LOGGED.reduce(
  (sum, item) => ({
    p: sum.p + item.macros.p,
    c: sum.c + item.macros.c,
    f: sum.f + item.macros.f,
  }),
  { p: 0, c: 0, f: 0 },
)
// 72 P + 135 C + 38 F = 288 + 540 + 342 = 1,170 kcal

export const CONSUMED_KCAL = kcal(CONSUMED)
export const REMAINING_KCAL = TARGET.kcal - CONSUMED_KCAL
export const DAY_PROGRESS = CONSUMED_KCAL / TARGET.kcal

/** Macro rows, in the fixed order protein → carbohydrate → fat. */
export const MACROS = [
  {
    key: 'p',
    name: 'Protein',
    short: 'P',
    value: CONSUMED.p,
    target: TARGET.p,
    colour: 'var(--ds-protein)',
    track: 'var(--ds-protein-track)',
    token: '--ds-protein',
  },
  {
    key: 'c',
    name: 'Carbs',
    short: 'C',
    value: CONSUMED.c,
    target: TARGET.c,
    colour: 'var(--ds-carbs)',
    track: 'var(--ds-carbs-track)',
    token: '--ds-carbs',
  },
  {
    key: 'f',
    name: 'Fat',
    short: 'F',
    value: CONSUMED.f,
    target: TARGET.f,
    colour: 'var(--ds-fat)',
    track: 'var(--ds-fat-track)',
    token: '--ds-fat',
  },
]

export const nf = new Intl.NumberFormat('en-US')

/** A single food, used by the food card and the search results. */
export const FOOD = LOGGED[1] // Greek Yogurt — 15 P, 8 C, 3 F = 119 kcal

export const RECIPE = {
  name: 'High-Protein Chicken Bowl',
  macros: { p: 42, c: 55, f: 15 }, // 523 kcal
  minutes: 32,
  goal: 'Muscle gain',
  serves: 2,
}

/* ---------------------------------------------------------------- *
 * Token reference tables — what the Foundations section documents.  *
 * ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- *
 * Contrast — measured, never typed.                                 *
 *                                                                   *
 * Every ratio this page prints is computed here from the same hex    *
 * values the components use, so the documentation cannot drift away  *
 * from the design. WCAG 2.1 relative luminance.                      *
 * ---------------------------------------------------------------- */

const channel = (c) => {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

const rgb = (hex) => {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}

export const luminance = (hex) => {
  const [r, g, b] = rgb(hex).map(channel)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast ratio between two hex colours, to two decimals. */
export const contrast = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)]
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Formatted for display: "12.91:1". */
export const ratio = (a, b) => `${contrast(a, b).toFixed(2)}:1`

/** The surfaces a text colour is ever documented against. */
export const SURFACE = {
  graphite: '#1C1F23',
  paper: '#F7F5EF',
  surface: '#FFFFFF',
  sunken: '#F1EFE9',
  lime: '#C6F432',
  carbs: '#FFA62B',
  fat: '#8FD0F7',
  successSurface: '#EEF6DC',
  warningSurface: '#FDF1DC',
  dangerSurface: '#FFECEA',
  infoSurface: '#EFF1F2',
}

export const INK = {
  graphite: '#1C1F23',
  paper: '#F7F5EF',
  secondary: '#4A4E55',
  muted: '#6B6F76',
  deepLime: '#557A00',
  coral: '#FF5A4E',
  borderControl: '#8E9289',
  disabled: '#82868C',
  success: '#446200',
  warning: '#8A5A00',
  danger: '#B3271B',
  info: '#2E3238',
}

export const BRAND_COLOURS = [
  {
    token: '--k-lime',
    name: 'Electric lime',
    hex: '#C6F432',
    role: 'Brand, primary action, active state',
    ink: 'Graphite',
    ratio: ratio('#C6F432', INK.graphite),
  },
  {
    token: '--k-graphite',
    name: 'Graphite',
    hex: '#1C1F23',
    role: 'Primary ink; inverse surface for selected elements',
    ink: 'Warm paper',
    ratio: ratio('#1C1F23', SURFACE.paper),
  },
  {
    token: '--k-paper',
    name: 'Warm paper',
    hex: '#F7F5EF',
    role: 'Page canvas',
    ink: 'Graphite',
    ratio: ratio('#F7F5EF', INK.graphite),
  },
  {
    token: '--k-surface',
    name: 'Surface',
    hex: '#FFFFFF',
    role: 'Cards, sheets, inputs',
    ink: 'Graphite',
    ratio: ratio('#FFFFFF', INK.graphite),
  },
  {
    token: '--k-muted',
    name: 'Muted',
    hex: '#6B6F76',
    role: 'Secondary labels, metadata',
    ink: 'On surface',
    ratio: ratio('#6B6F76', SURFACE.surface),
  },
  {
    token: '--k-border',
    name: 'Border',
    hex: '#E5E7E3',
    role: 'Dividers, card edges (decorative only)',
    ink: '—',
    ratio: 'n/a',
  },
  {
    token: '--k-lime-deep',
    name: 'Deep lime',
    hex: '#557A00',
    role: 'Focus ring, accessible lime text',
    ink: 'On warm paper',
    ratio: ratio('#557A00', SURFACE.paper),
  },
  {
    token: '--k-coral',
    name: 'Signal coral',
    hex: '#FF5A4E',
    role: 'Error indicator fill — never error text',
    ink: 'Graphite',
    ratio: ratio('#FF5A4E', INK.graphite),
  },
]

export const SEMANTIC_COLOURS = [
  { token: '--ds-text-primary', hex: INK.graphite, role: 'Body and heading ink', on: 'Surface', bg: SURFACE.surface },
  { token: '--ds-text-secondary', hex: INK.secondary, role: 'Supporting copy', on: 'Surface', bg: SURFACE.surface },
  { token: '--ds-text-muted', hex: INK.muted, role: 'Metadata, units, captions', on: 'Surface', bg: SURFACE.surface },
  { token: '--ds-text-inverse', hex: SURFACE.paper, role: 'Ink on graphite', on: 'Graphite', bg: SURFACE.graphite },
  { token: '--ds-text-on-accent', hex: INK.graphite, role: 'Ink on lime, amber, blue', on: 'Lime', bg: SURFACE.lime },
  { token: '--ds-text-disabled', hex: INK.disabled, role: 'Disabled controls — exempt from AA, held above 3:1', on: 'Sunken', bg: SURFACE.sunken },
  { token: '--ds-border-control', hex: INK.borderControl, role: 'Input and control boundaries', on: 'Surface', bg: SURFACE.surface },
  { token: '--ds-focus', hex: INK.deepLime, role: '2 px focus ring, all interactives', on: 'Surface', bg: SURFACE.surface },
  { token: '--ds-success-ink', hex: INK.success, role: 'Success text and icon', on: 'Success surface', bg: SURFACE.successSurface },
  { token: '--ds-warning-ink', hex: INK.warning, role: 'Warning text and icon', on: 'Warning surface', bg: SURFACE.warningSurface },
  { token: '--ds-danger-ink', hex: INK.danger, role: 'Error text and icon', on: 'Error surface', bg: SURFACE.dangerSurface },
  { token: '--ds-info-ink', hex: INK.info, role: 'Neutral information', on: 'Info surface', bg: SURFACE.infoSurface },
].map((c) => ({ ...c, ratio: ratio(c.hex, c.bg) }))

export const MACRO_COLOURS = [
  { token: '--ds-protein', hex: '#C6F432', name: 'Protein', role: 'Protein bars, dots, legends' },
  { token: '--ds-carbs', hex: '#FFA62B', name: 'Carbohydrate', role: 'Carbohydrate bars, dots, legends' },
  { token: '--ds-fat', hex: '#8FD0F7', name: 'Fat', role: 'Fat bars, dots, legends' },
].map((c) => ({ ...c, ratio: ratio(c.hex, INK.graphite) }))

export const TYPE_SCALE = [
  { name: 'Display', font: 'Sora', weight: 700, size: 48, lh: 52, tracking: '-0.02em', use: 'Hero calorie figure, splash' },
  { name: 'Heading 1', font: 'Sora', weight: 700, size: 36, lh: 42, tracking: '-0.02em', use: 'Screen title' },
  { name: 'Heading 2', font: 'Sora', weight: 600, size: 28, lh: 34, tracking: '-0.01em', use: 'Section title' },
  { name: 'Heading 3', font: 'Sora', weight: 600, size: 22, lh: 28, tracking: '-0.01em', use: 'Card title' },
  { name: 'Number XL', font: 'Sora', weight: 700, size: 40, lh: 44, tracking: '-0.02em', use: 'Ring centre, kcal total', tnum: true },
  { name: 'Number L', font: 'Sora', weight: 700, size: 28, lh: 32, tracking: '-0.01em', use: 'Card figure', tnum: true },
  { name: 'Number M', font: 'Sora', weight: 600, size: 20, lh: 24, tracking: '0', use: 'List row figure', tnum: true },
  { name: 'Body L', font: 'Inter', weight: 400, size: 17, lh: 26, tracking: '0', use: 'Long-form copy' },
  { name: 'Body M', font: 'Inter', weight: 400, size: 15, lh: 24, tracking: '0', use: 'Default UI text' },
  { name: 'Body S', font: 'Inter', weight: 400, size: 13, lh: 20, tracking: '0', use: 'Secondary detail' },
  { name: 'Label', font: 'Inter', weight: 600, size: 13, lh: 16, tracking: '0.02em', use: 'Buttons, field labels, tabs' },
  { name: 'Caption', font: 'Inter', weight: 500, size: 12, lh: 16, tracking: '0.01em', use: 'Helper text, units' },
  { name: 'Overline', font: 'Inter', weight: 700, size: 11, lh: 14, tracking: '0.14em', use: 'Group headers', upper: true },
]

export const SPACING = [
  { token: '--ds-space-1', px: 4, step: '0.5×', use: 'Icon-to-label gap' },
  { token: '--ds-space-2', px: 8, step: '1×', use: 'Chip padding, dot gaps' },
  { token: '--ds-space-3', px: 12, step: '1.5×', use: 'Control inner padding' },
  { token: '--ds-space-4', px: 16, step: '2×', use: 'Card padding, grid gutter' },
  { token: '--ds-space-5', px: 24, step: '3×', use: 'Between cards' },
  { token: '--ds-space-6', px: 32, step: '4×', use: 'Between groups' },
  { token: '--ds-space-7', px: 40, step: '5×', use: 'Sheet padding' },
  { token: '--ds-space-8', px: 48, step: '6×', use: 'Between sections' },
  { token: '--ds-space-9', px: 64, step: '8×', use: 'Screen top padding' },
  { token: '--ds-space-10', px: 80, step: '10×', use: 'Empty-state inset' },
  { token: '--ds-space-11', px: 96, step: '12×', use: 'Board section rhythm' },
]

export const RADII = [
  { token: '--ds-radius-xs', px: 8, use: 'Badges, macro bar caps' },
  { token: '--ds-radius-s', px: 12, use: 'Inputs, small tiles', brand: '--k-radius-s' },
  { token: '--ds-radius-m', px: 16, use: 'Buttons, segmented control' },
  { token: '--ds-radius-l', px: 24, use: 'Cards, bottom sheet', brand: '--k-radius-m' },
  { token: '--ds-radius-xl', px: 40, use: 'Hero panel', brand: '--k-radius-l' },
  { token: '--ds-radius-pill', px: 999, use: 'Chips, tags, pill buttons' },
]

export const SHADOWS = [
  { token: '--ds-shadow-sm', label: 'Small', use: 'Resting card on paper' },
  { token: '--ds-shadow-md', label: 'Medium', use: 'Raised card, dropdown' },
  { token: '--ds-shadow-lg', label: 'Large', use: 'Modal, toast' },
  { token: '--ds-shadow-sheet', label: 'Sheet', use: 'Bottom sheet, upward cast' },
]

export const ICON_SIZES = [
  { token: '--ds-icon-xs', px: 16, use: 'Inline with Body S' },
  { token: '--ds-icon-s', px: 20, use: 'Chips, tags, list affordances' },
  { token: '--ds-icon-m', px: 24, use: 'Default — buttons, nav, inputs' },
  { token: '--ds-icon-l', px: 32, use: 'Card headers' },
  { token: '--ds-icon-xl', px: 40, use: 'Empty and error states' },
]
