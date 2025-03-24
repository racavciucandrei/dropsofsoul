
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '@/data/products';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import { imageLogger } from '@/utils/loggerUtils';

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
    
    // Log current product for debugging
    imageLogger.info(`Loading product: ${product.name}, slug: ${slug}`);
    if (product.signatureCocktails && product.signatureCocktails.length > 0) {
      imageLogger.info(`Signature cocktail: ${product.signatureCocktails[0].name}, image: ${product.signatureCocktails[0].imagePath}`);
    }
  }, [slug, product]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
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
            {/* Basic product info (name, price, rating) */}
            <ProductInfo product={product} />
            
            {/* Quantity selector and action buttons */}
            <ProductActions 
              quantity={quantity} 
              handleQuantityChange={handleQuantityChange} 
              productName={product.name} 
            />
            
            {/* Product Information Tabs */}
            <ProductTabs product={product} />
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default Product;
