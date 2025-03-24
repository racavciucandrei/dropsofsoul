
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FixedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

/**
 * A reliable image component with simplified error handling
 */
const FixedImage: React.FC<FixedImageProps> = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());
  
  // Apply special handling for known problematic images
  let imageSrc = src;
  if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
    imageSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
  }
  
  const handleRetry = () => {
    setIsLoaded(false);
    setHasError(false);
    setImageKey(Date.now());
  };
  
  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted rounded-md flex items-center justify-center">
          {!hasError ? (
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : null}
        </div>
      )}
      
      <img
        key={`fixed-img-${imageKey}`}
        src={`${imageSrc}?v=${imageKey}`}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => {
          setIsLoaded(true);
          setHasError(false);
        }}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
          
          // Set fallback image
          const imgElement = document.querySelector(`[key="fixed-img-${imageKey}"]`) as HTMLImageElement;
          if (imgElement) {
            imgElement.src = fallbackSrc;
          }
        }}
        {...props}
      />
      
      {hasError && (
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
