import { Product } from './types';

// Cordials collection
export const cordials: Product[] = [
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
      },
      {
        name: 'Crush on You',
        description: 'A refreshing non-alcoholic mocktail that showcases the vibrant flavor of our Raspberry & Lychee Cordial. Fresh muddled raspberries provide a lush fruity base, while the non-alcoholic gin brings botanical complexity without the alcohol. The splash of lime adds brightness, and the rose lemonade creates a delicate floral finish. Served over crushed ice in a can-style glass, this visually stunning drink offers a perfect alcohol-free option that doesn\'t compromise on flavor or presentation.',
        ingredients: [
          '4 fresh Raspberries, muddled',
          '4cl Raspberry & Lychee Cordial',
          '5cl 0% Gin',
          '1cl fresh lime juice/Verjus',
          'Rose lemonade to top'
        ],
        garnish: [
          'Lychee half',
          'Mint sprig',
          'Dried raspberry powder'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [24, 25, 26, 27],
    rating: 4.9,
    reviews: 16,
  },
  {
    id: 24,
    name: 'Coco & Lime Cordial',
    category: 'cordials',
    price: 23.95,
    images: ['/assets/product-10.jpg', '/assets/product-10-alt.jpg', '/assets/product-10-detail.jpg'],
    slug: 'coco-lime-cordial',
    description: 'The refreshing combination of crisp lime and rich coconut creates a harmonious balance in this cordial. Using the finest coconut water and toasted coconut flakes, we\'ve created a smooth, tropical experience with a zesty lime punch. This cordial is carefully cold-infused to preserve its natural flavors and ensure a fresh, vibrant taste in every sip. The result is a versatile ingredient that\'s perfect for both spirited drinks and refreshing mocktails or as a tropical accent to any drink.',
    details: {
      ingredients: 'Water, cane sugar, lime extract, coconut water, toasted coconut flakes, natural flavors, citric acid.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
      flavorProfile: 'A refreshing balance of tropical coconut with bright, zesty lime notes for a vibrant and exotic flavor profile.'
    },
    signatureCocktails: [
      {
        name: 'Ti-Coco',
        description: 'A tropical cocktail that showcases the refreshing combination of our Coco & Lime Cordial with the distinctive character of white rum Agricole. The fresh lime pieces provide a natural citrus punch that complements the cordial\'s coconut notes perfectly. The coconut chips garnish enhances the tropical aroma and adds textural contrast to this refreshing island-inspired drink.',
        ingredients: [
          '5cl white rum Agricole',
          '3cl Coco & Lime Cordial',
          '2 pieces fresh lime'
        ],
        garnish: [
          'Coconut Chips'
        ],
        imagePath: '/placeholder.svg'
      },
      {
        name: 'Coco Verde',
        description: 'A sophisticated non-alcoholic option that pairs the tropical essence of our Coco & Lime Cordial with the fresh green notes of cucumber juice. The effervescent finish from non-alcoholic sparkling wine or sparkling yuzu adds a celebratory touch, making this a perfect choice for those seeking a refined alcohol-free experience. The cucumber ribbon garnish adds visual elegance while enhancing the garden-fresh aroma.',
        ingredients: [
          '3cl Coco & Lime Cordial',
          '5cl fresh cucumber juice',
          'Top with Non-Alcoholic Sparkling Wine/ Sparkling Yuzu (LOW)'
        ],
        garnish: [
          'Cucumber ribbon'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [23, 25, 26, 27],
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 25,
    name: 'Lemongrass & Verbena Cordial',
    category: 'cordials',
    price: 24.50,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'lemongrass-verbena-cordial',
    description: 'This invigorating cordial showcases the crisp, citrusy essence of lemongrass alongside the delicate fragrance of lemon verbena. Expertly prepared to extract and preserve the aromatic qualities of the herbs, the result is a vibrant and refreshing taste. Perfectly balanced acidity and herbal undertones elevate this cordial, making it ideal for both light and complex beverages.',
    details: {
      ingredients: 'Water, cane sugar, lemongrass extract, lemon verbena extract, citric acid, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
      flavorProfile: 'A vibrant and refreshing blend of citrusy lemongrass and aromatic lemon verbena, creating a bright, herbaceous profile with subtle citrus undertones.'
    },
    signatureCocktails: [
      {
        name: 'Thai Ramos',
        description: 'A sophisticated twist on the classic Ramos Gin Fizz, utilizing our Lemongrass & Verbena Cordial to create an exotic, Southeast Asian-inspired experience. The lemongrass-infused gin pairs perfectly with the cordial, while the cream adds luxurious texture. Demerara syrup brings depth, fresh lime provides brightness, and the orange blossom water and vegan foaming bitters create that signature frothy texture. Topped with yuzu lemonade for a refreshing finish, this elegant cocktail is garnished with lemon verbena and a dusting of matcha powder for visual appeal and aromatic complexity.',
        ingredients: [
          '5cl lemongrass-infused gin',
          '3cl Lemongrass & Verbena Cordial',
          '3cl cream',
          '1cl demerara syrup',
          '1cl fresh lime juice',
          '3 dashes orange blossom water',
          '3 dashes vegan foaming bitters',
          'Top with soda/Yuzu limonade'
        ],
        garnish: [
          'Lemon verbena sprig',
          'Matcha powder'
        ],
        imagePath: '/placeholder.svg'
      },
      {
        name: 'Temple Tonic',
        description: 'A serene, alcohol-free refresher that showcases the bright, herbal notes of our Lemongrass & Verbena Cordial. The cold-brewed green tea adds gentle complexity and subtle tannins, while the tonic water brings effervescence and a touch of bitterness that balances the cordial\'s sweetness. Garnished with a lemongrass stalk that doubles as a stirrer, this sophisticated mocktail offers a zen-like drinking experience with layers of herbal complexity and refreshing brightness.',
        ingredients: [
          '3cl Lemongrass & Verbena Cordial',
          '6cl fresh green tea (cold brew)',
          'Top with tonic water'
        ],
        garnish: [
          'Lemongrass stalk'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [23, 24, 26, 27],
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 26,
    name: 'Shiso & Cucumber Cordial',
    category: 'cordials',
    price: 25.50,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'shiso-cucumber-cordial',
    description: 'A unique blend of aromatic shiso leaves and cool cucumber, this cordial offers a refreshing and herbaceous profile. The infusion process captures the clean, fresh notes of cucumber and the minty flavor of shiso, creating a sophisticated and smooth product that shines in cocktails or sparkling mocktails. The perfect balance of refreshing and aromatic, it adds elegance to any drink seeking an invigorating twist.',
    details: {
      ingredients: 'Water, cane sugar, shiso leaf extract, cucumber extract, citric acid, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
      flavorProfile: 'A refreshing blend of aromatic shiso with cool cucumber notes, creating a sophisticated, herbaceous profile with clean, bright undertones.'
    },
    signatureCocktails: [
      {
        name: 'Kyoto Spritz',
        description: 'An elegant, refreshing cocktail that highlights the herbaceous character of our Shiso & Cucumber Cordial. The delicate sake provides a clean base, while the rice gin adds botanical complexity. Fresh yuzu juice brings citrusy brightness, and the dry sparkling wine adds effervescence and subtle acidity. Garnished with a shiso leaf and cucumber ribbon, this sophisticated spritz offers a perfect balance of refreshing flavors with a Japanese-inspired twist.',
        ingredients: [
          '3cl sake',
          '3cl Rice gin (or Hendrick\'s Cucumber edition)',
          '3cl Shiso & Cucumber Cordial',
          '1cl fresh yuzu juice',
          'Top with dry sparkling wine'
        ],
        garnish: [
          'Shiso leaf',
          'Cucumber ribbon'
        ],
        imagePath: '/placeholder.svg'
      },
      {
        name: 'Zen Cooler',
        description: 'A refreshing non-alcoholic option that showcases the clean, herbaceous profile of our Shiso & Cucumber Cordial. The exotic carambola (star fruit) juice adds subtle sweetness and unique flavor, complemented by a touch of honey syrup for depth. Topped with soda water for effervescence, this sophisticated mocktail is garnished with a shiso leaf and carambola slice for visual appeal and aromatic complexity, offering a perfectly balanced and revitalizing drinking experience.',
        ingredients: [
          '3cl Shiso & Cucumber Cordial',
          '5cl Fresh Carambola juice',
          '1cl Honey syrup',
          'Top with soda water'
        ],
        garnish: [
          'Shiso leaf',
          'Carambola slice'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [23, 24, 25, 27],
    rating: 4.7,
    reviews: 8,
  },
  {
    id: 27,
    name: 'Masala Chai Cordial',
    category: 'cordials',
    price: 25.95,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'masala-chai-cordial',
    description: 'Warm, aromatic, and full of depth, this Masala Chai Cordial blends the traditional spices of Indian chai—cinnamon, cloves, cardamom, and ginger—infused through an intricate process, into a rich base that\'s both comforting and complex. Using a slow cold extraction method, the blend of spices is allowed to steep and develop its bold flavour. Perfect for creating spiced cocktails, or enjoyed on its own with a touch of warm milk for a cozy drink.',
    details: {
      ingredients: 'Water, cane sugar, black tea extract, cinnamon, cardamom, cloves, ginger, black pepper, natural flavors.',
      size: '500ml (16.9 fl oz) - Larger quantities (3L, 5L) available upon request',
      usage: '15-30ml per drink',
      flavorProfile: 'A warm, aromatic blend of traditional Indian chai spices creating a rich, complex profile with comforting depth and subtle sweetness.'
    },
    signatureCocktails: [
      {
        name: 'Masala Chai Gimlet',
        description: 'A warming twist on the classic gimlet that showcases the rich, spiced character of our Masala Chai Cordial. The botanical notes of gin provide a perfect canvas for the complex spice blend, while fresh lime juice adds brightness and acidity to balance the sweetness. The curry leaf and tamarind bitters add an extra layer of complexity and depth. Served over a large ice cube and garnished with tamarind and curry powder, this sophisticated cocktail offers a perfect balance of warmth and refreshment.',
        ingredients: [
          '5cl gin',
          '3cl Masala Chai Cordial',
          '1cl fresh lime juice',
          '3 dashes of curry leaf and tamarind bitters'
        ],
        garnish: [
          'Tamarind',
          'Curry powder'
        ],
        imagePath: '/placeholder.svg'
      },
      {
        name: 'Fredo Masala Matcha Latte',
        description: 'A luxurious non-alcoholic option that combines the warmth of our Masala Chai Cordial with the unique character of cascara iced tea. The blend of oat and cashew milks creates a rich, creamy texture that can be enhanced through nitrogenization. The demerara syrup adds depth and sweetness, while the matcha espuma provides a visually stunning and flavor-enhancing top layer. Garnished with an anis star and a dusting of cinnamon and matcha, this sophisticated mocktail offers a multi-layered experience of complementary flavors.',
        ingredients: [
          '3cl Masala Chai Cordial',
          '5cl Rotte Rakette Cascara Iced Tea',
          '4cl Oat milk',
          '4cl Cashew milk',
          '1cl Demerara syrup',
          'Matcha espuma'
        ],
        garnish: [
          'Anis Star',
          'Cinnamon and matcha dust'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [23, 24, 25, 26],
    rating: 4.8,
    reviews: 10,
  }
];
