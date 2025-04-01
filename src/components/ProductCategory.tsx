
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCategoryProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  index: number;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  title,
  description,
  imageSrc,
  link,
  index,
}) => {
  // Alternate layout based on index
  const isEven = index % 2 === 0;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fallback image if the original doesn't load
  const fallbackImage = '/placeholder.svg';
  
  // Handle image preloading
  React.useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.error(`Failed to load category image: ${imageSrc}`);
      setImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc]);
  
  // Image source to display (original or fallback)
  const displayImage = imageError ? fallbackImage : imageSrc;
  
  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16",
        isEven ? "md:grid-flow-col" : "md:grid-flow-col-dense"
      )}
    >
      {/* Image */}
      <div 
        className={cn(
          "overflow-hidden rounded-2xl h-[400px]",
          isEven ? "md:order-1" : "md:order-2"
        )}
      >
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${displayImage})` }}
        />
      </div>
      
      {/* Content */}
      <div 
        className={cn(
          "space-y-6",
          isEven ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        
        <Button 
          asChild 
          variant="outline" 
          className="group"
        >
          <Link to={link}>
            Explore {title}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCategory;
