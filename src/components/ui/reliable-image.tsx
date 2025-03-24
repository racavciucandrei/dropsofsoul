
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ReliableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

/**
 * A reliable image component with simplified error handling
 */
const ReliableImage: React.FC<ReliableImageProps> = ({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Special handling for Maiz à Trois
  let imageSrc = src;
  if (src.includes('Maiz') || alt.includes('Maiz') || src.includes('maiz')) {
    imageSrc = '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png';
  }
  
  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted rounded-md flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
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
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
          // Force fallback in case of error
          const imgElement = event.target as HTMLImageElement;
          if (imgElement) {
            imgElement.src = fallbackSrc;
          }
        }}
        {...props}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-muted/50 rounded-md flex items-center justify-center">
          <img 
            src={fallbackSrc} 
            alt={`Fallback for ${alt}`} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ReliableImage;
