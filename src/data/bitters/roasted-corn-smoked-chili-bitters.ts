
import { Product } from '../types';

export const roastedCornSmokiedChiliBitters: Product = {
  id: 2,
  name: 'Roasted Corn & Smoked Chili Bitters',
  category: 'bitters',
  price: 26.00,
  images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
  slug: 'roasted-corn-smoked-chili-bitters',
  description: "A celebration of fire and earth, this bold and evocative bitters combines the sweet nutty aroma of roasted corn with the smoky depth of dried chilies, paying homage to the rich Mesoamerican cuisine. Accented with cacao and warm spices, it delivers a savoury, smoky complexity that transforms cocktails into robust, unforgettable creations. Crafted for innovative bartenders, it's the essential ingredient for adding rich layers and a gentle heat to your drinks.",
  details: {
    ingredients: 'Water, alcohol (45% ABV), roasted corn, smoked chilies (pasilla, guajillo), cacao nibs, selected spices, natural botanicals.',
    size: '150ml (5.1 fl oz)',
    usage: '2-3 dashes per cocktail',
    flavorProfile: 'Savoury, smoky, and earthy, with hints of natural sweetness from roasted corn and a subtle heat from smoked chilies like pasilla or guajillo.'
  },
  signatureCocktails: [
    {
      name: 'Maiz à Trois',
      description: 'The Maiz à Trois celebrates the heart of Mexican culture with an intriguing combination of smoky, earthy, and subtly sweet flavors. Nixta Corn Liqueur provides a rich, corn-forward sweetness, balanced by the deep, bold character of Maiz Nation Mexican Whiskey. The Pox adds an extra layer of complexity, while the Roasted Corn and Chipotle Bitters introduce smoky heat and a touch of spice. The garnish of pickled baby corn, flambéed with aromatic salt, adds a touch of acidity and drama, enhancing the cocktail\'s overall depth. This drink is both a visual and flavorful experience, perfect for those who appreciate bold, nuanced flavors with a hint of flair.',
      ingredients: [
        '3cl Nixta Corn Liqueur',
        '1cl Pox',
        '2cl Maiz Nation Mexican Whiskey',
        '3 dashes Roasted Corn & Smoked Chili Bitters'
      ],
      garnish: [
        'Pickled baby corn, flambéed for dramatic effect',
        'A sprinkle of homemade aromatic salt (smoked paprika, chili flakes, and sea salt)'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [1, 18, 19],
  rating: 4.9,
  reviews: 18,
};
