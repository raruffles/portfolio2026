import React from 'react';
import { SERVICES } from '../data/servicesData';
import { PROFILE } from '../data/profileData';
import { ArrowUpRight, Check } from 'lucide-react';
import './ServicesSection.css';

export const ServicesSection: React.FC = () => {
  return (
    <section className="services-section" id="servicos" aria-label="Serviços Prestados">
      <div className="container">
        {/* Cabeçalho */}
        <div className="services-section__header">
          <span className="badge badge--active">SERVIÇOS &amp; ATUAÇÃO</span>
          <h2 className="services-section__title">
            Soluções Visuais para <span className="text-gold">Marcas &amp; Projetos</span>
          </h2>
          <p className="services-section__subtitle">
            Do conceito à entrega técnica: combinamos expressão artística autoral e estratégia
            comercial para posicionar o seu negócio no mais alto nível.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="services-section__grid">
          {SERVICES.map((service) => {
            const whatsappUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${encodeURIComponent(
              service.whatsappMessage
            )}`;

            return (
              <div key={service.id} className="service-card">
                <div className="service-card__top">
                  <span className="service-card__num">{service.number}</span>
                  <span className="service-card__ideal-tag">{service.idealFor}</span>
                </div>

                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.shortDescription}</p>

                {/* Escopo */}
                <div className="service-card__scope">
                  <h4 className="service-card__scope-title">O que está incluso:</h4>
                  <ul className="service-card__scope-list">
                    {service.scope.map((item, idx) => (
                      <li key={idx} className="service-card__scope-item">
                        <Check size={14} className="service-card__check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entregáveis */}
                <div className="service-card__deliverables">
                  <h4 className="service-card__scope-title">Entregáveis Oficiais:</h4>
                  <div className="service-card__tags">
                    {service.deliverables.map((deliv, idx) => (
                      <span key={idx} className="service-card__tag">
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA de Orçamento Direto */}
                <div className="service-card__footer">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-card__btn"
                    aria-label={`Solicitar orçamento para ${service.title}`}
                  >
                    <span>SOLICITAR PROPOSTA</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
