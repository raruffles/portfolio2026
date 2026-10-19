import React, { useState, useEffect, useRef } from 'react';
import type { PortfolioProject } from '../arquivos_portfolio/types';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import './ShowcaseStage.css';

interface ShowcaseStageProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
  onExploreMore: () => void;
}

export const ShowcaseStage: React.FC<ShowcaseStageProps> = ({
  projects,
  onSelectProject,
  onExploreMore
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastWheelTimestamp = useRef(0);

  const total = projects.length;

  const handleSelect = (idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setActiveIndex(clamped);
    if (listRef.current) {
      const child = listRef.current.children[clamped] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Evento de Roda do Mouse (Wheel) Contínuo nos Destaques
  useEffect(() => {
    const stageEl = containerRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Se a página já rolou para além do topo, deixa o scroll nativo agir
      if (window.scrollY > 40) return;

      const delta = e.deltaY;
      const now = performance.now();

      // Se estiver no último projeto e rolar para baixo, deixa a página rolar
      if (activeIndex === total - 1 && delta > 20) {
        return;
      }
      // Se estiver no primeiro projeto e rolar para cima, deixa a página no topo
      if (activeIndex === 0 && delta < -20) {
        return;
      }

      e.preventDefault();

      if (now - lastWheelTimestamp.current < 260) {
        return; // Filtro contra eventos repetidos de alta frequência
      }
      lastWheelTimestamp.current = now;

      if (delta > 0 && activeIndex < total - 1) {
        handleSelect(activeIndex + 1);
      } else if (delta < 0 && activeIndex > 0) {
        handleSelect(activeIndex - 1);
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      stageEl.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, total]);

  // Teclado (ArrowUp, ArrowDown, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 100) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < total - 1) handleSelect(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) handleSelect(activeIndex - 1);
      } else if (e.key === 'Enter') {
        const active = projects[activeIndex];
        if (active) onSelectProject(active);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total, projects, onSelectProject]);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      ref={containerRef}
      className="p-works"
      id="showcase-stage"
      aria-label="Projetos em Destaque — Apresentação Apple Pro"
    >
      <div className="p-works__container">
        {/* Header Editorial Clean Apple */}
        <div className="p-works__header">
          <div className="p-works__eyebrow">
            <span className="p-works__eyebrow-dot" />
            <span>Estúdio Fotográfico Autoral · São José dos Campos</span>
          </div>
          <h1 className="p-works__headline">
            Olhar autoral. Luz natural. Histórias que permanecem.
          </h1>
          <p className="p-works__lead">
            Casamentos com sensibilidade fotojornalística, ensaios de gestante e família no Parque Burle Marx e fotografia autoral fine art certificada por Márcio Janousek.
          </p>
        </div>

        {/* Stage Interativo Apple */}
        <div className="p-works__stage">
          {/* 1. Sidebar com Lista de Projetos Selecionáveis */}
          <aside className="p-works__sidebar">
            <div className="p-works__sidebar-header">
              <span className="p-works__sidebar-title">Destaques Selecionados</span>
              <span className="p-works__sidebar-counter">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <ul ref={listRef} className="p-works__list" id="works-list">
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={proj.id}
                    className={`p-works__row ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      if (isActive) {
                        onSelectProject(proj);
                      } else {
                        handleSelect(idx);
                      }
                    }}
                    title={isActive ? `Clique para abrir o caso ${proj.title}` : `Visualizar ${proj.title}`}
                  >
                    <div className="p-works__row-main">
                      <span className="p-works__num">{proj.number}</span>
                      <div className="p-works__row-text">
                        <span className="p-works__title">{proj.title}</span>
                        <span className="p-works__cat">{proj.categoryLabel}</span>
                      </div>
                    </div>
                    <span className="p-works__row-arrow">›</span>
                  </li>
                );
              })}
            </ul>

            <button
              className="p-works__explore-all-btn"
              onClick={onExploreMore}
              aria-label="Ver acervo completo de projetos"
            >
              <span>Ver Acervo Completo</span>
              <ArrowRight size={16} />
            </button>
          </aside>

          {/* 2. Apple Curved Display com a Foto Ativa em Cores Reais */}
          <div className="p-works__display">
            {/* Controles Sutis no Canto Superior */}
            <div className="p-works__badge-count">
              {activeProject.number} · {activeProject.categoryLabel}
            </div>

            <div className="p-works__nav-controls">
              <button
                className="p-works__ctrl-btn"
                onClick={() => handleSelect(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Projeto anterior"
                title="Projeto anterior"
              >
                <ArrowUp size={18} />
              </button>
              <button
                className="p-works__ctrl-btn"
                onClick={() => handleSelect(activeIndex + 1)}
                disabled={activeIndex === total - 1}
                aria-label="Próximo projeto"
                title="Próximo projeto"
              >
                <ArrowDown size={18} />
              </button>
            </div>

            {/* Mídia Fotográfica Limpa (Zero Degradê Escuro) — Clicável direto */}
            <div
              className="p-works__display-media"
              onClick={() => onSelectProject(activeProject)}
              title={`Clique na fotografia para abrir o estudo de caso de ${activeProject.title}`}
            >
              <img
                key={activeProject.id}
                src={activeProject.coverImage}
                alt={activeProject.title}
                className="showcase__preview-img"
                loading="eager"
              />
            </div>

            {/* Barra de Rodapé Apple com Detalhes e Ação */}
            <div className="p-works__display-footer">
              <div
                className="p-works__display-meta"
                onClick={() => onSelectProject(activeProject)}
                title="Ver estudo de caso"
              >
                <div className="p-works__display-tags">
                  <span>{activeProject.client}</span>
                  <span>·</span>
                  <span className="p-works__display-year">{activeProject.year}</span>
                </div>
                <h2 className="p-works__display-title">{activeProject.title}</h2>
              </div>

              <button
                className="p-works__display-cta"
                onClick={() => onSelectProject(activeProject)}
                aria-label={`Explorar projeto ${activeProject.title}`}
              >
                <span>Explorar Caso</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
