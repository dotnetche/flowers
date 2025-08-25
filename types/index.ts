export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: ProductCategory;
  colors: Color[];
  style: Style;
  purchasePrice: number;
  finalPrice: number;
  margin: number;
  inStock: boolean;
  featured: boolean;
  specifications: {
    roseCount: number;
    size: string;
    materials: string[];
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface Style {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface PricingRule {
  minPrice: number;
  maxPrice: number;
  suggestedFinalMin: number;
  suggestedFinalMax: number;
}

export interface FilterOptions {
  categories: string[];
  colors: string[];
  styles: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}