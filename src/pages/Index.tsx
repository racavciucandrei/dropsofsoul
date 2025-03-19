
import React from 'react';
import Hero from '@/components/Hero';
import ProductCategory from '@/components/ProductCategory';
import FeaturedProducts from '@/components/FeaturedProducts';
import About from '@/components/About';

const categoryData = [
  {
    title: 'Bitters',
    description: 'Our artisanal bitters are crafted using traditional methods and carefully selected botanicals. Each drop adds depth, complexity, and a touch of magic to your cocktails.',
    imageSrc: '/assets/category-bitters.jpg',
    link: '/products/bitters',
  },
  {
    title: 'Cordials',
    description: 'Discover our collection of handcrafted cordials, made with fresh fruits, flowers, and spices. Perfect for creating sophisticated cocktails or simply mixing with sparkling water.',
    imageSrc: '/assets/category-cordials.jpg',
    link: '/products/cordials',
  },
  {
    title: 'Shrubs',
    description: 'Our tangy and refreshing shrubs combine fruit, sugar, and vinegar to create complex flavor profiles that can elevate any drink. A versatile ingredient for both alcoholic and non-alcoholic beverages.',
    imageSrc: '/assets/category-shrubs.jpg',
    link: '/products/shrubs',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full mb-4">
              Our Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Product Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From aromatic bitters to fruity shrubs, we offer a wide range of handcrafted ingredients to elevate your cocktail experience.
            </p>
          </div>
          
          <div className="space-y-12">
            {categoryData.map((category, index) => (
              <ProductCategory
                key={category.title}
                title={category.title}
                description={category.description}
                imageSrc={category.imageSrc}
                link={category.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      <About />
    </div>
  );
};

export default Index;
