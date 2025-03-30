
import { Product } from '../types';

export const curryLeafTamarindBitters: Product = {
  id: 20,
  name: 'Curry Leaf & Tamarind Bitters',
  category: 'bitters',
  price: 26.00,
  images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
  slug: 'curry-leaf-tamarind-bitters',
  description: 'Crafted with care, this distinctive bitters blend captures the essence of Indian culinary traditions. The bold, herbal aroma of curry leaves meets the tangy richness of tamarind. Taste the essence of tradition, reimagined for the modern bar. Made by hand in small batches to ensure quality and authenticity.',
  details: {
    ingredients: 'Water, alcohol (45% ABV), curry leaves, tamarind paste, selected spices, natural botanicals.',
    size: '150ml (5.1 fl oz)',
    usage: '2-3 dashes per cocktail',
    flavorProfile: 'Herbal and tangy, with the distinct savory notes of curry leaves balanced by the tart richness of tamarind.'
  },
  signatureCocktails: [
    {
      name: 'Masala Chai Gimlet',
      description: 'The Masala Chai Gimlet is a sophisticated fusion of East meets West, combining the botanical complexity of London Dry Gin with the warm, spiced notes of masala chai. The fresh lime juice adds brightness, while the Curry Leaf & Tamarind Bitters bring depth and a distinctive savory element that transforms this classic cocktail into a culinary adventure. The tamarind and curry powder garnish not only enhances the aroma but provides a visual nod to the drink\'s inspiration, creating a multi-sensory experience that pays homage to Indian flavors.',
      ingredients: [
        '5cl London Dry Gin',
        '3cl masala chai cordial',
        '1cl fresh lime juice',
        '3 dashes Curry Leaf & Tamarind Bitters'
      ],
      garnish: [
        'Tamarind',
        'Curry powder'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [1, 2, 21],
  rating: 4.7,
  reviews: 9,
};
