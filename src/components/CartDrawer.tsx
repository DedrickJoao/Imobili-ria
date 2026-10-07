import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CartDrawerContent: React.FC = () => {
  const {
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

  const { t, formatCurrency, language } = useLanguage();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

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
                  {t.cartTitle} ({cart.reduce((a, b) => a + b.quantity, 0)})
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

            {/* White Glove Service Indicator */}
            <div className="bg-[#F5F2ED] px-4 sm:px-6 py-3 border-b border-[#E5E4E2]">
              <div className="flex items-center justify-between text-[11px] font-medium text-[#5A5A5A]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A08C75]" />
                  <span className="text-[#1A1A1A] font-bold">
                    {language === 'pt' ? 'Entrega White-Glove & Montagem Inclusa em Moçambique' : 'Complimentary White-Glove Delivery & Assembly in Mozambique'}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A08C75] bg-white px-2 py-0.5 rounded-xs border border-[#E5E4E2]">
                  {t.checkoutRecommended}
                </span>
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

                      {/* Quantity & Item status */}
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

                        <span className="text-[10px] uppercase font-bold text-[#A08C75] tracking-wider">
                          {t.checkoutQty}: {item.quantity}
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
                    <h3 className="font-serif italic text-base font-bold text-[#1A1A1A]">{t.cartEmptyTitle}</h3>
                    <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto font-light">
                      {t.cartEmptyDesc}
                    </p>
                  </div>
                  <button
                    id="cart-empty-explore-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                  >
                    {t.cartStartBrowsing}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Checkout & Summary Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 bg-white border-t border-[#E5E4E2] space-y-4">
                {/* Order specs summary */}
                <div className="space-y-2 p-3.5 rounded-sm bg-[#FAF9F6] border border-[#E5E4E2] text-xs text-[#5A5A5A]">
                  <div className="flex items-center justify-between text-[#1A1A1A] font-bold">
                    <span>{t.checkoutSummaryPieces}</span>
                    <span>{cart.reduce((a, b) => a + b.quantity, 0)} {language === 'pt' ? 'peças' : 'items'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#7A7A7A]">
                    <span>{t.cartShipping}</span>
                    <span className="text-[#A08C75] uppercase font-bold text-[10px]">{t.cartFree}</span>
                  </div>
                </div>

                {/* Primary Checkout CTA */}
                <button
                  id="cart-checkout-cta-btn"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-6 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <span>{t.cartProceedCheckout}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A08C75]" />
                  <span>{t.cartEncrypted}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
  );
};

export const CartDrawer: React.FC = () => {
  const { isCartOpen } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && <CartDrawerContent />}
    </AnimatePresence>
  );
};
