export interface PortfolioProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  client: string;
  category: 'identidade-visual' | 'ilustracao' | 'social-media' | 'publicidade' | 'autoral';
  categoryLabel: string;
  year: string;
  coverImage: string;
  gallery: string[];
  tags: string[];
  summary: string;
  objective: string;
  process: string;
  result: string;
  tools: string[];
  deliverables: string[];
  isFeatured: boolean;
  accentColor: string;
  isPlaceholder?: boolean;
}

export interface PortfolioCategory {
  id: string;
  label: string;
  description: string;
}
