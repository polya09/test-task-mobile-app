/**
 * Photography manifest — one entry per photographic frame on the board.
 *
 * Files are full-frame: nothing is pre-cropped. Each frame composes its own
 * crop with object-fit and object-position, so re-framing a shot is a one-line
 * change here and never touches the layout.
 *   src     file in /public/images
 *   frame   the frame's designed size in board px
 *   focus   CSS object-position — the point the crop holds in view
 *   fit     'cover' (default) or 'contain' for cut-outs on a surface
 *   surface paint a lit surface behind a transparent cut-out
 */
const IMG = `${import.meta.env.BASE_URL}images/`

export const PHOTOS = {
  // Portrait frame against a landscape source: the visible window is the middle
  // 41% of the width, which holds the whole bowl with light surface either side.
  hero: {
    src: `${IMG}photo-hero-pear-salad.webp`,
    alt: 'Top-down photograph of a grilled pear, bacon, blackberry and spinach salad in a stoneware bowl on a pale wooden surface',
    frame: [640, 1040],
    focus: '49% 50%',
  },
  // Near-identical ratios: biased a little above centre to favour her and the
  // prepared board over the foreground clutter.
  lifestyle: {
    src: `${IMG}photo-lifestyle-kitchen-phone.webp`,
    alt: 'A woman in activewear checking her phone in a bright kitchen, beside a board of chopped fruit she has just prepared',
    frame: [860, 560],
    focus: '50% 42%',
  },
  // Pushed right of centre so the crop lands on the hands, the sprig and the
  // herbs rather than the dark oven along the left edge.
  prep: {
    src: `${IMG}photo-prep-parsley-hands.webp`,
    alt: 'Close-up of hands holding a sprig of flat-leaf parsley above a tray of herbs during meal preparation',
    frame: [305, 260],
    focus: '58% 50%',
  },
  dish: {
    src: `${IMG}photo-dish-chicken-salad.webp`,
    alt: 'Grilled chicken salad with tomato, cucumber and radish on a blue stoneware plate',
    frame: [305, 260],
    focus: '50% 50%',
    fit: 'contain',
    surface: true,
  },
  recipeThumb: {
    src: `${IMG}photo-dish-chicken-salad.webp`,
    alt: 'Grilled chicken salad on a blue stoneware plate',
    frame: [150, 150],
    focus: '50% 50%',
    fit: 'contain',
  },
}
