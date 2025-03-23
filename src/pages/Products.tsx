
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { allProducts } from '@/data/products';
import { handleImageError } from '@/utils/imageUtils';

const Products = () => {
  const { category } = useParams<{ category: string }>();
  
  // Filter products by category if specified, otherwise show all
  const filteredProducts = category 
    ? allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : allProducts;
    
  // Get unique categories for filter buttons
  const categories = [...new Set(allProducts.map(p => p.category))];
  
  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            Products {category && `/ ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          </span>
        </div>
        
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
              : 'All Products'
            }
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of premium {category || 'cocktail ingredients'} crafted with care for the discerning bartender and cocktail enthusiast.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Link to="/products">
            <Button 
              variant={!category ? "default" : "outline"}
              className="rounded-full"
            >
              All Products
            </Button>
          </Link>
          
          {categories.map((cat) => (
            <Link key={cat} to={`/products/${cat.toLowerCase()}`}>
              <Button 
                variant={category === cat.toLowerCase() ? "default" : "outline"}
                className="rounded-full"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            </Link>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-sm">
              <Link 
                to={`/product/${product.slug}`} 
                className="block aspect-square relative overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => handleImageError(e)}
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
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">
              We couldn't find any products in this category. Please try another category or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
