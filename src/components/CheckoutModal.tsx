import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { CustomerInfo, DeliveryMethod, Order } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  Lock,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PackageCheck,
  Clock,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    appliedPromo,
    placeOrder,
  } = useShop();

  const { t, formatCurrency, language } = useLanguage();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Shipping, 2: Delivery, 3: Payment, 4: Confirmed
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('white-glove');
  const [paymentType, setPaymentType] = useState<'card' | 'apple-pay' | 'klarna'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form states
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: language === 'pt' ? 'SP' : 'CA',
    zipCode: '',
    country: language === 'pt' ? 'Brasil' : 'United States',
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '4532 •••• •••• 8829',
    cardName: 'Alex Thorne',
    expiry: '08/29',
    cvv: '842',
  });

  if (!isCheckoutOpen) return null;

  // Auto-fill demo details for effortless instant checkout testing
  const handleAutoFillDemo = () => {
    setCustomer({
      firstName: language === 'pt' ? 'Carolina' : 'Sophia',
      lastName: language === 'pt' ? 'Mendes' : 'Vanderbilt',
      email: language === 'pt' ? 'carolina.mendes@example.com' : 'sophia.vanderbilt@example.com',
      phone: language === 'pt' ? '+55 (11) 98765-4321' : '+1 (415) 882-9102',
      address: language === 'pt' ? 'Av. Paulista, 1578' : '742 Evergreen Terrace',
      apartment: language === 'pt' ? 'Apto 142' : 'Penthouse 4B',
      city: language === 'pt' ? 'São Paulo' : 'San Francisco',
      state: language === 'pt' ? 'SP' : 'CA',
      zipCode: language === 'pt' ? '01310-200' : '94102',
      country: language === 'pt' ? 'Brasil' : 'United States',
    });
    setCardInfo({
      cardNumber: '4532 8920 1204 8829',
      cardName: language === 'pt' ? 'Carolina Mendes' : 'Sophia Vanderbilt',
      expiry: '11/29',
      cvv: '739',
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!customer.firstName || !customer.address || !customer.city || !customer.zipCode) {
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Calculate estimated delivery
      const estDate = new Date();
      estDate.setDate(estDate.getDate() + 7);
      const formattedEst = estDate.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const order = placeOrder({
        items: cart,
        customer,
        deliveryMethod,
        deliveryCost: cartShipping,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        promoCode: appliedPromo?.code,
        tax: cartTax,
        total: cartTotal,
        estimatedDeliveryDate: formattedEst,
      });

      setConfirmedOrder(order);
      setCurrentStep(4);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A08C75', '#1A1A1A', '#E5E4E2', '#FAF9F6'],
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
        <motion.div
          id="checkout-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-sm shadow-2xl border border-[#E5E4E2] overflow-hidden my-auto max-h-[94vh] flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E4E2]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#A08C75]" />
              <h2 className="font-serif italic text-base sm:text-lg font-bold text-[#1A1A1A]">
                {currentStep === 4 ? t.checkoutSuccessTitle : t.checkoutTitle}
              </h2>
            </div>

            {currentStep < 4 && (
              <div className="hidden sm:flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-[#7A7A7A]">
                <span className={currentStep === 1 ? 'text-[#1A1A1A] underline underline-offset-4 decoration-[#A08C75]' : ''}>1. {t.checkoutStep1}</span>
                <span>•</span>
                <span className={currentStep === 2 ? 'text-[#1A1A1A] underline underline-offset-4 decoration-[#A08C75]' : ''}>2. {t.checkoutStep2}</span>
                <span>•</span>
                <span className={currentStep === 3 ? 'text-[#1A1A1A] underline underline-offset-4 decoration-[#A08C75]' : ''}>3. {t.checkoutStep3}</span>
              </div>
            )}

            <button
              id="close-checkout-btn"
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-sm text-[#1A1A1A] hover:bg-[#E5E4E2] transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
            {currentStep === 4 && confirmedOrder ? (
              /* Step 4: Order Confirmed Success Screen */
              <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
                <div className="w-14 h-14 rounded-full bg-[#F5F2ED] border border-[#E5E4E2] text-[#A08C75] flex items-center justify-center mx-auto shadow-xs">
                  <PackageCheck className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#A08C75] tracking-widest">
                    {t.checkoutThankYou}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    {t.checkoutOrderPrefix} #{confirmedOrder.orderId}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5A5A] font-light">
                    {t.checkoutReceiptSent}{' '}
                    <strong className="text-[#1A1A1A] font-semibold">{confirmedOrder.customer.email}</strong>.
                  </p>
                </div>

                {/* Delivery Timeline Card */}
                <div className="p-5 rounded-sm bg-white border border-[#E5E4E2] text-left space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#E5E4E2] pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                      <Truck className="w-4 h-4 text-[#A08C75]" />
                      <span>{t.checkoutEstimatedDelivery}</span>
                    </div>
                    <span className="text-xs font-bold text-[#A08C75] font-mono">
                      {confirmedOrder.estimatedDeliveryDate}
                    </span>
                  </div>

                  {/* Tracking Steps */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className="space-y-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center mx-auto text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#1A1A1A] block">{t.checkoutTrackConfirmed}</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#F5F2ED] text-[#A08C75] border border-[#A08C75] flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                        2
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#A08C75] block">{t.checkoutTrackCrafting}</span>
                    </div>

                    <div className="space-y-1.5 opacity-60">
                      <div className="w-6 h-6 rounded-full bg-[#F5F5F5] text-[#7A7A7A] border border-[#E5E4E2] flex items-center justify-center mx-auto text-xs font-bold">
                        3
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#7A7A7A] block">{t.checkoutTrackDispatched}</span>
                    </div>

                    <div className="space-y-1.5 opacity-60">
                      <div className="w-6 h-6 rounded-full bg-[#F5F5F5] text-[#7A7A7A] border border-[#E5E4E2] flex items-center justify-center mx-auto text-xs font-bold">
                        4
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#7A7A7A] block">{t.checkoutTrackSetup}</span>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Preview */}
                <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] text-left space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] block">{t.checkoutSummaryPieces}</span>
                  <div className="divide-y divide-[#E5E4E2]">
                    {confirmedOrder.items.map(it => (
                      <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product.images[it.selectedColor.imageIndex] || it.product.images[0]}
                            alt={it.product.name}
                            className="w-10 h-10 rounded-xs object-cover bg-[#F5F5F5]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-serif italic font-bold text-xs text-[#1A1A1A] block">{it.product.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                              {t.checkoutQty} {it.quantity} · {it.selectedColor.name}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-[#1A1A1A] font-mono">
                          {formatCurrency(it.unitPrice * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E5E4E2] flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                    <span>{t.checkoutTotalPaid}</span>
                    <span className="text-sm font-mono text-[#A08C75]">{formatCurrency(confirmedOrder.total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    id="order-success-continue-btn"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-6 py-3 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest transition-colors shadow-sm"
                  >
                    {t.checkoutContinueBrowsing}
                  </button>
                </div>
              </div>
            ) : (
              /* Steps 1, 2, 3: Form Flow + Order Summary Sidebar */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Form Area (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Quick autofill demo button */}
                  <div className="flex items-center justify-between p-3 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2]">
                    <div className="flex items-center gap-2 text-xs text-[#1A1A1A]">
                      <Sparkles className="w-4 h-4 text-[#A08C75]" />
                      <span className="font-medium text-xs">{t.checkoutTestingFlow}</span>
                    </div>
                    <button
                      id="autofill-demo-checkout-btn"
                      type="button"
                      onClick={handleAutoFillDemo}
                      className="px-3 py-1 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-wider hover:bg-black transition-colors"
                    >
                      {t.checkoutFillDemo}
                    </button>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-6">
                    {/* STEP 1: Shipping Address */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                            1. {t.checkoutDeliveryContact}
                          </h3>
                          <p className="text-xs text-[#7A7A7A] font-light">
                            {t.checkoutWhereDeliver}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutFirstName} *
                            </label>
                            <input
                              id="checkout-first-name"
                              type="text"
                              required
                              value={customer.firstName}
                              onChange={e => setCustomer({ ...customer, firstName: e.target.value })}
                              placeholder={language === 'pt' ? 'Carolina' : 'Sophia'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutLastName} *
                            </label>
                            <input
                              id="checkout-last-name"
                              type="text"
                              required
                              value={customer.lastName}
                              onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
                              placeholder={language === 'pt' ? 'Mendes' : 'Vanderbilt'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutEmail} *
                            </label>
                            <input
                              id="checkout-email"
                              type="email"
                              required
                              value={customer.email}
                              onChange={e => setCustomer({ ...customer, email: e.target.value })}
                              placeholder={language === 'pt' ? 'carolina@exemplo.com' : 'sophia@example.com'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutPhone} *
                            </label>
                            <input
                              id="checkout-phone"
                              type="tel"
                              required
                              value={customer.phone}
                              onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                              placeholder={language === 'pt' ? '+55 (11) 98765-4321' : '+1 (415) 555-0192'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutStreetAddress} *
                            </label>
                            <input
                              id="checkout-address"
                              type="text"
                              required
                              value={customer.address}
                              onChange={e => setCustomer({ ...customer, address: e.target.value })}
                              placeholder={language === 'pt' ? 'Av. Paulista, 1578' : '742 Evergreen Terrace'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutApartment}
                            </label>
                            <input
                              id="checkout-apt"
                              type="text"
                              value={customer.apartment}
                              onChange={e => setCustomer({ ...customer, apartment: e.target.value })}
                              placeholder={language === 'pt' ? 'Apto 142' : 'Penthouse 4B'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutCity} *
                            </label>
                            <input
                              id="checkout-city"
                              type="text"
                              required
                              value={customer.city}
                              onChange={e => setCustomer({ ...customer, city: e.target.value })}
                              placeholder={language === 'pt' ? 'São Paulo' : 'San Francisco'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutState} *
                            </label>
                            <input
                              id="checkout-state"
                              type="text"
                              required
                              value={customer.state}
                              onChange={e => setCustomer({ ...customer, state: e.target.value })}
                              placeholder={language === 'pt' ? 'SP' : 'CA'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutPostalCode} *
                            </label>
                            <input
                              id="checkout-zip"
                              type="text"
                              required
                              value={customer.zipCode}
                              onChange={e => setCustomer({ ...customer, zipCode: e.target.value })}
                              placeholder={language === 'pt' ? '01310-200' : '94102'}
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>
                        </div>

                        <button
                          id="step1-continue-btn"
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors mt-4"
                        >
                          <span>{t.checkoutContinueDelivery}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* STEP 2: Delivery Method */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                            2. {t.checkoutDeliveryLevel}
                          </h3>
                          <p className="text-xs text-[#7A7A7A] font-light">
                            {t.checkoutChooseExperience}
                          </p>
                        </div>

                        <div className="space-y-3">
                          {/* Method 1: White Glove */}
                          <label
                            onClick={() => setDeliveryMethod('white-glove')}
                            className={`p-4 rounded-sm border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                              deliveryMethod === 'white-glove'
                                ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                                : 'bg-white border-[#E5E4E2] hover:border-[#1A1A1A]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-xs bg-[#F5F2ED] text-[#A08C75] border border-[#E5E4E2] flex items-center justify-center shrink-0 mt-0.5">
                                <Truck className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#1A1A1A]">
                                    {t.checkoutWhiteGloveTitle}
                                  </span>
                                  <span className="px-2 py-0.2 rounded-xs text-[9px] uppercase tracking-wider font-bold bg-[#A08C75] text-white">
                                    {t.checkoutRecommended}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#5A5A5A] leading-relaxed font-light">
                                  {t.checkoutWhiteGloveDesc}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#A08C75] font-mono">
                              {cartShipping === 0 ? t.cartFree : formatCurrency(cartShipping)}
                            </span>
                          </label>

                          {/* Method 2: Standard Curbside */}
                          <label
                            onClick={() => setDeliveryMethod('standard')}
                            className={`p-4 rounded-sm border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                              deliveryMethod === 'standard'
                                ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                                : 'bg-white border-[#E5E4E2] hover:border-[#1A1A1A]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-xs bg-[#F5F5F5] text-[#1A1A1A] border border-[#E5E4E2] flex items-center justify-center shrink-0 mt-0.5">
                                <Building className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-xs font-bold text-[#1A1A1A] block">
                                  {t.checkoutCurbsideTitle}
                                </span>
                                <p className="text-[11px] text-[#5A5A5A] leading-relaxed font-light">
                                  {t.checkoutCurbsideDesc}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#1A1A1A] font-mono">{t.cartFree}</span>
                          </label>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="py-3 px-4 rounded-sm border border-[#E5E4E2] text-[#1A1A1A] hover:bg-[#E5E4E2] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t.checkoutBack}</span>
                          </button>

                          <button
                            id="step2-continue-btn"
                            type="submit"
                            className="flex-1 py-3.5 px-6 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
                          >
                            <span>{t.checkoutContinuePayment}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Payment Method */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                            3. {t.checkoutSecurePayment}
                          </h3>
                          <p className="text-xs text-[#7A7A7A] font-light">
                            {t.checkoutPaymentDesc}
                          </p>
                        </div>

                        {/* Payment method selector tabs */}
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentType('card')}
                            className={`p-3 rounded-sm border text-[10px] uppercase tracking-wider font-bold flex flex-col items-center gap-1.5 transition-all ${
                              paymentType === 'card'
                                ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
                                : 'bg-[#FAF9F6] border-[#E5E4E2] text-[#7A7A7A]'
                            }`}
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>{t.checkoutCreditCard}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentType('apple-pay')}
                            className={`p-3 rounded-sm border text-[10px] uppercase tracking-wider font-bold flex flex-col items-center gap-1.5 transition-all ${
                              paymentType === 'apple-pay'
                                ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
                                : 'bg-[#FAF9F6] border-[#E5E4E2] text-[#7A7A7A]'
                            }`}
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Apple / G-Pay</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentType('klarna')}
                            className={`p-3 rounded-sm border text-[10px] uppercase tracking-wider font-bold flex flex-col items-center gap-1.5 transition-all ${
                              paymentType === 'klarna'
                                ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] shadow-xs'
                                : 'bg-[#FAF9F6] border-[#E5E4E2] text-[#7A7A7A]'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                            <span>{language === 'pt' ? 'Parcelamento' : 'Klarna 4x'}</span>
                          </button>
                        </div>

                        {paymentType === 'card' && (
                          <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] space-y-3">
                            <div>
                              <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                                {t.checkoutCardNumber}
                              </label>
                              <input
                                id="checkout-card-number"
                                type="text"
                                value={cardInfo.cardNumber}
                                onChange={e => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                                className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                                  {t.checkoutExpiration}
                                </label>
                                <input
                                  id="checkout-card-expiry"
                                  type="text"
                                  value={cardInfo.expiry}
                                  onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                                  placeholder="MM/YY"
                                  className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                                  {t.checkoutCvv}
                                </label>
                                <input
                                  id="checkout-card-cvv"
                                  type="text"
                                  value={cardInfo.cvv}
                                  onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                                  placeholder="123"
                                  className="w-full bg-[#FAF9F6] border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {paymentType === 'apple-pay' && (
                          <div className="p-4 rounded-sm bg-white border border-[#E5E4E2] text-center space-y-2">
                            <span className="text-xs text-[#5A5A5A] font-light">
                              {language === 'pt' ? 'Pagamento biométrico em 1 clique ativo para este dispositivo.' : 'Instant 1-Click Biometric Pay activated for your device.'}
                            </span>
                          </div>
                        )}

                        {paymentType === 'klarna' && (
                          <div className="p-4 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] text-xs text-[#5A5A5A] space-y-1">
                            <span className="font-bold text-[#1A1A1A] block font-mono">
                              {language === 'pt' 
                                ? `4x sem juros de ${formatCurrency(cartTotal / 4)}`
                                : `4 interest-free payments of ${(cartTotal / 4).toFixed(2)}`}
                            </span>
                            <span className="font-light">
                              {language === 'pt' ? 'Sem juros ou taxas adicionais no cartão.' : 'Due every 2 weeks. No hidden fees or credit score impact.'}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="py-3 px-4 rounded-sm border border-[#E5E4E2] text-[#1A1A1A] hover:bg-[#E5E4E2] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t.checkoutBack}</span>
                          </button>

                          <button
                            id="complete-order-btn"
                            type="submit"
                            className="flex-1 py-3.5 px-6 rounded-sm bg-[#A08C75] hover:bg-[#8e7a64] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t.checkoutAuthorize} • {formatCurrency(cartTotal)}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Right Summary Sidebar (5 cols) */}
                <div className="lg:col-span-5 p-5 rounded-sm bg-white border border-[#E5E4E2] space-y-4 h-fit shadow-xs">
                  <h4 className="font-serif italic text-sm font-bold text-[#1A1A1A]">
                    {t.checkoutOrderSummary} ({cart.reduce((a, b) => a + b.quantity, 0)} {language === 'pt' ? 'itens' : 'items'})
                  </h4>

                  <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#E5E4E2]">
                    {cart.map(item => (
                      <div key={item.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                        <img
                          src={item.product.images[item.selectedColor.imageIndex] || item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xs object-cover bg-[#F5F5F5] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-serif italic font-bold text-xs text-[#1A1A1A] truncate">
                            {item.product.name}
                          </h5>
                          <p className="text-[10px] uppercase tracking-wider text-[#7A7A7A]">
                            {t.checkoutQty} {item.quantity} · {item.selectedColor.name}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#1A1A1A] font-mono">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E5E4E2] space-y-2 text-xs text-[#5A5A5A]">
                    <div className="flex items-center justify-between">
                      <span>{t.cartSubtotal}</span>
                      <span className="font-bold text-[#1A1A1A] font-mono">{formatCurrency(cartSubtotal)}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex items-center justify-between text-[#A08C75]">
                        <span>{t.cartDiscount} ({appliedPromo?.code})</span>
                        <span className="font-mono">-{formatCurrency(cartDiscount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span>{t.cartShipping}</span>
                      <span>
                        {cartShipping === 0 ? (
                          <strong className="text-[#A08C75] text-[10px] uppercase font-bold tracking-wider">{t.cartFree}</strong>
                        ) : (
                          <span className="font-mono font-bold text-[#1A1A1A]">{formatCurrency(cartShipping)}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>{t.cartEstTax}</span>
                      <span className="font-mono font-bold text-[#1A1A1A]">{formatCurrency(cartTax)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E5E4E2]">
                      <span>{t.checkoutGrandTotal}</span>
                      <span className="text-base font-mono text-[#A08C75]">{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
