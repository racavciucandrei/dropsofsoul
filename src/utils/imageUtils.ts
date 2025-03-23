
/**
 * Utility function to handle image loading errors gracefully
 * @param event - The error event from the image
 * @param fallbackSrc - Optional fallback image source
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = "/placeholder.svg"
) => {
  console.error("Failed to load image:", (event.target as HTMLImageElement).src);
  (event.target as HTMLImageElement).src = fallbackSrc;
};

/**
 * Get an optimized image path, potentially with caching parameters
 * @param path - Original image path
 * @returns Optimized image path
 */
export const getOptimizedImagePath = (path: string): string => {
  // Add cache-busting parameter for uploaded images
  if (path.includes('/lovable-uploads/')) {
    return `${path}?v=${Date.now()}`;
  }
  return path;
};
