import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductCategory, CartItem, DeliveryAddress } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

interface StoreState {
  // Catalog & Filter state
  products: Product[];
  searchQuery: string;
  selectedCategory: ProductCategory;
  selectedBrand: string;
  priceRange: [number, number];
  minRating: number;
  onlyDeals: boolean;
  onlyInStock: boolean;
  onlyFastDelivery: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';

  // Cart state
  cart: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  promoCode: string | null;
  promoDiscountPercent: number;

  // Wishlist state
  wishlist: string[];

  // Modal / Detail state
  activeProductModal: Product | null;
  deliveryAddress: DeliveryAddress;
  toastMessage: string | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory) => void;
  setSelectedBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number) => void;
  setOnlyDeals: (val: boolean) => void;
  setOnlyInStock: (val: boolean) => void;
  setOnlyFastDelivery: (val: boolean) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  resetFilters: () => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => boolean;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;

  // Modal actions
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  setDeliveryAddress: (address: DeliveryAddress) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: MOCK_PRODUCTS,
      searchQuery: '',
      selectedCategory: 'All',
      selectedBrand: 'All',
      priceRange: [0, 2500],
      minRating: 0,
      onlyDeals: false,
      onlyInStock: false,
      onlyFastDelivery: false,
      sortBy: 'featured',

      cart: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      promoCode: null,
      promoDiscountPercent: 0,

      wishlist: [],
      activeProductModal: null,

      deliveryAddress: {
        fullName: 'Alex Vance',
        street: '742 Cyber Plaza, Suite 404',
        city: 'Neo Tokyo',
        state: 'CA',
        zipCode: '94107',
        isDefault: true,
      },
      toastMessage: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedBrand: (brand) => set({ selectedBrand: brand }),
      setPriceRange: (range) => set({ priceRange: range }),
      setMinRating: (rating) => set({ minRating: rating }),
      setOnlyDeals: (val) => set({ onlyDeals: val }),
      setOnlyInStock: (val) => set({ onlyInStock: val }),
      setOnlyFastDelivery: (val) => set({ onlyFastDelivery: val }),
      setSortBy: (sort) => set({ sortBy: sort }),

      resetFilters: () => set({
        searchQuery: '',
        selectedCategory: 'All',
        selectedBrand: 'All',
        priceRange: [0, 2500],
        minRating: 0,
        onlyDeals: false,
        onlyInStock: false,
        onlyFastDelivery: false,
        sortBy: 'featured',
      }),

      addToCart: (product, quantity = 1, color) => {
        const cart = get().cart;
        const existingIndex = cart.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === color
        );

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = cart.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [
            ...cart,
            { product, quantity, selectedColor: color || product.colors?.[0] },
          ];
        }

        set({ cart: newCart });
        get().showToast(`Added ${product.name} to cart!`);
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [], promoCode: null, promoDiscountPercent: 0 }),
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open }),

      applyPromoCode: (code) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'CYBER20') {
          set({ promoCode: 'CYBER20', promoDiscountPercent: 20 });
          get().showToast('20% discount applied with code CYBER20!');
          return true;
        } else if (clean === 'FREESHIP') {
          set({ promoCode: 'FREESHIP', promoDiscountPercent: 5 });
          get().showToast('Promo FREESHIP applied!');
          return true;
        }
        get().showToast('Invalid promo code. Try CYBER20!');
        return false;
      },

      toggleWishlist: (productId) => {
        const wishlist = get().wishlist;
        const exists = wishlist.includes(productId);
        const newWishlist = exists
          ? wishlist.filter((id) => id !== productId)
          : [...wishlist, productId];
        set({ wishlist: newWishlist });
        get().showToast(
          exists ? 'Removed from saved items' : 'Saved to your wishlist!'
        );
      },

      openProductModal: (product) => set({ activeProductModal: product }),
      closeProductModal: () => set({ activeProductModal: null }),
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),

      showToast: (message) => {
        set({ toastMessage: message });
        setTimeout(() => {
          if (get().toastMessage === message) {
            set({ toastMessage: null });
          }
        }, 3000);
      },
      hideToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'cyber-mart-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        deliveryAddress: state.deliveryAddress,
      }),
    }
  )
);
