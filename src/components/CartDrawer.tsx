import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Sparkles,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    openProductDetail,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E5E4E2]"
          >
            {/* Top Bar */}
            <div className="p-4 sm:p-6 border-b border-[#E5E4E2] bg-[#FAF9F6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="font-serif italic text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>
              </div>
              <button
                id="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors"
                aria-label="Close shopping bag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F5F2ED] px-4 sm:px-6 py-3 border-b border-[#E5E4E2]">
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-[#5A5A5A]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A08C75]" />
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="font-mono text-[#1A1A1A]">${remainingForFreeShipping.toLocaleString()}</strong> for Free White-Glove Delivery
                    </span>
                  ) : (
                    <span className="text-[#1A1A1A] font-bold">
                      Complimentary White-Glove Delivery Unlocked
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-[#A08C75] text-[10px]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E5E4E2] h-1 rounded-none overflow-hidden">
                <div
                  className="bg-[#A08C75] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="p-3 rounded-sm bg-white border border-[#E5E4E2] flex gap-3.5 shadow-xs"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={
                        item.product.images[item.selectedColor.imageIndex] ||
                        item.product.images[0]
                      }
                      alt={item.product.name}
                      onClick={() => {
                        setIsCartOpen(false);
                        openProductDetail(item.productId);
                      }}
                      className="w-20 h-20 rounded-xs object-cover bg-[#F5F5F5] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                      referrerPolicy="no-referrer"
                    />

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsCartOpen(false);
                              openProductDetail(item.productId);
                            }}
                            className="font-serif italic text-xs sm:text-sm font-bold text-[#1A1A1A] hover:text-[#A08C75] transition-colors truncate cursor-pointer"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            id={`cart-remove-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Color */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] truncate">
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5E4E2]">
                        <div className="flex items-center border border-[#E5E4E2] rounded-xs bg-[#FAF9F6] overflow-hidden">
                          <button
                            id={`cart-qty-dec-${item.id}`}
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors text-xs"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1A1A1A] font-mono">
                            {item.quantity}
                          </span>
                          <button
                            id={`cart-qty-inc-${item.id}`}
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors text-xs"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                          ${(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F5F2ED] border border-[#E5E4E2] flex items-center justify-center mx-auto text-[#7A7A7A]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif italic text-base font-bold text-[#1A1A1A]">Your bag is empty</h3>
                    <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto font-light">
                      Explore our handcrafted sofas, travertine tables, and sculptural lighting.
                    </p>
                  </div>
                  <button
                    id="cart-empty-explore-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                  >
                    Start Browsing
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Checkout & Summary Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 bg-white border-t border-[#E5E4E2] space-y-4">
                {/* Promo Code input */}
                <div className="space-y-1.5">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xs bg-[#F5F2ED] border border-[#E5E4E2] text-xs text-[#1A1A1A]">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#A08C75]" />
                        <span>
                          <strong className="font-mono">{appliedPromo.code}</strong> applied ({appliedPromo.name})
                        </span>
                      </div>
                      <button
                        id="remove-promo-btn"
                        onClick={removePromoCode}
                        className="text-[10px] uppercase tracking-wider font-bold text-[#A08C75] hover:text-[#1A1A1A]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        id="cart-promo-input"
                        type="text"
                        value={promoInput}
                        onChange={e => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. WELCOME10)"
                        className="flex-1 bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3 py-2 text-xs uppercase text-[#1A1A1A] placeholder:text-[#7A7A7A] placeholder:normal-case focus:outline-none focus:border-[#A08C75]"
                      />
                      <button
                        id="apply-promo-btn"
                        type="submit"
                        className="px-3 py-2 rounded-sm bg-[#1A1A1A] hover:bg-black text-[10px] uppercase tracking-wider font-bold text-white transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoMessage && (
                    <p className={`text-[10px] uppercase tracking-wider font-bold ${promoMessage.success ? 'text-emerald-700' : 'text-red-600'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs text-[#5A5A5A] pt-2 border-t border-[#E5E4E2]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1A1A1A] font-mono">${cartSubtotal.toLocaleString()}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex items-center justify-between text-[#A08C75]">
                      <span>Discount ({appliedPromo?.code})</span>
                      <span className="font-mono">-${cartDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>White-Glove Delivery</span>
                    <span>
                      {cartShipping === 0 ? (
                        <strong className="text-[#A08C75] text-[10px] uppercase font-bold tracking-wider">FREE</strong>
                      ) : (
                        <span className="font-mono font-bold text-[#1A1A1A]">${cartShipping.toLocaleString()}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-mono font-bold text-[#1A1A1A]">${cartTax.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E5E4E2]">
                    <span>Total Amount</span>
                    <span className="text-base font-mono">${cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Primary Checkout CTA */}
                <button
                  id="cart-checkout-cta-btn"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-6 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A08C75]" />
                  <span>256-Bit SSL Encrypted & Guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
