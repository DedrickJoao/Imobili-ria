import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { CustomerInfo, DeliveryMethod, Order } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  Lock,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PackageCheck,
  Building,
  Mail,
  Send,
  MessageCircle,
  Smartphone,
  CreditCard,
  Banknote,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CheckoutModalContent: React.FC = () => {
  const {
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

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1); // 1: Shipping, 2: Delivery, 3: Email Order Dispatch, 4: Confirmed
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('white-glove');
  const [paymentPreference, setPaymentPreference] = useState<'mpesa' | 'bank-transfer' | 'cash-on-delivery'>('mpesa');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form states with Mozambique defaults
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Maputo',
    state: 'Maputo Cidade',
    zipCode: '1100',
    country: 'Moçambique',
  });

  // Auto-fill sample Mozambique details for instant testing
  const handleAutoFillDemo = () => {
    setCustomer({
      firstName: language === 'pt' ? 'Dércio' : 'Derick',
      lastName: language === 'pt' ? 'Domingos' : 'Domingos',
      email: 'dedrickdomingos.domingos@gmail.com',
      phone: '+258 84 920 1842',
      address: 'Av. Julius Nyerere, 1200',
      apartment: 'Bairro Polana Cimento, Edifício Panorama 4º A',
      city: 'Maputo',
      state: 'Maputo Cidade',
      zipCode: '1100',
      country: 'Moçambique',
    });
    setOrderNotes(language === 'pt' ? 'Por favor agendar a entrega para o próximo sábado de manhã.' : 'Please schedule delivery for next Saturday morning.');
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!customer.firstName || !customer.address || !customer.city) {
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsSubmitting(true);

      // Calculate estimated delivery
      const estDate = new Date();
      estDate.setDate(estDate.getDate() + 5);
      const formattedEst = estDate.toLocaleDateString(language === 'pt' ? 'pt-MZ' : 'en-US', {
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

      // Submit order details to backend endpoint for owner email logging & dispatch
      try {
        await fetch('/api/orders/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.orderId,
            customer,
            items: cart.map(i => ({
              id: i.id,
              name: i.product.name,
              sku: i.product.sku,
              quantity: i.quantity,
              color: i.selectedColor.name,
              unitPrice: i.unitPrice,
              totalPrice: i.unitPrice * i.quantity,
            })),
            currency: 'MT',
            subtotal: cartSubtotal,
            discount: cartDiscount,
            shipping: cartShipping,
            tax: cartTax,
            total: cartTotal,
            deliveryMethod,
            paymentPreference,
            notes: orderNotes,
            adminEmail: 'dedrickdomingos.domingos@gmail.com',
          }),
        });
      } catch (err) {
        console.warn('Backend order submission ping finished:', err);
      } finally {
        setIsSubmitting(false);
      }

      setConfirmedOrder(order);
      setCurrentStep(4);

      // Trigger celebration confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#A08C75', '#1A1A1A', '#E5E4E2', '#FAF9F6'],
      });
    }
  };

  return (
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
              /* Step 4: Order Confirmed & Email Dispatched Success Screen */
              <div className="space-y-6 text-center max-w-2xl mx-auto py-2">
                <div className="w-16 h-16 rounded-full bg-[#F5F2ED] border border-[#A08C75]/40 text-[#A08C75] flex items-center justify-center mx-auto shadow-sm">
                  <PackageCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#A08C75] tracking-widest block">
                    {t.checkoutThankYou}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    {t.checkoutOrderPrefix} #{confirmedOrder.orderId}
                  </h3>
                  <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-normal text-left max-w-xl mx-auto flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{t.checkoutSuccessEmailSent} <strong>{confirmedOrder.customer.email}</strong>.</p>
                      <p className="text-[11px] text-emerald-800 mt-1">E-mail comercial da Sarvicimobliaria: <strong>dedrickdomingos.domingos@gmail.com</strong></p>
                    </div>
                  </div>
                </div>

                {/* Delivery Timeline & Next Steps */}
                <div className="p-5 rounded-sm bg-white border border-[#E5E4E2] text-left space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#E5E4E2] pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                      <Truck className="w-4 h-4 text-[#A08C75]" />
                      <span>{t.checkoutEstimatedDelivery}</span>
                    </div>
                    <span className="text-xs font-bold text-[#A08C75] font-mono">
                      {confirmedOrder.estimatedDeliveryDate} (Moçambique)
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

                  <div className="pt-3 border-t border-[#E5E4E2] bg-[#FAF9F6] p-3 rounded-xs space-y-1 text-xs text-[#5A5A5A]">
                    <span className="font-bold text-[#1A1A1A] block">{t.checkoutNextStepsTitle}</span>
                    <p className="text-[11px] leading-relaxed">{t.checkoutNextStepsDesc}</p>
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
                    <span className="text-base font-mono text-[#A08C75]">{formatCurrency(confirmedOrder.total)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    id="order-success-whatsapp-btn"
                    href={`https://wa.me/258849201842?text=${encodeURIComponent(
                      `Olá Sarvicimobliaria! Acabei de submeter o pedido #${confirmedOrder.orderId} no valor total de ${formatCurrency(confirmedOrder.total)} e gostaria de confirmar os detalhes.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.checkoutWhatsAppDirect}</span>
                  </a>

                  <button
                    id="order-success-continue-btn"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#1A1A1A] hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest transition-colors shadow-sm"
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
                    {/* STEP 1: Contact & Address in Mozambique */}
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
                              placeholder={language === 'pt' ? 'Dércio' : 'Derick'}
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
                              placeholder={language === 'pt' ? 'Domingos' : 'Domingos'}
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
                              placeholder="seu.email@exemplo.com"
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
                              placeholder="+258 84 123 4567"
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
                              placeholder={language === 'pt' ? 'Av. Julius Nyerere, 1200' : 'Av. Julius Nyerere, 1200'}
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
                              placeholder={language === 'pt' ? 'Bairro Polana Cimento, Edif. 4A' : 'Polana Cimento, Apt 4A'}
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
                              placeholder="Maputo"
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
                              placeholder="Maputo Cidade"
                              className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                              {t.checkoutPostalCode}
                            </label>
                            <input
                              id="checkout-zip"
                              type="text"
                              value={customer.zipCode}
                              onChange={e => setCustomer({ ...customer, zipCode: e.target.value })}
                              placeholder="1100"
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

                    {/* STEP 2: Delivery Method in Mozambique */}
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

                          {/* Method 2: Standard Delivery / Showroom */}
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

                    {/* STEP 3: Direct Email Order Submission & Payment Preference */}
                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h3 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                            3. {t.checkoutPaymentTitle}
                          </h3>
                          <p className="text-xs text-[#7A7A7A] font-light">
                            {t.checkoutPaymentDesc}
                          </p>
                        </div>

                        {/* Direct Email Notice Banner */}
                        <div className="p-4 rounded-sm bg-[#F5F2ED] border border-[#E5E4E2] space-y-2">
                          <div className="flex items-center gap-2 text-[#A08C75] text-xs font-bold">
                            <Mail className="w-4 h-4 text-[#A08C75]" />
                            <span>{language === 'pt' ? 'Envio Direto para dedrickdomingos.domingos@gmail.com' : 'Direct Email Dispatch to Store Owner'}</span>
                          </div>
                          <p className="text-xs text-[#5A5A5A] leading-relaxed font-light">
                            {t.checkoutEmailDispatchNotice}
                          </p>
                        </div>

                        {/* Preferred Payment Method */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block">
                            {t.checkoutPaymentPrefTitle}
                          </label>
                          <p className="text-[11px] text-[#7A7A7A] font-light">
                            {t.checkoutPaymentPrefDesc}
                          </p>

                          <div className="space-y-2 pt-1">
                            <label
                              onClick={() => setPaymentPreference('mpesa')}
                              className={`p-3.5 rounded-sm border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                paymentPreference === 'mpesa'
                                  ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                                  : 'bg-white border-[#E5E4E2] hover:border-[#A08C75]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-xs bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
                                  <Smartphone className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#1A1A1A] block">{t.checkoutMpesa}</span>
                                  <span className="text-[10px] text-[#7A7A7A]">Vodacom Moçambique</span>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentPreference === 'mpesa' ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-[#CCCCCC]'}`}>
                                {paymentPreference === 'mpesa' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </label>

                            <label
                              onClick={() => setPaymentPreference('bank-transfer')}
                              className={`p-3.5 rounded-sm border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                paymentPreference === 'bank-transfer'
                                  ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                                  : 'bg-white border-[#E5E4E2] hover:border-[#A08C75]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-xs bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                                  <Building className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#1A1A1A] block">{t.checkoutBankTransfer}</span>
                                  <span className="text-[10px] text-[#7A7A7A]">BCI / Millennium BIM / Standard Bank / Moza</span>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentPreference === 'bank-transfer' ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-[#CCCCCC]'}`}>
                                {paymentPreference === 'bank-transfer' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </label>

                            <label
                              onClick={() => setPaymentPreference('cash-on-delivery')}
                              className={`p-3.5 rounded-sm border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                paymentPreference === 'cash-on-delivery'
                                  ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                                  : 'bg-white border-[#E5E4E2] hover:border-[#A08C75]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-xs bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                                  <Banknote className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#1A1A1A] block">{t.checkoutCashOnDelivery}</span>
                                  <span className="text-[10px] text-[#7A7A7A]">{language === 'pt' ? 'Pagamento no ato do recebimento' : 'Pay when you receive the furniture'}</span>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentPreference === 'cash-on-delivery' ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-[#CCCCCC]'}`}>
                                {paymentPreference === 'cash-on-delivery' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Order Notes / Landmark */}
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A] block mb-1">
                            {t.checkoutOrderNotes}
                          </label>
                          <textarea
                            id="checkout-order-notes"
                            rows={2}
                            value={orderNotes}
                            onChange={e => setOrderNotes(e.target.value)}
                            placeholder={t.checkoutNotesPlaceholder}
                            className="w-full bg-white border border-[#E5E4E2] rounded-sm px-3.5 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#A08C75]"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            disabled={isSubmitting}
                            className="py-3 px-4 rounded-sm border border-[#E5E4E2] text-[#1A1A1A] hover:bg-[#E5E4E2] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>{t.checkoutBack}</span>
                          </button>

                          <button
                            id="complete-order-btn"
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3.5 px-6 rounded-sm bg-[#A08C75] hover:bg-[#8e7a64] text-white text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-75 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>
                              {isSubmitting
                                ? t.checkoutSubmittingOrder
                                : `${t.checkoutSubmitOrderBtn} • ${formatCurrency(cartTotal)}`}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Right Summary Sidebar (5 cols) */}
                <div className="lg:col-span-5 p-5 rounded-sm bg-white border border-[#E5E4E2] space-y-4 h-fit shadow-xs">
                  <h4 className="font-serif italic text-sm font-bold text-[#1A1A1A]">
                    {t.checkoutOrderSummary} ({cart.reduce((a, b) => a + b.quantity, 0)} {language === 'pt' ? 'peças' : 'items'})
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
  );
};

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen } = useShop();

  return (
    <AnimatePresence>
      {isCheckoutOpen && <CheckoutModalContent />}
    </AnimatePresence>
  );
};
