import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <span className="footer__brand">XANDY ALVES ARTES</span>
            <span className="footer__sep">/</span>
            <span className="footer__copy">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </span>
          </div>

          <div className="footer__center">
            <span className="footer__tagline">
              Design Gráfico, Ilustração Autoral &amp; Soluções Estratégicas
            </span>
          </div>

          <div className="footer__right">
            <button
              onClick={scrollToTop}
              className="footer__top-btn"
              aria-label="Voltar ao início da página"
            >
              <span>TOPO</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
