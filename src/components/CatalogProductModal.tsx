import React, { useState } from 'react';
import { CatalogProduct } from '../data/catalogTypes';
import { CatalogSchematicView } from './CatalogSchematicView';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Sparkles,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  Ruler,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Palette,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogProductModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
  onSelectProduct?: (product: CatalogProduct) => void;
  allProducts: CatalogProduct[];
}

export const CatalogProductModal: React.FC<CatalogProductModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  allProducts,
}) => {
  const { language } = useLanguage();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'schematic' | 'quote'>('specs');

  // Customer quote form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!product) return null;

  const currentIndex = allProducts.findIndex(p => p.id === product.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allProducts.length - 1;

  const handlePrev = () => {
    if (hasPrev && onSelectProduct) {
      onSelectProduct(allProducts[currentIndex - 1]);
      setSelectedColorIndex(0);
      setQuoteSuccess(false);
    }
  };

  const handleNext = () => {
    if (hasNext && onSelectProduct) {
      onSelectProduct(allProducts[currentIndex + 1]);
      setSelectedColorIndex(0);
      setQuoteSuccess(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#catalogo-sku-${product.sku.replace('#', '')}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    // WhatsApp direct message composition
    const color = product.colors[selectedColorIndex]?.namePt || 'Padrão';
    const message = encodeURIComponent(
      `Olá SARVIC! Tenho interesse no sofá do catálogo:\n- Modelo: ${product.name} (${product.sku})\n- Pág. do Catálogo: ${product.pageNumber}\n- Cor selecionada: ${color}\n- Cliente: ${customerName}\n- Telefone: ${customerPhone}\n- E-mail: ${customerEmail}\n- Obs: ${customerNotes}`
    );
    window.open(`https://wa.me/258849201842?text=${message}`, '_blank');
  };



  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative bg-white w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden border border-[#BAE6FD] flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="bg-[#F0F9FF] border-b border-[#BAE6FD] px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-xs text-[10px] uppercase font-bold tracking-widest bg-[#0284C7] text-white">
              {product.sku}
            </span>
            <span className="text-xs font-semibold text-[#0C4A6E] hidden sm:inline">
              Página {product.pageNumber} de 154 · {product.categoryLabelPt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Static Photo Indicator (No Carousel) */}
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] rounded-xs">
              Foto {currentIndex + 1} de {allProducts.length}
            </span>

            <button
              onClick={handleCopyLink}
              className="p-2 text-[#0C4A6E] hover:text-[#0284C7] hover:bg-white rounded-xs transition-colors"
              title="Copiar link do produto"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#64748B] hover:text-black hover:bg-white rounded-xs transition-colors"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            
            {/* Left Column: Visual Stage & CAD Blueprint */}
            <div className="lg:col-span-7 space-y-4">
              {/* Product Hero Image */}
              <div className="relative aspect-[16/10] bg-[#0C4A6E]/5 rounded-xs border border-[#E0F2FE] overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.seoTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Original Page Badge */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white px-3 py-1 rounded-xs text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>Catálogo Original: Pág. {product.pageNumber}</span>
                </div>

                {/* Mechanism / Upholstery Badge */}
                <div className="absolute top-3 right-3 bg-[#0284C7] text-white px-2.5 py-1 rounded-xs text-[10px] uppercase font-bold tracking-wider shadow-sm">
                  {product.mechanism}
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="bg-[#F8FAFC] border border-[#E0F2FE] p-4 rounded-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0C4A6E] uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Cores Disponíveis do Catálogo ({product.colors.length}):</span>
                  </span>
                  <span className="text-[11px] font-medium text-[#0284C7]">
                    {product.colors[selectedColorIndex]?.namePt} {product.colors[selectedColorIndex]?.chineseName ? `(${product.colors[selectedColorIndex].chineseName})` : ''}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xs border text-xs transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#0284C7] bg-[#E0F2FE] text-[#0C4A6E] font-bold shadow-xs'
                          : 'border-[#CBD5E1] bg-white text-[#64748B] hover:border-[#0284C7]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.namePt}</span>
                      {c.chineseName && <span className="text-[9px] text-[#94A3B8]">({c.chineseName})</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive CAD Schematic View */}
              <CatalogSchematicView product={product} />
            </div>

            {/* Right Column: Information, Specs & Quote Dispatch */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Product Title & Category */}
              <div className="space-y-1.5 border-b border-[#E0F2FE] pb-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                  <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>{product.categoryLabelPt} · {product.subCategory}</span>
                </div>
                <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#0C4A6E]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#64748B] font-light leading-relaxed">
                  {language === 'pt' ? product.shortDescriptionPt : product.shortDescriptionEn}
                </p>
              </div>

              {/* Navigation Tabs (Specs, CAD Schematic, Cotação) */}
              <div className="flex border-b border-[#E0F2FE] text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-3 border-b-2 transition-all ${
                    activeTab === 'specs'
                      ? 'border-[#0284C7] text-[#0284C7]'
                      : 'border-transparent text-[#64748B] hover:text-[#0C4A6E]'
                  }`}
                >
                  Ficha Técnica
                </button>
                <button
                  onClick={() => setActiveTab('quote')}
                  className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'quote'
                      ? 'border-[#0284C7] text-[#0284C7]'
                      : 'border-transparent text-[#64748B] hover:text-[#0C4A6E]'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pedir Orçamento</span>
                </button>
              </div>

              {/* Tab Content 1: Technical Specs */}
              {activeTab === 'specs' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Detailed Description */}
                  <div className="text-xs text-[#475569] leading-relaxed font-light">
                    {language === 'pt' ? product.fullDescriptionPt : product.fullDescriptionEn}
                  </div>

                  {/* Smart Features Bullets */}
                  {product.smartFeatures && product.smartFeatures.length > 0 && (
                    <div className="p-3.5 rounded-xs bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
                      <div className="text-[10px] uppercase tracking-wider font-bold text-[#0284C7] flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Tecnologia & Recursos Integrados:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#0C4A6E]">
                        {product.smartFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technical Table */}
                  <div className="border border-[#E0F2FE] rounded-xs overflow-hidden text-xs">
                    <div className="bg-[#F8FAFC] px-3.5 py-2 font-bold text-[#0C4A6E] uppercase tracking-wider text-[10px] border-b border-[#E0F2FE]">
                      Especificações de Engenharia
                    </div>
                    <div className="divide-y divide-[#E0F2FE]">
                      <div className="grid grid-cols-3 px-3.5 py-2 bg-white">
                        <span className="text-[#64748B] font-medium">Revestimento:</span>
                        <span className="col-span-2 text-[#0C4A6E] font-semibold">{product.upholstery}</span>
                      </div>
                      <div className="grid grid-cols-3 px-3.5 py-2 bg-[#F8FAFC]/50">
                        <span className="text-[#64748B] font-medium">Estrutura Interna:</span>
                        <span className="col-span-2 text-[#0C4A6E]">{product.frame}</span>
                      </div>
                      <div className="grid grid-cols-3 px-3.5 py-2 bg-white">
                        <span className="text-[#64748B] font-medium">Densidade Espuma:</span>
                        <span className="col-span-2 text-[#0C4A6E]">{product.cushionFoam}</span>
                      </div>
                      <div className="grid grid-cols-3 px-3.5 py-2 bg-[#F8FAFC]/50">
                        <span className="text-[#64748B] font-medium">Mecanismo:</span>
                        <span className="col-span-2 text-[#0C4A6E] font-semibold">{product.mechanism}</span>
                      </div>
                      <div className="grid grid-cols-3 px-3.5 py-2 bg-white">
                        <span className="text-[#64748B] font-medium">Garantia SARVIC:</span>
                        <span className="col-span-2 text-emerald-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>5 Anos Estrutural + 3 Anos Mecanismos</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Fast Quote & View CAD */}
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                    <button
                      onClick={() => setActiveTab('quote')}
                      className="w-full sm:flex-1 py-3 px-4 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir Orçamento em 1 Clique</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('schematic')}
                      className="w-full sm:w-auto py-3 px-4 rounded-sm border border-[#BAE6FD] hover:border-[#0284C7] bg-[#F0F9FF] text-[#0284C7] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      title="Ver Esquema Técnico CAD"
                    >
                      <Ruler className="w-4 h-4" />
                      <span>Ver Esquema CAD</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Quote Dispatcher Form */}
              {activeTab === 'quote' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-xs bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#0C4A6E]">
                    <div className="font-bold flex items-center gap-1.5 text-[#0284C7]">
                      <Sparkles className="w-4 h-4" />
                      <span>Cotação Direta de Fábrica · Modelo {product.sku}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">
                      Envie o seu pedido diretamente para a equipa comercial da SARVIC (<strong>bestfurniture79@gmail.com</strong> e WhatsApp). Respondemos em até 2 horas com catálogo técnico, prazos e condições de entrega em Moçambique.
                    </p>
                  </div>

                  {quoteSuccess ? (
                    <div className="p-5 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2 text-center animate-in zoom-in-95">
                      <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm">Pedido Enviado com Sucesso!</h4>
                      <p className="text-[11px] text-emerald-700">
                        O seu pedido referente ao modelo <strong>{product.sku}</strong> ({product.colors[selectedColorIndex]?.namePt}) foi transmitido para a nossa equipa. Entraremos em contacto de imediato.
                      </p>
                      <button
                        onClick={() => setQuoteSuccess(false)}
                        className="mt-2 text-xs font-bold text-[#0284C7] underline"
                      >
                        Enviar outro pedido
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendQuote} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#0C4A6E] uppercase tracking-wider mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="Ex: Dr. Carlos Tembe"
                          className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-xs focus:outline-none focus:border-[#0284C7] bg-white text-[#0F172A]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-[#0C4A6E] uppercase tracking-wider mb-1">
                            WhatsApp / Telemóvel *
                          </label>
                          <input
                            type="tel"
                            required
                            value={customerPhone}
                            onChange={e => setCustomerPhone(e.target.value)}
                            placeholder="+258 84..."
                            className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-xs focus:outline-none focus:border-[#0284C7] bg-white text-[#0F172A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#0C4A6E] uppercase tracking-wider mb-1">
                            E-mail Comercial
                          </label>
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={e => setCustomerEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-xs focus:outline-none focus:border-[#0284C7] bg-white text-[#0F172A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#0C4A6E] uppercase tracking-wider mb-1">
                          Observações / Medidas da Sala
                        </label>
                        <textarea
                          rows={2}
                          value={customerNotes}
                          onChange={e => setCustomerNotes(e.target.value)}
                          placeholder="Ex: Gostaria da chaise virada para o lado direito e cotação para Maputo..."
                          className="w-full px-3 py-2 text-xs border border-[#CBD5E1] rounded-xs focus:outline-none focus:border-[#0284C7] bg-white text-[#0F172A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enviar via WhatsApp (+258 84 920 1842)</span>
                      </button>

                      <div className="text-[10px] text-center text-[#64748B]">
                        Envio seguro com cópia direta para <strong>bestfurniture79@gmail.com</strong>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Direct Store Contact Footer */}
              <div className="pt-3 border-t border-[#E0F2FE] text-[11px] text-[#64748B] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>+258 84 920 1842</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>bestfurniture79@gmail.com</span>
                </span>
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
