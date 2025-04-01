
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { allProducts } from '@/data/products';

// Select featured products from the current product collection
const featuredProducts = [
  // Bitters - Tepache Bitters
  allProducts.find(p => p.slug === 'tepache-bitters'),
  // Cordials - Raspberry & Lychee Cordial
  allProducts.find(p => p.slug === 'raspberry-lychee-cordial'),
  // Shrubs - Grapefruit & Rosemary Shrub
  allProducts.find(p => p.slug === 'grapefruit-rosemary-shrub'),
  // Shrubs - Cherry Bark & Marzipan Shrub (one of the new ones)
  allProducts.find(p => p.slug === 'cherry-bark-marzipan-shrub'),
].filter(Boolean);

// Fallback placeholder image
const placeholderImage = '/placeholder.svg';

interface ProductCardProps {
  product: typeof allProducts[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    navigate(`/product/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get image URL to display
  const productImage = product.images && product.images.length > 0 && !imageError
    ? product.images[0]
    : placeholderImage;
  
  return (
    <Card 
      className="group product-card border-none overflow-hidden bg-transparent shadow-none transition-all duration-300 hover:shadow-md hover:bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${product.slug}`}
        onClick={(e) => handleProductClick(e, product.slug)}
      >
        <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
          {/* Product Image */}
          <div 
            className={cn(
              "absolute inset-0 bg-muted product-image",
              imageLoaded ? "" : "shimmer"
            )}
          >
            <img
              src={productImage}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error(`Failed to load product image: ${productImage}`);
                setImageError(true);
                
                // Try to load placeholder if not already using it
                if (productImage !== placeholderImage) {
                  const fallbackImg = new Image();
                  fallbackImg.src = placeholderImage;
                  fallbackImg.onload = () => setImageLoaded(true);
                }
              }}
            />
          </div>
          
          {/* Hover Action Buttons */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white shadow-md hover:bg-accent hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist logic here
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          {/* Category Tag */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-2">
        <Link 
          to={`/product/${product.slug}`} 
          className="block group-hover:text-primary transition-colors"
          onClick={(e) => handleProductClick(e, product.slug)}
        >
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mt-1">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
            Artisanal Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Most Popular Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium cocktail ingredients, made with care using traditional methods and the finest natural ingredients for that perfect soul in every drop.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product?.id} product={product!} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="rounded-full"
          >
            <Link to="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
