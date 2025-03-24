
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLight } from '@/context/LightProvider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Products', 
    path: '/products',
    children: [
      { name: 'Bitters', path: '/products/bitters' },
      { name: 'Cordials', path: '/products/cordials' },
      { name: 'Shrubs', path: '/products/shrubs' },
    ]
  },
  { name: 'About', path: '/about' },
];

const logoImage = '/lovable-uploads/d14a3582-8c1c-41e1-a47a-c36651020757.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const location = useLocation();
  const { isLightOn } = useLight();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled 
          ? "bg-background/90 shadow-sm py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo with company name - visible when lights are on or off */}
        <Link 
          to="/" 
          className="relative z-10 flex items-center gap-3 company-logo-container"
        >
          <div className={cn(
            "h-9 w-auto transition-opacity duration-300",
            logoLoaded ? "opacity-100" : "opacity-0"
          )}>
            <img 
              src={logoImage} 
              alt="Drops of Soul Logo" 
              className="h-full w-auto object-contain"
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight company-name">
            Drops of Soul
          </span>
        </Link>
        
        {/* Desktop navigation links */}
        <div className="hide-in-dark">
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              // If this is a parent link with children, render a dropdown
              if (link.children) {
                return (
                  <NavigationMenu key={link.name}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(
                          "text-sm font-medium transition-colors",
                          location.pathname.includes(link.path) 
                            ? "text-primary font-semibold" 
                            : "text-foreground/80"
                        )}>
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-2 p-4">
                            {link.children.map((childLink) => (
                              <li key={childLink.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={childLink.path}
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                      location.pathname === childLink.path
                                        ? "bg-accent text-accent-foreground"
                                        : "transparent"
                                    )}
                                  >
                                    <div className="text-sm font-medium">{childLink.name}</div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }
              // Otherwise render a simple link
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path 
                      ? "text-primary font-semibold" 
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="hide-in-dark flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              0
            </span>
          </Button>
          
          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-4">
                <div className="flex items-center gap-3">
                  <img src={logoImage} alt="Drops of Soul Logo" className="h-8 w-auto" />
                  <SheetTitle className="text-left font-serif">Drops of Soul</SheetTitle>
                </div>
              </SheetHeader>
              <div className="flex flex-col py-6">
                <Link 
                  to="/"
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors hover:bg-accent/50 rounded-md",
                    location.pathname === "/" ? "bg-accent/30 text-primary" : ""
                  )}
                >
                  Home
                </Link>
                
                {/* Product dropdown for mobile */}
                <div className="flex flex-col">
                  <div 
                    className={cn(
                      "px-4 py-3 text-base font-medium transition-colors rounded-md",
                      location.pathname.includes("/products") ? "text-primary" : ""
                    )}
                  >
                    Products
                  </div>
                  <div className="ml-4 border-l border-border pl-4 my-1">
                    {navLinks[1].children.map((childLink) => (
                      <Link
                        key={childLink.name}
                        to={childLink.path}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors hover:text-primary",
                          location.pathname === childLink.path ? "text-primary font-medium" : ""
                        )}
                      >
                        {childLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to="/about"
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors hover:bg-accent/50 rounded-md",
                    location.pathname === "/about" ? "bg-accent/30 text-primary" : ""
                  )}
                >
                  About
                </Link>
                
                {/* Mobile catering section showing new feature */}
                <div className="mt-6 px-4 py-3 bg-primary/5 rounded-md">
                  <h3 className="font-medium mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-3">Mobile cocktail catering for events, weddings and parties</p>
                  <Link 
                    to="/about"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
