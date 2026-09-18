/**
 * The recipe catalogue the Recipes screen searches and filters.
 *
 * `macros` is one serving, in printed grams. No recipe states its calories:
 * the energy figure on the card, in the detail header and in the Servings
 * sheet is `kcal(macros)` in every case.
 *
 * Photography: four recipes carry a photograph of the dish they actually are.
 * The rest use the design system's documented recipe-glyph placeholder rather
 * than borrowing a photograph of something they are not — the card reserves
 * the same 72 px box either way, so a row of cards stays aligned.
 */
import { PHOTOS } from '../../branding/photos'
import { DISH_PHOTOS } from './photos'

export const GOAL_FILTERS = ['Any goal', 'Cut', 'Maintain', 'Build']
export const TIME_FILTERS = [
  { id: 'any', label: 'Any time', max: Infinity },
  { id: '20', label: 'Under 20 min', max: 19 },
  { id: '35', label: 'Under 35 min', max: 34 },
]
export const DIET_FILTERS = ['High-protein', 'Vegetarian', 'Gluten-free', 'Dairy-free']

export const RECIPES = [
  {
    id: 'grilled-chicken-salad',
    name: 'Grilled Chicken Salad',
    summary:
      'Charred chicken over tomato, cucumber and radish, dressed with lemon and olive oil. The quickest high-protein plate in the book.',
    macros: { p: 38, c: 12, f: 14 },
    minutes: 20,
    serves: 2,
    goal: 'Cut',
    diets: ['High-protein', 'Gluten-free', 'Dairy-free'],
    photo: PHOTOS.dish,
    ingredients: [
      { name: 'Chicken breast', amount: '300 g' },
      { name: 'Tomatoes', amount: '200 g' },
      { name: 'Cucumber', amount: '150 g' },
      { name: 'Radishes', amount: '80 g' },
      { name: 'Olive oil', amount: '2 tbsp' },
      { name: 'Lemon juice', amount: '1 tbsp' },
    ],
    steps: [
      'Season the chicken with salt, pepper and half the lemon juice.',
      'Grill over a high heat for 6–7 minutes a side, until the thickest part reaches 74 °C.',
      'Rest the chicken for 5 minutes while you slice the tomato, cucumber and radish.',
      'Whisk the olive oil with the remaining lemon juice, slice the chicken and dress the plate.',
    ],
  },
  {
    id: 'high-protein-chicken-bowl',
    name: 'High-Protein Chicken Bowl',
    summary:
      'Brown rice, grilled chicken, chickpeas and avocado in one bowl. The training-day default: heavy on protein, honest about the fat.',
    macros: { p: 42, c: 55, f: 15 },
    minutes: 32,
    serves: 2,
    goal: 'Build',
    diets: ['High-protein', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Chicken breast', amount: '220 g' },
      { name: 'Brown rice, uncooked', amount: '140 g' },
      { name: 'Chickpeas, drained', amount: '50 g' },
      { name: 'Avocado', amount: '110 g' },
      { name: 'Spring onions', amount: '2' },
      { name: 'Smoked paprika', amount: '1 tsp' },
    ],
    steps: [
      'Simmer the rice for 25 minutes, then drain and keep covered.',
      'Rub the chicken with paprika and grill for 6 minutes a side.',
      'Warm the chickpeas through in the same pan for 2 minutes.',
      'Build the bowls: rice, sliced chicken, chickpeas, avocado, spring onion.',
    ],
  },
  {
    id: 'pear-bacon-spinach-salad',
    name: 'Grilled Pear & Bacon Spinach Salad',
    summary:
      'Grilled pear, crisp bacon and blackberries over young spinach. Sweet, salty, and ready in a quarter of an hour.',
    macros: { p: 14, c: 22, f: 19 },
    minutes: 15,
    serves: 2,
    goal: 'Maintain',
    diets: ['Gluten-free'],
    photo: DISH_PHOTOS.pearBaconSalad,
    ingredients: [
      { name: 'Baby spinach', amount: '120 g' },
      { name: 'Pears', amount: '2 firm' },
      { name: 'Streaky bacon', amount: '60 g' },
      { name: 'Blackberries', amount: '100 g' },
      { name: 'Walnuts', amount: '20 g' },
      { name: 'Balsamic vinegar', amount: '1 tbsp' },
    ],
    steps: [
      'Crisp the bacon in a dry pan, then drain on paper and break into shards.',
      'Halve the pears and grill cut-side down for 3 minutes, until marked.',
      'Toss the spinach with the balsamic and a spoon of the bacon fat.',
      'Top with the pear, bacon, blackberries and walnuts.',
    ],
  },
  {
    id: 'herb-omelette-greens',
    name: 'Herb Omelette with Greens',
    summary:
      'Three eggs, a handful of parsley and chives, and a pile of dressed leaves. Twelve minutes, start to plate.',
    macros: { p: 26, c: 6, f: 20 },
    minutes: 12,
    serves: 1,
    goal: 'Cut',
    diets: ['Vegetarian', 'Gluten-free'],
    photo: DISH_PHOTOS.herbOmelette,
    ingredients: [
      { name: 'Eggs', amount: '3 large' },
      { name: 'Flat-leaf parsley', amount: '10 g' },
      { name: 'Chives', amount: '5 g' },
      { name: 'Mixed leaves', amount: '60 g' },
      { name: 'Butter', amount: '5 g' },
    ],
    steps: [
      'Beat the eggs with the chopped herbs and a pinch of salt.',
      'Melt the butter in a 20 cm pan over a medium heat.',
      'Pour in the eggs, draw the set edges inward twice, then leave for 40 seconds.',
      'Fold, slide onto the plate and serve with the dressed leaves.',
    ],
  },
  {
    id: 'lemon-salmon-rice',
    name: 'Lemon Herb Salmon with Rice',
    summary:
      'Baked salmon with lemon and dill on white rice. A steady maintenance plate that still lands under 500 kcal a serving.',
    macros: { p: 34, c: 48, f: 16 },
    minutes: 28,
    serves: 2,
    goal: 'Maintain',
    diets: ['Gluten-free', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Salmon fillets', amount: '2 × 130 g' },
      { name: 'White rice, uncooked', amount: '120 g' },
      { name: 'Lemon', amount: '1' },
      { name: 'Dill', amount: '10 g' },
      { name: 'Green beans', amount: '150 g' },
    ],
    steps: [
      'Heat the oven to 200 °C and start the rice.',
      'Sit the salmon on lemon slices, scatter with dill, and bake for 12–14 minutes.',
      'Steam the beans for the last 5 minutes.',
      'Fork the rice through with lemon zest and plate the salmon on top.',
    ],
  },
  {
    id: 'turkey-sweet-potato',
    name: 'Turkey & Sweet Potato Skillet',
    summary:
      'Turkey mince, roast sweet potato and peppers in one pan. Makes three servings, so two of them are tomorrow.',
    macros: { p: 40, c: 44, f: 12 },
    minutes: 30,
    serves: 3,
    goal: 'Build',
    diets: ['High-protein', 'Gluten-free', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Turkey mince, 5%', amount: '500 g' },
      { name: 'Sweet potato', amount: '600 g' },
      { name: 'Red peppers', amount: '2' },
      { name: 'Red onion', amount: '1' },
      { name: 'Olive oil', amount: '1 tbsp' },
      { name: 'Smoked paprika', amount: '2 tsp' },
    ],
    steps: [
      'Dice the sweet potato and roast at 220 °C for 20 minutes.',
      'Brown the turkey in the oil over a high heat, breaking it up as it colours.',
      'Add the peppers, onion and paprika; cook for 6 minutes more.',
      'Fold the roast sweet potato through and season.',
    ],
  },
  {
    id: 'chickpea-spinach-curry',
    name: 'Chickpea & Spinach Curry',
    summary:
      'A weeknight curry that keeps: chickpeas, tomatoes and spinach in coconut milk. Four servings from one pan.',
    macros: { p: 18, c: 52, f: 14 },
    minutes: 35,
    serves: 4,
    goal: 'Maintain',
    diets: ['Vegetarian', 'Gluten-free', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Chickpeas, drained', amount: '2 × 400 g tins' },
      { name: 'Chopped tomatoes', amount: '400 g tin' },
      { name: 'Light coconut milk', amount: '200 ml' },
      { name: 'Baby spinach', amount: '200 g' },
      { name: 'Onion', amount: '1' },
      { name: 'Curry powder', amount: '2 tbsp' },
    ],
    steps: [
      'Soften the onion for 8 minutes, then toast the curry powder for 1 minute.',
      'Add the tomatoes and chickpeas and simmer for 15 minutes.',
      'Stir in the coconut milk and cook for 5 minutes more.',
      'Wilt the spinach through off the heat and season.',
    ],
  },
  {
    id: 'overnight-oats-berries',
    name: 'Overnight Oats with Berries',
    summary:
      'Oats, skyr and blueberries left in the fridge overnight. Ten minutes of work the night before a morning session.',
    macros: { p: 20, c: 54, f: 11 },
    minutes: 10,
    serves: 1,
    goal: 'Build',
    diets: ['Vegetarian'],
    photo: null,
    ingredients: [
      { name: 'Rolled oats', amount: '60 g' },
      { name: 'Vanilla skyr', amount: '150 g' },
      { name: 'Whole milk', amount: '80 ml' },
      { name: 'Blueberries', amount: '80 g' },
      { name: 'Almonds', amount: '10 g' },
    ],
    steps: [
      'Stir the oats, skyr and milk together in a jar.',
      'Fold half the blueberries through and seal.',
      'Refrigerate overnight, at least 6 hours.',
      'Top with the remaining berries and chopped almonds before eating.',
    ],
  },
  {
    id: 'cottage-cheese-toast',
    name: 'Cottage Cheese & Tomato Toast',
    summary:
      'Two slices of wholemeal, whipped cottage cheese and ripe tomato. Eight minutes for 24 g of protein.',
    macros: { p: 24, c: 30, f: 8 },
    minutes: 8,
    serves: 1,
    goal: 'Cut',
    diets: ['Vegetarian'],
    photo: DISH_PHOTOS.cottageCheeseToast,
    ingredients: [
      { name: 'Wholemeal bread', amount: '2 slices' },
      { name: 'Cottage cheese', amount: '150 g' },
      { name: 'Tomatoes', amount: '120 g' },
      { name: 'Chives', amount: '5 g' },
      { name: 'Olive oil', amount: '1 tsp' },
    ],
    steps: [
      'Toast the bread while you whip the cottage cheese smooth with a fork.',
      'Slice the tomatoes and salt them lightly.',
      'Spread the cheese thickly, layer the tomato on top.',
      'Finish with chives, cracked pepper and the olive oil.',
    ],
  },
  {
    id: 'beef-broccoli-stirfry',
    name: 'Beef & Broccoli Stir-Fry',
    summary:
      'Lean beef and broccoli in a ginger and soy sauce, on the table in 25 minutes. The heaviest protein plate in the list.',
    macros: { p: 45, c: 38, f: 18 },
    minutes: 25,
    serves: 2,
    goal: 'Build',
    diets: ['High-protein', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Lean beef strips', amount: '320 g' },
      { name: 'Broccoli', amount: '300 g' },
      { name: 'White rice, uncooked', amount: '90 g' },
      { name: 'Soy sauce', amount: '2 tbsp' },
      { name: 'Fresh ginger', amount: '15 g' },
      { name: 'Sesame oil', amount: '1 tbsp' },
    ],
    steps: [
      'Start the rice, then blanch the broccoli for 2 minutes and drain.',
      'Sear the beef in a very hot wok for 90 seconds, then set aside.',
      'Fry the ginger for 30 seconds, return the beef and broccoli, add the soy.',
      'Toss for a further minute and finish with the sesame oil.',
    ],
  },
  {
    id: 'creamy-mushroom-pasta',
    name: 'Creamy Mushroom Pasta',
    summary:
      'Chestnut mushrooms, garlic and crème fraîche through tagliatelle. Carb-heavy by design — a rest-day or a long-run plate.',
    macros: { p: 22, c: 78, f: 26 },
    minutes: 25,
    serves: 2,
    goal: 'Maintain',
    diets: ['Vegetarian'],
    photo: null,
    ingredients: [
      { name: 'Tagliatelle', amount: '180 g' },
      { name: 'Chestnut mushrooms', amount: '300 g' },
      { name: 'Crème fraîche', amount: '100 g' },
      { name: 'Garlic', amount: '3 cloves' },
      { name: 'Parmesan', amount: '20 g' },
      { name: 'Olive oil', amount: '1 tbsp' },
    ],
    steps: [
      'Boil the pasta, holding back a mug of the water.',
      'Fry the mushrooms hard in the oil until they colour, about 8 minutes.',
      'Add the garlic for a minute, then the crème fraîche and a splash of pasta water.',
      'Toss the drained pasta through and finish with grated parmesan.',
    ],
  },
  {
    id: 'halloumi-quinoa-bowl',
    name: 'Halloumi & Quinoa Bowl',
    summary:
      'Griddled halloumi over quinoa, roast courgette and mint. Vegetarian, filling, and frank about the fat halloumi brings.',
    macros: { p: 28, c: 52, f: 30 },
    minutes: 25,
    serves: 2,
    goal: 'Maintain',
    diets: ['Vegetarian', 'Gluten-free'],
    photo: null,
    ingredients: [
      { name: 'Halloumi', amount: '180 g' },
      { name: 'Quinoa, uncooked', amount: '120 g' },
      { name: 'Courgettes', amount: '2' },
      { name: 'Cherry tomatoes', amount: '150 g' },
      { name: 'Mint', amount: '10 g' },
      { name: 'Lemon', amount: '1' },
    ],
    steps: [
      'Simmer the quinoa for 15 minutes, then drain and fluff.',
      'Roast the courgette and tomatoes at 210 °C for 18 minutes.',
      'Griddle the halloumi for 2 minutes a side, until it marks.',
      'Fold the mint and lemon through the quinoa and build the bowls.',
    ],
  },
  {
    id: 'slow-roast-lamb',
    name: 'Slow-Roast Lamb with Potatoes',
    summary:
      'Shoulder of lamb roasted low with rosemary potatoes. A Sunday plate, and by a long way the biggest in the list.',
    macros: { p: 48, c: 70, f: 48 },
    minutes: 95,
    serves: 4,
    goal: 'Build',
    diets: ['Gluten-free', 'Dairy-free'],
    photo: null,
    ingredients: [
      { name: 'Lamb shoulder', amount: '1.2 kg' },
      { name: 'Potatoes', amount: '1 kg' },
      { name: 'Rosemary', amount: '4 sprigs' },
      { name: 'Garlic', amount: '1 bulb' },
      { name: 'Olive oil', amount: '2 tbsp' },
    ],
    steps: [
      'Heat the oven to 160 °C and score the lamb fat in a diamond pattern.',
      'Sit the lamb on halved potatoes, garlic and rosemary; oil and salt generously.',
      'Cover and roast for 75 minutes, then uncover for a final 20 to colour.',
      'Rest for 15 minutes before pulling the meat apart.',
    ],
  },
]

export const RECIPE_BY_ID = Object.fromEntries(RECIPES.map((r) => [r.id, r]))
