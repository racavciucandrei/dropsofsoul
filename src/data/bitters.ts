
import { Product } from './types';

// Update this part of the bitters data file with fixed image path
const roastedCornCocktail = {
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
  // Fixed image path with explicit path to public folder
  imagePath: '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png'
};

// Bitters collection
export const bitters: Product[] = [
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
    signatureCocktails: [
      {
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
      }
    ],
    related: [18, 19, 21],
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
    signatureCocktails: [roastedCornCocktail],
    related: [1, 18, 19],
    rating: 4.9,
    reviews: 18,
  },
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
  },
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
    signatureCocktails: [
      {
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
      }
    ],
    related: [1, 18, 20],
    rating: 4.7,
    reviews: 12,
  },
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
  },
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
  },
  {
    id: 22,
    name: 'Toasted Sesame & Pipper Longum Bitters',
    category: 'bitters',
    price: 26.00,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'toasted-sesame-pipper-longum-bitters',
    description: 'Elevated by the timeless flavours of ancient trade routes, where these ingredients were cherished for their complexity, sesame and long pepper fuse into this bitters, offering a savoury and spiced nuance inspired by age-old culinary traditions. With hints of tamari, star anise and ginger, this manifestation brings a layered character and dimension to any drink.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), toasted sesame seeds, Pipper longum, tamari, star anise, ginger, selected spices, natural botanicals.',
      size: '150ml (5.1 fl oz)',
      usage: '2-3 dashes per cocktail',
      flavorProfile: 'The nutty warmth of toasted sesame seeds, balanced with the sharp, earthy heat of Pipper longum.'
    },
    signatureCocktails: [
      {
        name: 'Sea Me, Taste Me',
        description: 'An alluring blend of saffron-infused vodka and sea algae-infused fino sherry, this cocktail evokes the essence of the ocean—smooth, salty, and slightly mysterious. A playful mist of piper longum and sesame bitters adds a fragrant, peppery kick that lingers, making it a perfect sip for a sultry night by the shore.',
        ingredients: [
          '5cl Saffron-infused vodka',
          '3cl Sea algae-infused fino sherry',
          '2-3 puffs of Piper longum and sesame bitters (sprayed or misted)'
        ],
        garnish: [
          'Pickled caper berry'
        ],
        imagePath: '/placeholder.svg'
      }
    ],
    related: [1, 19, 21],
    rating: 4.7,
    reviews: 5,
  },
];

