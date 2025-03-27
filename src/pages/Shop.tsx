
import React from 'react';
import ProductList from '@/components/ProductList';

const Shop = () => {
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
      <ProductList />
    </div>
  );
};

export default Shop;
