import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST, MATERIALS_LIST, COLORS_LIST } from '../data/products';
import { FurnitureCategory, RoomCategory, FilterState } from '../types';
import {
  SlidersHorizontal,
  LayoutGrid,
  Columns2,
  Columns3,
  Columns4,
  Layers,
  ChevronDown,
  X,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductGallery: React.FC = () => {
  const { products, activeFilter, setFilter, resetFilters, setIsAIStylistOpen } = useShop();
  const { t, formatCurrency, language } = useLanguage();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(activeFilter.priceRange[1]);

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

  const getLocalizedRoomLabel = (room: RoomCategory) => {
    switch (room) {
      case 'all': return t.roomAll;
      case 'living': return t.roomLiving;
      case 'dining': return t.roomDining;
      case 'bedroom': return t.roomBedroom;
      case 'workspace': return t.roomWorkspace;
      default: return room;
    }
  };

  // Handle category change
  const handleCategorySelect = (catId: FurnitureCategory) => {
    setFilter({ category: catId });
  };

  // Handle room select
  const handleRoomSelect = (roomId: RoomCategory) => {
    setFilter({ room: roomId });
  };

  // Handle material toggle
  const toggleMaterial = (material: string) => {
    setFilter(prev => {
      const exists = prev.materials.includes(material);
      const newMaterials = exists
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material];
      return { ...prev, materials: newMaterials };
    });
  };

  // Handle color toggle
  const toggleColor = (colorName: string) => {
    setFilter(prev => {
      const exists = prev.colors.includes(colorName);
      const newColors = exists
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName];
      return { ...prev, colors: newColors };
    });
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    const curCategory = activeFilter?.category || 'all';
    const curRoom = activeFilter?.room || 'all';
    const curMaterials = activeFilter?.materials || [];
    const curColors = activeFilter?.colors || [];
    const curPriceRange = activeFilter?.priceRange || [0, 4500];
    const curQuery = (activeFilter?.searchQuery || '').trim().toLowerCase();
    const curSort = activeFilter?.sortBy || 'featured';
    const curInStock = !!activeFilter?.inStockOnly;

    return products
      .filter(product => {
        // Category filter
        if (curCategory !== 'all' && product.category !== curCategory) {
          return false;
        }

        // Room filter
        if (curRoom !== 'all' && product.room !== curRoom) {
          return false;
        }

        // Materials filter
        if (curMaterials.length > 0) {
          const hasMaterial = product.materials.some(m =>
            curMaterials.some(selectedMat => m.toLowerCase().includes(selectedMat.toLowerCase()))
          );
          if (!hasMaterial) return false;
        }

        // Color filter
        if (activeFilter.colors.length > 0) {
          const hasColor = product.colors.some(c =>
            activeFilter.colors.some(selectedColor =>
              c.name.toLowerCase().includes(selectedColor.toLowerCase())
            )
          );
          if (!hasColor) return false;
        }

        // In-stock only
        if (activeFilter.inStockOnly && !product.inStock) {
          return false;
        }

        // Search query
        if (activeFilter.searchQuery.trim()) {
          const q = activeFilter.searchQuery.toLowerCase();
          const match =
            product.name.toLowerCase().includes(q) ||
            product.subtitle.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q) ||
            product.materials.some(m => m.toLowerCase().includes(q)) ||
            product.description.toLowerCase().includes(q);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (activeFilter.sortBy === 'rating') return b.rating - a.rating;
        if (activeFilter.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured order default
      });
  }, [products, activeFilter]);

  // Active filters count
  const activeFiltersCount =
    ((activeFilter?.category && activeFilter.category !== 'all') ? 1 : 0) +
    ((activeFilter?.room && activeFilter.room !== 'all') ? 1 : 0) +
    (activeFilter?.materials?.length || 0) +
    (activeFilter?.colors?.length || 0) +
    (activeFilter?.inStockOnly ? 1 : 0) +
    (activeFilter?.searchQuery ? 1 : 0);

  return (
    <section id="product-gallery-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Category Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0284C7]">
              {t.gallerySubTitle}
            </span>
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B192C] mt-1">
              {t.galleryMainTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Grid Columns */}
            <div className="hidden sm:flex items-center p-1 bg-[#F5F5F5] rounded-sm border border-[#E2E8F0]">
              <button
                id="view-grid-2-cols"
                onClick={() => setFilter({ gridColumns: 2, viewMode: 'grid' })}
                className={`p-1.5 rounded-xs transition-colors ${
                  activeFilter.gridColumns === 2 && activeFilter.viewMode === 'grid'
                    ? 'bg-white shadow-xs text-[#0B192C]'
                    : 'text-[#64748B] hover:text-[#0B192C]'
                }`}
                title="2 Columns View"
              >
                <Columns2 className="w-3.5 h-3.5" />
              </button>

              <button
                id="view-grid-3-cols"
                onClick={() => setFilter({ gridColumns: 3, viewMode: 'grid' })}
                className={`p-1.5 rounded-xs transition-colors ${
                  activeFilter.gridColumns === 3 && activeFilter.viewMode === 'grid'
                    ? 'bg-white shadow-xs text-[#0B192C]'
                    : 'text-[#64748B] hover:text-[#0B192C]'
                }`}
                title="3 Columns View"
              >
                <Columns3 className="w-3.5 h-3.5" />
              </button>

              <button
                id="view-grid-4-cols"
                onClick={() => setFilter({ gridColumns: 4, viewMode: 'grid' })}
                className={`p-1.5 rounded-xs transition-colors ${
                  activeFilter.gridColumns === 4 && activeFilter.viewMode === 'grid'
                    ? 'bg-white shadow-xs text-[#0B192C]'
                    : 'text-[#64748B] hover:text-[#0B192C]'
                }`}
                title="4 Columns View"
              >
                <Columns4 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Room Stylist Shortcut */}
            <button
              id="gallery-open-ai-stylist"
              onClick={() => setIsAIStylistOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#EFF6FF] border border-[#E2E8F0] text-[10px] uppercase tracking-wider font-bold text-[#0B192C] hover:border-[#0284C7] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{t.galleryAiRec}</span>
            </button>
          </div>
        </div>

        {/* Category horizontal scroll bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_LIST.map(cat => {
            const label = getLocalizedCategoryLabel(cat.id, cat.label);
              const isSelected = (activeFilter?.category || 'all') === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`gallery-cat-tab-${cat.id}`}
                  onClick={() => handleCategorySelect(cat.id as FurnitureCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                      : 'bg-white text-[#64748B] border-[#BAE6FD]/70 hover:border-[#0284C7] hover:text-[#0284C7]'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F0F9FF] text-[#0369A1]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
          })}
        </div>

        {/* Toolbar: Filter Toggles & Sort */}
        <div className="p-3 bg-white rounded-sm border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              id="filter-drawer-toggle-btn"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider border transition-all ${
                isFilterDrawerOpen || activeFiltersCount > 0
                  ? 'bg-[#0B192C] text-white border-[#0B192C]'
                  : 'bg-[#F8FAFC] text-[#0B192C] border-[#E2E8F0] hover:border-[#0B192C]'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-[#0284C7]" />
              <span>{t.gallerySmartFilters}</span>
              {activeFiltersCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#0284C7] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Quick Room filter chips */}
            <div className="hidden sm:flex items-center gap-1.5">
              {(['all', 'living', 'dining', 'bedroom', 'workspace'] as RoomCategory[]).map(room => (
                <button
                  key={room}
                  id={`room-chip-${room}`}
                  onClick={() => handleRoomSelect(room)}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors border ${
                    activeFilter.room === room
                      ? 'bg-[#0B192C] text-white border-[#0B192C]'
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0B192C] hover:border-[#0B192C]'
                  }`}
                >
                  {getLocalizedRoomLabel(room)}
                </button>
              ))}
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] rounded-sm border border-[#E2E8F0] text-[10px] uppercase font-bold tracking-wider text-[#475569] cursor-pointer hover:border-[#0B192C]">
              <input
                id="instock-only-checkbox"
                type="checkbox"
                checked={activeFilter.inStockOnly}
                onChange={e => setFilter({ inStockOnly: e.target.checked })}
                className="w-3.5 h-3.5 accent-[#0284C7] rounded-xs"
              />
              <span>{t.galleryInStockOnly}</span>
            </label>
          </div>

          {/* Right side: Result Count & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#64748B] hidden md:inline">
              {t.galleryShowing} <strong>{filteredProducts.length}</strong> {t.galleryOf} {products.length} {t.galleryPieces}
            </span>

            <div className="relative flex items-center">
              <select
                id="gallery-sort-select"
                value={activeFilter.sortBy}
                onChange={e =>
                  setFilter({
                    sortBy: e.target.value as FilterState['sortBy'],
                  })
                }
                className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B192C] text-[10px] uppercase font-bold tracking-wider rounded-sm px-3 py-2 pr-8 focus:outline-none focus:border-[#0284C7] cursor-pointer"
              >
                <option value="featured">{t.gallerySortFeatured}</option>
                <option value="rating">{t.gallerySortRating}</option>
                <option value="newest">{t.gallerySortNewest}</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#64748B] absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Smart Filter Drawer */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <motion.div
              id="smart-filters-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-5 sm:p-6 rounded-sm border border-[#E2E8F0] shadow-lg overflow-hidden space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
                  <h3 className="font-serif italic text-base font-bold text-[#0B192C]">{t.galleryRefineTitle}</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    id="reset-all-filters-btn"
                    onClick={resetFilters}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#0284C7] hover:text-[#0B192C] flex items-center gap-1 border-b border-[#0284C7]"
                  >
                    <RotateCcw className="w-3 h-3" /> {t.galleryResetAll}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Curated Room Ambience */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">{t.roomAll}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['all', 'living', 'dining', 'bedroom', 'workspace'] as RoomCategory[]).map(room => (
                      <button
                        key={room}
                        onClick={() => handleRoomSelect(room)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors border ${
                          activeFilter.room === room
                            ? 'bg-[#0B192C] text-white border-[#0B192C]'
                            : 'bg-[#F5F5F5] text-[#475569] border-[#E2E8F0] hover:border-[#0B192C]'
                        }`}
                      >
                        {getLocalizedRoomLabel(room)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Materials */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">{t.galleryMaterials}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {MATERIALS_LIST.map(material => {
                      const selected = activeFilter.materials.includes(material);
                      return (
                        <button
                          key={material}
                          id={`filter-material-${material.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => toggleMaterial(material)}
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors border flex items-center gap-1 ${
                            selected
                              ? 'bg-[#0B192C] text-white border-[#0B192C]'
                              : 'bg-[#F5F5F5] text-[#475569] border-[#E2E8F0] hover:border-[#0B192C]'
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5" />}
                          <span>{material}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Color Swatches */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">{t.galleryColorFamily}</span>
                  <div className="flex flex-wrap gap-2">
                    {COLORS_LIST.map(color => {
                      const selected = activeFilter.colors.includes(color.name);
                      return (
                        <button
                          key={color.name}
                          id={`filter-color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => toggleColor(color.name)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-transform ${
                            selected
                              ? 'ring-1 ring-[#0B192C] ring-offset-2 scale-110 border-transparent'
                              : 'border-[#E2E8F0] hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          {selected && <Check className="w-3 h-3 text-[#0B192C]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. AI Designer Quick Prompt */}
                <div className="p-3.5 rounded-sm bg-[#EFF6FF] border border-[#E2E8F0] flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                      <Sparkles className="w-3 h-3 text-[#0284C7]" />
                      <span>{t.galleryAiPromptTitle}</span>
                    </div>
                    <p className="text-[11px] text-[#475569] leading-snug">
                      {t.galleryAiPromptDesc}
                    </p>
                  </div>
                  <button
                    id="filter-launch-ai-advisor"
                    onClick={() => setIsAIStylistOpen(true)}
                    className="w-full py-1.5 px-3 rounded-sm bg-[#0B192C] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                  >
                    {t.galleryOpenAdvisor}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold">{t.galleryActiveFilters}</span>

            {activeFilter?.category && activeFilter.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-[10px] uppercase font-bold text-[#0C4A6E]">
                {t.navCategories}: {getLocalizedCategoryLabel(activeFilter.category, activeFilter.category)}
                <button
                  id="remove-cat-filter-btn"
                  onClick={() => setFilter({ category: 'all' })}
                  className="hover:text-[#0284C7]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter?.room && activeFilter.room !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#BAE6FD] text-[10px] uppercase font-bold text-[#0C4A6E] capitalize">
                {getLocalizedRoomLabel(activeFilter.room)}
                <button
                  id="remove-room-filter-btn"
                  onClick={() => setFilter({ room: 'all' })}
                  className="hover:text-[#0284C7]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10px] uppercase font-bold text-[#0B192C]">
                "{activeFilter.searchQuery}"
                <button
                  id="remove-search-filter-btn"
                  onClick={() => setFilter({ searchQuery: '' })}
                  className="hover:text-[#0284C7]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter.materials.map(mat => (
              <span
                key={mat}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10px] uppercase font-bold text-[#0B192C]"
              >
                {mat}
                <button
                  id={`remove-mat-${mat}`}
                  onClick={() => toggleMaterial(mat)}
                  className="hover:text-[#0284C7]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {activeFilter.colors.map(col => (
              <span
                key={col}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10px] uppercase font-bold text-[#0B192C]"
              >
                {col}
                <button
                  id={`remove-col-${col}`}
                  onClick={() => toggleColor(col)}
                  className="hover:text-[#0284C7]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              id="clear-all-filters-btn"
              onClick={resetFilters}
              className="text-[10px] uppercase tracking-wider font-bold text-[#0284C7] hover:text-[#0B192C] border-b border-[#0284C7] ml-2"
            >
              {t.galleryClearAll}
            </button>
          </div>
        )}
      </div>

      {/* Product Grid / Empty State */}
      <div className="mt-8">
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              activeFilter.gridColumns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : activeFilter.gridColumns === 4
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-sm border border-[#E2E8F0] p-8 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto text-[#0284C7]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif italic text-xl font-bold text-[#0B192C]">{t.galleryNoMatchingTitle}</h3>
              <p className="text-xs text-[#64748B]">
                {t.galleryNoMatchingDesc}
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                id="empty-reset-filters-btn"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-sm bg-[#0B192C] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
              >
                {t.galleryResetFiltersBtn}
              </button>
              <button
                id="empty-ask-ai-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="px-5 py-2.5 rounded-sm bg-[#EFF6FF] text-[#0B192C] border border-[#E2E8F0] text-[10px] uppercase tracking-wider font-bold hover:border-[#0284C7] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t.galleryAskStylistBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
