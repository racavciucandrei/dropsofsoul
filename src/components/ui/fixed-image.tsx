
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImagePath, handleImageError } from '@/utils/imageUtils';
import { imageLogger } from '@/utils/loggerUtils';

interface FixedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  showRetry?: boolean;
}

/**
 * A reliable image component that handles loading states, errors, and retries
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
    
    let optimizedSrc = src;
    
    // Direct hardcoded path for known problematic images
    if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
      imageLogger.info('Detected Maiz à Trois, using direct path');
      optimizedSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
    }
    
    const finalSrc = getOptimizedImagePath(optimizedSrc);
    imageLogger.debug(`Setting image src: ${finalSrc} (from ${src})`);
    setImageSrc(finalSrc);
  }, [src, alt]);
  
  const handleRetry = () => {
    imageLogger.info(`Retrying image: ${src}`);
    setIsLoaded(false);
    setHasError(false);
    setImageKey(Date.now());
    
    // For Maiz à Trois, always use the direct path
    if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
      setImageSrc('/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png');
    } else {
      setImageSrc(getOptimizedImagePath(src) + `?retry=${Date.now()}`);
    }
  };
  
  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted rounded-md flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
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
          imageLogger.info(`Image loaded successfully: ${imageSrc}`);
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={(e) => {
          imageLogger.error(`Image failed to load: ${imageSrc}`);
          setHasError(true);
          setIsLoaded(true);
          
          // For Maiz à Trois, try the hardcoded path again
          if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
            setImageSrc('/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png');
          } else {
            handleImageError(e, fallbackSrc);
          }
        }}
        {...props}
      />
      
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
