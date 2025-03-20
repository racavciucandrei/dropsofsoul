import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Updated product data
const allProducts = [
  // Bitters (7 types)
  {
    id: 1,
    name: 'Tepache Bitters',
    category: 'bitters',
    price: 18.95,
    image: '/assets/product-1.jpg',
    slug: 'tepache-bitters',
    bestseller: true,
  },
  {
    id: 2,
    name: 'Orange Bitters',
    category: 'bitters',
    price: 19.95,
    image: '/assets/product-4.jpg',
    slug: 'orange-bitters',
    bestseller: false,
  },
  {
    id: 3,
    name: 'Cherry Bitters',
    category: 'bitters',
    price: 18.50,
    image: '/assets/product-6.jpg',
    slug: 'cherry-bitters',
    bestseller: true,
  },
  {
    id: 4,
    name: 'Chocolate Bitters',
    category: 'bitters',
    price: 20.95,
    image: '/assets/product-9.jpg',
    slug: 'chocolate-bitters',
    bestseller: false,
  },
  {
    id: 5,
    name: 'Lavender Bitters',
    category: 'bitters',
    price: 21.50,
    image: '/assets/product-10.jpg',
    slug: 'lavender-bitters',
    bestseller: false,
  },
  {
    id: 6,
    name: 'Grapefruit Bitters',
    category: 'bitters',
    price: 19.95,
    image: '/assets/product-11.jpg',
    slug: 'grapefruit-bitters',
    bestseller: false,
  },
  {
    id: 7,
    name: 'Spiced Bitters',
    category: 'bitters',
    price: 22.95,
    image: '/assets/product-12.jpg',
    slug: 'spiced-bitters',
    bestseller: true,
  },
  
  // Cordials (5 types)
  {
    id: 8,
    name: 'Elderflower Cordial',
    category: 'cordials',
    price: 22.50,
    image: '/assets/product-2.jpg',
    slug: 'elderflower-cordial',
    bestseller: false,
  },
  {
    id: 9,
    name: 'Ginger Cordial',
    category: 'cordials',
    price: 21.95,
    image: '/assets/product-5.jpg',
    slug: 'ginger-cordial',
    bestseller: false,
  },
  {
    id: 10,
    name: 'Lavender Cordial',
    category: 'cordials',
    price: 24.95,
    image: '/assets/product-8.jpg',
    slug: 'lavender-cordial',
    bestseller: true,
  },
  {
    id: 11,
    name: 'Rose Cordial',
    category: 'cordials',
    price: 23.95,
    image: '/assets/product-13.jpg',
    slug: 'rose-cordial',
    bestseller: false,
  },
  {
    id: 12,
    name: 'Hibiscus Cordial',
    category: 'cordials',
    price: 25.95,
    image: '/assets/product-14.jpg',
    slug: 'hibiscus-cordial',
    bestseller: true,
  },
  
  // Shrubs (4 types)
  {
    id: 13,
    name: 'Blackberry Shrub',
    category: 'shrubs',
    price: 24.95,
    image: '/assets/product-3.jpg',
    slug: 'blackberry-shrub',
    bestseller: true,
  },
  {
    id: 14,
    name: 'Raspberry Shrub',
    category: 'shrubs',
    price: 23.50,
    image: '/assets/product-7.jpg',
    slug: 'raspberry-shrub',
    bestseller: false,
  },
  {
    id: 15,
    name: 'Peach Shrub',
    category: 'shrubs',
    price: 22.95,
    image: '/assets/product-15.jpg',
    slug: 'peach-shrub',
    bestseller: false,
  },
  {
    id: 16,
    name: 'Strawberry Basil Shrub',
    category: 'shrubs',
    price: 25.50,
    image: '/assets/product-16.jpg',
    slug: 'strawberry-basil-shrub',
    bestseller: true,
  },
];

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgc3R5bGU9ImZpbGw6I2VlZTtzdHJva2U6I2NjYztzdHJva2Utd2lkdGg6MiIvPjwvc3ZnPg==';

interface ProductCardProps {
  product: typeof allProducts[0];
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
          
          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            <span className="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
            
            {product.bestseller && (
              <span className="px-2 py-1 text-xs font-medium bg-accent/90 text-white backdrop-blur-sm rounded-full">
                Bestseller
              </span>
            )}
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

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortOption, setSortOption] = useState("featured");
  
  // Filter products based on category, search, and price
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category if specified
    if (category && product.category !== category) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        // 'featured' - bestsellers first
        return b.bestseller === a.bestseller ? 0 : b.bestseller ? 1 : -1;
    }
  });
  
  // Get title based on category
  const getTitle = () => {
    if (!category) return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Get description based on category
  const getDescription = () => {
    switch (category) {
      case "bitters":
        return "Our artisanal bitters are crafted using traditional methods and carefully selected botanicals.";
      case "cordials":
        return "Discover our collection of handcrafted cordials, made with fresh fruits, flowers, and spices.";
      case "shrubs":
        return "Our tangy and refreshing shrubs combine fruit, sugar, and vinegar to create complex flavor profiles.";
      default:
        return "Browse our complete collection of handcrafted cocktail ingredients.";
    }
  };
  
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">{getTitle()}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {getDescription()}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-medium mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <Button 
                  variant={!category ? "default" : "outline"} 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link to="/products">All Products</Link>
                </Button>
                <Button 
                  variant={category === "bitters" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link to="/products/bitters">Bitters</Link>
                </Button>
                <Button 
                  variant={category === "cordials" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link to="/products/cordials">Cordials</Link>
                </Button>
                <Button 
                  variant={category === "shrubs" ? "default" : "outline"} 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link to="/products/shrubs">Shrubs</Link>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 50]}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} products
              </p>
              
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange([0, 50]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
