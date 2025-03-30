
import { Product } from '../types';

export const hibiscusCardamomBitters: Product = {
  id: 18,
  name: 'Hibiscus & Cardamom Bitters',
  category: 'bitters',
  price: 26.00,
  images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
  slug: 'hibiscus-cardamom-bitters',
  description: 'Born from the pulse of tropical gardens of Southeast Asia and the rich markets of India, this bitters brings together the tangy vibrance of hibiscus and the aromatic warmth of cardamom, making it an elegant addition to your cocktail creations. Crafted by hand in small batches to bring the worlds flavour to your glass.',
  details: {
    ingredients: 'Water, alcohol (45% ABV), hibiscus petals, cardamom pods, selected spices, natural botanicals.',
    size: '150ml (5.1 fl oz)',
    usage: '2-3 dashes per cocktail',
    flavorProfile: 'Floral, tart, and lightly spiced, with the vivid aroma of cardamom and the tang of hibiscus petals.'
  },
  signatureCocktails: [
    {
      name: 'Nectar of the Unknown',
      description: 'Nectar of the Unknown invites you to explore the unknown with each sip. A cocktail that explores the mysterious and intriguing depths of flavor, is a harmonious balance of smoky, floral, and exotic elements. The base combines the earthy depth of mezcal and the bright, aromatic profile of pisco, while maraschino liqueur adds a touch of sweet almond complexity. A vibrant Timur berry cordial with its grapefruit-peppery character elevates the mix, balanced by the tart freshness of verjus. The bitters and foam layer new dimensions of flavor and aroma, transforming every sip into a journey of discovery.',
      ingredients: [
        '1cl Mezcal',
        '3cl Pisco',
        '2cl Maraschino Liqueur',
        '3cl Timur Berry Cordial',
        '1cl Verjus',
        'Hibiscus & Cardamom Bitters (layered using a pipette)',
        '2 puffs Absinthe'
      ],
      garnish: [
        'Jasmine Air Foam'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [1, 2, 19],
  rating: 4.8,
  reviews: 15,
};
