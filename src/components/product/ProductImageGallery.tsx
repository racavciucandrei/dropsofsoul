
import React, { useState } from 'react';
import ReliableImage from '@/components/ui/reliable-image';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder.svg');
  
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden border border-border">
        <ReliableImage
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover"
          fallbackSrc="/placeholder.svg"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={`thumb-${index}`}
              onClick={() => handleThumbnailClick(image)}
              className={`relative aspect-square rounded-md overflow-hidden border ${
                mainImage === image ? 'border-primary' : 'border-border'
              }`}
            >
              <ReliableImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                fallbackSrc="/placeholder.svg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
