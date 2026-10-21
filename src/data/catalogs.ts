export interface CatalogSpread {
  pageNumber: number;
  title: string;
  subtitle: string;
  image: string;
  editorial: string;
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
    id: 'vol-1-seccionais',
    title: 'Volume 1 · Seccionais em L & Lounge de Alta Costura',
    subtitle: 'Mobiliário Seccional com Chaise Longue e Detalhes Nobres',
    volume: 'Vol. 01',
    pageRange: 'Págs. 1 - 3',
    pagesCount: 3,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_creme_L_4_lugares_f1b691eb.png',
    badge: 'Edição Oficial',
    badgeEn: 'Official Edition',
    descriptionPt: 'Seleção primorosa de sofás de grande formato em L com chaises profundas, acabamentos em couro nappa selecionado, capitonê e marcenaria integrada.',
    descriptionEn: 'Exquisite curation of large-scale L-shaped sectionals with deep chaises, selected nappa leather, tufting, and integrated fine woodwork.',
    tags: ['Sofás em L', 'Chaise Longue', 'Couro Nappa', 'Madeira Nobre', '2A33-1#', '2A33-2#', '820#'],
    spreads: [
      {
        pageNumber: 1,
        title: 'Modelo 2A33-1# Ivory Comfort',
        subtitle: 'Sofá Seccional em L 4 Lugares com Chaise 175cm',
        image: '/assets/aistudio/Sofa_creme_L_4_lugares_f1b691eb.png',
        editorial: 'O modelo 2A33-1# Ivory une a generosidade de 360 cm de largura com uma acolhedora chaise de 105 × 175 cm. Destaque para o pesponto artesanal duplo e almofadas anatômicas.',
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
      {
        pageNumber: 2,
        title: 'Modelo 2A33-2# Taupe Sand & Chrome',
        subtitle: 'Sofá Seccional com Apoios Duplos e Friso em Madeira/Aço',
        image: '/assets/aistudio/Sofa_cinza_L_4_lugares_4c85517b.png',
        editorial: 'Evolução contemporânea com apoios de cabeça duplos sobrepostos articulados, costura com botões capitonê e requintado aplique lateral em madeira nobre e aço cromado polido.',
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
      {
        pageNumber: 3,
        title: 'Modelo 820# Heritage Saddle Cognac',
        subtitle: 'Sofá Seccional com Capitonê Diamantado e Apliques em Madeira',
        image: '/assets/aistudio/Sofa_castanho_4_lugares_1_pufo__35f8ad38.png',
        editorial: 'Sofisticação atemporal em couro saddle cognac com encostos lombares bordados em matelassê diamantado e apliques frontais em madeira maciça torneada nos braços.',
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
    id: 'vol-2-recliners-living',
    title: 'Volume 2 · Smart Reclináveis & Living Sets Contemporâneos',
    subtitle: 'Tecnologia Motorizada OKIN, Pufes Coordenados e Poltronas de Autor',
    volume: 'Vol. 02',
    pageRange: 'Págs. 4 - 6',
    pagesCount: 3,
    year: '2026',
    coverImage: '/assets/aistudio/Sofa_azul_4_lugares_71f12fa0.png',
    badge: 'Smart Living',
    badgeEn: 'Smart Living',
    descriptionPt: 'Projetos com tecnologia reclinável elétrica silenciosa, sofás de acolhimento profundo acompanhados de pufes modulares e composições com poltronas matelassê.',
    descriptionEn: 'Smart power recliners with whisper-quiet German motorization, modular ottomans, and curated statement armchairs with artisanal quilting.',
    tags: ['Reclináveis Elétricos', 'Motor OKIN', 'Living Sets', 'Pufe Modular', '8137#', '905#', '702#'],
    spreads: [
      {
        pageNumber: 4,
        title: 'Modelo 8137# Ocean Blue Power Recliner',
        subtitle: 'Sofá Smart com Motor Elétrico OKIN e Chaise Lounge',
        image: '/assets/aistudio/Sofa_azul_4_lugares_71f12fa0.png',
        editorial: 'O modelo 8137# entrega conforto motorizado milimétrico com botões táteis no apoio de braço, abrindo o apoio de pernas e ajustando a inclinação para relaxamento absoluto.',
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
      {
        pageNumber: 5,
        title: 'Modelo 905# Slate Blue & Pufe Ergonomia',
        subtitle: 'Sofá Linear 300cm com Apoio Travesseiro e Pufe Móvel',
        image: '/assets/aistudio/Sofa_azul_claro_4_lugares_1_pufo_334b1ee7.png',
        editorial: 'Equilíbrio e suavidade com 300 cm de comprimento, braços com frisos metálicos embutidos e pufe independente de 80 × 70 cm para versatilidade espacial.',
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
      {
        pageNumber: 6,
        title: 'Conjunto 702# Black Obsidian & Honey Ochre',
        subtitle: 'Sofá 4 Lugares + Pufe + Poltrona Matelassê Diamante',
        image: '/assets/aistudio/Sofa_preto_4_luagares_1_pufo_preto_1_sofa_laranja_1d0c617a.png',
        editorial: 'Composição de alto impacto estético sobre pés finos em aço carbono preto, contrastando o preto obsidiana com a poltrona honey gold com bordados em losangos.',
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
];
