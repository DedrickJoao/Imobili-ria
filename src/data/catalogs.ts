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
    id: 'vol-1-recliners',
    title: 'Volume I · Sofás Reclináveis & Smart Relax',
    subtitle: 'Motorização OKIN, Zero-Wall & Ergonomia Digital',
    volume: 'Volume I',
    pageRange: 'Páginas 2 a 37',
    pagesCount: 36,
    year: '2026',
    badge: 'Págs. 2-37',
    badgeEn: 'Pgs. 2-37',
    coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Coleção completa de 36 sofás lineares e seccionais equipados com atuadores elétricos alemães OKIN, portas USB embutidas, chaise retrátil e encostos anatómicos multi-estágios.',
    descriptionEn: 'Comprehensive collection of 36 power recliners with German OKIN actuators, USB ports, and Zero-Wall mechanisms.',
    tags: ['Reclináveis Elétricos', 'Zero Wall', 'OKIN Motor', 'Couro Nappa', 'USB Embutido'],
    spreads: [
      {
        pageNumber: 2,
        title: 'Modelo 8867# · Reclinação Suave & Zero Wall',
        subtitle: 'Página 2 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'O modelo 8867# combina couro Nappa em tom sálvia com mecanismo motorizado de elevação de pernas e comando metálico touch embutido no braço.',
        featuredItems: [
          { sku: '8867#', name: 'Sofá Reclinável Elétrico 8867#', category: 'Sofá Reclinável', material: 'Couro Nappa & Aço OKIN', dimensions: '293 x 88 x 88 cm (Assento 42cm)' },
        ],
      },
      {
        pageNumber: 4,
        title: 'Modelo 8899# · Gran Turismo Presidencial',
        subtitle: 'Página 4 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Com 3,05 metros de presença aristocrática, o modelo 8899# apresenta capitonê almofadado e braços esculpidos em cascata com apoio ergonómico total.',
        featuredItems: [
          { sku: '8899#', name: 'Sofá Gran Turismo 8899#', category: 'Sofá Presidencial', material: 'Couro Bovino Top-Grain', dimensions: '305 x 95 x 89 cm' },
        ],
      },
      {
        pageNumber: 12,
        title: 'Modelo 8137# · Sectional em L com Chaise & Recliner',
        subtitle: 'Página 12 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Configuração em L de 3,46 metros que combina chaise longue de 1,75 m e assento elétrico na outra extremidade para máximo relaxamento.',
        featuredItems: [
          { sku: '8137#', name: 'Sectional Reclinável L 8137#', category: 'Sectional Canto L', material: 'Couro Azul Glaciar & Aço', dimensions: '346 x 90 x 95 cm (Chaise 175cm)' },
        ],
      },
    ],
  },
  {
    id: 'vol-2-sectionals',
    title: 'Volume II · Seccionais de Canto & Chaise Longue',
    subtitle: 'Arquitetura de Convivência & Nichos em Madeira Nobre',
    volume: 'Volume II',
    pageRange: 'Páginas 39 a 62',
    pagesCount: 28,
    year: '2026',
    badge: 'Págs. 39-62',
    badgeEn: 'Pgs. 39-62',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Grandes seccionais em formato de L com apliques em madeira nobre, estantes de livros embutidas nos braços, almofadas decorativas e bases de sustentação plinto.',
    descriptionEn: 'Large-scale L-sectionals featuring solid hardwood accents, integrated book portals, and low-profile plinths.',
    tags: ['Seccionais em L', 'Madeira Nobre', 'Nichos no Braço', 'Couro Bovino', 'Chaise Longa'],
    spreads: [
      {
        pageNumber: 39,
        title: 'Modelo 2A23# · Luxo Espresso com Capitonê Lombar',
        subtitle: 'Página 39 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: 'O modelo 2A23# em couro castanho café apresenta matelassê em diamante nas almofadas lombares e acabamento curvo em madeira maciça no braço.',
        featuredItems: [
          { sku: '2A23#', name: 'Sofá Seccional Espresso 2A23#', category: 'Seccional Canto', material: 'Couro Bovino & Nogueira', dimensions: '360 x 180 x 90 cm' },
        ],
      },
      {
        pageNumber: 43,
        title: 'Modelo 1308-2# · Nicho Biblioteca Integrado',
        subtitle: 'Página 43 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Incorpora uma estante de livros esculpida no próprio braço do sofá, aliando arrumação arquitetónica ao conforto da chaise de 1,80 m.',
        featuredItems: [
          { sku: '1308-2#', name: 'Sofá Biblioteca 1308-2#', category: 'Seccional Nicho', material: 'Couro Greige & Madeira Nobre', dimensions: '350 x 180 x 90 cm' },
        ],
      },
      {
        pageNumber: 52,
        title: 'Modelo 2999-2# & 2999-3# · Clássico Capitonado Borgonha',
        subtitle: 'Página 52 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Interpretação contemporânea do Chesterfield em couro bovino legítimo com brilho encerado em tons de vinho tinto e caramelo.',
        featuredItems: [
          { sku: '2999-2#', name: 'Sofá Capitonê Borgonha 2999#', category: 'Chesterfield Seccional', material: 'Couro Encerado Vinho', dimensions: '363 x 182 x 90 cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-3-smart-cinema',
    title: 'Volume III · Sofás Smart Cinema, Som & Massagem',
    subtitle: 'Chiller Refrigerado, Bluetooth 5.0 & Massagem 8 Zonas',
    volume: 'Volume III',
    pageRange: 'Páginas 63 a 85',
    pagesCount: 22,
    year: '2026',
    badge: 'Págs. 63-85',
    badgeEn: 'Pgs. 63-85',
    coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'O auge do entretenimento residencial: sofás com consolas de madeira nobre equipadas com arrefecimento de bebidas, carregamento sem fios, som estéreo embutido e massagem corporal de 8 zonas.',
    descriptionEn: 'The pinnacle of home cinema: integrated cup chillers, Qi wireless charging, Bluetooth stereo, and 8-zone body massage.',
    tags: ['Smart Cinema', 'Chiller Bebidas', 'Bluetooth 5.0', 'Massagem 8 Zonas', 'Carregador Qi'],
    spreads: [
      {
        pageNumber: 64,
        title: 'Modelo 903# · Consola Chiller de Bebidas & Som',
        subtitle: 'Páginas 63-64 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Com 3,96 metros de largura, o 903# integra consola com suporte termoelétrico para manter bebidas geladas, carregamento Qi sem fios e gaveta secreta.',
        featuredItems: [
          { sku: '903#', name: 'Sofá Smart Cinema 903#', category: 'Sofá Smart', material: 'Couro Genuíno & Madeira', dimensions: '396 x 108 x 75 cm (Chaise 178cm)' },
        ],
      },
      {
        pageNumber: 73,
        title: 'Modelo 95837# · Touchscreen & Áudio Estéreo',
        subtitle: 'Página 73 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Superfícies de contato em couro de primeira camada (头层牛皮), painel touchscreen embutido na consola e subwoofer estéreo.',
        featuredItems: [
          { sku: '95837#', name: 'Sofá Smart Touchscreen 95837#', category: 'Sofá Cinema Digital', material: 'Couro 1ª Camada (头层牛皮)', dimensions: '396 x 108 x 82 cm' },
        ],
      },
      {
        pageNumber: 77,
        title: 'Modelo A0095D# · Massagem Biomecânica 8 Zonas',
        subtitle: 'Páginas 76-77 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: 'A chaise terapêutica do A0095D# integra 8 motores de vibração programados para descompressão de coluna cervical, lombar e pernas com alto-falantes nos encostos.',
        featuredItems: [
          { sku: 'A0095D#', name: 'Sofá Terapêutico Massagem A0095D#', category: 'Sofá Massagem', material: 'Couro Nappa & Motores 8Z', dimensions: '390 x 100 x 97 cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-4-u-shape',
    title: 'Volume IV · Sofás em U & Panorâmicos Circulares',
    subtitle: 'Envergaduras de até 4,64 Metros & Curvas Escultóricas',
    volume: 'Volume IV',
    pageRange: 'Páginas 86 a 115',
    pagesCount: 24,
    year: '2026',
    badge: 'Págs. 86-115',
    badgeEn: 'Pgs. 86-115',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Projetos monumentais para salões de receção, embaixadas e vivendas de prestígio. Inclui o modelo 2016A# de 4,64 m com chaises duplas e o curvo 8013-1# com prateleira envolvente.',
    descriptionEn: 'Monumental U-shaped and circular conversation pit sofas spanning up to 4.64 meters for grand villas.',
    tags: ['Sofás em U', '4.64 Metros', 'Curvo Panorâmico', 'Chaises Duplas', 'Salões Nobres'],
    spreads: [
      {
        pageNumber: 99,
        title: 'Modelo 8013-1# · Panorâmico com Prateleira Traseira',
        subtitle: 'Páginas 99-100 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Desenhado para o centro de salões amplos: o costado conta com uma bancada em nogueira curvada contínua para livros de arte e taças.',
        featuredItems: [
          { sku: '8013-1#', name: 'Sofá Curvo com Prateleira 8013-1#', category: 'Sofá Panorâmico', material: 'Couro Branco & Nogueira Escura', dimensions: '395 x 110 x 85 cm' },
        ],
      },
      {
        pageNumber: 102,
        title: 'Modelo 2016A# · O Maior Sofá do Catálogo (4,64m)',
        subtitle: 'Página 102 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Com 4,64 metros de largura e chaises simétricas de 2,10 metros, acomoda até 12 pessoas com duas consolas centrais integradas.',
        featuredItems: [
          { sku: '2016A#', name: 'Sofá Presidencial em U 2016A#', category: 'Sofá em U Grandioso', material: 'Couro Bovino Top-Grain', dimensions: '464 x 210 x 95 cm' },
        ],
      },
      {
        pageNumber: 88,
        title: 'Modelo S88# · 4 Opções de Comprimento',
        subtitle: 'Página 88 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Especificado em 4 comprimentos oficiais (408, 370, 333 e 295 cm) para se adequar milimetricamente ao projeto da sua sala.',
        featuredItems: [
          { sku: 'S88#', name: 'Sofá Modular S88# (4 Medidas)', category: 'Sofá Modular', material: 'Couro Bicolor Ocre & Espresso', dimensions: '408 x 180 x 90 cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-5-suites-321',
    title: 'Volume V · Conjuntos de Sala Formais 3+2+1',
    subtitle: 'Trios Coordenados de Alto Padrão em Couro Legítimo',
    volume: 'Volume V',
    pageRange: 'Páginas 116 a 127',
    pagesCount: 20,
    year: '2026',
    badge: 'Págs. 116-127',
    badgeEn: 'Pgs. 116-127',
    coverImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Coleção tradicional de conjuntos 3+2+1 (sofá de 3 lugares + sofá de 2 lugares + poltrona individual). Desenhos com costuras pespontadas, detalhes em madeira e pés cromados.',
    descriptionEn: 'Traditional 3+2+1 coordinated suites (3-seat + 2-seat + armchair) in top-grain leather for formal salons.',
    tags: ['Conjunto 3+2+1', 'Salas Formais', 'Poltrona Individual', 'Couro Bovino', 'Gabinete'],
    spreads: [
      {
        pageNumber: 116,
        title: 'Modelo 899-123# · Bicolor com Nichos nos Braços',
        subtitle: 'Página 116 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Trio em preto e branco de forte impacto visual com rolinhos cervicais acolchoados e nichos porta-revistas vazados nas laterais.',
        featuredItems: [
          { sku: '899-123#', name: 'Conjunto 3+2+1 899#', category: 'Conjunto 3+2+1', material: 'Couro Bicolor Preto & Branco', dimensions: '3L: 220cm | 2L: 160cm | 1L: 100cm' },
        ],
      },
      {
        pageNumber: 118,
        title: 'Modelo 6082-123# · Tabela Técnica Italiana',
        subtitle: 'Página 118 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Estofamento macio com medidas cotadas no catálogo: 126x96x90 cm (1L), 170x96x90 cm (2L) e 215x96x90 cm (3L).',
        featuredItems: [
          { sku: '6082-123#', name: 'Conjunto Italiano 6082#', category: 'Conjunto 3+2+1', material: 'Couro Nappa Creme Italiano', dimensions: '3L: 215cm | 2L: 170cm | 1L: 126cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-6-vip-cinema',
    title: 'Volume VI · Fileiras de Cinema VIP & Home Theater',
    subtitle: 'Consolas em Cunha, Porta-Copos em Inox & Pistão a Gás',
    volume: 'Volume VI',
    pageRange: 'Páginas 128 a 134',
    pagesCount: 14,
    year: '2026',
    badge: 'Págs. 128-134',
    badgeEn: 'Pgs. 128-134',
    coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Fileiras de cinema profissional para salas de projeção residenciais e auditórios VIP. Assentos reclináveis independentes com consolas em cunha anguladas para o ponto focal do ecrã.',
    descriptionEn: 'Dedicated home theater rows with angled wedge consoles, dual stainless cup holders, and gas-lift storage.',
    tags: ['Cinema VIP', 'Home Theater', 'Mesas Cunha', 'Porta-Copos Inox', 'Reclinação OKIN'],
    spreads: [
      {
        pageNumber: 128,
        title: 'Modelo 181# · Curvatura Perfeita para Projeção',
        subtitle: 'Páginas 128-129 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'A angulação precisa das consolas em cunha direciona o olhar de todos os ocupantes para o centro do ecrã sem torção de pescoço.',
        featuredItems: [
          { sku: '181#', name: 'Fileira Cinema Curva 181#', category: 'Fileira Cinema VIP', material: 'Couro Chocolate & Aço', dimensions: '325 x 100 x 98 cm' },
        ],
      },
      {
        pageNumber: 131,
        title: 'Modelo B-6065# · Consolas com Pistão a Gás',
        subtitle: 'Página 131 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Como demonstrado no close fotográfico da página 131, cada mesa lateral tem abertura com amortecedor a gás e interior aveludado para auscultadores e comandos.',
        featuredItems: [
          { sku: 'B-6065#', name: 'Cinema Suite Curva B-6065#', category: 'Cinema Curvo VIP', material: 'Couro Terracota & Nogueira', dimensions: '360 x 105 x 98 cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-7-high-fashion',
    title: 'Volume VII · Alta Decoração, Design Italiano & Alfaiataria',
    subtitle: 'Canelados Verticais, Ouro Espelhado PVD & Inspirados Bentley',
    volume: 'Volume VII',
    pageRange: 'Páginas 136 a 147',
    pagesCount: 26,
    year: '2026',
    badge: 'Págs. 136-147',
    badgeEn: 'Pgs. 136-147',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Modelos esculturais com costuras caneladas verticais contínuas, rodapés em aço inox dourado espelhado PVD, couro Nappa conhaque com pespontos estilo Bentley e bouclé italiano.',
    descriptionEn: 'Haute-couture Italian sofas featuring vertical fluted channels, PVD mirror-gold stainless bases, and automotive quilting.',
    tags: ['Alta Costura', 'Canelado Fluted', 'Ouro PVD', 'Bentley Style', 'Bouclé Italiano'],
    spreads: [
      {
        pageNumber: 136,
        title: 'Modelo SF707# · Canelado Vertical Contínuo',
        subtitle: 'Página 136 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Com 4 dimensões oficiais (1L: 115cm, 2L: 170cm, 3L: 225cm, 4L: 282cm), o SF707# destaca-se pelo encosto curvo canelado artesanalmente.',
        featuredItems: [
          { sku: 'SF707#', name: 'Sofá Canelado Fluted SF707#', category: 'Alta Decoração', material: 'Bouclé Italiano & Madeira Faia', dimensions: '282 x 90 x 75 cm' },
        ],
      },
      {
        pageNumber: 144,
        title: 'Modelo S919# · Estilo Automotivo Bentley',
        subtitle: 'Página 144 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Pesponto matelassê em diamante nas laterais e contorno do rodapé em aço inoxidável dourado espelhado de alta resistência a riscos.',
        featuredItems: [
          { sku: 'S919#', name: 'Sofá Quilted Luxury S919#', category: 'Linha Automobilística', material: 'Couro Caramelo & Inox Ouro', dimensions: '288 x 95 x 80 cm' },
        ],
      },
      {
        pageNumber: 147,
        title: 'Modelo S811L# · Verde Esmeralda & Pés Dourados',
        subtitle: 'Página 147 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: '3,50 metros de imponência em verde esmeralda nobre com encosto canelado e pés finos tipo agulha em metal dourado.',
        featuredItems: [
          { sku: 'S811L#', name: 'Sectional Esmeralda S811L#', category: 'Alta Decoração', material: 'Couro Verde Esmeralda & Pés Ouro', dimensions: '350 x 183 x 80 cm' },
        ],
      },
    ],
  },
  {
    id: 'vol-8-tech-fabric-leather',
    title: 'Volume VIII · Tecido Tecnológico (科技布) & Cartela 24 Couros',
    subtitle: 'Impermeável, Anti-Manchas, Reversível & Amostras Nappa',
    volume: 'Volume VIII',
    pageRange: 'Páginas 135 e 148 a 153',
    pagesCount: 10,
    year: '2026',
    badge: 'Págs. 135, 148-153',
    badgeEn: 'Pgs. 135, 148-153',
    coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    descriptionPt: 'Coleção em Tecido Tecnológico (科技布) impermeável a líquidos e anti-manchas em conjuntos modulares de até 4 metros, além da cartela oficial da página 135 com 24 amostras de couro legítimo bovino.',
    descriptionEn: 'Waterproof, stain-resistant Technology Fabric sofas spanning up to 4 meters, paired with the official 24-color leather swatch library.',
    tags: ['Tecido Tecnológico', '科技布', 'Impermeável', '4 Metros', '24 Cores de Couro'],
    spreads: [
      {
        pageNumber: 135,
        title: 'Cartela Oficial de Couros Genuínos (24 Tons)',
        subtitle: 'Página 135 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Catálogo de amostras com 24 cores oficiais de couro legítimo bovino de 1.4-1.6 mm com tingimento anilínico e proteção UV.',
        featuredItems: [
          { sku: 'SWATCH-24#', name: 'Cartela de 24 Amostras de Couro', category: 'Amostras de Materiais', material: 'Couro Bovino Top-Grain 1.4-1.6mm', dimensions: 'Mostruário Oficial Completo' },
        ],
      },
      {
        pageNumber: 148,
        title: 'Modelo 1101# / 1013# · Familiar 7 Peças 4 Metros',
        subtitle: 'Página 148 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Monumental sofá de 4 metros em Tecido Tecnológico (科技布) à prova d\'água com mesa integrada e 4 pufes cubos inclusos.',
        featuredItems: [
          { sku: '1101#', name: 'Sofá 7 Peças 4 Metros 1101#', category: 'Tecido Tecnológico 科技布', material: 'Tecido Nanotecnológico Impermeável', dimensions: '400 x 180 x 90 cm' },
        ],
      },
      {
        pageNumber: 151,
        title: 'Modelo 6002# · 6 Peças 100% Reversível',
        subtitle: 'Página 151 do Catálogo Oficial',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        editorial: 'Montagem universal (não divide esquerda/direita): a chaise e os módulos centrais adaptam-se livremente a qualquer sala de estar.',
        featuredItems: [
          { sku: '6002#', name: 'Sofá Reversível 6 Peças 6002#', category: 'Tecido Tecnológico 科技布', material: 'Tecido Tecnológico Reversível', dimensions: '360 x 240 x 85 cm' },
        ],
      },
    ],
  },
];
