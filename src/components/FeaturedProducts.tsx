
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';

// Featured product selection
const products = [
  {
    id: 1,
    name: 'Aromatic Bitters',
    category: 'Bitters',
    price: 18.95,
    image: '/assets/product-1.jpg',
    slug: 'aromatic-bitters',
  },
  {
    id: 8,
    name: 'Elderflower Cordial',
    category: 'Cordials',
    price: 22.50,
    image: '/assets/product-2.jpg',
    slug: 'elderflower-cordial',
  },
  {
    id: 13,
    name: 'Blackberry Shrub',
    category: 'Shrubs',
    price: 24.95,
    image: '/assets/product-3.jpg',
    slug: 'blackberry-shrub',
  },
  {
    id: 12,
    name: 'Hibiscus Cordial',
    category: 'Cordials',
    price: 25.95,
    image: '/assets/product-14.jpg',
    slug: 'hibiscus-cordial',
  },
];

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgc3R5bGU9ImZpbGw6I2VlZTtzdHJva2U6I2NjYztzdHJva2Utd2lkdGg6MiIvPjwvc3ZnPg==';

interface ProductCardProps {
  product: typeof products[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="group product-card border-none overflow-hidden bg-transparent shadow-none transition-all duration-300 hover:shadow-md hover:bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
          {/* Product Image */}
          <div 
            className={cn(
              "absolute inset-0 bg-muted product-image",
              imageLoaded ? "" : "shimmer"
            )}
          >
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
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
        <Link to={`/product/${product.slug}`} className="block group-hover:text-primary transition-colors">
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
