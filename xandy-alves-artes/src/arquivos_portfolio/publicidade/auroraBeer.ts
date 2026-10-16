import type { PortfolioProject } from '../types';

export const auroraBeerProject: PortfolioProject = {
  id: 'proj-04',
  slug: 'aurora-craft-beer-packaging',
  number: '04',
  title: 'Aurora Cervejaria Artesanal',
  client: 'Aurora Brewing Co.',
  category: 'publicidade',
  categoryLabel: 'Publicidade & Rótulos',
  year: '2024',
  coverImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1400&auto=format&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=1200&auto=format&fit=crop'
  ],
  tags: ['Embalagens', 'Ilustração de Rótulo', 'Materiais Gráficos', 'PDV'],
  summary: 'Linha de rótulos ilustrados e materiais de ponto de venda para cervejas sazonais inspiradas em mitologias celestes.',
  objective: 'Diferenciar o produto nos empórios gourmet através de narrativas ilustradas exclusivas com acabamento em verniz localizado e hot-stamping.',
  process: 'Desenho manual dos personagens mitológicos, vetorização de precisão e modelagem de mockups tridimensionais para teste de luz em gôndola.',
  result: 'Destaque em premiações de design de embalagem e esgotamento da primeira tiragem de 10.000 latas em menos de 30 dias.',
  tools: ['Adobe Illustrator', 'Procreate', 'Photoshop'],
  deliverables: ['Rótulos para Latas 473ml', 'Display de Mesa PDV', 'Bolachas de Chopp Colecionáveis'],
  isFeatured: true,
  accentColor: '#10B981',
  isPlaceholder: true
};
