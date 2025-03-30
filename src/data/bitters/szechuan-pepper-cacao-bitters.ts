
import { Product } from '../types';

export const szechuanPepperCacaoBitters: Product = {
  id: 21,
  name: 'Szechuan Pepper & Cacao Bitters',
  category: 'bitters',
  price: 26.00,
  images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
  slug: 'szechuan-pepper-cacao-bitters',
  description: 'Discover the unexpected harmony of flavours with this bitters, where the numbing, floral heat of Szechuan meets the deep, roasted richness of cacao. Once prized in ancient China for its medicinal properties, Szechuan pepper blends seamlessly with cacao, a sacred ingredient of Mayans and Aztecs, celebrated as the "food of Gods". A subtle touch of vanilla and warm spices ties it all together, creating a complex profile that awakens the senses. Handcrafted for innovative bartenders, it\'s the perfect choice for adding a tingling twist to both classic and contemporary cocktails.',
  details: {
    ingredients: 'Water, alcohol (45% ABV), Szechuan peppercorns, cacao nibs, vanilla bean, selected spices, natural botanicals.',
    size: '150ml (5.1 fl oz)',
    usage: '2-3 dashes per cocktail',
    flavorProfile: 'Tingling, numbing spice of Szechuan peppercorns paired with the rich, earthy depth of cacao.'
  },
  signatureCocktails: [
    {
      name: 'One Night In Bangkok',
      description: 'This cocktail is as exciting and layered as the city itself. It starts with freshly muddled ginger for a spicy kick, balanced by sweet mango puree. The lemongrass and verbena cordial adds a fresh, aromatic dimension, while lime juice provides essential acidity. Coconut-infused aged rum creates a tropical base that carries all the flavors. The combination of dried mango bitters and Szechuan and cacao bitters adds depth and complexity. The finishing touch: a silky lemongrass espuma crowned with freshly grated nutmeg, offering a creamy, aromatic contrast to the zesty and spicy profile below. A true sensory adventure that leaves you wanting more—just like an unforgettable night in Bangkok.',
      ingredients: [
        '1 small piece of fresh ginger (muddled)',
        '4cl Mango puree (sweetened)',
        '2cl Lemongrass and verbena cordial',
        '1cl Lime juice',
        '5cl Coconut-infused light aged rum',
        '3 dashes Dried mango bitters',
        '5 dashes Szechuan Pepper & Cacao Bitters'
      ],
      garnish: [
        'Lemongrass Espuma',
        'Freshly ground nutmeg'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [2, 19, 20],
  rating: 4.8,
  reviews: 7,
};
