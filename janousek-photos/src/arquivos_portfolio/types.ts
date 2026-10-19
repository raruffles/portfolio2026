export type PhotographyCategory =
  | 'casamentos'
  | 'autoral'
  | 'gestante'
  | 'ensaios'
  | 'batizados'
  | 'corporativo'
  | 'aniversarios';

export interface PortfolioProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  client: string;
  category: PhotographyCategory;
  categoryLabel: string;
  year: string;
  location?: string;
  coverImage: string;
  previewImage?: string;
  gallery: string[];
  tags: string[];
  summary: string;
  objective: string;
  process: string;
  result: string;
  technicalSpecs?: {
    camera?: string;
    lens?: string;
    lighting?: string;
    location?: string;
  };
  deliverables: string[];
  isFeatured: boolean;
  accentColor: string;
  heroGradient?: string;
  isPlaceholder?: boolean;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  description: string;
}
