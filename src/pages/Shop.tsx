
import React from 'react';
import ProductList from '@/components/ProductList';
import QRCode from '@/components/QRCode';

const Shop = () => {
  // Get the current website URL
  const websiteUrl = window.location.origin;
  
  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Shop Drops of Soul</h1>
          <p className="mt-4 text-xl">
            Discover our collection of handcrafted elixirs to enrich your soul.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ProductList />
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <QRCode 
                url={websiteUrl} 
                title="Scan to shop on mobile" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
