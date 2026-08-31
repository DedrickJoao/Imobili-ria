import React, { useState } from 'react';
import { Product, ColorOption } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Star, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail, setIsAIStylistOpen } = useShop();

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);

  // Derive current image index based on selected color or hover state
  const currentImage = isHovered && product.images.length > 1
    ? product.images[1] // show alternative angle / lifestyle on hover
    : product.images[selectedColor?.imageIndex ?? 0] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedColor, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(product.id);
    } else {
      openProductDetail(product.id);
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white rounded-sm border border-[#E5E4E2] hover:border-[#1A1A1A] hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
        {/* Badges top left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-white shadow-xs">
              Signature
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-[#A08C75] text-white shadow-xs">
              Save {product.discountPercentage}%
            </span>
          )}
          {product.isNew && !product.discountPercentage && (
            <span className="px-2.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-white text-[#1A1A1A] border border-[#E5E4E2] shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist button top right */}
        <button
          id={`product-wishlist-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs ${
            inWishlist
              ? 'bg-[#A08C75] text-white'
              : 'bg-white/80 hover:bg-white text-[#1A1A1A] hover:text-[#A08C75]'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Main image with smooth zoom transition */}
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`flex-1 py-2 px-3 rounded-sm text-[10px] uppercase font-bold tracking-wider backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
              isAdding
                ? 'bg-[#A08C75] text-white'
                : 'bg-[#1A1A1A] hover:bg-black text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Added to Bag' : 'Quick Add'}</span>
          </button>

          <button
            id={`quick-detail-btn-${product.id}`}
            onClick={e => {
              e.stopPropagation();
              openProductDetail(product.id);
            }}
            className="p-2 rounded-sm bg-white/90 hover:bg-white text-[#1A1A1A] border border-[#E5E4E2] backdrop-blur-md shadow-md transition-all"
            title="Inspect full details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75]">
            <span className="capitalize">{product.category}</span>
            <div className="flex items-center gap-1 text-[#1A1A1A]">
              <Star className="w-3 h-3 text-[#A08C75] fill-current" />
              <span className="font-bold text-[10px]">{product.rating}</span>
              <span className="text-[#7A7A7A]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#A08C75] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] text-[#7A7A7A] line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches selector */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={e => e.stopPropagation()}>
            {product.colors.map(color => (
              <button
                key={color.name}
                id={`swatch-${product.id}-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-1 ring-[#1A1A1A] ring-offset-1 scale-110 border-transparent'
                    : 'border-[#E5E4E2] hover:scale-105'
                }`}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
            <span className="text-[9px] uppercase tracking-wider text-[#7A7A7A] ml-1">
              {product.colors.length} shades
            </span>
          </div>
        )}

        {/* Price and styling trigger */}
        <div className="pt-2 border-t border-[#E5E4E2] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-[#1A1A1A] font-mono">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#7A7A7A] line-through font-mono">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            id={`card-ai-stylist-${product.id}`}
            onClick={e => {
              e.stopPropagation();
              setIsAIStylistOpen(true, product);
            }}
            className="text-[10px] uppercase tracking-wider font-bold text-[#A08C75] hover:text-[#1A1A1A] flex items-center gap-1 border-b border-[#A08C75]"
            title="Get AI style pairing tips for this piece"
          >
            <Sparkles className="w-2.5 h-2.5 text-[#A08C75]" />
            <span>Style AI</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
