
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QRCode from '@/components/QRCode';

const Marketing = () => {
  const baseUrl = window.location.origin;
  
  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Marketing Materials</h1>
          <p className="mt-4 text-xl">
            Download our QR code for use on product labels, business cards, and other marketing materials.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Drops of Soul QR Code</h2>
            <p className="text-muted-foreground">
              This QR code links directly to our website. Download it for use on your marketing materials.
            </p>
          </div>
          
          <QRCode 
            url={baseUrl}
            size={300}
            logoUrl="/favicon.ico"
          />
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
