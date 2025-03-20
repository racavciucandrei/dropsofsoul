
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Comprehensive product data
const allProducts = [
  // Bitters (7 types)
  {
    id: 1,
    name: 'Tepache Bitters',
    category: 'bitters',
    price: 26.00, // Updated price to 26 euro
    images: ['/assets/product-1.jpg', '/assets/product-1-alt.jpg', '/assets/product-1-detail.jpg'],
    slug: 'tepache-bitters',
    description: 'Rooted in the rich traditions of Mexico, this bitters captures the soul of tepache, celebrating the fermented pineapple drink. The dried sweetness of pineapple peel blends harmoniously with earthy and spiced flavours, creating a vibrant, bold elixir. Handcrafted for adventurous bartenders, it brings a funky twist to cocktails, with the wild flavours of traditional Mexican fermentation in every drop.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), pineapple peel, selected spices, natural botanicals.',
      size: '150ml (5.1 fl oz)', // Updated size to 150ml
      usage: '2-3 dashes per cocktail',
      flavorProfile: 'A tangy, sweet, and spicy blend inspired by the vibrant, fermented essence of tepache. The focus is on pineapple peel, spices, and a touch of funk.'
    },
    signatureCocktail: {
      name: 'Tepache Dream',
      description: 'A vibrant and tropical cocktail that marries the deep smokiness of aged tequila and mezcal with the refreshing, tangy sweetness of pineapple and lime. Infused with Tepache Bitters, it carries a nuanced, savoury complexity that evokes the spirit of pineapple fermentation. The carbonized pineapple juice adds an effervescent touch, while the garnishes — a pineapple frond, dried lime wheel, and dried pineapple — create a stunning visual display. This drink is an immersive experience that balances boldness and refreshment, perfect for showcasing the unique character of Tepache Bitters.',
      ingredients: [
        '4cl Aged Tequila',
        '1cl Mezcal',
        '3cl Pineapple & Lime Cordial',
        '1cl Fresh lime juice',
        '3 dashes Tepache Bitters',
        'Pineapple Juice (cleared)'
      ],
      garnish: [
        'Pineapple Frond',
        'Dried Lime Wheel',
        'Half of a Dried Pineapple Wheel'
      ]
    },
    related: [2, 3, 4],
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Orange Bitters',
    category: 'bitters',
    price: 19.95,
    images: ['/assets/product-4.jpg', '/assets/product-4-alt.jpg', '/assets/product-4-detail.jpg'],
    slug: 'orange-bitters',
    description: 'Our Orange Bitters highlight the bright, zesty character of orange peel, complemented by a blend of spices. These bitters add a citrus lift to cocktails like the Martinez, Old Fashioned, or any drink that needs a touch of brightness.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), bitter orange peel, sweet orange essence, cardamom, coriander, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 6, 7],
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Cherry Bitters',
    category: 'bitters',
    price: 18.50,
    images: ['/assets/product-6.jpg', '/assets/product-6-alt.jpg', '/assets/product-6-detail.jpg'],
    slug: 'cherry-bitters',
    description: 'Our Cherry Bitters pair the rich, fruity notes of cherries with warm spices and a hint of almond. These bitters bring a subtle fruity complexity to Manhattans, Old Fashioneds, and other classic cocktails.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), dried cherries, bitter almond, cinnamon, vanilla, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 4, 7],
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 4,
    name: 'Chocolate Bitters',
    category: 'bitters',
    price: 20.95,
    images: ['/assets/product-9.jpg', '/assets/product-9-alt.jpg', '/assets/product-9-detail.jpg'],
    slug: 'chocolate-bitters',
    description: 'Our Chocolate Bitters combine rich cocoa with subtle spices and a hint of vanilla. These bitters add depth and complexity to cocktails, particularly those with aged spirits, coffee liqueurs, or cream components.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), cocoa nibs, vanilla bean, cinnamon, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [3, 7, 1],
    rating: 4.6,
    reviews: 15,
  },
  {
    id: 5,
    name: 'Lavender Bitters',
    category: 'bitters',
    price: 21.50,
    images: ['/assets/product-10.jpg', '/assets/product-10-alt.jpg', '/assets/product-10-detail.jpg'],
    slug: 'lavender-bitters',
    description: 'Our Lavender Bitters feature the delicate floral notes of lavender balanced with citrus and gentle spices. These bitters add a floral complexity to gin cocktails, champagne drinks, and modern mixology creations.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), lavender flowers, lemon peel, vanilla, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [10, 11, 6],
    rating: 4.7,
    reviews: 21,
  },
  {
    id: 6,
    name: 'Grapefruit Bitters',
    category: 'bitters',
    price: 19.95,
    images: ['/assets/product-11.jpg', '/assets/product-11-alt.jpg', '/assets/product-11-detail.jpg'],
    slug: 'grapefruit-bitters',
    description: 'Our Grapefruit Bitters capture the bright, tangy essence of grapefruit with subtle bitter undertones. These bitters add zesty complexity to Palomas, gin and tonics, and a wide range of citrus-forward cocktails.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), grapefruit peel, gentian root, coriander, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [2, 5, 14],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 7,
    name: 'Spiced Bitters',
    category: 'bitters',
    price: 22.95,
    images: ['/assets/product-12.jpg', '/assets/product-12-alt.jpg', '/assets/product-12-detail.jpg'],
    slug: 'spiced-bitters',
    description: 'Our Spiced Bitters blend warm spices like cinnamon, clove, and allspice with subtle citrus notes. These bitters add warmth and complexity to rum cocktails, whiskey drinks, and seasonal creations.',
    details: {
      ingredients: 'Water, alcohol (45% ABV), cinnamon, clove, allspice, orange peel, natural flavors.',
      size: '100ml (3.4 fl oz)',
      usage: '2-3 dashes per cocktail',
    },
    related: [1, 3, 4],
    rating: 4.9,
    reviews: 29,
  },
  
  // Cordials (5 types)
  {
    id: 8,
    name: 'Elderflower Cordial',
    category: 'cordials',
    price: 22.50,
    images: ['/assets/product-2.jpg', '/assets/product-2-alt.jpg', '/assets/product-2-detail.jpg'],
    slug: 'elderflower-cordial',
    description: 'Our Elderflower Cordial captures the delicate floral sweetness of elderflower blossoms. This versatile cordial can be mixed with sparkling water, added to cocktails, or used in desserts for a subtle floral complexity.',
    details: {
      ingredients: 'Water, cane sugar, elderflower extract, citric acid, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [10, 11, 12],
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 9,
    name: 'Ginger Cordial',
    category: 'cordials',
    price: 21.95,
    images: ['/assets/product-5.jpg', '/assets/product-5-alt.jpg', '/assets/product-5-detail.jpg'],
    slug: 'ginger-cordial',
    description: 'Our Ginger Cordial balances the warmth and spice of fresh ginger with subtle sweetness. This cordial adds a spicy kick to Moscow Mules, can be mixed with hot water for a warming drink, or adds complexity to many cocktails.',
    details: {
      ingredients: 'Water, cane sugar, fresh ginger extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [8, 11, 14],
    rating: 4.6,
    reviews: 28,
  },
  {
    id: 10,
    name: 'Lavender Cordial',
    category: 'cordials',
    price: 24.95,
    images: ['/assets/product-8.jpg', '/assets/product-8-alt.jpg', '/assets/product-8-detail.jpg'],
    slug: 'lavender-cordial',
    description: 'Our Lavender Cordial features the elegant floral notes of lavender balanced with a touch of citrus. This cordial pairs beautifully with gin, vodka, or simply mixed with sparkling water for a refreshing non-alcoholic drink.',
    details: {
      ingredients: 'Water, cane sugar, lavender extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [8, 5, 11],
    rating: 4.7,
    reviews: 36,
  },
  {
    id: 11,
    name: 'Rose Cordial',
    category: 'cordials',
    price: 23.95,
    images: ['/assets/product-13.jpg', '/assets/product-13-alt.jpg', '/assets/product-13-detail.jpg'],
    slug: 'rose-cordial',
    description: 'Our Rose Cordial captures the delicate essence of rose petals with subtle sweetness. This elegant cordial adds a floral dimension to cocktails, can be mixed with champagne, or diluted with water for a refreshing drink.',
    details: {
      ingredients: 'Water, cane sugar, rose extract, lemon, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [8, 10, 12],
    rating: 4.9,
    reviews: 33,
  },
  {
    id: 12,
    name: 'Hibiscus Cordial',
    category: 'cordials',
    price: 25.95,
    images: ['/assets/product-14.jpg', '/assets/product-14-alt.jpg', '/assets/product-14-detail.jpg'],
    slug: 'hibiscus-cordial',
    description: 'Our Hibiscus Cordial features the vibrant, tart flavor of hibiscus flowers with subtle sweetness. This bright red cordial adds striking color and flavor to cocktails, can be mixed with sparkling water, or used in desserts.',
    details: {
      ingredients: 'Water, cane sugar, hibiscus extract, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [11, 8, 15],
    rating: 4.8,
    reviews: 39,
  },
  
  // Shrubs (4 types)
  {
    id: 13,
    name: 'Blackberry Shrub',
    category: 'shrubs',
    price: 24.95,
    images: ['/assets/product-3.jpg', '/assets/product-3-alt.jpg', '/assets/product-3-detail.jpg'],
    slug: 'blackberry-shrub',
    description: 'Our Blackberry Shrub combines ripe blackberries with apple cider vinegar and sugar for a perfect balance of sweet, tart, and fruity. This shrub adds complexity to cocktails and makes a refreshing drink when mixed with soda water.',
    details: {
      ingredients: 'Blackberries, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [14, 15, 16],
    rating: 4.9,
    reviews: 48,
  },
  {
    id: 14,
    name: 'Raspberry Shrub',
    category: 'shrubs',
    price: 23.50,
    images: ['/assets/product-7.jpg', '/assets/product-7-alt.jpg', '/assets/product-7-detail.jpg'],
    slug: 'raspberry-shrub',
    description: 'Our Raspberry Shrub balances the bright fruitiness of raspberries with the tang of apple cider vinegar and sweetness of sugar. This versatile shrub adds depth to cocktails and makes a refreshing mixer with sparkling water.',
    details: {
      ingredients: 'Raspberries, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [13, 15, 9],
    rating: 4.7,
    reviews: 31,
  },
  {
    id: 15,
    name: 'Peach Shrub',
    category: 'shrubs',
    price: 22.95,
    images: ['/assets/product-15.jpg', '/assets/product-15-alt.jpg', '/assets/product-15-detail.jpg'],
    slug: 'peach-shrub',
    description: 'Our Peach Shrub captures the sweet, summery essence of ripe peaches balanced with tangy apple cider vinegar. This shrub adds fruity complexity to cocktails and makes a delightful non-alcoholic beverage when mixed with soda water.',
    details: {
      ingredients: 'Peaches, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [13, 14, 16],
    rating: 4.6,
    reviews: 26,
  },
  {
    id: 16,
    name: 'Strawberry Basil Shrub',
    category: 'shrubs',
    price: 25.50,
    images: ['/assets/product-16.jpg', '/assets/product-16-alt.jpg', '/assets/product-16-detail.jpg'],
    slug: 'strawberry-basil-shrub',
    description: 'Our Strawberry Basil Shrub combines sweet strawberries with aromatic basil and tangy apple cider vinegar. This complex shrub adds a unique flavor profile to cocktails and makes a sophisticated mixer for non-alcoholic beverages.',
    details: {
      ingredients: 'Strawberries, fresh basil, apple cider vinegar, cane sugar, natural flavors.',
      size: '250ml (8.4 fl oz)',
      usage: '15-30ml per drink',
    },
    related: [13, 14, 15],
    rating: 4.8,
    reviews: 37,
  },
];

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Find product by slug
  const product = allProducts.find(p => p.slug === slug) || allProducts[0]; // Fallback to first product if not found
  
  // Related products
  const relatedProducts = product.related.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom py-12">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link 
            to={`/products/${product.category}`} 
            className="hover:text-primary transition-colors"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {product.name}
          </span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-muted",
                isImageLoaded ? "" : "shimmer"
              )}
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsImageLoaded(false);
                    }}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200",
                      index === selectedImageIndex
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="inline-block mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4", 
                        i < Math.floor(product.rating) 
                          ? "fill-primary text-primary" 
                          : i < product.rating 
                            ? "fill-primary/50 text-primary" 
                            : "text-muted-foreground/30"
                      )} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {product.description}
            </p>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-full"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                
                <span className="w-10 text-center">{quantity}</span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-full"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="flex-1 rounded-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
            
            {/* Product Information Tabs */}
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="usage">How to Use</TabsTrigger>
                <TabsTrigger value="cocktail">Signature Cocktail</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Size</p>
                    <p className="text-muted-foreground">{product.details.size}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium">Category</p>
                    <p className="text-muted-foreground capitalize">{product.category}</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Description</p>
                  <p className="text-muted-foreground mt-1">{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-4">
                <div className="text-sm">
                  <p className="font-medium">Ingredients</p>
                  <p className="text-muted-foreground mt-1">{product.details.ingredients}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="mt-4">
                <div className="text-sm">
                  <p className="font-medium">Recommended Usage</p>
                  <p className="text-muted-foreground mt-1">{product.details.usage}</p>
                  <p className="mt-4 font-medium">Serving Suggestion</p>
                  <p className="text-muted-foreground mt-1">
                    Our {product.name} works wonderfully in classic cocktails. Try adding {product.details.usage} to an Old Fashioned or Manhattan for added complexity and depth.
                  </p>
                </div>
              </TabsContent>
              
              {/* New Signature Cocktail Tab */}
              {product.signatureCocktail && (
                <TabsContent value="cocktail" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">{product.signatureCocktail.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{product.signatureCocktail.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">Ingredients:</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm mt-1 space-y-1">
                        {product.signatureCocktail.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">Garnish:</h4>
                      <ul className="list-disc list-inside text-muted-foreground text-sm mt-1 space-y-1">
                        {product.signatureCocktail.garnish.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct?.id} className="overflow-hidden border-none shadow-sm">
                <Link 
                  to={`/product/${relatedProduct?.slug}`} 
                  className="block aspect-square relative overflow-hidden"
                >
                  <img
                    src={relatedProduct?.images[0]}
                    alt={relatedProduct?.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                
                <div className="p-4">
                  <Link 
                    to={`/product/${relatedProduct?.slug}`}
                    className="block font-medium hover:text-primary transition-colors"
                  >
                    {relatedProduct?.name}
                  </Link>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-semibold">
                      ${relatedProduct?.price.toFixed(2)}
                    </span>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
