
import { Product } from './types';

// Shrubs collection
export const shrubs: Product[] = [
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
    related: [19, 20, 21],
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
    related: [18, 20, 21],
    rating: 4.8,
    reviews: 19,
  },
  {
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
  },
  {
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
  }
];
