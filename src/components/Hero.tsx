import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, Shield, Award, Truck, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onShopClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const { openProductDetail, addToCart, setIsAIStylistOpen, products } = useShop();
  const { t, language } = useLanguage();

  const heroItems = [
    {
      productId: 'sofa-ivory-zebra-lounge',
      tag: language === 'pt' ? 'Edição 2026 · Modelo 2A33-Z#' : '2026 Edition · Model 2A33-Z#',
      title: language === 'pt' ? 'Sofá Seccional Ivory Pearl em L' : 'Ivory Pearl L-Sectional',
      tagline: language === 'pt' ? '4 lugares com chaise profunda de 175cm e almofadas lombares exclusivas zebra' : '4-seater 175cm deep chaise sectional featuring bespoke zebra-pattern lumbar cushions',
      priceRaw: 2450,
      image: '/assets/aistudio/image_8d255d1a.png',
      hotspots: [
        { label: language === 'pt' ? 'Couro Nappa Marfim Perolado' : 'Pearl Ivory Nappa Leather', x: '42%', y: '50%' },
        { label: language === 'pt' ? 'Almofadas Lombares Zebra' : 'Zebra Lumbar Pillows', x: '58%', y: '45%' },
        { label: language === 'pt' ? 'Chaise Longue 175cm' : '175cm Chaise Lounge', x: '75%', y: '65%' },
      ],
    },
    {
      productId: 'sofa-champagne-2927-2-bar',
      tag: language === 'pt' ? 'Coleção Lounge · Modelo 2927-2#' : 'Lounge Suite · Model 2927-2#',
      title: language === 'pt' ? 'Sofá Modular Champagne Gold com Bar' : 'Champagne Gold Modular Sofa with Bar',
      tagline: language === 'pt' ? 'Envergadura monumental de 420cm com módulo console bar integrado e pufe móvel' : 'Grand 420cm sectional with built-in beverage console bar, adjustable headrests & ottoman',
      priceRaw: 3200,
      image: '/assets/aistudio/image_d13e3a9d.png',
      hotspots: [
        { label: language === 'pt' ? 'Console Bar Integrado 40cm' : '40cm Integrated Beverage Bar', x: '52%', y: '42%' },
        { label: language === 'pt' ? 'Pufe Coordenado 80×70cm' : '80×70cm Matching Ottoman', x: '22%', y: '68%' },
        { label: language === 'pt' ? 'Apoios de Cabeça Articulados' : 'Adjustable Headrests', x: '68%', y: '35%' },
      ],
    },
    {
      productId: 'sofa-terracota-9028-amber',
      tag: language === 'pt' ? 'Alta Marcenaria · Modelo 9028#' : 'Artisan Hardwood · Model 9028#',
      title: language === 'pt' ? 'Sofá Seccional Terracota Âmbar' : 'Amber Terracotta Sectional',
      tagline: language === 'pt' ? 'Envergadura de 360cm em couro nobre com braço esculpido em madeira maciça de lei' : '360cm top-grain leather sectional with hand-carved wood armrest & cylindrical lumbar rolls',
      priceRaw: 2890,
      image: '/assets/aistudio/image_64bb778c.png',
      hotspots: [
        { label: language === 'pt' ? 'Braço Curvo em Madeira Maciça' : 'Hand-Carved Hardwood Arm', x: '20%', y: '58%' },
        { label: language === 'pt' ? 'Suporte Lombar Cilíndrico' : 'Cylindrical Lumbar Rolls', x: '52%', y: '48%' },
        { label: language === 'pt' ? 'Chaise Profunda 180cm' : '180cm Lounge Chaise', x: '78%', y: '62%' },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentHero = heroItems[activeIndex];
  const activeProduct = products.find(p => p.id === currentHero.productId);

  return (
    <section className="relative overflow-hidden bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[10px] uppercase tracking-[0.2em] font-bold text-[#0284C7] w-fit shadow-xs">
              <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
              <span>{currentHero.tag}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0C4A6E] leading-[1.12]">
                {t.heroHeadline}
              </h1>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-md font-light">
                {t.heroSubhead}
              </p>
            </div>

            {/* Quick Hero Featured Card preview */}
            <div className="p-4 rounded-sm bg-[#F0F9FF] border border-[#BAE6FD] shadow-xs flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                  {t.heroSpotlight}
                </div>
                <div className="text-sm sm:text-base font-serif italic font-bold text-[#0C4A6E] truncate">
                  {currentHero.title}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5 uppercase tracking-wider font-bold">
                  {t.heroInStock} · {activeProduct?.designer || 'Studio Varde'}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id={`hero-quickview-${currentHero.productId}`}
                  onClick={() => openProductDetail(currentHero.productId)}
                  className="px-3 py-2 rounded-sm border border-[#BAE6FD] bg-white hover:bg-[#F0F9FF] text-[#0C4A6E] transition-colors text-[10px] uppercase font-bold tracking-tight flex items-center gap-1.5"
                  title={t.heroDetails}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.heroDetails}</span>
                </button>

                {activeProduct && (
                  <button
                    id={`hero-quickadd-${currentHero.productId}`}
                    onClick={() => addToCart(activeProduct)}
                    className="px-4 py-2 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white transition-all text-[10px] uppercase tracking-wider font-bold shadow-xs"
                  >
                    {t.heroAddToBag}
                  </button>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#0284C7] text-white text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-[#0369A1] transition-all shadow-sm"
              >
                <span>{t.heroExploreGallery}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-ai-stylist-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm border border-[#0284C7] bg-[#F0F9FF] text-[#0284C7] text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-[#E0F2FE] hover:border-[#0369A1] hover:text-[#0369A1] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>{t.heroAiAdvisor}</span>
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
                    activeIndex === idx ? 'w-8 bg-[#0284C7]' : 'w-2 bg-[#BAE6FD] hover:bg-[#0EA5E9]'
                  }`}
                  aria-label={`View hero slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Large Dynamic Visual Stage with interactive hotspots */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] rounded-sm overflow-hidden shadow-xl border border-[#CBD5E1] bg-[#0B192C] group">
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
                        className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/95 text-[#0B192C] backdrop-blur-md shadow-lg border border-white hover:scale-110 transition-transform"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping absolute" />
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      </button>

                      {/* Hotspot tooltip */}
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-[#0B192C] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                        {spot.label}
                      </div>
                    </div>
                  ))}

                  {/* Overlay badge info */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-auto">
                    <div className="text-white">
                      <span className="text-[10px] uppercase tracking-widest text-slate-200 mb-1 block">
                        {t.heroFeaturedSeries}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif italic mb-3">
                        {currentHero.title}
                      </h2>
                      <button
                        onClick={() => openProductDetail(currentHero.productId)}
                        className="px-5 py-2 bg-white text-[#0B192C] hover:text-[#2563EB] text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#F8FAFC] transition-colors"
                      >
                        {t.heroExplorePiece}
                      </button>
                    </div>

                    <div className="bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                      <span className="text-white text-[10px] uppercase tracking-wider font-bold">
                        {t.heroNewArrival}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Value props bar */}
        <div className="mt-10 pt-8 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">{t.vpCraftTitle}</div>
              <div className="text-[11px] text-[#64748B]">{t.vpCraftDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">{t.vpDeliveryTitle}</div>
              <div className="text-[11px] text-[#64748B]">{t.vpDeliveryDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">{t.vpWarrantyTitle}</div>
              <div className="text-[11px] text-[#64748B]">{t.vpWarrantyDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C]">{t.vpStylistTitle}</div>
              <div className="text-[11px] text-[#64748B]">{t.vpStylistDesc}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Hero;
