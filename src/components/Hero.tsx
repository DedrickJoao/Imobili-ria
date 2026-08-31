import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Shield, Award, Truck, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onShopClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const { openProductDetail, addToCart, setIsAIStylistOpen, products } = useShop();

  const heroItems = [
    {
      productId: 'sofa-solis-boucle',
      tag: 'Iconic Design 2026',
      title: 'The Solis Curved Bouclé Sofa',
      tagline: 'Organic architectural form meets Italian tactile bouclé weave',
      price: '$2,450',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
      hotspots: [
        { label: 'Tactile Bouclé Weave', x: '45%', y: '52%' },
        { label: 'Kiln-Dried Solid Oak Frame', x: '72%', y: '68%' },
      ],
    },
    {
      productId: 'table-travertine-arc',
      tag: 'Natural Stone Edition',
      title: 'Palazzo Roman Travertine Table',
      tagline: 'Monolithic sculptural pedestals cut from ancient Italian quarries',
      price: '$1,380',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=85',
      hotspots: [
        { label: 'Honed Matte Finish', x: '50%', y: '48%' },
        { label: 'Solid Cylindrical Pillars', x: '68%', y: '62%' },
      ],
    },
    {
      productId: 'chair-kanso-lounge',
      tag: 'Master Craftsmanship',
      title: 'Kanso Minimalist Lounge Chair',
      tagline: 'Smoked Japanese oak paired with vegetable-tanned saddle leather',
      price: '$890',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=85',
      hotspots: [
        { label: 'Full-Grain Saddle Leather', x: '42%', y: '40%' },
        { label: 'Mortise & Tenon Joinery', x: '60%', y: '70%' },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentHero = heroItems[activeIndex];
  const activeProduct = products.find(p => p.id === currentHero.productId);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E5E4E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E4E2] bg-white text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75] w-fit shadow-xs">
              <Sparkles className="w-3 h-3 text-[#A08C75]" />
              <span>{currentHero.tag}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                Refined Spaces, Crafted for Life.
              </h1>
              <p className="text-sm sm:text-base text-[#5A5A5A] leading-relaxed max-w-md">
                Timeless furniture blending Scandinavian organic warmth with Italian architectural minimalism.
              </p>
            </div>

            {/* Quick Hero Featured Card preview */}
            <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] shadow-xs flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75]">
                  Spotlight Piece
                </div>
                <div className="text-sm sm:text-base font-serif italic font-bold text-[#1A1A1A] truncate">
                  {currentHero.title}
                </div>
                <div className="text-xs text-[#7A7A7A] font-mono mt-0.5">
                  {currentHero.price} · In Stock
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id={`hero-quickview-${currentHero.productId}`}
                  onClick={() => openProductDetail(currentHero.productId)}
                  className="px-3 py-2 rounded-sm border border-[#E5E4E2] bg-[#F5F5F5] hover:bg-[#E5E4E2] text-[#1A1A1A] transition-colors text-[10px] uppercase font-bold tracking-tight flex items-center gap-1.5"
                  title="View full specs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Details</span>
                </button>

                {activeProduct && (
                  <button
                    id={`hero-quickadd-${currentHero.productId}`}
                    onClick={() => addToCart(activeProduct)}
                    className="px-4 py-2 rounded-sm bg-[#1A1A1A] hover:bg-black text-white transition-all text-[10px] uppercase tracking-wider font-bold"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#1A1A1A] text-white text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-black transition-all shadow-xs"
              >
                <span>Explore Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-ai-stylist-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm border border-[#1A1A1A] bg-transparent text-[#1A1A1A] text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-[#F5F2ED] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A08C75]" />
                <span>AI Room Advisor</span>
              </button>
            </div>

            {/* Slide switchers */}
            <div className="flex items-center gap-2 pt-2">
              {heroItems.map((item, idx) => (
                <button
                  key={item.productId}
                  id={`hero-slide-btn-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === idx ? 'w-8 bg-[#1A1A1A]' : 'w-2 bg-[#E5E4E2] hover:bg-[#A08C75]'
                  }`}
                  aria-label={`View hero slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Large Dynamic Visual Stage with interactive hotspots */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] rounded-sm overflow-hidden shadow-xl border border-[#E5E4E2] bg-[#E5E4E2] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.productId}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  <img
                    src={currentHero.image}
                    alt={currentHero.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Hotspots */}
                  {currentHero.hotspots.map((spot, sIdx) => (
                    <div
                      key={sIdx}
                      className="absolute group"
                      style={{ left: spot.x, top: spot.y }}
                    >
                      <button
                        id={`hero-hotspot-${sIdx}`}
                        onClick={() => openProductDetail(currentHero.productId)}
                        className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-[#1A1A1A] backdrop-blur-md shadow-lg border border-white hover:scale-110 transition-transform"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#A08C75] animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-[#A08C75]" />
                      </button>

                      {/* Hotspot tooltip */}
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                        {spot.label}
                      </div>
                    </div>
                  ))}

                  {/* Overlay badge info - Artistic Flair style */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-auto">
                    <div className="text-white">
                      <span className="text-[10px] uppercase tracking-widest text-[#DEDCD7] mb-1 block">
                        Featured Series
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif italic mb-3">
                        {currentHero.title}
                      </h2>
                      <button
                        onClick={() => openProductDetail(currentHero.productId)}
                        className="px-5 py-2 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#FAF9F6] transition-colors"
                      >
                        Explore Piece
                      </button>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                      <span className="text-white text-[10px] uppercase tracking-wider font-bold">
                        NEW ARRIVAL
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Value props bar */}
        <div className="mt-10 pt-8 border-t border-[#E5E4E2] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E4E2] flex items-center justify-center text-[#A08C75] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Architectural Craft</div>
              <div className="text-[11px] text-[#7A7A7A]">Solid hardwood & stone</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E4E2] flex items-center justify-center text-[#A08C75] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">White-Glove Delivery</div>
              <div className="text-[11px] text-[#7A7A7A]">Room placement & unboxing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E4E2] flex items-center justify-center text-[#A08C75] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">10-Year Warranty</div>
              <div className="text-[11px] text-[#7A7A7A]">Guaranteed structural integrity</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E4E2] flex items-center justify-center text-[#A08C75] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">AI Interior Stylist</div>
              <div className="text-[11px] text-[#7A7A7A]">Tailored room harmonies</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
