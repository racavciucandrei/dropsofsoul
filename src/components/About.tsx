
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About = () => {
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
                Our Story
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Crafted with Passion, <br />Served with Pride
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Bitters & Bliss, we believe that exceptional cocktails begin with exceptional ingredients. Our journey started in a small workshop with a simple mission: to create artisanal bitters, cordials, and shrubs that would transform ordinary drinks into extraordinary experiences.
              </p>
              <p>
                Each of our products is handcrafted in small batches using traditional methods, organic botanicals, and the finest ingredients. We take pride in our meticulous attention to detail and our commitment to quality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">25+</span>
                <span className="text-sm text-muted-foreground">Unique Flavors</span>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">100%</span>
                <span className="text-sm text-muted-foreground">Organic Ingredients</span>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <span className="block text-3xl font-serif font-bold text-primary">5000+</span>
                <span className="text-sm text-muted-foreground">Happy Customers</span>
              </div>
            </div>
            
            <Button 
              asChild 
              className="mt-4 group"
            >
              <Link to="/about">
                Learn More About Us
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
