import React, { useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import { PROFILE } from '../data/profileData';
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, Calendar, UserCheck } from 'lucide-react';
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

  const whatsappMessage = encodeURIComponent(
    `Olá Xandy! Vi o projeto "${project.title}" no seu portfólio e gostaria de desenvolver algo semelhante para a minha marca.`
  );
  const whatsappUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="project-modal__backdrop" onClick={onClose} />

      <div className="project-modal__content">
        {/* Botão de Fechar Fixo */}
        <button
          className="project-modal__close-btn"
          onClick={onClose}
          aria-label="Fechar estudo de caso"
        >
          <X size={20} />
          <span>ESC</span>
        </button>

        {/* Hero do Case */}
        <div className="project-modal__hero">
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-modal__hero-image"
          />
          <div className="project-modal__hero-gradient" />
          <div className="project-modal__hero-content">
            <div className="project-modal__badge-row">
              <span className="badge badge--active">{project.categoryLabel}</span>
              <span className="badge">PROJETO {project.number}</span>
            </div>
            <h2 id="modal-project-title" className="project-modal__title">
              {project.title}
            </h2>
            <p className="project-modal__summary">{project.summary}</p>
          </div>
        </div>

        {/* Corpo do Estudo de Caso */}
        <div className="project-modal__body">
          {/* Ficha Técnica (Inspirada nos Créditos da Referência) */}
          <div className="project-modal__specs-grid">
            <div className="project-modal__spec-card">
              <div className="project-modal__spec-icon">
                <UserCheck size={18} />
              </div>
              <div>
                <span className="project-modal__spec-label">CLIENTE / MARCA</span>
                <p className="project-modal__spec-value">{project.client}</p>
              </div>
            </div>

            <div className="project-modal__spec-card">
              <div className="project-modal__spec-icon">
                <Calendar size={18} />
              </div>
              <div>
                <span className="project-modal__spec-label">ANO DE PRODUÇÃO</span>
                <p className="project-modal__spec-value">{project.year}</p>
              </div>
            </div>

            <div className="project-modal__spec-card">
              <div className="project-modal__spec-icon">
                <Cpu size={18} />
              </div>
              <div>
                <span className="project-modal__spec-label">FERRAMENTAS & TÉCNICAS</span>
                <p className="project-modal__spec-value">{project.tools.join(', ')}</p>
              </div>
            </div>

            <div className="project-modal__spec-card">
              <div className="project-modal__spec-icon">
                <Layers size={18} />
              </div>
              <div>
                <span className="project-modal__spec-label">CATEGORIA</span>
                <p className="project-modal__spec-value">{project.categoryLabel}</p>
              </div>
            </div>
          </div>

          {/* Narrativa do Case: Objetivo, Processo e Resultados */}
          <div className="project-modal__narrative">
            <section className="project-modal__section">
              <h3 className="project-modal__section-title">01. O Desafio &amp; Objetivo</h3>
              <p className="project-modal__section-text">{project.objective}</p>
            </section>

            <section className="project-modal__section">
              <h3 className="project-modal__section-title">02. Processo Criativo &amp; Execução</h3>
              <p className="project-modal__section-text">{project.process}</p>
            </section>

            <section className="project-modal__section">
              <h3 className="project-modal__section-title">03. Impacto &amp; Resultados</h3>
              <p className="project-modal__section-text">{project.result}</p>
            </section>
          </div>

          {/* Entregáveis Concretos */}
          <div className="project-modal__deliverables">
            <h4 className="project-modal__deliverables-title">Entregáveis Oficiais do Projeto</h4>
            <div className="project-modal__deliverables-list">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="project-modal__deliverable-item">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Galeria de Peças e Aplicações */}
          <div className="project-modal__gallery">
            <h4 className="project-modal__gallery-title">Galeria de Aplicações &amp; Detalhes</h4>
            <div className="project-modal__gallery-grid">
              {project.gallery.map((imgUrl, idx) => (
                <div key={idx} className="project-modal__gallery-item">
                  <img
                    src={imgUrl}
                    alt={`${project.title} - Detalhe ${idx + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Box de Conversão Comercial Direta */}
          <div className="project-modal__cta-box">
            <div className="project-modal__cta-text">
              <h3>Precisa de um projeto com este nível de qualidade?</h3>
              <p>
                Inicie uma conversa diretamente no WhatsApp para avaliarmos suas necessidades e
                elaborarmos uma proposta sob medida.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__cta-btn"
            >
              <span>SOLICITAR PROJETO SIMILAR</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
