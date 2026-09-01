import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setFilter, setIsAIStylistOpen } = useShop();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF9F6] pt-16 pb-12 border-t border-[#2A2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#2A2A28] items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A08C75] font-bold">
              <span>{t.footerPrivateCircle}</span>
            </div>
            <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#FAF9F6]">
              {t.footerNewsletterTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F96] max-w-lg">
              {t.footerNewsletterDesc}
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-sm bg-[#232320] border border-[#3D3D38] flex items-center gap-3 text-xs text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  {t.footerWelcomeCode} <strong className="text-white">WELCOME10</strong>
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.footerEmailPlaceholder}
                  className="flex-1 bg-[#232320] border border-[#3D3D38] rounded-sm px-4 py-3 text-xs text-white placeholder:text-[#8C827A] focus:outline-none focus:border-[#A08C75]"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="px-6 py-3 rounded-sm bg-[#A08C75] hover:bg-[#8e7a64] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <span>{t.footerSubscribeBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <span className="font-serif italic text-xl font-bold tracking-tight text-white block">
              {t.brandName.toUpperCase()}
            </span>
            <p className="text-[#A89F96] leading-relaxed max-w-sm font-light">
              {t.footerAboutBrand}
            </p>
            <div className="flex items-center gap-3 text-[#A89F96] text-[11px] font-mono">
              <span>{t.footerStudioLocations}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerCollection}</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>
                <button
                  onClick={() => setFilter({ category: 'sofas', searchQuery: '' })}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.catSofas}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'tables', searchQuery: '' })}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.catTables}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'chairs', searchQuery: '' })}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.catChairs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'beds', searchQuery: '' })}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.catBeds}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'lighting', searchQuery: '' })}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.catLighting}
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerExperience}</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>
                <button
                  onClick={() => setIsAIStylistOpen(true)}
                  className="text-[#A08C75] hover:underline font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#A08C75]" />
                  <span>{t.aiModalTitle}</span>
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  {t.vpDeliveryTitle}
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  {language === 'pt' ? 'Programa Corporativo & Arquitetos' : 'Trade & Contract Program'}
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  {language === 'pt' ? 'Seleção Personalizada de Pedras' : 'Custom Stone Sourcing'}
                </span>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerAssurance}</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>{t.announcementWarranty}</li>
              <li>{language === 'pt' ? '30 Dias de Teste Residencial' : '30-Day In-Home Trial'}</li>
              <li>{language === 'pt' ? 'Madeiras FSC com Certificação' : 'FSC-Certified Solid Timber'}</li>
              <li>{language === 'pt' ? 'Fibras Naturais & Lã Italiana' : 'Durable Olefin & Wool Weaves'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2A2A28] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C827A]">
          <div>
            © {new Date().getFullYear()} {t.brandName} Studio Inc. {t.footerAllRights}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">{t.footerPrivacy}</span>
            <span className="hover:text-white cursor-pointer">{t.footerTerms}</span>
            <span className="hover:text-white cursor-pointer">{t.footerAccessibility}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
