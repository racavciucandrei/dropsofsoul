
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
    related: [24, 25],
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
    related: [23, 25],
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
        name: 'Herbal Breeze',
        description: 'A refreshing and aromatic cocktail that highlights the bright, citrusy notes of our Lemongrass & Verbena Cordial. The botanical gin provides a perfect base, while the touch of elderflower liqueur adds subtle floral complexity. Fresh lime juice brings brightness, and the cucumber ribbon garnish adds a cooling aroma that complements the herbal profile of the cordial.',
        ingredients: [
          '5cl botanical gin',
          '3cl Lemongrass & Verbena Cordial',
          '1.5cl elderflower liqueur',
          '1.5cl fresh lime juice'
        ],
        garnish: [
          'Cucumber ribbon',
          'Lemongrass stalk'
        ],
        imagePath: '/placeholder.svg'
      },
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
    related: [23, 24],
    rating: 4.8,
    reviews: 12,
  }
];
