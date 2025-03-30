
import { Product } from '../types';

export const toastedSesamePipperLongumBitters: Product = {
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
};
