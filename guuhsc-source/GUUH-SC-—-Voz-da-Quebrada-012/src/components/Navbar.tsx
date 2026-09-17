import React, { useState } from 'react';
import { Menu, X, Play, Music, Youtube, Instagram, Phone, Lock } from 'lucide-react';
import { ARTIST_INFO } from '../data/guuhData';

interface NavbarProps {
  onOpenVideoModal?: (youtubeId: string, title: string) => void;
  onLock?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideoModal, onLock }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'SOBRE', href: '#sobre' },
    { label: 'VÍDEOS', href: '#videos' },
    { label: 'MÚSICA', href: '#musica' },
    { label: 'INSTAGRAM', href: '#instagram' },
    { label: 'SHOWS', href: '#shows' },
    { label: 'CONTATO', href: '#contato' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-[1160px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" id="nav-brand-logo">
          <div className="logo-neon-container">
            <img
              src="/guuhsc/images/logo/logo-w-f.png"
              alt="GUUH SC"
              className="logo-neon h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'images/logo/logo-w-f.png';
              }}
            />
          </div>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#21f6c9] bg-[#21f6c9]/10 border border-[#21f6c9]/30 px-2.5 py-0.5 rounded-full tracking-wider">
            012 • SJC
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#b7a6d6]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#21f6c9] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#21f6c9] hover:after:w-full after:transition-all after:duration-250"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons, Lock & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <a
              href={ARTIST_INFO.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#21f6c9] hover:bg-[#21f6c9]/20 hover:scale-110 transition-all"
              title="Spotify Oficial"
            >
              <Music className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ff2e92] hover:bg-[#ff2e92]/20 hover:scale-110 transition-all"
              title="YouTube @guuhsc"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f4eeff] hover:text-[#ff2e92] hover:bg-white/10 hover:scale-110 transition-all"
              title="Instagram @guuhscmc"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#21f6c9] hover:bg-white/10 hover:scale-110 transition-all"
              title="TikTok @guuhscmc"
            >
              <span className="font-anton text-xs">TT</span>
            </a>
          </div>

          {onLock && (
            <button
              onClick={onLock}
              title="Bloquear projeto novamente"
              className="flex items-center gap-1.5 text-xs text-[#b7a6d6] hover:text-[#ff2e92] border border-white/15 hover:border-[#ff2e92]/40 rounded-full px-3 py-1.5 transition-all bg-white/5 hover:bg-[#ff2e92]/10 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Bloquear</span>
            </button>
          )}

          <a
            href={`https://wa.me/${ARTIST_INFO.phoneRaw}?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20para%20contratar%20o%20show%20do%20Guuh%20SC!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-xs px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,46,146,0.35)] hover:shadow-[0_0_30px_rgba(255,46,146,0.6)] transition-all transform hover:-translate-y-0.5"
            id="btn-nav-contratar"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>CONTRATAR SHOW</span>
          </a>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {onLock && (
            <button
              onClick={onLock}
              title="Bloquear projeto"
              className="text-[#b7a6d6] hover:text-[#ff2e92] p-1.5 border border-white/10 rounded-lg"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          <a
            href={ARTIST_INFO.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-[#ff2e92] p-1.5"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#f4eeff] p-2 hover:text-[#21f6c9] transition-colors"
            aria-label="Abrir menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#150b24] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-semibold text-base">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#b7a6d6] hover:text-[#21f6c9] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4">
            <a
              href={ARTIST_INFO.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21f6c9] hover:opacity-80"
              aria-label="Spotify"
            >
              <Music className="w-6 h-6" />
            </a>
            <a
              href={ARTIST_INFO.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff2e92] hover:opacity-80"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href={ARTIST_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f4eeff] hover:text-[#ff2e92]"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={ARTIST_INFO.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#21f6c9] font-anton text-sm"
              aria-label="TikTok"
            >
              TIKTOK
            </a>
          </div>

          <a
            href={`https://wa.me/${ARTIST_INFO.phoneRaw}?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20para%20contratar%20o%20show%20do%20Guuh%20SC!`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-[#ff2e92] text-[#0a0612] font-bold text-sm py-3 rounded-full shadow-[0_0_20px_rgba(255,46,146,0.35)]"
          >
            FALAR COM A ASSESSORIA
          </a>

          {onLock && (
            <button
              onClick={onLock}
              className="w-full flex items-center justify-center gap-2 text-xs text-[#b7a6d6] hover:text-[#ff2e92] border border-white/10 py-2.5 rounded-lg transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Bloquear Acesso</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};