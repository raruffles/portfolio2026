import React, { useEffect } from 'react';
import type { Project } from '../data/portfolioData';
import { PROFILE } from '../data/profileData';
import { X, ArrowUpRight, CheckCircle2, Camera, MapPin, Calendar, UserCheck } from 'lucide-react';
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
    `Olá Márcio Janousek! Vi a série fotográfica "${project.title}" (${project.categoryLabel}) no seu site e gostaria de solicitar um orçamento para um projeto similar.`
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

        {/* Hero do Case — Foto 100% Pura sem Degradê Escuro */}
        <div className="project-modal__hero">
          <img
            src={project.coverImage}
            alt={project.title}
            className="project-modal__hero-image"
          />
        </div>

        {/* Informações Principais Apple Clean */}
        <div className="project-modal__header-content">
          <div className="project-modal__badge-row">
            <span className="badge badge--active">{project.categoryLabel}</span>
            <span className="badge">PROJETO {project.number}</span>
          </div>
          <h2 id="modal-project-title" className="project-modal__title">
            {project.title}
          </h2>
          <p className="project-modal__summary">{project.summary}</p>
        </div>

        {/* Corpo do Estudo de Caso */}
        <div className="project-modal__body">
          {/* Ficha Técnica Fotográfica (Kuwamoto Credits Style) */}
          <div className="project-modal__specs-grid">
            <div className="project-modal__spec-card">
              <div className="project-modal__spec-icon">
                <UserCheck size={18} />
              </div>
              <div>
                <span className="project-modal__spec-label">CLIENTE / EVENTO</span>
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

            {project.location && (
              <div className="project-modal__spec-card">
                <div className="project-modal__spec-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="project-modal__spec-label">LOCAÇÃO</span>
                  <p className="project-modal__spec-value">{project.location}</p>
                </div>
              </div>
            )}

            {project.technicalSpecs && (
              <div className="project-modal__spec-card">
                <div className="project-modal__spec-icon">
                  <Camera size={18} />
                </div>
                <div>
                  <span className="project-modal__spec-label">ÓPTICA &amp; ILUMINAÇÃO</span>
                  <p className="project-modal__spec-value">
                    {project.technicalSpecs.camera} {project.technicalSpecs.lens ? `· ${project.technicalSpecs.lens}` : ''}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Narrativa do Case: Objetivo, Processo e Resultados */}
          <div className="project-modal__narrative">
            <section className="project-modal__section">
              <h3 className="project-modal__section-title">01. O Conceito &amp; Objetivo</h3>
              <p className="project-modal__section-text">{project.objective}</p>
            </section>

            <section className="project-modal__section">
              <h3 className="project-modal__section-title">02. Direção de Cena &amp; Abordagem da Luz</h3>
              <p className="project-modal__section-text">{project.process}</p>
            </section>

            <section className="project-modal__section">
              <h3 className="project-modal__section-title">03. O Legado Afetivo &amp; Reconhecimento</h3>
              <p className="project-modal__section-text">{project.result}</p>
            </section>
          </div>

          {/* Entregáveis Concretos */}
          <div className="project-modal__deliverables">
            <h4 className="project-modal__deliverables-title">Entregáveis Oficiais do Trabalho</h4>
            <div className="project-modal__deliverables-list">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="project-modal__deliverable-item">
                  <CheckCircle2 size={16} className="text-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Galeria de Alta Resolução */}
          <div className="project-modal__gallery">
            <h4 className="project-modal__gallery-title">Galeria de Imagens da Série</h4>
            <div className="project-modal__gallery-grid">
              {project.gallery.map((imgUrl, idx) => (
                <div key={idx} className="project-modal__gallery-item">
                  <img
                    src={imgUrl}
                    alt={`${project.title} - Registro ${idx + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Box de Conversão Comercial Direta */}
          <div className="project-modal__cta-box">
            <div className="project-modal__cta-text">
              <h3>Deseja uma cobertura fotográfica com este nível de sensibilidade?</h3>
              <p>
                Converse diretamente com Márcio Janousek pelo WhatsApp para verificar disponibilidade de data e receber um orçamento detalhado.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__cta-btn"
            >
              <span>SOLICITAR ORÇAMENTO NO WHATSAPP</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
