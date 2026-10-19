import React from 'react';
import { PROFILE } from '../data/profileData';
import { MapPin, Clock, Phone } from 'lucide-react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="sobre" aria-label="Sobre Márcio Janousek">
      <div className="container">
        {/* Cabeçalho Editorial Kuwamoto */}
        <div className="about-section__header">
          <span className="badge badge--active">QUEM ESTÁ POR TRÁS DAS LENTES</span>
          <h2 className="about-section__title">
            Sensibilidade Artística &amp; <span className="text-gold">Precisão Documental</span>
          </h2>
        </div>

        {/* Bio Principal com Imagem de Perfil e Manifesto */}
        <div className="about-section__bio-layout">
          <div className="about-section__portrait-wrap">
            <div className="about-section__portrait-frame">
              <img
                src="./portfolio_assets/sobre/marcio-janousek-perfil.jpg"
                alt="Retrato profissional de Márcio Janousek, fotógrafo em São José dos Campos"
                className="about-section__portrait-img"
                loading="lazy"
              />
              <div className="about-section__portrait-tag">
                <span className="about-section__portrait-role">MÁRCIO JANOUSEK</span>
                <span className="about-section__portrait-since">DESDE 1980 · PENTAX &amp; CONFOTO</span>
              </div>
            </div>

            {/* Quick Card com Endereço e Horários */}
            <div className="about-section__quick-card">
              <div className="about-quick-item">
                <MapPin size={16} className="text-gold" />
                <div>
                  <strong>Estúdio Oficial</strong>
                  <span>{PROFILE.addressFull}</span>
                </div>
              </div>
              <div className="about-quick-item">
                <Clock size={16} className="text-gold" />
                <div>
                  <strong>Horário de Funcionamento</strong>
                  <span>{PROFILE.workingHours}</span>
                </div>
              </div>
              <div className="about-quick-item">
                <Phone size={16} className="text-gold" />
                <div>
                  <strong>Atendimento Direto</strong>
                  <span>{PROFILE.contacts.phonePrimary} / {PROFILE.contacts.phoneSecondary}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-section__content">
            <h3 className="about-section__lead">
              "Os momentos mais marcantes da sua vida são para sempre."
            </h3>

            <div className="about-section__paragraphs">
              <p className="about-section__p">
                A paixão pela fotografia começou em <strong>1980</strong>, quando adquiri minha primeira câmera profissional <strong>PENTAX</strong> durante um ano de estudos nos Estados Unidos. Lá, aprofundei-me na alquimia do laboratório de revelação preto e branco, estudos de pinhole e fotografia experimental cruzando o continente.
              </p>
              <p className="about-section__p">
                Formado em <strong>Comunicação Social / Publicidade e Propaganda pela PUC-Campinas</strong>, atuei por anos em veículos de comunicação e agências publicitárias, compreendendo a fotografia como instrumento poderoso de narrativa, empatia e construção de legado.
              </p>
              <p className="about-section__p">
                Há mais de 10 anos à frente do estúdio <strong>Janousek Photos</strong> em São José dos Campos, dedico-me a eternizar celebrações afetivas — casamentos, batizados, aniversários e ensaios de gestante — ao mesmo tempo em que desenvolvo produções corporativas e projetos autorais.
              </p>
            </div>

            {/* Credenciais e Reconhecimentos */}
            <div className="about-section__credentials-grid">
              {PROFILE.credentials.map((cred, idx) => (
                <div key={idx} className="cred-card">
                  <span className="cred-card__tag">{cred.tag}</span>
                  <h4 className="cred-card__title">{cred.title}</h4>
                  <p className="cred-card__desc">{cred.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pilares do Processo Fotográfico */}
        <div className="about-section__process">
          <h3 className="about-section__process-title">Pilares do Método Janousek Photos</h3>

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

        {/* Grandes Marcas Atendidas */}
        <div className="about-section__brands">
          <div className="about-section__brands-header">
            <h4>Grandes Marcas &amp; Projetos Institucionais</h4>
            <p>Experiência com cobertura de eventos, retratos corporativos e catálogo:</p>
          </div>

          <div className="about-section__brands-list">
            <span className="brand-pill">BAYER</span>
            <span className="brand-pill">CAIXA ECONÔMICA FEDERAL</span>
            <span className="brand-pill">HAPVIDA</span>
            <span className="brand-pill">COREN-SP</span>
            <span className="brand-pill">OBMEP</span>
            <span className="brand-pill">COINEX CHARITY</span>
            <span className="brand-pill">ATIMAKY</span>
            <span className="brand-pill">MARS</span>
            <span className="brand-pill">CURSO POLIEDRO</span>
            <span className="brand-pill">KOMEDI PROJETOS</span>
            <span className="brand-pill">SEMESP</span>
            <span className="brand-pill">PARQUE TECNOLÓGICO SJC</span>
          </div>
        </div>
      </div>
    </section>
  );
};
