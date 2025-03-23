
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getOptimizedImagePath, handleImageError } from '@/utils/imageUtils';

interface CocktailIngredient {
  name: string;
}

interface CocktailGarnish {
  name: string;
}

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
  
  // Get current cocktail
  const currentCocktail = cocktails && cocktails.length > 0 
    ? cocktails[selectedCocktailIndex] 
    : null;
    
  if (!currentCocktail) return null;
  
  return (
    <div className="space-y-4">
      {/* Cocktail Selector - Show even if there is only one cocktail */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Our Signature Cocktails</h3>
        <div className="flex flex-wrap gap-2">
          {cocktails.map((cocktail, index) => (
            <Button
              key={index}
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
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-sm">Garnish:</h4>
                <ul className="list-disc list-inside text-muted-foreground text-sm mt-1 space-y-1">
                  {currentCocktail.garnish.map((item, index) => (
                    <li key={index}>{item}</li>
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
                  src={getOptimizedImagePath(currentCocktail.imagePath)}
                  alt={`${currentCocktail.name} Cocktail`}
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-500",
                    cocktailImageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setCocktailImageLoaded(true)}
                  onError={(e) => handleImageError(e)}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center italic">
                {currentCocktail.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CocktailDetails;
