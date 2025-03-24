
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
 * Get an optimized image path, ensuring freshness with a unique timestamp
 * @param path - Original image path
 * @returns Optimized image path with cache-busting parameters
 */
export const getOptimizedImagePath = (path: string): string => {
  // Handle empty or undefined paths
  if (!path) return "/placeholder.svg";
  
  // Fixed path for known problematic images
  if (path.includes('Maiz') || path.includes('maiz')) {
    // Direct link to the fixed image path to ensure it loads
    return "/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png?v=" + Date.now();
  }
  
  // Generate a unique timestamp to prevent caching
  const timestamp = Date.now();
  
  // Add cache-busting parameter for all images
  if (path.includes('/lovable-uploads/')) {
    return `${path}?upload_v=${timestamp}`;
  } else if (path.includes('/assets/')) {
    return `${path}?asset_v=${timestamp}`;
  } else if (path.includes('/placeholder.svg')) {
    return path; // Don't add params to placeholder
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
    img.onerror = (e) => {
      console.error(`Failed to preload image: ${src}`, e);
      reject(new Error(`Failed to preload image: ${src}`));
    };
    
    // Apply cache-busting and optimizations
    img.src = getOptimizedImagePath(src);
    
    // Set a timeout to prevent hanging
    setTimeout(() => reject(new Error('Image preload timeout')), 5000);
  });
};

/**
 * Force reload an image by creating a new Image object with a unique timestamp
 * @param imagePath - Path to the image that needs to be reloaded
 * @returns Promise that resolves with the path including cache-busting parameter
 */
export const forceReloadImage = (imagePath: string): Promise<string> => {
  return new Promise((resolve) => {
    const timestamp = Date.now();
    const newPath = imagePath.includes('?') 
      ? `${imagePath}&reload=${timestamp}` 
      : `${imagePath}?reload=${timestamp}`;
    
    const img = new Image();
    img.onload = () => resolve(newPath);
    img.onerror = () => {
      console.error(`Force reload failed for: ${imagePath}`);
      resolve('/placeholder.svg');
    };
    img.src = newPath;
    
    // Always resolve after a timeout to prevent hanging
    setTimeout(() => resolve(newPath), 1000);
  });
};
