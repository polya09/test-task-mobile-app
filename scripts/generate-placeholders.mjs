/**
 * Generates the local photography placeholders in /public/images.
 *
 * This session has no outbound access to stock-photo hosts, so no royalty-free
 * photographs could be downloaded and licensed honestly. Rather than invent
 * sources, the board ships clearly marked placeholders drawn at the exact ratio
 * of the frame they sit in, in the warm neutral tonality the photography
 * direction calls for. Swap them for licensed photographs file-for-file.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')
mkdirSync(OUT, { recursive: true })

const C = {
  linen: '#EDE7DB',
  stone: '#DFD8CA',
  wood: '#DFCDAE',
  clay: '#CEC3AE',
  shade: '#C3B9A5',
  deep: '#B3A891',
  plate: '#F6F3EC',
  food: ['#C7BC9E', '#B5C199', '#D8B98B', '#C2A788', '#ADB999', '#D2C2A1', '#BFA98D'],
}

/** Deterministic pseudo-random, so regenerating produces no diff noise. */
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const n = (v) => Number(v.toFixed(1))

/** Loose scatter of ingredient-sized shapes inside a radius. */
function scatter(cx, cy, r, count, seed, scale = 1) {
  const rand = rng(seed)
  const out = []
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2 + rand() * 0.7
    const rr = r * (0.16 + rand() * 0.6)
    const s = r * (0.1 + rand() * 0.13) * scale
    const x = cx + Math.cos(a) * rr
    const y = cy + Math.sin(a) * rr
    const fill = C.food[i % C.food.length]
    out.push(
      rand() > 0.42
        ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(s)}" fill="${fill}"/>`
        : `<rect x="${n(x - s)}" y="${n(y - s * 0.68)}" width="${n(s * 2)}" height="${n(s * 1.36)}" rx="${n(
            s * 0.5,
          )}" fill="${fill}" transform="rotate(${n(rand() * 60 - 30)} ${n(x)} ${n(y)})"/>`,
    )
  }
  return out.join('\n  ')
}

const plate = (cx, cy, r, seed, count = 9) => `
  <circle cx="${cx}" cy="${cy}" r="${n(r * 1.04)}" fill="${C.shade}" fill-opacity="0.5"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.plate}"/>
  <circle cx="${cx}" cy="${cy}" r="${n(r * 0.84)}" fill="none" stroke="${C.clay}" stroke-width="${n(r * 0.022)}"/>
  ${scatter(cx, cy, r * 0.74, count, seed)}`

const marks = (w, h) => {
  const m = Math.round(Math.min(w, h) * 0.035)
  const len = Math.round(Math.min(w, h) * 0.07)
  const sw = Math.max(2, Math.round(Math.min(w, h) / 300))
  return `
  <g stroke="#1C1F23" stroke-opacity="0.2" stroke-width="${sw}" fill="none">
    <path d="M${m} ${m + len}V${m}h${len}"/>
    <path d="M${w - m - len} ${m}h${len}v${len}"/>
    <path d="M${w - m} ${h - m - len}v${len}h-${len}"/>
    <path d="M${m + len} ${h - m}H${m}v-${len}"/>
  </g>
  <text x="${w / 2}" y="${h - Math.round(Math.min(w, h) * 0.045)}" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="${Math.max(11, Math.round(w / 34))}"
        letter-spacing="${Math.max(2, Math.round(w / 160))}" fill="#1C1F23" fill-opacity="0.34">PLACEHOLDER</text>`
}

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <rect width="${w}" height="${h}" fill="${C.linen}"/>
${body}
${marks(w, h)}
</svg>
`

/* ---- hero: 640 x 1240 frame, drawn at 2x ---- */
const hero = svg(
  1280,
  2480,
  `
  <rect y="1520" width="1280" height="960" fill="${C.wood}"/>
  <rect y="1520" width="1280" height="14" fill="${C.deep}" fill-opacity="0.35"/>
  ${plate(640, 800, 430, 12, 11)}
  <rect x="120" y="1660" width="440" height="300" rx="30" fill="${C.stone}" transform="rotate(-6 340 1810)"/>
  ${plate(360, 1820, 190, 44, 6)}
  <circle cx="900" cy="1790" r="150" fill="${C.plate}"/>
  <circle cx="900" cy="1790" r="104" fill="${C.food[1]}" fill-opacity="0.75"/>
  <rect x="740" y="2060" width="420" height="250" rx="26" fill="${C.stone}" transform="rotate(5 950 2185)"/>
  ${scatter(950, 2180, 130, 5, 77, 0.8)}`,
)

/* ---- lifestyle: 860 x 560 frame, drawn at 2x ---- */
const lifestyle = svg(
  1720,
  1120,
  `
  <rect y="700" width="1720" height="420" fill="${C.wood}"/>
  <rect y="700" width="1720" height="12" fill="${C.deep}" fill-opacity="0.3"/>
  <rect x="150" y="250" width="240" height="700" rx="120" fill="${C.clay}"/>
  <circle cx="270" cy="210" r="86" fill="${C.shade}"/>
  <rect x="470" y="330" width="220" height="620" rx="110" fill="${C.deep}" fill-opacity="0.55"/>
  <circle cx="580" cy="292" r="78" fill="${C.deep}" fill-opacity="0.7"/>
  <rect x="770" y="560" width="300" height="320" rx="34" fill="${C.stone}"/>
  <path d="M845 560v-52a75 75 0 0 1 150 0v52" fill="none" stroke="${C.deep}" stroke-width="18"/>
  ${scatter(920, 600, 110, 5, 23, 0.9)}
  <rect x="1180" y="300" width="230" height="650" rx="115" fill="${C.clay}"/>
  <circle cx="1295" cy="262" r="82" fill="${C.shade}"/>
  <rect x="1480" y="620" width="180" height="330" rx="40" fill="${C.stone}"/>`,
)

/* ---- top-down bowl thumb: 305 x 260 frame, drawn at 2x ---- */
const bowl = svg(610, 520, `<rect width="610" height="520" fill="${C.stone}"/>${plate(305, 250, 175, 31, 9)}`)

/* ---- ingredients on linen: 305 x 260 frame, drawn at 2x ---- */
const ingredients = svg(
  610,
  520,
  `
  <rect width="610" height="520" fill="${C.wood}"/>
  <rect x="60" y="60" width="490" height="400" rx="18" fill="${C.linen}" fill-opacity="0.85"/>
  ${scatter(305, 250, 175, 11, 57, 1.15)}`,
)

/* ---- recipe thumb: 150 x 150 frame, drawn at 2x ---- */
const recipeThumb = svg(300, 300, `<rect width="300" height="300" fill="${C.stone}"/>${plate(150, 142, 104, 91, 7)}`)

const files = [
  ['photo-hero-kitchen.svg', hero],
  ['photo-lifestyle-groceries.svg', lifestyle],
  ['photo-topdown-bowl.svg', bowl],
  ['photo-ingredients-linen.svg', ingredients],
  ['photo-recipe-thumb.svg', recipeThumb],
]

for (const [name, content] of files) {
  writeFileSync(resolve(OUT, name), content)
  console.log(`wrote public/images/${name}`)
}
