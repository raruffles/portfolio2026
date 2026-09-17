import React from 'react';
import { ARTIST_INFO } from '../data/guuhData';
import { ExternalLink } from 'lucide-react';
import { SpotifyIcon } from './icons/SpotifyIcon';

interface StreamSectionProps {
  onPlayVideo?: (youtubeId: string, title: string) => void;
}

export const StreamSection: React.FC<StreamSectionProps> = () => {
  return (
    <section
      id="musica"
      className="py-24 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0a0612] via-[#150b24] to-[#0a0612]"
    >
      {/* Radial ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#8a2be8]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#1db954]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1db954] uppercase tracking-widest mb-3">
              <SpotifyIcon className="w-4 h-4 fill-current" />
              <span>Streaming Oficial · Spotify</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#f4eeff]">
              Músicas & <span className="text-[#1db954]">Spotify Oficial</span>
            </h2>
            <p className="text-[#b7a6d6] text-base mt-2 max-w-xl">
              Ouça a discografia completa de Guuh SC diretamente no player oficial do Spotify com áudio original em alta definição.
            </p>
          </div>

          {/* Direct Profile CTA */}
          <a
            href={ARTIST_INFO.links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#1db954] hover:bg-[#1db954]/90 text-black font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all hover:scale-105 shadow-[0_0_25px_rgba(29,185,84,0.4)] self-start md:self-end"
          >
            <SpotifyIcon className="w-4 h-4 fill-current text-black" />
            <span>Seguir no Spotify</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Official Spotify Player Card */}
        <div className="bg-[#150b24]/95 border border-[#1db954]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(29,185,84,0.18)] backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Spotify green radial glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1db954]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1db954]/20 border border-[#1db954]/50 flex items-center justify-center text-[#1db954]">
                <SpotifyIcon className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-anton text-2xl text-[#f4eeff]">
                  Guuh SC — Discografia Oficial
                </h3>
                <span className="text-xs text-[#b7a6d6]">
                  Hits lançados pela Love Funk, Cria Hit e produções independentes
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs font-bold text-[#1db954] bg-[#1db954]/10 border border-[#1db954]/30 px-3 py-1 rounded-full">
                Player Integrado
              </span>
            </div>
          </div>

          {/* Embedded Spotify Iframe exactly as specified */}
          <div className="w-full rounded-xl overflow-hidden shadow-2xl relative z-10 border border-white/10">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/5H1zYFcTrOxFcFvOk1JjwO?utm_source=generator&si=51bdc4d176c24b5a"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Guuh SC no Spotify"
            />
          </div>

          {/* Direct Stream Links Bar */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="text-xs text-[#b7a6d6]">
              Também disponível nas principais plataformas digitais mundiais:
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={ARTIST_INFO.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1db954] text-black font-bold text-xs px-4 py-2 rounded-full hover:scale-105 transition-all shadow-[0_0_15px_rgba(29,185,84,0.3)]"
              >
                <SpotifyIcon className="w-3.5 h-3.5 fill-current text-black" />
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href="https://onerpm.link/506321244439/presavecallback?context=pre_save&service=spotify&redirecturl&actionid&order=670eb5c3056b768b26a5ca1e&user=guuh_sc&status=success&origin=presavecallback"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#ff2e92] text-[#0a0612] font-bold text-xs px-4 py-2 rounded-full hover:scale-105 transition-all box-glow-pink"
              >
                <span>OneRPM Pre-Save</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={ARTIST_INFO.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#ff0000] text-white font-bold text-xs px-4 py-2 rounded-full hover:scale-105 transition-all"
              >
                <span>YouTube Music</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={ARTIST_INFO.links.presave}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-[#f4eeff] font-bold text-xs px-4 py-2 rounded-full transition-all"
              >
                <span>Deezer & Apple Music</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
