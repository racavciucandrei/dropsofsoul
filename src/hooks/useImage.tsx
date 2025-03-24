
import { useState, useEffect } from 'react';
import { getOptimizedImagePath, forceReloadImage } from '@/utils/imageUtils';

/**
 * Hook for reliable image loading with proper loading states,
 * error handling and retry capabilities
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
  const loadingDelay = options?.loadingDelay || 0;
  const retryOnError = options?.retryOnError !== undefined ? options.retryOnError : true;
  
  // Reload the image with a fresh URL
  const reloadImage = async () => {
    setIsLoading(true);
    setError(null);
    setRetry(prev => prev + 1);
  };
  
  useEffect(() => {
    let mounted = true;
    let timeoutId: number | null = null;
    
    const loadImage = async () => {
      // Add a small delay to avoid too many concurrent image loads
      if (loadingDelay > 0) {
        timeoutId = window.setTimeout(() => {
          if (!mounted) return;
          setIsLoading(true);
        }, loadingDelay);
      } else {
        setIsLoading(true);
      }
      
      try {
        // Special handling for known problem images
        let optimizedSrc = src;
        
        if (!src || src === '') {
          throw new Error('Empty image source');
        }
        
        if (src.includes('Maiz') || src.includes('maiz')) {
          optimizedSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
        }
        
        // Get a fresh URL with cache busting
        const freshUrl = await forceReloadImage(optimizedSrc);
        
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
        
        // Auto-retry once on error
        if (retryOnError && retry === 0) {
          setTimeout(() => {
            if (mounted) setRetry(1);
          }, 1000);
        }
      }
    };
    
    loadImage();
    
    return () => {
      mounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [src, retry, fallbackSrc, loadingDelay, retryOnError]);
  
  return { 
    imageSrc, 
    isLoading, 
    error, 
    reloadImage,
    isError: error !== null
  };
};

export default useImage;
