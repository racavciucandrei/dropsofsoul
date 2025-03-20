
// Product data types
export interface ProductDetails {
  ingredients: string;
  size: string;
  usage: string;
  flavorProfile?: string;
}

export interface SignatureCocktail {
  name: string;
  description: string;
  ingredients: string[];
  garnish: string[];
  imagePath: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  slug: string;
  description: string;
  details: ProductDetails;
  signatureCocktails?: SignatureCocktail[];
  related: number[];
  rating: number;
  reviews: number;
}
