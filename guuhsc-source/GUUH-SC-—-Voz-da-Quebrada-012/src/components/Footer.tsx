import React from 'react';
import { ARTIST_INFO } from '../data/guuhData';
import { Instagram, Youtube, ArrowUp } from 'lucide-react';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050308] border-t border-white/10 relative">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="logo-neon-container mb-2">
              <img
                src="/guuhsc/images/logo/logo-w-f.png"
                alt="GUUH SC"
                className="logo-neon h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'images/logo/logo-w-f.png';
                }}
              />
            </div>
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
              title="Spotify Oficial"
            >
              <SpotifyIcon className="w-4 h-4 fill-current" />
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
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          </div>

          {/* Actions: Scroll to Top */}
          <div className="flex items-center gap-3">
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

        {/* Regional SEO Coverage Bar */}
        <div className="py-5 border-b border-white/10 text-center md:text-left">
          <p className="text-xs text-[#b7a6d6] leading-relaxed">
            <strong className="text-[#21f6c9]">Contratação de Shows &amp; Presença Regional:</strong>{' '}
            São José dos Campos (SJC) · Taubaté · Jacareí · Vale do Paraíba (012) · Litoral Norte de SP (Caraguatatuba, Ubatuba, São Sebastião, Ilhabela) · São Paulo Capital &amp; Região Metropolitana · Rio de Janeiro (RJ) · Principais Capitais do Brasil.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b7a6d6]">
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
            <span className="text-[#21f6c9] font-mono font-bold">DDD 012</span>
          </div>
        </div>
      </div>
    </footer>
  );
};