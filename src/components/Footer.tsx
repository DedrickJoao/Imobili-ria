import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, CheckCircle2, Sparkles, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigateToCatalogs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCatalogs }) => {
  const { t, language } = useLanguage();
  const { setFilter, setIsAIStylistOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer id="main-footer" className="bg-[#0C2A44] text-[#F8FAFC] border-t border-[#1E456B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Newsletter Section */}
        <div className="p-8 sm:p-10 rounded-sm bg-[#0F3556] border border-[#38BDF8]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#38BDF8] block">
              {t.footerPrivateCircle}
            </span>
            <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-white">
              {t.footerNewsletterTitle}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
              {t.footerNewsletterDesc}
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 p-4 rounded-sm border border-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.footerWelcomeToast}</span>
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
                  className="flex-1 bg-[#0A2238] border border-[#1E456B] rounded-sm px-4 py-3 text-xs text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="px-6 py-3 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
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
            <BrandLogo variant="light" size="md" isFooter={true} />
            <p className="text-[#94A3B8] leading-relaxed max-w-sm font-light">
              {t.footerAboutBrand}
            </p>
            <div className="space-y-1.5 text-[#94A3B8] text-[11px] pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#60A5FA]" />
                <a href="mailto:bestfurniture79@gmail.com" className="hover:text-white transition-colors underline font-medium">
                  bestfurniture79@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>+258 84 920 1842</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Maputo, Moçambique</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerCollection}</h4>
            <ul className="space-y-2 text-[#94A3B8]">
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

          {/* AI & Digital Catalogs */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerExperience}</h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <button
                  onClick={onNavigateToCatalogs}
                  className="text-[#60A5FA] hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>{language === 'pt' ? 'Catálogos Modernos 2026' : 'Modern 2026 Catalogs'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAIStylistOpen(true)}
                  className="hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#60A5FA]" />
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
                  {language === 'pt' ? 'Atendimento no Escritório' : 'Office Consultations'}
                </span>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">{t.footerAssurance}</h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>{t.announcementWarranty}</li>
              <li>{language === 'pt' ? 'Garantia Estrutural 10 Anos' : '10-Year Frame Warranty'}</li>
              <li>{language === 'pt' ? 'Madeiras FSC com Certificação' : 'FSC-Certified Solid Timber'}</li>
              <li>{language === 'pt' ? 'Montagem White-Glove Inclusa' : 'White-Glove Setup Included'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} SARVIC Studio Inc. {t.footerAllRights}
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
export default Footer;
