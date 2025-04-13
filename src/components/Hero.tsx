
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLight } from '@/context/LightProvider';

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
    <section 
      className="relative min-h-screen w-full flex items-center"
      style={{ 
        backgroundColor: '#222',
        backgroundImage: 'url("/lovable-uploads/eff100d0-154a-4af2-a101-8e16e1a2d684.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 0,
        border: 'none',
        boxShadow: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }}></div>
      
      {/* Content */}
      <div 
        className="container relative z-10 pt-28 pb-16 text-center"
        style={{ zIndex: 10, maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-amber-700/80 backdrop-blur-sm text-white rounded-full">
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
                className="text-base rounded-full transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg group bg-amber-700 hover:bg-amber-600"
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
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            zIndex: 5,
            background: "radial-gradient(circle at center, rgba(255, 191, 36, 0.2), transparent 70%)"
          }}
        ></div>
      )}
    </section>
  );
};

export default Hero;
