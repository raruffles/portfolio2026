import type { PortfolioProject } from './types';

export const ensaiosProjects: PortfolioProject[] = [
  {
    id: 'pin-up-leia',
    slug: 'pin-up-leia',
    number: '06',
    title: 'PIN-UP GIRL — Ensaio Léinha & Estética Retrô',
    client: 'Léinha Pin-Up Series',
    category: 'ensaios',
    categoryLabel: 'Ensaios & Retrô',
    year: '2023',
    location: 'Estúdio Janousek Photos — SJC',
    coverImage: '/portfolio_assets/ensaios/pin-up-leia.jpg',
    previewImage: '/portfolio_assets/ensaios/pin-up-leia.jpg',
    gallery: [
      '/portfolio_assets/ensaios/pin-up-leia.jpg',
      '/portfolio_assets/ensaios/ensaio-anne.jpg',
      '/portfolio_assets/ensaios/adriele-ro.jpg'
    ],
    tags: ['Pin-Up', 'Vintage', 'Retrô Anos 50', 'Luz de Estúdio', 'Retrato Criativo'],
    summary:
      'Produção temática inspirada na Era de Ouro das pin-ups americanas dos anos 1950, com figurinos icônicos, maquiagem de época, cabelos modelados e iluminação dramática de estúdio.',
    objective:
      'Explorar a linguagem expressiva e lúdica da cultura pin-up, destacando a postura confiante e carismática da modelo através de esquemas de iluminação teatral.',
    process:
      'Iluminação com Fresnel e refletores direcionados para recriar o clima dos estúdios clássicos de Hollywood, combinada com pós-produção que ressalta o contraste sedoso e as texturas vintage.',
    result:
      'Uma das galerias mais visitadas e elogiadas do portfólio oficial de Marcio Janousek, demonstrando domínio cênico, direção de arte e versatilidade estilística.',
    technicalSpecs: {
      camera: 'Sensor Full Frame de Estúdio',
      lens: '50mm f/1.4 & 85mm f/1.8',
      lighting: 'Flashes de Estúdio com Beauty Dish e Gelatinas Quentes',
      location: 'Estúdio Fotográfico Janousek Photos'
    },
    deliverables: [
      'Ensaio Temático com 3 Trocas de Figurino',
      'Edição Digital com Grão Analógico Sutil',
      'Quadro Decorativo Acrílico 50x70cm',
      'Portfólio Digital em Alta Resolução'
    ],
    isFeatured: true,
    accentColor: '#D4AF37'
  },
  {
    id: 'ensaio-anne',
    slug: 'ensaio-anne',
    number: '13',
    title: 'Retrato Autoral — Anne no Parque da Cidade',
    client: 'Anne',
    category: 'ensaios',
    categoryLabel: 'Retrato & Lifestyle',
    year: '2023',
    location: 'Parque da Cidade — São José dos Campos',
    coverImage: '/portfolio_assets/ensaios/ensaio-anne.jpg',
    previewImage: '/portfolio_assets/ensaios/ensaio-anne.jpg',
    gallery: [
      '/portfolio_assets/ensaios/ensaio-anne.jpg',
      '/portfolio_assets/ensaios/adriele-ro.jpg',
      '/portfolio_assets/ensaios/pin-up-leia.jpg'
    ],
    tags: ['Retrato Pessoal', 'Luz Natural', 'Parque da Cidade', 'Espontâneo'],
    summary:
      'Ensaio individual ao ar livre captando a personalidade espontânea e elegante de Anne, integrando sua presença à calma dos jardins do parque.',
    objective:
      'Construir um acervo de retratos contemporâneos para uso pessoal e profissional em redes sociais, transmitindo autenticidade e simpatia.',
    process:
      'Condução leve sem poses rígidas, buscando o movimento do vento nos cabelos e a iluminação lateral filtrada pelas copas das árvores.',
    result:
      'Imagens vibrantes e naturais que valorizam a beleza real sem excessos de manipulação digital.',
    technicalSpecs: {
      camera: 'DSLR Full Frame',
      lens: '85mm f/1.4 Prime',
      lighting: 'Luz Natural com Rebatedor Branco',
      location: 'Parque da Cidade Roberto Burle Marx'
    },
    deliverables: [
      'Sessão Externa de 1h30min',
      '40 Fotos Tratadas em Alta Resolução',
      'Versões Otimizadas para Redes Sociais'
    ],
    isFeatured: false,
    accentColor: '#D8CBB5'
  }
];
