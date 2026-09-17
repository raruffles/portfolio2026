import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { AboutSection } from './components/AboutSection';
import { VideosSection } from './components/VideosSection';
import { StreamSection } from './components/StreamSection';
import { DynamicGallery } from './components/DynamicGallery';
import { ShowsSection } from './components/ShowsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { LightboxModal } from './components/LightboxModal';
import { GalleryItem } from './types';

export default function App() {
  // Video Modal State
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    youtubeId: string;
    title: string;
  }>({
    isOpen: false,
    youtubeId: '',
    title: '',
  });

  // Lightbox Modal State
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  const handleOpenVideo = (youtubeId: string, title: string) => {
    setVideoModal({
      isOpen: true,
      youtubeId,
      title,
    });
  };

  const handleCloseVideo = () => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedGalleryItem(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-[#f4eeff] flex flex-col selection:bg-[#ff2e92] selection:text-[#0a0612] animate-in fade-in duration-500">
      {/* Top Sticky Header */}
      <Navbar onOpenVideoModal={handleOpenVideo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onPlayHit={handleOpenVideo} />

        {/* Ticker Marquee */}
        <MarqueeBanner />

        {/* Sobre Section */}
        <AboutSection />

        {/* Clipes & Vídeos Oficiais Section */}
        <VideosSection onPlayVideo={handleOpenVideo} />

        {/* Músicas & Beat Player Section */}
        <StreamSection onPlayVideo={handleOpenVideo} />

        {/* Galeria Dinâmica Integrada com Redes Sociais */}
        <DynamicGallery onOpenLightbox={handleOpenLightbox} />

        {/* Shows & Apresentações Section */}
        <ShowsSection />

        {/* Contato & Assessoria Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Player Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        youtubeId={videoModal.youtubeId}
        title={videoModal.title}
        onClose={handleCloseVideo}
      />

      {/* Social Gallery Lightbox Modal */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={handleCloseLightbox}
      />
    </div>
  );
}