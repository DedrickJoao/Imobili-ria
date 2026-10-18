export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  seoTitle: string;
  pageNumber: number;
  category: 
    | 'recliners'
    | 'sectionals'
    | 'smart-tech'
    | 'u-shape'
    | 'suites-321'
    | 'vip-cinema'
    | 'high-fashion'
    | 'tech-fabric'
    | 'leather-swatches';
  categoryLabelPt: string;
  categoryLabelEn: string;
  subCategory: string;
  layoutShape: 'linear' | 'chaise-l' | 'u-shape' | 'curved' | 'suite-321' | 'cinema-row';
  dimensions: {
    totalWidthCm: number;
    depthCm: number;
    heightCm: number;
    seatHeightCm: number;
    chaiseDepthCm?: number;
    breakdownText?: string;
  };
  upholstery: 'Couro Genuíno Top-Grain' | 'Couro Nappa Premium' | 'Tecido Tecnológico 科技布' | 'Bouclé Italiano' | 'Veludo Nobre';
  frame: string;
  cushionFoam: string;
  mechanism: 'Elétrico Motorizado OKIN' | 'Zero Wall Recliner' | 'Manual de Precisão' | 'Fixo Estrutural' | 'Modular Articulado';
  smartFeatures?: string[];
  colors: {
    namePt: string;
    nameEn: string;
    hex: string;
    chineseName?: string;
  }[];
  priceEstimateMZN?: string;
  priceNotePt: string;
  priceNoteEn: string;
  shortDescriptionPt: string;
  shortDescriptionEn: string;
  fullDescriptionPt: string;
  fullDescriptionEn: string;
  technicalHighlights: string[];
  tags: string[];
  image: string;
  schematicDimensions: {
    widthCm: number;
    chaiseCm?: number;
    depthCm: number;
    heightCm: number;
    seatDepthCm: number;
    seatsLabel: string;
  };
}

export interface CatalogCategoryMeta {
  id: string;
  labelPt: string;
  labelEn: string;
  descriptionPt: string;
  descriptionEn: string;
  iconName: string;
  pageRange: string;
  itemCount: number;
}

export const CATALOG_CATEGORIES: CatalogCategoryMeta[] = [
  {
    id: 'all',
    labelPt: 'Todos os Modelos',
    labelEn: 'All Models',
    descriptionPt: 'Coleção completa de 154 páginas com sofás contemporâneos, elétricos e modulares.',
    descriptionEn: 'Complete 154-page collection with modern, power recliner and modular sectionals.',
    iconName: 'LayoutGrid',
    pageRange: 'Págs. 1-154',
    itemCount: 120,
  },
  {
    id: 'recliners',
    labelPt: 'Reclináveis & Relax Elétricos',
    labelEn: 'Power Recliner Sofas',
    descriptionPt: 'Sofás lineares com mecanismos elétricos alemães, chaise retrátil e encostos multi-posições.',
    descriptionEn: 'Linear sofas with German motorized mechanisms, power footrests, and multi-stage headrests.',
    iconName: 'Armchair',
    pageRange: 'Págs. 2-37',
    itemCount: 36,
  },
  {
    id: 'sectionals',
    labelPt: 'Sofás de Canto & Chaise Longue',
    labelEn: 'Corner & Chaise Sectionals',
    descriptionPt: 'Configurações em L de grande porte com detalhes em madeira nobre, nichos e braços esculpidos.',
    descriptionEn: 'Large-scale L-shaped configurations with solid hardwood trims, book cubbies, and sculpted arms.',
    iconName: 'Maximize2',
    pageRange: 'Págs. 39-62',
    itemCount: 28,
  },
  {
    id: 'smart-tech',
    labelPt: 'Sofás Inteligentes & Massagem',
    labelEn: 'Smart Technology & Massage',
    descriptionPt: 'Sofás equipados com sistema de som Bluetooth 5.0, massagem 8 zonas, carregador por indução e porta-copos refrigerados.',
    descriptionEn: 'Equipped with Bluetooth 5.0 audio, 8-zone body massage, wireless Qi chargers, and chiller cup holders.',
    iconName: 'Sparkles',
    pageRange: 'Págs. 63-85',
    itemCount: 22,
  },
  {
    id: 'u-shape',
    labelPt: 'Sofás em U & Panorâmicos',
    labelEn: 'Grand U-Shape & Circular',
    descriptionPt: 'Salas majestosas em formato de U, semi-circulares e ilhas de convivência para residências de alto padrão.',
    descriptionEn: 'Majestic U-shaped suites, semi-circular conversation pits, and expansive island sectionals.',
    iconName: 'Compass',
    pageRange: 'Págs. 86-115',
    itemCount: 24,
  },
  {
    id: 'suites-321',
    labelPt: 'Conjuntos de Sala 3+2+1',
    labelEn: 'Classic 3+2+1 Living Suites',
    descriptionPt: 'Trios de sofás (3 lugares + 2 lugares + 1 poltrona) em couro legítimo para salas de estar formais.',
    descriptionEn: 'Coordinated trios (3-seater + 2-seater + armchair) crafted in genuine top-grain leather.',
    iconName: 'Users',
    pageRange: 'Págs. 116-127',
    itemCount: 20,
  },
  {
    id: 'vip-cinema',
    labelPt: 'Fileiras de Cinema VIP & Home Theater',
    labelEn: 'VIP Home Theater Rows',
    descriptionPt: 'Assentos reclináveis individuais e conectados com mesas em cunha, luz ambiente e comandos individuais.',
    descriptionEn: 'Dedicated cinema seating rows with wedge console storage, ambient LED, and individual recliners.',
    iconName: 'Film',
    pageRange: 'Págs. 128-134',
    itemCount: 14,
  },
  {
    id: 'high-fashion',
    labelPt: 'Alta Decoração & Linha Italiana',
    labelEn: 'High-Fashion & Italian Luxury',
    descriptionPt: 'Modelos inspirados na alta costura, detalhes metálicos dourados, plissados, capitonê e monogramas.',
    descriptionEn: 'Couture-inspired designs with brass trims, vertical fluting, artisan tufting, and designer silhouettes.',
    iconName: 'Award',
    pageRange: 'Págs. 136-147',
    itemCount: 26,
  },
  {
    id: 'tech-fabric',
    labelPt: 'Tecido Tecnológico Modular (科技布)',
    labelEn: 'Technology Fabric Suites',
    descriptionPt: 'Estofos familiares impermeáveis, respiráveis e ultra-resistentes a manchas em conjuntos modulares de até 4 metros.',
    descriptionEn: 'Waterproof, breathable, and stain-resistant nano-fiber modular family sofas spanning up to 4 meters.',
    iconName: 'ShieldCheck',
    pageRange: 'Págs. 148-153',
    itemCount: 10,
  },
];
