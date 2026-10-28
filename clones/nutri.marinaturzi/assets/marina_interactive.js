// Interactive behaviors for Dra. Marina Turzi Landing Page
// Hero Smooth Entrance, Testimonials Carousel & Video Controls

(function () {
  'use strict';

  function initMarinaInteractive() {
    // 1. Hero Smooth Entrance Animation (Zero Flash, Instant GSAP)
    if (typeof gsap !== 'undefined') {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const heroSvgText = document.querySelector('.brand-hero-svg-text');
      const marinaImg = document.querySelector('.stage-marina-img');
      const facts = document.querySelectorAll('.stage-fact-outer');
      const heroTitle = document.querySelector('.stage-title');
      const heroText = document.querySelector('.stage-text');
      const heroCta = document.querySelector('.stage-cta-wrap');

      if (heroSvgText) {
        heroTimeline.fromTo(
          heroSvgText,
          { strokeDashoffset: 800, fillOpacity: 0 },
          { strokeDashoffset: 0, fillOpacity: 1, duration: 1.4, ease: 'power2.out' },
          0
        );
      }

      if (marinaImg) {
        heroTimeline.fromTo(
          marinaImg,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.2)' },
          0.2
        );
      }

      if (facts && facts.length > 0) {
        heroTimeline.fromTo(
          facts,
          { opacity: 0, scale: 0.6, y: 20 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(1.5)' },
          0.4
        );
      }

      if (heroTitle) {
        heroTimeline.fromTo(
          heroTitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        );
      }

      if (heroText) {
        heroTimeline.fromTo(
          heroText,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        );
      }

      if (heroCta) {
        heroTimeline.fromTo(
          heroCta,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.6
        );
      }
    }

    // 2. Testimonial Carousel Controls
    const sliderInner = document.querySelector('.testimonial-slider-inner');
    const btnLeft = document.querySelector('[data-slider-left-button]');
    const btnRight = document.querySelector('[data-slider-right-button]');

    if (sliderInner && btnLeft && btnRight) {
      btnLeft.addEventListener('click', function () {
        const itemWidth = sliderInner.querySelector('.testimonial-slider-item-wrap')
          ? sliderInner.querySelector('.testimonial-slider-item-wrap').offsetWidth
          : 360;
        sliderInner.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
      });

      btnRight.addEventListener('click', function () {
        const itemWidth = sliderInner.querySelector('.testimonial-slider-item-wrap')
          ? sliderInner.querySelector('.testimonial-slider-item-wrap').offsetWidth
          : 360;
        sliderInner.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
      });
    }

    // 3. Testimonial Video Sound Toggle
    const soundBtns = document.querySelectorAll('[data-video-button]');
    soundBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const wrap = btn.closest('.testimonial-inner');
        if (!wrap) return;
        const video = wrap.querySelector('video');
        if (video) {
          video.muted = !video.muted;
          btn.classList.toggle('is-unmuted', !video.muted);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarinaInteractive);
  } else {
    initMarinaInteractive();
  }
})();
