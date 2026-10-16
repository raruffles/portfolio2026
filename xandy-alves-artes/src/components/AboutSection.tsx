import React from 'react';
import { PROFILE } from '../data/profileData';
import { Compass, PenTool, Sparkles, CheckCircle } from 'lucide-react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="sobre" aria-label="Sobre o Profissional">
      <div className="container">
        {/* Cabeçalho */}
        <div className="about-section__header">
          <span className="badge badge--active">SOBRE &amp; ABORDAGEM</span>
          <h2 className="about-section__title">
            Expressão Artística &amp; <span className="text-gold">Rigor Visual</span>
          </h2>
        </div>

        {/* Grid Principal: Manifesto e Filosofia */}
        <div className="about-section__manifesto-grid">
          <div className="about-section__intro">
            <h3 className="about-section__lead">
              Transformando conceitos complexos em identidades marcantes, ilustrações autorais e
              peças de comunicação que encantam e vendem.
            </h3>
            <div className="about-section__paragraphs">
              {PROFILE.manifesto.map((paragraph, idx) => (
                <p key={idx} className="about-section__p">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="about-section__highlights">
            <div className="about-card">
              <Sparkles size={24} className="text-gold" />
              <h4>Identidade com Personalidade</h4>
              <p>Marcas desenvolvidas sob medida, sem uso de templates genéricos ou atalhos visuais.</p>
            </div>

            <div className="about-card">
              <PenTool size={24} className="text-gold" />
              <h4>Ilustração Autoral</h4>
              <p>Domínio do desenho digital e analógico para criar elementos visuais exclusivos.</p>
            </div>

            <div className="about-card">
              <Compass size={24} className="text-gold" />
              <h4>Visão Estratégica</h4>
              <p>Cada projeto é estruturado para resolver objetivos comerciais reais do cliente.</p>
            </div>
          </div>
        </div>

        {/* Pilares do Processo (Inspirado nos números 01, 02, 03 de EAST 64 Films) */}
        <div className="about-section__process">
          <h3 className="about-section__process-title">Como Conduzimos Cada Projeto</h3>

          <div className="about-section__pillars-grid">
            {PROFILE.workflowPillars.map((pillar) => (
              <div key={pillar.number} className="pillar-card">
                <span className="pillar-card__num">{pillar.number}</span>
                <h4 className="pillar-card__title">{pillar.title}</h4>
                <p className="pillar-card__desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domínio de Ferramentas */}
        <div className="about-section__tools">
          <div className="about-section__tools-header">
            <h4>Ferramentas &amp; Tecnologias de Produção</h4>
            <p>Softwares profissionais utilizados no fluxo criativo diário:</p>
          </div>

          <div className="about-section__tools-grid">
            {PROFILE.tools.map((tool, idx) => (
              <div key={idx} className="tool-pill">
                <CheckCircle size={14} className="text-gold" />
                <span className="tool-pill__name">{tool.name}</span>
                <span className="tool-pill__cat">({tool.category})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
