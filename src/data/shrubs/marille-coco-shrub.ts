
import { Product } from '../types';

export const marilleCocolShrub: Product = {
  id: 21,
  name: 'Marille & Coco Shrub',
  category: 'shrubs',
  price: 26.95,
  images: ['/assets/product-16.jpg', '/assets/product-16-alt.jpg', '/assets/product-16-detail.jpg'],
  slug: 'marille-coco-shrub',
  description: 'A bold fusion of ripe apricots and delicate coconut, this shrub captures the essence of late-summer orchards and sun-kissed shores. Sun-ripened Marille delivers a velvety, honeyed depth, while toasted coconut and a balanced duo of white wine and coconut vinegars create a bright, aromatic complexity. The result? A sophisticated, tropical twist on a timeless drinking vinegar—fruity, aromatic, and effortlessly versatile. Whether mixed into cocktails, mocktails, or sodas, Marille & Coco Shrub brings a taste of refined indulgence to every sip.',
  details: {
    ingredients: 'Sun-ripened apricots, toasted coconut, white wine vinegar, coconut vinegar, cane sugar, natural flavors.',
    size: '250ml (8.4 fl oz)',
    usage: '15-30ml per drink',
    flavorProfile: 'Velvety apricot sweetness with tropical coconut notes and balanced acidity.'
  },
  signatureCocktails: [
    {
      name: 'Marille De La Casa Blanca',
      description: 'A sophisticated tropical cocktail that showcases the fruity complexity of our Marille & Coco Shrub. The crisp blanco tequila provides a clean base, while apricot brandy amplifies the shrub\'s stone fruit notes. Verjus adds bright acidity that balances the sweetness, creating a well-rounded flavor profile. Garnished dramatically with a flambéed apricot slice and coconut flakes for visual appeal and added aroma.',
      ingredients: [
        '5cl Tequila Blanco',
        '3cl Apricot Brandy',
        '3cl Marille & Coco Shrub',
        '2cl Verjus Weinberg'
      ],
      garnish: [
        'Flambee Apricot slice',
        'Coconut flakes'
      ],
      imagePath: '/placeholder.svg'
    },
    {
      name: 'Marille Spritz',
      description: 'A refreshing non-alcoholic option that highlights the delicate balance of apricot and coconut in our Marille & Coco Shrub. The coconut water enhances the tropical notes while adding hydrating properties, and honey syrup provides natural sweetness that complements the fruit flavors. Topped with sparkling water for a refreshing effervescence and garnished with a fresh apricot wedge for aroma and visual appeal.',
      ingredients: [
        '4cl Marille & Coco Shrub',
        '4cl Coconut Water',
        '2cl honey syrup',
        '6cl sparkling water'
      ],
      garnish: [
        'Fresh apricot wedge'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [18, 19, 20],
  rating: 4.7,
  reviews: 12,
};
