export type ProductCategory = 
  | 'All'
  | 'Audio'
  | 'Wearables'
  | 'Gaming'
  | 'Laptops'
  | 'Accessories'
  | 'Deals';

export interface ProductReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Audio' | 'Wearables' | 'Gaming' | 'Laptops' | 'Accessories';
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  isFlashDeal: boolean;
  dealDiscountPercent?: number;
  dealClaimedPercent?: number;
  specs: Record<string, string>;
  colors?: string[];
  description: string;
  badge?: string;
  fastDelivery: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}
