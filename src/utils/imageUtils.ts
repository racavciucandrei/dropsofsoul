
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
  
  // Generate a unique timestamp based on current time (to milliseconds)
  // This ensures a truly unique URL each time
  const timestamp = Date.now().toString();
  
  // Add cache-busting parameter for all images to ensure fresh loading
  // Use a different parameter name for different types of images
  if (path.includes('/lovable-uploads/')) {
    return `${path}?upload_v=${timestamp}`;
  } else if (path.includes('/assets/')) {
    return `${path}?asset_v=${timestamp}`;
  } else if (path.includes('/placeholder.svg')) {
    return path; // Don't add params to placeholder to ensure it works as fallback
  } else {
    // For any other image type
    return `${path}?v=${timestamp}`;
  }
};

/**
 * Checks if an image exists and is accessible
 * @param url - Image URL to check
 * @returns Promise resolving to boolean indicating if image exists
 */
export const checkImageExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Don't try to check placeholder images
    if (url.includes('placeholder.svg')) {
      resolve(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    // Add a cache-busting parameter for this check
    img.src = `${url}?check=${Date.now()}`;
    
    // Set a timeout to prevent hanging
    setTimeout(() => resolve(false), 5000);
  });
};

/**
 * Preloads an image to ensure it's in the browser cache
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!src || src.includes('placeholder.svg')) {
      resolve(new Image()); // Return empty image for placeholders
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.error(`Failed to preload image: ${src}`);
      reject(new Error(`Failed to preload image: ${src}`));
    };
    img.src = getOptimizedImagePath(src);
    
    // Set a timeout to prevent hanging
    setTimeout(() => reject(new Error('Image preload timeout')), 5000);
  });
};
