import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ShoppingBag,
  Heart,
  Globe,
  Sparkles,
  Menu,
  X,
  Compass,
  Truck,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FurnitureCategory } from '../types';
import { BrandLogo } from './BrandLogo';
import { AnimatePresence, motion } from 'framer-motion';

const CATEGORIES_LIST: { id: FurnitureCategory; label: string; count: number }[] = [
  { id: 'sofas', label: 'Sofas & Seating', count: 18 },
  { id: 'tables', label: 'Dining & Tables', count: 12 },
  { id: 'chairs', label: 'Chairs & Stools', count: 14 },
  { id: 'beds', label: 'Beds & Sanctuary', count: 9 },
  { id: 'storage', label: 'Architectural Storage', count: 8 },
  { id: 'lighting', label: 'Lighting & Sculptural', count: 6 },
];

interface NavbarProps {
  onNavigateToLookbook?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToCatalogs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToLookbook,
  onNavigateToGallery,
  onNavigateToCatalogs,
}) => {
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen, setIsAIStylistOpen, activeFilter, setFilter } = useShop();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getLocalizedCategoryLabel = (id: FurnitureCategory, fallback: string) => {
    switch (id) {
      case 'sofas': return t.catSofas;
      case 'tables': return t.catTables;
      case 'chairs': return t.catChairs;
      case 'beds': return t.catBeds;
      case 'storage': return t.catStorage;
      case 'lighting': return t.catLighting;
      default: return fallback;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setFilter({ category: categoryId as FurnitureCategory, searchQuery: '' });
    onNavigateToGallery?.();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0F2FE] transition-all">
      {/* Top micro announcement bar - Lighter, luminous sky blue */}
      <div className="bg-gradient-to-r from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] text-[#0369A1] text-[10px] sm:text-xs py-1.5 px-4 font-medium uppercase tracking-wider border-b border-[#BAE6FD]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="font-semibold">{t.announcementDelivery}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#0369A1]/90">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" /> {t.announcementWarranty}
            </span>
            <span className="font-medium">{t.announcementPromo}</span>
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
            className="lg:hidden p-2 text-[#0C4A6E] hover:bg-[#F0F9FF] rounded-sm transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Official Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => {
              setFilter({ category: 'all', searchQuery: '', room: 'all' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer select-none shrink-0"
            title="SARVIC"
          >
            <BrandLogo variant="dark" size="md" />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-2">
            <SearchBar />
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-xs uppercase tracking-wider font-semibold text-[#64748B]">
            {CATEGORIES_LIST.slice(0, 5).map(cat => {
              const localized = getLocalizedCategoryLabel(cat.id, cat.label);
              return (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`pb-1 transition-all whitespace-nowrap ${
                    activeFilter?.category === cat.id && !activeFilter?.searchQuery
                      ? 'text-[#0284C7] border-b-2 border-[#0284C7] font-bold'
                      : 'hover:text-[#0C4A6E]'
                  }`}
                >
                  {localized.split('&')[0].trim()}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Catalogs Direct Link */}
            <button
              id="nav-catalogs-btn"
              onClick={onNavigateToCatalogs}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#BAE6FD] hover:border-[#0284C7] bg-[#F0F9FF] hover:bg-[#E0F2FE] text-xs uppercase tracking-wider font-bold text-[#0369A1] hover:text-[#0284C7] transition-all"
              title={language === 'pt' ? 'Ver Catálogo Geral 154 Páginas' : 'Browse Full 154-Page Catalog'}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{language === 'pt' ? 'Catálogo 154 Págs' : 'Catalog (154 Pgs)'}</span>
              <span className="text-[9px] bg-[#0284C7] text-white px-1.5 py-0.2 rounded-xs font-mono">
                NOVO
              </span>
            </button>

            {/* Language Switcher Button (English <-> Portuguese) */}
            <button
              id="language-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-[#E0F2FE] bg-white hover:border-[#0284C7] hover:bg-[#F0F9FF] transition-all text-xs font-bold text-[#0C4A6E] shadow-xs group"
              title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
              aria-label={language === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            >
              <Globe className="w-3.5 h-3.5 text-[#0284C7] group-hover:rotate-45 transition-transform duration-300" />
              <div className="flex items-center text-[10px] uppercase font-mono tracking-wider">
                <span className={language === 'en' ? 'text-[#0C4A6E] font-extrabold underline' : 'text-[#94A3B8]'}>EN</span>
                <span className="text-[#BAE6FD] mx-1">/</span>
                <span className={language === 'pt' ? 'text-[#0C4A6E] font-extrabold underline' : 'text-[#94A3B8]'}>PT</span>
              </div>
            </button>

            {/* AI Room Stylist Button */}
            <button
              id="nav-ai-stylist-btn"
              onClick={() => setIsAIStylistOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7] hover:border-[#0284C7] hover:bg-[#E0F2FE] transition-all text-[10px] uppercase font-bold tracking-wider"
              title="Open AI Interior Stylist"
            >
              <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
              <span className="hidden sm:inline">{t.navAiStylist}</span>
            </button>

            {/* Lookbooks shortcut */}
            <button
              id="nav-lookbooks-btn"
              onClick={onNavigateToLookbook}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#64748B] hover:text-[#0C4A6E] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{t.navLookbooks}</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#0C4A6E] hover:bg-[#F0F9FF] rounded-full transition-colors"
              aria-label={t.navWishlist}
            >
              <Heart className="w-5 h-5 text-[#0C4A6E]" />
              {wishlist.length > 0 && (
                <span
                  id="nav-wishlist-count-badge"
                  className="absolute top-0 right-0 w-4 h-4 bg-[#0EA5E9] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in"
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Lighter Blue Azure Style */}
            <button
              id="nav-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all shadow-xs text-xs font-semibold uppercase tracking-wider"
              aria-label={t.navCart}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
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
            className="lg:hidden border-t border-[#E0F2FE] bg-white overflow-hidden shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                  {t.navCategories}
                </div>
                <button
                  id="mobile-lang-switch-btn"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-xs border border-[#E0F2FE] bg-[#F0F9FF] text-[#0C4A6E]"
                >
                  <Globe className="w-3 h-3 text-[#0284C7]" />
                  <span>{language === 'en' ? 'Mudar para Português (PT)' : 'Switch to English (EN)'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES_LIST.map(cat => (
                  <button
                    key={cat.id}
                    id={`mobile-cat-${cat.id}`}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center justify-between p-3 rounded-sm bg-[#F8FAFC] border border-[#E0F2FE] hover:border-[#0284C7] hover:bg-[#F0F9FF] text-xs font-medium text-[#0C4A6E] transition-colors text-left"
                  >
                    <span>{getLocalizedCategoryLabel(cat.id, cat.label)}</span>
                    <span className="text-[10px] text-[#64748B]">({cat.count})</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E0F2FE] flex flex-col gap-2">
                <button
                  id="mobile-catalogs-link"
                  onClick={() => {
                    onNavigateToCatalogs?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-sm bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] font-bold text-xs uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'pt' ? 'Catálogo Completo (154 Páginas)' : 'Full Catalog (154 Pages)'}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0284C7]" />
                </button>

                <button
                  id="mobile-ai-stylist-link"
                  onClick={() => {
                    setIsAIStylistOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-sm bg-[#F8FAFC] border border-[#E0F2FE] text-[#0C4A6E] font-semibold text-xs uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#0284C7]" />
                    <span>{t.aiModalTitle}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0284C7]" />
                </button>

                <button
                  id="mobile-lookbooks-link"
                  onClick={() => {
                    onNavigateToLookbook?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-sm bg-white border border-[#E0F2FE] text-xs font-medium text-[#0C4A6E]"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#0284C7]" />
                    <span>{t.lookbookTag}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#64748B]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
