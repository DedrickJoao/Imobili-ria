import React, { useState } from 'react';
import { CatalogItem } from '../data/catalogs';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  CheckCircle2,
  BookOpen,
  Share2,
  FileText,
  Sparkles,
  Printer,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogViewerModalProps {
  catalog: CatalogItem | null;
  onClose: () => void;
  onRequestQuote?: () => void;
}

export const CatalogViewerModal: React.FC<CatalogViewerModalProps> = ({
  catalog,
  onClose,
  onRequestQuote,
}) => {
  const { language } = useLanguage();
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!catalog) return null;

  const currentSpread = catalog.spreads[currentSpreadIndex] || catalog.spreads[0];
  const totalSpreads = catalog.spreads.length;

  const handlePrev = () => {
    setCurrentSpreadIndex(prev => (prev > 0 ? prev - 1 : totalSpreads - 1));
  };

  const handleNext = () => {
    setCurrentSpreadIndex(prev => (prev < totalSpreads - 1 ? prev + 1 : 0));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Create a clean printable brochure document and trigger download
    try {
      const content = `
SARVIC — CATÁLOGO OFICIAL 2026
==================================================
Edição: ${catalog.title} (${catalog.volume})
Ano: ${catalog.year} · Páginas: ${catalog.pagesCount}
Contacto Comercial: bestfurniture79@gmail.com
WhatsApp: +258 84 920 1842
Localização: Maputo, Moçambique

DESTAQUES DO CATÁLOGO:
${catalog.spreads.map((s, idx) => `
[Página ${idx + 1}] ${s.title}
${s.subtitle}
Editorial: ${s.editorial}
Peças em Destaque:
${s.featuredItems.map(item => `  - ${item.name} (${item.category}): ${item.material} [${item.dimensions}]`).join('\n')}
`).join('\n')}

==================================================
SARVIC · Arquitetura & Mobiliário Fino
Todos os direitos reservados. Solicite orçamentos personalizados via bestfurniture79@gmail.com
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
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsEmailSent(true);
    setTimeout(() => {
      setIsEmailSent(false);
      setEmailInput('');
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-6xl bg-white rounded-sm shadow-2xl border border-[#CBD5E1] overflow-hidden my-auto max-h-[95vh] flex flex-col text-[#0F172A]"
      >
        {/* Top Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <BrandLogo variant="dark" size="sm" showTagline={false} />
            <div className="hidden sm:block h-4 w-px bg-[#CBD5E1]" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2563EB] block">
                {catalog.volume} · {catalog.year}
              </span>
              <h3 className="font-serif italic font-bold text-xs sm:text-sm text-[#0B192C] truncate max-w-xs sm:max-w-md">
                {catalog.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] text-xs font-bold uppercase tracking-wider text-[#0F172A] transition-colors"
              title="Download Catalog Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isDownloading ? (language === 'pt' ? 'Descarregando...' : 'Downloading...') : (language === 'pt' ? 'Baixar PDF' : 'Download PDF')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xs text-[#0F172A] hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0] transition-colors"
              aria-label="Close catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Catalog Body / Spread Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 bg-[#F8FAFC]">
          {/* Main Visual Spread */}
          <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Left / Editorial Column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#FFFFFF]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-xs border border-[#BAE6FD]">
                      {language === 'pt' ? 'Página' : 'Page'} {currentSpread.pageNumber} / {totalSpreads}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                      {catalog.pagesCount} {language === 'pt' ? 'Páginas Totais' : 'Total Pages'}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">
                      {currentSpread.subtitle}
                    </span>
                    <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E] leading-snug">
                      {currentSpread.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                    {currentSpread.editorial}
                  </p>

                  {/* Featured Items on this page */}
                  <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B192C]">
                      {language === 'pt' ? 'Peças em Destaque nesta Edição' : 'Featured Pieces in this Spread'}
                    </h4>
                    <div className="space-y-2">
                      {currentSpread.featuredItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xs bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold text-[#0B192C]">
                            <span>{item.name}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-xs bg-[#EFF6FF] text-[#1D4ED8] font-mono">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748B] flex items-center justify-between">
                            <span>{item.material}</span>
                            <span className="font-mono text-[10px]">{item.dimensions}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestQuote?.();
                    }}
                    className="flex-1 py-3 px-4 rounded-xs bg-[#0B192C] hover:bg-[#1E3A8A] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>{language === 'pt' ? 'Consultar Preço & Orçamento' : 'Check Price & Request Quote'}</span>
                  </button>
                </div>
              </div>

              {/* Right / High-Res Photograph Column (7 cols) */}
              <div className="lg:col-span-7 relative bg-[#0B192C] overflow-hidden flex items-center justify-center min-h-[380px] lg:min-h-[500px]">
                <img
                  src={currentSpread.image}
                  alt={currentSpread.title}
                  className="w-full h-full object-cover object-center transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                    <span className="font-medium text-[11px]">
                      SARVIC · {catalog.title}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                    ED. {catalog.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Dispatch Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xs bg-white border border-[#E0F2FE]">
            {/* Page flip buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xs border border-[#E0F2FE] hover:bg-[#F0F9FF] text-[#0C4A6E] transition-colors flex items-center gap-1 text-xs font-bold"
                aria-label="Previous spread"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'pt' ? 'Anterior' : 'Previous'}</span>
              </button>

              <div className="flex items-center gap-1 px-3">
                {catalog.spreads.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSpreadIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSpreadIndex === idx
                        ? 'w-6 bg-[#0284C7]'
                        : 'w-2 bg-[#BAE6FD] hover:bg-[#38BDF8]'
                    }`}
                    title={`Página ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-xs border border-[#E0F2FE] hover:bg-[#F0F9FF] text-[#0C4A6E] transition-colors flex items-center gap-1 text-xs font-bold"
                aria-label="Next spread"
              >
                <span className="hidden sm:inline">{language === 'pt' ? 'Seguinte' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Email dispatch box */}
            <div className="w-full md:w-auto">
              {isEmailSent ? (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xs border border-emerald-200 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    {language === 'pt'
                      ? 'Catálogo enviado com sucesso para o seu e-mail!'
                      : 'Catalog successfully dispatched to your email!'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSendEmail} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="w-48 sm:w-60 bg-[#F8FAFC] border border-[#BAE6FD] rounded-xs px-3 py-2 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xs bg-[#0284C7] hover:bg-[#0369A1] text-white text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Receber no E-mail' : 'Send to Email'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
