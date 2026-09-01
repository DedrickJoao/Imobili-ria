import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { LOOKBOOKS } from '../data/products';
import { Lookbook } from '../types';
import { Compass, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LookbookSection: React.FC = () => {
  const { openProductDetail, addToCart, products, setIsAIStylistOpen } = useShop();
  const { t, formatCurrency, language } = useLanguage();
  const [selectedLookbook, setSelectedLookbook] = useState<Lookbook>(LOOKBOOKS[0]);

  return (
    <section id="lookbooks-section" className="py-16 bg-[#FAF9F6] border-t border-b border-[#E5E4E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A08C75]">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.lookbookTag}</span>
            </div>
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-1">
              {t.lookbookTitle}
            </h2>
          </div>

          {/* Lookbook Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {LOOKBOOKS.map(look => (
              <button
                key={look.id}
                id={`lookbook-tab-${look.id}`}
                onClick={() => setSelectedLookbook(look)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-all border ${
                  selectedLookbook.id === look.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                    : 'bg-white text-[#7A7A7A] border-[#E5E4E2] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Room Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual with interactive piece pins */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-xl border border-[#E5E4E2] bg-[#E5E4E2]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLookbook.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <img
                    src={selectedLookbook.image}
                    alt={selectedLookbook.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Hotspots */}
                  {selectedLookbook.featuredItems.map(item => {
                    const prod = products.find(p => p.id === item.productId);
                    if (!prod) return null;

                    return (
                      <div
                        key={item.productId}
                        className="absolute group"
                        style={{ left: item.x, top: item.y }}
                      >
                        <button
                          id={`hotspot-${item.productId}`}
                          onClick={() => openProductDetail(item.productId)}
                          className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-[#1A1A1A] backdrop-blur-md shadow-lg border border-white hover:scale-110 transition-transform"
                          aria-label={`View ${prod.name}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#A08C75] animate-ping absolute" />
                          <span className="w-2 h-2 rounded-full bg-[#A08C75]" />
                        </button>

                        {/* Hover Quick Card popup */}
                        <div className="absolute left-1/2 bottom-full mb-2.5 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto bg-white rounded-sm p-3 shadow-xl border border-[#E5E4E2] w-52 z-30">
                          <div className="text-[9px] text-[#A08C75] uppercase font-bold tracking-wider">
                            {prod.category}
                          </div>
                          <div className="text-xs font-serif italic font-bold text-[#1A1A1A] truncate">
                            {prod.name}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#E5E4E2]">
                            <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                              {formatCurrency(prod.price)}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A08C75] underline">
                              {t.lookbookViewPiece}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Lookbook info badge bottom left */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between pointer-events-auto">
                    <div className="bg-[#FAF9F6]/95 backdrop-blur-md p-4 sm:p-5 rounded-sm border border-white/60 shadow-lg max-w-sm">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A08C75] block mb-0.5">
                        {selectedLookbook.aesthetic}
                      </span>
                      <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#1A1A1A]">
                        {selectedLookbook.title}
                      </h3>
                      <p className="text-xs text-[#5A5A5A] mt-1 line-clamp-2 font-light">
                        {selectedLookbook.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Piece list breakdown in this room */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif italic text-base font-bold text-[#1A1A1A]">
                {t.lookbookFeaturedInRoom} ({selectedLookbook.featuredItems.length})
              </h3>
              <button
                id="lookbook-ask-ai-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="text-[10px] uppercase font-bold tracking-wider text-[#A08C75] hover:text-[#1A1A1A] flex items-center gap-1 border-b border-[#A08C75]"
              >
                <Sparkles className="w-3 h-3 text-[#A08C75]" />
                <span>{t.lookbookCustomizeRoom}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {selectedLookbook.featuredItems.map(item => {
                const prod = products.find(p => p.id === item.productId);
                if (!prod) return null;

                return (
                  <div
                    key={prod.id}
                    id={`lookbook-piece-${prod.id}`}
                    onClick={() => openProductDetail(prod.id)}
                    className="group p-3 rounded-sm bg-white border border-[#E5E4E2] hover:border-[#1A1A1A] hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xs object-cover bg-[#F5F5F5] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif italic font-bold text-xs text-[#1A1A1A] group-hover:text-[#A08C75] transition-colors truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[10px] text-[#7A7A7A] truncate font-light">
                          {prod.materials[0]}
                        </p>
                        <span className="text-xs font-bold text-[#1A1A1A] font-mono mt-0.5 block">
                          {formatCurrency(prod.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`lookbook-add-${prod.id}`}
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(prod, prod.colors[0], 1);
                      }}
                      className="p-2 rounded-sm bg-[#FAF9F6] border border-[#E5E4E2] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] transition-colors shrink-0"
                      title={t.cardQuickAdd}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add complete room set button */}
            <button
              id="lookbook-add-entire-room-btn"
              onClick={() => {
                selectedLookbook.featuredItems.forEach(item => {
                  const prod = products.find(p => p.id === item.productId);
                  if (prod) addToCart(prod, prod.colors[0], 1);
                });
              }}
              className="w-full py-3 px-4 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.lookbookPurchaseRoom}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
