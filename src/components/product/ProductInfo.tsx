
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Star, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Product } from '@/data/types';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    toast.success(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold">{product.name}</h1>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-4 w-4", 
                  i < Math.floor(product.rating) 
                    ? "fill-primary text-primary" 
                    : i < product.rating 
                      ? "fill-primary/50 text-primary" 
                      : "text-muted-foreground/30"
                )} 
              />
            ))}
            <span className="ml-2 text-sm font-medium">{product.rating}</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {product.reviews} reviews
          </div>
        </div>
        
        <div className="mt-4">
          <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        {product.description}
      </p>
      
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border rounded-full">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-l-full"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          
          <span className="w-10 text-center">{quantity}</span>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-r-full"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          size="lg" 
          className="flex-1 rounded-full"
          onClick={addToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12"
        >
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12"
        >
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share product</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
