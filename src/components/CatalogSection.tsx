import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS } from '../data/catalogProducts';
import { CATALOG_CATEGORIES, CatalogProduct } from '../data/catalogTypes';
import { MODERN_CATALOGS, CatalogItem } from '../data/catalogs';
import { CatalogProductModal } from './CatalogProductModal';
import { CatalogSchematicView } from './CatalogSchematicView';
import { CatalogViewerModal } from './CatalogViewerModal';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  SlidersHorizontal,
  X,
  BookOpen,
  Sparkles,
  Maximize2,
  Cpu,
  Layers,
  ArrowRight,
  Eye,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  FileSpreadsheet,
  Palette,
  FileText,
  Phone,
  Mail,
  ShieldCheck,
  Compass,
  Armchair,
  Users,
  Film,
  Award,
  MessageCircle,
  FolderOpen,
} from 'lucide-react';

interface CatalogSectionProps {
  onRequestQuote?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onRequestQuote }) => {
  const { language } = useLanguage();

  // Active filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('all');
  const [selectedMechanism, setSelectedMechanism] = useState<string>('all');
  const [selectedUpholstery, setSelectedUpholstery] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'photos' | 'grid' | 'table'>('photos');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  // Active Modal Product & Volume
  const [modalProduct, setModalProduct] = useState<CatalogProduct | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<CatalogItem | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Shape match
      if (selectedShape !== 'all' && product.layoutShape !== selectedShape) {
        return false;
      }

      // Mechanism match
      if (selectedMechanism !== 'all') {
        if (selectedMechanism === 'electric' && !product.mechanism.includes('Elétrico')) return false;
        if (selectedMechanism === 'manual' && !product.mechanism.includes('Manual')) return false;
        if (selectedMechanism === 'fixed' && !product.mechanism.includes('Fixo')) return false;
      }

      // Upholstery match
      if (selectedUpholstery !== 'all') {
        if (selectedUpholstery === 'nappa' && !product.upholstery.includes('Nappa')) return false;
        if (selectedUpholstery === 'top-grain' && !product.upholstery.includes('Top-Grain')) return false;
        if (selectedUpholstery === 'tech-fabric' && !product.upholstery.includes('Tecido Tecnológico')) return false;
        if (selectedUpholstery === 'boucle' && !product.upholstery.includes('Bouclé')) return false;
      }

      // Search match (SKU, Name, Tags, Colors, Dimensions)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.shortDescriptionPt.toLowerCase().includes(q) || product.shortDescriptionEn.toLowerCase().includes(q);
        const matchTags = product.tags.some(t => t.toLowerCase().includes(q));
        const matchColors = product.colors.some(c => c.namePt.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q));
        const matchPage = String(product.pageNumber).includes(q) || `página ${product.pageNumber}`.includes(q);

        if (!matchSku && !matchName && !matchDesc && !matchTags && !matchColors && !matchPage) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedShape, selectedMechanism, selectedUpholstery, searchQuery]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPagesCount = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedShape('all');
    setSelectedMechanism('all');
    setSelectedUpholstery('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <section id="master-catalog-section" className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#BAE6FD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Master Banner */}
        <div className="bg-gradient-to-r from-[#0C4A6E] via-[#0369A1] to-[#0284C7] text-white rounded-xs p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 pointer-events-none transform skew-x-12" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[#BAE6FD] text-[10px] uppercase font-bold tracking-[0.25em]">
              <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{language === 'pt' ? 'Área de Catálogos SARVIC' : 'SARVIC Catalogs Hub'}</span>
            </div>
            
            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {language === 'pt' ? 'Catálogos Oficiais SARVIC' : 'Official SARVIC Catalogs'}
            </h1>

            <p className="text-xs sm:text-sm text-[#E0F2FE] font-light leading-relaxed max-w-2xl">
              {language === 'pt'
                ? 'Coleção oficial de estofados contemporâneos em couro genuíno. Explore modelos seccionais em L, reclináveis elétricos inteligentes e conjuntos de living com especificações técnicas completas e visualização online.'
                : 'Official contemporary genuine leather upholstery collection. Explore L-shaped sectionals, smart power recliners, and architectural living suites with full technical specifications and online viewing.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#BAE6FD]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span>{language === 'pt' ? `${CATALOG_PRODUCTS.length} Modelos Oficiais` : `${CATALOG_PRODUCTS.length} Official Models`}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span>{language === 'pt' ? `${MODERN_CATALOGS.length} Volumes do Catálogo` : `${MODERN_CATALOGS.length} Catalog Volumes`}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{language === 'pt' ? 'Visualização Online Ativa' : 'Online Viewing Active'}</span>
              </span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setViewMode('photos')}
                className={`px-4 py-2.5 rounded-sm transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs ${
                  viewMode === 'photos'
                    ? 'bg-white text-[#0C4A6E]'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <FolderOpen className="w-4 h-4 text-[#0284C7]" />
                <span>{language === 'pt' ? 'Fotos Separadas (1 por 1)' : 'Separated Photos (1 by 1)'}</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2.5 rounded-sm transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0C4A6E]'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4 text-[#38BDF8]" />
                <span>{language === 'pt' ? 'Modelos & Filtros Dinâmicos' : 'Models & Dynamic Filters'}</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2.5 rounded-sm transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs ${
                  viewMode === 'table'
                    ? 'bg-white text-[#0C4A6E]'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[#38BDF8]" />
                <span>{language === 'pt' ? 'Tabela Técnica de Medidas CAD' : 'CAD Technical Specs Table'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Horizontal Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#0C4A6E] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-[#0284C7]">
              <Layers className="w-4 h-4" />
              <span>Navegar por Categoria do Catálogo:</span>
            </span>
            <span className="text-[#64748B] text-[11px] font-normal">
              Mostrando {filteredProducts.length} modelos encontrados
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-xs border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-sm'
                      : 'bg-white text-[#475569] border-[#E0F2FE] hover:border-[#0284C7] hover:text-[#0C4A6E]'
                  }`}
                >
                  <span>{cat.labelPt}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F0F9FF] text-[#0284C7]'
                    }`}
                  >
                    {cat.id === 'all'
                      ? CATALOG_PRODUCTS.length
                      : CATALOG_PRODUCTS.filter(p => p.category === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Dynamic Filter Controls Bar */}
        <div className="bg-white border border-[#BAE6FD] p-4 sm:p-5 rounded-xs shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#0284C7] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Pesquisar por Código/SKU (ex: 8867#, 1153B#, 95837#), cor, medidas..."
                className="w-full pl-9 pr-8 py-2.5 text-xs border border-[#CBD5E1] rounded-xs bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#0284C7] text-[#0F172A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Shape Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedShape}
                onChange={(e) => {
                  setSelectedShape(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs border border-[#CBD5E1] rounded-xs bg-[#F8FAFC] text-[#0C4A6E] focus:outline-none focus:border-[#0284C7] font-medium"
              >
                <option value="all">Formato: Todos</option>
                <option value="linear">Linear Reto</option>
                <option value="chaise-l">Canto em L (Chaise)</option>
                <option value="u-shape">Formato em U</option>
                <option value="curved">Curvo / Meia-Lua</option>
                <option value="suite-321">Conjunto 3+2+1</option>
                <option value="cinema-row">Fileira Cinema</option>
              </select>
            </div>

            {/* Mechanism Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedMechanism}
                onChange={(e) => {
                  setSelectedMechanism(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2.5 text-xs border border-[#CBD5E1] rounded-xs bg-[#F8FAFC] text-[#0C4A6E] focus:outline-none focus:border-[#0284C7] font-medium"
              >
                <option value="all">Mecanismo: Todos</option>
                <option value="electric">Elétrico Motorizado OKIN</option>
                <option value="manual">Manual com Catraca</option>
                <option value="fixed">Fixo Estrutural</option>
              </select>
            </div>

            {/* View Mode & Reset Controls */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <div className="flex items-center border border-[#BAE6FD] rounded-xs overflow-hidden bg-[#F0F9FF]">
                <button
                  onClick={() => setViewMode('photos')}
                  className={`px-2.5 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    viewMode === 'photos' ? 'bg-[#0284C7] text-white' : 'text-[#0C4A6E] hover:bg-white'
                  }`}
                  title="Fotos Individuais Separadas (1 por 1)"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden xl:inline">9 Fotos</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    viewMode === 'grid' ? 'bg-[#0284C7] text-white' : 'text-[#0C4A6E] hover:bg-white'
                  }`}
                  title="Modo Grade com Fotos e Filtros"
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden xl:inline">Modelos</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    viewMode === 'table' ? 'bg-[#0284C7] text-white' : 'text-[#0C4A6E] hover:bg-white'
                  }`}
                  title="Modo Tabela Técnica de Engenharia CAD"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden xl:inline">Tabela CAD</span>
                </button>
              </div>

              {(searchQuery || selectedCategory !== 'all' || selectedShape !== 'all' || selectedMechanism !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-2 text-xs text-[#0284C7] hover:text-[#0C4A6E] font-semibold underline whitespace-nowrap"
                >
                  Limpar
                </button>
              )}
            </div>

          </div>
        </div>

        {/* =========================================================================
            VIEW MODE 0: 9 SEPARATED INDIVIDUAL CATALOG PHOTOS (No Carousel)
        ========================================================================= */}
        {viewMode === 'photos' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xs border border-[#BAE6FD]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
                  <span>{language === 'pt' ? 'Catálogo Separado Foto por Foto' : 'Catalog Separated Photo by Photo'}</span>
                </div>
                <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E]">
                  {language === 'pt' ? `${MODERN_CATALOGS.length} Fotos Oficiais Separadas (Sem Carrossel)` : `${MODERN_CATALOGS.length} Official Separated Photos (No Carousel)`}
                </h3>
              </div>
              <div className="text-xs text-[#64748B] flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{language === 'pt' ? 'Cada foto com sua própria ficha · Visualização individual' : 'Each photo with its own card · Individual view'}</span>
              </div>
            </div>

            {MODERN_CATALOGS.length === 0 ? (
              <div className="bg-white rounded-xs border-2 border-dashed border-[#CBD5E1] p-10 sm:p-14 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h4 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E]">
                    {language === 'pt' ? 'Fotos em Processamento' : 'Photos Processing'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    {language === 'pt'
                      ? 'Nenhuma foto carregada no momento.'
                      : 'No photos loaded at this moment.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODERN_CATALOGS.map((catalog) => (
                  <div
                    key={catalog.id}
                    onClick={() => setSelectedVolume(catalog)}
                    className="group bg-white rounded-xs border border-[#E0F2FE] hover:border-[#0284C7] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    {/* Cover Stage */}
                    <div className="relative aspect-[4/3] bg-[#0C4A6E] overflow-hidden flex items-center justify-center">
                      <img
                        src={catalog.coverImage}
                        alt={catalog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Badge Top Left */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0284C7] text-white shadow-xs">
                          {catalog.badge}
                        </span>
                      </div>

                      {/* SKU Top Right */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs">
                          {catalog.sku}
                        </span>
                      </div>

                      {/* Volume & Pages Bottom Left */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#BAE6FD] block">
                          {catalog.volume} · {catalog.pageRange}
                        </span>
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {catalog.subtitle}
                        </span>
                      </div>

                      {/* Quick View Button on Hover */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-2 rounded-xs bg-white text-[#0C4A6E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <Eye className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>Ver Foto & Ficha</span>
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                      <div className="space-y-1.5">
                        <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#0C4A6E] group-hover:text-[#0284C7] transition-colors line-clamp-2">
                          {catalog.title}
                        </h3>
                        <p className="text-[11px] text-[#64748B] line-clamp-2 font-light leading-relaxed">
                          {language === 'pt' ? catalog.descriptionPt : catalog.descriptionEn}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {catalog.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded-xs bg-[#F0F9FF] text-[#0369A1] text-[9px] uppercase tracking-wider font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action: Visualizar Foto Individual */}
                      <div className="pt-3 border-t border-[#E0F2FE]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVolume(catalog);
                          }}
                          className="w-full py-2.5 px-3 rounded-xs bg-[#0284C7] hover:bg-[#0369A1] text-white text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'pt' ? 'Visualizar Foto Individual' : 'View Single Photo'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 1: GRID VIEW (Responsive Product Cards)
        ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-xs border-2 border-dashed border-[#CBD5E1] p-10 sm:p-14 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                  <Grid3X3 className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h4 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E]">
                    {language === 'pt' ? 'Modelos Anteriores Removidos' : 'Previous Models Removed'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    {language === 'pt'
                      ? 'Todos os modelos e imagens anteriores foram removidos. Estamos prontos para adicionar os novos modelos do catálogo.'
                      : 'All previous models and images have been removed. Ready to add the new catalog models.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setModalProduct(product)}
                    className="group bg-white rounded-xs border border-[#E0F2FE] hover:border-[#0284C7] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    {/* Top Image Stage */}
                    <div className="relative aspect-[4/3] bg-[#0C4A6E]/5 overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.seoTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-[#0C4A6E]">
                          <Armchair className="w-8 h-8 text-[#0284C7] mb-1" />
                          <span className="text-[10px] font-mono font-bold">{product.sku}</span>
                        </div>
                      )}

                    {/* SKU Badge Top Left */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#0284C7] text-white shadow-xs">
                        {product.sku}
                      </span>
                    </div>

                    {/* Original Page Pill Top Right */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-mono font-semibold bg-black/70 text-white backdrop-blur-xs">
                        Pág. {product.pageNumber}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-2 rounded-xs bg-white text-[#0C4A6E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>Ficha Técnica & CAD</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[#0284C7]">
                        {product.categoryLabelPt}
                      </div>
                      <h3 className="font-serif italic text-base sm:text-lg font-bold text-[#0C4A6E] group-hover:text-[#0284C7] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#64748B] font-light line-clamp-2 leading-relaxed">
                        {language === 'pt' ? product.shortDescriptionPt : product.shortDescriptionEn}
                      </p>
                    </div>

                    {/* Dimensions Pill & CAD summary */}
                    <div className="pt-2 border-t border-[#F1F5F9] space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#64748B]">Comprimento:</span>
                        <span className="font-mono font-bold text-[#0C4A6E] bg-[#F0F9FF] px-1.5 py-0.5 rounded-xs border border-[#BAE6FD]/60">
                          {product.dimensions.totalWidthCm} cm
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#64748B]">Revestimento:</span>
                        <span className="text-[#0369A1] font-semibold truncate max-w-[150px]">
                          {product.upholstery}
                        </span>
                      </div>

                      {/* Colors Dot Swatches */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#64748B]">{product.colors.length} cores:</span>
                        <div className="flex items-center -space-x-1">
                          {product.colors.slice(0, 4).map((c, idx) => (
                            <span
                              key={idx}
                              title={c.namePt}
                              className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-[9px] text-[#0284C7] pl-1 font-bold">
                              +{product.colors.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProduct(product);
                        }}
                        className="w-full py-2 px-3 rounded-xs bg-[#F0F9FF] hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-[#BAE6FD] hover:border-[#0284C7] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar Cotação & Medidas</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Pagination Controls */}
            {totalPagesCount > 1 && (
              <div className="flex items-center justify-between border-t border-[#E0F2FE] pt-6">
                <div className="text-xs text-[#64748B]">
                  Mostrando <span className="font-bold text-[#0C4A6E]">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                  <span className="font-bold text-[#0C4A6E]">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{' '}
                  de <span className="font-bold text-[#0C4A6E]">{totalItems}</span> modelos
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-[#CBD5E1] rounded-xs text-[#0C4A6E] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Página Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xs text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-[#0284C7] text-white shadow-xs'
                          : 'bg-white border border-[#E0F2FE] text-[#0C4A6E] hover:border-[#0284C7]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPagesCount))}
                    disabled={currentPage === totalPagesCount}
                    className="p-2 border border-[#CBD5E1] rounded-xs text-[#0C4A6E] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Próxima Página"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 2: TECHNICAL DATA TABLE VIEW
        ========================================================================= */}
        {viewMode === 'table' && (
          <div className="bg-white border border-[#BAE6FD] rounded-xs overflow-hidden shadow-xs">
            {filteredProducts.length === 0 ? (
              <div className="p-10 sm:p-14 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h4 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E]">
                    {language === 'pt' ? 'Tabela Técnica Pronta para Importação' : 'Technical Table Ready for Import'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-light">
                    {language === 'pt'
                      ? 'A tabela técnica está limpa e será preenchida com as especificações dos novos catálogos.'
                      : 'The technical table is clear and will be filled with specs from the new catalogs.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F0F9FF] border-b border-[#BAE6FD] text-[10px] uppercase font-bold text-[#0369A1] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Pág.</th>
                      <th className="py-3 px-4">Código/SKU</th>
                      <th className="py-3 px-4">Nome do Modelo</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Dimensões (LxPxA)</th>
                      <th className="py-3 px-4">Mecanismo</th>
                      <th className="py-3 px-4">Revestimento</th>
                      <th className="py-3 px-4">Cores</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0F2FE] text-[#0C4A6E]">
                    {filteredProducts.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => setModalProduct(p)}
                        className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-[#0284C7]">
                          Pág. {p.pageNumber}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          <span className="bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-xs">
                            {p.sku}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-serif font-bold text-[#0C4A6E]">
                          {p.name}
                        </td>
                        <td className="py-3 px-4 text-[#64748B]">
                          {p.categoryLabelPt}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {p.dimensions.totalWidthCm} × {p.dimensions.depthCm} × {p.dimensions.heightCm} cm
                          {p.dimensions.chaiseDepthCm ? ` (Chaise ${p.dimensions.chaiseDepthCm}cm)` : ''}
                        </td>
                        <td className="py-3 px-4 font-medium text-[#0369A1]">
                          {p.mechanism}
                        </td>
                        <td className="py-3 px-4 text-[#475569]">
                          {p.upholstery}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center -space-x-1">
                            {p.colors.map((c, i) => (
                              <span
                                key={i}
                                title={c.namePt}
                                className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalProduct(p);
                            }}
                            className="px-2.5 py-1 rounded-xs bg-[#0284C7] text-white hover:bg-[#0369A1] font-bold text-[10px] uppercase tracking-wider"
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}



      </div>

      {/* Global Product Detail Modal */}
      <CatalogProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onSelectProduct={(p) => setModalProduct(p)}
        allProducts={filteredProducts}
      />

      {/* Interactive Volume Viewer Modal */}
      {selectedVolume && (
        <CatalogViewerModal
          catalog={selectedVolume}
          onClose={() => setSelectedVolume(null)}
          onRequestQuote={onRequestQuote}
        />
      )}
    </section>
  );
};

export default CatalogSection;
