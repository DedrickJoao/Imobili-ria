export interface CatalogSpread {
  pageNumber: number;
  title: string;
  subtitle: string;
  image: string;
  editorial: string;
  featuredItems: {
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
    id: 'catalog-living-2026',
    title: 'Catálogo Geral · Coleção Residencial 2026',
    subtitle: 'The Architectural Living & Comfort Volume',
    volume: 'Volume I',
    year: '2026',
    pagesCount: 68,
    badge: 'Edição Principal',
    badgeEn: 'Master Edition',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Coleção completa de salas de estar, sofás curvos em bouclé italiano, mesas escultóricas em travertino romano e iluminação minimalista.',
    descriptionEn: 'Full residential collection featuring curved Italian bouclé sectionals, Roman travertine coffee tables, and sculptural lighting.',
    tags: ['Salas de Estar', 'Sofás Modulares', 'Travertino', 'Bouclé'],
    spreads: [
      {
        pageNumber: 1,
        title: 'Manifesto Arquitetônico & Forma Orgânica',
        subtitle: 'Salas de Estar Esculturais',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: 'O design moderno celebra a pureza dos volumes curvos e o calor tátil de materiais naturais. Cada peça da coleção SARVIC é concebida para criar ambientes serenos e imponentes.',
        featuredItems: [
          { name: 'Sofá Curvo Solis Bouclé', category: 'Sofá', material: 'Bouclé Italiano & Carvalho', dimensions: '260 x 105 x 74 cm' },
          { name: 'Mesa de Centro Travertino Monolith', category: 'Mesa', material: 'Pedra Travertino Polida', dimensions: '130 x 80 x 36 cm' },
        ],
      },
      {
        pageNumber: 2,
        title: 'Geometria Pura & Iluminação Cenográfica',
        subtitle: 'Harmonia & Proporções Espaciais',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        editorial: 'A intersecção entre madeira maciça de Moçambique e metal fosco desenha linhas que valorizam o pé-direito e convidam ao repouso e à convivência requintada.',
        featuredItems: [
          { name: 'Poltrona Kanso Lounge', category: 'Poltrona', material: 'Carvalho Defumado & Couro Flor', dimensions: '84 x 78 x 72 cm' },
          { name: 'Luminária Pendente Eclipse', category: 'Iluminação', material: 'Latão Escovado & Vidro Opalino', dimensions: 'Ø 45 cm' },
        ],
      },
      {
        pageNumber: 3,
        title: 'Espaços de Convivência & Jantar Arquitetônico',
        subtitle: 'Mesas Monolíticas & Cadeiras de Autor',
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Jantares memoráveis requerem superfícies substanciais. Nossas mesas monolíticas de 8 a 12 lugares combinam estabilidade estrutural com elegância visual atemporal.',
        featuredItems: [
          { name: 'Mesa de Jantar Palazzo Travertino', category: 'Mesa de Jantar', material: 'Travertino Romano Maciço', dimensions: '280 x 110 x 75 cm' },
          { name: 'Cadeira Dining Varde', category: 'Cadeira', material: 'Estrutura Carvalho & Linho Belga', dimensions: '54 x 56 x 80 cm' },
        ],
      },
    ],
  },
  {
    id: 'catalog-executive-2026',
    title: 'Catálogo Corporativo & Gabinetes Executivos',
    subtitle: 'Executive Workspaces & Modern Offices',
    volume: 'Volume II',
    year: '2026',
    pagesCount: 44,
    badge: 'Linha Corporativa',
    badgeEn: 'Executive Series',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Mobiliário corporativo de alto padrão: mesas diretorias em carvalho maciço, poltronas ergonômicas em couro legítimo e sistemas de reuniões integrados.',
    descriptionEn: 'High-end contract and executive office furniture: director desks in solid oak, ergonomic full-grain leather chairs, and meeting room suites.',
    tags: ['Gabinetes', 'Mesas Diretorias', 'Ergonomia', 'Couro Legítimo'],
    spreads: [
      {
        pageNumber: 1,
        title: 'Liderança & Elegância Arquitetônica',
        subtitle: 'Gabinetes Diretores',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        editorial: 'O espaço de trabalho moderno exige autoridade, sobriedade e organização impecável com passagens embutidas para cabos e tecnologia oculta.',
        featuredItems: [
          { name: 'Mesa Diretoria Apex Wood', category: 'Mesa Executiva', material: 'Carvalho Nobre & Couro Soleta', dimensions: '240 x 100 x 76 cm' },
          { name: 'Cadeira Presidencial Atmos', category: 'Cadeira Executiva', material: 'Couro Flor Integral & Alumínio', dimensions: '68 x 68 x 120 cm' },
        ],
      },
      {
        pageNumber: 2,
        title: 'Salas de Conselho & Conferência',
        subtitle: 'Acústica & Presença Institucional',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Mesas modulares expansíveis para até 20 pessoas com acabamento acetinado antimanchas e cadeiras com tecnologia de apoio lombar dinâmico.',
        featuredItems: [
          { name: 'Mesa de Reuniões Boardroom 400', category: 'Conferência', material: 'Carvalho Americano & Aço Escovado', dimensions: '400 x 130 x 75 cm' },
          { name: 'Armário Credenza Executivo', category: 'Armazenamento', material: 'Laca Fosca & Madeira Natural', dimensions: '200 x 48 x 82 cm' },
        ],
      },
    ],
  },
  {
    id: 'catalog-bedroom-2026',
    title: 'Catálogo Suítes, Dormitórios & Closets Sob Medida',
    subtitle: 'Private Sanctuaries & Bespoke Bedroom Suites',
    volume: 'Volume III',
    year: '2026',
    pagesCount: 52,
    badge: 'Dormitórios & Suítes',
    badgeEn: 'Private Suites',
    coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Camas com cabeceiras estofadas do chão ao teto, mesas de cabeceira em marcenaria fina, closets embutidos e iluminação suave de repouso.',
    descriptionEn: 'Full suites with floor-to-ceiling upholstered headboards, floating nightstands, custom walk-in closets, and atmospheric ambient lighting.',
    tags: ['Camas Flutuantes', 'Cabeceiras Estofadas', 'Closets', 'Veludo & Linho'],
    spreads: [
      {
        pageNumber: 1,
        title: 'O Refúgio Íntimo Contemporâneo',
        subtitle: 'Conforto & Serenidade Acústica',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        editorial: 'O quarto como templo de renovação física e mental. Linhas baixas inspiradas no minimalismo japonês com estofamento envolvente europeu.',
        featuredItems: [
          { name: 'Cama Plataforma Nami', category: 'Cama King', material: 'Carvalho Maciço & Linho Areia', dimensions: '220 x 205 x 90 cm' },
          { name: 'Mesa de Cabeceira Flutuante Luna', category: 'Mesa de Cabeceira', material: 'Madeira Natural & Gaveta Soft-Close', dimensions: '55 x 42 x 45 cm' },
        ],
      },
      {
        pageNumber: 2,
        title: 'Roupeiros & Armários Arquitetônicos',
        subtitle: 'Organização Sob Medida',
        image: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Portas em vidro bronze fumê com iluminação interna LED oculta por sensores de presença e divisórias em couro sintético lavável.',
        featuredItems: [
          { name: 'Sistema Closet Atelier Modulo', category: 'Closet', material: 'Vidro Bronze & Estrutura Alumínio', dimensions: 'Sob medida' },
          { name: 'Banco de Apoio Bouclé Haven', category: 'Banco', material: 'Bouclé Branco & Pés Latão', dimensions: '140 x 45 x 44 cm' },
        ],
      },
    ],
  },
  {
    id: 'catalog-materials-2026',
    title: 'Guia de Madeiras Nacionais & Acabamentos Exclusivos',
    subtitle: 'Mozambique Hardwoods, Natural Stones & Fine Weaves',
    volume: 'Volume IV',
    year: '2026',
    pagesCount: 36,
    badge: 'Matérias-Primas',
    badgeEn: 'Materials & Craft',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Amostrário oficial e fichas técnicas: Chanfuta, Jambirre, Umbila e Pau-Preto de Moçambique, mármores naturais, couros flor integral e tecidos de alfaiataria.',
    descriptionEn: 'Official technical specifications and swatch book: sustainable Mozambique hardwoods (Chanfuta, Jambirre, Umbila), honed marbles, and woven wools.',
    tags: ['Madeiras Nacionais', 'Chanfuta', 'Jambirre', 'Mármores Raros', 'FSC'],
    spreads: [
      {
        pageNumber: 1,
        title: 'A Riqueza Florestal Sustentável de Moçambique',
        subtitle: 'Madeiras Certificadas FSC',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Trabalhamos com madeiras de manejo florestal sustentável que conferem densidade incomparável, resistência ao clima tropical e veios com desenhos botânicos singulares.',
        featuredItems: [
          { name: 'Chanfuta de Moçambique (Afzelia quanzensis)', category: 'Madeira Nobre', material: 'Acabamento Óleo Fosco Natural', dimensions: 'Densidade: 850 kg/m³' },
          { name: 'Jambirre (Millettia stuhlmannii)', category: 'Madeira Nobre', material: 'Tom chocolate escuro acetinado', dimensions: 'Densidade: 900 kg/m³' },
        ],
      },
      {
        pageNumber: 2,
        title: 'Pedras Naturais & Mármores Lapidados',
        subtitle: 'Resistência & Beleza Mineral',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Mármores e travertinos selecionados bloco a bloco em pedreiras certificadas. Selagem impermeabilizante italiana hidrofóbica que protege contra manchas.',
        featuredItems: [
          { name: 'Travertino Navona Honed', category: 'Pedra Natural', material: 'Textura acetinada microporosa selada', dimensions: 'Espessura 30mm' },
          { name: 'Mármore Nero Marquina', category: 'Mármore', material: 'Fundo preto profundo com veios brancos', dimensions: 'Espessura 20mm' },
        ],
      },
    ],
  },
];
