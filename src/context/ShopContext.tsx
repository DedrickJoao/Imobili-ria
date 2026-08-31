import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, ColorOption, FilterState, Order, AIStylistRecommendation } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'cart';
  product?: Product;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  activeProduct: Product | null;
  activeFilter: FilterState;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isWishlistOpen: boolean;
  isAIStylistOpen: boolean;
  aiContextProduct: Product | null;
  toasts: ToastMessage[];
  orders: Order[];
  appliedPromo: { code: string; discountRate: number; name: string } | null;
  
  // Actions
  setActiveProduct: (product: Product | null) => void;
  openProductDetail: (productId: string) => void;
  addToCart: (product: Product, color?: ColorOption, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsAIStylistOpen: (open: boolean, contextProduct?: Product | null) => void;
  setFilter: (updater: Partial<FilterState> | ((prev: FilterState) => FilterState)) => void;
  resetFilters: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  placeOrder: (orderData: Omit<Order, 'orderId' | 'date' | 'status'>) => Order;
  addToast: (message: string, type?: 'success' | 'info' | 'cart', product?: Product) => void;
  removeToast: (id: string) => void;
  
  // Calculations
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
}

const initialFilterState: FilterState = {
  category: 'all',
  room: 'all',
  priceRange: [0, 4500],
  materials: [],
  colors: [],
  searchQuery: '',
  sortBy: 'featured',
  inStockOnly: false,
  viewMode: 'grid',
  gridColumns: 3,
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Cart state persisted locally
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterState>(initialFilterState);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [aiContextProduct, setAiContextProduct] = useState<Product | null>(null);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountRate: number; name: string } | null>(null);

  // Toast queue
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('Could not save recent views:', e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders:', e);
    }
  }, [orders]);

  const addToast = (message: string, type: 'success' | 'info' | 'cart' = 'success', product?: Product) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-3), { id, message, type, product }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openProductDetail = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setActiveProduct(found);
      // Track in recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(id => id !== productId);
        return [productId, ...filtered].slice(0, 8);
      });
    }
  };

  const addToCart = (product: Product, color?: ColorOption, quantity = 1) => {
    const chosenColor = color || product.colors[0];
    const itemKey = `${product.id}-${chosenColor.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          selectedColor: chosenColor,
          quantity,
          unitPrice: product.price,
        },
      ];
    });

    addToast(`Added ${quantity} × ${product.name} (${chosenColor.name}) to your cart`, 'cart', product);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      if (exists) {
        addToast(`Removed ${product?.name || 'item'} from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast(`Saved ${product?.name || 'item'} to your wishlist`, 'success', product);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const setFilter = (updater: Partial<FilterState> | ((prev: FilterState) => FilterState)) => {
    if (typeof updater === 'function') {
      setActiveFilter(updater);
    } else {
      setActiveFilter(prev => ({ ...prev, ...updater }));
    }
  };

  const resetFilters = () => {
    setActiveFilter(initialFilterState);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', discountRate: 0.10, name: 'Welcome 10% Off' });
      addToast('Promo code WELCOME10 applied (10% discount)', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'ATELIER15') {
      setAppliedPromo({ code: 'ATELIER15', discountRate: 0.15, name: 'Atelier Collector 15% Off' });
      addToast('Promo code ATELIER15 applied (15% discount)', 'success');
      return { success: true, message: '15% collector discount applied!' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountRate: 0, name: 'Complimentary White-Glove Shipping' });
      addToast('Promo code FREESHIP applied (Free delivery)', 'success');
      return { success: true, message: 'Free shipping unlocked!' };
    }
    return { success: false, message: 'Invalid promo code. Try WELCOME10, ATELIER15, or FREESHIP.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo code removed', 'info');
  };

  const handleOpenAIStylist = (open: boolean, contextProduct: Product | null = null) => {
    setIsAIStylistOpen(open);
    setAiContextProduct(contextProduct);
  };

  // Calculations
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const cartDiscount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round(cartSubtotal * appliedPromo.discountRate);
  }, [cartSubtotal, appliedPromo]);

  const cartShipping = useMemo(() => {
    if (cart.length === 0) return 0;
    if (appliedPromo?.code === 'FREESHIP' || cartSubtotal >= 1500) return 0;
    return 150; // standard flat rate for luxury furniture handling
  }, [cart.length, cartSubtotal, appliedPromo]);

  const cartTax = useMemo(() => {
    const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
    return Math.round(taxableAmount * 0.0825); // 8.25% average tax
  }, [cartSubtotal, cartDiscount]);

  const cartTotal = useMemo(
    () => Math.max(0, cartSubtotal - cartDiscount) + cartShipping + cartTax,
    [cartSubtotal, cartDiscount, cartShipping, cartTax]
  );

  const placeOrder = (orderData: Omit<Order, 'orderId' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      orderId: 'ATF-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'confirmed',
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedPromo(null);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        activeProduct,
        activeFilter,
        isCartOpen,
        isCheckoutOpen,
        isWishlistOpen,
        isAIStylistOpen,
        aiContextProduct,
        toasts,
        orders,
        appliedPromo,
        setActiveProduct,
        openProductDetail,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsWishlistOpen,
        setIsAIStylistOpen: handleOpenAIStylist,
        setFilter,
        resetFilters,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        addToast,
        removeToast,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
