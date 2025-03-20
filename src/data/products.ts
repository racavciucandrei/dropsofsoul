
import { Product } from './types';
import { bitters } from './bitters';
import { cordials } from './cordials';
import { shrubs } from './shrubs';

// Combine all products into a single array
export const allProducts: Product[] = [
  ...bitters,
  ...cordials,
  ...shrubs
];

// Re-export everything for backward compatibility
export * from './types';
export * from './bitters';
export * from './cordials';
export * from './shrubs';
