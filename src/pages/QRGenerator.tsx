
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QRCode from '@/components/QRCode';
import { allProducts } from '@/data/products';

const QRGenerator = () => {
  const navigate = useNavigate();
  const [qrType, setQrType] = useState('website');
  const [productId, setProductId] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [size, setSize] = useState(300);
  
  const baseUrl = window.location.origin;
  
  const getQrUrl = () => {
    if (qrType === 'product' && productId) {
      return `${baseUrl}/product/${productId}`;
    } else if (qrType === 'custom' && customUrl) {
      return customUrl.startsWith('http') ? customUrl : `https://${customUrl}`;
    }
    return baseUrl;
  };
  
  const getQrTitle = () => {
    if (qrType === 'product' && productId) {
      const product = allProducts.find(p => p.slug === productId);
      return `Scan to discover ${product?.name || productId}`;
    } else if (qrType === 'custom') {
      return 'Scan custom QR code';
    }
    return 'Scan to visit Drops of Soul';
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">QR Code Generator</h1>
          <p className="mt-4 text-xl">
            Create QR codes for your bottles, business cards, and marketing materials.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">QR Code Settings</h2>
            
            <div className="space-y-3">
              <Label>QR Code Type</Label>
              <RadioGroup value={qrType} onValueChange={setQrType} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="website" id="website" />
                  <Label htmlFor="website">Main Website</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product" id="product" />
                  <Label htmlFor="product">Specific Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom URL</Label>
                </div>
              </RadioGroup>
            </div>
            
            {qrType === 'product' && (
              <div className="space-y-3">
                <Label htmlFor="product-select">Select Product</Label>
                <Select value={productId} onValueChange={setProductId}>
                  <SelectTrigger id="product-select">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {allProducts.map(product => (
                      <SelectItem key={product.slug} value={product.slug}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {qrType === 'custom' && (
              <div className="space-y-3">
                <Label htmlFor="custom-url">Custom URL</Label>
                <Input 
                  id="custom-url" 
                  placeholder="Enter URL (e.g., https://example.com)" 
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="qr-size">QR Code Size (px)</Label>
              <Input 
                id="qr-size" 
                type="number" 
                min="100" 
                max="800" 
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
            
            <Button onClick={() => navigate('/shop')} variant="outline">
              Back to Shop
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <QRCode 
              url={getQrUrl()}
              title={getQrTitle()}
              size={size}
              productId={qrType === 'product' ? productId : undefined}
              logoUrl="/favicon.ico"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
