import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, GlassWater, PartyPopper, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 content-visibility hide-in-dark">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                  Our Story
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                Crafting Premium <br />Cocktail Ingredients
              </h1>
              
              <p className="text-lg text-muted-foreground">
                At Drops of Soul, we're dedicated to the art of flavor creation, producing exceptional bitters, cordials, and shrubs that transform ordinary drinks into extraordinary experiences.
              </p>
            </div>
            
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img 
                src="/assets/about-hero.jpg" 
                alt="Our workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Us Different
            </h2>
            <p className="text-muted-foreground">
              We believe in creating exceptional products through a combination of traditional methods, quality ingredients, and innovative techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We source the finest organic botanicals, fruits, and spices to create products of exceptional quality and flavor.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Artisanal Craftsmanship</h3>
              <p className="text-muted-foreground">
                Every batch is crafted by hand using traditional methods that have been refined over generations.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovative Flavors</h3>
              <p className="text-muted-foreground">
                We combine tradition with innovation to create unique flavor profiles that can't be found anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cocktail Catering Service */}
      <section className="py-20 bg-primary/5">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mobile Cocktail Catering
            </h2>
            <p className="text-muted-foreground">
              Elevate your events with our premium mobile cocktail catering service, bringing the craft cocktail experience directly to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Special Events</h3>
              <p className="text-muted-foreground">
                Perfect for weddings, birthdays, corporate events, and private parties with capacity for up to 100 guests.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <GlassWater className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Signature Cocktails</h3>
              <p className="text-muted-foreground">
                Customize your event with signature cocktails featuring our handcrafted bitters, cordials, and shrubs for a truly unique experience.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Service</h3>
              <p className="text-muted-foreground">
                Our experienced mixologists bring everything needed to create an exceptional cocktail experience at your location.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Our mobile bar service is launching soon. Contact us to learn more about availability for your upcoming events.
            </p>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full group"
            >
              <Link to="/contact">
                Inquire About Catering
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Our Story - Updated for a new company */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Beginning</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">The Inspiration</h3>
                    <p className="text-muted-foreground text-sm">
                      Drops of Soul began with a vision to create handcrafted cocktail ingredients that could transform everyday drinks into exceptional experiences.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">Our Workshop</h3>
                    <p className="text-muted-foreground text-sm">
                      We've established our first artisanal workshop where we handcraft our products with care and precision, using only the finest ingredients.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">Our Launch</h3>
                    <p className="text-muted-foreground text-sm">
                      We're excited to introduce our collection to cocktail enthusiasts and home bartenders who appreciate quality ingredients and unique flavors.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">Looking Forward</h3>
                    <p className="text-muted-foreground text-sm">
                      Though we're just beginning, our commitment to quality and craftsmanship guides everything we do. We look forward to growing alongside our community of flavor enthusiasts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img 
                  src="/assets/story-1.jpg" 
                  alt="Our beginnings" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="aspect-[3/4] overflow-hidden rounded-lg mt-8">
                <img 
                  src="/assets/story-2.jpg" 
                  alt="Our workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Founders
            </h2>
            <p className="text-muted-foreground">
              Our small but passionate team brings together expertise in herbalism, mixology, and culinary arts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4 max-w-[250px] mx-auto">
                <img 
                  src="/assets/team-1.jpg" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-primary font-medium mb-2">Founder & Flavor Artist</p>
              <p className="text-muted-foreground text-sm">
                With a background in herbalism and mixology, Sarah brings a unique perspective to crafting complex and balanced flavors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4 max-w-[250px] mx-auto">
                <img 
                  src="/assets/team-2.jpg" 
                  alt="Marcus Lee" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Marcus Lee</h3>
              <p className="text-primary font-medium mb-2">Co-Founder & Production Lead</p>
              <p className="text-muted-foreground text-sm">
                Marcus oversees our workshop operations, ensuring that every batch meets our exacting standards of quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-4 max-w-[250px] mx-auto">
                <img 
                  src="/assets/team-3.jpg" 
                  alt="Elena Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Elena Rodriguez</h3>
              <p className="text-primary font-medium mb-2">Co-Founder & Creative Director</p>
              <p className="text-muted-foreground text-sm">
                Elena brings her expertise in flavor development and botanical sourcing to create our unique product lineup.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Cocktails?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our collection of handcrafted bitters, cordials, and shrubs, and transform your home bar experience.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="rounded-full group"
            >
              <Link to="/products">
                Shop Our Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

