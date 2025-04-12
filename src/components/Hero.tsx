
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLight } from '@/context/LightProvider';

// Hardcoded fallback images that we know exist in case the other images fail to load
const fallbackImage = '/lovable-uploads/3a9d82f1-4dc8-466f-aaf3-84e39ef161b9.png';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLightOn } = useLight();
  
  useEffect(() => {
    // Set up slideshow timer
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Solid background to ensure no transparent gaps */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Logo watermark as background with improved positioning and styling */}
      <div 
        className={cn(
          "absolute inset-0 z-1 flex items-center justify-center",
          isLightOn ? "opacity-25" : "opacity-10"
        )}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/3a9d82f1-4dc8-466f-aaf3-84e39ef161b9.png" 
            alt="Drops of Soul Logo - Watermark"
            className={cn(
              "max-w-[80%] max-h-[80%] object-contain mix-blend-overlay",
              isLightOn ? "filter-none" : "brightness-150"
            )}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="hide-in-dark container-custom relative z-10 pt-28 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 backdrop-blur-sm text-primary-foreground/90 rounded-full">
                Craft Cocktail Essentials
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
              Elevate Your Cocktails with Artisanal Ingredients
            </h2>
            
            <p className="text-base md:text-lg text-white/90 drop-shadow-sm">
              Handcrafted bitters, cordials, and shrubs made with organic ingredients and traditional methods.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="text-base rounded-full transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg group"
              >
                <Link to="/products">
                  Explore Our Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full transition-all duration-500 hover:translate-y-[-2px]"
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
          {[0, 1].map((index) => (
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
      
      {/* Light effect when light is on */}
      {isLightOn && (
        <div className="light-source absolute inset-0 bg-radial-gradient from-amber-400/20 to-transparent pointer-events-none z-5"></div>
      )}
    </section>
  );
};

export default Hero;
