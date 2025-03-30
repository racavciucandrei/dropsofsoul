
import { Product } from '../types';

export const pineappleLimeShrub: Product = {
  id: 19,
  name: 'Pineapple & Lime Shrub',
  category: 'shrubs',
  price: 25.95,
  images: ['/assets/product-12.jpg', '/assets/product-12-alt.jpg', '/assets/product-12-detail.jpg'],
  slug: 'pineapple-lime-shrub',
  description: 'Sweet tropical notes of pineapple with the tartness of lime come together in perfect harmony in this lively fusion, delivering a fresh and tangy experience. Carefully crafted to preserve the vibrant flavours in every drop, with natural sweetness of pineapple and the sharp citrusy punch of lime creating an ingredient that\'s ideal for light and refreshing drinks. This shrub balances acidity and sweetness, perfect for spritzers, cocktails, or a zingy twist in mocktails.',
  details: {
    ingredients: 'Pineapple, lime, apple cider vinegar, cane sugar, natural flavors.',
    size: '250ml (8.4 fl oz)',
    usage: '15-30ml per drink',
    flavorProfile: 'Sweet tropical pineapple balanced with bright lime, creating a refreshing and vibrant flavor combination.'
  },
  signatureCocktails: [
    {
      name: 'Tepache Dream',
      description: 'A complex and tropical cocktail that balances the aged warmth of reposado tequila with smoky notes of mezcal. Our Pineapple & Lime Shrub adds bright acidity and tropical sweetness, enhanced by fresh lime juice and specialized tepache bitters. Served over crushed ice and topped with cleared carbonized pineapple juice for added effervescence and flavor, this cocktail offers a sophisticated balance of sweet, smoky, and tangy notes. Garnished with sustainable pineapple fronds and dried fruit wheels for visual appeal and zero waste.',
      ingredients: [
        '4cl Tequila Reposado',
        '1cl Mezcal',
        '3cl Pineapple & Lime Shrub',
        '1cl Fresh lime juice',
        '3 dashes Tepache Bitters',
        'Cleared Carbonised Pineapple Juice'
      ],
      garnish: [
        'Pineapple Fronds',
        'Dried pineapple wheel',
        'Dried Lime Wheel'
      ],
      imagePath: '/placeholder.svg'
    },
    {
      name: 'Tropical Drift',
      description: 'A refreshing non-alcoholic option that showcases the vibrant flavors of our Pineapple & Lime Shrub. The coconut water adds hydrating electrolytes and a subtle tropical sweetness, while the alcohol-free falernum brings warm spice notes. Fresh lime juice enhances the citrus brightness, and soda water adds refreshing effervescence. Garnished with a lime wheel and toasted coconut flakes, this mocktail offers a sophisticated tropical escape.',
      ingredients: [
        '5cl Pineapple & Lime Shrub',
        '10cl coconut water',
        '1cl 0% Falernum',
        '1cl fresh lime juice',
        'Soda water'
      ],
      garnish: [
        'Lime wheel',
        'Toasted coconut flakes'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [18, 20, 21],
  rating: 4.8,
  reviews: 19,
};
