import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOKS } from '../data/products';
import { Lookbook } from '../types';
import { Compass, Sparkles, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LookbookSection: React.FC = () => {
  const { openProductDetail, addToCart, products, setIsAIStylistOpen } = useShop();
  const [selectedLookbook, setSelectedLookbook] = useState<Lookbook>(LOOKBOOKS[0]);

  return (
    <section id="lookbooks-section" className="py-16 bg-[#F4EFEA] border-t border-b border-[#EAE2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C86D51]">
              <Compass className="w-4 h-4" />
              <span>Architectural Lookbooks</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#141413] mt-1">
              Shop Complete Room Aesthetics
            </h2>
          </div>

          {/* Lookbook Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {LOOKBOOKS.map(look => (
              <button
                key={look.id}
                id={`lookbook-tab-${look.id}`}
                onClick={() => setSelectedLookbook(look)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLookbook.id === look.id
                    ? 'bg-[#1E1E1E] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#5A524C] hover:bg-[#EAE2D8] hover:text-[#1E1E1E]'
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
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-[#EAE2D8] bg-[#EAE2D8]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

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
                          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5]/90 text-[#1E1E1E] backdrop-blur-md shadow-lg border border-white hover:scale-110 transition-transform"
                          aria-label={`View ${prod.name}`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51] animate-ping absolute" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51]" />
                        </button>

                        {/* Hover Quick Card popup */}
                        <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto bg-[#FFFFFF] rounded-xl p-2.5 shadow-xl border border-[#EAE2D8] w-48 z-30">
                          <div className="text-[10px] text-[#8C827A] uppercase font-semibold">
                            {prod.category}
                          </div>
                          <div className="text-xs font-bold text-[#1E1E1E] truncate">
                            {prod.name}
                          </div>
                          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#F4EFEA]">
                            <span className="text-xs font-bold text-[#C86D51]">
                              ${prod.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-semibold text-[#1E1E1E] underline">
                              View piece →
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Lookbook info badge bottom left */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between pointer-events-auto">
                    <div className="bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg max-w-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                        {selectedLookbook.aesthetic}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#1E1E1E]">
                        {selectedLookbook.title}
                      </h3>
                      <p className="text-xs text-[#5A524C] mt-0.5 line-clamp-2">
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
              <h3 className="font-serif text-base font-bold text-[#1E1E1E]">
                Featured in this Room ({selectedLookbook.featuredItems.length})
              </h3>
              <button
                id="lookbook-ask-ai-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="text-xs font-semibold text-[#C86D51] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customize Room</span>
              </button>
            </div>

            <div className="space-y-3">
              {selectedLookbook.featuredItems.map(item => {
                const prod = products.find(p => p.id === item.productId);
                if (!prod) return null;

                return (
                  <div
                    key={prod.id}
                    id={`lookbook-piece-${prod.id}`}
                    onClick={() => openProductDetail(prod.id)}
                    className="group p-3 rounded-2xl bg-[#FFFFFF] border border-[#EAE2D8] hover:border-[#D8CCC0] hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#F4EFEA] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs text-[#1E1E1E] group-hover:text-[#C86D51] transition-colors truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-[#8C827A] truncate">
                          {prod.materials[0]}
                        </p>
                        <span className="text-xs font-bold text-[#1E1E1E] mt-0.5 block">
                          ${prod.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`lookbook-add-${prod.id}`}
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(prod, prod.colors[0], 1);
                      }}
                      className="p-2.5 rounded-xl bg-[#F4EFEA] hover:bg-[#1E1E1E] hover:text-white text-[#1E1E1E] transition-colors shrink-0"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
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
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E1E1E] hover:bg-[#333330] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchase Entire Curated Room</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
