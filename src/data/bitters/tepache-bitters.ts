
import { Product } from '../types';

export const tepacheBitters: Product = {
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
};
