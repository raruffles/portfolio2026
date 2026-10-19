import type { PortfolioProject } from './types';

export const batizadosProjects: PortfolioProject[] = [
  {
    id: 'batizado-maite',
    slug: 'batizado-maite',
    number: '05',
    title: 'Batizado & Rito da Luz — Maitê',
    client: 'Maitê & Família',
    category: 'batizados',
    categoryLabel: 'Batizados & Cerimônias Sacras',
    year: '2024',
    location: 'Paróquia Sagrada Família & Catedral São Dimas — SJC',
    coverImage: '/portfolio_assets/batizados/maite-batizado.jpg',
    previewImage: '/portfolio_assets/batizados/maite-batizado.jpg',
    gallery: [
      '/portfolio_assets/batizados/maite-batizado.jpg',
      '/portfolio_assets/batizados/joaquim-sagrada-familia.jpg',
      '/portfolio_assets/batizados/capela-fatima.jpg'
    ],
    tags: ['Batizado', 'Rito da Luz', 'Igreja Sagrada Família', 'Sacro', 'Família'],
    summary:
      'Cobertura documental do sacramento do batismo da pequena Maitê, registrando a unção do óleo santo, a água batismal na pia e a chama da vela pascal com profundo respeito e sensibilidade litúrgica.',
    objective:
      'Registrar todos os passos do rito batismal com discrição absoluta no templo religioso, garantindo imagens nítidas mesmo sob a iluminação desafiadora das naves sacras.',
    process:
      'Utilização de lentes luminosas em abertura f/1.4 e sensores de alta sensibilidade ISO para fotografar sem flash durante as orações solenes, preservando a santidade do momento e a tranquilidade do bebê.',
    result:
      'Álbum batismal consagrado pela família como uma das relíquias afetivas mais valiosas do primeiro ano de vida de Maitê.',
    technicalSpecs: {
      camera: 'Sensor Full Frame Silencioso (Electronic Shutter)',
      lens: '35mm f/1.4 & 85mm f/1.4',
      lighting: 'Luz Natural de Vitrais e Velas Litúrgicas',
      location: 'Paróquia Sagrada Família, Vila Ema — SJC'
    },
    deliverables: [
      'Cobertura Completa do Rito de Batismo',
      'Mini Ensaio na Pia Batismal com Padrinhos e Pais',
      'Fotolivro Temático de Batismo com Capa em Linho Alvo',
      'Galeria Web para Envio a Parentes Distantes'
    ],
    isFeatured: true,
    accentColor: '#D4AF37'
  },
  {
    id: 'batizado-joaquim',
    slug: 'batizado-joaquim',
    number: '14',
    title: 'Batizado do Joaquim — Paróquia Sagrada Família',
    client: 'Mariana Lobo & Família',
    category: 'batizados',
    categoryLabel: 'Batizados & Afeto',
    year: '2023',
    location: 'Paróquia Sagrada Família — São José dos Campos',
    coverImage: '/portfolio_assets/batizados/joaquim-sagrada-familia.jpg',
    previewImage: '/portfolio_assets/batizados/joaquim-sagrada-familia.jpg',
    gallery: [
      '/portfolio_assets/batizados/joaquim-sagrada-familia.jpg',
      '/portfolio_assets/batizados/maite-batizado.jpg',
      '/portfolio_assets/batizados/capela-fatima.jpg'
    ],
    tags: ['Batizado', 'Sagrada Família', 'Bebê', 'São José dos Campos'],
    summary:
      'Joaquim aos 5 meses de idade em um look impecável recebendo a bênção batismal rodeado pelo amor de pais e padrinhos em uma manhã de domingo ensolarada.',
    objective:
      'Eternizar as expressões curiosas do bebê e a comoção dos avós em um registro pontual, afetuoso e seguro.',
    process:
      'Acompanhamento do bebê desde a chegada à paróquia, acolhimento dos padrinhos e celebração na pia batismal até a comemoração íntima de almoço.',
    result:
      'Depoimento emocionado da mãe Mariana Lobo: "São inesquecíveis todas as fotos que você fez da nossa família. Cada vez que olho, uma alegria volta ao coração. Não tem preço."',
    technicalSpecs: {
      camera: 'DSLR Full Frame',
      lens: '24-70mm f/2.8',
      lighting: 'Luz Ambiente Filtrada',
      location: 'Paróquia Sagrada Família, SJC'
    },
    deliverables: [
      'Galeria Completa de Batizado',
      'Fotolivro com 30 Páginas Panorâmicas',
      'Porta-Retrato Fine Art'
    ],
    isFeatured: false,
    accentColor: '#D8CBB5'
  }
];
