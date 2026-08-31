import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setFilter, setIsAIStylistOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#141413] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2A2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#2A2A28] items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-bold">
              <span>Atelier Form · Private Circle</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
              Receive First-Access to Limited Stone & Hardwood Releases
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F96] max-w-lg">
              Join our architectural digest for seasonal furniture drops, material care guides, and exclusive trade discounts.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#232320] border border-[#3D3D38] flex items-center gap-3 text-xs text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  Welcome to Atelier Form! Use code <strong className="text-white">WELCOME10</strong> at checkout for 10% off.
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
                  placeholder="Enter your email address..."
                  className="flex-1 bg-[#232320] border border-[#3D3D38] rounded-xl px-4 py-3 text-xs text-white placeholder:text-[#8C827A] focus:outline-none focus:border-[#C86D51]"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#C86D51] hover:bg-[#B75F44] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <span>Subscribe</span>
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
            <span className="font-serif text-xl font-bold tracking-tight text-white block">
              ATELIER FORM
            </span>
            <p className="text-[#A89F96] leading-relaxed max-w-sm">
              We design and construct heirloom-grade furniture using natural Italian travertine, kiln-dried FSC hardwoods, and tactile bouclé textiles.
            </p>
            <div className="flex items-center gap-3 text-[#A89F96]">
              <span>Studio: Milan & San Francisco</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Collection</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>
                <button
                  onClick={() => setFilter({ category: 'sofas', searchQuery: '' })}
                  className="hover:text-white transition-colors"
                >
                  Architectural Sofas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'tables', searchQuery: '' })}
                  className="hover:text-white transition-colors"
                >
                  Travertine Tables
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'chairs', searchQuery: '' })}
                  className="hover:text-white transition-colors"
                >
                  Lounge & Dining Chairs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'beds', searchQuery: '' })}
                  className="hover:text-white transition-colors"
                >
                  Sanctuary Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilter({ category: 'lighting', searchQuery: '' })}
                  className="hover:text-white transition-colors"
                >
                  Sculptural Lighting
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Experience</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>
                <button
                  onClick={() => setIsAIStylistOpen(true)}
                  className="text-[#C86D51] hover:underline font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Interior Stylist</span>
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  White-Glove In-Room Setup
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Trade & Contract Program
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Custom Stone Sourcing
                </span>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Assurance</h4>
            <ul className="space-y-2 text-[#A89F96]">
              <li>10-Year Frame Warranty</li>
              <li>30-Day In-Home Trial</li>
              <li>FSC-Certified Solid Timber</li>
              <li>Durable Olefin & Wool Weaves</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2A2A28] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C827A]">
          <div>
            © {new Date().getFullYear()} Atelier Form Design Studio Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
