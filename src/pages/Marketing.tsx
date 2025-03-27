
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QRCode from '@/components/QRCode';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

// This is a simple authorization check - in a real app, you would use your auth system
// to check if the user is an admin or has permission to access this page
const isAuthorized = () => {
  // For demonstration, we'll use localStorage to simulate authorization
  // In a real application, you would check the user's role/permissions from your auth system
  return localStorage.getItem('isAdmin') === 'true';
};

const Marketing = () => {
  const { toast } = useToast();
  const baseUrl = window.location.origin;
  
  // For demonstration purposes, you can set yourself as admin in the console with:
  // localStorage.setItem('isAdmin', 'true')
  
  // If not authorized, redirect to home page
  if (!isAuthorized()) {
    toast({
      title: "Access Restricted",
      description: "You don't have permission to access this page.",
      variant: "destructive"
    });
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen">
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Marketing Materials</h1>
          <p className="mt-4 text-xl">
            This is your private QR code for use on product labels, business cards, and other marketing materials.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="mr-2 h-5 w-5 text-green-600" />
              <h2 className="text-2xl font-semibold">Private Drops of Soul QR Code</h2>
            </div>
            <p className="text-muted-foreground">
              This QR code links directly to your website. It's only accessible to you as the business owner.
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
