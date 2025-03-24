
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { handleImageError, getOptimizedImagePath, preloadImage } from '@/utils/imageUtils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Key for forcing image re-render
  const [imageKey, setImageKey] = useState(Date.now());
  
  // Reset loading state and regenerate key when selected image changes
  useEffect(() => {
    setIsImageLoaded(false);
    setImageKey(Date.now()); // Force re-render of the image
    
    // Preload the selected image
    if (images && images.length > 0) {
      preloadImage(images[selectedImageIndex])
        .then(() => setIsImageLoaded(true))
        .catch(() => {
          console.error("Failed to preload selected image");
          setIsImageLoaded(true); // Still mark as loaded to show fallback
        });
    }
  }, [selectedImageIndex, images]);
  
  // Safety check for images array
  const safeImages = images && images.length > 0 ? images : ["/placeholder.svg"];
  
  // Get optimized image path with timestamp to prevent caching
  const optimizedImagePath = getOptimizedImagePath(safeImages[selectedImageIndex]);
  
  const handleRetryImage = () => {
    setIsImageLoaded(false);
    setImageKey(Date.now()); // Force re-render of the image
  };
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className={cn(
          "relative aspect-square overflow-hidden rounded-lg bg-muted",
          isImageLoaded ? "" : "shimmer"
        )}
      >
        <img
          key={imageKey} // Force re-render when key changes
          src={optimizedImagePath}
          alt={productName}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            console.log("Image error occurred for:", optimizedImagePath);
            handleImageError(e);
            setIsImageLoaded(true); // Still mark as loaded even with fallback
          }}
        />
        
        {/* Retry button shown when image fails to load */}
        {isImageLoaded && optimizedImagePath.includes('placeholder.svg') && (
          <button 
            onClick={handleRetryImage}
            className="absolute bottom-2 right-2 bg-primary/80 text-white px-2 py-1 rounded text-xs"
          >
            Retry Image
          </button>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((image, index) => (
            <button
              key={`thumb-${index}-${Date.now()}`} // Ensure unique keys
              onClick={() => {
                setSelectedImageIndex(index);
              }}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200",
                index === selectedImageIndex
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <img
                src={getOptimizedImagePath(image)}
                alt={`${productName} - view ${index + 1}`}
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
