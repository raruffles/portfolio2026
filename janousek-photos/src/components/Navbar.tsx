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
    'Olá Márcio Janousek! Estava no seu site e gostaria de solicitar um orçamento para fotografia.'
  )}`;

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Esquerda: Logo e Posicionamento Kuwamoto Style */}
        <div className="navbar__brand-wrap">
          <button
            className="navbar__brand"
            onClick={() => handleNavClick('showcase')}
            aria-label="Voltar para a página inicial de Janousek Photos"
          >
            <span className="navbar__brand-glyph">◎</span>
            <span className="navbar__brand-text">JANOUSEK</span>
            <span className="navbar__brand-sub">PHOTOS</span>
          </button>
          <div className="navbar__location">
            <span className="navbar__dot" />
            <span>ESTÚDIO FOTOGRÁFICO & AUTORAL · SJC</span>
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
            <KineticRoll text="TRABALHOS" active={currentView === 'grid'} />
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
          <div className="navbar__status" title="Status de atendimento em São José dos Campos">
            <span className="navbar__status-indicator" />
            <span className="navbar__status-text">AGENDA ABERTA</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta"
            aria-label="Solicitar orçamento via WhatsApp de Janousek Photos"
          >
            <span>ORÇAMENTO</span>
            <ArrowUpRight size={14} className="navbar__cta-icon" />
          </a>

          {/* Botão Hambúrguer Mobile */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      <div className={`navbar__mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <nav className="navbar__mobile-nav">
          <button
            className={`navbar__mobile-link ${currentView === 'showcase' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('showcase')}
          >
            <span>01</span> DESTAQUES
          </button>
          <button
            className={`navbar__mobile-link ${currentView === 'grid' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('grid')}
          >
            <span>02</span> TRABALHOS
          </button>
          <button
            className={`navbar__mobile-link ${currentView === 'services' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('services')}
          >
            <span>03</span> SERVIÇOS
          </button>
          <button
            className={`navbar__mobile-link ${currentView === 'about' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            <span>04</span> SOBRE
          </button>
          <button
            className={`navbar__mobile-link ${currentView === 'contact' ? 'is-active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            <span>05</span> CONTATO
          </button>

          <div className="navbar__mobile-footer">
            <div className="navbar__mobile-coords">
              <span>{PROFILE.addressFull}</span>
              <span>{PROFILE.workingHours}</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__mobile-cta"
            >
              FALAR NO WHATSAPP
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
