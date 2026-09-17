import React from 'react';
import { VIDEOS_DATA, ARTIST_INFO } from '../data/guuhData';
import { VideoItem } from '../types';
import { Play, Youtube, ExternalLink, Flame, Clock } from 'lucide-react';

interface VideosSectionProps {
  onPlayVideo: (youtubeId: string, title: string) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ onPlayVideo }) => {
  return (
    <section id="videos" className="py-24 bg-[#0a0612] border-b border-white/10 relative">
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2e92] uppercase tracking-widest mb-3">
              <Youtube className="w-4 h-4" />
              <span>Canal Oficial do YouTube · @guuhsc</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#f4eeff]">
              Vídeos & <span className="text-[#21f6c9] glow-cyan">Lançamentos Oficiais</span>
            </h2>
            <p className="text-[#b7a6d6] text-base mt-2 max-w-xl">
              Últimos lançamentos, produções audiovisuais de rua e bastidores direto do canal oficial de Guuh SC no YouTube.
            </p>
          </div>

          <a
            href={ARTIST_INFO.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#ff0000] hover:bg-[#ff0000]/90 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,0,0,0.35)] self-start md:self-end"
          >
            <Youtube className="w-4 h-4" />
            <span>Inscrever-se no Canal</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Unified Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS_DATA.map((video) => (
            <div
              key={video.id}
              className="group relative bg-[#150b24] border border-white/10 rounded-xl overflow-hidden hover:border-[#21f6c9]/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_10px_30px_rgba(33,246,201,0.15)]"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => onPlayVideo(video.youtubeId, video.title)}
                className="relative aspect-video w-full overflow-hidden cursor-pointer bg-black/50"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150b24] via-transparent to-black/20" />

                {/* Big Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#ff2e92] text-[#0a0612] flex items-center justify-center shadow-[0_0_25px_rgba(255,46,146,0.7)] group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Badges on Thumbnail */}
                {video.viewsBadge && (
                  <div className="absolute top-3 left-3 bg-[#0a0612]/85 backdrop-blur-sm border border-white/10 text-[#21f6c9] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-[#ff2e92]" />
                    <span>{video.viewsBadge}</span>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#b7a6d6] mb-2">
                    <span className="font-semibold uppercase tracking-wider text-[#21f6c9]">
                      {video.publishedText ? video.publishedText : video.year}
                    </span>
                    {video.producer && (
                      <span className="truncate max-w-[170px] text-right" title={video.producer}>
                        {video.producer}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => onPlayVideo(video.youtubeId, video.title)}
                    className="font-anton text-xl sm:text-2xl text-[#f4eeff] group-hover:text-[#21f6c9] transition-colors cursor-pointer leading-tight mb-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#b7a6d6] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onPlayVideo(video.youtubeId, video.title)}
                    className="text-xs font-bold text-[#ff2e92] hover:text-[#f4eeff] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>ASSISTIR VÍDEO</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#b7a6d6] hover:text-[#21f6c9] flex items-center gap-1 transition-colors"
                  >
                    <span>Abrir no YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Full Channel */}
        <div className="mt-14 text-center">
          <a
            href={ARTIST_INFO.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#150b24] hover:bg-[#150b24]/80 text-[#f4eeff] hover:text-[#21f6c9] border border-white/15 hover:border-[#21f6c9] font-bold text-sm sm:text-base px-8 py-4 rounded-full transition-all box-glow-cyan hover:scale-105"
            id="btn-ver-canal-completo"
          >
            <Youtube className="w-5 h-5 text-[#ff2e92]" />
            <span>VER CANAL COMPLETO NO YOUTUBE (@GUUHSC)</span>
            <ExternalLink className="w-4 h-4 text-[#21f6c9]" />
          </a>
        </div>
      </div>
    </section>
  );
};
