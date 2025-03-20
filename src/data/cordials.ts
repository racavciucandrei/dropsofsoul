
import { Product } from './types';

// Cordials collection
export const cordials: Product[] = [
  {
    id: 9,
    name: 'Elderflower Cordial',
    category: 'cordials',
    price: 22.50,
    images: ['/assets/product-2.jpg', '/assets/product-2-alt.jpg', '/assets/product-2-detail.jpg'],
    slug: 'elderflower-cordial',
    description: 'Our Elderflower Cordial captures the delicate floral sweetness of elderflower blossoms. This versatile cordial can be mixed with sparkling water, added to cocktails, or used in desserts for a subtle floral complexity.',
    details: {
      ingredients: 'Water, cane sugar, elderflower extract, citric acid, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
    },
    related: [10, 11, 12],
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 10,
    name: 'Ginger Cordial',
    category: 'cordials',
    price: 21.95,
    images: ['/assets/product-5.jpg', '/assets/product-5-alt.jpg', '/assets/product-5-detail.jpg'],
    slug: 'ginger-cordial',
    description: 'Our Ginger Cordial balances the warmth and spice of fresh ginger with subtle sweetness. This cordial adds a spicy kick to Moscow Mules, can be mixed with hot water for a warming drink, or adds complexity to many cocktails.',
    details: {
      ingredients: 'Water, cane sugar, fresh ginger extract, lemon, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
    },
    related: [9, 11, 14],
    rating: 4.6,
    reviews: 28,
  },
  {
    id: 11,
    name: 'Lavender Cordial',
    category: 'cordials',
    price: 24.95,
    images: ['/assets/product-8.jpg', '/assets/product-8-alt.jpg', '/assets/product-8-detail.jpg'],
    slug: 'lavender-cordial',
    description: 'Our Lavender Cordial features the elegant floral notes of lavender balanced with a touch of citrus. This cordial pairs beautifully with gin, vodka, or simply mixed with sparkling water for a refreshing non-alcoholic drink.',
    details: {
      ingredients: 'Water, cane sugar, lavender extract, lemon, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
    },
    related: [9, 12, 13],
    rating: 4.7,
    reviews: 36,
  },
  {
    id: 12,
    name: 'Rose Cordial',
    category: 'cordials',
    price: 23.95,
    images: ['/assets/product-13.jpg', '/assets/product-13-alt.jpg', '/assets/product-13-detail.jpg'],
    slug: 'rose-cordial',
    description: 'Our Rose Cordial captures the delicate essence of rose petals with subtle sweetness. This elegant cordial adds a floral dimension to cocktails, can be mixed with champagne, or diluted with water for a refreshing drink.',
    details: {
      ingredients: 'Water, cane sugar, rose extract, lemon, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
    },
    related: [9, 11, 13],
    rating: 4.9,
    reviews: 33,
  },
  {
    id: 13,
    name: 'Hibiscus Cordial',
    category: 'cordials',
    price: 25.95,
    images: ['/assets/product-14.jpg', '/assets/product-14-alt.jpg', '/assets/product-14-detail.jpg'],
    slug: 'hibiscus-cordial',
    description: 'Our Hibiscus Cordial features the vibrant, tart flavor of hibiscus flowers with subtle sweetness. This bright red cordial adds striking color and flavor to cocktails, can be mixed with sparkling water, or used in desserts.',
    details: {
      ingredients: 'Water, cane sugar, hibiscus extract, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
    },
    related: [12, 9, 15],
    rating: 4.8,
    reviews: 39,
  },
  {
    id: 23,
    name: 'Raspberry & Lychee Cordial',
    category: 'cordials',
    price: 24.95,
    images: ['/assets/product-7.jpg', '/assets/product-7-alt.jpg', '/assets/product-7-detail.jpg'],
    slug: 'raspberry-lychee-cordial',
    description: 'This elegant cordial blends the tartness of ripe, succulent raspberries with the floral sweetness of lychee. By preserving the natural characteristics of the fruits through a precise, gentle extraction process, we achieve a well-rounded and smooth flavor. Ideal for both cocktails and mocktails, its balanced taste captures the essence of fresh fruit and lasting finish in every drop.',
    details: {
      ingredients: 'Water, cane sugar, raspberry extract, lychee extract, citric acid, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
      flavorProfile: 'A perfect balance of tart raspberry and delicate floral lychee sweetness, creating a sophisticated, fruit-forward profile.'
    },
    signatureCocktails: [
      {
        name: 'Lychee Clover Club',
        description: 'A sophisticated twist on the classic Clover Club, this cocktail combines the botanical notes of gin with the fruity complexity of our Raspberry & Lychee Cordial. The dry vermouth adds depth, while fresh raspberry puree and lemon juice bring bright, fresh acidity. The vegan foam creates a silky, luxurious texture, making this a visually stunning and deliciously balanced cocktail that showcases the cordial\'s unique flavor profile.',
        ingredients: [
          '5cl gin',
          '2cl Dry Vermouth',
          '3cl Raspberry & Lychee Cordial',
          '3cl Raspberry puree',
          '1cl fresh lemon juice',
          '3 dashes of vegan foam'
        ],
        garnish: [
          '3 raspberries on a pick',
          'Golden Lychee'
        ],
        imagePath: '/placeholder.svg'
      },
      {
        name: 'Rosita Encantada',
        description: 'An enchanting and sophisticated cocktail that showcases the versatility of the Raspberry & Lychee Cordial. The floral notes of Belsasar Rose vermouth combine beautifully with the unique character of coconut fat-washed tequila, creating a silky mouthfeel. The cordial brings fruity brightness, balanced by the acidity of Supasawa and the complexity of Peychaud\'s Bitters. The rose elements add an elegant aromatic dimension, while the saline solution enhances all flavors. The stunning coconut and rose isomalt candy garnish makes this award-winning creation as visually impressive as it is delicious.',
        ingredients: [
          '4cl Belsasar Rose',
          '3cl Coco Fat Washed Don Julio Blanco/Santa Spina Cruda',
          '1cl Rose Syrup',
          '2cl Raspberry & Lychee Cordial',
          '1cl Supasawa',
          '2 dashes Peychaud\'s Bitters',
          '3 drops Saline Solution 20%',
          '2 puffs Rose Water'
        ],
        garnish: [
          'Coconut & Rose Isomalt Candy'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [9, 11, 15],
    rating: 4.9,
    reviews: 16,
  },
];
