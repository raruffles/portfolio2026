import React, { useState } from 'react';
import { PROFILE } from '../data/profileData';
import { MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';
import './ContactSection.css';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    service: 'identidade-visual',
    budget: 'padrao',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Monta mensagem estruturada para envio direto via WhatsApp
    const serviceLabels: Record<string, string> = {
      'identidade-visual': 'Identidade Visual & Branding',
      'ilustracao': 'Ilustração & Desenho Autoral',
      'social-media': 'Design para Redes Sociais',
      'publicidade': 'Materiais Gráficos e Publicidade',
      'outro': 'Outro Projeto Especial'
    };

    const text = `*SOLICITAÇÃO DE ORÇAMENTO (SITE)*%0A%0A*Nome:* ${encodeURIComponent(
      formState.name
    )}%0A*Empresa:* ${encodeURIComponent(formState.company || 'Não informada')}%0A*Serviço:* ${encodeURIComponent(
      serviceLabels[formState.service] || formState.service
    )}%0A*Mensagem:* ${encodeURIComponent(formState.message)}`;

    const url = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${text}`;
    setSubmitted(true);
    window.open(url, '_blank');
  };

  const whatsappDirectUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${encodeURIComponent(
    'Olá Xandy! Gostaria de conversar sobre um projeto criativo para a minha marca.'
  )}`;

  return (
    <section className="contact-section" id="contato" aria-label="Contato Comercial">
      <div className="container">
        <div className="contact-section__grid">
          {/* Lado Esquerdo: Informações e Canais Diretos */}
          <div className="contact-section__info">
            <span className="badge badge--active">INICIE SEU PROJETO</span>
            <h2 className="contact-section__title">
              Vamos Criar Algo <span className="text-gold">Marcante Juntos?</span>
            </h2>
            <p className="contact-section__desc">
              Conte sobre a sua ideia, empresa ou projeto. Respondemos em até 24 horas úteis com
              diagnóstico preliminar e direcionamento de proposta.
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
                  <span className="contact-channel-card__label">ATENDIMENTO RÁPIDO (WHATSAPP)</span>
                  <p className="contact-channel-card__val">{PROFILE.contacts.whatsappFormatted}</p>
                  <span className="contact-channel-card__action">Iniciar conversa agora →</span>
                </div>
              </a>

              {/* E-mail Card */}
              <a
                href={`mailto:${PROFILE.contacts.email}`}
                className="contact-channel-card"
              >
                <div className="contact-channel-card__icon">
                  <Mail size={22} />
                </div>
                <div className="contact-channel-card__content">
                  <span className="contact-channel-card__label">E-MAIL INSTITUCIONAL</span>
                  <p className="contact-channel-card__val">{PROFILE.contacts.email}</p>
                  <span className="contact-channel-card__action">Enviar e-mail formal →</span>
                </div>
              </a>
            </div>

            {/* Redes Sociais */}
            <div className="contact-section__socials">
              <span className="contact-section__socials-label">CONECTE-SE:</span>
              <div className="contact-section__socials-list">
                <a
                  href={PROFILE.contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href={PROFILE.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário de Briefing Rápido */}
          <div className="contact-section__form-wrap">
            <h3 className="contact-form__title">Briefing Inicial do Projeto</h3>
            <p className="contact-form__subtitle">
              Preencha os campos abaixo para que possamos entender o contexto da sua demanda.
            </p>

            {submitted ? (
              <div className="contact-form__success">
                <CheckCircle2 size={48} className="text-gold" />
                <h4>Solicitação Enviada!</h4>
                <p>
                  Sua mensagem foi direcionada para o WhatsApp. Em instantes iniciaremos o seu
                  atendimento.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="contact-form__reset-btn"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">Seu Nome *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Como prefere ser chamado?"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-company">Nome da Empresa / Marca</label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Ex: Minha Empresa Ltda."
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-service">Qual serviço você necessita? *</label>
                  <select
                    id="contact-service"
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  >
                    <option value="identidade-visual">Identidade Visual &amp; Branding</option>
                    <option value="ilustracao">Ilustração &amp; Desenho Autoral</option>
                    <option value="social-media">Design para Redes Sociais &amp; Ads</option>
                    <option value="publicidade">Materiais Gráficos &amp; Embalagens</option>
                    <option value="outro">Outro Projeto Especial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Conte um pouco sobre o projeto *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Qual o objetivo principal, público-alvo ou prazo desejado?"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="contact-form__submit">
                  <span>ENVIAR VIA WHATSAPP</span>
                  <Send size={16} />
                </button>

                <p className="contact-form__privacy">
                  Seus dados são protegidos e utilizados exclusivamente para o contato comercial deste
                  projeto.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
