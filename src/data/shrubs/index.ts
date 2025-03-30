
// Main export file for all shrubs
import { Product } from '../types';
import { grapefruitRosemaryShrub } from './grapefruit-rosemary-shrub';
import { pineappleLimeShrub } from './pineapple-lime-shrub';
import { cherryBarkMarzipanShrub } from './cherry-bark-marzipan-shrub';
import { marilleCocolShrub } from './marille-coco-shrub';

// Combine all shrubs into a single array
export const shrubs: Product[] = [
  grapefruitRosemaryShrub,
  pineappleLimeShrub,
  cherryBarkMarzipanShrub,
  marilleCocolShrub
];

// Export individual shrubs for direct access
export * from './grapefruit-rosemary-shrub';
export * from './pineapple-lime-shrub';
export * from './cherry-bark-marzipan-shrub';
export * from './marille-coco-shrub';
