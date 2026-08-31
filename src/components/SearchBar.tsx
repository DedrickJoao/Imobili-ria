import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

interface SearchBarProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isMobile, onCloseMobile }) => {
  const { products, activeFilter, setFilter, openProductDetail, setIsAIStylistOpen } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(activeFilter.searchQuery || '');
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if activeFilter changes externally
  useEffect(() => {
    setQuery(activeFilter.searchQuery || '');
  }, [activeFilter.searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setFilter({ searchQuery: val });
    if (val.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleClear = () => {
    setQuery('');
    setFilter({ searchQuery: '' });
    setIsOpen(false);
  };

  // Filtered matching items
  const matchingProducts = query.trim()
    ? products
        .filter(p => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.materials.some(m => m.toLowerCase().includes(q)) ||
            p.description.toLowerCase().includes(q)
          );
        })
        .slice(0, 4)
    : [];

  const popularKeywords = ['Bouclé Sofa', 'Travertine Table', 'Walnut Desk', 'Lounge Chair', 'Washi Lamp', 'Platform Bed'];

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7A7A7A] pointer-events-none" />
        <input
          id="global-search-input"
          type="text"
          value={query}
          onChange={e => handleSearchChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search pieces, materials, styles..."
          className="w-full bg-[#F5F5F5] border-none text-[#1A1A1A] placeholder:text-[#7A7A7A] text-xs pl-9 pr-8 py-2.5 rounded-sm focus:ring-1 focus:ring-[#A08C75] transition-all outline-none"
        />
        {query && (
          <button
            id="clear-search-btn"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#1A1A1A] p-0.5 rounded-sm"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="search-autocomplete-dropdown"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E4E2] rounded-sm shadow-xl p-4 z-50 overflow-hidden"
          >
            {/* If query has matches */}
            {query.trim().length > 0 ? (
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E4E2] mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75]">
                    Matching Pieces ({matchingProducts.length})
                  </span>
                  <button
                    id="view-all-results-btn"
                    onClick={() => {
                      setIsOpen(false);
                      onCloseMobile?.();
                    }}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] hover:text-[#A08C75] flex items-center gap-1 border-b border-[#1A1A1A]"
                  >
                    View in gallery <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {matchingProducts.map(product => (
                      <div
                        key={product.id}
                        id={`search-item-${product.id}`}
                        onClick={() => {
                          openProductDetail(product.id);
                          setIsOpen(false);
                          onCloseMobile?.();
                        }}
                        className="flex items-center gap-3 p-2 rounded-sm hover:bg-[#F5F5F5] cursor-pointer group transition-colors border border-transparent hover:border-[#E5E4E2]"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-sm object-cover bg-[#F5F5F5] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#A08C75] truncate transition-colors font-serif italic">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-[#7A7A7A] truncate">
                            {product.materials.join(' · ')}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#1A1A1A]">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-xs text-[#7A7A7A]">No exact pieces found for "{query}".</p>
                    <button
                      id="search-ai-recommend-btn"
                      onClick={() => {
                        setIsAIStylistOpen(true);
                        setIsOpen(false);
                        onCloseMobile?.();
                      }}
                      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#FAF9F6] text-[10px] uppercase tracking-wider font-bold text-[#A08C75] border border-[#E5E4E2] hover:bg-[#F5F2ED] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#A08C75]" /> Ask AI Stylist for recommendations
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A08C75] block mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {popularKeywords.map(keyword => (
                    <button
                      key={keyword}
                      id={`popular-keyword-${keyword.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => {
                        handleSearchChange(keyword);
                        setIsOpen(false);
                        onCloseMobile?.();
                      }}
                      className="px-3 py-1 text-[10px] uppercase font-bold rounded-full border border-[#E5E4E2] bg-white text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E5E4E2] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-[#7A7A7A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#A08C75]" />
                    <span>Looking for specific room advice?</span>
                  </div>
                  <button
                    id="search-ai-stylist-shortcut"
                    onClick={() => {
                      setIsAIStylistOpen(true);
                      setIsOpen(false);
                      onCloseMobile?.();
                    }}
                    className="text-[10px] uppercase tracking-wider font-bold text-[#A08C75] hover:text-[#1A1A1A] border-b border-[#A08C75]"
                  >
                    Launch AI Stylist →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
