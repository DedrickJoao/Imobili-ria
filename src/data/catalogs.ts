export interface CatalogSpread {
  pageNumber: number;
  title: string;
  subtitle: string;
  image: string;
  editorial: string;
  dimensionsText?: string;
  upholsteryText?: string;
  mechanismText?: string;
  featuredItems: {
    sku?: string;
    name: string;
    category: string;
    material: string;
    dimensions: string;
  }[];
}

export interface CatalogItem {
  id: string;
  sku: string;
  title: string;
  subtitle: string;
  volume: string;
  pageRange: string;
  pagesCount: number;
  year: string;
  coverImage: string;
  badge: string;
  badgeEn: string;
  descriptionPt: string;
  descriptionEn: string;
  tags: string[];
  spreads: CatalogSpread[];
}

export const MODERN_CATALOGS: CatalogItem[] = [
  {
    id: 'cat-1-sofa-creme-2a33-1',
    sku: '2A33-1#',
    title: 'Catálogo 1 · Sofá Seccional Ivory Comfort em L (4 Lugares + Chaise)',
    subtitle: 'Modelo Oficial 2A33-1# em Couro Nappa Marfim',
    volume: 'Catálogo 01',
    pageRange: 'Foto 1 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_creme_L_4_lugares_f1b691eb.png',
    badge: 'Foto Individual 1',
    badgeEn: 'Single Photo 1',
    descriptionPt: 'Sofá de canto em L de 4 lugares em couro nappa creme marfim com pespontos duplos acolchoados, encostos anatômicos e ampla chaise de 105 × 175 cm com esquema de medidas CAD (360 cm total).',
    descriptionEn: '4-seater L-shaped sectional in ivory cream nappa leather with double quilted stitching, ergonomic backrests, and generous 105 × 175 cm chaise with CAD measurements (360 cm total span).',
    tags: ['Foto 1', 'Modelo 2A33-1#', 'Couro Marfim', '4 Lugares', 'Chaise 175cm', '360cm'],
    spreads: [
      {
        pageNumber: 1,
        title: 'Modelo 2A33-1# · Ivory Comfort em L',
        subtitle: 'Foto 1 · Sofá 4 Lugares + Chaise Longue (360 cm)',
        image: '/assets/aistudio/Sofa_creme_L_4_lugares_f1b691eb.png',
        dimensionsText: '360 × 90 × 90 cm (Chaise 105 × 175 cm)',
        upholsteryText: 'Couro Nappa Premium Marfim',
        mechanismText: 'Modular Articulado de Alta Precisão',
        editorial: 'O modelo 2A33-1# Ivory une a generosidade de 360 cm de largura com uma acolhedora chaise de 105 × 175 cm. O esquema técnico original gravado no canto superior detalha a divisão em 3 módulos (105cm + 75cm + 180cm), proporcionando suporte anatômico superior e estética contemporânea impecável.',
        featuredItems: [
          {
            sku: '2A33-1#',
            name: 'Sofá Seccional Ivory Comfort em L',
            category: 'Sofás de Canto & Chaise',
            material: 'Couro Nappa Premium Marfim',
            dimensions: '360 × 90 × 90 cm (Chaise 175 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-2-sofa-azul-905',
    sku: '905#',
    title: 'Catálogo 2 · Sofá Contemporâneo 905# Slate Blue (4 Lugares + Pufe)',
    subtitle: 'Modelo Oficial 905# com Pufe Móvel 80 × 70 cm',
    volume: 'Catálogo 02',
    pageRange: 'Foto 2 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_azul_claro_4_lugares_1_pufo_334b1ee7.png',
    badge: 'Foto Individual 2',
    badgeEn: 'Single Photo 2',
    descriptionPt: 'Sofá linear de 300 cm em couro azul ardósia suave com braços almofadados arredondados, friso metálico cromado embutido e pufe móvel coordenado (80 × 70 cm).',
    descriptionEn: '300 cm linear sofa in serene slate blue leather with rolled pillow-top armrests, inlaid chrome accent trims, and matching mobile ottoman (80 × 70 cm).',
    tags: ['Foto 2', 'Modelo 905#', 'Slate Blue', '4 Lugares', 'Pufe Incluso', '300cm'],
    spreads: [
      {
        pageNumber: 2,
        title: 'Modelo 905# · Slate Blue & Pufe Ergonômico',
        subtitle: 'Foto 2 · Sofá Linear 300 cm + Pufe 80 × 70 cm',
        image: '/assets/aistudio/Sofa_azul_claro_4_lugares_1_pufo_334b1ee7.png',
        dimensionsText: 'Sofá: 300 × 93 × 92 cm | Pufe: 80 × 70 × 44 cm',
        upholsteryText: 'Couro Genuíno Top-Grain Slate Blue',
        mechanismText: 'Modular Articulado com Pés Ocultos',
        editorial: 'O modelo 905# apresenta uma silhueta suave e escultural de 300 cm de comprimento, evidenciada pela elegância do couro azul ardósia com acabamento soft-touch. Inclui pufe independente para máxima versatilidade de disposição.',
        featuredItems: [
          {
            sku: '905#',
            name: 'Sofá Contemporâneo 905# Slate Blue',
            category: 'Reclináveis & Relax',
            material: 'Couro Top-Grain Slate Blue & Inox',
            dimensions: '300 × 93 × 92 cm (Pufe 80 × 70 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-3-sofa-preto-702',
    sku: '702#',
    title: 'Catálogo 3 · Conjunto 702# Black Obsidian & Poltrona Honey Gold',
    subtitle: 'Living Set 4 Lugares + Pufe + Poltrona Matelassê em Diamante',
    volume: 'Catálogo 03',
    pageRange: 'Foto 3 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_preto_4_luagares_1_pufo_preto_1_sofa_laranja_1d0c617a.png',
    badge: 'Foto Individual 3',
    badgeEn: 'Single Photo 3',
    descriptionPt: 'Living set de alto impacto composto por sofá 4 lugares em couro preto obsidiana sobre pés de aço carbono, pufe retangular e exclusiva poltrona honey gold com costura diamantada.',
    descriptionEn: 'High-impact living suite featuring a 4-seater sofa in obsidian black leather on carbon steel legs, matching ottoman, and statement honey gold armchair with diamond quilting.',
    tags: ['Foto 3', 'Conjunto 702#', 'Preto Obsidiana', 'Poltrona Honey Gold', 'Living Completo', 'Aço Carbono'],
    spreads: [
      {
        pageNumber: 3,
        title: 'Conjunto 702# · Black Obsidian & Honey Gold',
        subtitle: 'Foto 3 · Sofá 280 cm + Pufe + Poltrona Matelassê',
        image: '/assets/aistudio/Sofa_preto_4_luagares_1_pufo_preto_1_sofa_laranja_1d0c617a.png',
        dimensionsText: 'Sofá: 280 × 90 × 90 cm | Poltrona: 90 × 85 cm | Pufe: 90 × 60 cm',
        upholsteryText: 'Couro Nappa Preto & Honey Gold / Aço Carbono',
        mechanismText: 'Fixo Estrutural Elevado',
        editorial: 'Uma composição moderna e expressiva para livings arquitetônicos. O contraste entre a sobriedade do sofá preto acetinado e o calor da poltrona honey gold com bordados em diamante cria um ambiente sofisticado e acolhedor.',
        featuredItems: [
          {
            sku: '702#',
            name: 'Conjunto Arquitetônico 702# Living Set',
            category: 'Conjuntos Living & Poltronas',
            material: 'Couro Nappa Preto & Honey Gold / Aço Carbono',
            dimensions: 'Sofá 280 × 90 cm | Poltrona 90 × 85 cm',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-4-sofa-castanho-820',
    sku: '820#',
    title: 'Catálogo 4 · Sofá Seccional Heritage Cognac em L (4 Lugares + Chaise)',
    subtitle: 'Modelo Oficial 820# em Couro Saddle Brown & Madeira Nobre',
    volume: 'Catálogo 04',
    pageRange: 'Foto 4 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_castanho_4_lugares_1_pufo__35f8ad38.png',
    badge: 'Foto Individual 4',
    badgeEn: 'Single Photo 4',
    descriptionPt: 'Sofá seccional em L de 4 lugares em couro genuíno saddle cognac com bordados capitonê diamantados no suporte lombar, assentos canelados profundos e apliques frontais em madeira maciça.',
    descriptionEn: '4-seater L-shaped sectional in saddle cognac leather with diamond-quilted lumbar embroidery, deep fluted seating, and solid wood armrest front inlays.',
    tags: ['Foto 4', 'Modelo 820#', 'Saddle Cognac', 'Capitonê Diamante', 'Madeira Nobre', 'Chaise 180cm'],
    spreads: [
      {
        pageNumber: 4,
        title: 'Modelo 820# · Heritage Saddle Cognac',
        subtitle: 'Foto 4 · Sofá Seccional 350 cm + Chaise 180 cm',
        image: '/assets/aistudio/Sofa_castanho_4_lugares_1_pufo__35f8ad38.png',
        dimensionsText: '350 × 95 × 92 cm (Chaise Longue 180 cm)',
        upholsteryText: 'Couro Top-Grain Saddle Cognac & Madeira Nobre',
        mechanismText: 'Modular Articulado Reforçado',
        editorial: 'O modelo 820# traz a nobreza atemporal do couro legítimo castanho saddle cognac. Destaque para o trabalho artesanal de costura capitonê diamantado na região lombar e os acabamentos frontais em madeira nobre nos braços arredondados.',
        featuredItems: [
          {
            sku: '820#',
            name: 'Sofá Seccional Heritage Cognac',
            category: 'Sofás de Canto & Chaise',
            material: 'Couro Top-Grain Saddle Cognac & Madeira',
            dimensions: '350 × 95 × 92 cm (Chaise 180 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-5-sofa-taupe-2a33-2',
    sku: '2A33-2#',
    title: 'Catálogo 5 · Sofá Modular 2A33-2# Taupe Sand (4 Lugares + Chaise)',
    subtitle: 'Modelo Oficial 2A33-2# com Apoios Duplos & Friso Madeira/Aço',
    volume: 'Catálogo 05',
    pageRange: 'Foto 5 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_cinza_L_4_lugares_4c85517b.png',
    badge: 'Foto Individual 5',
    badgeEn: 'Single Photo 5',
    descriptionPt: 'Sofá em L modelo 2A33-2# em couro bege taupe sand com apoios de cabeça duplos sobrepostos articulados, botões capitonê e requintado friso lateral em madeira nobre e aço cromado polido.',
    descriptionEn: 'L-shaped sectional 2A33-2# in taupe sand nappa leather with layered articulated dual headrests, button tufting, and side armrest inlays in wood and mirror-polished chrome.',
    tags: ['Foto 5', 'Modelo 2A33-2#', 'Taupe Sand', 'Apoio Duplo', 'Madeira & Inox', '360cm'],
    spreads: [
      {
        pageNumber: 5,
        title: 'Modelo 2A33-2# · Taupe Sand & Chrome',
        subtitle: 'Foto 5 · Sofá Seccional 360 cm + Chaise 180 cm',
        image: '/assets/aistudio/Sofa_cinza_L_4_lugares_4c85517b.png',
        dimensionsText: '360 × 100 × 95 cm (Chaise 105 × 180 cm)',
        upholsteryText: 'Couro Nappa Taupe & Aço Cromado',
        mechanismText: 'Modular com Apoios Cervicais Articulados',
        editorial: 'O modelo 2A33-2# destaca-se pelo diagrama técnico no canto superior esquerdo com divisão precisa (105+75+180cm). Possui almofadas de apoio cervical duplas ajustáveis e friso artesanal esculpido em madeira nobre e aço cromado no braço.',
        featuredItems: [
          {
            sku: '2A33-2#',
            name: 'Sofá Modular de Canto Taupe Sand',
            category: 'Sofás de Canto & Chaise',
            material: 'Couro Nappa Taupe & Aço Cromado',
            dimensions: '360 × 100 × 95 cm (Chaise 180 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-6-sofa-azul-8137',
    sku: '8137#',
    title: 'Catálogo 6 · Sofá Smart Recliner Elétrico 8137# Ocean Blue',
    subtitle: 'Modelo Oficial 8137# com Motor Alemão OKIN & Chaise Lounge',
    volume: 'Catálogo 06',
    pageRange: 'Foto 6 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_azul_4_lugares_71f12fa0.png',
    badge: 'Foto Individual 6',
    badgeEn: 'Single Photo 6',
    descriptionPt: 'Sofá reclinável elétrico inteligente de 346 cm em couro azul petróleo com motor alemão OKIN, acionamento por botão touch no apoio de braço, apoio de pernas retrátil e chaise lounge.',
    descriptionEn: 'Smart 346 cm power recliner sectional in ocean blue nappa leather with German OKIN motorization, touch button armrest controls, power footrest, and chaise lounge.',
    tags: ['Foto 6', 'Modelo 8137#', 'Reclinável Elétrico', 'Ocean Blue', 'Motor OKIN', '346cm'],
    spreads: [
      {
        pageNumber: 6,
        title: 'Modelo 8137# · Ocean Blue Power Recliner',
        subtitle: 'Foto 6 · Sofá Reclinável Motorizado 346 cm + Chaise',
        image: '/assets/aistudio/Sofa_azul_4_lugares_71f12fa0.png',
        dimensionsText: '346 × 90 × 92 cm (Chaise 100 × 175 cm)',
        upholsteryText: 'Couro Nappa Azul Petróleo & Motor OKIN',
        mechanismText: 'Elétrico Motorizado OKIN Bivolt Silencioso',
        editorial: 'O modelo 8137# oferece conforto tecnológico de vanguarda. Acionado por comandos touch na lateral do braço, estende o apoio de pernas e reclina suavemente. O esquema técnico indica os módulos de 100+73+73+100cm para precisão de montagem.',
        featuredItems: [
          {
            sku: '8137#',
            name: 'Sofá Smart Recliner Elétrico 8137#',
            category: 'Reclináveis & Relax Elétricos',
            material: 'Couro Nappa Azul Petróleo & Motor OKIN',
            dimensions: '346 × 90 × 92 cm (Chaise 175 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-7-sofa-ivory-zebra',
    sku: '2A33-Z#',
    title: 'Catálogo 7 · Sofá Seccional Ivory Pearl com Almofadas Zebra',
    subtitle: 'Modelo Oficial 2A33-Z# em Couro Nappa Marfim & Veludo Zebra',
    volume: 'Catálogo 07',
    pageRange: 'Foto 7 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/image_8d255d1a.png',
    badge: 'Foto Individual 7',
    badgeEn: 'Single Photo 7',
    descriptionPt: 'Sofá seccional em L de 360 cm em couro nappa marfim perolado, almofadas lombares exclusivas com estampa zebra animal-print de alta costura, chaise de 175 cm e braços curvos fluídos.',
    descriptionEn: '360 cm L-shaped sectional in pearl ivory nappa leather featuring bespoke animal-print zebra lumbar cushions, 175 cm lounge chaise, and sculpted curved arms.',
    tags: ['Foto 7', 'Modelo 2A33-Z#', 'Ivory Pearl', 'Almofadas Zebra', 'Sofá em L', '360cm'],
    spreads: [
      {
        pageNumber: 7,
        title: 'Modelo 2A33-Z# · Ivory Pearl & Zebra',
        subtitle: 'Foto 7 · Sofá Seccional 360 cm + Chaise 175 cm',
        image: '/assets/aistudio/image_8d255d1a.png',
        dimensionsText: '360 × 90 × 90 cm (Chaise 105 × 175 cm)',
        upholsteryText: 'Couro Nappa Marfim Perolado & Veludo Zebra',
        mechanismText: 'Modular Articulado com Apoio Cervical Anatômico',
        editorial: 'O modelo 2A33-Z# combina a pureza do couro nappa marfim perolado com o dinamismo gráfico das almofadas lombares com estampa zebra. A chaise de 175 cm proporciona repouso absoluto em uma composição digna das principais mostras de decoração contemporânea.',
        featuredItems: [
          {
            sku: '2A33-Z#',
            name: 'Sofá Seccional Ivory Pearl em L',
            category: 'Sofás de Canto & Chaise',
            material: 'Couro Nappa Marfim & Veludo Zebra',
            dimensions: '360 × 90 × 90 cm (Chaise 175 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-8-sofa-champagne-2927-2',
    sku: '2927-2#',
    title: 'Catálogo 8 · Sofá Modular 2927-2# Champagne Gold com Console Bar',
    subtitle: 'Modelo Oficial 2927-2# com Bar Integrado para Bebidas & Pufe',
    volume: 'Catálogo 08',
    pageRange: 'Foto 8 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/image_d13e3a9d.png',
    badge: 'Foto Individual 8',
    badgeEn: 'Single Photo 8',
    descriptionPt: 'Sofá de grande porte de 420 cm em couro champagne dourado com console bar central de 40 cm com porta-bebidas/garrafas, nicho para livros, apoios de cabeça articulados e pufe de 80 × 70 cm.',
    descriptionEn: 'Grand-scale 420 cm modular sofa in champagne gold leather featuring an integrated 40 cm beverage bar, book storage niche, multi-angle headrests, and 80 × 70 cm ottoman.',
    tags: ['Foto 8', 'Modelo 2927-2#', 'Champagne Gold', 'Console Bar', 'Módulo Adega', 'Pufe Incluso', '420cm'],
    spreads: [
      {
        pageNumber: 8,
        title: 'Modelo 2927-2# · Champagne Gold com Console Bar',
        subtitle: 'Foto 8 · Sofá 420 cm + Console Bebidas + Pufe 80 × 70 cm',
        image: '/assets/aistudio/image_d13e3a9d.png',
        dimensionsText: '420 × 105 × 95 cm (Módulos 190+75+40+115cm | Chaise 185cm | Pufe 80×70cm)',
        upholsteryText: 'Couro Genuíno Top-Grain Champagne Dourado',
        mechanismText: 'Modular com Console Multifunções e Catracas Alemãs de Precisão',
        editorial: 'O modelo 2927-2# traz o esquema técnico gravado no canto superior esquerdo com divisão exata em 4 módulos. O console central transforma o living em um lounge de entretenimento, acompanhado por um pufe ergonômico independente.',
        featuredItems: [
          {
            sku: '2927-2#',
            name: 'Sofá Modular 2927-2# Champagne Gold com Bar',
            category: 'Sofás Inteligentes & Bar',
            material: 'Couro Top-Grain Champagne & Madeira Ebanizada',
            dimensions: '420 × 105 × 95 cm (Pufe 80 × 70 cm)',
          },
        ],
      },
    ],
  },
  {
    id: 'cat-9-sofa-terracota-9028',
    sku: '9028#',
    title: 'Catálogo 9 · Sofá Seccional 9028# Terracota Âmbar em L',
    subtitle: 'Modelo Oficial 9028# com Braço Esculpido em Madeira Nobre',
    volume: 'Catálogo 09',
    pageRange: 'Foto 9 de 9',
    pagesCount: 1,
    year: '2026',
    coverImage: '/assets/aistudio/image_64bb778c.png',
    badge: 'Foto Individual 9',
    badgeEn: 'Single Photo 9',
    descriptionPt: 'Sofá em L de 360 cm em couro genuíno tom terracota âmbar com aplique curvo escultural em madeira maciça nobre, almofadas lombares cilíndricas anatômicas e chaise de 180 cm.',
    descriptionEn: '360 cm L-shaped sectional in rich amber terracotta leather with sculpted solid hardwood armrest sweep, cylindrical lumbar cushions, and 180 cm lounge chaise.',
    tags: ['Foto 9', 'Modelo 9028#', 'Terracota Âmbar', 'Braço em Madeira', 'Chaise 180cm', '360cm'],
    spreads: [
      {
        pageNumber: 9,
        title: 'Modelo 9028# · Terracota Âmbar em L',
        subtitle: 'Foto 9 · Sofá Seccional 360 cm + Chaise 180 cm',
        image: '/assets/aistudio/image_64bb778c.png',
        dimensionsText: '360 × 90 × 95 cm (Módulos 180+77+103cm | Chaise 180cm)',
        upholsteryText: 'Couro Genuíno Saddle Terracota Âmbar & Madeira Maciça',
        mechanismText: 'Modular Articulado Ergonômico com Pés Ocultos',
        editorial: 'O modelo 9028# exibe esquema técnico gravado com dimensões de 180+77+103cm (360cm de largura). Destaca-se pelo contraste entre o calor aconchegante do couro terracota e o trabalho artesanal de marcenaria que contorna todo o apoio de braço frontal.',
        featuredItems: [
          {
            sku: '9028#',
            name: 'Sofá Seccional 9028# Terracota Âmbar',
            category: 'Sofás de Canto & Chaise',
            material: 'Couro Genuíno Terracota & Madeira de Lei',
            dimensions: '360 × 90 × 95 cm (Chaise 180 cm)',
          },
        ],
      },
    ],
  },
];
