import { identidadeVisualProjects } from './identidade-visual';
import { ilustracaoProjects } from './ilustracao';
import { socialMediaProjects } from './social-media';
import { publicidadeProjects } from './publicidade';
import { projetosAutoraisProjects } from './projetos-autorais';
import type { PortfolioProject, PortfolioCategory } from './types';

export * from './types';
export * from './identidade-visual';
export * from './ilustracao';
export * from './social-media';
export * from './publicidade';
export * from './projetos-autorais';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: 'all', label: 'Todos os Projetos', description: 'Visão completa de todos os trabalhos' },
  { id: 'identidade-visual', label: 'Identidade Visual & Branding', description: 'Marcas completas, manuais e papelaria' },
  { id: 'ilustracao', label: 'Ilustração & Desenho', description: 'Arte digital, editorial e desenhos autorais' },
  { id: 'social-media', label: 'Social Media & Marketing', description: 'Peças para redes sociais, carrosséis e campanhas' },
  { id: 'publicidade', label: 'Publicidade & Impressos', description: 'Embalagens, rótulos, folders e ponto de venda' },
  { id: 'autoral', label: 'Projetos Autorais', description: 'Séries pessoais, fine art e estudos conceituais' }
];

export const ALL_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  ...identidadeVisualProjects,
  ...ilustracaoProjects,
  ...socialMediaProjects,
  ...publicidadeProjects,
  ...projetosAutoraisProjects
];

export const FEATURED_PORTFOLIO_PROJECTS: PortfolioProject[] = ALL_PORTFOLIO_PROJECTS.filter(
  (p) => p.isFeatured
);

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return ALL_PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (category === 'all') return ALL_PORTFOLIO_PROJECTS;
  return ALL_PORTFOLIO_PROJECTS.filter((p) => p.category === category);
}
