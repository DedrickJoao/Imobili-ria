import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { ColorOption, Product } from '../types';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
  Ruler,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalContentProps {
  product: Product;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({ product }) => {
  const activeProduct = product;
  const {
    setActiveProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsAIStylistOpen,
    setIsCheckoutOpen,
    products,
  } = useShop();

  const { t, formatCurrency } = useLanguage();

  const inWishlist = isInWishlist(product.id);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { name: 'Default', hex: '#1A1A1A', imageIndex: 0 });
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'reviews' | 'care'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);

  // Sync image when color is changed
  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color);
    if (color.imageIndex < product.images.length) {
      setActiveImageIndex(color.imageIndex);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    setActiveProduct(null);
    setIsCheckoutOpen(true);
  };

  // Zoom mouse movement handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Related products
  const relatedProducts = products.filter(p => product.relatedIds?.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <motion.div
        id="product-detail-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-5xl bg-[#FAF9F6] rounded-sm shadow-2xl border border-[#E5E4E2] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Bar / Close */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E4E2]">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#7A7A7A]">
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-[#1A1A1A]">{product.name}</span>
          </div>

          <button
            id="close-product-modal-btn"
            onClick={() => setActiveProduct(null)}
            className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#E5E4E2] border border-transparent hover:border-[#E5E4E2] transition-colors"
            aria-label="Close product view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Interactive Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Large Image Stage with Zoom Magnifier */}
              <div
                id="product-main-image-stage"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#F5F5F5] border border-[#E5E4E2] cursor-crosshair shadow-xs select-none"
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : undefined
                  }
                  referrerPolicy="no-referrer"
                />

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      id="prev-image-btn"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] flex items-center justify-center backdrop-blur-md shadow-xs transition-all border border-[#E5E4E2]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      id="next-image-btn"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] flex items-center justify-center backdrop-blur-md shadow-xs transition-all border border-[#E5E4E2]"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Hover zoom hint badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-xs flex items-center gap-1 pointer-events-none">
                    <Maximize2 className="w-3 h-3" />
                    <span>{t.modalHoverZoom}</span>
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {activeProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      id={`thumb-image-${idx}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-sm overflow-hidden shrink-0 border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                          : 'border-[#E5E4E2] hover:border-[#1A1A1A] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${activeProduct.name} angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Details, Selection & Add To Cart */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Top rating & wishlist */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#A08C75]">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(activeProduct.rating)
                                ? 'fill-current'
                                : 'text-[#E5E4E2]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-[#1A1A1A]">{activeProduct.rating}</span>
                      <span className="text-[#7A7A7A]">({activeProduct.reviewCount} {t.modalReviewsCount})</span>
                    </div>

                    <button
                      id="modal-wishlist-toggle"
                      onClick={() => toggleWishlist(activeProduct.id)}
                      className={`p-2 rounded-full border transition-all ${
                        inWishlist
                          ? 'bg-[#A08C75] text-white border-[#A08C75]'
                          : 'bg-white text-[#1A1A1A] border-[#E5E4E2] hover:border-[#1A1A1A]'
                      }`}
                      title={inWishlist ? 'Saved in wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                      {activeProduct.name}
                    </h1>
                    <p className="text-xs text-[#7A7A7A] font-light">
                      {activeProduct.subtitle}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 pb-3 border-b border-[#E5E4E2]">
                    <span className="text-2xl font-bold text-[#1A1A1A] font-mono">
                      {formatCurrency(activeProduct.price)}
                    </span>
                    {activeProduct.originalPrice && (
                      <span className="text-sm text-[#7A7A7A] line-through font-mono">
                        {formatCurrency(activeProduct.originalPrice)}
                      </span>
                    )}
                    {activeProduct.discountPercentage && (
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-[#A08C75] text-white">
                        {t.cardSave} {activeProduct.discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Color Finish Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-bold">
                        {t.modalColorFinish}: <strong className="text-[#1A1A1A] font-bold">{selectedColor.name}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeProduct.colors.map(color => (
                        <button
                          key={color.name}
                          id={`modal-color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => handleColorChange(color)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                            selectedColor.name === color.name
                              ? 'ring-1 ring-[#1A1A1A] ring-offset-2 scale-110 border-transparent shadow-xs'
                              : 'border-[#E5E4E2] hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          {selectedColor.name === color.name && (
                            <Check className="w-3 h-3 text-[#1A1A1A]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      {/* Quantity input */}
                      <div className="flex items-center border border-[#E5E4E2] bg-white rounded-sm overflow-hidden">
                        <button
                          id="qty-decrease-btn"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="px-3 py-2 text-[#1A1A1A] hover:bg-[#FAF9F6] font-semibold text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1A1A1A] select-none min-w-[2rem] text-center font-mono">
                          {quantity}
                        </span>
                        <button
                          id="qty-increase-btn"
                          onClick={() => setQuantity(q => q + 1)}
                          className="px-3 py-2 text-[#1A1A1A] hover:bg-[#FAF9F6] font-semibold text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Bag button */}
                      <button
                        id="modal-add-to-cart-btn"
                        onClick={handleAddToCart}
                        className="flex-1 py-3 px-5 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isAdded ? t.modalAddedToBag : `${t.heroAddToBag} • ${formatCurrency(activeProduct.price * quantity)}`}</span>
                      </button>
                    </div>

                    {/* Instant Buy Now Button */}
                    <button
                      id="modal-buy-now-btn"
                      onClick={handleBuyNow}
                      className="w-full py-3 px-5 rounded-sm bg-[#A08C75] hover:bg-[#8e7a64] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{t.modalInstantCheckout}</span>
                    </button>
                  </div>

                  {/* AI Stylist Callout button */}
                  <div className="p-3.5 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#A08C75] shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold text-[#1A1A1A] block text-[11px]">{t.modalWonderingStyle}</span>
                        <span className="text-[#7A7A7A] text-[10px]">{t.modalAiRoomAdvice}</span>
                      </div>
                    </div>
                    <button
                      id="modal-open-ai-stylist"
                      onClick={() => setIsAIStylistOpen(true, activeProduct)}
                      className="px-3 py-1.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-bold hover:bg-black shrink-0 transition-colors"
                    >
                      {t.modalAskStylist}
                    </button>
                  </div>

                  {/* Delivery & Assurance badges */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider text-[#7A7A7A] pt-2 border-t border-[#E5E4E2]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#A08C75]" />
                      <span>{activeProduct.leadTimeWeeks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A08C75]" />
                      <span>{t.announcementWarranty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Tabs (Details, Dimensions, Reviews, Care) */}
            <div className="pt-6 border-t border-[#E5E4E2]">
              <div className="flex items-center gap-4 border-b border-[#E5E4E2] mb-4">
                {(['details', 'dimensions', 'reviews', 'care'] as const).map(tab => (
                  <button
                    key={tab}
                    id={`modal-tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[10px] uppercase font-bold tracking-widest transition-all relative ${
                      activeTab === tab
                        ? 'text-[#1A1A1A]'
                        : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {tab === 'details' && t.modalTabDetails}
                    {tab === 'dimensions' && t.modalTabDimensions}
                    {tab === 'reviews' && `${t.modalTabReviews} (${activeProduct.reviewCount})`}
                    {tab === 'care' && t.modalTabCare}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1A1A]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab 1: Details */}
              {activeTab === 'details' && (
                <div className="space-y-4 max-w-3xl text-xs text-[#5A5A5A]">
                  <p className="leading-relaxed font-light">{activeProduct.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]">{t.modalKeyHighlights}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#A08C75] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                    {t.modalDesignedBy} <strong className="text-[#1A1A1A]">{activeProduct.designer}</strong>
                  </div>
                </div>
              )}

              {/* Tab 2: Dimensions */}
              {activeTab === 'dimensions' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                  <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] space-y-1">
                    <span className="text-[10px] text-[#7A7A7A] uppercase font-bold tracking-wider">{t.modalWidth}</span>
                    <div className="text-lg font-bold text-[#1A1A1A] font-mono">
                      {activeProduct.dimensions.width}" ({Math.round(activeProduct.dimensions.width * 2.54)} cm)
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] space-y-1">
                    <span className="text-[10px] text-[#7A7A7A] uppercase font-bold tracking-wider">{t.modalDepth}</span>
                    <div className="text-lg font-bold text-[#1A1A1A] font-mono">
                      {activeProduct.dimensions.depth}" ({Math.round(activeProduct.dimensions.depth * 2.54)} cm)
                    </div>
                  </div>
                  <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] space-y-1">
                    <span className="text-[10px] text-[#7A7A7A] uppercase font-bold tracking-wider">{t.modalHeight}</span>
                    <div className="text-lg font-bold text-[#1A1A1A] font-mono">
                      {activeProduct.dimensions.height}" ({Math.round(activeProduct.dimensions.height * 2.54)} cm)
                    </div>
                  </div>
                  {activeProduct.dimensions.weightLbs && (
                    <div className="col-span-full p-3 rounded-sm bg-[#F5F2ED] text-xs text-[#5A5A5A]">
                      {t.modalWeight}: <strong>{activeProduct.dimensions.weightLbs} lbs ({Math.round(activeProduct.dimensions.weightLbs * 0.453)} kg)</strong> · {t.modalDoorways}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-4 max-w-3xl">
                  {activeProduct.reviews && activeProduct.reviews.length > 0 ? (
                    activeProduct.reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-sm bg-white border border-[#E5E4E2] space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#1A1A1A]">{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[9px] uppercase tracking-wider bg-[#F5F2ED] text-[#1A1A1A] border border-[#E5E4E2] px-2 py-0.2 rounded-xs font-bold">
                                {t.modalVerifiedBuyer}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#7A7A7A]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#A08C75]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-[#E5E4E2]'}`}
                            />
                          ))}
                        </div>
                        <h4 className="font-serif italic font-bold text-xs text-[#1A1A1A]">{rev.title}</h4>
                        <p className="text-xs text-[#5A5A5A] leading-relaxed font-light">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#7A7A7A]">{t.modalSatisfaction}</p>
                  )}
                </div>
              )}

              {/* Tab 4: Care */}
              {activeTab === 'care' && (
                <div className="max-w-2xl p-4 rounded-sm bg-white border border-[#E5E4E2] text-xs text-[#5A5A5A] space-y-2">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]">{t.modalMaintenance}</h4>
                  <p className="leading-relaxed font-light">{activeProduct.careInstructions}</p>
                </div>
              )}
            </div>

            {/* Complete the Look / Related Pieces */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 border-t border-[#E5E4E2] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">{t.modalCompleteRoom}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">{t.modalPairings}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map(rel => (
                    <div
                      key={rel.id}
                      id={`related-item-${rel.id}`}
                      onClick={() => {
                        setActiveProduct(rel);
                        setActiveImageIndex(0);
                      }}
                      className="group p-3 rounded-sm bg-white border border-[#E5E4E2] hover:border-[#1A1A1A] hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-14 h-14 rounded-xs object-cover bg-[#F5F5F5] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif italic font-bold text-xs text-[#1A1A1A] group-hover:text-[#A08C75] truncate transition-colors">
                          {rel.name}
                        </h4>
                        <p className="text-[10px] text-[#7A7A7A] truncate font-light">
                          {rel.materials[0]}
                        </p>
                        <span className="text-xs font-bold text-[#1A1A1A] font-mono mt-0.5 block">
                          {formatCurrency(rel.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
  );
};

export const ProductModal: React.FC = () => {
  const { activeProduct } = useShop();

  return (
    <AnimatePresence>
      {activeProduct && <ProductModalContent product={activeProduct} key={activeProduct.id} />}
    </AnimatePresence>
  );
};
