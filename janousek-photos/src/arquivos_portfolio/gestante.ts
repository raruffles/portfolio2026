import type { PortfolioProject } from './types';

export const gestanteProjects: PortfolioProject[] = [
  {
    id: 'leticia-gestante-burle-marx',
    slug: 'leticia-gestante-burle-marx',
    number: '03',
    title: 'Maternidade & Gestante — Letícia no Burle Marx',
    client: 'Letícia & Família',
    category: 'gestante',
    categoryLabel: 'Gestante & Maternidade',
    year: '2024',
    location: 'Parque da Cidade Roberto Burle Marx — São José dos Campos',
    coverImage: '/portfolio_assets/gestante-familia/leticia-gestante.jpg',
    previewImage: '/portfolio_assets/gestante-familia/leticia-gestante.jpg',
    gallery: [
      '/portfolio_assets/gestante-familia/leticia-gestante.jpg',
      '/portfolio_assets/gestante-familia/paloma-gestante.jpg',
      '/portfolio_assets/gestante-familia/familia-renato.jpg',
      '/portfolio_assets/gestante-familia/familia-lorena.jpg'
    ],
    tags: ['Gestante', 'Parque da Cidade', 'Burle Marx', 'Luz Dourada', 'Família'],
    summary:
      'Ensaio de maternidade ao ar livre nos cenários históricos e paisagísticos do Parque da Cidade Roberto Burle Marx em SJC, conectando a delicadeza da gestação com a exuberância da vegetação nativa.',
    objective:
      'Proporcionar à futura mãe uma tarde de tranquilidade e celebração, registrando o ventre materno com suavidade, respeito e luz poética.',
    process:
      'Sessão agendada na Golden Hour (últimas 2 horas antes do pôr do sol), explorando alamedas de palmeiras imperiais, pontes e lagos do parque com teleobjetiva para compressão de planos e desfoque cremoso.',
    result:
      'Fotografias que transmitem serenidade e conexão afetiva profunda, integrando o álbum de família mais estimado pela mamãe Letícia.',
    technicalSpecs: {
      camera: 'DSLR Full Frame Profissional',
      lens: '70-200mm f/2.8 L IS',
      lighting: 'Contra-luz Natural com Rebatedor Dourado Suave',
      location: 'Parque Roberto Burle Marx, SJC - SP'
    },
    deliverables: [
      'Sessão Fotográfica Externa de 2 Horas',
      'Seleção de 50 Imagens com Tratamento Editorial de Pele',
      'Álbum Livro de Gestante 25x25cm com Laminação Térmica',
      'Fotos Otimizadas para Impressão e Compartilhamento'
    ],
    isFeatured: true,
    accentColor: '#D8CBB5'
  },
  {
    id: 'paloma-gestante',
    slug: 'paloma-gestante',
    number: '11',
    title: 'Ensaio Gestante — Paloma & A Espera da Vida',
    client: 'Paloma & Família',
    category: 'gestante',
    categoryLabel: 'Maternidade & Amor',
    year: '2024',
    location: 'Parque da Cidade Roberto Burle Marx — SJC',
    coverImage: '/portfolio_assets/gestante-familia/paloma-gestante.jpg',
    previewImage: '/portfolio_assets/gestante-familia/paloma-gestante.jpg',
    gallery: [
      '/portfolio_assets/gestante-familia/paloma-gestante.jpg',
      '/portfolio_assets/gestante-familia/leticia-gestante.jpg',
      '/portfolio_assets/gestante-familia/familia-lorena.jpg'
    ],
    tags: ['Gestante', 'Natureza', 'Luz Natural', 'São José dos Campos'],
    summary:
      'Sessão intimista e ensolarada celebrando os últimos meses de gestação de Paloma, com figurinos fluidos e interação carinhosa com o pai da criança.',
    objective:
      'Capturar a cumplicidade do casal e a expectativa pelo nascimento através de uma linguagem leve, sem poses engessadas.',
    process:
      'Caminhada relaxante pelos bosques do parque, captando sorrisos espontâneos, mãos entrelaçadas sobre o ventre e o reflexo do sol na água.',
    result:
      'Um álbum repleto de calor e autenticidade que rendeu depoimentos carinhosos de recomendação à equipe Janousek Photos.',
    technicalSpecs: {
      camera: 'Full Frame Profissional',
      lens: '85mm f/1.4',
      lighting: 'Luz Natural Pura',
      location: 'Parque Roberto Burle Marx'
    },
    deliverables: [
      'Galeria Completa Digital',
      'Pôster Fine Art 40x60cm para o Quarto do Bebê',
      'Fotolivro Familiar'
    ],
    isFeatured: false,
    accentColor: '#D4AF37'
  },
  {
    id: 'familia-renato',
    slug: 'familia-renato',
    number: '12',
    title: 'Retrato de Família — Renato & Gerações',
    client: 'Família Renato',
    category: 'gestante',
    categoryLabel: 'Família & Gerações',
    year: '2023',
    location: 'São José dos Campos — SP',
    coverImage: '/portfolio_assets/gestante-familia/familia-renato.jpg',
    previewImage: '/portfolio_assets/gestante-familia/familia-renato.jpg',
    gallery: [
      '/portfolio_assets/gestante-familia/familia-renato.jpg',
      '/portfolio_assets/gestante-familia/familia-lorena.jpg'
    ],
    tags: ['Família', 'Retrato Coletivo', 'História de Vida', 'Afeto'],
    summary:
      'Registro afetuoso de três gerações reunidas, celebrando laços familiares e a continuidade das histórias em um ensaio descontraído.',
    objective:
      'Construir um documento visual da linhagem da família com dignidade, sorrisos sinceros e enquadramentos clássicos que nunca envelhecem.',
    process:
      'Coordenação de grupo paciente e atenta com avós e crianças, combinando retratos coletivos e duplas afetivas com iluminação uniforme.',
    result:
      'Peça central para a residência da família, emoldurada com orgulho na sala de estar.',
    technicalSpecs: {
      camera: 'Full Frame de Alta Resolução',
      lens: '50mm f/1.4',
      lighting: 'Luz Ambiente com Preenchimento Suave',
      location: 'Residência Particular & Jardim'
    },
    deliverables: [
      'Quadro em Canvas Fine Art 60x90cm',
      'Coleção de Retratos Individuais e Coletivos',
      'Arquivo Digital Master'
    ],
    isFeatured: false,
    accentColor: '#CCC8BF'
  }
];
