import type { PortfolioProject } from './types';

export const autoralProjects: PortfolioProject[] = [
  {
    id: 'o-equilibrista',
    slug: 'o-equilibrista',
    number: '02',
    title: 'O Equilibrista — Série Autoral Fine Art',
    client: 'Obra Selecionada · Red Dot Editions & CONFOTO',
    category: 'autoral',
    categoryLabel: 'Fotografia Autoral & Fine Art',
    year: '2024',
    location: 'Acervo Particular & Salões Nacionais',
    coverImage: '/portfolio_assets/autoral-fineart/o-equilibrista.jpg',
    previewImage: '/portfolio_assets/autoral-fineart/o-equilibrista.jpg',
    gallery: [
      '/portfolio_assets/autoral-fineart/o-equilibrista.jpg',
      '/portfolio_assets/autoral-fineart/estudo-autoral-fineart.jpg',
      '/portfolio_assets/autoral-fineart/feira-do-rolo.jpg'
    ],
    tags: ['Fine Art', 'Preto & Branco', 'Red Dot Editions', 'CONFOTO', 'Fotoclube Câmera & Luz'],
    summary:
      'Estudo visual sobre equilíbrio, solidão e geometria humana no espaço. Obra selecionada para a prestigiada publicação internacional "Retratos: edição #001" da Red Dot Editions e premiada em salões da Confederação Brasileira de Fotografia.',
    objective:
      'Investigar as tensões entre gravidade e postura corporal através do alto contraste tonal em preto e branco, despindo a cena de distrações cromáticas para focar na essência do movimento.',
    process:
      'Captura realizada com controle rigoroso de fotometria pontual, buscando o cinza médio de Ansel Adams e extremos tonais profundos (zona III e zona VIII). Revelação digital artesanal em curvas de luminância dedicadas.',
    result:
      'Reconhecimento crítico entre os 100 maiores retratistas contemporâneos da publicação Red Dot Editions e presença permanente no portfólio autoral do Fotoclube Câmera & Luz.',
    technicalSpecs: {
      camera: 'Sensor Monocromático Calibrado',
      lens: '50mm f/1.2 Prime de Alta Definição',
      lighting: 'Luz Pontual de Tungstênio Direcionada',
      location: 'Estúdio Autoral Janousek Photos, SJC'
    },
    deliverables: [
      'Tiragem Limitada em Papel Algodão Hahnemühle Photo Rag 308g',
      'Certificado de Autenticidade Assinado pelo Autor',
      'Montagem Museológica com Paspatur Livre de Ácido',
      'Exemplar em Acervos de Colecionadores'
    ],
    isFeatured: true,
    accentColor: '#FFFFFF'
  },
  {
    id: 'feira-do-rolo',
    slug: 'feira-do-rolo',
    number: '10',
    title: 'Feira do Rolo — Documental Urbano de SJC',
    client: 'Ensaio Documental Urbano',
    category: 'autoral',
    categoryLabel: 'Documental & Rua',
    year: '2023',
    location: 'São José dos Campos — SP',
    coverImage: '/portfolio_assets/autoral-fineart/feira-do-rolo.jpg',
    previewImage: '/portfolio_assets/autoral-fineart/feira-do-rolo.jpg',
    gallery: [
      '/portfolio_assets/autoral-fineart/feira-do-rolo.jpg',
      '/portfolio_assets/autoral-fineart/o-equilibrista.jpg',
      '/portfolio_assets/autoral-fineart/estudo-autoral-fineart.jpg'
    ],
    tags: ['Street Photography', 'Documental', 'Cultura Urbana', 'Vale do Paraíba'],
    summary:
      'Imersão antropológica e visual nas feiras populares de troca e comércio de São José dos Campos, revelando rostos marcados pelo tempo, objetos nostálgicos e a vivacidade das calçadas.',
    objective:
      'Registrar a memória viva e não institucionalizada da cidade através de retratos espontâneos dos frequentadores e negociantes da tradicional Feira do Rolo.',
    process:
      'Trabalho de campo com lente fixa discreta de 35mm, conversas prévias com os personagens e disparos imediatos capturando gestos sinceros sem pose teatral.',
    result:
      'Série com mais de 14.000 visualizações na plataforma e selecionada para mostras de fotografia de rua do Vale do Paraíba.',
    technicalSpecs: {
      camera: 'Câmera Compacta Profissional Telemetria',
      lens: '35mm f/2.0 Grande Angular',
      lighting: 'Luz Natural Solar Direta e Sombras de Toldos',
      location: 'São José dos Campos - SP'
    },
    deliverables: [
      'Série Documental de 24 Fotografias em Alta Resolução',
      'Livro Zine Impresso em Tiragem Experimental',
      'Artigo Cultural para o Blog Ame Suas Fotos'
    ],
    isFeatured: false,
    accentColor: '#D8CBB5'
  }
];
