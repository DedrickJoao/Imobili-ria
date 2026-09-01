import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { SearchBar } from './SearchBar';
import { CATEGORIES_LIST } from '../data/products';
import { FurnitureCategory } from '../types';
import {
  ShoppingBag,
  Heart,
  Sparkles,
  Menu,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Truck,
  Languages,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigateToGallery?: () => void;
  onNavigateToLookbook?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToGallery, onNavigateToLookbook }) => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAIStylistOpen,
    activeFilter,
    setFilter,
  } = useShop();

  const { language, toggleLanguage, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLocalizedCategoryLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case 'all': return t.catAll;
      case 'sofas': return t.catSofas;
      case 'tables': return t.catTables;
      case 'chairs': return t.catChairs;
      case 'beds': return t.catBeds;
      case 'storage': return t.catStorage;
      case 'lighting': return t.catLighting;
      default: return defaultLabel;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setFilter({ category: categoryId as FurnitureCategory, searchQuery: '' });
    onNavigateToGallery?.();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E4E2] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] sm:text-xs py-1.5 px-4 font-medium uppercase tracking-wider border-b border-[#2A2A28]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#A08C75]" />
            <span>{t.announcementDelivery}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#DEDCD7]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A08C75]" /> {t.announcementWarranty}
            </span>
            <span>{t.announcementPromo}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-sm transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo / Brand Name - Sarvicimobliaria */}
          <div
            id="brand-logo"
            onClick={() => {
              setFilter({ category: 'all', searchQuery: '', room: 'all' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer flex items-baseline gap-2 select-none group shrink-0"
          >
            <span className="text-xl sm:text-2xl font-serif tracking-tight italic font-bold text-[#1A1A1A] group-hover:text-[#A08C75] transition-colors">
              {t.brandName}
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] text-[#A08C75] font-bold">
              {t.estYear}
            </span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-2">
            <SearchBar />
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-xs uppercase tracking-wider font-semibold text-[#7A7A7A]">
            {CATEGORIES_LIST.slice(0, 5).map(cat => {
              const localized = getLocalizedCategoryLabel(cat.id, cat.label);
              return (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`pb-1 transition-all whitespace-nowrap ${
                    activeFilter.category === cat.id && !activeFilter.searchQuery
                      ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A]'
                      : 'hover:text-[#1A1A1A]'
                  }`}
                >
                  {localized.split('&')[0].trim()}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Button (English <-> Portuguese) */}
            <button
              id="language-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-[#E5E4E2] bg-white hover:border-[#1A1A1A] hover:bg-[#FAF9F6] transition-all text-xs font-bold text-[#1A1A1A] shadow-xs group"
              title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
              aria-label={language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <Globe className="w-3.5 h-3.5 text-[#A08C75] group-hover:rotate-45 transition-transform duration-300" />
              <div className="flex items-center text-[10px] uppercase font-mono tracking-wider">
                <span className={language === 'en' ? 'text-[#1A1A1A] font-extrabold underline' : 'text-[#8A8A8A]'}>EN</span>
                <span className="text-[#D0C9BF] mx-1">/</span>
                <span className={language === 'pt' ? 'text-[#1A1A1A] font-extrabold underline' : 'text-[#8A8A8A]'}>PT</span>
              </div>
            </button>

            {/* AI Room Stylist Button */}
            <button
              id="nav-ai-stylist-btn"
              onClick={() => setIsAIStylistOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E4E2] bg-[#FAF9F6] text-[#A08C75] hover:border-[#A08C75] hover:bg-[#F5F2ED] transition-all text-[10px] uppercase font-bold tracking-wider"
              title="Open AI Interior Stylist"
            >
              <Sparkles className="w-3 h-3 text-[#A08C75]" />
              <span className="hidden sm:inline">{t.navAiStylist}</span>
            </button>

            {/* Lookbooks shortcut */}
            <button
              id="nav-lookbooks-btn"
              onClick={onNavigateToLookbook}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.navLookbooks}</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-full transition-colors"
              aria-label={t.navWishlist}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span
                  id="nav-wishlist-count-badge"
                  className="absolute top-0 right-0 w-4 h-4 bg-[#A08C75] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in"
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#1A1A1A] text-white hover:bg-black transition-all shadow-xs text-xs font-semibold uppercase tracking-wider"
              aria-label={t.navCart}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.navCart} ({cartCount.toString().padStart(2, '0')})</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar row */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#E5E4E2] bg-[#FAF9F6] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75]">
                  {t.navCategories}
                </div>
                <button
                  id="mobile-lang-switch-btn"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-xs border border-[#E5E4E2] bg-white text-[#1A1A1A]"
                >
                  <Globe className="w-3 h-3 text-[#A08C75]" />
                  <span>{language === 'en' ? 'Mudar para Português (PT)' : 'Switch to English (EN)'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES_LIST.map(cat => (
                  <button
                    key={cat.id}
                    id={`mobile-cat-${cat.id}`}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center justify-between p-3 rounded-sm bg-white border border-[#E5E4E2] hover:border-[#1A1A1A] text-xs font-medium text-[#1A1A1A] transition-colors text-left"
                  >
                    <span>{getLocalizedCategoryLabel(cat.id, cat.label)}</span>
                    <span className="text-[10px] text-[#7A7A7A]">({cat.count})</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E5E4E2] flex flex-col gap-2">
                <button
                  id="mobile-ai-stylist-link"
                  onClick={() => {
                    setIsAIStylistOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] text-[#1A1A1A] font-semibold text-xs uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#A08C75]" />
                    <span>{t.aiModalTitle}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="mobile-lookbooks-link"
                  onClick={() => {
                    onNavigateToLookbook?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-sm bg-white border border-[#E5E4E2] text-xs font-medium text-[#1A1A1A]"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#7A7A7A]" />
                    <span>{t.lookbookTag}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7A7A7A]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
