
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { handleImageError, getOptimizedImagePath } from '@/utils/imageUtils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Reset loading state when selected image changes
  useEffect(() => {
    setIsImageLoaded(false);
  }, [selectedImageIndex]);
  
  const optimizedImagePath = getOptimizedImagePath(images[selectedImageIndex]);
  
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
          src={optimizedImagePath}
          alt={productName}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            handleImageError(e);
            setIsImageLoaded(true); // Still mark as loaded even with fallback
          }}
        />
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImageIndex(index);
                setIsImageLoaded(false);
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
