
// Main export file for all bitters
import { Product } from '../types';
import { tepacheBitters } from './tepache-bitters';
import { roastedCornSmokiedChiliBitters } from './roasted-corn-smoked-chili-bitters';
import { hibiscusCardamomBitters } from './hibiscus-cardamom-bitters';
import { coffeeGrapefruitBitters } from './coffee-grapefruit-bitters';
import { curryLeafTamarindBitters } from './curry-leaf-tamarind-bitters';
import { szechuanPepperCacaoBitters } from './szechuan-pepper-cacao-bitters';
import { toastedSesamePipperLongumBitters } from './toasted-sesame-pipper-longum-bitters';

// Combine all bitters into a single array
export const bitters: Product[] = [
  tepacheBitters,
  roastedCornSmokiedChiliBitters,
  hibiscusCardamomBitters,
  coffeeGrapefruitBitters,
  curryLeafTamarindBitters,
  szechuanPepperCacaoBitters,
  toastedSesamePipperLongumBitters
];

// Export individual bitters for direct access
export * from './tepache-bitters';
export * from './roasted-corn-smoked-chili-bitters';
export * from './hibiscus-cardamom-bitters';
export * from './coffee-grapefruit-bitters';
export * from './curry-leaf-tamarind-bitters';
export * from './szechuan-pepper-cacao-bitters';
export * from './toasted-sesame-pipper-longum-bitters';
