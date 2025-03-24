
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-primary opacity-50" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-primary opacity-50" />
            
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img 
                src="/assets/about.jpg" 
                alt="Our workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                Hand-Crafted Excellence
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              From Natural Ingredients, <br />To Your Glass
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Drops of Soul, I believe that the purest ingredients create the most soulful drinking experiences. My journey is just beginning, but my passion for crafting unique flavors is already transforming cocktails and beverages.
              </p>
              <p>
                Each product is handcrafted in small batches using carefully selected ingredients. Coming soon: mobile cocktail catering for weddings, corporate events, and private parties.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">30+</span>
                <span className="text-sm text-muted-foreground">Unique Flavors</span>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">100%</span>
                <span className="text-sm text-muted-foreground">Natural Ingredients</span>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">3</span>
                <span className="text-sm text-muted-foreground">Product Categories</span>
              </div>
            </div>
            
            <Button 
              asChild 
              className="mt-4 group"
            >
              <Link 
                to="/about"
                onClick={(e) => handleNavigation(e, '/about')}
              >
                Discover My Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
