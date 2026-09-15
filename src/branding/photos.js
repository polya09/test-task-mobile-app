/**
 * Photography manifest — one entry per photographic frame on the board.
 *
 * Swapping a generated stand-in for a licensed photograph is a data change
 * here, not a layout change in Stylescape.jsx:
 *   src         file in /public/images (any web format)
 *   frame       the frame's designed size in board px — crop to this ratio
 *   focus       CSS object-position: the point the crop keeps centred
 *   fit         'cover' (default) or 'contain' for cut-outs on a surface
 *   surface     paint a warm neutral behind a transparent cut-out
 *   placeholder true while the file is a generated stand-in; set to false and
 *               the on-board PLACEHOLDER tag disappears with it
 */
const IMG = `${import.meta.env.BASE_URL}images/`

export const PHOTOS = {
  hero: {
    src: `${IMG}photo-hero-kitchen.svg`,
    alt: 'Placeholder for the hero photograph: a top-down meal in a well-lit training kitchen',
    frame: [640, 1240],
    focus: '50% 50%',
    placeholder: true,
  },
  lifestyle: {
    src: `${IMG}photo-lifestyle-groceries.svg`,
    alt: 'Placeholder for a 45-degree lifestyle photograph of people carrying groceries in daylight',
    frame: [860, 560],
    focus: '50% 50%',
    placeholder: true,
  },
  prep: {
    src: `${IMG}photo-topdown-bowl.svg`,
    alt: 'Placeholder for a close-up photograph of hands preparing food',
    frame: [305, 260],
    focus: '50% 50%',
    placeholder: true,
  },
  dish: {
    src: `${IMG}photo-ingredients-linen.svg`,
    alt: 'Placeholder for a compact top-down photograph of a plated dish',
    frame: [305, 260],
    focus: '50% 50%',
    placeholder: true,
  },
  recipeThumb: {
    src: `${IMG}photo-recipe-thumb.svg`,
    alt: 'Placeholder for a top-down photograph of a chicken and grain bowl',
    frame: [150, 150],
    focus: '50% 50%',
    placeholder: true,
  },
}
