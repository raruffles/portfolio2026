import { casamentosProjects } from './casamentos';
import { autoralProjects } from './autoral';
import { gestanteProjects } from './gestante';
import { ensaiosProjects } from './ensaios';
import { batizadosProjects } from './batizados';
import { corporativoProjects } from './corporativo';
import { aniversariosProjects } from './aniversarios';
import type { PortfolioProject, PortfolioCategory } from './types';

export * from './types';
export * from './casamentos';
export * from './autoral';
export * from './gestante';
export * from './ensaios';
export * from './batizados';
export * from './corporativo';
export * from './aniversarios';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: 'all', label: 'Todos os Trabalhos', description: 'Visão completa do acervo de Márcio Janousek' },
  { id: 'casamentos', label: 'Casamentos & Editorial', description: 'Enlace matrimonial, making of e editorial nupcial' },
  { id: 'autoral', label: 'Fotografia Autoral & Fine Art', description: 'Séries premiadas pela CONFOTO e Red Dot Editions' },
  { id: 'gestante', label: 'Gestante & Família', description: 'Maternidade ao ar livre e retratos multigeracionais' },
  { id: 'ensaios', label: 'Ensaios & Retrô Pin-Up', description: 'Retratos temáticos, iluminação de estúdio e lifestyle' },
  { id: 'batizados', label: 'Batizados & Cerimônias', description: 'Rito da luz e solenidade nas paróquias do Vale' },
  { id: 'corporativo', label: 'Corporativo & Industrial', description: 'Presença executiva, convenções e grandes empresas' },
  { id: 'aniversarios', label: 'Aniversários & Infantil', description: 'Espontaneidade infantil, 15 anos e smash the cake' }
];

function normalizeAssetUrl(url: string): string {
  if (!url || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  const clean = url.startsWith('/') ? url.slice(1) : url;
  return `${prefix}${clean}`;
}

const rawProjects: PortfolioProject[] = [
  ...casamentosProjects,
  ...autoralProjects,
  ...gestanteProjects,
  ...corporativoProjects,
  ...batizadosProjects,
  ...ensaiosProjects,
  ...aniversariosProjects
];

export const ALL_PORTFOLIO_PROJECTS: PortfolioProject[] = rawProjects.map((p) => ({
  ...p,
  coverImage: normalizeAssetUrl(p.coverImage),
  previewImage: normalizeAssetUrl(p.previewImage || p.coverImage),
  gallery: p.gallery.map(normalizeAssetUrl)
}));

// Featured showcase list for continuous scroll (8 flagship cases in perfect rhythm)
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
