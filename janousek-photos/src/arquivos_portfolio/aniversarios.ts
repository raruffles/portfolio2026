import type { PortfolioProject } from './types';

export const aniversariosProjects: PortfolioProject[] = [
  {
    id: 'sofia-splash-buffet',
    slug: 'sofia-splash-buffet',
    number: '07',
    title: 'Infância em Cores — Sofia 1 Ano no Splash',
    client: 'Gislene Barbosa & Família',
    category: 'aniversarios',
    categoryLabel: 'Aniversários & Infância',
    year: '2024',
    location: 'Splash Buffet Infantil — São José dos Campos',
    coverImage: '/portfolio_assets/aniversarios/sofia-1-ano.jpg',
    previewImage: '/portfolio_assets/aniversarios/sofia-1-ano.jpg',
    gallery: [
      '/portfolio_assets/aniversarios/sofia-1-ano.jpg',
      '/portfolio_assets/aniversarios/juju-smash-the-cake.jpg',
      '/portfolio_assets/aniversarios/felipe-pluft-buffet.jpg',
      '/portfolio_assets/aniversarios/davi-3-anos.jpg'
    ],
    tags: ['Aniversário Infantil', '1 Aninho', 'Splash Buffet', 'Espontâneo', 'Crianças'],
    summary:
      'A celebração do primeiro ano de vida de Sofia, repleta de cores, sorrisos infantis e abraços de família no Splash Buffet em SJC. Um registro vivo da infância sem poses forçadas.',
    objective:
      'Captar a pureza e a energia da festa do ponto de vista da criança, acompanhando brincadeiras, reações diante do bolo e o carinho dos avós.',
    process:
      'Posicionamento na altura dos olhos dos pequenos (agachado e imerso nas brincadeiras), velocidade de disparo rápida (1/250s) e lente zoom versátil para congelar saltos, risadas e momentos inesperados.',
    result:
      'Depoimento caloroso da mãe Gislene Barbosa: "Amei as fotos, ficaram lindas, perfeitas, maravilhosas! Você é um super profissional, paciente, atencioso e pontual. Super indico!"',
    technicalSpecs: {
      camera: 'Sensor Full Frame Ágil',
      lens: '24-70mm f/2.8 & 50mm f/1.4',
      lighting: 'Flash Rebatido no Teto com Difusor de Domo',
      location: 'Splash Buffet Infantil, SJC - SP'
    },
    deliverables: [
      'Cobertura Integral das 4 Horas de Festa',
      'Fotolivro Temático Infantil 20x20cm com Capa Dura',
      'Todas as Fotos Entregues Tratadas em Alta Resolução',
      'Link Privado para Download Familiar'
    ],
    isFeatured: true,
    accentColor: '#D8CBB5'
  },
  {
    id: 'juju-smash-the-cake',
    slug: 'juju-smash-the-cake',
    number: '15',
    title: 'Smash the Cake — Juju no Parque da Cidade',
    client: 'Kamilla & Família',
    category: 'aniversarios',
    categoryLabel: 'Smash the Cake & Piquenique',
    year: '2023',
    location: 'Parque Roberto Burle Marx — São José dos Campos',
    coverImage: '/portfolio_assets/aniversarios/juju-smash-the-cake.jpg',
    previewImage: '/portfolio_assets/aniversarios/juju-smash-the-cake.jpg',
    gallery: [
      '/portfolio_assets/aniversarios/juju-smash-the-cake.jpg',
      '/portfolio_assets/aniversarios/sofia-1-ano.jpg',
      '/portfolio_assets/aniversarios/felipe-pluft-buffet.jpg'
    ],
    tags: ['Smash the Cake', 'Parque da Cidade', 'Bebê', 'Diversão', 'Cores'],
    summary:
      'A divertida e doce experiência do ensaio Smash the Cake da Juju em meio aos gramados do Parque da Cidade, acompanhando a descoberta sensorial das cores e do glacê.',
    objective:
      'Criar um ensaio seguro, lúdico e descontraído, respeitando o ritmo e a curiosidade da criança em contato com a natureza e seu primeiro bolinho.',
    process:
      'Cenografia campestre montada com tecidos naturais, balões biodegradáveis e acompanhamento atencioso da assistente, garantindo conforto e segurança à bebê.',
    result:
      'Avaliação entusiasmada dos pais: "Amamos o lugar, o tema e o carinho com que trataram a Juju. Ficou maravilhoso e divertidíssimo!"',
    technicalSpecs: {
      camera: 'DSLR Full Frame',
      lens: '50mm f/1.4 & 85mm f/1.8',
      lighting: 'Luz Natural Suave Filtrada pelas Árvores',
      location: 'Parque Roberto Burle Marx'
    },
    deliverables: [
      'Sessão Fotográfica Completa de 1h30min',
      'Cenografia Inclusa',
      'Mini Álbum Sanfonado de Bolso para os Avós'
    ],
    isFeatured: false,
    accentColor: '#D4AF37'
  },
  {
    id: 'felipe-pluft-buffet',
    slug: 'felipe-pluft-buffet',
    number: '16',
    title: 'Felipe 4 Anos — Patrulha Canina no Pluft Buffet',
    client: 'Família do Felipe',
    category: 'aniversarios',
    categoryLabel: 'Festa Infantil Temática',
    year: '2023',
    location: 'Pluft Buffet Infantil — São José dos Campos',
    coverImage: '/portfolio_assets/aniversarios/felipe-pluft-buffet.jpg',
    previewImage: '/portfolio_assets/aniversarios/felipe-pluft-buffet.jpg',
    gallery: [
      '/portfolio_assets/aniversarios/felipe-pluft-buffet.jpg',
      '/portfolio_assets/aniversarios/davi-3-anos.jpg',
      '/portfolio_assets/aniversarios/sofia-1-ano.jpg'
    ],
    tags: ['Festa Infantil', 'Pluft Buffet', 'Patrulha Canina', '4 Anos'],
    summary:
      'A vibrante aventura de Felipe completando 4 anos com tema Patrulha Canina no Pluft Buffet, com brinquedos, recreação e o parabéns inesquecível.',
    objective:
      'Registrar a alegria contagiante do aniversariante com os amiguinhos e a decoração completa do buffet.',
    process:
      'Acompanhamento contínuo dos momentos chave da festa com foco em fotos espontâneas e retratos formais com a mesa do bolo.',
    result:
      'Memória viva e detalhada de uma das fases mais ativas e felizes da infância.',
    technicalSpecs: {
      camera: 'Corpo Full Frame',
      lens: '24-70mm f/2.8',
      lighting: 'Flash Rebatido',
      location: 'Pluft Buffet Infantil, SJC'
    },
    deliverables: [
      'Cobertura Fotográfica de 4 Horas',
      'Fotolivro Temático',
      'Galeria Virtual'
    ],
    isFeatured: false,
    accentColor: '#CCC8BF'
  }
];
