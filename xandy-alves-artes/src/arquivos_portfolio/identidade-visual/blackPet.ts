import type { PortfolioProject } from '../types';

export const blackPetProject: PortfolioProject = {
  id: 'proj-black-pet',
  slug: 'black-pet-identidade-visual',
  number: '01',
  title: 'Black Pet Estética Animal',
  client: 'Black Pet Centro de Cuidados',
  category: 'identidade-visual',
  categoryLabel: 'Identidade Visual & Papelaria',
  year: '2024',
  coverImage: '/portfolio_assets/black-pet/tag.png',
  gallery: [
    '/portfolio_assets/black-pet/tag.png',
    '/portfolio_assets/black-pet/site-mockup.png',
    '/portfolio_assets/black-pet/flyer.png',
    '/portfolio_assets/black-pet/post-maio.png',
    '/portfolio_assets/black-pet/01.png',
    '/portfolio_assets/black-pet/04.png',
    '/portfolio_assets/black-pet/06.png'
  ],
  tags: ['Pet Shop', 'Identidade Visual', 'Manual de Marca', 'Marketing'],
  summary: 'Manual completo de marca e kit promocional para centro de estética canina e felina com atendimento exclusivo.',
  objective: 'Transmitir carinho, higiene hospitalar e excelência nos cuidados com pets através de uma linguagem limpa e confiável.',
  process: 'Criação de silhueta de mascote estilizada, tipografia contemporânea sem serifa, diagramação do manual oficial de aplicação e templates para redes.',
  result: 'Padronização visual em uniformes, toalhas, veículos de transporte e redes sociais, consolidando a fidelidade dos tutores.',
  tools: ['CorelDRAW', 'Adobe Illustrator', 'InDesign'],
  deliverables: ['Manual de Identidade Visual em PDF', 'Cartão de Visitas e Flyer', 'Papel Timbrado e Pastas', 'Kit de Stories e Destaques'],
  isFeatured: true,
  accentColor: '#10b981',
  isPlaceholder: false
};
