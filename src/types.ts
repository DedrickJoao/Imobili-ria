export type FurnitureCategory = 'all' | 'sofas' | 'tables' | 'chairs' | 'beds' | 'storage' | 'lighting';

export type RoomCategory = 'all' | 'living' | 'dining' | 'bedroom' | 'workspace';

export interface ColorOption {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface Dimensions {
  width: number;
  depth: number;
  height: number;
  unit: 'in' | 'cm';
  weightLbs?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: FurnitureCategory;
  room: RoomCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discountPercentage?: number;
  materials: string[];
  colors: ColorOption[];
  images: string[];
  dimensions: Dimensions;
  description: string;
  features: string[];
  careInstructions: string;
  designer: string;
  leadTimeWeeks: string;
  relatedIds: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor: ColorOption;
  quantity: number;
  unitPrice: number;
}

export interface FilterState {
  category: FurnitureCategory;
  room: RoomCategory;
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
  viewMode: 'grid' | 'carousel';
  gridColumns: 2 | 3 | 4;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type DeliveryMethod = 'standard' | 'white-glove' | 'express';

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  deliveryMethod: DeliveryMethod;
  deliveryCost: number;
  subtotal: number;
  discount: number;
  promoCode?: string;
  tax: number;
  total: number;
  estimatedDeliveryDate: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface AIStylistRecommendation {
  summary: string;
  styleProfile: string;
  recommendedProductIds: string[];
  decorAdvice: string[];
  colorPalette: { name: string; hex: string }[];
}

export interface LookbookItemPin {
  productId: string;
  x: string;
  y: string;
}

export interface Lookbook {
  id: string;
  title: string;
  aesthetic: string;
  tagline: string;
  image: string;
  description: string;
  featuredItems: LookbookItemPin[];
}

export interface RoomLookbookItem {
  id: string;
  title: string;
  styleName: string;
  image: string;
  description: string;
  productIds: string[];
  tagline: string;
}
