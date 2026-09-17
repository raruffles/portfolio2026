import React, { useEffect } from 'react';
import { X, ExternalLink, Youtube } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, youtubeId, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#150b24] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0a0612]">
          <div className="flex items-center gap-3 pr-4">
            <Youtube className="w-5 h-5 text-[#ff2e92]" />
            <h3 className="font-anton text-lg sm:text-xl text-[#f4eeff] truncate">{title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#b7a6d6] hover:text-[#21f6c9] rounded-lg hover:bg-white/5 transition-colors"
              title="Assistir no YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#b7a6d6] hover:text-[#ff2e92] rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Fechar vídeo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0a0612] border-t border-white/10 flex items-center justify-between text-xs text-[#b7a6d6]">
          <span>Canal Oficial GUUH SC · @guuhsc</span>
          <a
            href="https://www.youtube.com/@guuhsc?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff2e92] hover:underline font-bold"
          >
            + Inscrever-se no canal
          </a>
        </div>
      </div>
    </div>
  );
};
