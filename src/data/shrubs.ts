
import { Product } from './types';

// Shrubs collection
export const shrubs: Product[] = [
  {
    id: 14,
    name: 'Blackberry Shrub',
    category: 'shrubs',
    price: 24.95,
    images: ['/assets/product-3.jpg', '/assets/product-3-alt.jpg', '/assets/product-3-detail.jpg'],
    slug: 'blackberry-shrub',
    description: 'Our Blackberry Shrub combines ripe blackberries with apple cider vinegar and sugar for a perfect balance of sweet, tart, and fruity. This shrub adds complexity to cocktails and makes a refreshing drink when mixed with soda water.',
    details: {
      ingredients: 'Blackberries, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [15, 16, 17, 18, 19],
    rating: 4.9,
    reviews: 48,
  },
  {
    id: 15,
    name: 'Raspberry Shrub',
    category: 'shrubs',
    price: 23.50,
    images: ['/assets/product-7.jpg', '/assets/product-7-alt.jpg', '/assets/product-7-detail.jpg'],
    slug: 'raspberry-shrub',
    description: 'Our Raspberry Shrub balances the bright fruitiness of raspberries with the tang of apple cider vinegar and sweetness of sugar. This versatile shrub adds depth to cocktails and makes a refreshing mixer with sparkling water.',
    details: {
      ingredients: 'Raspberries, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [14, 16, 17, 18, 19],
    rating: 4.7,
    reviews: 31,
  },
  {
    id: 16,
    name: 'Peach Shrub',
    category: 'shrubs',
    price: 22.95,
    images: ['/assets/product-15.jpg', '/assets/product-15-alt.jpg', '/assets/product-15-detail.jpg'],
    slug: 'peach-shrub',
    description: 'Our Peach Shrub captures the sweet, summery essence of ripe peaches balanced with tangy apple cider vinegar. This shrub adds fruity complexity to cocktails and makes a delightful non-alcoholic beverage when mixed with soda water.',
    details: {
      ingredients: 'Peaches, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [14, 15, 17, 18, 19],
    rating: 4.6,
    reviews: 26,
  },
  {
    id: 17,
    name: 'Strawberry Basil Shrub',
    category: 'shrubs',
    price: 25.50,
    images: ['/assets/product-16.jpg', '/assets/product-16-alt.jpg', '/assets/product-16-detail.jpg'],
    slug: 'strawberry-basil-shrub',
    description: 'Our Strawberry Basil Shrub combines sweet strawberries with aromatic basil and tangy apple cider vinegar. This complex shrub adds a unique flavor profile to cocktails and makes a sophisticated mixer for non-alcoholic beverages.',
    details: {
      ingredients: 'Strawberries, fresh basil, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [14, 15, 16, 18, 19],
    rating: 4.8,
    reviews: 37,
  },
  {
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
    related: [14, 15, 16, 17, 19],
    rating: 4.7,
    reviews: 22,
  },
  {
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
    related: [14, 15, 16, 17, 18],
    rating: 4.8,
    reviews: 19,
  }
];
