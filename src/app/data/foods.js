/**
 * The food catalogue the Log screen searches and the Scan screen resolves.
 *
 * Macros are held once, per a stated basis (100 g, 100 ml, or one piece), and
 * every portion the product shows is scaled from that basis. No food in this
 * file carries a calorie figure: calories are produced only by `kcal()` in
 * `src/design-system/data.js`, over the same rounded macros the screen prints.
 *
 * The five foods the Stage 3 reference day is built from are reproduced here
 * exactly — scaling this catalogue to the reference portions returns
 * 72 P / 135 C / 38 F = 1,170 kcal, the figure the design system documents.
 */

/** Basis helpers. `base` is the amount `macros` describes, in `unit`. */
const per100g = (p, c, f) => ({ unit: 'g', base: 100, macros: { p, c, f } })
const per100ml = (p, c, f) => ({ unit: 'ml', base: 100, macros: { p, c, f } })
const perPiece = (p, c, f, pieceLabel) => ({
  unit: 'piece',
  base: 1,
  pieceLabel,
  macros: { p, c, f },
})

/**
 * Brands below are invented for the prototype so that no real product's
 * nutrition is misstated. The barcodes are equally fictional.
 */
export const FOODS = [
  {
    id: 'rolled-oats',
    name: 'Rolled Oats',
    note: 'Wholegrain, uncooked',
    group: 'Grains',
    defaultAmount: 60,
    step: 10,
    ...per100g(13.33, 65, 8.33),
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    note: '0% fat, natural',
    group: 'Dairy',
    defaultAmount: 150,
    step: 10,
    ...per100g(10, 5.33, 2),
  },
  {
    id: 'banana',
    name: 'Banana',
    note: 'Fresh, peeled',
    group: 'Fruit',
    defaultAmount: 118,
    step: 10,
    servingHint: '1 medium ≈ 118 g',
    ...per100g(0.89, 22.8, 0.3),
  },
  {
    id: 'almonds',
    name: 'Almonds',
    note: 'Raw, unsalted',
    group: 'Nuts',
    defaultAmount: 30,
    step: 5,
    ...per100g(21, 21.6, 49.9),
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    note: 'Skinless, grilled',
    group: 'Meat',
    defaultAmount: 150,
    step: 10,
    ...per100g(31, 0, 3.6),
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    note: 'Cooked',
    group: 'Grains',
    defaultAmount: 180,
    step: 10,
    ...per100g(2.6, 23, 0.9),
  },
  {
    id: 'white-rice',
    name: 'White Rice',
    note: 'Cooked, long grain',
    group: 'Grains',
    defaultAmount: 180,
    step: 10,
    ...per100g(2.7, 28, 0.3),
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    note: 'Cooked',
    group: 'Grains',
    defaultAmount: 180,
    step: 10,
    ...per100g(4.4, 21.3, 1.9),
  },
  {
    id: 'salmon-fillet',
    name: 'Salmon Fillet',
    note: 'Baked, no skin',
    group: 'Fish',
    defaultAmount: 130,
    step: 10,
    ...per100g(25, 0, 13),
  },
  {
    id: 'lean-beef-mince',
    name: 'Lean Beef Mince',
    note: '5% fat, cooked',
    group: 'Meat',
    defaultAmount: 150,
    step: 10,
    ...per100g(21, 0, 5),
  },
  {
    id: 'firm-tofu',
    name: 'Firm Tofu',
    note: 'Plain, drained',
    group: 'Plant protein',
    defaultAmount: 150,
    step: 10,
    ...per100g(16, 1.9, 9),
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas',
    note: 'Canned, drained',
    group: 'Plant protein',
    defaultAmount: 120,
    step: 10,
    ...per100g(7.2, 17.8, 2.6),
  },
  {
    id: 'cottage-cheese',
    name: 'Cottage Cheese',
    note: 'Low fat',
    group: 'Dairy',
    defaultAmount: 200,
    step: 10,
    ...per100g(11, 3.4, 4.3),
  },
  {
    id: 'cheddar',
    name: 'Cheddar Cheese',
    note: 'Mature block',
    group: 'Dairy',
    defaultAmount: 30,
    step: 5,
    ...per100g(25, 1.3, 33),
  },
  {
    id: 'whole-milk',
    name: 'Whole Milk',
    note: '3.6% fat',
    group: 'Dairy',
    defaultAmount: 250,
    step: 10,
    ...per100ml(3.4, 4.8, 3.6),
  },
  {
    id: 'egg',
    name: 'Egg',
    note: 'Large, whole',
    group: 'Dairy',
    defaultAmount: 2,
    step: 1,
    ...perPiece(6.3, 0.4, 4.8, 'egg'),
  },
  {
    id: 'wholemeal-bread',
    name: 'Wholemeal Bread',
    note: 'Sliced loaf',
    group: 'Grains',
    defaultAmount: 2,
    step: 1,
    ...perPiece(4.4, 18.5, 1.2, 'slice'),
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    note: 'Roasted, skin on',
    group: 'Vegetables',
    defaultAmount: 200,
    step: 10,
    ...per100g(2, 20.7, 0.1),
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    note: 'Steamed',
    group: 'Vegetables',
    defaultAmount: 150,
    step: 10,
    ...per100g(2.8, 7, 0.4),
  },
  {
    id: 'avocado',
    name: 'Avocado',
    note: 'Fresh, stone removed',
    group: 'Fruit',
    defaultAmount: 100,
    step: 10,
    ...per100g(2, 8.5, 15),
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    note: 'Fresh',
    group: 'Fruit',
    defaultAmount: 100,
    step: 10,
    ...per100g(0.7, 14.5, 0.3),
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    note: 'Extra virgin',
    group: 'Fats',
    defaultAmount: 14,
    step: 2,
    servingHint: '1 tbsp ≈ 14 g',
    ...per100g(0, 0, 100),
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    note: 'Smooth, no added sugar',
    group: 'Fats',
    defaultAmount: 32,
    step: 4,
    ...per100g(25, 20, 50),
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein Powder',
    note: 'Unflavoured',
    group: 'Supplements',
    defaultAmount: 30,
    step: 5,
    servingHint: '1 scoop ≈ 30 g',
    ...per100g(80, 6.7, 5),
  },

  /* ---- Packaged products, the ones a barcode resolves to ---- */
  {
    id: 'northline-protein-bar',
    name: 'Protein Bar, Chocolate Sea Salt',
    brand: 'Northline',
    note: '60 g bar',
    group: 'Packaged',
    barcode: '5012345678900',
    defaultAmount: 1,
    step: 1,
    ...perPiece(20, 22, 8, 'bar'),
  },
  {
    id: 'fieldhouse-oat-drink',
    name: 'Barista Oat Drink',
    brand: 'Fieldhouse',
    note: 'Unsweetened',
    group: 'Packaged',
    barcode: '5012345671234',
    defaultAmount: 250,
    step: 10,
    ...per100ml(1, 6.8, 3),
  },
  {
    id: 'nordveld-skyr',
    name: 'Vanilla Skyr',
    brand: 'Nordveld',
    note: '150 g pot',
    group: 'Packaged',
    barcode: '5012345679011',
    defaultAmount: 1,
    step: 1,
    ...perPiece(15.5, 12, 0.3, 'pot'),
  },
]

export const FOOD_BY_ID = Object.fromEntries(FOODS.map((f) => [f.id, f]))

/** The barcodes the simulated scanner knows, in the order it offers them. */
export const SCANNABLE = FOODS.filter((f) => f.barcode)

/** A barcode the catalogue deliberately does not know, for the not-found state. */
export const UNKNOWN_BARCODE = '4011200296908'
