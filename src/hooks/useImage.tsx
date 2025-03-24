
import { useState, useEffect } from 'react';

/**
 * Hook for reliable image loading with minimal overhead
 */
export const useImage = (
  src: string,
  options?: {
    fallbackSrc?: string;
    loadingDelay?: number;
    retryOnError?: boolean;
  }
) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retry, setRetry] = useState<number>(0);
  
  const fallbackSrc = options?.fallbackSrc || '/placeholder.svg';
  
  // Reload the image with a fresh URL
  const reloadImage = () => {
    setIsLoading(true);
    setError(null);
    setRetry(prev => prev + 1);
  };
  
  useEffect(() => {
    let mounted = true;
    
    const loadImage = async () => {
      try {
        // Special handling for known problem images
        let optimizedSrc = src;
        
        if (!src || src === '') {
          throw new Error('Empty image source');
        }
        
        // Hardcoded path for Maiz à Trois
        if (src.includes('Maiz') || src.includes('maiz')) {
          optimizedSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
        }
        
        // Add cache-busting parameter
        const freshUrl = `${optimizedSrc}?v=${Date.now()}`;
        
        if (!mounted) return;
        
        setImageSrc(freshUrl);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        
        console.error('Image loading error:', err);
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setImageSrc(fallbackSrc);
        setIsLoading(false);
      }
    };
    
    loadImage();
    
    return () => {
      mounted = false;
    };
  }, [src, retry, fallbackSrc]);
  
  return { 
    imageSrc, 
    isLoading, 
    error, 
    reloadImage,
    isError: error !== null
  };
};

export default useImage;
