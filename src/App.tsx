import React, { useRef } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModernCatalogsSection } from './components/ModernCatalogsSection';
import { LookbookSection } from './components/LookbookSection';
import { ProductGallery } from './components/ProductGallery';
import { ProductModal } from './components/ProductModal';
import { AIStylistModal } from './components/AIStylistModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

const ShopContent: React.FC = () => {
  const { setIsCheckoutOpen } = useShop();
  const galleryRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);
  const catalogsRef = useRef<HTMLDivElement>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    lookbookRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalogs = () => {
    catalogsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#DBEAFE] selection:text-[#1E40AF]">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Global Navigation */}
      <Navbar
        onNavigateToGallery={scrollToGallery}
        onNavigateToLookbook={scrollToLookbook}
        onNavigateToCatalogs={scrollToCatalogs}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero onShopClick={scrollToGallery} />

        {/* Modern Interactive Catalogs 2026 */}
        <div ref={catalogsRef}>
          <ModernCatalogsSection onRequestQuote={() => setIsCheckoutOpen(true)} />
        </div>

        {/* Curated Architectural Room Lookbooks */}
        <div ref={lookbookRef}>
          <LookbookSection />
        </div>

        {/* Full Product Gallery with Smart Filters */}
        <div ref={galleryRef}>
          <ProductGallery />
        </div>
      </main>

      {/* Modals & Drawers */}
      <ProductModal />
      <AIStylistModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Footer */}
      <Footer onNavigateToCatalogs={scrollToCatalogs} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <ShopProvider>
        <ShopContent />
      </ShopProvider>
    </LanguageProvider>
  );
}

export default App;
