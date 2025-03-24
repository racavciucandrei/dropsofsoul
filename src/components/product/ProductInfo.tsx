
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/types';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
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
    </div>
  );
};

export default ProductInfo;
