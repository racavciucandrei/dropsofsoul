
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CocktailDetails from './CocktailDetails';
import { Product } from '@/data/types';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
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
          <CocktailDetails cocktails={product.signatureCocktails} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProductTabs;
