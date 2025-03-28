
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const products = allProducts;

  const handleAddToCart = (product: any) => {
    // In a real application, this would add the product to a cart state or storage
    toast.success(`Added ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-slate-200 animate-pulse" />
              <CardHeader>
                <div className="h-6 w-3/4 bg-slate-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-1/2 bg-slate-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No products found</h2>
        <p className="text-muted-foreground">Check back soon for our latest products.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{product.description}</p>
              <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
              {product.category && (
                <div className="mt-2">
                  <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-semibold text-slate-600">
                    {product.category}
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
