export type Language = 'en' | 'pt';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  estYear: string;

  // Announcement
  announcementDelivery: string;
  announcementWarranty: string;
  announcementPromo: string;

  // Navigation
  navCategories: string;
  navAiStylist: string;
  navLookbooks: string;
  navWishlist: string;
  navCart: string;
  navSearchPlaceholder: string;
  navToggleLang: string;
  navSwitchToPt: string;
  navSwitchToEn: string;

  // Hero
  heroBadge: string;
  heroHeadline: string;
  heroSubhead: string;
  heroSpotlight: string;
  heroInStock: string;
  heroDetails: string;
  heroAddToBag: string;
  heroExploreGallery: string;
  heroAiAdvisor: string;
  heroExplorePiece: string;
  heroFeaturedSeries: string;
  heroNewArrival: string;

  // Hero Value Props
  vpCraftTitle: string;
  vpCraftDesc: string;
  vpDeliveryTitle: string;
  vpDeliveryDesc: string;
  vpWarrantyTitle: string;
  vpWarrantyDesc: string;
  vpStylistTitle: string;
  vpStylistDesc: string;

  // Categories
  catAll: string;
  catSofas: string;
  catTables: string;
  catChairs: string;
  catBeds: string;
  catStorage: string;
  catLighting: string;

  // Rooms
  roomAll: string;
  roomLiving: string;
  roomDining: string;
  roomBedroom: string;
  roomWorkspace: string;
  roomOffice: string;

  // Gallery Toolbar & Filters
  gallerySubTitle: string;
  galleryMainTitle: string;
  galleryAiRec: string;
  gallerySmartFilters: string;
  galleryInStockOnly: string;
  galleryShowing: string;
  galleryOf: string;
  galleryPieces: string;
  gallerySortFeatured: string;
  gallerySortPriceAsc: string;
  gallerySortPriceDesc: string;
  gallerySortRating: string;
  gallerySortNewest: string;
  galleryRefineTitle: string;
  galleryResetAll: string;
  galleryPriceRange: string;
  galleryMaterials: string;
  galleryColorFamily: string;
  galleryAiPromptTitle: string;
  galleryAiPromptDesc: string;
  galleryOpenAdvisor: string;
  galleryActiveFilters: string;
  galleryClearAll: string;
  galleryNoMatchingTitle: string;
  galleryNoMatchingDesc: string;
  galleryResetFiltersBtn: string;
  galleryAskStylistBtn: string;

  // Product Card
  cardSignature: string;
  cardSave: string;
  cardNewArrival: string;
  cardQuickAdd: string;
  cardAddedToBag: string;
  cardShades: string;
  cardStyleAi: string;

  // Product Modal
  modalClose: string;
  modalHoverZoom: string;
  modalReviews: string;
  modalReviewsCount: string;
  modalColorFinish: string;
  modalAddBag: string;
  modalAddedBag: string;
  modalAddedToBag: string;
  modalInstantBuy: string;
  modalInstantCheckout: string;
  modalStylingCalloutTitle: string;
  modalStylingCalloutDesc: string;
  modalWonderingStyle: string;
  modalAiRoomAdvice: string;
  modalAskStylist: string;
  modalGuarantee: string;
  modalTabDetails: string;
  modalTabDimensions: string;
  modalTabReviews: string;
  modalTabCare: string;
  modalKeyHighlights: string;
  modalDesignedBy: string;
  modalWidth: string;
  modalDepth: string;
  modalHeight: string;
  modalWeight: string;
  modalDoorways: string;
  modalVerifiedBuyer: string;
  modalSatisfaction: string;
  modalSatisfactionNote: string;
  modalMaintenance: string;
  modalMaintenanceTitle: string;
  modalCompleteRoom: string;
  modalCompleteRoomTitle: string;
  modalPairings: string;
  modalComplementaryPairings: string;

  // Cart Drawer
  cartTitle: string;
  cartBagTitle: string;
  cartFreeShippingRemaining: string;
  cartForFreeDelivery: string;
  cartDeliveryUnlocked: string;
  cartDeliveryAddMorePrefix: string;
  cartDeliveryAddMoreSuffix: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  cartStartBrowsing: string;
  cartPromoPlaceholder: string;
  cartPromoApply: string;
  cartApply: string;
  cartPromoRemove: string;
  cartRemove: string;
  cartPromoApplied: string;
  cartApplied: string;
  cartSubtotal: string;
  cartDiscount: string;
  cartShipping: string;
  cartWhiteGloveDelivery: string;
  cartFree: string;
  cartDeliveryFree: string;
  cartEstTax: string;
  cartEstimatedTax: string;
  cartTotalAmount: string;
  cartProceedCheckout: string;
  cartEncrypted: string;
  cartSecurityBadge: string;

  // Wishlist Drawer
  wishlistTitle: string;
  wishlistEmptyTitle: string;
  wishlistEmptyDesc: string;
  wishlistMoveToBag: string;
  wishlistAddAll: string;
  wishlistAddAllToBag: string;

  // Lookbooks
  lookbookTag: string;
  lookbookTitle: string;
  lookbookFeaturedInRoom: string;
  lookbookCustomizeRoom: string;
  lookbookViewPiece: string;
  lookbookPurchaseRoom: string;

  // AI Stylist Modal
  aiModalTitle: string;
  aiModalSubtitle: string;
  aiTabCuratedRoom: string;
  aiCuratedRoom: string;
  aiTabConsultation: string;
  aiConsultation: string;
  aiFocalPiece: string;
  aiCuratingFor: string;
  aiTargetRoom: string;
  aiAestheticVibe: string;
  aiColorHarmony: string;
  aiCustomPlaceholder: string;
  aiCustomNotesPlaceholder: string;
  aiGenerateBtn: string;
  aiComposing: string;
  aiGeneratingBtn: string;
  aiCuratingPairings: string;
  aiEvaluatingErgonomics: string;
  aiLoadingTitle: string;
  aiLoadingDesc: string;
  aiStyleProfile: string;
  aiHarmonizedPalette: string;
  aiRecommendedEnsemble: string;
  aiAddAllBag: string;
  aiAddAllToBag: string;
  aiSpatialPlacement: string;
  aiSpatialRules: string;
  aiChatPlaceholder: string;
  aiThinking: string;

  // Search Bar
  searchPlaceholder: string;
  searchMatchingPieces: string;
  searchViewInGallery: string;
  searchNoExact: string;
  searchNoExactFound: string;
  searchAskAi: string;
  searchPopular: string;
  searchPopularSearches: string;
  searchRoomAdvice: string;
  searchAdvicePrompt: string;
  searchLaunchAi: string;
  searchLaunchStylist: string;

  // Checkout Modal
  checkoutTitle: string;
  checkoutStep1: string;
  checkoutStep2: string;
  checkoutStep3: string;
  checkoutStepShipping: string;
  checkoutStepDelivery: string;
  checkoutStepPayment: string;
  checkoutStepConfirmed: string;
  checkoutTestingBanner: string;
  checkoutTestingFlow: string;
  checkoutFillDemo: string;
  checkoutShippingTitle: string;
  checkoutDeliveryContact: string;
  checkoutShippingDesc: string;
  checkoutWhereDeliver: string;
  checkoutFirstName: string;
  checkoutLastName: string;
  checkoutEmail: string;
  checkoutPhone: string;
  checkoutAddress: string;
  checkoutStreetAddress: string;
  checkoutApt: string;
  checkoutApartment: string;
  checkoutCity: string;
  checkoutState: string;
  checkoutZip: string;
  checkoutPostalCode: string;
  checkoutContinueDelivery: string;
  checkoutDeliveryLevel: string;
  checkoutDeliveryLevelTitle: string;
  checkoutDeliveryLevelDesc: string;
  checkoutChooseExperience: string;
  checkoutWhiteGloveTitle: string;
  checkoutWhiteGloveBadge: string;
  checkoutRecommended: string;
  checkoutWhiteGloveDesc: string;
  checkoutCurbsideTitle: string;
  checkoutCurbsideDesc: string;
  checkoutBack: string;
  checkoutContinuePayment: string;
  checkoutPaymentTitle: string;
  checkoutSecurePayment: string;
  checkoutPaymentDesc: string;
  checkoutCardOption: string;
  checkoutCreditCard: string;
  checkoutApplePayOption: string;
  checkoutKlarnaOption: string;
  checkoutCardNumber: string;
  checkoutCardExpiry: string;
  checkoutExpiration: string;
  checkoutCardCvv: string;
  checkoutCvv: string;
  checkoutApplePayDesc: string;
  checkoutKlarnaDesc: string;
  checkoutAuthorize: string;
  checkoutAuthorizeBtn: string;
  checkoutEmailDispatchNotice: string;
  checkoutPaymentPrefTitle: string;
  checkoutPaymentPrefDesc: string;
  checkoutMpesa: string;
  checkoutBankTransfer: string;
  checkoutCashOnDelivery: string;
  checkoutOrderNotes: string;
  checkoutNotesPlaceholder: string;
  checkoutSubmitOrderBtn: string;
  checkoutSubmittingOrder: string;
  checkoutSuccessEmailSent: string;
  checkoutNextStepsTitle: string;
  checkoutNextStepsDesc: string;
  checkoutWhatsAppDirect: string;
  checkoutOrderSummary: string;
  checkoutOrderSummaryTitle: string;
  checkoutGrandTotal: string;
  checkoutSuccessTitle: string;
  checkoutThankYou: string;
  checkoutSuccessSubtitle: string;
  checkoutOrderPrefix: string;
  checkoutReceiptSent: string;
  checkoutReceiptSentTo: string;
  checkoutEstimatedDelivery: string;
  checkoutEstimatedDeliveryBadge: string;
  checkoutTrackConfirmed: string;
  checkoutTrackingConfirmed: string;
  checkoutTrackCrafting: string;
  checkoutTrackingCrafting: string;
  checkoutTrackDispatched: string;
  checkoutTrackingDispatched: string;
  checkoutTrackSetup: string;
  checkoutTrackingSetup: string;
  checkoutSummaryPieces: string;
  checkoutSummarySelected: string;
  checkoutQty: string;
  checkoutTotalPaid: string;
  checkoutContinueBrowsing: string;

  // Footer
  footerPrivateCircle: string;
  footerNewsletterTitle: string;
  footerNewsletterDesc: string;
  footerWelcomeToast: string;
  footerWelcomeCode: string;
  footerEmailPlaceholder: string;
  footerSubscribe: string;
  footerSubscribeBtn: string;
  footerBrandStory: string;
  footerAboutBrand: string;
  footerStudioLocations: string;
  footerCollection: string;
  footerColCollection: string;
  footerExperience: string;
  footerColExperience: string;
  footerAssurance: string;
  footerColAssurance: string;
  footerWarranty: string;
  footerTrial: string;
  footerTimber: string;
  footerWeaves: string;
  footerAllRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerAccessibility: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    // Brand
    brandName: 'SARVICIMOBLIARIA',
    brandTagline: 'Architecture & Fine Furniture',
    estYear: 'EST. 2024',

    // Announcement
    announcementDelivery: 'Complimentary White-Glove Delivery on orders 1,500 MT+ in Mozambique',
    announcementWarranty: '10-Year Frame Warranty',
    announcementPromo: 'Use code WELCOME10 for 10% off',

    // Navigation
    navCategories: 'Categories',
    navAiStylist: 'AI Stylist',
    navLookbooks: 'Lookbooks',
    navWishlist: 'Wishlist',
    navCart: 'BAG',
    navSearchPlaceholder: 'Search pieces, materials, styles...',
    navToggleLang: 'Language',
    navSwitchToPt: 'Português',
    navSwitchToEn: 'English',

    // Hero
    heroBadge: 'Iconic Design 2026',
    heroHeadline: 'Refined Spaces, Crafted for Life.',
    heroSubhead: 'Timeless furniture blending Scandinavian organic warmth with Italian architectural minimalism.',
    heroSpotlight: 'Spotlight Piece',
    heroInStock: 'In Stock',
    heroDetails: 'Details',
    heroAddToBag: 'Add to Bag',
    heroExploreGallery: 'Explore Gallery',
    heroAiAdvisor: 'AI Room Advisor',
    heroExplorePiece: 'Explore Piece',
    heroFeaturedSeries: 'Featured Series',
    heroNewArrival: 'NEW ARRIVAL',

    // Hero Value Props
    vpCraftTitle: 'Architectural Craft',
    vpCraftDesc: 'Solid hardwood & stone',
    vpDeliveryTitle: 'White-Glove Delivery',
    vpDeliveryDesc: 'Room placement & unboxing',
    vpWarrantyTitle: '10-Year Warranty',
    vpWarrantyDesc: 'Guaranteed structural integrity',
    vpStylistTitle: 'AI Interior Stylist',
    vpStylistDesc: 'Tailored room harmonies',

    // Categories
    catAll: 'All Collections',
    catSofas: 'Sofas & Sectionals',
    catTables: 'Tables & Consoles',
    catChairs: 'Chairs & Benches',
    catBeds: 'Beds & Nightstands',
    catStorage: 'Storage & Credenzas',
    catLighting: 'Sculptural Lighting',

    // Rooms
    roomAll: 'All Rooms',
    roomLiving: 'Living Room',
    roomDining: 'Dining Room',
    roomBedroom: 'Bedroom',
    roomWorkspace: 'Workspace',
    roomOffice: 'Executive Home Office',

    // Gallery Toolbar & Filters
    gallerySubTitle: 'The Studio Collection',
    galleryMainTitle: 'Curated Furniture Pieces',
    galleryAiRec: 'AI Recommendation',
    gallerySmartFilters: 'Smart Filters',
    galleryInStockOnly: 'In-Stock Only',
    galleryShowing: 'Showing',
    galleryOf: 'of',
    galleryPieces: 'pieces',
    gallerySortFeatured: 'Sort by: Featured',
    gallerySortPriceAsc: 'Price: Low to High',
    gallerySortPriceDesc: 'Price: High to Low',
    gallerySortRating: 'Highest Rated',
    gallerySortNewest: 'New Arrivals',
    galleryRefineTitle: 'Refine by Attributes',
    galleryResetAll: 'Reset all',
    galleryPriceRange: 'Price Range',
    galleryMaterials: 'Craft Materials',
    galleryColorFamily: 'Color Family',
    galleryAiPromptTitle: 'Need room guidance?',
    galleryAiPromptDesc: 'Let our AI interior advisor curate matching furniture based on your room dimensions.',
    galleryOpenAdvisor: 'Open Stylist Studio',
    galleryActiveFilters: 'Active filters:',
    galleryClearAll: 'Clear all',
    galleryNoMatchingTitle: 'No matching pieces',
    galleryNoMatchingDesc: "We couldn't find any furniture items matching your exact filter combination.",
    galleryResetFiltersBtn: 'Reset All Filters',
    galleryAskStylistBtn: 'Ask AI Stylist',

    // Product Card
    cardSignature: 'Signature',
    cardSave: 'Save',
    cardNewArrival: 'New Arrival',
    cardQuickAdd: 'Quick Add',
    cardAddedToBag: 'Added to Bag',
    cardShades: 'shades',
    cardStyleAi: 'Style AI',

    // Product Modal
    modalClose: 'Close product view',
    modalHoverZoom: 'Hover to zoom',
    modalReviews: 'reviews',
    modalReviewsCount: 'reviews',
    modalColorFinish: 'Color / Finish:',
    modalAddBag: 'Add to Bag',
    modalAddedBag: 'Added to Bag!',
    modalAddedToBag: 'Added to Bag!',
    modalInstantBuy: 'Instant Secure Checkout',
    modalInstantCheckout: 'Instant Secure Checkout',
    modalStylingCalloutTitle: 'Wondering how to style this?',
    modalStylingCalloutDesc: 'Get AI room advice and complementary pieces',
    modalWonderingStyle: 'Wondering how to style this?',
    modalAiRoomAdvice: 'Get AI room advice and complementary pieces',
    modalAskStylist: 'Ask Stylist',
    modalGuarantee: '10-Year Guarantee',
    modalTabDetails: 'Details',
    modalTabDimensions: 'Dimensions',
    modalTabReviews: 'Reviews',
    modalTabCare: 'Care',
    modalKeyHighlights: 'Key Highlights',
    modalDesignedBy: 'Designed by',
    modalWidth: 'Width',
    modalDepth: 'Depth',
    modalHeight: 'Height',
    modalWeight: 'Weight',
    modalDoorways: 'Fits through doorways',
    modalVerifiedBuyer: 'Verified Buyer',
    modalSatisfaction: '5.0 average customer satisfaction rating across verified deliveries.',
    modalSatisfactionNote: '5.0 average customer satisfaction rating across verified deliveries.',
    modalMaintenance: 'Maintenance & Longevity',
    modalMaintenanceTitle: 'Maintenance & Longevity',
    modalCompleteRoom: 'Complete The Room',
    modalCompleteRoomTitle: 'Complete The Room',
    modalPairings: 'Complementary pairings',
    modalComplementaryPairings: 'Complementary pairings',

    // Cart Drawer
    cartTitle: 'Shopping Bag',
    cartBagTitle: 'Shopping Bag',
    cartFreeShippingRemaining: 'Add',
    cartForFreeDelivery: 'for Free White-Glove Delivery',
    cartDeliveryUnlocked: 'Complimentary White-Glove Delivery Unlocked',
    cartDeliveryAddMorePrefix: 'Add',
    cartDeliveryAddMoreSuffix: 'for Free White-Glove Delivery',
    cartEmptyTitle: 'Your bag is empty',
    cartEmptyDesc: 'Explore our handcrafted sofas, travertine tables, and sculptural lighting.',
    cartStartBrowsing: 'Start Browsing',
    cartPromoPlaceholder: 'Promo code (e.g. WELCOME10)',
    cartPromoApply: 'Apply',
    cartApply: 'Apply',
    cartPromoRemove: 'Remove',
    cartRemove: 'Remove',
    cartPromoApplied: 'applied',
    cartApplied: 'applied',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Discount',
    cartShipping: 'White-Glove Delivery',
    cartWhiteGloveDelivery: 'White-Glove Delivery',
    cartFree: 'FREE',
    cartDeliveryFree: 'FREE',
    cartEstTax: 'Estimated Tax',
    cartEstimatedTax: 'Estimated Tax',
    cartTotalAmount: 'Total Amount',
    cartProceedCheckout: 'Proceed to Checkout',
    cartEncrypted: '256-Bit SSL Encrypted & Guarantee',
    cartSecurityBadge: '256-Bit SSL Encrypted & Guarantee',

    // Wishlist Drawer
    wishlistTitle: 'Saved Wishlist',
    wishlistEmptyTitle: 'No saved pieces yet',
    wishlistEmptyDesc: 'Click the heart on any furniture piece to save it to your personal curation.',
    wishlistMoveToBag: 'Move to Bag',
    wishlistAddAll: 'Add All Saved Pieces to Bag',
    wishlistAddAllToBag: 'Add All Saved Pieces to Bag',

    // Lookbooks
    lookbookTag: 'Architectural Lookbooks',
    lookbookTitle: 'Shop Complete Room Aesthetics',
    lookbookFeaturedInRoom: 'Featured in this Room',
    lookbookCustomizeRoom: 'Customize Room',
    lookbookViewPiece: 'View piece →',
    lookbookPurchaseRoom: 'Purchase Entire Curated Room',

    // AI Stylist Modal
    aiModalTitle: 'Sarvicimobliaria AI Interior Stylist',
    aiModalSubtitle: 'Curated Spatial Design & Material Coordination',
    aiTabCuratedRoom: 'Curated Room',
    aiCuratedRoom: 'Curated Room',
    aiTabConsultation: 'Stylist Consultation',
    aiConsultation: 'Stylist Consultation',
    aiFocalPiece: 'Focal Anchor Piece',
    aiCuratingFor: 'Curating complementary pieces',
    aiTargetRoom: 'Target Room',
    aiAestheticVibe: 'Aesthetic Vibe',
    aiColorHarmony: 'Color Harmony',
    aiCustomPlaceholder: "Optional notes: e.g., '14x16 room with south-facing natural light, need a cozy reading corner'...",
    aiCustomNotesPlaceholder: "Optional notes: e.g., '14x16 room with south-facing natural light, need a cozy reading corner'...",
    aiGenerateBtn: 'Generate Scheme',
    aiComposing: 'Composing...',
    aiGeneratingBtn: 'Composing...',
    aiCuratingPairings: 'Curating harmonious furniture pairings...',
    aiEvaluatingErgonomics: 'Evaluating ergonomics, natural lighting, and tactile texture balances.',
    aiLoadingTitle: 'Curating harmonious furniture pairings...',
    aiLoadingDesc: 'Evaluating ergonomics, natural lighting, and tactile texture balances.',
    aiStyleProfile: 'Style Profile',
    aiHarmonizedPalette: 'Harmonized Palette:',
    aiRecommendedEnsemble: 'Recommended Furniture Ensemble',
    aiAddAllBag: 'Add All to Bag',
    aiAddAllToBag: 'Add All to Bag',
    aiSpatialPlacement: 'Spatial & Lighting Placement Rules',
    aiSpatialRules: 'Spatial & Lighting Placement Rules',
    aiChatPlaceholder: 'Ask about dimensions, rug clearance, lighting temperatures, or wood combinations...',
    aiThinking: 'Sarvicimobliaria Stylist is considering proportions & pairings...',

    // Search Bar
    searchPlaceholder: 'Search pieces, materials, styles...',
    searchMatchingPieces: 'Matching Pieces',
    searchViewInGallery: 'View in gallery',
    searchNoExact: 'No exact pieces found for',
    searchNoExactFound: 'No exact pieces found for',
    searchAskAi: 'Ask AI Stylist for recommendations',
    searchPopular: 'Popular Searches',
    searchPopularSearches: 'Popular Searches',
    searchRoomAdvice: 'Looking for specific room advice?',
    searchAdvicePrompt: 'Looking for specific room advice?',
    searchLaunchAi: 'Launch AI Stylist →',
    searchLaunchStylist: 'Launch AI Stylist →',

    // Checkout Modal
    checkoutTitle: 'Direct Order Processing & Email Dispatch',
    checkoutStep1: '1. Contact & Address',
    checkoutStep2: '2. Delivery in MZ',
    checkoutStep3: '3. Order Dispatch',
    checkoutStepShipping: '1. Contact & Address',
    checkoutStepDelivery: '2. Delivery in MZ',
    checkoutStepPayment: '3. Order Dispatch',
    checkoutStepConfirmed: 'Order Confirmation',
    checkoutTestingBanner: 'Testing checkout flow?',
    checkoutTestingFlow: 'Quick test with Mozambique sample details?',
    checkoutFillDemo: 'Fill Sample MZ Info',
    checkoutShippingTitle: '1. Delivery Address & Contact (Mozambique)',
    checkoutDeliveryContact: '1. Delivery Address & Contact (Mozambique)',
    checkoutShippingDesc: 'Where should our white-glove team deliver and assemble your furniture in Mozambique?',
    checkoutWhereDeliver: 'Where should our white-glove team deliver and assemble your furniture in Mozambique?',
    checkoutFirstName: 'First Name *',
    checkoutLastName: 'Last Name *',
    checkoutEmail: 'Email Address *',
    checkoutPhone: 'Phone / WhatsApp (+258) *',
    checkoutAddress: 'Street Address / Neighborhood (Bairro) *',
    checkoutStreetAddress: 'Street Address / Neighborhood (Bairro) *',
    checkoutApt: 'House / Apt / Landmark',
    checkoutApartment: 'House / Apt / Landmark',
    checkoutCity: 'City (e.g. Maputo, Matola, Beira) *',
    checkoutState: 'Province (e.g. Maputo Cidade, Sofala) *',
    checkoutZip: 'Postal Code / Area Code',
    checkoutPostalCode: 'Postal Code / Area Code',
    checkoutContinueDelivery: 'Continue to Delivery Options',
    checkoutDeliveryLevel: '2. Delivery & Assembly in Mozambique',
    checkoutDeliveryLevelTitle: '2. Delivery & Assembly in Mozambique',
    checkoutDeliveryLevelDesc: 'Choose your preferred delivery handling experience.',
    checkoutChooseExperience: 'Choose your preferred delivery handling experience.',
    checkoutWhiteGloveTitle: 'White-Glove Delivery with In-Room Assembly (Maputo & Region)',
    checkoutWhiteGloveBadge: 'Recommended',
    checkoutRecommended: 'Recommended',
    checkoutWhiteGloveDesc: 'Two-person team delivers, places in room of choice, assembles, and removes packaging.',
    checkoutCurbsideTitle: 'Standard Doorstep Delivery / Showroom Pickup',
    checkoutCurbsideDesc: 'Delivered securely to your gate/building entrance or prepared for pickup at our showroom.',
    checkoutBack: 'Back',
    checkoutContinuePayment: 'Continue to Order Confirmation',
    checkoutPaymentTitle: '3. Order Confirmation & Email Dispatch',
    checkoutSecurePayment: '3. Order Confirmation & Email Dispatch',
    checkoutPaymentDesc: 'No payment gateway required. Order details will be sent directly to our team at dedrickdomingos.domingos@gmail.com and your email.',
    checkoutCardOption: 'Credit Card',
    checkoutCreditCard: 'Credit Card',
    checkoutApplePayOption: 'Apple / G-Pay',
    checkoutKlarnaOption: 'Klarna 4x',
    checkoutCardNumber: 'Card Number',
    checkoutCardExpiry: 'Expiration (MM/YY)',
    checkoutExpiration: 'Expiration (MM/YY)',
    checkoutCardCvv: 'Security Code (CVV)',
    checkoutCvv: 'Security Code (CVV)',
    checkoutApplePayDesc: 'Instant 1-Click Biometric Pay activated for your device.',
    checkoutKlarnaDesc: '4 interest-free payments. Due every 2 weeks. No hidden fees.',
    checkoutAuthorize: 'Confirm & Send Order',
    checkoutAuthorizeBtn: 'Confirm & Send Order',
    checkoutEmailDispatchNotice: 'Order details and invoice will be sent directly to dedrickdomingos.domingos@gmail.com and your email address. Our team will contact you to confirm payment (M-Pesa, Bank Transfer, or Cash on Delivery) and schedule delivery.',
    checkoutPaymentPrefTitle: 'Preferred Payment Method on Contact',
    checkoutPaymentPrefDesc: 'Select how you prefer to pay when our team contacts you:',
    checkoutMpesa: 'M-Pesa (Vodacom)',
    checkoutBankTransfer: 'Bank Transfer (BCI / Millennium BIM / Standard Bank / Moza)',
    checkoutCashOnDelivery: 'Payment on Delivery / In Showroom',
    checkoutOrderNotes: 'Special Instructions / Delivery Landmark (Optional)',
    checkoutNotesPlaceholder: 'e.g. Near Polana Shopping, delivery on Saturday morning preferred...',
    checkoutSubmitOrderBtn: 'Confirm & Send Order to Email',
    checkoutSubmittingOrder: 'Sending Order Details...',
    checkoutSuccessEmailSent: 'A complete copy with all furniture items, delivery address, and pricing in Meticais (MT) was sent to dedrickdomingos.domingos@gmail.com and to',
    checkoutNextStepsTitle: 'What happens next?',
    checkoutNextStepsDesc: 'Our Sarvicimobliaria sales team in Mozambique will reach out to you via WhatsApp / Phone or Email within 24 hours to confirm order availability, payment details, and schedule white-glove delivery to your location.',
    checkoutWhatsAppDirect: 'Chat on WhatsApp with Sarvicimobliaria',
    checkoutOrderSummary: 'Order Summary',
    checkoutOrderSummaryTitle: 'Order Summary',
    checkoutGrandTotal: 'Grand Total',
    checkoutSuccessTitle: 'Thank You For Your Order!',
    checkoutThankYou: 'Thank You For Your Order!',
    checkoutSuccessSubtitle: 'Order Reference',
    checkoutOrderPrefix: 'Order',
    checkoutReceiptSent: "We've dispatched order details to",
    checkoutReceiptSentTo: "We've sent a detailed receipt and tracking link to",
    checkoutEstimatedDelivery: 'Estimated White-Glove In-Room Delivery',
    checkoutEstimatedDeliveryBadge: 'Estimated White-Glove In-Room Delivery',
    checkoutTrackConfirmed: 'Confirmed',
    checkoutTrackingConfirmed: 'Confirmed',
    checkoutTrackCrafting: 'Crafting',
    checkoutTrackingCrafting: 'Crafting',
    checkoutTrackDispatched: 'Dispatched',
    checkoutTrackingDispatched: 'Dispatched',
    checkoutTrackSetup: 'In-Room Setup',
    checkoutTrackingSetup: 'In-Room Setup',
    checkoutSummaryPieces: 'Summary of Selected Pieces',
    checkoutSummarySelected: 'Summary of Selected Pieces',
    checkoutQty: 'Qty',
    checkoutTotalPaid: 'Total Paid',
    checkoutContinueBrowsing: 'Continue Browsing Studio',

    // Footer
    footerPrivateCircle: 'Sarvicimobliaria · Private Circle',
    footerNewsletterTitle: 'Receive First-Access to Limited Stone & Hardwood Releases',
    footerNewsletterDesc: 'Join our architectural digest for seasonal furniture drops, material care guides, and exclusive trade discounts.',
    footerWelcomeToast: 'Welcome to Sarvicimobliaria! Use code WELCOME10 at checkout for 10% off.',
    footerWelcomeCode: 'Welcome to Sarvicimobliaria! Use code WELCOME10 at checkout for 10% off.',
    footerEmailPlaceholder: 'Enter your email address...',
    footerSubscribe: 'Subscribe',
    footerSubscribeBtn: 'Subscribe',
    footerBrandStory: 'We design and construct heirloom-grade furniture and real estate aesthetics using natural Italian travertine, kiln-dried FSC hardwoods, and tactile bouclé textiles.',
    footerAboutBrand: 'We design and construct heirloom-grade furniture and real estate aesthetics using natural Italian travertine, kiln-dried FSC hardwoods, and tactile bouclé textiles.',
    footerStudioLocations: 'Studio: Milan, Lisbon & San Francisco',
    footerCollection: 'Collection',
    footerColCollection: 'Collection',
    footerExperience: 'Experience',
    footerColExperience: 'Experience',
    footerAssurance: 'Assurance',
    footerColAssurance: 'Assurance',
    footerWarranty: '10-Year Frame Warranty',
    footerTrial: '30-Day In-Home Trial',
    footerTimber: 'FSC-Certified Solid Timber',
    footerWeaves: 'Durable Olefin & Wool Weaves',
    footerAllRights: 'Sarvicimobliaria Design Studio & Imobiliária Inc. All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerAccessibility: 'Accessibility',
  },
  pt: {
    // Brand
    brandName: 'SARVICIMOBLIARIA',
    brandTagline: 'Imobiliária, Arquitetura & Design de Interiores',
    estYear: 'FUNDADA EM 2024',

    // Announcement
    announcementDelivery: 'Entrega White-Glove gratuita com montagem inclusa em Moçambique em pedidos acima de 1.500 MT',
    announcementWarranty: 'Garantia Estrutural de 10 Anos',
    announcementPromo: 'Use o cupom WELCOME10 para 10% de desconto',

    // Navigation
    navCategories: 'Categorias',
    navAiStylist: 'Estilista IA',
    navLookbooks: 'Lookbooks',
    navWishlist: 'Favoritos',
    navCart: 'SACOLA',
    navSearchPlaceholder: 'Buscar peças, materiais, acabamentos...',
    navToggleLang: 'Idioma',
    navSwitchToPt: 'Português',
    navSwitchToEn: 'English',

    // Hero
    heroBadge: 'Design Icônico 2026',
    heroHeadline: 'Espaços Refinados, Criados para a Vida.',
    heroSubhead: 'Mobiliário atemporal que une o aconchego orgânico escandinavo ao minimalismo arquitetônico italiano.',
    heroSpotlight: 'Peça em Destaque',
    heroInStock: 'Em Estoque',
    heroDetails: 'Detalhes',
    heroAddToBag: 'Adicionar à Sacola',
    heroExploreGallery: 'Explorar Galeria',
    heroAiAdvisor: 'Consultor de Espaços IA',
    heroExplorePiece: 'Ver Detalhes da Peça',
    heroFeaturedSeries: 'Série Exclusiva',
    heroNewArrival: 'LANÇAMENTO',

    // Hero Value Props
    vpCraftTitle: 'Artesanato Arquitetônico',
    vpCraftDesc: 'Madeira maciça e pedra nobre',
    vpDeliveryTitle: 'Entrega White-Glove',
    vpDeliveryDesc: 'Montagem no quarto e desembalagem',
    vpWarrantyTitle: 'Garantia de 10 Anos',
    vpWarrantyDesc: 'Integridade estrutural assegurada',
    vpStylistTitle: 'Estilista de Interiores IA',
    vpStylistDesc: 'Harmonias de ambientes sob medida',

    // Categories
    catAll: 'Todas as Coleções',
    catSofas: 'Sofás & Modulares',
    catTables: 'Mesas & Aparadores',
    catChairs: 'Cadeiras & Poltronas',
    catBeds: 'Camas & Cabeceiras',
    catStorage: 'Aparadores & Estantes',
    catLighting: 'Iluminação Escultural',

    // Rooms
    roomAll: 'Todos os Ambientes',
    roomLiving: 'Sala de Estar',
    roomDining: 'Sala de Jantar',
    roomBedroom: 'Quarto & Suíte',
    roomWorkspace: 'Escritório & Home Office',
    roomOffice: 'Escritório & Home Office',

    // Gallery Toolbar & Filters
    gallerySubTitle: 'Coleção do Studio',
    galleryMainTitle: 'Móveis de Design & Curadoria',
    galleryAiRec: 'Recomendação IA',
    gallerySmartFilters: 'Filtros Inteligentes',
    galleryInStockOnly: 'Apenas a Pronta Entrega',
    galleryShowing: 'Exibindo',
    galleryOf: 'de',
    galleryPieces: 'peças',
    gallerySortFeatured: 'Ordenar por: Destaques',
    gallerySortPriceAsc: 'Preço: Menor para Maior',
    gallerySortPriceDesc: 'Preço: Maior para Menor',
    gallerySortRating: 'Mais Bem Avaliados',
    gallerySortNewest: 'Lançamentos Recentes',
    galleryRefineTitle: 'Refinar por Atributos',
    galleryResetAll: 'Limpar todos',
    galleryPriceRange: 'Faixa de Preço',
    galleryMaterials: 'Materiais Nobres',
    galleryColorFamily: 'Paleta de Cores',
    galleryAiPromptTitle: 'Precisa de consultoria para seu espaço?',
    galleryAiPromptDesc: 'Deixe nossa IA de design de interiores indicar as melhores combinações de acordo com as dimensões do seu ambiente.',
    galleryOpenAdvisor: 'Abrir Studio do Estilista',
    galleryActiveFilters: 'Filtros ativos:',
    galleryClearAll: 'Limpar filtros',
    galleryNoMatchingTitle: 'Nenhuma peça encontrada',
    galleryNoMatchingDesc: 'Não encontramos móveis correspondentes a essa combinação exata de filtros.',
    galleryResetFiltersBtn: 'Redefinir Filtros',
    galleryAskStylistBtn: 'Consultar Estilista IA',

    // Product Card
    cardSignature: 'Assinatura',
    cardSave: 'Economize',
    cardNewArrival: 'Lançamento',
    cardQuickAdd: 'Adicionar Rápido',
    cardAddedToBag: 'Adicionado à Sacola',
    cardShades: 'tons',
    cardStyleAi: 'Estilizar com IA',

    // Product Modal
    modalClose: 'Fechar visualização do produto',
    modalHoverZoom: 'Passe o mouse para ampliar',
    modalReviews: 'avaliações',
    modalReviewsCount: 'avaliações',
    modalColorFinish: 'Cor / Acabamento:',
    modalAddBag: 'Adicionar à Sacola',
    modalAddedBag: 'Adicionado à Sacola!',
    modalAddedToBag: 'Adicionado à Sacola!',
    modalInstantBuy: 'Compra Rápida & Segura',
    modalInstantCheckout: 'Compra Rápida & Segura',
    modalStylingCalloutTitle: 'Dúvidas sobre como combinar esta peça?',
    modalStylingCalloutDesc: 'Receba sugestões de iluminação, tapetes e paletas de cores da IA',
    modalWonderingStyle: 'Dúvidas sobre como combinar esta peça?',
    modalAiRoomAdvice: 'Receba sugestões de iluminação, tapetes e paletas de cores da IA',
    modalAskStylist: 'Falar com Estilista',
    modalGuarantee: 'Garantia de 10 Anos',
    modalTabDetails: 'Detalhes',
    modalTabDimensions: 'Dimensões',
    modalTabReviews: 'Avaliações',
    modalTabCare: 'Cuidados',
    modalKeyHighlights: 'Destaques Principais',
    modalDesignedBy: 'Desenhado por',
    modalWidth: 'Largura',
    modalDepth: 'Profundidade',
    modalHeight: 'Altura',
    modalWeight: 'Peso',
    modalDoorways: 'Passa por portas padrão',
    modalVerifiedBuyer: 'Comprador Verificado',
    modalSatisfaction: 'Média de satisfação de 5.0 estrelas em entregas verificadas.',
    modalSatisfactionNote: 'Média de satisfação de 5.0 estrelas em entregas verificadas.',
    modalMaintenance: 'Manutenção & Durabilidade',
    modalMaintenanceTitle: 'Manutenção & Durabilidade',
    modalCompleteRoom: 'Complete o Ambiente',
    modalCompleteRoomTitle: 'Complete o Ambiente',
    modalPairings: 'Combinações harmoniosas',
    modalComplementaryPairings: 'Combinações harmoniosas',

    // Cart Drawer
    cartTitle: 'Sua Sacola de Compras',
    cartBagTitle: 'Sua Sacola de Compras',
    cartFreeShippingRemaining: 'Adicione',
    cartForFreeDelivery: 'para Ganhar Entrega White-Glove Gratuita',
    cartDeliveryUnlocked: 'Entrega White-Glove Gratuita Desbloqueada',
    cartDeliveryAddMorePrefix: 'Adicione',
    cartDeliveryAddMoreSuffix: 'para Ganhar Entrega White-Glove Gratuita',
    cartEmptyTitle: 'Sua sacola está vazia',
    cartEmptyDesc: 'Explore nossos sofás artesanais, mesas em travertino e luminárias esculturais.',
    cartStartBrowsing: 'Começar a Explorar',
    cartPromoPlaceholder: 'Cupom de desconto (ex: WELCOME10)',
    cartPromoApply: 'Aplicar',
    cartApply: 'Aplicar',
    cartPromoRemove: 'Remover',
    cartRemove: 'Remover',
    cartPromoApplied: 'aplicado',
    cartApplied: 'aplicado',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Desconto',
    cartShipping: 'Entrega White-Glove',
    cartWhiteGloveDelivery: 'Entrega White-Glove',
    cartFree: 'GRÁTIS',
    cartDeliveryFree: 'GRÁTIS',
    cartEstTax: 'Impostos Estimados',
    cartEstimatedTax: 'Impostos Estimados',
    cartTotalAmount: 'Valor Total',
    cartProceedCheckout: 'Finalizar Pedido',
    cartEncrypted: 'Criptografia SSL de 256 Bits & Garantia',
    cartSecurityBadge: 'Criptografia SSL de 256 Bits & Garantia',

    // Wishlist Drawer
    wishlistTitle: 'Lista de Desejos',
    wishlistEmptyTitle: 'Nenhuma peça salva ainda',
    wishlistEmptyDesc: 'Clique no ícone de coração em qualquer peça para salvá-la em sua curadoria pessoal.',
    wishlistMoveToBag: 'Mover para Sacola',
    wishlistAddAll: 'Adicionar Todos à Sacola',
    wishlistAddAllToBag: 'Adicionar Todos à Sacola',

    // Lookbooks
    lookbookTag: 'Lookbooks de Arquitetura',
    lookbookTitle: 'Compre Ambientes Completos',
    lookbookFeaturedInRoom: 'Peças Neste Ambiente',
    lookbookCustomizeRoom: 'Personalizar Ambiente',
    lookbookViewPiece: 'Ver peça →',
    lookbookPurchaseRoom: 'Comprar Ambiente Completo',

    // AI Stylist Modal
    aiModalTitle: 'Estilista de Interiores IA Sarvicimobliaria',
    aiModalSubtitle: 'Design Espacial Curado & Coordenação de Materiais',
    aiTabCuratedRoom: 'Ambiente Curado',
    aiCuratedRoom: 'Ambiente Curado',
    aiTabConsultation: 'Consultoria Personalizada',
    aiConsultation: 'Consultoria Personalizada',
    aiFocalPiece: 'Peça Central de Destaque',
    aiCuratingFor: 'Curando peças complementares para seu espaço',
    aiTargetRoom: 'Ambiente Alvo',
    aiAestheticVibe: 'Estilo Estético',
    aiColorHarmony: 'Harmonia de Cores',
    aiCustomPlaceholder: "Observações: ex: 'Sala 4x5m com muita luz natural, quero um cantinho de leitura acolhedor'...",
    aiCustomNotesPlaceholder: "Observações: ex: 'Sala 4x5m com muita luz natural, quero um cantinho de leitura acolhedor'...",
    aiGenerateBtn: 'Gerar Proposta',
    aiComposing: 'Criando Proposta...',
    aiGeneratingBtn: 'Criando Proposta...',
    aiCuratingPairings: 'Curando combinações harmoniosas de mobiliário...',
    aiEvaluatingErgonomics: 'Avaliando ergonomia, iluminação natural e equilíbrio de texturas táteis.',
    aiLoadingTitle: 'Curando combinações harmoniosas de mobiliário...',
    aiLoadingDesc: 'Avaliando ergonomia, iluminação natural e equilíbrio de texturas táteis.',
    aiStyleProfile: 'Perfil de Estilo',
    aiHarmonizedPalette: 'Paleta Harmonizada:',
    aiRecommendedEnsemble: 'Conjunto de Móveis Recomendados',
    aiAddAllBag: 'Adicionar Todos à Sacola',
    aiAddAllToBag: 'Adicionar Todos à Sacola',
    aiSpatialPlacement: 'Regras de Disposição Espacial & Iluminação',
    aiSpatialRules: 'Regras de Disposição Espacial & Iluminação',
    aiChatPlaceholder: 'Pergunte sobre dimensões, tapetes, temperaturas de luz ou combinações de madeira...',
    aiThinking: 'O Estilista Sarvicimobliaria está calculando proporções e combinações...',

    // Search Bar
    searchPlaceholder: 'Buscar peças, materiais, acabamentos...',
    searchMatchingPieces: 'Peças Encontradas',
    searchViewInGallery: 'Ver na galeria',
    searchNoExact: 'Nenhuma peça encontrada para',
    searchNoExactFound: 'Nenhuma peça encontrada para',
    searchAskAi: 'Pedir recomendação ao Estilista IA',
    searchPopular: 'Buscas Populares',
    searchPopularSearches: 'Buscas Populares',
    searchRoomAdvice: 'Procurando consultoria para um cômodo específico?',
    searchAdvicePrompt: 'Procurando consultoria para um cômodo específico?',
    searchLaunchAi: 'Abrir Estilista IA →',
    searchLaunchStylist: 'Abrir Estilista IA →',

    // Checkout Modal
    checkoutTitle: 'Processamento Direto do Pedido & Envio por E-mail',
    checkoutStep1: '1. Contacto & Endereço',
    checkoutStep2: '2. Entrega em Moçambique',
    checkoutStep3: '3. Envio do Pedido',
    checkoutStepShipping: '1. Contacto & Endereço',
    checkoutStepDelivery: '2. Entrega em Moçambique',
    checkoutStepPayment: '3. Envio do Pedido',
    checkoutStepConfirmed: 'Confirmação',
    checkoutTestingBanner: 'Testando o fluxo de compra?',
    checkoutTestingFlow: 'Preencher rapidamente com dados de exemplo de Moçambique?',
    checkoutFillDemo: 'Preencher Dados de Moçambique',
    checkoutShippingTitle: '1. Endereço de Entrega & Contacto (Moçambique)',
    checkoutDeliveryContact: '1. Endereço de Entrega & Contacto (Moçambique)',
    checkoutShippingDesc: 'Onde nossa equipa especializada deve entregar e montar os seus móveis em Moçambique?',
    checkoutWhereDeliver: 'Onde nossa equipa especializada deve entregar e montar os seus móveis em Moçambique?',
    checkoutFirstName: 'Nome *',
    checkoutLastName: 'Apelido / Sobrenome *',
    checkoutEmail: 'E-mail *',
    checkoutPhone: 'Telefone / WhatsApp (+258) *',
    checkoutAddress: 'Endereço (Rua, Bairro) *',
    checkoutStreetAddress: 'Endereço (Rua, Bairro) *',
    checkoutApt: 'Casa / Apto / Ponto de Referência',
    checkoutApartment: 'Casa / Apto / Ponto de Referência',
    checkoutCity: 'Cidade (ex: Maputo, Matola, Beira, Nampula) *',
    checkoutState: 'Província (ex: Maputo Cidade, Sofala, Nampula) *',
    checkoutZip: 'Código Postal / Código de Área',
    checkoutPostalCode: 'Código Postal / Código de Área',
    checkoutContinueDelivery: 'Continuar para Opções de Entrega',
    checkoutDeliveryLevel: '2. Nível de Entrega & Montagem em Moçambique',
    checkoutDeliveryLevelTitle: '2. Nível de Entrega & Montagem em Moçambique',
    checkoutDeliveryLevelDesc: 'Escolha a experiência de entrega de sua preferência.',
    checkoutChooseExperience: 'Escolha a experiência de entrega de sua preferência.',
    checkoutWhiteGloveTitle: 'Entrega White-Glove com Montagem no Cômodo (Maputo & Região)',
    checkoutWhiteGloveBadge: 'Recomendado',
    checkoutRecommended: 'Recomendado',
    checkoutWhiteGloveDesc: 'Equipa de 2 profissionais descarrega, posiciona no cômodo desejado, realiza a montagem completa e recolhe todo o material de embalagem.',
    checkoutCurbsideTitle: 'Entrega Padrão ao Domicílio / Levantamento no Showroom',
    checkoutCurbsideDesc: 'Entregue com segurança na entrada do seu imóvel ou disponibilizado para levantamento no nosso showroom.',
    checkoutBack: 'Voltar',
    checkoutContinuePayment: 'Continuar para Confirmação do Pedido',
    checkoutPaymentTitle: '3. Confirmação do Pedido & Envio por E-mail',
    checkoutSecurePayment: '3. Confirmação do Pedido & Envio por E-mail',
    checkoutPaymentDesc: 'Sem necessidade de cartão de crédito no momento. Os detalhes do pedido serão enviados diretamente para a nossa equipa (dedrickdomingos.domingos@gmail.com) e para o seu e-mail.',
    checkoutCardOption: 'M-Pesa (Vodacom)',
    checkoutCreditCard: 'M-Pesa (Vodacom)',
    checkoutApplePayOption: 'Transferência Bancária',
    checkoutKlarnaOption: 'Pagamento na Entrega',
    checkoutCardNumber: 'Número de Telefone M-Pesa',
    checkoutCardExpiry: 'Data de Vencimento',
    checkoutExpiration: 'Data de Vencimento',
    checkoutCardCvv: 'Código de Segurança',
    checkoutCvv: 'Código de Segurança',
    checkoutApplePayDesc: 'Transferência via BCI, Millennium BIM, Standard Bank ou Moza Banco.',
    checkoutKlarnaDesc: 'Pagamento efetuado no ato da entrega ou levantamento no showroom.',
    checkoutAuthorize: 'Confirmar & Enviar Pedido por E-mail',
    checkoutAuthorizeBtn: 'Confirmar & Enviar Pedido por E-mail',
    checkoutEmailDispatchNotice: 'Os detalhes completos do pedido serão enviados para dedrickdomingos.domingos@gmail.com e para o seu e-mail. A nossa equipa entrará em contacto consigo para confirmar o pedido, alinhar a forma de pagamento e agendar a entrega em Moçambique.',
    checkoutPaymentPrefTitle: 'Forma de Pagamento Preferencial no Contacto',
    checkoutPaymentPrefDesc: 'Selecione como prefere efetuar o pagamento quando a nossa equipa entrar em contacto:',
    checkoutMpesa: 'M-Pesa (Vodacom)',
    checkoutBankTransfer: 'Transferência Bancária (BCI / Millennium BIM / Standard Bank / Moza)',
    checkoutCashOnDelivery: 'Pagamento no Ato da Entrega / No Showroom',
    checkoutOrderNotes: 'Instruções Especiais / Ponto de Referência para Entrega (Opcional)',
    checkoutNotesPlaceholder: 'Ex: Perto do Polana Shopping, preferência de entrega no sábado pela manhã...',
    checkoutSubmitOrderBtn: 'Confirmar e Enviar Pedido por E-mail',
    checkoutSubmittingOrder: 'Enviando Detalhes do Pedido...',
    checkoutSuccessEmailSent: 'Uma cópia completa com todos os móveis, endereço e valores em Meticais (MT) foi enviada para dedrickdomingos.domingos@gmail.com e para',
    checkoutNextStepsTitle: 'O que acontece a seguir?',
    checkoutNextStepsDesc: 'A equipa comercial da Sarvicimobliaria em Moçambique entrará em contacto consigo via WhatsApp / Telefone ou E-mail dentro de 24 horas para confirmar a disponibilidade, detalhes de acabamento, dados de pagamento e agendar a entrega no seu endereço.',
    checkoutWhatsAppDirect: 'Falar com a Sarvicimobliaria no WhatsApp',
    checkoutOrderSummary: 'Resumo do Pedido',
    checkoutOrderSummaryTitle: 'Resumo do Pedido',
    checkoutGrandTotal: 'Total do Pedido',
    checkoutSuccessTitle: 'Agradecemos Pelo Seu Pedido!',
    checkoutThankYou: 'Agradecemos Pelo Seu Pedido!',
    checkoutSuccessSubtitle: 'Referência do Pedido',
    checkoutOrderPrefix: 'Pedido',
    checkoutReceiptSent: 'Enviamos os detalhes completos do pedido para',
    checkoutReceiptSentTo: 'Enviamos o recibo detalhado e o código de rastreamento para',
    checkoutEstimatedDelivery: 'Previsão de Entrega White-Glove Especializada',
    checkoutEstimatedDeliveryBadge: 'Previsão de Entrega White-Glove Especializada',
    checkoutTrackConfirmed: 'Confirmado',
    checkoutTrackingConfirmed: 'Confirmado',
    checkoutTrackCrafting: 'Produção',
    checkoutTrackingCrafting: 'Produção',
    checkoutTrackDispatched: 'Em Trânsito',
    checkoutTrackingDispatched: 'Em Trânsito',
    checkoutTrackSetup: 'Montagem no Local',
    checkoutTrackingSetup: 'Montagem no Local',
    checkoutSummaryPieces: 'Resumo das Peças Selecionadas',
    checkoutSummarySelected: 'Resumo das Peças Selecionadas',
    checkoutQty: 'Qtd',
    checkoutTotalPaid: 'Valor Total Pago',
    checkoutContinueBrowsing: 'Continuar Explorando o Studio',

    // Footer
    footerPrivateCircle: 'Sarvicimobliaria · Círculo Privado',
    footerNewsletterTitle: 'Acesso Antecipado a Lançamentos em Mármore & Madeiras Nobres',
    footerNewsletterDesc: 'Receba nosso boletim arquitetônico com lançamentos sazonais, guias de conservação de materiais e condições exclusivas.',
    footerWelcomeToast: 'Bem-vindo à Sarvicimobliaria! Use o cupom WELCOME10 para 10% de desconto.',
    footerWelcomeCode: 'Bem-vindo à Sarvicimobliaria! Use o cupom WELCOME10 para 10% de desconto.',
    footerEmailPlaceholder: 'Digite seu e-mail...',
    footerSubscribe: 'Assinar',
    footerSubscribeBtn: 'Assinar',
    footerBrandStory: 'Projetamos e construímos mobiliário de alto padrão e design imobiliário atemporal, combinando travertino romano, madeiras nobres com certificação FSC e tecidos bouclé italianos.',
    footerAboutBrand: 'Projetamos e construímos mobiliário de alto padrão e design imobiliário atemporal, combinando travertino romano, madeiras nobres com certificação FSC e tecidos bouclé italianos.',
    footerStudioLocations: 'Studios: Milão, Lisboa, São Paulo & San Francisco',
    footerCollection: 'Coleções',
    footerColCollection: 'Coleções',
    footerExperience: 'Experiência',
    footerColExperience: 'Experiência',
    footerAssurance: 'Garantias',
    footerColAssurance: 'Garantias',
    footerWarranty: 'Garantia Estrutural de 10 Anos',
    footerTrial: '30 Dias de Teste em Casa',
    footerTimber: 'Madeira Maciça Certificada FSC',
    footerWeaves: 'Tecidos Nobres de Alta Durabilidade',
    footerAllRights: 'Sarvicimobliaria Studio de Design & Imobiliária Ltda. Todos os direitos reservados.',
    footerPrivacy: 'Política de Privacidade',
    footerTerms: 'Termos de Serviço',
    footerAccessibility: 'Acessibilidade',
  },
};
