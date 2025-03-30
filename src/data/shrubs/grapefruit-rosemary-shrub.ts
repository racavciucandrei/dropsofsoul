
import { Product } from '../types';

export const grapefruitRosemaryShrub: Product = {
  id: 18,
  name: 'Grapefruit & Rosemary Shrub',
  category: 'shrubs',
  price: 26.50,
  images: ['/assets/product-10.jpg', '/assets/product-10-alt.jpg', '/assets/product-10-detail.jpg'],
  slug: 'grapefruit-rosemary-shrub',
  description: 'An exquisite balance of a sharp, tangy citrus kick from grapefruit and a fragrant herbal depth from rosemary, this product is crafted using premium ingredients and the cold method of extraction to maintain its fresh and aromatic quality. The natural acidity of grapefruit combined with the earthy, herbal notes of rosemary creates a lively and complex shrub that adds depth and refreshment to both classic cocktails and innovative mocktails alike.',
  details: {
    ingredients: 'Grapefruit, rosemary, apple cider vinegar, cane sugar, natural flavors.',
    size: '250ml (8.4 fl oz)',
    usage: '15-30ml per drink',
    flavorProfile: 'Sharp citrus with herbal depth, balancing tanginess with aromatic rosemary notes.'
  },
  signatureCocktails: [
    {
      name: 'Colomba (Zer0 waste)',
      description: 'A vibrant and refreshing cocktail that showcases the perfect balance between the tangy citrus of our Grapefruit & Rosemary Shrub and the smooth, complex flavors of Santa Spina Cruda. The fresh lime juice adds brightness, while the grapefruit soda enhances the citrus notes and adds effervescence. Garnished with a sustainable grapefruit leather and a lit rosemary sprig that releases aromatic oils, this zero-waste cocktail offers a multi-sensory experience.',
      ingredients: [
        '5cl Santa Spina Cruda',
        '3cl Grapefruit & Rosemary Shrub',
        '1cl fresh lime juice',
        'Grapefruit soda'
      ],
      garnish: [
        'Grapefruit Leather',
        'Lit rosemary sprig'
      ],
      imagePath: '/placeholder.svg'
    },
    {
      name: 'Sonnekuss',
      description: 'A sophisticated non-alcoholic option that combines the bright, tangy profile of our Grapefruit & Rosemary Shrub with the subtle acidity of Verjus Weinberg. Topped with Mirabelle & Elderflower Limo for floral sweetness and effervescence, this mocktail offers a complex and refreshing experience. Garnished with a grapefruit wheel and rosemary sprig for visual appeal and aromatic enhancement.',
      ingredients: [
        '4cl Grapefruit & Rosemary Shrub',
        '2cl Verjus Weinberg',
        'Mirabelle & Elderflower Limo'
      ],
      garnish: [
        'Grapefruit wheel',
        'Rosemary sprig'
      ],
      imagePath: '/placeholder.svg'
    }
  ],
  related: [19, 20, 21],
  rating: 4.7,
  reviews: 22,
};
