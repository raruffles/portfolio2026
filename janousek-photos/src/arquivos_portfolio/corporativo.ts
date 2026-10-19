import type { PortfolioProject } from './types';

export const corporativoProjects: PortfolioProject[] = [
  {
    id: 'retratos-corporativos-bayer',
    slug: 'retratos-corporativos-bayer',
    number: '04',
    title: 'Retratos Corporativos & Presença Executiva',
    client: 'Bayer, COREN-SP, Hapvida & Vale do Paraíba',
    category: 'corporativo',
    categoryLabel: 'Corporativo & Industrial',
    year: '2024',
    location: 'Parque Tecnológico SJC / Novotel / São Paulo',
    coverImage: '/portfolio_assets/casamentos/making-of-noiva.jpg',
    previewImage: '/portfolio_assets/casamentos/making-of-noiva.jpg',
    gallery: [
      '/portfolio_assets/casamentos/making-of-noiva.jpg',
      '/portfolio_assets/autoral-fineart/estudo-autoral-fineart.jpg',
      '/portfolio_assets/ensaios/pin-up-leia.jpg'
    ],
    tags: ['Retrato Corporativo', 'Headshots', 'Bayer', 'COREN-SP', 'LinkedIn', 'Executivo'],
    summary:
      'Posicionamento de imagem e autoridade visual para executivos, médicos, advogados e lideranças corporativas. Ensaios em estúdio móvel montado in-company ou em locações executivas do Vale do Paraíba.',
    objective:
      'Criar retratos com iluminação lapidada que transmitam credibilidade, sofisticação, liderança e acessibilidade para perfis corporativos, websites institucionais e relatórios anuais.',
    process:
      'Estúdio móvel de alta potência com octabox difusor de 120cm e luz de recorte (kicker light) para separação dimensional, aliado a direção de postura e expressão focada no universo corporativo de cada profissional.',
    result:
      'Fortalecimento expressivo da presença de marca pessoal e institucional dos clientes, com imagens adotadas em campanhas de imprensa, LinkedIn e convenções de grandes empresas.',
    technicalSpecs: {
      camera: 'Corpo Full Frame de Altíssima Resolução',
      lens: '85mm f/1.4 & 105mm Macro',
      lighting: 'Flashes Monolight a Bateria com Softbox Elinchrom',
      location: 'Parque Tecnológico SJC, Hotéis Executivos & Sede Bayer'
    },
    deliverables: [
      'Sessão Executiva Rápida e Eficiente no Local de Trabalho',
      'Headshots Corporativos em Fundo Neutro e Ambientalizado',
      'Tratamento Digital de Pele Natural de Alto Padrão',
      'Arquivos em Alta Resolução e Otimizados para LinkedIn/Web'
    ],
    isFeatured: true,
    accentColor: '#D4AF37'
  }
];
