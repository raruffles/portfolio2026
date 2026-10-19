import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { KineticRoll } from './KineticRoll';
import { ArrowUpRight, Search } from 'lucide-react';
import './PortfolioGrid.css';

interface PortfolioGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section className="portfolio-grid" id="portfolio" aria-label="Acervo de Trabalhos Janousek Photos">
      <div className="container">
        {/* Cabeçalho da Seção */}
        <div className="portfolio-grid__header">
          <div className="portfolio-grid__header-left">
            <span className="badge badge--active">ACERVO COMPLETO</span>
            <h2 className="portfolio-grid__title">
              Trabalhos &amp; <span className="text-gold">Séries Fotográficas</span>
            </h2>
            <p className="portfolio-grid__subtitle">
              Do enlace matrimonial e ensaios no Parque Burle Marx à presença executiva e obras autorais reconhecidas pela CONFOTO e Red Dot Editions.
            </p>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="portfolio-grid__search">
            <Search size={16} className="portfolio-grid__search-icon" />
            <input
              type="text"
              placeholder="Buscar por cliente, local, tag ou projeto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="portfolio-grid__search-input"
              aria-label="Buscar trabalhos fotográficos"
            />
          </div>
        </div>

        {/* Barra de Filtros por Categoria Kuwamoto Style */}
        <nav className="portfolio-grid__filters" aria-label="Filtro de categorias de projetos">
          <ul className="portfolio-grid__filter-list">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="portfolio-grid__filter-item">
                <button
                  className={`portfolio-grid__filter-btn ${
                    selectedCategory === cat.id ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <KineticRoll text={cat.label.toUpperCase()} active={selectedCategory === cat.id} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Grade de Cards de Projetos */}
        {filteredProjects.length === 0 ? (
          <div className="portfolio-grid__empty">
            <p>Nenhuma série encontrada para os critérios selecionados.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="portfolio-grid__empty-btn"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="portfolio-grid__items">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="portfolio-card"
                onClick={() => onSelectProject(project)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelectProject(project);
                }}
                role="button"
                aria-label={`Ver estudo de caso do projeto ${project.title}`}
              >
                <div className="portfolio-card__media">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="portfolio-card__image"
                    loading="lazy"
                  />
                  <div className="portfolio-card__overlay">
                    <span className="portfolio-card__explore-pill">
                      <span>VER DETALHES</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <span className="portfolio-card__num">{project.number}</span>
                </div>

                <div className="portfolio-card__body">
                  <div className="portfolio-card__meta">
                    <span className="portfolio-card__cat">{project.categoryLabel}</span>
                    <span className="portfolio-card__year">{project.year}</span>
                  </div>

                  <h3 className="portfolio-card__title">{project.title}</h3>
                  <p className="portfolio-card__client">{project.client}</p>

                  <div className="portfolio-card__tags">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="portfolio-card__tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
