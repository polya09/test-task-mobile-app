/**
 * Recipe photography for the prototype.
 *
 * Kept here rather than in `src/branding/photos.js` so that Stage 2's manifest
 * — and the stylescape that reads it — stays exactly as it was.
 *
 * All three files are transparent cut-outs, so they follow the rule the
 * stylescape states: a cut-out is never left floating. `surface: true` puts it
 * on a lit surface with a defined edge and a contact shadow that follows the
 * plate's alpha, and `fit: 'contain'` means the plate is never cropped or
 * stretched, at any frame ratio.
 *
 * Each file was normalised on the plate itself rather than on its alpha bounds
 * — the soft shadow reaches the source edge and would otherwise pull the
 * centre off to one side. Every plate now measures 792 px inside a 900 px
 * square, so the three read at identical scale in a card and in a hero.
 */
const IMG = `${import.meta.env.BASE_URL}images/`

export const DISH_PHOTOS = {
  cottageCheeseToast: {
    src: `${IMG}photo-dish-cottage-cheese-toast.webp`,
    alt: 'Slice of toasted sourdough spread thickly with cottage cheese and layered with four overlapping tomato slices, scattered with fresh basil leaves, cracked black pepper and dried oregano, on a speckled stoneware plate',
    fit: 'contain',
    focus: '50% 50%',
    surface: true,
  },
  herbOmelette: {
    src: `${IMG}photo-dish-herb-omelette.webp`,
    alt: 'Folded golden omelette flecked with spinach and fresh herbs, topped with chopped chives and cracked pepper, served beside a salad of rocket, red and green leaves and halved cherry tomatoes on a speckled stoneware plate',
    fit: 'contain',
    focus: '50% 50%',
    surface: true,
  },
  pearBaconSalad: {
    src: `${IMG}photo-dish-pear-bacon-salad.webp`,
    alt: 'Bowl of baby spinach tossed with griddled pear wedges, crisp bacon pieces, walnut halves, crumbled blue cheese, dried cranberries and sliced red onion, dressed and finished with cracked pepper',
    fit: 'contain',
    focus: '50% 50%',
    surface: true,
  },
}
