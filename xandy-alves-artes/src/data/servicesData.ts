export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  scope: string[];
  deliverables: string[];
  idealFor: string;
  whatsappMessage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'branding',
    number: '01',
    title: 'Identidade Visual & Branding',
    shortDescription: 'Construção de marcas autorais com posicionamento estratégico, personalidade visual inconfundível e manuais completos de aplicação.',
    scope: [
      'Estudo de posicionamento e referências de mercado',
      'Criação de logotipo principal, secundário e símbolos',
      'Definição de paleta cromática e tipografia institucional',
      'Elementos de apoio (padronagens, selos e grafismos)',
      'Aplicações práticas em papelaria e canais digitais'
    ],
    deliverables: [
      'Manual de Marca Completo (PDF)',
      'Arquivos Vetoriais Editáveis (AI, EPS, SVG, PDF)',
      'Versões em Alta Resolução para Impressão e Web (PNG, JPG)'
    ],
    idealFor: 'Empresas em fase de lançamento ou negócios consolidados que necessitam de reposicionamento profissional.',
    whatsappMessage: 'Olá Xandy! Gostaria de um orçamento para o serviço de Criação de Identidade Visual e Branding.'
  },
  {
    id: 'ilustracao',
    number: '02',
    title: 'Ilustração & Desenho Autoral',
    shortDescription: 'Arte digital e analógica personalizada para projetos editoriais, capas, estampas, rótulos de produtos e peças comemorativas.',
    scope: [
      'Exploração de sketches conceituais e estudos de composição',
      'Pintura digital de alta fidelidade e arte-finalização vetorial',
      'Tratamento de luz, sombras e texturas analógicas',
      'Adaptação para múltiplos formatos e suportes físicos'
    ],
    deliverables: [
      'Ilustrações em altíssima resolução (300/600 DPI)',
      'Arquivos em camadas abertas para produção gráfica',
      'Termo de cessão patrimonial e uso dos direitos de imagem'
    ],
    idealFor: 'Editoras, marcas de vestuário, embalagens especiais e projetos que buscam autenticidade artística exclusiva.',
    whatsappMessage: 'Olá Xandy! Tenho interesse em contratar uma Ilustração Personalizada para meu projeto.'
  },
  {
    id: 'social-media',
    number: '03',
    title: 'Design para Redes Sociais & Marketing',
    shortDescription: 'Criação de peças visuais estratégicas que transformam o feed em uma vitrine de autoridade e convertem seguidores em clientes.',
    scope: [
      'Desenvolvimento de identidade gráfica para posts e carrosséis',
      'Diagramação editorial para narrativas de alto engajamento',
      'Criação de capas de reels, destaques e banners de perfil',
      'Design de criativos de alta conversão para tráfego pago'
    ],
    deliverables: [
      'Templates reutilizáveis e customizados no Figma/Photoshop',
      'Pacotes mensais de posts prontos para veiculação',
      'Guia de boas práticas de postagem e tipografia'
    ],
    idealFor: 'Marcas, infoprodutores e negócios que buscam consistência visual e maior retorno em vendas no ambiente digital.',
    whatsappMessage: 'Olá Xandy! Gostaria de conversar sobre Design para Redes Sociais e Peças de Marketing.'
  },
  {
    id: 'publicidade-grafica',
    number: '04',
    title: 'Materiais Gráficos & Publicidade',
    shortDescription: 'Design de impressos corporativos, rótulos de embalagens, folders comerciais, cartazes e comunicação para pontos de venda.',
    scope: [
      'Planejamento de facas especiais e acabamentos nobres (hot-stamping, verniz)',
      'Diagramação técnica com margens de sangria e perfis CMYK corretos',
      'Fechamento de arquivos rigoroso para envio direto a gráficas parceiras',
      'Mockups foto-realistas para aprovação antes da tiragem'
    ],
    deliverables: [
      'PDF/X-1a pronto para pré-impressão gráfica',
      'Folha técnica de instrução para o impressor',
      'Visualizações 3D do produto final'
    ],
    idealFor: 'Indústrias, comércios e empreendimentos que valorizam a experiência tátil de materiais impressos de primeira linha.',
    whatsappMessage: 'Olá Xandy! Gostaria de solicitar um projeto de Materiais Gráficos e Embalagens.'
  },
  {
    id: 'direcao-de-arte',
    number: '05',
    title: 'Direção de Arte & Apoio Criativo',
    shortDescription: 'Consultoria visual contínua para agências, estúdios e empresas que necessitam de um olhar experiente para guiar campanhas e lançamentos.',
    scope: [
      'Alinhamento estético e curadoria de linguagem visual',
      'Orientação criativa para equipes de design e marketing',
      'Revisão e refinamento de peças antes da publicação final',
      'Definição de key visuals e conceitos de campanha'
    ],
    deliverables: [
      'Moodboards conceituais e guias de estilo',
      'Acompanhamento e reuniões de alinhamento estratégico',
      'Relatório de diagnóstico de maturidade visual'
    ],
    idealFor: 'Agências que precisam expandir braço criativo ou empresas estruturando sua comunicação interna.',
    whatsappMessage: 'Olá Xandy! Gostaria de saber mais sobre Direção de Arte e Consultoria Criativa.'
  }
];
