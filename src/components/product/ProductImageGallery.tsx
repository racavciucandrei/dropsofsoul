
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { handleImageError, getOptimizedImagePath, preloadImage, forceReloadImage } from '@/utils/imageUtils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Key for forcing image re-render
  const [imageKey, setImageKey] = useState(Date.now());
  
  // Use optimized and cache-busted image URL
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  
  // Safety check for images array
  const safeImages = images && images.length > 0 ? images : ["/placeholder.svg"];
  
  // Reset loading state and regenerate key when selected image changes
  useEffect(() => {
    const loadSelectedImage = async () => {
      setIsImageLoaded(false);
      setImageKey(Date.now()); // Force re-render of the image
      
      if (safeImages && safeImages.length > 0) {
        try {
          // Get fresh URL with cache-busting
          const optimizedPath = getOptimizedImagePath(safeImages[selectedImageIndex]);
          setCurrentImageUrl(optimizedPath);
          
          // Preload the image
          await preloadImage(optimizedPath);
          setIsImageLoaded(true);
        } catch (error) {
          console.error("Failed to preload image:", error);
          setIsImageLoaded(true); // Still mark as loaded to show fallback
          setCurrentImageUrl('/placeholder.svg');
        }
      }
    };
    
    loadSelectedImage();
  }, [selectedImageIndex, safeImages, retryCount]);
  
  const handleRetryImage = async () => {
    setIsImageLoaded(false);
    setRetryCount(prev => prev + 1);
    
    try {
      // Force reload with new cache-busting parameter
      const freshUrl = await forceReloadImage(safeImages[selectedImageIndex]);
      setCurrentImageUrl(freshUrl);
      setImageKey(Date.now());
    } catch (error) {
      console.error("Retry failed:", error);
      setCurrentImageUrl(getOptimizedImagePath(safeImages[selectedImageIndex]));
    }
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
          key={`main-image-${imageKey}`}
          src={currentImageUrl}
          alt={productName}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            console.log("Image error occurred for:", currentImageUrl);
            handleImageError(e);
            setIsImageLoaded(true); // Still mark as loaded even with fallback
          }}
        />
        
        {/* Retry button shown when image fails to load */}
        {isImageLoaded && currentImageUrl.includes('placeholder.svg') && (
          <button 
            onClick={handleRetryImage}
            className="absolute bottom-2 right-2 bg-primary/80 text-white px-3 py-1.5 rounded text-sm"
          >
            Retry Image
          </button>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((image, index) => {
            // Get a fresh URL for each thumbnail
            const thumbUrl = getOptimizedImagePath(image);
            
            return (
              <button
                key={`thumb-${index}-${imageKey}`}
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
                  src={thumbUrl}
                  alt={`${productName} - view ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
