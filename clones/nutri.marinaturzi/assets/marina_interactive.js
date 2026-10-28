// Interactive behaviors for Dra. Marina Turzi Landing Page
// Hero Smooth Entrance, Marquee Animation, Testimonials Carousel & Video Controls

(function () {
  'use strict';

  function initMarinaInteractive() {
    if (typeof gsap === 'undefined') return;

    // Register GSAP plugins if available
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof DrawSVGPlugin !== 'undefined') gsap.registerPlugin(DrawSVGPlugin);

    // 1. Hero Smooth Entrance Animation (Faithful to More Nutrition)
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const heroSvgText = document.querySelector('.brand-hero-svg-text');
    const heroBrandTagline = document.querySelector('.hero-brand-tagline');
    const marinaImg = document.querySelector('.stage-marina-img');
    const circlePath = document.querySelector('[data-load-stage-svg] path');
    const facts = document.querySelectorAll('.stage-fact');
    const decoText = document.querySelector('[data-load-stage-deco-text]');
    const decoArrow = document.querySelector('[data-load-stage-deco-arrow]');
    const heroTitle = document.querySelector('.hero-heading');
    const heroText = document.querySelector('.is-stage-paragraph');
    const heroCta = document.querySelector('[data-load-stage-cta]');
    const heroUnderline = document.querySelector('[data-load-stage-underline]');

    // Initial state setups
    if (circlePath) {
      if (typeof DrawSVGPlugin !== 'undefined') {
        gsap.set(circlePath, { drawSVG: '0% 0%', opacity: 1 });
      } else {
        gsap.set(circlePath, { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 1 });
      }
    }

    if (facts && facts.length > 0) {
      gsap.set(facts, { opacity: 0, scale: 0.4, y: 40, rotate: -20 });
    }

    if (decoText) gsap.set(decoText, { opacity: 0, scale: 0.8, x: -20 });
    if (decoArrow) gsap.set(decoArrow, { opacity: 0, scale: 0.8, rotate: -15 });

    // Step A: Giant Brand Title "DRA. MARINA TURZI"
    if (heroSvgText) {
      heroTimeline.fromTo(
        heroSvgText,
        { strokeDashoffset: 800, fillOpacity: 0 },
        { strokeDashoffset: 0, fillOpacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      );
    }
    if (heroBrandTagline) {
      heroTimeline.fromTo(
        heroBrandTagline,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );
    }

    // Step B: Dra. Marina's Photo reveal
    if (marinaImg) {
      heroTimeline.fromTo(
        marinaImg,
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        0.2
      );
    }

    // Step C: The White Circle Path draws around the portrait
    if (circlePath) {
      if (typeof DrawSVGPlugin !== 'undefined') {
        heroTimeline.to(
          circlePath,
          { drawSVG: '0% 100%', duration: 1.2, ease: 'power2.out' },
          0.3
        );
      } else {
        heroTimeline.to(
          circlePath,
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' },
          0.3
        );
      }
    }

    // Step D: The 3 Circular Badges pop up along the white circle line with elastic bounce
    if (facts && facts.length > 0) {
      heroTimeline.to(
        facts,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'back.out(1.8)'
        },
        0.5
      );
    }

    // Step E: Sketch text and arrow point to the top badge
    if (decoText && decoArrow) {
      heroTimeline.to(
        [decoText, decoArrow],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'back.out(1.4)'
        },
        0.7
      );
    }

    // Step F: Stage right text, underline, and CTA button
    if (heroTitle) {
      heroTimeline.fromTo(
        heroTitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );
    }
    if (heroText) {
      heroTimeline.fromTo(
        heroText,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.55
      );
    }
    if (heroUnderline) {
      heroTimeline.fromTo(
        heroUnderline,
        { opacity: 0, scaleX: 0.4 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
        0.7
      );
    }
    if (heroCta) {
      heroTimeline.fromTo(
        heroCta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.65
      );
    }

    // 2. Marquee Animation ("Emagreça sem sofrer" along curved path)
    const marqueeEl = document.querySelector('[data-marquee]');
    const marqueeTextPath = document.querySelector('[data-marquee-svg] textPath');

    if (marqueeEl && marqueeTextPath) {
      let currentOffset = 0;

      // Continuous drifting movement
      gsap.to({}, {
        repeat: -1,
        duration: 30,
        ease: 'none',
        onUpdate: function () {
          currentOffset -= 0.12;
          if (currentOffset <= -100) currentOffset = 0;
          marqueeTextPath.setAttribute('startOffset', currentOffset + '%');
        }
      });

      // Scroll scrubbing amplification
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: marqueeEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
          onUpdate: (self) => {
            const scrubDelta = self.progress * -45;
            marqueeTextPath.setAttribute('startOffset', (currentOffset + scrubDelta) + '%');
          }
        });
      }
    }

    // 3. Testimonial Carousel Controls
    const sliderInner = document.querySelector('.testimonial-slider-inner');
    const btnLeft = document.querySelector('[data-slider-left-button]');
    const btnRight = document.querySelector('[data-slider-right-button]');

    if (sliderInner && btnLeft && btnRight) {
      btnLeft.addEventListener('click', function () {
        const item = sliderInner.querySelector('.testimonial-slider-item-wrap');
        const itemWidth = item ? item.offsetWidth : 360;
        sliderInner.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
      });

      btnRight.addEventListener('click', function () {
        const item = sliderInner.querySelector('.testimonial-slider-item-wrap');
        const itemWidth = item ? item.offsetWidth : 360;
        sliderInner.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
      });
    }

    // 4. Testimonial Video Sound Toggle
    const soundBtns = document.querySelectorAll('[data-video-button]');
    soundBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const wrap = btn.closest('.testimonial-inner');
        if (!wrap) return;
        const video = wrap.querySelector('video');
        if (video) {
          video.muted = !video.muted;
          btn.classList.toggle('is-unmuted', !video.muted);
          if (video.paused) {
            video.play().catch(e => console.log(e));
          }
        }
      });
    });

    // 5. Instagram Posts / Flavour Slider Controls
    const flavourLeftBtn = document.querySelector('[data-flavour-slider-left-button]');
    const flavourRightBtn = document.querySelector('[data-flavour-slider-right-button]');
    const flavourDoseSlides = document.querySelectorAll('.flavour-swiper .flavour-slide');
    const flavourContentSlides = document.querySelectorAll('.flavour-content-swiper .flavour-content-slide');
    let flavourActiveIndex = 0;

    function updateFlavourCarousel(index) {
      if (flavourDoseSlides.length === 0) return;
      flavourActiveIndex = (index + flavourDoseSlides.length) % flavourDoseSlides.length;

      flavourDoseSlides.forEach((slide, i) => {
        if (i === flavourActiveIndex) {
          slide.style.display = 'block';
          slide.style.opacity = '1';
          slide.style.transition = 'opacity 0.4s ease';
        } else {
          slide.style.display = 'none';
          slide.style.opacity = '0';
        }
      });

      flavourContentSlides.forEach((slide, i) => {
        if (i === flavourActiveIndex) {
          slide.style.display = 'block';
          slide.style.opacity = '1';
          slide.style.transition = 'opacity 0.4s ease';
        } else {
          slide.style.display = 'none';
          slide.style.opacity = '0';
        }
      });
    }

    if (flavourLeftBtn && flavourRightBtn && flavourDoseSlides.length > 0) {
      updateFlavourCarousel(0);
      flavourLeftBtn.addEventListener('click', () => updateFlavourCarousel(flavourActiveIndex - 1));
      flavourRightBtn.addEventListener('click', () => updateFlavourCarousel(flavourActiveIndex + 1));
    }

    // 6. Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
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
