import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useCart } from '@/hooks/useCart';

const Product = () => {
  // Use the scroll to top hook
  useScrollToTop();
  
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [cocktailImageLoaded, setCocktailImageLoaded] = useState(false);
  const [selectedCocktailIndex, setSelectedCocktailIndex] = useState(0);
  
  // Find product by slug
  const product = allProducts.find(p => p.slug === slug) || allProducts[0];
  const { addToCart } = useCart();
  
  // Related products
  const relatedProducts = product.related.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  
  // Reset state when slug changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setIsImageLoaded(false);
    setQuantity(1);
    setSelectedCocktailIndex(0);
    setCocktailImageLoaded(false);
  }, [slug]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Get current cocktail
  const currentCocktail = product.signatureCocktails && product.signatureCocktails.length > 0 
    ? product.signatureCocktails[selectedCocktailIndex] 
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
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
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-muted",
                isImageLoaded ? "" : "shimmer"
              )}
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsImageLoaded(false);
                    }}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200",
                      index === selectedImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
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
                onClick={handleAddToCart}
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
              
              {/* Signature Cocktail Tab with Image */}
              {product.signatureCocktails && product.signatureCocktails.length > 0 && (
                <TabsContent value="cocktail" className="mt-4">
                  {/* Cocktail Selector - Show even if there is only one cocktail */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Our Signature Cocktails</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.signatureCocktails.map((cocktail, index) => (
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
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct?.id} className="overflow-hidden border-none shadow-sm">
                <Link 
                  to={`/product/${relatedProduct?.slug}`} 
                  className="block aspect-square relative overflow-hidden"
                >
                  <img
                    src={relatedProduct?.images[0]}
                    alt={relatedProduct?.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                
                <div className="p-4">
                  <Link 
                    to={`/product/${relatedProduct?.slug}`}
                    className="block font-medium hover:text-primary transition-colors"
                  >
                    {relatedProduct?.name}
                  </Link>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-semibold">
                      ${relatedProduct?.price.toFixed(2)}
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
      </div>
    </div>
  );
};

export default Product;
