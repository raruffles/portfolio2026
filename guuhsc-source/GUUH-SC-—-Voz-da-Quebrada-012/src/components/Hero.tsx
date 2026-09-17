import React from 'react';
import { Play, Flame, ExternalLink, Headphones } from 'lucide-react';
import { ARTIST_INFO } from '../data/guuhData';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface HeroProps {
  onPlayHit: (youtubeId: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayHit }) => {
  return (
    <section className="relative min-h-[95vh] sm:min-h-screen flex items-end overflow-hidden border-b border-white/10 pt-20 pb-16 sm:pb-24">
      {/* Full Size Background Image with Seamless Dark & Neon Overlays (No Image Break, No Yellow Area) */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/hero-bg.jpg"
          alt="MC Guuh SC ao vivo no palco"
          className="w-full h-full object-cover object-center brightness-90 contrast-110"
        />
        {/* Top Dark Fade: Completely eliminates yellow/bright sky and smoothly blends with navbar */}
        <div className="absolute inset-x-0 top-0 h-64 sm:h-80 bg-gradient-to-b from-[#0a0612] via-[#0a0612]/85 to-transparent" />

        {/* Bottom Dark Fade: Completely eliminates hard cutoff lines, seamlessly fading to the dark background */}
        <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/85 to-transparent" />

        {/* Left Dark Gradient for Typography Legibility */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/4 bg-gradient-to-r from-[#0a0612] via-[#0a0612]/75 to-transparent" />

        {/* Ambient Neon Atmosphere (Cyan & Pink Only, No Yellow) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2e92]/20 via-transparent to-[#21f6c9]/15 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#21f6c9] border border-[#21f6c9]/40 bg-[#21f6c9]/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(33,246,201,0.2)]">
          <Flame className="w-3.5 h-3.5 text-[#ff2e92] animate-pulse" />
          <span>SÃO JOSÉ DOS CAMPOS · DDD 012 · LOVE FUNK & CRIA HIT</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 flex items-center">
          <span className="sr-only">GUUH SC</span>
          <div className="hero-logo-neon-container">
            <img
              src="./images/logo/logo-w-f.png"
              alt="GUUH SC"
              className="hero-logo-neon h-20 sm:h-32 md:h-44 lg:h-48 w-auto max-w-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = './images/logo/logo-w-f.png';
              }}
            />
          </div>
        </h1>

        {/* Subtitle */}
        <p className="max-w-[560px] text-base sm:text-lg text-[#b7a6d6] leading-relaxed mb-8">
          Funk / Trap de rua direto da quebrada. Sem esquentar banco — jogador diferente, som diferente.
          Produções independentes e faixas com a <span className="text-[#ff2e92] font-semibold">Love Funk</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <a
            href="#musica"
            className="inline-flex items-center gap-2.5 bg-[#1db954] hover:bg-[#1db954]/90 text-black font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_0_25px_rgba(29,185,84,0.4)] hover:scale-105 transition-all"
            id="hero-btn-ouca-spotify"
          >
            <SpotifyIcon className="w-5 h-5 fill-current text-black" />
            <span>OUVIR NO SPOTIFY</span>
          </a>

          <button
            type="button"
            onClick={() => onPlayHit('a3SwCEShmFo', 'Guuh SC - Cabelo Branco (Clipe Oficial)')}
            className="inline-flex items-center gap-2.5 bg-[#150b24] hover:bg-[#150b24]/80 text-[#21f6c9] border border-[#21f6c9]/50 hover:border-[#21f6c9] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full box-glow-cyan hover:scale-105 transition-all cursor-pointer"
            id="hero-btn-play-cabelo-branco"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>TOCAR "CABELO BRANCO"</span>
          </button>

          <a
            href={ARTIST_INFO.links.presave}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full box-glow-pink hover:scale-105 transition-all"
            id="hero-btn-ouca-agora"
          >
            <Headphones className="w-4 h-4" />
            <span>STREAMING GERAL</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href="#videos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#f4eeff] hover:text-[#21f6c9] border border-white/20 hover:border-[#21f6c9]/60 px-5 py-3.5 rounded-full transition-all"
          >
            <span>Ver Clipes</span>
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-[700px] pt-6 border-t border-white/10">
          <div className="bg-[#150b24]/70 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a6d6] block">Hit do Canal</span>
            <span className="font-anton text-lg sm:text-xl text-[#21f6c9]">Cabelo Branco</span>
            <span className="text-[11px] text-white/50 block">+10K views</span>
          </div>
          <div className="bg-[#150b24]/70 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a6d6] block">Parceria</span>
            <span className="font-anton text-lg sm:text-xl text-[#ff2e92]">Love Funk</span>
            <span className="text-[11px] text-white/50 block">Tattoo na Pele</span>
          </div>
          <div className="bg-[#150b24]/70 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a6d6] block">Origem</span>
            <span className="font-anton text-lg sm:text-xl text-[#f4eeff]">DDD 012</span>
            <span className="text-[11px] text-white/50 block">São José dos Campos</span>
          </div>
          <div className="bg-[#150b24]/70 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a6d6] block">Catálogo</span>
            <span className="font-anton text-lg sm:text-xl text-[#21f6c9]">+200</span>
            <span className="text-[11px] text-white/50 block">Vídeos no YouTube</span>
          </div>
        </div>
      </div>
    </section>
  );
};
