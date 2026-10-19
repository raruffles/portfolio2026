import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { PortfolioProject } from '../arquivos_portfolio/types';
import { KineticRoll } from './KineticRoll';
import { ArrowDown, ArrowUp } from 'lucide-react';
import './ShowcaseStage.css';

interface ShowcaseStageProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
  onExploreMore: () => void;
}

const ROW_H = 36; // Altura rigorosa de 36px (múltiplo de 4: 9 * 4px) para leitura confortável a 16px
const FOLLOW_EASE = 0.12; // Suavização inercial Lerp
const GAP_RATIO = 0.2; // Espaçamento entre os previews no track

export const ShowcaseStage: React.FC<ShowcaseStageProps> = ({
  projects,
  onSelectProject,
  onExploreMore
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const currentY = useRef(0);
  const targetY = useRef(0);
  const activeIndexRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastWheelTimestamp = useRef(0);

  const total = projects.length;
  const maxTarget = (total - 1) * ROW_H;

  const clamp = (val: number) => Math.max(0, Math.min(maxTarget, val));

  // Opacidade decrescente por distância da linha ativa (exatamente como em EAST 64 Films)
  const getRowOpacity = (distance: number) => {
    if (distance < 0.3) return 1;
    if (distance <= 1) return 0.85 - 0.25 * (distance - 0.3);
    if (distance <= 2) return 0.6 - 0.3 * (distance - 1);
    if (distance <= 3) return 0.3 - 0.15 * (distance - 2);
    return Math.max(0.12, 0.15 - 0.05 * (distance - 3));
  };

  // Loop contínuo de renderização via RequestAnimationFrame
  const tick = useCallback(() => {
    const diff = targetY.current - currentY.current;
    if (Math.abs(diff) > 0.02) {
      currentY.current += diff * FOLLOW_EASE;
    } else {
      currentY.current = targetY.current;
    }

    const current = currentY.current;
    const progress = current / ROW_H; // Posição contínua em unidades de projeto (ex: 0.0, 0.45, 1.2...)
    const newActive = Math.round(clamp(current) / ROW_H);

    if (newActive !== activeIndexRef.current) {
      activeIndexRef.current = newActive;
      setActiveIndex(newActive);
    }

    // 1. Move a Lista de Projetos para manter a linha ativa centralizada a 50% da tela
    if (listRef.current) {
      const stageHeight = window.innerHeight;
      const centerY = stageHeight * 0.5 - ROW_H / 2;
      listRef.current.style.transform = `translate3d(0, ${centerY - current}px, 0)`;

      // Atualiza opacidade de cada linha dinamicamente com base na proximidade
      const rows = listRef.current.children;
      for (let k = 0; k < rows.length; k++) {
        const rowEl = rows[k] as HTMLElement;
        const dist = Math.abs(k - progress);
        const opacity = getRowOpacity(dist);
        rowEl.style.opacity = String(opacity);
      }
    }

    // 2. Move o Track de Previews verticais com translação fluida e Parallax
    if (trackRef.current) {
      const stageHeight = window.innerHeight;
      const previewStep = stageHeight * (1 + GAP_RATIO);
      trackRef.current.style.transform = `translate3d(0, ${-progress * previewStep}px, 0)`;

      // Efeito Parallax interno nos painéis de imagem
      const panels = trackRef.current.children;
      for (let k = 0; k < panels.length; k++) {
        const panel = panels[k] as HTMLElement;
        const dist = k - progress;
        const clampedDist = Math.max(-1, Math.min(1, dist));
        // Parallax sutil no interior da imagem
        const img = panel.querySelector('.showcase__preview-img') as HTMLElement;
        if (img) {
          img.style.transform = `translate3d(0, ${clampedDist * 80}px, 0) scale(1.08)`;
        }
      }
    }

    rafId.current = requestAnimationFrame(tick);
  }, [maxTarget]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  // Evento de Roda do Mouse (Wheel) Contínuo
  useEffect(() => {
    const stageEl = containerRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Se a página já rolou para além do Showcase, não intercepta
      if (window.scrollY > 50) return;

      const now = performance.now();
      const delta = e.deltaY;

      // Se estiver no último projeto e continuar descendo o scroll, libera a rolagem para a próxima seção
      if (activeIndexRef.current === total - 1 && delta > 25 && targetY.current >= maxTarget) {
        return; // Permite a rolagem nativa para baixo
      }

      // Se estiver no primeiro projeto e rolar para cima, nada a fazer
      if (activeIndexRef.current === 0 && delta < -25 && targetY.current <= 0) {
        return;
      }

      // Intercepta e avança suavemente projeto por projeto
      e.preventDefault();

      if (now - lastWheelTimestamp.current < 280) {
        return; // Filtro inercial contra disparos ultra-rápidos de trackpads
      }
      lastWheelTimestamp.current = now;

      const direction = delta > 0 ? 1 : -1;
      const nextStep = Math.round(targetY.current / ROW_H) + direction;
      targetY.current = clamp(nextStep * ROW_H);
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      stageEl.removeEventListener('wheel', handleWheel);
    };
  }, [total, maxTarget]);

  // Teclado (ArrowUp, ArrowDown, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 80) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        targetY.current = clamp(Math.round(targetY.current / ROW_H) * ROW_H + ROW_H);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetY.current = clamp(Math.round(targetY.current / ROW_H) * ROW_H - ROW_H);
      } else if (e.key === 'Enter') {
        const active = projects[activeIndexRef.current];
        if (active) onSelectProject(active);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects, onSelectProject, maxTarget]);

  // Touch Swipe para Celular
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY <= 10) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 30) {
      const dir = diff > 0 ? 1 : -1;
      targetY.current = clamp(Math.round(targetY.current / ROW_H) * ROW_H + dir * ROW_H);
    }
    touchStartY.current = null;
  };

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <section
      ref={containerRef}
      className="p-works"
      id="showcase-stage"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Projetos em Destaque — Navegação Cinematográfica"
    >
      {/* 1. Track de Previews com Parallax (ao fundo) — Clicável direto para o projeto */}
      <div
        className="p-works__preview"
        id="works-preview"
        onClick={() => onSelectProject(activeProject)}
        title={`Clique na imagem para ver o projeto ${activeProject.title}`}
      >
        <div ref={trackRef} className="p-works__preview-track">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`p-works__preview-media ${idx === activeIndex ? 'is-active' : ''}`}
              style={{
                top: `calc(${idx} * (100% + ${GAP_RATIO * 100}%))`
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(proj);
              }}
            >
              <div className="p-works__preview-inner">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="showcase__preview-img"
                  loading={idx < 2 ? 'eager' : 'lazy'}
                />
                <div className="p-works__preview-tint" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Lista Interativa Central (Corre para baixo ao rolar o mouse / Clicar no ativo abre o projeto) */}
      <div className="p-works__stage-overlay">
        <ul ref={listRef} className="p-works__list" id="works-list">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <li
                key={proj.id}
                className={`p-works__row ${isActive ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    onSelectProject(proj);
                  } else {
                    targetY.current = idx * ROW_H;
                  }
                }}
                data-index={idx}
                title={isActive ? `Clique para abrir ${proj.title}` : `Rolar para ${proj.title}`}
              >
                <span className="p-works__arrow">{isActive ? '▶' : ''}</span>
                <span className="p-works__num">{proj.number}</span>
                <span className="p-works__title">{proj.title}</span>
                <span className="p-works__client">{proj.client}</span>
                <span className="p-works__cat">{proj.categoryLabel}</span>
                <span className="p-works__year">{proj.year}</span>
              </li>
            );
          })}
        </ul>

        {/* 3. Legenda Inferior (Texto de suporte e título com clique direto para o projeto) */}
        <div ref={captionRef} className="p-works__caption" id="works-caption">
          <div
            className="p-works__caption-meta"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(activeProject);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelectProject(activeProject);
            }}
            title="Clique para abrir detalhes do projeto"
            aria-label={`Ver projeto ${activeProject.title}: ${activeProject.client} - ${activeProject.categoryLabel}`}
          >
            <span className="p-works__caption-client">{activeProject.client}</span>
            <span className="p-works__caption-slash">/</span>
            <span className="p-works__caption-category">{activeProject.categoryLabel}</span>
            <span className="p-works__caption-slash">/</span>
            <span className="p-works__caption-year">{activeProject.year}</span>
          </div>

          <div className="p-works__caption-bottom">
            <h1
              className="p-works__caption-title"
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(activeProject);
              }}
              title="Clique para abrir detalhes"
            >
              {activeProject.title}
            </h1>

            <div className="p-works__caption-actions">
              <button
                className="c-button-decorate"
                onClick={() => onSelectProject(activeProject)}
                aria-label="Ver mais detalhes do projeto"
              >
                <KineticRoll text="VER DETALHES" />
              </button>

              <button
                className="p-works__scroll-down-hint"
                onClick={() => {
                  if (activeIndex < total - 1) {
                    targetY.current = (activeIndex + 1) * ROW_H;
                  } else {
                    onExploreMore();
                  }
                }}
                title="Avançar projeto ou rolar a página"
              >
                <ArrowDown size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Controles Laterais Sutis de Navegação */}
        <div className="p-works__nav-aside">
          <button
            className="p-works__nav-arrow"
            onClick={() => {
              targetY.current = clamp(targetY.current - ROW_H);
            }}
            disabled={activeIndex === 0}
            aria-label="Projeto anterior"
          >
            <ArrowUp size={18} />
          </button>
          <div className="p-works__nav-progress">
            <div
              className="p-works__nav-bar"
              style={{
                height: `${((activeIndex + 1) / total) * 100}%`
              }}
            />
          </div>
          <button
            className="p-works__nav-arrow"
            onClick={() => {
              targetY.current = clamp(targetY.current + ROW_H);
            }}
            disabled={activeIndex === total - 1}
            aria-label="Próximo projeto"
          >
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
