import React from 'react';
import { ARTIST_INFO } from '../data/guuhData';
import { Instagram, Youtube, Music, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onLock?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLock }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050308] border-t border-white/10 relative">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/guuhsc/images/logo/logo-w-f.png"
              alt="GUUH SC"
              className="h-8 sm:h-9 w-auto object-contain mb-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'images/logo/logo-w-f.png';
              }}
            />
            <p className="text-xs text-[#b7a6d6] mt-1">
              Voz da Quebrada 012 • São José dos Campos - SP • Funk / Trap &amp; Love Funk
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={ARTIST_INFO.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#21f6c9] hover:bg-[#21f6c9]/20 hover:scale-110 transition-all"
            >
              <Music className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ff2e92] hover:bg-[#ff2e92]/20 hover:scale-110 transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f4eeff] hover:text-[#ff2e92] hover:bg-white/10 hover:scale-110 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={ARTIST_INFO.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#21f6c9] hover:bg-white/10 hover:scale-110 transition-all"
            >
              <span className="font-anton text-xs">TT</span>
            </a>
          </div>

          {/* Actions: Lock & Scroll to Top */}
          <div className="flex items-center gap-3">
            {onLock && (
              <button
                type="button"
                onClick={onLock}
                className="flex items-center gap-1.5 text-xs text-[#b7a6d6] hover:text-[#ff2e92] border border-white/10 hover:border-[#ff2e92]/40 rounded-lg px-3 py-2 transition-colors cursor-pointer"
                title="Bloquear projeto"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Bloquear</span>
              </button>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-bold text-[#b7a6d6] hover:text-[#21f6c9] transition-colors p-2 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b7a6d6]">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>Marcas e direitos reservados &copy; {new Date().getFullYear()} Guuh SC.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>
              Criado por{' '}
              <a
                href="https://raphaelolima.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#21f6c9] hover:text-[#ff2e92] font-semibold underline decoration-white/20 hover:decoration-[#ff2e92] transition-colors"
              >
                raphaelolima.com.br
              </a>{' '}
              2026
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={ARTIST_INFO.links.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#21f6c9] transition-colors"
            >
              www.guuhsc.com
            </a>
            <span className="text-white/20">|</span>
            <span className="text-[#21f6c9] font-mono font-bold">DDD 012</span>
          </div>
        </div>
      </div>
    </footer>
  );
};