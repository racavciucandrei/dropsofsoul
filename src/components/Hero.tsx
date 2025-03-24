
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLight } from '@/context/LightProvider';

const images = [
  '/assets/hero-1.jpg',
  '/assets/hero-2.jpg',
  '/assets/hero-3.jpg',
];

// Hard-coded logo path
const logoImage = '/lovable-uploads/d14a3582-8c1c-41e1-a47a-c36651020757.png';
const placeholderImage = '/placeholder.svg';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoKey] = useState(Date.now()); // Key for cache busting
  const { isLightOn } = useLight();
  
  useEffect(() => {
    // Set up image preloading
    const imageObjects = images.map((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      return img;
    });
    
    // Initialize loaded state array
    setLoadedImages(new Array(images.length).fill(false));
    
    // Set up slideshow timer - reduced frequency
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => {
      clearInterval(interval);
      imageObjects.forEach(img => {
        img.onload = null;
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-500",
        isLightOn ? "opacity-100" : "opacity-5"
      )}>
        {images.map((src, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            )}
            style={{
              backgroundImage: `url(${loadedImages[index] ? src : placeholderImage})`,
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="hide-in-dark container-custom relative z-10 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            {/* Logo display with simplified error handling */}
            <div className="flex justify-center mb-8">
              <div className="w-52 md:w-64 lg:w-72 relative">
                <img 
                  key={logoKey}
                  src={`${logoImage}?v=${logoKey}`}
                  alt="Drops of Soul Logo" 
                  className="w-full h-auto"
                  onLoad={() => setLogoLoaded(true)}
                  onError={(e) => {
                    console.error("Logo load error in Hero");
                    // Fallback
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                    setLogoLoaded(true);
                  }}
                />
                {!logoLoaded && (
                  <div className="absolute inset-0 bg-muted/30 rounded-md"></div>
                )}
              </div>
            </div>
            
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 backdrop-blur-sm text-primary-foreground/90 rounded-full">
                Craft Cocktail Essentials
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
              Elevate Your Cocktails with Artisanal Ingredients
            </h1>
            
            <p className="text-base md:text-lg text-white/90 drop-shadow-sm">
              Handcrafted bitters, cordials, and shrubs made with organic ingredients and traditional methods.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="text-base rounded-full"
              >
                <Link to="/products">
                  Explore Our Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full"
              >
                <Link to="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentImageIndex 
                  ? "bg-white w-6" 
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
