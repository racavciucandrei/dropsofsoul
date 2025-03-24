
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductActionsProps {
  quantity: number;
  handleQuantityChange: (amount: number) => void;
  productName: string;
}

const ProductActions = ({ quantity, handleQuantityChange, productName }: ProductActionsProps) => {
  const addToCart = () => {
    toast.success(`Added ${quantity} x ${productName} to cart`);
  };

  return (
    <div className="space-y-4">
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
            <span className="h-4 w-4">-</span>
            <span className="sr-only">Decrease quantity</span>
          </Button>
          
          <span className="w-10 text-center">{quantity}</span>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-r-full"
            onClick={() => handleQuantityChange(1)}
          >
            <span className="h-4 w-4">+</span>
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

export default ProductActions;
