import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { AIStylistRecommendation } from '../types';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  ShoppingBag,
  MessageSquare,
  Wand2,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AIStylistModalContent: React.FC = () => {
  const {
    setIsAIStylistOpen,
    aiContextProduct,
    recentlyViewed,
    products,
    openProductDetail,
    addToCart,
    addToast,
  } = useShop();

  const { t, formatCurrency, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'recommend' | 'chat'>('recommend');

  // Recommendation Quiz state
  const [selectedRoom, setSelectedRoom] = useState<string>(
    aiContextProduct?.room ? aiContextProduct.room : 'living'
  );
  const [selectedStyle, setSelectedStyle] = useState<string>('Japandi & Warm Organic');
  const [selectedColorVibe, setSelectedColorVibe] = useState<string>('Earthy Sand & Warm Walnut');
  const [userCustomNote, setUserCustomNote] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIStylistRecommendation | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: language === 'pt'
        ? (aiContextProduct
            ? `Olá! Sou seu Estilista de Interiores da Sarvicimobliaria. Como posso ajudar a combinar o **${aiContextProduct.name}** no seu espaço? Pergunte-me sobre tapetes, iluminação ou proporções!`
            : `Boas-vindas ao Estúdio Sarvicimobliaria. Diga-me as dimensões do seu ambiente, tons existentes ou a atmosfera que deseja, e vou selecionar as peças ideais.`)
        : (aiContextProduct
            ? `Hello! I'm your Sarvicimobliaria Interior Stylist. How can I help you pair or style the **${aiContextProduct.name}** in your space? Ask me about rug pairings, lighting heights, or room dimensions!`
            : `Welcome to Sarvicimobliaria Styling Studio. Tell me about your room dimensions, existing colors, or what mood you want to create, and I'll curate the perfect furniture pieces.`),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Fetch initial recommendation on mount if context exists
  useEffect(() => {
    handleGenerateRecommendation();
  }, [aiContextProduct]);

  const handleGenerateRecommendation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentProductId: aiContextProduct?.id,
          viewedProductIds: recentlyViewed,
          roomType: selectedRoom,
          stylePreference: selectedStyle,
          colorVibe: selectedColorVibe,
          userPrompt: userCustomNote,
        }),
      });
      const data = await response.json();
      setRecommendation(data);
    } catch (err) {
      console.error('Error getting recommendation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading) return;

    const userText = inputMessage.trim();
    const newMessages = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMessages);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/stylist-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          contextProduct: aiContextProduct,
          language: language,
        }),
      });
      const data = await response.json();
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply || (language === 'pt' ? 'Sugiro combinar madeiras naturais com iluminação quente e suave.' : "I'd suggest pairing natural woods with soft warm lighting.") },
      ]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'pt'
            ? 'Para um visual harmonioso e sofisticado, combine tecidos bouclé neutros com mármore travertino e iluminação suave de 2700K.'
            : 'For a cohesive modern look, combine neutral textured bouclé with natural travertine and dimmable 2700K ambient lighting.',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Add all recommended items to cart
  const handleAddAllToCart = () => {
    if (!recommendation) return;
    const matching = products.filter(p => recommendation.recommendedProductIds.includes(p.id));
    matching.forEach(p => addToCart(p, p.colors[0], 1));
    addToast(
      language === 'pt'
        ? `${matching.length} peças recomendadas adicionadas à sacola!`
        : `Added ${matching.length} recommended pieces to your bag!`,
      'success'
    );
  };

  // Find products matching the recommendation
  const recommendedItems = recommendation
    ? products.filter(p => recommendation.recommendedProductIds?.includes(p.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
        <motion.div
          id="ai-stylist-modal-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-sm shadow-2xl border border-[#E5E4E2] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E4E2]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xs bg-[#F5F2ED] border border-[#E5E4E2] flex items-center justify-center text-[#A08C75]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif italic text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {t.brandName} {t.aiModalTitle}
                </h2>
                <p className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                  {t.aiModalSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Tab Selector */}
              <div className="flex items-center p-0.5 bg-[#F5F2ED] rounded-sm border border-[#E5E4E2]">
                <button
                  id="ai-tab-recommendations-btn"
                  onClick={() => setActiveTab('recommend')}
                  className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'recommend'
                      ? 'bg-white shadow-xs text-[#1A1A1A] border border-[#E5E4E2]'
                      : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Wand2 className="w-3 h-3" />
                  <span>{t.aiCuratedRoom}</span>
                </button>

                <button
                  id="ai-tab-chat-btn"
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs transition-colors flex items-center gap-1.5 ${
                    activeTab === 'chat'
                      ? 'bg-white shadow-xs text-[#1A1A1A] border border-[#E5E4E2]'
                      : 'text-[#7A7A7A] hover:text-[#1A1A1A]'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{t.aiConsultation}</span>
                </button>
              </div>

              <button
                id="close-ai-stylist-modal"
                onClick={() => setIsAIStylistOpen(false)}
                className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors"
                aria-label="Close AI Stylist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
            {activeTab === 'recommend' ? (
              <div className="space-y-6">
                {/* Context banner if opened from a specific product */}
                {aiContextProduct && (
                  <div className="p-3.5 rounded-sm bg-white border border-[#E5E4E2] flex items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={aiContextProduct.images[0]}
                        alt={aiContextProduct.name}
                        className="w-12 h-12 rounded-xs object-cover bg-[#F5F5F5] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="text-[9px] uppercase font-bold text-[#A08C75] tracking-widest">
                          {t.aiFocalPiece}
                        </div>
                        <div className="font-serif italic font-bold text-xs text-[#1A1A1A] truncate">
                          {aiContextProduct.name} ({formatCurrency(aiContextProduct.price)})
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7A7A] hidden sm:inline">
                      {language === 'pt' ? 'Curando peças complementares' : 'Curating complementary pieces'}
                    </span>
                  </div>
                )}

                {/* Preference Controls */}
                <div className="p-4 sm:p-5 rounded-sm bg-white border border-[#E5E4E2] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Room Type */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block">{t.aiTargetRoom}</label>
                      <select
                        id="ai-room-select"
                        value={selectedRoom}
                        onChange={e => setSelectedRoom(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3 py-2 text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                      >
                        <option value="living">{t.roomLiving}</option>
                        <option value="dining">{t.roomDining}</option>
                        <option value="bedroom">{t.roomBedroom}</option>
                        <option value="workspace">{t.roomOffice}</option>
                      </select>
                    </div>

                    {/* Style Profile */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block">{t.aiAestheticVibe}</label>
                      <select
                        id="ai-style-select"
                        value={selectedStyle}
                        onChange={e => setSelectedStyle(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3 py-2 text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                      >
                        <option value="Japandi & Warm Organic">Japandi & Warm Organic</option>
                        <option value="Mid-Century Scandinavian">Mid-Century Scandinavian</option>
                        <option value="Monolithic Warm Brutalism">Monolithic Warm Stone</option>
                        <option value="Modern Architectural Minimalist">Modern Architectural</option>
                      </select>
                    </div>

                    {/* Color Palette Vibe */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block">{t.aiColorHarmony}</label>
                      <select
                        id="ai-color-vibe-select"
                        value={selectedColorVibe}
                        onChange={e => setSelectedColorVibe(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3 py-2 text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                      >
                        <option value="Earthy Sand & Warm Walnut">Earthy Sand & Warm Walnut</option>
                        <option value="Oatmeal Cream & Travertine">Oatmeal Cream & Travertine</option>
                        <option value="Cognac Leather & Smoked Oak">Cognac Leather & Smoked Oak</option>
                        <option value="High-Contrast Charcoal & Ash">High-Contrast Charcoal & Ash</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Custom Room Details */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <input
                      id="ai-custom-prompt-input"
                      type="text"
                      value={userCustomNote}
                      onChange={e => setUserCustomNote(e.target.value)}
                      placeholder={t.aiCustomPlaceholder}
                      className="flex-1 bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#A08C75]"
                    />
                    <button
                      id="ai-refresh-recommendation-btn"
                      onClick={handleGenerateRecommendation}
                      disabled={isLoading}
                      className="px-4 py-2 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shrink-0 transition-colors"
                    >
                      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                      <span>{isLoading ? t.aiComposing : t.aiGenerateBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Recommendation Output Display */}
                {isLoading ? (
                  <div className="py-12 text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-[#A08C75] mx-auto" />
                    <p className="font-serif italic text-base font-bold text-[#1A1A1A]">
                      {t.aiCuratingPairings}
                    </p>
                    <p className="text-xs text-[#7A7A7A] font-light">
                      {t.aiEvaluatingErgonomics}
                    </p>
                  </div>
                ) : recommendation ? (
                  <div className="space-y-6">
                    {/* Style Banner & Color Swatches */}
                    <div className="p-5 rounded-sm bg-white border border-[#E5E4E2] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-[9px] uppercase font-bold text-[#A08C75] tracking-widest">
                            {t.aiStyleProfile}
                          </div>
                          <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                            {recommendation.styleProfile}
                          </h3>
                        </div>

                        {/* Palette swatches */}
                        {recommendation.colorPalette && recommendation.colorPalette.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A] font-medium">{t.aiHarmonizedPalette}:</span>
                            <div className="flex items-center gap-1.5">
                              {recommendation.colorPalette.map((col, idx) => (
                                <div
                                  key={idx}
                                  className="group relative w-5 h-5 rounded-full border border-black/10 shadow-xs cursor-pointer"
                                  style={{ backgroundColor: col.hex }}
                                >
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9px] px-2 py-0.5 rounded-xs whitespace-nowrap pointer-events-none">
                                    {col.name} ({col.hex})
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed font-light">
                        {recommendation.summary}
                      </p>
                    </div>

                    {/* Recommended Product Cards */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-[#A08C75]" />
                          <h4 className="font-serif italic text-base font-bold text-[#1A1A1A]">
                            {t.aiRecommendedEnsemble}
                          </h4>
                        </div>
                        {recommendedItems.length > 0 && (
                          <button
                            id="ai-add-all-to-cart-btn"
                            onClick={handleAddAllToCart}
                            className="px-3 py-1.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-wider hover:bg-black transition-colors flex items-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t.aiAddAllBag}</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {recommendedItems.map(prod => (
                          <div
                            key={prod.id}
                            id={`ai-rec-card-${prod.id}`}
                            className="p-3 rounded-sm bg-white border border-[#E5E4E2] hover:border-[#1A1A1A] transition-all flex flex-col justify-between space-y-3"
                          >
                            <div
                              onClick={() => {
                                setIsAIStylistOpen(false);
                                openProductDetail(prod.id);
                              }}
                              className="cursor-pointer space-y-2 group"
                            >
                              <div className="aspect-[4/3] rounded-xs overflow-hidden bg-[#F5F5F5]">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <h5 className="font-serif italic font-bold text-xs text-[#1A1A1A] group-hover:text-[#A08C75] truncate transition-colors">
                                  {prod.name}
                                </h5>
                                <p className="text-[10px] uppercase tracking-wider text-[#7A7A7A] truncate">
                                  {prod.materials.join(' · ')}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-[#E5E4E2] flex items-center justify-between">
                              <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                                {formatCurrency(prod.price)}
                              </span>
                              <button
                                id={`ai-rec-add-${prod.id}`}
                                onClick={() => addToCart(prod)}
                                className="p-1.5 rounded-sm bg-[#FAF9F6] border border-[#E5E4E2] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-xs transition-colors"
                                title={t.cardQuickAdd}
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decor Advice Guidelines */}
                    {recommendation.decorAdvice && recommendation.decorAdvice.length > 0 && (
                      <div className="p-4 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                          <Lightbulb className="w-4 h-4 text-[#A08C75]" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">{t.aiSpatialPlacement}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#5A5A5A] font-light">
                          {recommendation.decorAdvice.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A08C75] mt-1.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              /* Tab 2: Interactive Stylist Consultation Chat */
              <div className="flex flex-col h-[520px]">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-[#F5F2ED] border border-[#E5E4E2] text-[#A08C75] flex items-center justify-center shrink-0">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div
                        className={`p-3.5 rounded-sm text-xs leading-relaxed max-w-lg ${
                          msg.role === 'user'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white text-[#1A1A1A] border border-[#E5E4E2] shadow-xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex gap-3 items-center text-xs text-[#7A7A7A]">
                      <div className="w-7 h-7 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#A08C75]">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      </div>
                      <span className="font-light">{language === 'pt' ? 'O estilista Sarvicimobliaria está analisando proporções e harmonias...' : 'Sarvicimobliaria Stylist is considering proportions & pairings...'}</span>
                    </div>
                  )}
                </div>

                {/* Chat Input form */}
                <form
                  onSubmit={handleSendChatMessage}
                  className="mt-4 pt-3 border-t border-[#E5E4E2] flex items-center gap-2"
                >
                  <input
                    id="stylist-chat-input"
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder={language === 'pt' ? 'Pergunte sobre dimensões, tapetes, temperaturas de luz ou madeiras...' : 'Ask about dimensions, rug clearance, lighting temperatures, or wood combinations...'}
                    className="flex-1 bg-white border border-[#E5E4E2] rounded-sm px-4 py-2.5 text-xs text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#A08C75]"
                  />
                  <button
                    id="stylist-chat-send-btn"
                    type="submit"
                    disabled={isChatLoading || !inputMessage.trim()}
                    className="p-2.5 rounded-sm bg-[#1A1A1A] hover:bg-black text-white transition-colors disabled:opacity-50"
                    aria-label="Send message to AI stylist"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
  );
};

export const AIStylistModal: React.FC = () => {
  const { isAIStylistOpen } = useShop();

  return (
    <AnimatePresence>
      {isAIStylistOpen && <AIStylistModalContent />}
    </AnimatePresence>
  );
};
