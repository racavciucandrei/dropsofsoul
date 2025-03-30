
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from '@/data/products';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDetailTabs from '@/components/product/ProductDetailTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import Breadcrumbs from '@/components/product/Breadcrumbs';

const Product = () => {
  // Use the scroll to top hook
  useScrollToTop();
  
  const { slug } = useParams<{ slug: string }>();
  
  // Find product by slug
  const product = allProducts.find(p => p.slug === slug) || allProducts[0]; // Fallback to first product if not found
  
  // Related products
  const relatedProducts = product.related.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  
  // Reset state when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs productName={product.name} category={product.category} />
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImages images={product.images} productName={product.name} />
          
          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
            
            {/* Product Information Tabs */}
            <ProductDetailTabs product={product} />
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default Product;
