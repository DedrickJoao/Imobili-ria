import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
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

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(activeFilter.priceRange[1]);

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

  // Price range slider change
  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
    setFilter(prev => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category filter
        if (activeFilter.category !== 'all' && product.category !== activeFilter.category) {
          return false;
        }

        // Room filter
        if (activeFilter.room !== 'all' && product.room !== activeFilter.room) {
          return false;
        }

        // Price range
        if (product.price < activeFilter.priceRange[0] || product.price > activeFilter.priceRange[1]) {
          return false;
        }

        // Materials filter
        if (activeFilter.materials.length > 0) {
          const hasMaterial = product.materials.some(m =>
            activeFilter.materials.some(selectedMat => m.toLowerCase().includes(selectedMat.toLowerCase()))
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
        if (activeFilter.sortBy === 'price-asc') return a.price - b.price;
        if (activeFilter.sortBy === 'price-desc') return b.price - a.price;
        if (activeFilter.sortBy === 'rating') return b.rating - a.rating;
        if (activeFilter.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured order default
      });
  }, [products, activeFilter]);

  // Active filters count
  const activeFiltersCount =
    (activeFilter.category !== 'all' ? 1 : 0) +
    (activeFilter.room !== 'all' ? 1 : 0) +
    (activeFilter.priceRange[1] < 4500 ? 1 : 0) +
    activeFilter.materials.length +
    activeFilter.colors.length +
    (activeFilter.inStockOnly ? 1 : 0) +
    (activeFilter.searchQuery ? 1 : 0);

  return (
    <section id="product-gallery-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Category Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A08C75]">
              The Studio Collection
            </span>
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-1">
              Curated Furniture Pieces
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Grid Columns */}
            <div className="hidden sm:flex items-center p-1 bg-[#F5F5F5] rounded-sm border border-[#E5E4E2]">
              <button
                id="view-grid-2-cols"
                onClick={() => setFilter({ gridColumns: 2, viewMode: 'grid' })}
                className={`p-1.5 rounded-xs transition-colors ${
                  activeFilter.gridColumns === 2 && activeFilter.viewMode === 'grid'
                    ? 'bg-white shadow-xs text-[#1A1A1A]'
                    : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
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
                    ? 'bg-white shadow-xs text-[#1A1A1A]'
                    : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
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
                    ? 'bg-white shadow-xs text-[#1A1A1A]'
                    : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] hover:border-[#A08C75] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A08C75]" />
              <span>AI Recommendation</span>
            </button>
          </div>
        </div>

        {/* Category horizontal scroll bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_LIST.map(cat => (
            <button
              key={cat.id}
              id={`gallery-cat-tab-${cat.id}`}
              onClick={() => handleCategorySelect(cat.id as FurnitureCategory)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeFilter.category === cat.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-[#7A7A7A] border-[#E5E4E2] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  activeFilter.category === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F5F5F5] text-[#7A7A7A]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar: Filter Toggles & Sort */}
        <div className="p-3 bg-white rounded-sm border border-[#E5E4E2] flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              id="filter-drawer-toggle-btn"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-wider border transition-all ${
                isFilterDrawerOpen || activeFiltersCount > 0
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E4E2] hover:border-[#1A1A1A]'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 text-[#A08C75]" />
              <span>Smart Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#A08C75] text-white text-[9px] flex items-center justify-center font-bold">
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
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white border-[#E5E4E2] text-[#7A7A7A] hover:text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  {room === 'all' ? 'All Rooms' : room}
                </button>
              ))}
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F6] rounded-sm border border-[#E5E4E2] text-[10px] uppercase font-bold tracking-wider text-[#5A5A5A] cursor-pointer hover:border-[#1A1A1A]">
              <input
                id="instock-only-checkbox"
                type="checkbox"
                checked={activeFilter.inStockOnly}
                onChange={e => setFilter({ inStockOnly: e.target.checked })}
                className="w-3.5 h-3.5 accent-[#A08C75] rounded-xs"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

          {/* Right side: Result Count & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#7A7A7A] hidden md:inline">
              Showing <strong>{filteredProducts.length}</strong> of {products.length} pieces
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
                className="bg-[#FAF9F6] border border-[#E5E4E2] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-wider rounded-sm px-3 py-2 pr-8 focus:outline-none focus:border-[#A08C75] cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#7A7A7A] absolute right-2.5 pointer-events-none" />
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
              className="bg-white p-5 sm:p-6 rounded-sm border border-[#E5E4E2] shadow-lg overflow-hidden space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E4E2]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#A08C75]" />
                  <h3 className="font-serif italic text-base font-bold text-[#1A1A1A]">Refine by Attributes</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    id="reset-all-filters-btn"
                    onClick={resetFilters}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#A08C75] hover:text-[#1A1A1A] flex items-center gap-1 border-b border-[#A08C75]"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Price Range Slider */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">Price Range</span>
                    <span className="text-[#A08C75] font-mono">${activeFilter.priceRange[0]} - ${maxPrice.toLocaleString()}</span>
                  </div>
                  <input
                    id="price-range-slider"
                    type="range"
                    min="300"
                    max="4500"
                    step="50"
                    value={maxPrice}
                    onChange={e => handlePriceChange(Number(e.target.value))}
                    className="w-full h-1 bg-[#E5E4E2] rounded-none appearance-none cursor-pointer accent-[#A08C75]"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#7A7A7A] font-mono">
                    <span>$300</span>
                    <span>$2,500</span>
                    <span>$4,500</span>
                  </div>
                </div>

                {/* 2. Materials */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-bold block">Craft Materials</span>
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
                              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                              : 'bg-[#F5F5F5] text-[#5A5A5A] border-[#E5E4E2] hover:border-[#1A1A1A]'
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
                  <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-bold block">Color Family</span>
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
                              ? 'ring-1 ring-[#1A1A1A] ring-offset-2 scale-110 border-transparent'
                              : 'border-[#E5E4E2] hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          {selected && <Check className="w-3 h-3 text-[#1A1A1A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. AI Designer Quick Prompt */}
                <div className="p-3.5 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A08C75]">
                      <Sparkles className="w-3 h-3 text-[#A08C75]" />
                      <span>Need room guidance?</span>
                    </div>
                    <p className="text-[11px] text-[#5A5A5A] leading-snug">
                      Let our AI interior advisor curate matching furniture based on your room dimensions.
                    </p>
                  </div>
                  <button
                    id="filter-launch-ai-advisor"
                    onClick={() => setIsAIStylistOpen(true)}
                    className="w-full py-1.5 px-3 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                  >
                    Open Stylist Studio
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-bold">Active filters:</span>

            {activeFilter.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E5E4E2] text-[10px] uppercase font-bold text-[#1A1A1A]">
                Category: {activeFilter.category}
                <button
                  id="remove-cat-filter-btn"
                  onClick={() => setFilter({ category: 'all' })}
                  className="hover:text-[#A08C75]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter.room !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E5E4E2] text-[10px] uppercase font-bold text-[#1A1A1A] capitalize">
                Room: {activeFilter.room}
                <button
                  id="remove-room-filter-btn"
                  onClick={() => setFilter({ room: 'all' })}
                  className="hover:text-[#A08C75]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E5E4E2] text-[10px] uppercase font-bold text-[#1A1A1A]">
                Search: "{activeFilter.searchQuery}"
                <button
                  id="remove-search-filter-btn"
                  onClick={() => setFilter({ searchQuery: '' })}
                  className="hover:text-[#A08C75]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeFilter.materials.map(mat => (
              <span
                key={mat}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E5E4E2] text-[10px] uppercase font-bold text-[#1A1A1A]"
              >
                Material: {mat}
                <button
                  id={`remove-mat-${mat}`}
                  onClick={() => toggleMaterial(mat)}
                  className="hover:text-[#A08C75]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {activeFilter.colors.map(col => (
              <span
                key={col}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#E5E4E2] text-[10px] uppercase font-bold text-[#1A1A1A]"
              >
                Color: {col}
                <button
                  id={`remove-col-${col}`}
                  onClick={() => toggleColor(col)}
                  className="hover:text-[#A08C75]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              id="clear-all-filters-btn"
              onClick={resetFilters}
              className="text-[10px] uppercase tracking-wider font-bold text-[#A08C75] hover:text-[#1A1A1A] border-b border-[#A08C75] ml-2"
            >
              Clear all
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
          <div className="py-16 text-center bg-white rounded-sm border border-[#E5E4E2] p-8 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E5E4E2] flex items-center justify-center mx-auto text-[#A08C75]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">No matching pieces</h3>
              <p className="text-xs text-[#7A7A7A]">
                We couldn't find any furniture items matching your exact filter combination.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                id="empty-reset-filters-btn"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
              >
                Reset All Filters
              </button>
              <button
                id="empty-ask-ai-btn"
                onClick={() => setIsAIStylistOpen(true)}
                className="px-5 py-2.5 rounded-sm bg-[#F5F2ED] text-[#1A1A1A] border border-[#E5E4E2] text-[10px] uppercase tracking-wider font-bold hover:border-[#A08C75] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A08C75]" />
                <span>Ask AI Stylist</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
