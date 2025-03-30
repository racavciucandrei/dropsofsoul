
import { Product } from '../types';

export const cherryBarkMarzipanShrub: Product = {
  id: 20,
  name: 'Cherry Bark & Marzipan Shrub',
  category: 'shrubs',
  price: 27.50,
  images: ['/assets/product-15.jpg', '/assets/product-15-alt.jpg', '/assets/product-15-detail.jpg'],
  slug: 'cherry-bark-marzipan-shrub',
  description: 'Inspired by the Cherokee tribe\'s traditional use of wild cherry bark for its medicinal and aromatic properties, this shrub captures its rich, earthy depth with subtle almond and vanilla undertones. Paired with the creamy nuttiness of marzipan and balanced by the fruity acidity of red wine vinegar, it offers a smooth yet complex flavor. This fusion of history and innovation makes it a sophisticated addition to both spirit-forward cocktails and refined non-alcoholic creations.',
  details: {
    ingredients: 'Wild cherry bark, marzipan, red wine vinegar, cane sugar, natural flavors.',
    size: '250ml (8.4 fl oz)',
    usage: '15-30ml per drink',
    flavorProfile: 'Rich, earthy cherry notes with creamy almond undertones and balanced acidity.'
  },
  signatureCocktails: [
    {
      name: 'Cherry Smoke Sour',
      description: 'A sophisticated twist on a classic sour that combines the smoky depth of mezcal with the nutty sweetness of amaretto. Our Cherry Bark & Marzipan Shrub is floated on top, creating beautiful layering and allowing its complex flavor to gradually integrate with each sip. The foaming bitters add a silky texture, while the mole bitters spritzed before pouring add an aromatic chocolate-spice component that complements the cherry and almond notes perfectly.',
      ingredients: [
        '3cl mezcal',
        '3cl amaretto',
        '3cl fresh lemon juice',
        '3 dashes foaming bitters',
        '3 puffs of Mole Bitters before pouring',
        '3cl Cherry Bark & Marzipan Shrub (floated)'
      ],
      garnish: [
        'Amarena cherry'
      ],
      imagePath: '/placeholder.svg'
    },
    {
      name: 'SansKir Royale',
      description: 'An elegant non-alcoholic take on the classic Kir Royale, this sophisticated mocktail pairs our Cherry Bark & Marzipan Shrub with alcohol-free prosecco for a celebratory drink without the spirits. The shrub provides complex cherry and almond notes that complement the bright acidity of the verjus-based prosecco alternative. Garnished with a long twist of lemon peel and a fresh cherry for visual appeal and aromatic enhancement.',
      ingredients: [
        '2cl Cherry & Marzipan Shrub',
        '10cl 0% Prosecco (Fizz Verjus Weinberg)'
      ],
      garnish: [
        'Long Lemon Peel',
        'Fresh cherry'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [18, 19, 21],
  rating: 4.9,
  reviews: 15,
};
