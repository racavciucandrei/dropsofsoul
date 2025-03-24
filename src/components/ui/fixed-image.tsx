
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImagePath, handleImageError, forceReloadImage } from '@/utils/imageUtils';

interface FixedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  showRetry?: boolean;
}

/**
 * A reliable image component that handles loading states, errors, and retries
 * Specifically designed for problematic images like "Maiz à Trois" and logos
 */
const FixedImage: React.FC<FixedImageProps> = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  showRetry = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());
  const [imageSrc, setImageSrc] = useState<string>('');
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Special handling for known problematic images
    let optimizedSrc = src;
    
    if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
      optimizedSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
    }
    
    // Apply cache-busting
    setImageSrc(getOptimizedImagePath(optimizedSrc));
  }, [src, alt]);
  
  const handleRetry = async () => {
    setIsLoaded(false);
    setHasError(false);
    
    try {
      const newSrc = await forceReloadImage(src);
      setImageSrc(newSrc);
      setImageKey(Date.now());
    } catch (error) {
      console.error("Image retry failed:", error);
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };
  
  return (
    <div className="relative">
      <img
        key={`fixed-img-${imageKey}`}
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded && !hasError ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={(e) => {
          console.error(`Image failed to load: ${imageSrc}`);
          setHasError(true);
          setIsLoaded(true);
          handleImageError(e, fallbackSrc);
        }}
        {...props}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted shimmer rounded-md"></div>
      )}
      
      {hasError && showRetry && (
        <button
          onClick={handleRetry}
          className="absolute bottom-2 right-2 bg-primary/80 text-white px-2 py-1 rounded text-xs"
          type="button"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default FixedImage;
