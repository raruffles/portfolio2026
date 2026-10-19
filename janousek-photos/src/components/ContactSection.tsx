import React, { useState } from 'react';
import { PROFILE } from '../data/profileData';
import { MessageSquare, Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    service: 'casamentos',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabels: Record<string, string> = {
      'casamentos': 'Casamentos & Editorial Nupcial',
      'gestante': 'Ensaios de Gestante & Família',
      'batizados': 'Batizados & Celebrações Sacras',
      'corporativo': 'Retratos Corporativos & Presença Executiva',
      'aniversarios': 'Aniversários, 15 Anos & Infantil',
      'fine-art': 'Fotografia Autoral & Impressões Fine Art',
      'outro': 'Outro Evento Especial'
    };

    const text = `*SOLICITAÇÃO DE ORÇAMENTO (JANOUSEK PHOTOS)*%0A%0A*Nome:* ${encodeURIComponent(
      formState.name
    )}%0A*Telefone:* ${encodeURIComponent(
      formState.phone || 'Não informado'
    )}%0A*Serviço:* ${encodeURIComponent(
      serviceLabels[formState.service] || formState.service
    )}%0A*Data Prevista:* ${encodeURIComponent(
      formState.date || 'A definir'
    )}%0A*Mensagem:* ${encodeURIComponent(formState.message)}`;

    const url = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${text}`;
    setSubmitted(true);
    window.open(url, '_blank');
  };

  const whatsappDirectUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${encodeURIComponent(
    'Olá Márcio Janousek! Gostaria de consultar sua disponibilidade e conversar sobre um ensaio / evento.'
  )}`;

  return (
    <section className="contact-section" id="contato" aria-label="Contato Comercial Janousek Photos">
      <div className="container">
        <div className="contact-section__grid">
          {/* Lado Esquerdo: Informações de Contato e Localização */}
          <div className="contact-section__info">
            <span className="badge badge--active">ATENDIMENTO &amp; AGENDAMENTOS</span>
            <h2 className="contact-section__title">
              Vamos Eternizar o Seu <span className="text-gold">Momento Especial?</span>
            </h2>
            <p className="contact-section__desc">
              Entre em contato direto pelo WhatsApp ou envie seu briefing. Respondemos rapidamente com nossa disponibilidade de agenda e proposta detalhada.
            </p>

            <div className="contact-section__channels">
              {/* WhatsApp Card */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card contact-channel-card--whatsapp"
              >
                <div className="contact-channel-card__icon">
                  <MessageSquare size={22} />
                </div>
                <div className="contact-channel-card__content">
                  <span className="contact-channel-card__label">WHATSAPP &amp; ATENDIMENTO RÁPIDO</span>
                  <p className="contact-channel-card__val">{PROFILE.contacts.whatsappFormatted}</p>
                  <span className="contact-channel-card__action">Iniciar conversa no WhatsApp →</span>
                </div>
              </a>

              {/* Telefone Fixo / Comercial */}
              <a href={`tel:1239347090`} className="contact-channel-card">
                <div className="contact-channel-card__icon">
                  <Phone size={22} />
                </div>
                <div className="contact-channel-card__content">
                  <span className="contact-channel-card__label">TELEFONE FIXO DO ESTÚDIO</span>
                  <p className="contact-channel-card__val">{PROFILE.contacts.phoneSecondary}</p>
                  <span className="contact-channel-card__action">Ligar agora →</span>
                </div>
              </a>

              {/* E-mail Card */}
              <a href={`mailto:${PROFILE.contacts.email}`} className="contact-channel-card">
                <div className="contact-channel-card__icon">
                  <Mail size={22} />
                </div>
                <div className="contact-channel-card__content">
                  <span className="contact-channel-card__label">E-MAIL DO ESTÚDIO</span>
                  <p className="contact-channel-card__val">{PROFILE.contacts.email}</p>
                  <span className="contact-channel-card__action">Enviar mensagem por e-mail →</span>
                </div>
              </a>

              {/* Endereço & Horário */}
              <div className="contact-channel-card contact-channel-card--address">
                <div className="contact-channel-card__icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-channel-card__content">
                  <span className="contact-channel-card__label">LOCALIZAÇÃO &amp; HORÁRIO</span>
                  <p className="contact-channel-card__val">{PROFILE.addressFull}</p>
                  <span className="contact-channel-card__subval">
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {PROFILE.workingHours} · {PROFILE.serviceArea}
                  </span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="contact-section__socials">
              <span className="contact-section__socials-label">SIGA NO INSTAGRAM:</span>
              <div className="contact-section__socials-list">
                <a
                  href={PROFILE.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram Oficial Janousek Photos"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@janousekphotos</span>
                </a>

                <a
                  href={PROFILE.contacts.instagramPersonal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram Pessoal Marcio Janousek"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@janousekmarcio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário de Orçamento */}
          <div className="contact-section__form-wrap">
            <h3 className="contact-form__title">Solicite Seu Orçamento</h3>
            <p className="contact-form__subtitle">
              Preencha os detalhes do seu evento ou ensaio para receber uma proposta personalizada.
            </p>

            {submitted ? (
              <div className="contact-form__success">
                <CheckCircle2 size={48} className="text-gold" />
                <h4>Solicitação Encaminhada!</h4>
                <p>
                  Sua mensagem foi direcionada com segurança para o WhatsApp oficial de Márcio Janousek.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="contact-form__reset-btn"
                >
                  Enviar outra solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Seu Nome Completo *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Como você prefere ser chamado(a)?"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone">WhatsApp / Telefone de Contato *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="(12) 99999-9999"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-service">Tipo de Trabalho Fotográfico *</label>
                  <select
                    id="contact-service"
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  >
                    <option value="casamentos">Casamentos &amp; Editorial Nupcial</option>
                    <option value="gestante">Ensaios de Gestante &amp; Família (Burle Marx)</option>
                    <option value="batizados">Batizados &amp; Cerimônias Sacras</option>
                    <option value="corporativo">Retratos Corporativos &amp; Industrial</option>
                    <option value="aniversarios">Aniversários, 15 Anos &amp; Smash the Cake</option>
                    <option value="fine-art">Obras Autorais Fine Art (Red Dot / CONFOTO)</option>
                    <option value="outro">Outro Projeto Especial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-date">Data Prevista do Evento / Ensaio</label>
                  <input
                    id="contact-date"
                    type="text"
                    placeholder="Ex: 15 de Dezembro ou 'A combinar'"
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Detalhes do Evento ou Ensaio *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Conte sobre o local, quantidade de pessoas, expectativas ou dúvidas..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="contact-form__submit">
                  <span>ENVIAR ORÇAMENTO VIA WHATSAPP</span>
                  <Send size={16} />
                </button>

                <p className="contact-form__privacy">
                  Atendimento direto em São José dos Campos e Vale do Paraíba. Sigilo e respeito aos seus dados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
