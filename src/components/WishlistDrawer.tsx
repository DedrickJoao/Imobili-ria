import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    openProductDetail,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            id="wishlist-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between border-l border-[#E5E4E2]"
          >
            {/* Top Bar */}
            <div className="p-4 sm:p-6 border-b border-[#E5E4E2] bg-[#FAF9F6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A08C75] fill-current" />
                <h2 className="font-serif italic text-base sm:text-lg font-bold text-[#1A1A1A]">
                  Saved Wishlist ({wishlistProducts.length})
                </h2>
              </div>
              <button
                id="wishlist-drawer-close-btn"
                onClick={() => setIsWishlistOpen(false)}
                className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {wishlistProducts.length > 0 ? (
                wishlistProducts.map(prod => (
                  <div
                    key={prod.id}
                    id={`wishlist-item-${prod.id}`}
                    className="p-3.5 rounded-sm bg-white border border-[#E5E4E2] flex gap-3.5 shadow-xs"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(prod.id);
                      }}
                      className="w-20 h-20 rounded-xs object-cover bg-[#F5F5F5] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openProductDetail(prod.id);
                            }}
                            className="font-serif italic text-xs sm:text-sm font-bold text-[#1A1A1A] hover:text-[#A08C75] transition-colors truncate cursor-pointer"
                          >
                            {prod.name}
                          </h4>
                          <button
                            id={`wishlist-remove-${prod.id}`}
                            onClick={() => toggleWishlist(prod.id)}
                            className="text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors p-1"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#7A7A7A] truncate mt-0.5 font-light">
                          {prod.materials.join(' · ')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5E4E2]">
                        <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                          ${prod.price.toLocaleString()}
                        </span>

                        <button
                          id={`wishlist-move-to-cart-${prod.id}`}
                          onClick={() => {
                            addToCart(prod, prod.colors[0], 1);
                          }}
                          className="px-3 py-1.5 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#F5F2ED] border border-[#E5E4E2] flex items-center justify-center mx-auto text-[#7A7A7A]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif italic text-base font-bold text-[#1A1A1A]">No saved pieces yet</h3>
                    <p className="text-xs text-[#7A7A7A] max-w-xs mx-auto font-light">
                      Click the heart on any furniture piece to save it to your personal curation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom button */}
            {wishlistProducts.length > 0 && (
              <div className="p-4 sm:p-6 bg-white border-t border-[#E5E4E2]">
                <button
                  id="wishlist-add-all-btn"
                  onClick={() => {
                    wishlistProducts.forEach(p => addToCart(p, p.colors[0], 1));
                    setIsWishlistOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add All Saved Pieces to Bag</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
