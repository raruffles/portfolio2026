import React, { useState, useEffect } from 'react';
import { GALLERY_DATA, INSTAGRAM_PROFILE, ARTIST_INFO } from '../data/guuhData';
import { GalleryItem, InstagramProfile } from '../types';
import { fetchInstagramFeed } from '../services/instagramService';
import {
  Heart,
  MessageCircle,
  Instagram,
  ExternalLink,
  Sparkles,
  Eye,
  RefreshCw,
  Layers,
  LayoutGrid,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface DynamicGalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const DynamicGallery: React.FC<DynamicGalleryProps> = ({ onOpenLightbox }) => {
  const [profile, setProfile] = useState<InstagramProfile>(INSTAGRAM_PROFILE);
  const [posts, setPosts] = useState<GalleryItem[]>(() => GALLERY_DATA.slice(0, 6));
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'embed'>('cards');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // User interactive like toggles
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    GALLERY_DATA.slice(0, 6).forEach((item) => {
      initial[item.id] = { count: item.likes, liked: false };
    });
    return initial;
  });

  const loadFeed = async () => {
    setIsLoading(true);
    try {
      const feed = await fetchInstagramFeed();
      if (feed.posts && feed.posts.length > 0) {
        // Enforce 6 latest posts
        const top6 = feed.posts.slice(0, 6);
        setPosts(top6);
        setProfile(feed.profile);
        setIsLive(feed.isLive);
        setLikesState((prev) => {
          const updated = { ...prev };
          top6.forEach((item) => {
            if (!updated[item.id]) {
              updated[item.id] = { count: item.likes, liked: false };
            }
          });
          return updated;
        });
      }
    } catch {
      // Keep verified data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleToggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[itemId] || { count: 0, liked: false };
      const liked = !current.liked;
      return {
        ...prev,
        [itemId]: {
          count: liked ? current.count + 1 : current.count - 1,
          liked,
        },
      };
    });
  };

  const handleCopyPostLink = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section id="instagram" className="py-24 bg-[#0a0612] border-b border-white/10 relative overflow-hidden">
      <span id="galeria" className="absolute -top-24 pointer-events-none" />

      {/* Atmospheric neon ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff2e92]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#8a2be8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff2e92] uppercase tracking-widest mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#21f6c9] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#21f6c9]" />
              </span>
              <Instagram className="w-4 h-4 text-[#ff2e92]" />
              <span>VINCULADO AO INSTAGRAM OFICIAL · @{profile.username}</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#f4eeff]">
              Últimas do <span className="text-[#ff2e92] glow-pink">Instagram</span>
            </h2>
            <p className="text-[#b7a6d6] text-base mt-2 max-w-2xl">
              Feed sincronizado em tempo real com as 6 postagens mais recentes do artista diretamente do perfil{' '}
              <a
                href={`https://www.instagram.com/${profile.username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff2e92] font-semibold hover:underline inline-flex items-center gap-1"
              >
                @{profile.username}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
              .
            </p>
          </div>

          {/* Action Buttons: Refresh & Follow */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={loadFeed}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-[#150b24] hover:bg-[#1f1035] text-[#b7a6d6] hover:text-[#f4eeff] border border-white/10 text-xs font-bold px-4 py-3 rounded-full transition-all cursor-pointer"
              title="Sincronizar com Instagram"
              id="btn-sync-instagram"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#21f6c9]' : ''}`} />
              <span className="hidden sm:inline">{isLoading ? 'Sincronizando...' : 'Atualizar'}</span>
            </button>

            <a
              href={`https://www.instagram.com/${profile.username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all hover:scale-105 shadow-[0_0_25px_rgba(220,39,67,0.35)]"
              id="btn-seguir-instagram"
            >
              <Instagram className="w-4 h-4 fill-current" />
              <span>Seguir @{profile.username}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Real Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#150b24]/90 via-[#0d0718] to-[#150b24]/90 border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-4 text-left w-full sm:w-auto">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-[0_0_20px_rgba(220,39,67,0.4)]">
                <img
                  src={profile.profilePicUrl || './images/instagram/guuh-avatar.jpg'}
                  alt={profile.fullName}
                  className="w-full h-full object-cover rounded-full bg-[#0a0612]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#21f6c9] text-[#0a0612] p-1 rounded-full shadow-md" title="Perfil Verificado">
                <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-anton text-xl sm:text-2xl text-[#f4eeff] tracking-wide">
                  {profile.fullName}
                </h3>
                <span className="text-xs font-bold text-[#21f6c9] bg-[#21f6c9]/10 border border-[#21f6c9]/30 px-2 py-0.5 rounded-full">
                  OFICIAL
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#ff2e92]">@{profile.username}</p>
              <p className="text-xs text-[#b7a6d6] max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                {profile.biography}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="text-center sm:text-right">
              <div className="font-anton text-xl sm:text-2xl text-[#f4eeff]">
                {(profile.followersCount / 1000).toFixed(1).replace('.', ',')}K
              </div>
              <div className="text-[11px] text-[#b7a6d6] uppercase tracking-wider">Seguidores</div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-[#0a0612] border border-white/15 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#ff2e92] text-[#0a0612] shadow-[0_0_12px_rgba(255,46,146,0.4)]'
                    : 'text-[#b7a6d6] hover:text-[#f4eeff]'
                }`}
                title="Visualização em Cards"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('embed')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'embed'
                    ? 'bg-[#21f6c9] text-[#0a0612] shadow-[0_0_12px_rgba(33,246,201,0.4)]'
                    : 'text-[#b7a6d6] hover:text-[#f4eeff]'
                }`}
                title="Embed Oficial do Instagram"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Embed Oficial</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Latest Posts Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((item, index) => {
              const likeInfo = likesState[item.id] || { count: item.likes, liked: false };
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(item)}
                  className="group relative bg-[#150b24] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff2e92]/60 transition-all duration-300 cursor-pointer flex flex-col shadow-lg hover:shadow-[0_12px_35px_rgba(255,46,146,0.2)] hover:-translate-y-1"
                >
                  {/* Header with user avatar and Instagram handle */}
                  <div className="p-4 flex items-center justify-between border-b border-white/5 bg-[#150b24]/90">
                    <a
                      href={item.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                    >
                      <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                        <img
                          src={profile.profilePicUrl || './images/instagram/guuh-avatar.jpg'}
                          alt="Guuh SC"
                          className="w-full h-full object-cover rounded-full bg-[#0a0612]"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#f4eeff] flex items-center gap-1">
                          <span>{profile.username}</span>
                          <Sparkles className="w-3 h-3 text-[#21f6c9]" />
                        </div>
                        <div className="text-[10px] text-[#b7a6d6]">{item.location || 'São José dos Campos'}</div>
                      </div>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleCopyPostLink(e, item.platformUrl, item.id)}
                        className="text-[#b7a6d6] hover:text-[#21f6c9] transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
                        title="Copiar link da postagem"
                      >
                        {copiedLink === item.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#21f6c9]" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={item.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#b7a6d6] hover:text-[#ff2e92] transition-colors p-1.5 rounded-full hover:bg-white/5"
                        title="Abrir no Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Image Container with official photo */}
                  <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150b24] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Quick preview hover badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#ff2e92] text-[#0a0612] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      Post 0{index + 1}
                    </div>

                    {/* Shortcode Pill */}
                    {item.shortcode && (
                      <div className="absolute top-3 right-3 text-[10px] font-mono text-[#21f6c9] bg-[#0a0612]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#21f6c9]/30">
                        /{item.shortcode}
                      </div>
                    )}
                  </div>

                  {/* Card Social Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Action icons bar */}
                      <div className="flex items-center justify-between mb-3 text-[#b7a6d6]">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => handleToggleLike(e, item.id)}
                            className={`flex items-center gap-1 transition-all cursor-pointer ${
                              likeInfo.liked ? 'text-[#ff2e92] scale-105' : 'hover:text-[#ff2e92]'
                            }`}
                            aria-label="Curtir post"
                          >
                            <Heart className={`w-5 h-5 ${likeInfo.liked ? 'fill-[#ff2e92]' : ''}`} />
                            <span className="text-xs font-bold font-mono ml-1">{likeInfo.count}</span>
                          </button>

                          <div className="flex items-center gap-1 text-xs">
                            <MessageCircle className="w-5 h-5 text-[#b7a6d6]" />
                            <span className="font-mono ml-1">{item.commentsCount}</span>
                          </div>
                        </div>

                        <a
                          href={item.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-[#21f6c9] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Ver no Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <h3 className="font-anton text-lg text-[#f4eeff] group-hover:text-[#ff2e92] transition-colors mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#b7a6d6] line-clamp-3 leading-relaxed mb-3 whitespace-pre-line">
                        {item.caption}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[11px] text-[#21f6c9]/90 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#b7a6d6]">
                      <span>{item.date}</span>
                      <a
                        href={item.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-[#ff2e92] hover:text-[#f4eeff] transition-colors"
                      >
                        @{profile.username}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Official Instagram Embed Iframe Mode */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((item, index) => (
              <div
                key={`embed-${item.id}`}
                className="bg-[#150b24] border border-white/10 rounded-2xl overflow-hidden shadow-lg p-2"
              >
                <div className="p-3 border-b border-white/5 flex items-center justify-between text-xs text-[#b7a6d6] mb-2">
                  <span className="font-bold text-[#ff2e92]">Post Oficial 0{index + 1}</span>
                  <a
                    href={item.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#21f6c9] hover:underline text-[11px]"
                  >
                    <span>Abrir post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <iframe
                  src={item.embedUrl || `https://www.instagram.com/p/${item.shortcode}/embed/captioned/`}
                  className="w-full h-[540px] rounded-xl bg-[#0a0612] border-0"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  title={`Instagram Post ${item.shortcode || index + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Profile Direct CTA Footer */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ARTIST_INFO.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#150b24] hover:bg-[#150b24]/80 text-[#f4eeff] hover:text-[#ff2e92] border border-white/15 hover:border-[#ff2e92] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all box-glow-pink hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Instagram className="w-4 h-4 text-[#ff2e92]" />
            <span>VER TODOS OS VÍDEOS & POSTS NO INSTAGRAM (@GUUHSCMC)</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#ff2e92]" />
          </a>
        </div>
      </div>
    </section>
  );
};
