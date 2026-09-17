import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, Heart, MessageCircle, ExternalLink, Instagram, MapPin, Calendar } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#150b24] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button on Top Mobile */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 md:hidden p-2 rounded-full bg-black/70 text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview (Left side) */}
        <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[50vh] md:max-h-[85vh]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>

        {/* Social Detail Sidebar (Right side) */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-[#150b24] border-t md:border-t-0 md:border-l border-white/10">
          <div>
            {/* Header with profile */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px]">
                  <img
                    src="./images/instagram/guuh-avatar.jpg"
                    alt="Guuh SC"
                    className="w-full h-full object-cover rounded-full bg-[#0a0612]"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#f4eeff] flex items-center gap-1">
                    <span>guuhscmc</span>
                    {item.shortcode && (
                      <span className="text-[10px] font-mono text-[#21f6c9] bg-[#21f6c9]/10 px-1.5 py-0.5 rounded">
                        /{item.shortcode}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#b7a6d6] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#21f6c9]" />
                    <span>{item.location || 'São José dos Campos'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="hidden md:flex p-1.5 text-[#b7a6d6] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Post Title & Caption */}
            <h3 className="font-anton text-xl sm:text-2xl text-[#f4eeff] mb-3 leading-tight">
              {item.title}
            </h3>

            <p className="text-sm text-[#b7a6d6] leading-relaxed mb-4">
              {item.caption}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs text-[#21f6c9] bg-[#21f6c9]/10 px-2 py-0.5 rounded font-mono border border-[#21f6c9]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Date Tag */}
            <div className="flex items-center gap-1.5 text-xs text-[#b7a6d6]/70 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Social Stats & Direct Action Button */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#ff2e92] font-bold font-mono">
                  <Heart className="w-4 h-4 fill-current" />
                  {item.likes} curtidas
                </span>
                <span className="flex items-center gap-1.5 text-[#b7a6d6] font-mono">
                  <MessageCircle className="w-4 h-4" />
                  {item.commentsCount} comentários
                </span>
              </div>
            </div>

            <a
              href={item.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#ff2e92] hover:bg-[#ff2e92]/90 text-[#0a0612] font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(255,46,146,0.4)] transition-all hover:scale-102"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver publicação no Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
