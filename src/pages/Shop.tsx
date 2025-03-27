
import React from 'react';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

const Shop = () => {
  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Shop Drops of Soul</h1>
          <p className="mt-4 text-xl">
            Discover our collection of handcrafted elixirs to enrich your soul.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/marketing">
              <QrCode className="mr-2 h-4 w-4" />
              Marketing QR Code
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;
