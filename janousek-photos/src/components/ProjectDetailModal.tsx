import React, { useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import { PROFILE } from '../data/profileData';
import { ArrowLeft, ArrowUpRight, X, MessageCircle } from 'lucide-react';
import './ProjectDetailModal.css';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Garante galeria completa sem imagens duplicadas
  const galleryImages = Array.from(
    new Set([project.coverImage, ...(project.gallery || [])].filter(Boolean))
  );

  const whatsappMessage = encodeURIComponent(
    `Olá Márcio Janousek! Vi a série fotográfica "${project.title}" (${project.categoryLabel}) no seu site e gostaria de solicitar um orçamento para um projeto similar.`
  );
  const whatsappUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="project-page"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-page-title"
    >
      {/* 1. Barra Superior Fixa (Sticky Header Apple) com Ação Imediata de Voltar à Tela Inicial */}
      <header className="project-page__header">
        <div className="project-page__header-inner">
          <button
            className="project-page__back-btn"
            onClick={onClose}
            aria-label="Voltar à tela inicial"
            title="Voltar à tela inicial (ESC)"
          >
            <ArrowLeft size={18} />
            <span>Voltar à Tela Inicial</span>
          </button>

          <div className="project-page__brand">
            <span className="project-page__brand-title">Janousek Photos</span>
            <span className="project-page__brand-sep">/</span>
            <span className="project-page__brand-cat">{project.categoryLabel}</span>
          </div>

          <div className="project-page__actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page__cta-btn"
              title="Solicitar orçamento pelo WhatsApp"
            >
              <MessageCircle size={15} />
              <span>Orçamento</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              className="project-page__close-btn"
              onClick={onClose}
              aria-label="Fechar galeria"
              title="Voltar à tela inicial"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo da Página Completa */}
      <div className="project-page__container">
        {/* Breve Introdução (Sem textos longos sobre conceito) */}
        <section className="project-page__intro">
          <div className="project-page__meta-badge">
            <span className="project-page__badge-cat">{project.categoryLabel}</span>
            <span className="project-page__badge-dot">•</span>
            <span className="project-page__badge-client">{project.client}</span>
            <span className="project-page__badge-dot">•</span>
            <span className="project-page__badge-year">{project.year}</span>
            {project.location && (
              <>
                <span className="project-page__badge-dot">•</span>
                <span className="project-page__badge-loc">{project.location}</span>
              </>
            )}
          </div>

          <h1 id="project-page-title" className="project-page__title">
            {project.title}
          </h1>

          {project.summary && (
            <p className="project-page__summary">{project.summary}</p>
          )}

          <div className="project-page__gallery-counter">
            <span>{galleryImages.length} Fotografias em Alta Resolução</span>
          </div>
        </section>

        {/* 3. Galeria Completa em Grid (Arredondamento 16px, espaçamento 16px / 24px) */}
        <section className="project-page__gallery" aria-label="Galeria completa do projeto">
          <div className="project-page__grid">
            {galleryImages.map((imgUrl, idx) => {
              // Layout editorial em 12 colunas: Primeira foto 12 cols, pares 6 cols, trios 4 cols
              const isHero = idx === 0;
              const isEvenPair = idx % 3 !== 0;

              return (
                <div
                  key={idx}
                  className={`project-page__item ${
                    isHero ? 'project-page__item--hero' : isEvenPair ? 'project-page__item--half' : 'project-page__item--full'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} — Registro ${idx + 1}`}
                    className="project-page__img"
                    loading={idx < 2 ? 'eager' : 'lazy'}
                  />
                  <div className="project-page__item-tag">
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Rodapé da Página: Opção Clara de Voltar à Tela Inicial */}
        <footer className="project-page__footer">
          <div className="project-page__footer-card">
            <div className="project-page__footer-text">
              <h3>Gostou deste trabalho?</h3>
              <p>
                Agende uma sessão fotográfica exclusiva ou solicite uma cotação sob medida diretamente com Márcio Janousek.
              </p>
            </div>

            <div className="project-page__footer-buttons">
              <button
                className="project-page__footer-back-btn"
                onClick={onClose}
              >
                <ArrowLeft size={16} />
                <span>Voltar à Tela Inicial</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-page__footer-whatsapp-btn"
              >
                <MessageCircle size={16} />
                <span>Solicitar Orçamento no WhatsApp</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
