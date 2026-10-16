import type { PortfolioProject } from '../types';

export const valkCoffeeProject: PortfolioProject = {
  id: 'proj-01',
  slug: 'valk-coffee-roasters-branding',
  number: '01',
  title: 'Valk Coffee Roasters',
  client: 'Valk Specialty Coffee',
  category: 'identidade-visual',
  categoryLabel: 'Identidade Visual',
  year: '2025',
  coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1400&auto=format&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop'
  ],
  tags: ['Branding', 'Embalagens', 'Tipografia', 'Design Gráfico'],
  summary: 'Identidade visual completa para torrefação artesanal de cafés especiais, combinando rigor geométrico escandinavo com traços manuais orgânicos.',
  objective: 'Criar uma marca memorável capaz de se posicionar no segmento premium e transmitir a precisão artesanal da torra de grãos selecionados.',
  process: 'Desenvolvimento do logotipo tipográfico autoral, sistema de selos para embalagens kraft, paleta cromática terrosa e guia de aplicação para rótulos e fardos.',
  result: 'Marca com forte presença em prateleiras e e-commerce, aumentando o ticket médio dos microlotes e consolidando a comunidade local de apreciadores.',
  tools: ['Adobe Illustrator', 'Photoshop', 'Figma'],
  deliverables: ['Manual de Identidade Visual', 'Rótulos de Embalagem', 'Papelaria Institucional', 'Selo de Origem'],
  isFeatured: true,
  accentColor: '#D4A373',
  isPlaceholder: true
};
