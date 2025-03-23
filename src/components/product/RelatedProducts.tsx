
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/data/types';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products || products.length === 0) return null;
  
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden border-none shadow-sm">
            <Link 
              to={`/product/${product.slug}`} 
              className="block aspect-square relative overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            
            <div className="p-4">
              <Link 
                to={`/product/${product.slug}`}
                className="block font-medium hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              
              <div className="flex items-center justify-between mt-1">
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
