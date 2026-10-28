/**
 * DRA. MARINA TURZI — INTERAÇÕES & COMPORTAMENTO
 * Inspiração de UX: More Nutrition (Matcha)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const btn = other.querySelector('.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // 3. Video Reels Controls (Click to play/pause with audio toggle)
  const reelCards = document.querySelectorAll('.reel-card');
  reelCards.forEach(card => {
    const video = card.querySelector('.reel-video');
    const playBtn = card.querySelector('.reel-play-icon');

    if (video && playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          // Pause other reels
          document.querySelectorAll('.reel-video').forEach(v => {
            if (v !== video) {
              v.pause();
              const otherCard = v.closest('.reel-card');
              if (otherCard) {
                const otherPlay = otherCard.querySelector('.reel-play-icon');
                if (otherPlay) otherPlay.style.display = 'flex';
              }
            }
          });

          video.play().then(() => {
            playBtn.style.display = 'none';
          }).catch(err => console.log('Autoplay blocked:', err));
        } else {
          video.pause();
          playBtn.style.display = 'flex';
        }
      });

      card.addEventListener('click', () => {
        if (!video.paused) {
          video.pause();
          playBtn.style.display = 'flex';
        } else {
          video.play().then(() => {
            playBtn.style.display = 'none';
          }).catch(err => console.log('Autoplay blocked:', err));
        }
      });

      video.addEventListener('ended', () => {
        playBtn.style.display = 'flex';
      });
    }
  });

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
});
