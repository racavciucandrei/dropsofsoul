
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import AuthNavItems from './AuthNavItems';
import { ShoppingCart } from './ShoppingCart';

// Use the actual uploaded image path
const logoImage = '/lovable-uploads/924208b5-f5a2-466d-b7ca-3888563249ef.png';
const fallbackLogo = '/placeholder.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo row */}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-auto overflow-hidden mr-2">
                <img 
                  src={logoImage}
                  alt="Drops of Soul Logo" 
                  className="h-full w-auto object-contain"
                  onLoad={() => setLogoLoaded(true)}
                  onError={(e) => {
                    console.error("Failed to load logo image in navbar:", logoImage);
                    // Try fallback to placeholder after error
                    const target = e.target as HTMLImageElement;
                    if (target.src !== fallbackLogo) {
                      target.src = fallbackLogo;
                      setLogoLoaded(true);
                    }
                  }}
                />
              </div>
              <span className="text-lg font-bold">Drops of Soul</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <ShoppingCart />
            <AuthNavItems />
          </div>
          
          <div className="flex items-center md:hidden gap-2">
            <ShoppingCart />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Full width navigation row */}
        <div className="hidden md:block border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex justify-center h-12">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/'
                    ? 'border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/shop'
                    ? 'border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } text-sm font-medium`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/about'
                    ? 'border-blue-500 dark:border-blue-400 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/'
                ? 'bg-blue-50 dark:bg-slate-800 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            } text-base font-medium`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/shop'
                ? 'bg-blue-50 dark:bg-slate-800 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            } text-base font-medium`}
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/about'
                ? 'bg-blue-50 dark:bg-slate-800 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            } text-base font-medium`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                {/* Mobile auth items */}
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth?tab=register" onClick={() => setIsOpen(false)}>Register</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
