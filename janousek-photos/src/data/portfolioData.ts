import {
  ALL_PORTFOLIO_PROJECTS,
  PORTFOLIO_CATEGORIES,
  FEATURED_PORTFOLIO_PROJECTS
} from '../arquivos_portfolio';
import type { PortfolioProject } from '../arquivos_portfolio/types';

export type Project = PortfolioProject;
export const PROJECTS = ALL_PORTFOLIO_PROJECTS;
export const CATEGORIES = PORTFOLIO_CATEGORIES;
export const FEATURED_PROJECTS = FEATURED_PORTFOLIO_PROJECTS;
export * from '../arquivos_portfolio';
