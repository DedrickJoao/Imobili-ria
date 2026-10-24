import React, { useState } from 'react';
import { CatalogItem } from '../data/catalogs';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';
import {
  X,
  Mail,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Eye,
  MessageCircle,
  Ruler,
  Layers,
  Cpu,
} from 'lucide-react';
import { motion } from 'motion/react';

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
  const [emailInput, setEmailInput] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  if (!catalog) return null;

  const currentSpread = catalog.spreads[0];

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsEmailSent(true);
    setTimeout(() => {
      setIsEmailSent(false);
      setEmailInput('');
    }, 4500);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá SARVIC! Gostaria de consultar detalhes e cotação oficial sobre o ${catalog.title} (Código: ${catalog.sku || catalog.volume}).`
    );
    window.open(`https://wa.me/258841234567?text=${text}`, '_blank');
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
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0284C7] block">
                {catalog.volume} · {catalog.pageRange} · Foto Individual
              </span>
              <h3 className="font-serif italic font-bold text-xs sm:text-sm text-[#0C4A6E] truncate max-w-xs sm:max-w-md">
                {catalog.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'pt' ? 'Visualização Individual' : 'Single Photo View'}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xs text-[#0F172A] hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0] transition-colors"
              aria-label="Close catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Catalog Body / Single Photo Spread Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 bg-[#F8FAFC]">
          {/* Main Visual Spread */}
          <div className="bg-white rounded-xs border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
              
              {/* Left / Editorial & Technical Specs Column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-[#FFFFFF]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-xs border border-[#BAE6FD]">
                      {catalog.badge}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider font-mono">
                      CÓDIGO: {catalog.sku}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold block">
                      {catalog.subtitle}
                    </span>
                    <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0C4A6E] leading-snug">
                      {currentSpread?.title || catalog.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                    {currentSpread?.editorial || catalog.descriptionPt}
                  </p>

                  {/* Technical Highlights Box */}
                  <div className="p-3.5 rounded-xs bg-[#F0F9FF] border border-[#BAE6FD] space-y-2 text-xs">
                    {currentSpread?.dimensionsText && (
                      <div className="flex items-start gap-2 text-[11px]">
                        <Ruler className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0C4A6E]">Dimensões do Esquema: </span>
                          <span className="text-[#334155] font-mono">{currentSpread.dimensionsText}</span>
                        </div>
                      </div>
                    )}
                    {currentSpread?.upholsteryText && (
                      <div className="flex items-start gap-2 text-[11px]">
                        <Layers className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0C4A6E]">Revestimento: </span>
                          <span className="text-[#334155]">{currentSpread.upholsteryText}</span>
                        </div>
                      </div>
                    )}
                    {currentSpread?.mechanismText && (
                      <div className="flex items-start gap-2 text-[11px]">
                        <Cpu className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0C4A6E]">Mecanismo & Chassi: </span>
                          <span className="text-[#334155]">{currentSpread.mechanismText}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {catalog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-xs bg-[#F1F5F9] text-[#475569] text-[10px] font-medium uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onRequestQuote?.();
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xs bg-[#0B192C] hover:bg-[#1E3A8A] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                    <span>{language === 'pt' ? 'Consultar Orçamento' : 'Request Official Quote'}</span>
                  </button>

                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full sm:w-auto py-3 px-4 rounded-xs bg-[#25D366] hover:bg-[#20BA56] text-white text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Right / High-Res Photograph Column (7 cols) - Standalone Photo (No Carousel) */}
              <div className="lg:col-span-7 relative bg-[#0B192C] overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-[520px]">
                {catalog.coverImage ? (
                  <img
                    src={catalog.coverImage}
                    alt={catalog.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0C4A6E] to-[#0284C7] text-white">
                    <BookOpen className="w-16 h-16 text-[#38BDF8] mb-3" />
                    <span className="font-serif italic text-lg font-bold text-center">{catalog.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Technical schematic indicator badge on photo */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-xs text-white px-3 py-1 rounded-xs text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>{catalog.pageRange} · Esquema Técnico na Imagem</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                    <span className="font-medium text-[11px]">
                      SARVIC · {catalog.title}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-mono opacity-90 bg-white/20 px-2 py-0.5 rounded-xs">
                    ED. {catalog.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Direct Email Dispatch (No Carousel) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xs bg-white border border-[#E0F2FE]">
            <div className="text-xs text-[#0C4A6E] font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Foto individualizada oficial. Sem carrossel · Visualização nítida em alta definição.</span>
            </div>

            {/* Email dispatch box */}
            <div className="w-full md:w-auto">
              {isEmailSent ? (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xs border border-emerald-200 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    {language === 'pt'
                      ? 'Ficha técnica desta foto enviada para o seu e-mail!'
                      : 'Datasheet for this photo dispatched to your email!'}
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

export default CatalogViewerModal;
