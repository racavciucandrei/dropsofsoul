
import { Product } from '../types';

export const coffeeGrapefruitBitters: Product = {
  id: 19,
  name: 'Coffee & Grapefruit Bitters',
  category: 'bitters',
  price: 26.00,
  images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
  slug: 'coffee-grapefruit-bitters',
  description: 'Inspired by the contrast of the bold mornings and refreshing afternoons, this bitters combines the deep, roasted aroma of coffee with the vibrant zest of grapefruit. It reflects the balance between richness and brightness-a perfect companion for cocktails seeking complexity, bringing depth and character to every creations. Handcrafted in small batches to awaken your cocktails.',
  details: {
    ingredients: 'Water, alcohol (45% ABV), coffee beans, grapefruit peel, selected spices, natural botanicals.',
    size: '150ml (5.1 fl oz)',
    usage: '2-3 dashes per cocktail',
    flavorProfile: 'Bold and rich, balancing the roasted bitterness of coffee with the bright, zesty notes of grapefruit.'
  },
  signatureCocktails: [
    {
      name: 'Citrus Roast Negroni',
      description: 'The Citrus Roast Negroni celebrates the art of infusion with its bold, layered profile. Notes of roasted coffee complement the bittersweet complexity of Campari, while the grapefruit peel adds a refreshing aromatic brightness. Perfect for lovers of bold, innovative twists on the classics.',
      ingredients: [
        '3cl coffee-infused Campari',
        '3cl sweet vermouth',
        '3cl grapefruit infused gin',
        '3 dashes Coffee & Grapefruit Bitters'
      ],
      garnish: [
        'Grapefruit twist',
        '3 Coffee Beans'
      ],
      imagePath: '/lovable-uploads/c2e8a3b9-d5d9-489b-9e4f-a99c0276d16d.png'
    }
  ],
  related: [1, 18, 20],
  rating: 4.7,
  reviews: 12,
};
