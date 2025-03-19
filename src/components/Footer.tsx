
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/70 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-xl font-bold tracking-tight">
              Drops of Soul
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Handcrafted cocktail ingredients from the mountains to your glass.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:text-primary"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              
              <Button
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:text-primary"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              
              <Button
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:text-primary"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/bitters" className="text-muted-foreground hover:text-primary transition-colors">
                  Bitters
                </Link>
              </li>
              <li>
                <Link to="/products/cordials" className="text-muted-foreground hover:text-primary transition-colors">
                  Cordials
                </Link>
              </li>
              <li>
                <Link to="/products/shrubs" className="text-muted-foreground hover:text-primary transition-colors">
                  Shrubs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-medium mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium mb-4">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our newsletter for exclusive offers and mountain-inspired cocktail recipes.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-full bg-white" 
              />
              <Button className="rounded-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Drops of Soul. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <img 
              src="/assets/payment-visa.svg" 
              alt="Visa" 
              className="h-6 w-auto opacity-60" 
            />
            <img 
              src="/assets/payment-mastercard.svg" 
              alt="Mastercard" 
              className="h-6 w-auto opacity-60" 
            />
            <img 
              src="/assets/payment-amex.svg" 
              alt="American Express" 
              className="h-6 w-auto opacity-60" 
            />
            <img 
              src="/assets/payment-paypal.svg" 
              alt="PayPal" 
              className="h-6 w-auto opacity-60" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
