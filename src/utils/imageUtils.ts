
/**
 * Utility function to handle image loading errors gracefully
 * @param event - The error event from the image
 * @param fallbackSrc - Optional fallback image source
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = "/placeholder.svg"
) => {
  const target = event.target as HTMLImageElement;
  console.error("Failed to load image:", target.src);
  
  // Prevent infinite error loop if fallback also fails
  if (!target.src.includes(fallbackSrc)) {
    target.src = fallbackSrc;
  }
  
  // Add a class to indicate fallback is being used
  target.classList.add('image-fallback');
};

/**
 * Get an optimized image path, potentially with caching parameters
 * @param path - Original image path
 * @returns Optimized image path
 */
export const getOptimizedImagePath = (path: string): string => {
  // Handle empty or undefined paths
  if (!path) return "/placeholder.svg";
  
  // Add cache-busting parameter for uploaded images
  if (path.includes('/lovable-uploads/')) {
    // Use a static timestamp to avoid regenerating the URL on each render
    const timestamp = new Date().toDateString();
    return `${path}?v=${encodeURIComponent(timestamp)}`;
  }
  return path;
};

/**
 * Checks if an image exists and is accessible
 * @param url - Image URL to check
 * @returns Promise resolving to boolean indicating if image exists
 */
export const checkImageExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
