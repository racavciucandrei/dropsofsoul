
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getOptimizedImagePath, handleImageError, preloadImage, forceReloadImage } from '@/utils/imageUtils';

interface Cocktail {
  name: string;
  description: string;
  ingredients: string[];
  garnish: string[];
  imagePath: string;
}

interface CocktailDetailsProps {
  cocktails: Cocktail[];
}

const CocktailDetails = ({ cocktails }: CocktailDetailsProps) => {
  const [selectedCocktailIndex, setSelectedCocktailIndex] = useState(0);
  const [cocktailImageLoaded, setCocktailImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imageKey, setImageKey] = useState(Date.now());
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  
  // Reset image loaded state when cocktail changes or retry is triggered
  useEffect(() => {
    const loadCocktailImage = async () => {
      setCocktailImageLoaded(false);
      setImageKey(Date.now()); // Force re-render with new key
      
      // Ensure we have valid cocktails data
      if (cocktails && cocktails.length > 0 && cocktails[selectedCocktailIndex]?.imagePath) {
        try {
          // Special handling for Maiz à Trois image
          const imagePath = cocktails[selectedCocktailIndex].name.includes('Maiz') 
            ? '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png' 
            : cocktails[selectedCocktailIndex].imagePath;
            
          // Get optimized path with cache busting
          const optimizedPath = getOptimizedImagePath(imagePath);
          setCurrentImageUrl(optimizedPath);
          
          // Attempt to preload the image
          await preloadImage(optimizedPath);
          setCocktailImageLoaded(true);
        } catch (error) {
          console.error("Failed to preload cocktail image:", error);
          setCocktailImageLoaded(true); // Still mark as loaded to show fallback
          setCurrentImageUrl('/placeholder.svg');
        }
      }
    };
    
    loadCocktailImage();
  }, [selectedCocktailIndex, cocktails, retryCount]);
  
  // Get current cocktail with safety check
  const currentCocktail = cocktails && cocktails.length > 0 
    ? cocktails[selectedCocktailIndex] 
    : null;
    
  if (!currentCocktail) return null;
  
  const handleRetryImage = async () => {
    setCocktailImageLoaded(false);
    setRetryCount(prev => prev + 1);
    
    try {
      // Check if this is the Maiz à Trois cocktail that needs special handling
      const imagePath = currentCocktail.name.includes('Maiz') 
        ? '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png' 
        : currentCocktail.imagePath;
        
      // Force reload the image with fresh cache-busting
      const freshUrl = await forceReloadImage(imagePath);
      setCurrentImageUrl(freshUrl);
      setImageKey(Date.now());
    } catch (error) {
      console.error("Retry failed:", error);
      // Fallback to placeholder if all else fails
      setCurrentImageUrl('/placeholder.svg');
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Cocktail Selector - Show even if there is only one cocktail */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Our Signature Cocktails</h3>
        <div className="flex flex-wrap gap-2">
          {cocktails.map((cocktail, index) => (
            <Button
              key={`cocktail-btn-${index}`}
              variant={selectedCocktailIndex === index ? "default" : "outline"}
              onClick={() => {
                setSelectedCocktailIndex(index);
                setCocktailImageLoaded(false);
              }}
              className="rounded-full"
            >
              {cocktail.name}
            </Button>
          ))}
        </div>
      </div>
      
      {currentCocktail && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="font-medium text-lg">{currentCocktail.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{currentCocktail.description}</p>
              
              <div className="mt-4">
                <h4 className="font-medium text-sm">Ingredients:</h4>
                <ul className="list-disc list-inside text-muted-foreground text-sm mt-1 space-y-1">
                  {currentCocktail.ingredients.map((ingredient, index) => (
                    <li key={`ingredient-${index}`}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-sm">Garnish:</h4>
                <ul className="list-disc list-inside text-muted-foreground text-sm mt-1 space-y-1">
                  {currentCocktail.garnish.map((item, index) => (
                    <li key={`garnish-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className={cn(
                "aspect-square rounded-lg overflow-hidden bg-muted",
                cocktailImageLoaded ? "" : "shimmer"
              )}>
                <img 
                  key={`cocktail-image-${imageKey}`}
                  src={currentImageUrl}
                  alt={`${currentCocktail.name} Cocktail`}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    cocktailImageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setCocktailImageLoaded(true)}
                  onError={(e) => {
                    console.error("Cocktail image error:", currentImageUrl);
                    handleImageError(e);
                    setCocktailImageLoaded(true); // Mark as loaded even with fallback
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {currentCocktail.name}
              </p>
              
              {/* Retry button for failed images - made more prominent */}
              {cocktailImageLoaded && currentImageUrl.includes('placeholder.svg') && (
                <div className="flex justify-center mt-2">
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={handleRetryImage}
                    className="mt-2"
                  >
                    Retry Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CocktailDetails;
