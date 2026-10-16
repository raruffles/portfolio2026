import React, { useState, useEffect } from 'react';
import { KineticRoll } from './KineticRoll';
import { PROFILE } from '../data/profileData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  currentView: 'showcase' | 'grid' | 'services' | 'about' | 'contact';
  onNavigate: (view: 'showcase' | 'grid' | 'services' | 'about' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'showcase' | 'grid' | 'services' | 'about' | 'contact') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${PROFILE.contacts.whatsappNumber}?text=${encodeURIComponent(
    'Olá Xandy! Conheci seu trabalho pelo site e gostaria de solicitar um orçamento.'
  )}`;

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Esquerda: Logo e Posicionamento */}
        <div className="navbar__brand-wrap">
          <button
            className="navbar__brand"
            onClick={() => handleNavClick('showcase')}
            aria-label="Voltar para a página inicial"
          >
            <span className="navbar__brand-glyph">✦</span>
            <span className="navbar__brand-text">XANDY ALVES</span>
            <span className="navbar__brand-sub">ARTES</span>
          </button>
          <div className="navbar__location">
            <span className="navbar__dot" />
            <span>ESTÚDIO DE ARTE & DESIGN</span>
          </div>
        </div>

        {/* Centro: Navegação com Roll-Over */}
        <nav className="navbar__nav" aria-label="Navegação principal">
          <button
            className={`navbar__link ${currentView === 'showcase' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('showcase')}
          >
            <KineticRoll text="DESTAQUES" active={currentView === 'showcase'} />
          </button>

          <button
            className={`navbar__link ${currentView === 'grid' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('grid')}
          >
            <KineticRoll text="PORTFÓLIO" active={currentView === 'grid'} />
          </button>

          <button
            className={`navbar__link ${currentView === 'services' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('services')}
          >
            <KineticRoll text="SERVIÇOS" active={currentView === 'services'} />
          </button>

          <button
            className={`navbar__link ${currentView === 'about' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            <KineticRoll text="SOBRE" active={currentView === 'about'} />
          </button>

          <button
            className={`navbar__link ${currentView === 'contact' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            <KineticRoll text="CONTATO" active={currentView === 'contact'} />
          </button>
        </nav>

        {/* Direita: Status de Disponibilidade e CTA */}
        <div className="navbar__actions">
          <div className="navbar__status" title="Status atual de atendimento">
            <span className="navbar__status-indicator" />
            <span className="navbar__status-text">DISPONÍVEL</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
            aria-label="Falar no WhatsApp"
          >
            <span>ORÇAMENTO</span>
            <ArrowUpRight size={14} className="navbar__cta-icon" />
          </a>

          {/* Toggle Mobile */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-list">
            <button
              className={`navbar__mobile-item ${currentView === 'showcase' ? 'is-active' : ''}`}
              onClick={() => handleNavClick('showcase')}
            >
              <span className="navbar__mobile-num">01</span>
              <span>Destaques</span>
            </button>
            <button
              className={`navbar__mobile-item ${currentView === 'grid' ? 'is-active' : ''}`}
              onClick={() => handleNavClick('grid')}
            >
              <span className="navbar__mobile-num">02</span>
              <span>Portfólio Completo</span>
            </button>
            <button
              className={`navbar__mobile-item ${currentView === 'services' ? 'is-active' : ''}`}
              onClick={() => handleNavClick('services')}
            >
              <span className="navbar__mobile-num">03</span>
              <span>Serviços & Pacotes</span>
            </button>
            <button
              className={`navbar__mobile-item ${currentView === 'about' ? 'is-active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <span className="navbar__mobile-num">04</span>
              <span>Sobre o Profissional</span>
            </button>
            <button
              className={`navbar__mobile-item ${currentView === 'contact' ? 'is-active' : ''}`}
              onClick={() => handleNavClick('contact')}
            >
              <span className="navbar__mobile-num">05</span>
              <span>Contato Direto</span>
            </button>
          </div>

          <div className="navbar__mobile-footer">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__mobile-whatsapp"
            >
              Iniciar Conversa no WhatsApp
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
