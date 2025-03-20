
// Product data types
export interface ProductDetails {
  ingredients: string;
  size: string;
  usage: string;
  flavorProfile?: string;
}

export interface SignatureCocktail {
  name: string;
  description: string;
  ingredients: string[];
  garnish: string[];
  imagePath: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  slug: string;
  description: string;
  details: ProductDetails;
  signatureCocktail?: SignatureCocktail;
  related: number[];
  rating: number;
  reviews: number;
}

// Comprehensive product data
export const allProducts: Product[] = [
  // Bitters (8 types now)
  {
    id: 1,
    name: 'Tepache Bitters',
    category: 'bitters',
    price: 26.00,
    images: ['/assets/product-1.jpg', '/assets/product-1-alt.jpg', '/assets/product-1-detail.jpg'],
    slug: 'tepache-bitters',
    description: 'Rooted in the rich traditions of Mexico, this bitters captures the soul of tepache, celebrating the fermented pineapple drink. The dried sweetness of pineapple peel blends harmoniously with earthy and spiced flavours, creating a vibrant, bold elixir. Handcrafted for adventurous bartenders, it brings a funky twist to cocktails, with the wild flavours of traditional Mexican fermentation in every drop.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), pineapple peel, selected spices, natural botanicals.',
      size: '150ml (5.1 fl oz)',
      usage: '2-3 dashes per cocktail',
      flavorProfile: 'A tangy, sweet, and spicy blend inspired by the vibrant, fermented essence of tepache. The focus is on pineapple peel, spices, and a touch of funk.'
    },
    signatureCocktail: {
      name: 'Tepache Dream',
      description: 'A vibrant and tropical cocktail that marries the deep smokiness of aged tequila and mezcal with the refreshing, tangy sweetness of pineapple and lime. Infused with Tepache Bitters, it carries a nuanced, savoury complexity that evokes the spirit of pineapple fermentation. The carbonized pineapple juice adds an effervescent touch, while the garnishes — a pineapple frond, dried lime wheel, and dried pineapple — create a stunning visual display. This drink is an immersive experience that balances boldness and refreshment, perfect for showcasing the unique character of Tepache Bitters.',
      ingredients: [
        '4cl Aged Tequila',
        '1cl Mezcal',
        '3cl Pineapple & Lime Cordial',
        '1cl Fresh lime juice',
        '3 dashes Tepache Bitters',
        'Pineapple Juice (cleared)'
      ],
      garnish: [
        'Pineapple Frond',
        'Dried Lime Wheel',
        'Half of a Dried Pineapple Wheel'
      ],
      imagePath: '/lovable-uploads/924208b5-f5a2-466d-b7ca-3888563249ef.png'
    },
    related: [2, 3, 4],
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Roasted Corn & Smoked Chili Bitters',
    category: 'bitters',
    price: 26.00,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'roasted-corn-smoked-chili-bitters',
    description: "A celebration of fire and earth, this bold and evocative bitters combines the sweet nutty aroma of roasted corn with the smoky depth of dried chilies, paying homage to the rich Mesoamerican cuisine. Accented with cacao and warm spices, it delivers a savoury, smoky complexity that transforms cocktails into robust, unforgettable creations. Crafted for innovative bartenders, it's the essential ingredient for adding rich layers and a gentle heat to your drinks.",
    details: {
      ingredients: 'Water, alcohol (45% ABV), roasted corn, smoked chilies (pasilla, guajillo), cacao nibs, selected spices, natural botanicals.',
      size: '150ml (5.1 fl oz)',
      usage: '2-3 dashes per cocktail',
      flavorProfile: 'Savoury, smoky, and earthy, with hints of natural sweetness from roasted corn and a subtle heat from smoked chilies like pasilla or guajillo.'
    },
    signatureCocktail: {
      name: 'Maiz à Trois',
      description: 'The Maiz à Trois celebrates the heart of Mexican culture with an intriguing combination of smoky, earthy, and subtly sweet flavors. Nixta Corn Liqueur provides a rich, corn-forward sweetness, balanced by the deep, bold character of Maiz Nation Mexican Whiskey. The Pox adds an extra layer of complexity, while the Roasted Corn and Chipotle Bitters introduce smoky heat and a touch of spice. The garnish of pickled baby corn, flambéed with aromatic salt, adds a touch of acidity and drama, enhancing the cocktail\'s overall depth. This drink is both a visual and flavorful experience, perfect for those who appreciate bold, nuanced flavors with a hint of flair.',
      ingredients: [
        '3cl Nixta Corn Liqueur',
        '1cl Pox',
        '2cl Maiz Nation Mexican Whiskey',
        '3 dashes Roasted Corn & Smoked Chili Bitters'
      ],
      garnish: [
        'Pickled baby corn, flambéed for dramatic effect',
        'A sprinkle of homemade aromatic salt (smoked paprika, chili flakes, and sea salt)'
      ],
      imagePath: '/placeholder.svg'
    },
    related: [1, 3, 7],
    rating: 4.9,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Orange Bitters',
    category: 'bitters',
    price: 19.95,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'orange-bitters',
    description: 'Our Orange Bitters highlight the bright, zesty character of orange peel, complemented by a blend of spices. These bitters add a citrus lift to cocktails like the Martinez, Old Fashioned, or any drink that needs a touch of brightness.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), bitter orange peel, sweet orange essence, cardamom, coriander, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 6, 7],
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 4,
    name: 'Cherry Bitters',
    category: 'bitters',
    price: 18.50,
    images: ['/assets/product-6.jpg', '/assets/product-6-alt.jpg', '/assets/product-6-detail.jpg'],
    slug: 'cherry-bitters',
    description: 'Our Cherry Bitters pair the rich, fruity notes of cherries with warm spices and a hint of almond. These bitters bring a subtle fruity complexity to Manhattans, Old Fashioneds, and other classic cocktails.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), dried cherries, bitter almond, cinnamon, vanilla, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 2, 7],
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 5,
    name: 'Chocolate Bitters',
    category: 'bitters',
    price: 20.95,
    images: ['/assets/product-9.jpg', '/assets/product-9-alt.jpg', '/assets/product-9-detail.jpg'],
    slug: 'chocolate-bitters',
    description: 'Our Chocolate Bitters combine rich cocoa with subtle spices and a hint of vanilla. These bitters add depth and complexity to cocktails, particularly those with aged spirits, coffee liqueurs, or cream components.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), cocoa nibs, vanilla bean, cinnamon, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [3, 7, 1],
    rating: 4.6,
    reviews: 15,
  },
  {
    id: 6,
    name: 'Lavender Bitters',
    category: 'bitters',
    price: 21.50,
    images: ['/assets/product-10.jpg', '/assets/product-10-alt.jpg', '/assets/product-10-detail.jpg'],
    slug: 'lavender-bitters',
    description: 'Our Lavender Bitters feature the delicate floral notes of lavender balanced with citrus and gentle spices. These bitters add a floral complexity to gin cocktails, champagne drinks, and modern mixology creations.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), lavender flowers, lemon peel, vanilla, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [10, 11, 2],
    rating: 4.7,
    reviews: 21,
  },
  {
    id: 7,
    name: 'Grapefruit Bitters',
    category: 'bitters',
    price: 19.95,
    images: ['/assets/product-11.jpg', '/assets/product-11-alt.jpg', '/assets/product-11-detail.jpg'],
    slug: 'grapefruit-bitters',
    description: 'Our Grapefruit Bitters capture the bright, tangy essence of grapefruit with subtle bitter undertones. These bitters add zesty complexity to Palomas, gin and tonics, and a wide range of citrus-forward cocktails.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), grapefruit peel, gentian root, coriander, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [2, 5, 14],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 8,
    name: 'Spiced Bitters',
    category: 'bitters',
    price: 22.95,
    images: ['/assets/product-12.jpg', '/assets/product-12-alt.jpg', '/assets/product-12-detail.jpg'],
    slug: 'spiced-bitters',
    description: 'Our Spiced Bitters blend warm spices like cinnamon, clove, and allspice with subtle citrus notes. These bitters add warmth and complexity to rum cocktails, whiskey drinks, and seasonal creations.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), cinnamon, clove, allspice, orange peel, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 2, 4],
    rating: 4.9,
    reviews: 29,
  },
  
  // Cordials (5 types)
  {
    id: 9,
    name: 'Elderflower Cordial',
    category: 'cordials',
    price: 22.50,
    images: ['/assets/product-2.jpg', '/assets/product-2-alt.jpg', '/assets/product-2-detail.jpg'],
    slug: 'elderflower-cordial',
    description: 'Our Elderflower Cordial captures the delicate floral sweetness of elderflower blossoms. This versatile cordial can be mixed with sparkling water, added to cocktails, or used in desserts for a subtle floral complexity.',
    details: {
      ingredients: 'Water, cane sugar, elderflower extract, citric acid, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [10, 11, 12],
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 10,
    name: 'Ginger Cordial',
    category: 'cordials',
    price: 21.95,
    images: ['/assets/product-5.jpg', '/assets/product-5-alt.jpg', '/assets/product-5-detail.jpg'],
    slug: 'ginger-cordial',
    description: 'Our Ginger Cordial balances the warmth and spice of fresh ginger with subtle sweetness. This cordial adds a spicy kick to Moscow Mules, can be mixed with hot water for a warming drink, or adds complexity to many cocktails.',
    details: {
      ingredients: 'Water, cane sugar, fresh ginger extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [9, 11, 14],
    rating: 4.6,
    reviews: 28,
  },
  {
    id: 11,
    name: 'Lavender Cordial',
    category: 'cordials',
    price: 24.95,
    images: ['/assets/product-8.jpg', '/assets/product-8-alt.jpg', '/assets/product-8-detail.jpg'],
    slug: 'lavender-cordial',
    description: 'Our Lavender Cordial features the elegant floral notes of lavender balanced with a touch of citrus. This cordial pairs beautifully with gin, vodka, or simply mixed with sparkling water for a refreshing non-alcoholic drink.',
    details: {
      ingredients: 'Water, cane sugar, lavender extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [9, 6, 12],
    rating: 4.7,
    reviews: 36,
  },
  {
    id: 12,
    name: 'Rose Cordial',
    category: 'cordials',
    price: 23.95,
    images: ['/assets/product-13.jpg', '/assets/product-13-alt.jpg', '/assets/product-13-detail.jpg'],
    slug: 'rose-cordial',
    description: 'Our Rose Cordial captures the delicate essence of rose petals with subtle sweetness. This elegant cordial adds a floral dimension to cocktails, can be mixed with champagne, or diluted with water for a refreshing drink.',
    details: {
      ingredients: 'Water, cane sugar, rose extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [9, 11, 13],
    rating: 4.9,
    reviews: 33,
  },
  {
    id: 13,
    name: 'Hibiscus Cordial',
    category: 'cordials',
    price: 25.95,
    images: ['/assets/product-14.jpg', '/assets/product-14-alt.jpg', '/assets/product-14-detail.jpg'],
    slug: 'hibiscus-cordial',
    description: 'Our Hibiscus Cordial features the vibrant, tart flavor of hibiscus flowers with subtle sweetness. This bright red cordial adds striking color and flavor to cocktails, can be mixed with sparkling water, or used in desserts.',
    details: {
      ingredients: 'Water, cane sugar, hibiscus extract, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [12, 9, 15],
    rating: 4.8,
    reviews: 39,
  },
  
  // Shrubs (4 types)
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
    related: [15, 16, 17],
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
    related: [14, 16, 10],
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
    related: [14, 15, 17],
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
    related: [14, 15, 16],
    rating: 4.8,
    reviews: 37,
  },
  
  // Hibiscus & Cardamom Bitters
  {
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
    signatureCocktail: {
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
    },
    related: [1, 2, 11],
    rating: 4.8,
    reviews: 15,
  },
  
  // Adding new Coffee & Grapefruit Bitters
  {
    id: 19,
    name: 'Coffee & Grapefruit Bitters',
    category: 'bitters',
    price: 26.00,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'coffee-grapefruit-bitters',
    description: 'Inspired by the contrast of the bold mornings and refreshing afternoons, this bitters combines the deep, roasted aroma of coffee with the vibrant zest of grapefruit. It reflects the balance between richness and brightness-a perfect companion for cocktails seeking complexity, bringing depth and character to every creations. Handcrafted in small batches to awaken your cocktails.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), coffee beans, grapefruit peel, selected spices, natural botanicals.',
      size: '150ml (5.1 fl oz)',
      usage: '2-3 dashes per cocktail',
      flavorProfile: 'Bold and rich, balancing the roasted bitterness of coffee with the bright, zesty notes of grapefruit.'
    },
    signatureCocktail: {
      name: 'Citrus Roast Negroni',
      description: 'The Citrus Roast Negroni celebrates the art of infusion with its bold, layered profile. Notes of roasted coffee complement the bittersweet complexity of Campari, while the grapefruit peel adds a refreshing aromatic brightness. Perfect for lovers of bold, innovative twists on the classics.',
      ingredients: [
        '3cl coffee-infused Campari',
        '3cl sweet vermouth',
        '3cl grapefruit infused gin',
        '3 dashes Coffee & Grapefruit Bitters'
      ],
      garnish: [
        'Grapefruit twist',
        '3 Coffee Beans'
      ],
      imagePath: '/lovable-uploads/f5280f26-197f-4528-baa5-0e3d04fe30f5.png'
    },
    related: [1, 7, 18],
    rating: 4.7,
    reviews: 12,
  },
  
  // Adding new Curry Leaf & Tamarind Bitters
  {
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
    signatureCocktail: {
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
    },
    related: [1, 2, 18],
    rating: 4.7,
    reviews: 9,
  },
  
  // Adding new Szechuan Pepper & Cacao Bitters
  {
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
    signatureCocktail: {
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
    },
    related: [2, 19, 20],
    rating: 4.8,
    reviews: 7,
  },
];

