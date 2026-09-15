/**
 * Photography manifest — one entry per photographic frame on the board.
 *
 * Each file is already cropped to its frame's ratio (see README for the crop
 * rectangles), so `focus` stays centred; it exists so a future swap can be
 * art-directed without touching the layout.
 *   src      file in /public/images
 *   frame    the frame's designed size in board px
 *   focus    CSS object-position: the point the crop keeps centred
 *   fit      'cover' (default) or 'contain' for cut-outs on a surface
 *   surface  paint a warm neutral behind a transparent cut-out
 */
const IMG = `${import.meta.env.BASE_URL}images/`

export const PHOTOS = {
  hero: {
    src: `${IMG}photo-hero-pear-salad.jpg`,
    alt: 'Top-down photograph of a grilled pear, bacon, blackberry and spinach salad in a stoneware bowl on a pale wooden surface',
    frame: [640, 1040],
    focus: '50% 50%',
  },
  lifestyle: {
    src: `${IMG}photo-lifestyle-kitchen-phone.jpg`,
    alt: 'A woman in activewear checking her phone in a bright kitchen, beside a board of chopped fruit she has just prepared',
    frame: [860, 560],
    focus: '50% 50%',
  },
  prep: {
    src: `${IMG}photo-prep-parsley-hands.jpg`,
    alt: 'Close-up of hands holding a sprig of flat-leaf parsley above a tray of herbs during meal preparation',
    frame: [305, 260],
    focus: '50% 50%',
  },
  dish: {
    src: `${IMG}photo-dish-chicken-salad.png`,
    alt: 'Grilled chicken salad with tomato, cucumber and radish on a blue stoneware plate',
    frame: [305, 260],
    focus: '50% 50%',
    fit: 'contain',
    surface: true,
  },
  recipeThumb: {
    src: `${IMG}photo-dish-chicken-salad.png`,
    alt: 'Grilled chicken salad on a blue stoneware plate',
    frame: [150, 150],
    focus: '50% 50%',
    fit: 'contain',
  },
}
