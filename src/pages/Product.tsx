
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import CocktailDetails from '@/components/product/CocktailDetails';
import RelatedProducts from '@/components/product/RelatedProducts';

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // Find product by slug
  const product = allProducts.find(p => p.slug === slug) || allProducts[0]; // Fallback to first product if not found
  
  // Related products
  const relatedProducts = product.related.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  
  // Reset state when slug changes
  useEffect(() => {
    setQuantity(1);
  }, [slug]);
  
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
    <div className="min-h-screen pt-24">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link 
            to={`/products/${product.category}`} 
            className="hover:text-primary transition-colors"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {product.name}
          </span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery images={product.images} productName={product.name} />
          
          {/* Product Info */}
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
            
            {/* Product Information Tabs */}
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
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default Product;
