
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';
import { useCart } from '@/context/CartProvider';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [imageLoadState, setImageLoadState] = useState<Record<string, boolean>>({});
  const products = allProducts;
  const { addToCart } = useCart();

  // Preload images
  useEffect(() => {
    products.forEach(product => {
      if (product.images && product.images.length > 0) {
        const img = new Image();
        img.src = product.images[0];
        img.onload = () => {
          setImageLoadState(prev => ({
            ...prev,
            [product.id]: true
          }));
        };
        img.onerror = () => {
          console.error(`Failed to load product image: ${product.images?.[0]}`);
        };
      }
      
      // Preload signature cocktail images if available
      if (product.signatureCocktails && product.signatureCocktails.length > 0) {
        product.signatureCocktails.forEach(cocktail => {
          if (cocktail.imagePath) {
            const cocktailImg = new Image();
            cocktailImg.src = cocktail.imagePath;
            cocktailImg.onerror = () => {
              console.error(`Failed to load cocktail image: ${cocktail.imagePath}`);
            };
          }
        });
      }
    });
  }, [products]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
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
            <Link to={`/product/${product.slug}`} className="h-48 bg-slate-100 relative overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: imageLoadState[product.id] ? 1 : 0 }}
                  onLoad={() => {
                    setImageLoadState(prev => ({
                      ...prev,
                      [product.id]: true
                    }));
                  }}
                  onError={(e) => {
                    console.error(`Failed to load product image for ${product.name}`);
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              
              {/* Product tag */}
              <div className="absolute bottom-2 left-2">
                <span className="inline-block bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  {product.category}
                </span>
              </div>
            </Link>
            
            <CardHeader>
              <Link to={`/product/${product.slug}`}>
                <CardTitle className="hover:text-primary transition-colors">{product.name}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{product.description}</p>
              <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
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
