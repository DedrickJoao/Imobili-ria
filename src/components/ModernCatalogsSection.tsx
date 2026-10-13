import React, { useState } from 'react';
import { MODERN_CATALOGS, CatalogItem } from '../data/catalogs';
import { CatalogViewerModal } from './CatalogViewerModal';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Download, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface ModernCatalogsSectionProps {
  onRequestQuote?: () => void;
}

export const ModernCatalogsSection: React.FC<ModernCatalogsSectionProps> = ({
  onRequestQuote,
}) => {
  const { language } = useLanguage();
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(null);

  const handleQuickDownload = (catalog: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const content = `
SARVIC — ${catalog.title.toUpperCase()}
==================================================
Edição: ${catalog.volume} · Ano: ${catalog.year} · Páginas: ${catalog.pagesCount}
Contacto Oficial: bestfurniture79@gmail.com
WhatsApp: +258 84 920 1842
Showroom & Ateliê: Maputo, Moçambique

Descrição:
${language === 'pt' ? catalog.descriptionPt : catalog.descriptionEn}

Peças e Séries Inclusas:
${catalog.spreads.flatMap(s => s.featuredItems.map(f => `- ${f.name} (${f.material})`)).join('\n')}

Preços & Orçamentos:
Todas as peças são fabricadas sob medida com condições especiais de fábrica.
Consulte o valor e prazos de entrega em bestfurniture79@gmail.com
==================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${catalog.id}-${catalog.year}-sarvic.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="catalogs-section" className="py-16 sm:py-20 bg-white border-t border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-[10px] uppercase font-bold tracking-[0.2em]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Edições & Publicações Digitais' : 'Digital Catalogs & Lookbooks'}</span>
            </div>
            <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C4A6E]">
              {language === 'pt' ? 'Catálogos SARVIC 2026' : 'SARVIC 2026 Modern Catalogs'}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl font-light leading-relaxed">
              {language === 'pt'
                ? 'Conheça em detalhe as nossas coleções residenciais, executivas e fichas técnicas de madeiras nobres através das nossas publicações digitais interativas.'
                : 'Browse our residential collections, executive suites, and hardwood specifications in high-definition interactive digital editions.'}
            </p>
          </div>

          <div className="text-xs text-[#0284C7] font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
            <span>{language === 'pt' ? '4 Volumes Disponíveis' : '4 Volumes Available'}</span>
          </div>
        </div>

        {/* Catalog Grid (4 Modern Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODERN_CATALOGS.map((catalog) => (
            <div
              key={catalog.id}
              onClick={() => setSelectedCatalog(catalog)}
              className="group bg-[#F8FAFC] rounded-xs border border-[#E0F2FE] hover:border-[#0284C7] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Cover Image Stage */}
              <div className="relative aspect-[4/3] bg-[#0C4A6E] overflow-hidden">
                <img
                  src={catalog.coverImage}
                  alt={catalog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0284C7] text-white shadow-xs">
                    {language === 'pt' ? catalog.badge : catalog.badgeEn}
                  </span>
                </div>

                {/* Volume Tag Bottom Left */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-200 block">
                    {catalog.volume} · {catalog.year}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {catalog.pagesCount} {language === 'pt' ? 'Páginas' : 'Pages'}
                  </span>
                </div>
              </div>

              {/* Content info */}
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

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E0F2FE] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCatalog(catalog)}
                    className="flex-1 py-2 px-2.5 rounded-xs bg-[#0284C7] hover:bg-[#0369A1] text-white text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Folhear Online' : 'Browse Online'}</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickDownload(catalog, e)}
                    className="p-2 rounded-xs border border-[#BAE6FD] hover:border-[#0284C7] text-[#0C4A6E] hover:text-[#0284C7] transition-colors"
                    title={language === 'pt' ? 'Baixar Ficha Técnica' : 'Download Spec Sheet'}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Catalog Viewer Modal */}
      {selectedCatalog && (
        <CatalogViewerModal
          catalog={selectedCatalog}
          onClose={() => setSelectedCatalog(null)}
          onRequestQuote={onRequestQuote}
        />
      )}
    </section>
  );
};
export default ModernCatalogsSection;
