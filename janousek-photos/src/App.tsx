import { useState } from 'react';
import { PROJECTS, FEATURED_PROJECTS } from './data/portfolioData';
import type { Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { ShowcaseStage } from './components/ShowcaseStage';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Footer } from './components/Footer';
import './App.css';

export function App() {
  const [currentView, setCurrentView] = useState<
    'showcase' | 'grid' | 'services' | 'about' | 'contact'
  >('showcase');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigate = (view: 'showcase' | 'grid' | 'services' | 'about' | 'contact') => {
    setCurrentView(view);
    if (view !== 'showcase') {
      // Quando clica em grid, services, about ou contact, rola suavemente para o elemento correspondente
      setTimeout(() => {
        const el = document.getElementById(
          view === 'grid' ? 'portfolio' : view === 'services' ? 'servicos' : view
        );
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* Barra de Navegação Superior Fixa */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Estágio Cinematográfico Full-Viewport com Destaques Reais */}
      <main className="app-main">
        <ShowcaseStage
          projects={FEATURED_PROJECTS}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onExploreMore={() => handleNavigate('grid')}
        />

        {/* Seções Contínuas em Grid para Navegação Completa */}
        <PortfolioGrid
          projects={PROJECTS}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        <ServicesSection />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Modal de Detalhe / Estudo de Caso Completo */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Rodapé Editorial */}
      <Footer />
    </div>
  );
}

export default App;
