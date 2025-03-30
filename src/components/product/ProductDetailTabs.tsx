
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Product } from '@/data/types';

interface ProductDetailTabsProps {
  product: Product;
}

const ProductDetailTabs = ({ product }: ProductDetailTabsProps) => {
  const [selectedCocktailIndex, setSelectedCocktailIndex] = useState(0);
  const [cocktailImageLoaded, setCocktailImageLoaded] = useState(false);
  
  // Get current cocktail
  const currentCocktail = product.signatureCocktails && product.signatureCocktails.length > 0 
    ? product.signatureCocktails[selectedCocktailIndex] 
    : null;
  
  return (
    <Tabs defaultValue="details" className="mt-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="usage">How to Use</TabsTrigger>
        <TabsTrigger value="cocktail">Signature Cocktail</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-medium">Size</p>
            <p className="text-muted-foreground">{product.details.size}</p>
          </div>
          
          <div className="space-y-1">
            <p className="font-medium">Category</p>
            <p className="text-muted-foreground capitalize">{product.category}</p>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="font-medium">Description</p>
          <p className="text-muted-foreground mt-1">{product.description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="ingredients" className="mt-4">
        <div className="text-sm">
          <p className="font-medium">Ingredients</p>
          <p className="text-muted-foreground mt-1">{product.details.ingredients}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="usage" className="mt-4">
        <div className="text-sm">
          <p className="font-medium">Recommended Usage</p>
          <p className="text-muted-foreground mt-1">{product.details.usage}</p>
          <p className="mt-4 font-medium">Serving Suggestion</p>
          <p className="text-muted-foreground mt-1">
            Our {product.name} works wonderfully in classic cocktails. Try adding {product.details.usage} to an Old Fashioned or Manhattan for added complexity and depth.
          </p>
        </div>
      </TabsContent>
      
      {/* Signature Cocktail Tab */}
      {product.signatureCocktails && product.signatureCocktails.length > 0 && (
        <TabsContent value="cocktail" className="mt-4">
          {/* Cocktail Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Our Signature Cocktails</h3>
            <div className="flex flex-wrap gap-2">
              {product.signatureCocktails.map((cocktail, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCocktailIndex(index);
                    setCocktailImageLoaded(false);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full transition",
                    selectedCocktailIndex === index 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {cocktail.name}
                </button>
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
                      src={currentCocktail.imagePath} 
                      alt={`${currentCocktail.name} Cocktail`}
                      className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        cocktailImageLoaded ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() => setCocktailImageLoaded(true)}
                      onError={(e) => {
                        console.error("Failed to load cocktail image:", currentCocktail.imagePath);
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                        setCocktailImageLoaded(true);
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center italic">
                    {currentCocktail.name} - Made with {product.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProductDetailTabs;
