
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
];
