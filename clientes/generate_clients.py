import os

base_template = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>__TITLE__</title>
  <meta name="description" content="__META_DESC__" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg-dark: __BG_DARK__;
      --bg-card: __BG_CARD__;
      --bg-card-gradient: __BG_CARD_GRADIENT__;
      --card-border: __CARD_BORDER__;
      --glow-color: __GLOW_COLOR__;
      --accent-pill-1-bg: __PILL_1_BG__;
      --accent-pill-1-text: __PILL_1_TEXT__;
      --accent-pill-2-bg: __PILL_2_BG__;
      --accent-pill-2-text: __PILL_2_TEXT__;
      --accent-pill-3-bg: __PILL_3_BG__;
      --accent-pill-3-text: __PILL_3_TEXT__;
      --accent-pill-4-bg: __PILL_4_BG__;
      --accent-pill-4-text: __PILL_4_TEXT__;
      --gold-sparkle: #fbbf24;
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Outfit', sans-serif;
      --font-handwriting: 'Caveat', cursive;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg-dark);
      color: #ffffff;
      font-family: var(--font-main);
      min-height: 100vh;
      min-height: 100dvh;
      overflow-x: hidden;
      position: relative;
    }

    /* Ambient Dark Background with Studio Glows */
    .ambient-bg {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: 
        radial-gradient(circle at 50% 35%, var(--glow-color) 0%, rgba(0,0,0,0.6) 55%, transparent 75%),
        radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 15% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 40%),
        var(--bg-dark);
    }

    /* Ghost Typography in Background */
    .ghost-typography {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }

    .ghost-tagline {
      position: absolute;
      top: 36px;
      left: 48px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.38em;
      color: rgba(255, 255, 255, 0.22);
      text-transform: uppercase;
      font-family: var(--font-display);
    }

    .ghost-huge-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: clamp(70px, 18vw, 280px);
      font-weight: 900;
      letter-spacing: 0.05em;
      color: rgba(255, 255, 255, 0.025);
      white-space: nowrap;
      text-transform: uppercase;
      font-family: var(--font-display);
      user-select: none;
    }

    /* Handwritten Annotation with Arrow */
    .polaroid-annotation {
      position: absolute;
      bottom: 270px;
      left: calc(50% - 370px);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      color: rgba(255, 255, 255, 0.7);
      font-family: var(--font-handwriting);
      font-size: 26px;
      z-index: 15;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .polaroid-annotation svg {
      width: 44px;
      height: 44px;
      stroke: rgba(255, 255, 255, 0.6);
      fill: none;
      transform: rotate(-15deg) translateY(4px);
    }

    /* Viewport / Showcase Layout */
    .showcase-viewport {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
    }

    /* Top Control Bar (Toggle Mode) */
    .top-controls {
      position: fixed;
      top: 20px;
      right: 24px;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(22, 20, 26, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 5px;
      border-radius: 999px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }

    .mode-btn {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-family: var(--font-display);
      font-size: 12px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mode-btn.active {
      background: var(--bg-card);
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(255, 42, 85, 0.35);
    }

    .mode-btn:hover:not(.active) {
      color: #ffffff;
    }

    /* Smartphone Canvas Container */
    .phone-stage-wrapper {
      position: relative;
      perspective: 1200px;
      transform-style: preserve-3d;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    /* Smartphone Frame */
    .phone-mockup {
      width: 395px;
      background: var(--bg-card);
      background: var(--bg-card-gradient);
      border-radius: 46px;
      position: relative;
      box-shadow: 
        0 0 0 1px var(--card-border),
        0 25px 60px -10px rgba(0, 0, 0, 0.85),
        0 15px 40px -5px var(--glow-color),
        inset 0 1px 1px rgba(255, 255, 255, 0.3);
      overflow: hidden;
      transform-origin: center center;
      transition: transform 0.15s ease-out, box-shadow 0.3s ease;
      z-index: 10;
    }

    /* Speaker / Dynamic Island */
    .phone-notch {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 105px;
      height: 24px;
      background: #000000;
      border-radius: 20px;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 8px;
    }

    .phone-camera-lens {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #111827;
      border: 1px solid #1f2937;
      position: relative;
    }
    .phone-camera-lens::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      background: #3b82f6;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      opacity: 0.6;
    }

    /* Inner Scrollable / Content Area */
    .phone-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 24px 22px 28px 22px;
      overflow-y: auto;
      max-height: 860px;
      scrollbar-width: none;
    }
    .phone-content::-webkit-scrollbar {
      display: none;
    }

    /* Top Bar inside Phone */
    .card-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 18px;
      margin-bottom: 6px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
      font-family: var(--font-display);
    }

    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .top-bar-left svg {
      width: 12px;
      height: 12px;
      fill: var(--gold-sparkle);
    }

    /* Hero Photo Card Section */
    .hero-photo-wrap {
      position: relative;
      width: 100%;
      height: 310px;
      border-radius: 30px;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.4);
    }

    .hero-photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center __HERO_POS_Y__;
      display: block;
      transform: scale(1.02);
      transition: transform 0.6s ease;
    }
    .hero-photo-wrap:hover .hero-photo-img {
      transform: scale(1.06);
    }

    .hero-photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.15) 35%,
        __OVERLAY_GRADIENT__ 80%,
        __OVERLAY_SOLID__ 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 22px 20px;
    }

    /* Circular Floating Badge on Photo */
    .hero-floating-badge {
      position: absolute;
      top: 18px;
      right: 18px;
      background: rgba(255, 255, 255, 0.94);
      color: __BADGE_TEXT__;
      backdrop-filter: blur(10px);
      width: 74px;
      height: 74px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 11px;
      line-height: 1.15;
      box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.35);
      border: 2px solid rgba(255, 255, 255, 0.8);
      transform: rotate(8deg);
      transition: transform 0.3s ease;
    }
    .hero-floating-badge:hover {
      transform: rotate(0deg) scale(1.06);
    }
    .hero-floating-badge span {
      font-size: 13px;
      color: __BADGE_ACCENT__;
    }

    .hero-intro-label {
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 0.02em;
      margin-bottom: 2px;
    }

    .hero-name {
      font-family: var(--font-display);
      font-size: 38px;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 6px;
      text-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }

    .hero-bio {
      font-size: 12px;
      line-height: 1.45;
      color: rgba(255, 255, 255, 0.92);
      font-weight: 500;
      max-width: 95%;
    }

    /* Links Section Header */
    .links-heading {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.88);
      letter-spacing: 0.02em;
      margin-bottom: 14px;
      padding-left: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Action Links List */
    .links-stack {
      display: flex;
      flex-direction: column;
      gap: 11px;
      margin-bottom: 18px;
    }

    /* Reusable Pill Button */
    .link-pill-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 58px;
      padding: 12px 18px;
      border-radius: 24px;
      text-decoration: none;
      position: relative;
      cursor: pointer;
      border: none;
      width: 100%;
      text-align: left;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, filter 0.2s ease;
      box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.25);
    }

    .link-pill-btn:hover {
      transform: translateY(-2px) scale(1.015);
      box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.35);
      filter: brightness(1.03);
    }

    .link-pill-btn:active {
      transform: scale(0.975);
    }

    .pill-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .pill-icon-box {
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .pill-icon-box svg {
      width: 20px;
      height: 20px;
    }

    .pill-texts {
      display: flex;
      flex-direction: column;
    }

    .pill-title {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .pill-subtitle {
      font-size: 11px;
      line-height: 1.25;
      font-weight: 500;
      opacity: 0.85;
      margin-top: 1px;
    }

    .pill-arrow {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    .link-pill-btn:hover .pill-arrow {
      transform: translate(2px, -2px);
    }

    .pill-arrow svg {
      width: 17px;
      height: 17px;
      stroke-width: 2.2;
    }

    /* Button Colors */
    .pill-custom-1 {
      background-color: var(--accent-pill-1-bg);
      color: var(--accent-pill-1-text);
    }
    .pill-custom-1 .pill-icon-box {
      background: rgba(0, 0, 0, 0.08);
      color: var(--accent-pill-1-text);
    }

    .pill-custom-2 {
      background-color: var(--accent-pill-2-bg);
      color: var(--accent-pill-2-text);
    }
    .pill-custom-2 .pill-icon-box {
      background: rgba(0, 0, 0, 0.08);
      color: var(--accent-pill-2-text);
    }

    .pill-custom-3 {
      background-color: var(--accent-pill-3-bg);
      color: var(--accent-pill-3-text);
    }
    .pill-custom-3 .pill-icon-box {
      background: rgba(0, 0, 0, 0.08);
      color: var(--accent-pill-3-text);
    }

    .pill-custom-4 {
      background-color: var(--accent-pill-4-bg);
      color: var(--accent-pill-4-text);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .pill-custom-4 .pill-icon-box {
      background: rgba(255, 255, 255, 0.15);
      color: var(--accent-pill-4-text);
    }

    /* Bottom Video / Reels Card */
    .reels-card {
      position: relative;
      width: 100%;
      height: 130px;
      border-radius: 26px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 10px 24px -5px rgba(0, 0, 0, 0.35);
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .reels-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -4px rgba(0, 0, 0, 0.45);
    }

    .reels-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: brightness(0.7) saturate(1.15);
      transition: transform 0.5s ease, filter 0.5s ease;
    }
    .reels-card:hover .reels-bg-img {
      transform: scale(1.05);
      filter: brightness(0.78) saturate(1.2);
    }

    .reels-overlay {
      position: absolute;
      inset: 0;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.65) 100%);
    }

    .reels-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .reels-badge {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
      font-family: var(--font-display);
    }

    .reels-arrow {
      color: #ffffff;
      width: 18px;
      height: 18px;
    }

    .reels-play-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1.5px solid rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .reels-card:hover .reels-play-center {
      transform: translate(-50%, -50%) scale(1.12);
      background: rgba(255, 255, 255, 0.45);
    }

    .reels-play-center svg {
      width: 16px;
      height: 16px;
      fill: #ffffff;
      margin-left: 2px;
    }

    .reels-bottom-text {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    /* Google Reviews Card */
    .reviews-card {
      background: rgba(0, 0, 0, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 14px;
      margin-bottom: 18px;
    }

    .reviews-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .reviews-score {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 800;
    }
    .reviews-stars {
      color: #fbbf24;
      font-size: 12px;
      letter-spacing: 2px;
    }

    .reviews-google-badge {
      font-size: 10px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .review-quote {
      font-size: 11.5px;
      line-height: 1.4;
      color: rgba(255, 255, 255, 0.9);
      font-style: italic;
    }
    .review-author {
      font-size: 10px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.65);
      margin-top: 4px;
      display: block;
      text-align: right;
    }

    /* Phone Footer Area */
    .card-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 10px;
      padding-top: 6px;
    }

    .footer-pill-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .footer-mini-badge {
      font-size: 10px;
      font-weight: 600;
      background: rgba(0, 0, 0, 0.18);
      color: rgba(255, 255, 255, 0.85);
      padding: 4px 10px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .footer-signature {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      letter-spacing: 0.04em;
    }

    /* ========================================================
       FLOATING 3D ELEMENTS (Surrounding the Phone on Desktop)
       ======================================================== */
    .floating-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 25;
    }

    .float-item {
      position: absolute;
      pointer-events: auto;
      user-select: none;
      filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.65));
      will-change: transform;
      transition: filter 0.3s ease;
      cursor: pointer;
    }
    .float-item:hover {
      filter: drop-shadow(0 25px 40px var(--glow-color)) brightness(1.08);
    }

    .float-item img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    /* Specific Item Layouts & Continuous Float Animations */
    .item-esmalte {
      top: -30px;
      left: calc(50% - 340px);
      width: 175px;
      height: 235px;
      animation: floatMotion1 6.5s ease-in-out infinite;
      z-index: 30;
    }

    .item-unha {
      top: 260px;
      left: calc(50% - 370px);
      width: 135px;
      height: 180px;
      animation: floatMotion3 7.8s ease-in-out infinite;
      z-index: 24;
    }

    .item-alicate {
      top: 480px;
      left: calc(50% - 355px);
      width: 170px;
      height: 190px;
      animation: floatMotion2 8.4s ease-in-out infinite;
      z-index: 23;
    }

    .item-instagram {
      top: 150px;
      right: calc(50% - 315px);
      width: 110px;
      height: 110px;
      animation: floatMotion2 6.2s ease-in-out infinite;
      z-index: 26;
    }

    .item-pincel {
      top: 310px;
      right: calc(50% - 375px);
      width: 195px;
      height: 200px;
      animation: floatMotion1 7.2s ease-in-out infinite;
      z-index: 25;
    }

    .item-tiktok {
      bottom: 130px;
      right: calc(50% - 305px);
      width: 105px;
      height: 105px;
      animation: floatMotion3 6.9s ease-in-out infinite;
      z-index: 26;
    }

    .item-whatsapp {
      bottom: 270px;
      right: calc(50% - 365px);
      width: 95px;
      height: 95px;
      animation: floatMotion2 7.5s ease-in-out infinite;
      z-index: 24;
    }

    .item-polaroid {
      bottom: 50px;
      left: calc(50% - 360px);
      width: 180px;
      background: #fdfaf6;
      padding: 10px 10px 24px 10px;
      border-radius: 4px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.7),
        0 4px 10px rgba(0, 0, 0, 0.2);
      transform: rotate(-13deg);
      animation: floatPolaroid 8s ease-in-out infinite;
      z-index: 35;
      cursor: pointer;
    }

    .polaroid-tape {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 55px;
      height: 20px;
      background: rgba(255, 230, 200, 0.65);
      border: 1px dashed rgba(200, 180, 150, 0.5);
      backdrop-filter: blur(2px);
      border-radius: 2px;
    }

    .polaroid-photo-frame {
      width: 100%;
      height: 155px;
      position: relative;
      border-radius: 2px;
      overflow: hidden;
      background: #111;
    }

    .polaroid-photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .polaroid-play-icon {
      position: absolute;
      bottom: 8px;
      left: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.7);
    }
    .polaroid-play-icon svg {
      width: 11px;
      height: 11px;
      fill: #ffffff;
      margin-left: 2px;
    }

    .polaroid-arrow-icon {
      position: absolute;
      bottom: 8px;
      right: 8px;
      color: #ffffff;
    }

    .polaroid-caption {
      margin-top: 10px;
      font-family: var(--font-handwriting);
      font-size: 20px;
      font-weight: 700;
      color: #2b2528;
      text-align: center;
      line-height: 1;
    }

    /* Asterisks / 8-pointed Sparkle Stars */
    .item-starburst {
      position: absolute;
      width: 48px;
      height: 48px;
      animation: pulseStar 4s ease-in-out infinite;
      pointer-events: none;
    }
    .starburst-1 {
      top: 360px;
      right: calc(50% - 240px);
      color: var(--gold-sparkle);
    }
    .starburst-2 {
      top: 180px;
      left: calc(50% - 225px);
      width: 24px;
      height: 24px;
      color: #fda4af;
      animation-duration: 3s;
    }

    /* Keyframe Animations */
    @keyframes floatMotion1 {
      0%, 100% { transform: translateY(0px) rotate(-14deg); }
      50% { transform: translateY(-16px) rotate(-11deg); }
    }
    @keyframes floatMotion2 {
      0%, 100% { transform: translateY(0px) rotate(12deg); }
      50% { transform: translateY(-14px) rotate(16deg); }
    }
    @keyframes floatMotion3 {
      0%, 100% { transform: translateY(0px) rotate(-8deg); }
      50% { transform: translateY(-18px) rotate(-4deg); }
    }
    @keyframes floatPolaroid {
      0%, 100% { transform: translateY(0px) rotate(-13deg); }
      50% { transform: translateY(-12px) rotate(-11deg); }
    }
    @keyframes pulseStar {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
      50% { transform: scale(1.18) rotate(45deg); opacity: 1; }
    }

    /* Modals */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 500;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-backdrop.open {
      display: flex;
      opacity: 1;
    }

    .modal-box {
      width: 100%;
      max-width: 480px;
      background: #121015;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 32px;
      padding: 24px;
      color: #ffffff;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
      position: relative;
      transform: translateY(20px) scale(0.96);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-backdrop.open .modal-box {
      transform: translateY(0) scale(1);
    }

    .modal-close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .modal-close-btn:hover { background: rgba(255, 255, 255, 0.2); }

    .modal-title {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .modal-subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.65);
      margin-bottom: 20px;
    }

    .catalog-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 18px;
      margin-bottom: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: background 0.2s ease;
    }
    .catalog-item:hover { background: rgba(255, 255, 255, 0.08); }

    .catalog-left h4 {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
    }
    .catalog-left p {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 2px;
    }

    .catalog-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
    }
    .catalog-price {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 800;
      color: var(--bg-card);
    }

    .catalog-book-btn {
      background: var(--bg-card);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 5px 10px;
      border-radius: 999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: transform 0.15s ease;
    }
    .catalog-book-btn:hover { transform: scale(1.05); }

    /* Toast Notification */
    .toast-msg {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: #ffffff;
      color: #0c0a0e;
      font-family: var(--font-display);
      font-size: 13px;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 999px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }
    .toast-msg.show { transform: translateX(-50%) translateY(0); }

    /* ========================================================
       MOBILE-FIRST RESPONSIVENESS
       ======================================================== */
    @media (max-width: 899px) {
      .showcase-viewport {
        padding: 0;
        align-items: flex-start;
      }

      .ghost-tagline, .ghost-huge-text, .polaroid-annotation {
        display: none !important;
      }

      .top-controls {
        display: none !important;
      }

      .phone-mockup {
        width: 100%;
        max-width: 480px;
        min-height: 100vh;
        min-height: 100dvh;
        border-radius: 0;
        box-shadow: none;
        border: none;
        overflow: visible !important;
      }

      .phone-notch {
        display: none;
      }

      .phone-content {
        padding: 24px 18px 50px 18px;
        max-height: none;
        overflow: visible !important;
        position: relative;
        z-index: 10;
      }

      .card-top-bar {
        margin-top: 4px;
        margin-bottom: 12px;
        padding-right: 0;
      }

      .floating-layer {
        z-index: 2;
        pointer-events: none !important;
      }

      .item-esmalte {
        top: 8px;
        left: -18px;
        width: 85px;
        height: 118px;
        opacity: 0.95;
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
        z-index: 1;
      }

      .item-unha {
        top: 160px;
        right: -20px;
        left: auto;
        width: 78px;
        height: 105px;
        opacity: 0.92;
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));
        z-index: 1;
      }

      .item-alicate {
        top: 420px;
        left: -32px;
        width: 75px;
        height: 85px;
        opacity: 0.75;
        z-index: 1;
      }

      .item-pincel {
        top: 500px;
        right: -30px;
        width: 95px;
        height: 100px;
        opacity: 0.75;
        z-index: 1;
      }

      .item-instagram, .item-tiktok, .item-whatsapp, .item-polaroid {
        display: none;
      }
    }

    body.force-mobile-view .phone-mockup {
      width: 100% !important;
      max-width: 440px !important;
      border-radius: 0 !important;
      box-shadow: 0 0 50px rgba(0,0,0,0.8) !important;
      overflow: visible !important;
    }
    body.force-mobile-view .phone-notch { display: none !important; }
    body.force-mobile-view .float-item:not(.item-esmalte):not(.item-unha) { display: none !important; }
    body.force-mobile-view .item-esmalte { left: calc(50% - 240px) !important; width: 120px !important; }
    body.force-mobile-view .item-unha { left: calc(50% + 140px) !important; width: 100px !important; }
    body.force-mobile-view .ghost-huge-text,
    body.force-mobile-view .polaroid-annotation { display: none !important; }
  </style>
</head>
<body>

  <!-- Ambient Glow Background -->
  <div class="ambient-bg"></div>

  <!-- Ghost Typographic Layers in Background -->
  <div class="ghost-typography">
    <div class="ghost-tagline">✦ __GHOST_TAGLINE__</div>
    <div class="ghost-huge-text">__GHOST_WATERMARK__</div>
    
    <div class="polaroid-annotation">
      <span>__POLAROID_NOTE__</span>
      <svg viewBox="0 0 50 50">
        <path d="M10,10 C25,12 40,25 38,42" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3,3"></path>
        <polyline points="30,36 38,42 42,32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></polyline>
      </svg>
    </div>
  </div>

  <!-- Top Controls: Mode Switcher -->
  <div class="top-controls">
    <button class="mode-btn active" id="btnMode3D" title="Ver o modelo 3D com todos os ícones flutuantes ao redor">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
      Showcase 3D
    </button>
    <button class="mode-btn" id="btnModeMobile" title="Ver como tela nativa de celular">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
      Mobile Direto
    </button>
  </div>

  <!-- Main Viewport -->
  <main class="showcase-viewport">
    <div class="phone-stage-wrapper" id="phoneStage">

      <!-- FLOATING 3D ELEMENTS -->
      <div class="floating-layer" id="floatingLayer">
        <div class="float-item item-esmalte" data-depth="0.05" title="Esmalte de Luxo Alta Pigmentação">
          <img src="assets/esmalte_3d.png" alt="Esmalte 3D Flutuante" />
        </div>
        <div class="float-item item-unha" data-depth="0.07" title="Alongamento Esculpido com Cristais">
          <img src="assets/unha_3d.png" alt="Unha 3D Flutuante com Cristais" />
        </div>
        <div class="float-item item-alicate" data-depth="0.04" title="Alicate de Cutícula Ouro Cirúrgico">
          <img src="assets/alicate_3d.png" alt="Alicate de Cutícula 3D Flutuante" />
        </div>
        <a href="__INSTAGRAM_URL__" target="_blank" rel="noopener" class="float-item item-instagram" data-depth="0.06" title="Acessar Instagram">
          <img src="assets/instagram_3d.png" alt="Instagram 3D" />
        </a>
        <div class="float-item item-pincel" data-depth="0.05" title="Pincel Profissional Kolinsky">
          <img src="assets/pincel_3d.png" alt="Pincel de Unhas 3D Flutuante" />
        </div>
        <a href="__TIKTOK_URL__" target="_blank" rel="noopener" class="float-item item-tiktok" data-depth="0.055" title="Acessar TikTok">
          <img src="assets/tiktok_3d.png" alt="TikTok 3D" />
        </a>
        <a href="__WHATSAPP_URL__" target="_blank" rel="noopener" class="float-item item-whatsapp" data-depth="0.045" title="Conversar no WhatsApp VIP">
          <img src="assets/whatsapp_3d.png" alt="WhatsApp 3D" />
        </a>

        <!-- Polaroid Card -->
        <div class="float-item item-polaroid" id="polaroidCard" data-depth="0.04" title="Clique para ver o trabalho ampliado">
          <div class="polaroid-tape"></div>
          <div class="polaroid-photo-frame">
            <img src="assets/__POLAROID_IMG__" alt="Trabalho Real" />
            <div class="polaroid-play-icon">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div class="polaroid-arrow-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </div>
          <div class="polaroid-caption">__POLAROID_CAPTION__</div>
        </div>

        <svg class="item-starburst starburst-1" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
        </svg>
        <svg class="item-starburst starburst-2" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
        </svg>
      </div>

      <!-- THE SMARTPHONE BIO-LINK CARD -->
      <article class="phone-mockup" id="phoneMockup">
        <div class="phone-notch"><div class="phone-camera-lens"></div></div>

        <div class="phone-content">
          <!-- Top Bar -->
          <div class="card-top-bar">
            <div class="top-bar-left">
              <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
              <span>__TOP_BAR_TEXT__</span>
            </div>
            <span>__EST_YEAR__</span>
          </div>

          <!-- Hero Photo Section -->
          <div class="hero-photo-wrap">
            <img src="assets/__HERO_IMG__" alt="__HERO_NAME__" class="hero-photo-img" />
            
            <div class="hero-floating-badge" title="__BADGE_TOOLTIP__">
              <span>__BADGE_BIG__</span>
              __BADGE_SMALL__
            </div>

            <div class="hero-photo-overlay">
              <div class="hero-intro-label">__INTRO_LABEL__</div>
              <h1 class="hero-name">__HERO_NAME__</h1>
              <p class="hero-bio">__HERO_BIO__</p>
            </div>
          </div>

          <!-- Google Reviews Snippet -->
          <div class="reviews-card">
            <div class="reviews-top">
              <div class="reviews-score">
                <span>__RATING_SCORE__</span>
                <span class="reviews-stars">★★★★★</span>
              </div>
              <div class="reviews-google-badge">
                <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                Google Reviews (__REVIEWS_COUNT__)
              </div>
            </div>
            <p class="review-quote">"__FEATURED_REVIEW_TEXT__"</p>
            <span class="review-author">— __FEATURED_REVIEW_AUTHOR__</span>
          </div>

          <!-- Links Heading -->
          <div class="links-heading">
            <span>Meu universo em alguns cliques.</span>
            <span>↓</span>
          </div>

          <!-- Action Buttons Stack -->
          <div class="links-stack">
            <!-- 1. Instagram -->
            <a href="__INSTAGRAM_URL__" target="_blank" rel="noopener" class="link-pill-btn pill-custom-1">
              <div class="pill-left">
                <div class="pill-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div class="pill-texts">
                  <span class="pill-title">Instagram Oficial</span>
                  <span class="pill-subtitle">__BTN_1_SUBTITLE__</span>
                </div>
              </div>
              <div class="pill-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </a>

            <!-- 2. WhatsApp VIP -->
            <a href="__WHATSAPP_URL__" target="_blank" rel="noopener" class="link-pill-btn pill-custom-2">
              <div class="pill-left">
                <div class="pill-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div class="pill-texts">
                  <span class="pill-title">Agendamento VIP</span>
                  <span class="pill-subtitle">__BTN_2_SUBTITLE__</span>
                </div>
              </div>
              <div class="pill-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </a>

            <!-- 3. Catálogo / Tabela -->
            <button class="link-pill-btn pill-custom-3" id="btnOpenCatalog">
              <div class="pill-left">
                <div class="pill-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <div class="pill-texts">
                  <span class="pill-title">Catálogo & Preços</span>
                  <span class="pill-subtitle">__BTN_3_SUBTITLE__</span>
                </div>
              </div>
              <div class="pill-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </button>

            <!-- 4. Especial / Curso / Localização -->
            <a href="__BTN_4_URL__" target="_blank" rel="noopener" class="link-pill-btn pill-custom-4">
              <div class="pill-left">
                <div class="pill-icon-box">
                  __BTN_4_ICON__
                </div>
                <div class="pill-texts">
                  <span class="pill-title">__BTN_4_TITLE__</span>
                  <span class="pill-subtitle">__BTN_4_SUBTITLE__</span>
                </div>
              </div>
              <div class="pill-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </a>
          </div>

          <!-- Reels Card -->
          <div class="reels-card" id="btnOpenReels" title="Assistir reels em destaque">
            <img src="assets/__REELS_IMG__" alt="Trabalho Recente" class="reels-bg-img" />
            <div class="reels-overlay">
              <div class="reels-top-row">
                <span class="reels-badge">__REELS_TAG__</span>
                <div class="reels-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </div>
              <div class="reels-play-center">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <div class="reels-bottom-text">__REELS_TITLE__</div>
            </div>
          </div>

          <!-- Footer Area -->
          <div class="card-footer">
            <div class="footer-pill-row">
              <div class="footer-mini-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                __LOCATION_TEXT__
              </div>
              <div class="footer-mini-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                __HOURS_TEXT__
              </div>
            </div>
            
            <button id="btnCopyPix" style="background: rgba(0,0,0,0.25); border: 1px dashed rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); font-size: 11px; font-weight: 600; padding: 6px 14px; border-radius: 999px; cursor: pointer; display: flex; align-items: center; gap: 6px; margin-top: 4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copiar Chave PIX (__PIX_TYPE__)
            </button>

            <div class="footer-signature">__FOOTER_SIGNATURE__</div>
          </div>

        </div>
      </article>

    </div>
  </main>

  <!-- CATALOG MODAL -->
  <div class="modal-backdrop" id="catalogModal">
    <div class="modal-box">
      <button class="modal-close-btn" id="btnCloseCatalog" aria-label="Fechar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <h3 class="modal-title">Menu de Serviços</h3>
      <p class="modal-subtitle">Selecione o procedimento desejado para agendar diretamente no WhatsApp VIP.</p>

      __CATALOG_ITEMS_HTML__
    </div>
  </div>

  <!-- REELS PREVIEW MODAL -->
  <div class="modal-backdrop" id="reelsModal">
    <div class="modal-box" style="max-width: 420px; text-align: center;">
      <button class="modal-close-btn" id="btnCloseReels" aria-label="Fechar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div style="position: relative; width: 100%; height: 380px; border-radius: 20px; overflow: hidden; margin-bottom: 18px;">
        <img src="assets/__REELS_IMG__" alt="Reels Preview" style="width:100%; height:100%; object-fit: cover; filter: brightness(0.85);" />
        <div style="position: absolute; inset:0; background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.7) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div style="width: 68px; height: 68px; border-radius: 50%; background: var(--bg-card); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 35px var(--glow-color);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <p style="font-size: 13px; font-weight: 700; margin-top: 14px; text-shadow: 0 2px 10px #000;">__MODAL_REELS_TAG__</p>
        </div>
      </div>

      <h3 class="modal-title" style="font-size: 20px;">__MODAL_REELS_HEADING__</h3>
      <p class="modal-subtitle" style="margin-bottom: 16px;">__MODAL_REELS_DESC__</p>

      <a href="__WHATSAPP_URL__" target="_blank" class="link-pill-btn pill-custom-2" style="justify-content: center; font-weight: 700; font-size: 14px;">
        Garantir esse resultado no meu horário ↗
      </a>
    </div>
  </div>

  <!-- Toast Element -->
  <div class="toast-msg" id="toastMsg">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span id="toastText">Copiado com sucesso!</span>
  </div>

  <script>
    (function() {
      const phoneStage = document.getElementById('phoneStage');
      const phoneMockup = document.getElementById('phoneMockup');
      const floatItems = document.querySelectorAll('.float-item');
      const btnMode3D = document.getElementById('btnMode3D');
      const btnModeMobile = document.getElementById('btnModeMobile');
      
      const catalogModal = document.getElementById('catalogModal');
      const btnOpenCatalog = document.getElementById('btnOpenCatalog');
      const btnCloseCatalog = document.getElementById('btnCloseCatalog');

      const reelsModal = document.getElementById('reelsModal');
      const btnOpenReels = document.getElementById('btnOpenReels');
      const btnCloseReels = document.getElementById('btnCloseReels');
      const polaroidCard = document.getElementById('polaroidCard');

      const toastMsg = document.getElementById('toastMsg');
      const toastText = document.getElementById('toastText');

      function showToast(text) {
        toastText.textContent = text;
        toastMsg.classList.add('show');
        setTimeout(() => toastMsg.classList.remove('show'), 2600);
      }

      const btnCopyPix = document.getElementById('btnCopyPix');
      if (btnCopyPix) {
        btnCopyPix.addEventListener('click', () => {
          navigator.clipboard.writeText('__PIX_KEY__').then(() => {
            showToast('Chave PIX copiada: __PIX_KEY__');
          }).catch(() => {
            showToast('Chave PIX: __PIX_KEY__');
          });
        });
      }

      btnOpenCatalog.addEventListener('click', () => catalogModal.classList.add('open'));
      btnCloseCatalog.addEventListener('click', () => catalogModal.classList.remove('open'));
      catalogModal.addEventListener('click', (e) => { if (e.target === catalogModal) catalogModal.classList.remove('open'); });

      function openReels() { reelsModal.classList.add('open'); }
      btnOpenReels.addEventListener('click', openReels);
      if (polaroidCard) polaroidCard.addEventListener('click', openReels);
      btnCloseReels.addEventListener('click', () => reelsModal.classList.remove('open'));
      reelsModal.addEventListener('click', (e) => { if (e.target === reelsModal) reelsModal.classList.remove('open'); });

      btnMode3D.addEventListener('click', () => {
        document.body.classList.remove('force-mobile-view');
        btnMode3D.classList.add('active');
        btnModeMobile.classList.remove('active');
        showToast('Showcase 3D com ícones flutuantes ativado!');
      });

      btnModeMobile.addEventListener('click', () => {
        document.body.classList.add('force-mobile-view');
        btnModeMobile.classList.add('active');
        btnMode3D.classList.remove('active');
        showToast('Modo Mobile Direto ativado!');
      });

      let targetRotX = 0, targetRotY = 0, currentRotX = 0, currentRotY = 0, mouseX = 0, mouseY = 0;

      window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 900 || document.body.classList.contains('force-mobile-view')) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouseX = (e.clientX - cx);
        mouseY = (e.clientY - cy);
        targetRotY = (mouseX / cx) * 7.5;
        targetRotX = -(mouseY / cy) * 7.5;
      });

      function updateParallax() {
        if (window.innerWidth >= 900 && !document.body.classList.contains('force-mobile-view')) {
          currentRotX += (targetRotX - currentRotX) * 0.08;
          currentRotY += (targetRotY - currentRotY) * 0.08;
          phoneMockup.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
          floatItems.forEach(item => {
            const depth = parseFloat(item.getAttribute('data-depth')) || 0.04;
            item.style.transform = `translate3d(${(-mouseX * depth).toFixed(1)}px, ${(-mouseY * depth).toFixed(1)}px, 0)`;
          });
        }
        requestAnimationFrame(updateParallax);
      }
      requestAnimationFrame(updateParallax);
    })();
  </script>
</body>
</html>
'''

# Configuration for Client 1: Izzy Mendes
izzy_cfg = {
    '__TITLE__': 'Izzy Mendes • Nails Designer & Studio',
    '__META_DESC__': 'Alongamento em unhas, esmaltação e elegância que valorizam sua beleza no Centro de São José dos Campos. Agendamentos VIP.',
    '__BG_DARK__': '#0a080d',
    '__BG_CARD__': '#e11d48',
    '__BG_CARD_GRADIENT__': 'linear-gradient(180deg, #f43f5e 0%, #e11d48 40%, #9f1239 100%)',
    '__CARD_BORDER__': 'rgba(255, 255, 255, 0.18)',
    '__GLOW_COLOR__': 'rgba(244, 63, 94, 0.22)',
    '__PILL_1_BG__': '#fbcfe8',
    '__PILL_1_TEXT__': '#831843',
    '__PILL_2_BG__': '#fed7aa',
    '__PILL_2_TEXT__': '#7c2d12',
    '__PILL_3_BG__': '#fef3c7',
    '__PILL_3_TEXT__': '#78350f',
    '__PILL_4_BG__': '#4c0519',
    '__PILL_4_TEXT__': '#ffffff',
    '__GHOST_TAGLINE__': 'IZZY MENDES STUDIO • SÃO JOSÉ DOS CAMPOS',
    '__GHOST_WATERMARK__': 'IZZY NAILS',
    '__POLAROID_NOTE__': 'com a Izzy :)',
    '__POLAROID_IMG__': 'polaroid_work.jpg',
    '__POLAROID_CAPTION__': 'unha de ouro :)',
    '__TOP_BAR_TEXT__': 'NAILS & BEAUTY',
    '__EST_YEAR__': 'EST. 2021',
    '__HERO_IMG__': 'hero_izzy.jpg',
    '__HERO_POS_Y__': '25%',
    '__OVERLAY_GRADIENT__': 'rgba(225, 29, 72, 0.7)',
    '__OVERLAY_SOLID__': 'rgba(159, 18, 57, 0.98)',
    '__BADGE_BIG__': '4.8 ★',
    '__BADGE_SMALL__': 'Google',
    '__BADGE_TEXT__': '#831843',
    '__BADGE_ACCENT__': '#e11d48',
    '__BADGE_TOOLTIP__': '4.8 estrelas no Google Reviews',
    '__INTRO_LABEL__': 'Olá, eu sou a',
    '__HERO_NAME__': 'Izzy Mendes',
    '__HERO_BIO__': 'Alongamento, esmaltação e cuidados personalizados para realçar sua sofisticação.',
    '__RATING_SCORE__': '4.8',
    '__REVIEWS_COUNT__': '17 avaliações',
    '__FEATURED_REVIEW_TEXT__': 'Excelente profissional, ótimos materiais, alongamento perfeito e duradouro, amoo!',
    '__FEATURED_REVIEW_AUTHOR__': 'Nubia Aguiar',
    '__INSTAGRAM_URL__': 'https://www.instagram.com/nailsizzymendes/',
    '__TIKTOK_URL__': 'https://www.instagram.com/nailsizzymendes/',
    '__WHATSAPP_URL__': 'https://wa.me/5512981553284?text=Ol%C3%A1%20Izzy!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.',
    '__BTN_1_SUBTITLE__': '@nailsizzymendes • Feed & Destaques',
    '__BTN_2_SUBTITLE__': '(12) 98155-3284 • Falar no WhatsApp',
    '__BTN_3_SUBTITLE__': 'Alongamentos, banho de gel e tabela',
    '__BTN_4_URL__': 'https://cortapp.com.br',
    '__BTN_4_ICON__': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    '__BTN_4_TITLE__': 'Agendar via CortApp',
    '__BTN_4_SUBTITLE__': 'Escolha seu horário pelo aplicativo',
    '__REELS_IMG__': 'polaroid_work.jpg',
    '__REELS_TAG__': 'TRANSFORMAÇÃO EM VÍDEO',
    '__REELS_TITLE__': 'Alongamento com glitter & acabamento fino.',
    '__LOCATION_TEXT__': 'Centro, São José dos Campos',
    '__HOURS_TEXT__': 'Seg a Sáb até 19h',
    '__PIX_TYPE__': 'Celular',
    '__PIX_KEY__': '12981553284',
    '__FOOTER_SIGNATURE__': 'Feito com carinho • Izzy Mendes Nail Designer',
    '__MODAL_REELS_TAG__': 'Brilho e durabilidade garantida',
    '__MODAL_REELS_HEADING__': 'Alongamento Acabamento Fino com Glitter',
    '__MODAL_REELS_DESC__': 'Estrutura reforçada sem peso, cutículas perfeitamente tratadas e esmaltação que dura mais de 25 dias.',
    '__CATALOG_ITEMS_HTML__': '''
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Alongamento em Gel / Fibra</h4>
          <p>Estrutura ultra resistente com acabamento natural • 2h30</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 180</span>
          <a href="https://wa.me/5512981553284?text=Ol%C3%A1%20Izzy!%20Gostaria%20de%20agendar%20Alongamento%20(R$%20180)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Esmaltação em Gel</h4>
          <p>Brilho impecável que não descasca por semanas • 1h15</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 90</span>
          <a href="https://wa.me/5512981553284?text=Ol%C3%A1%20Izzy!%20Gostaria%20de%20agendar%20Esmalta%C3%A7%C3%A3o%20em%20Gel%20(R$%2090)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Banho de Gel / Blindagem</h4>
          <p>Fortalecimento de unhas naturais com camada protetora • 1h00</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 105</span>
          <a href="https://wa.me/5512981553284?text=Ol%C3%A1%20Izzy!%20Gostaria%20de%20agendar%20Banho%20de%20Gel%20(R$%20105)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Manutenção Periódica</h4>
          <p>Nivelamento, reforço de estrutura e acabamento • 1h45</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 130</span>
          <a href="https://wa.me/5512981553284?text=Ol%C3%A1%20Izzy!%20Gostaria%20de%20agendar%20Manuten%C3%A7%C3%A3o%20(R$%20130)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
    '''
}

# Configuration for Client 2: Vivitória Nails
vivitoria_cfg = {
    '__TITLE__': 'Vivitória Nails • Especialista em Alongamentos',
    '__META_DESC__': 'Alongamento de unhas com acabamento natural e alta resistência em Santa Inês 2, São José dos Campos. Nota máxima 5.0 no Google.',
    '__BG_DARK__': '#0c0714',
    '__BG_CARD__': '#7c3aed',
    '__BG_CARD_GRADIENT__': 'linear-gradient(180deg, #9333ea 0%, #7c3aed 40%, #581c87 100%)',
    '__CARD_BORDER__': 'rgba(216, 180, 254, 0.25)',
    '__GLOW_COLOR__': 'rgba(147, 51, 234, 0.25)',
    '__PILL_1_BG__': '#f3e8ff',
    '__PILL_1_TEXT__': '#6b21a8',
    '__PILL_2_BG__': '#fed7aa',
    '__PILL_2_TEXT__': '#7c2d12',
    '__PILL_3_BG__': '#fef3c7',
    '__PILL_3_TEXT__': '#78350f',
    '__PILL_4_BG__': '#3b0764',
    '__PILL_4_TEXT__': '#ffffff',
    '__GHOST_TAGLINE__': 'VIVITÓRIA NAILS • ALONGAMENTOS DE RESISTÊNCIA',
    '__GHOST_WATERMARK__': 'VIVITÓRIA',
    '__POLAROID_NOTE__': 'olha essa arte :)',
    '__POLAROID_IMG__': 'polaroid_work.jpg',
    '__POLAROID_CAPTION__': 'floral com ouro :)',
    '__TOP_BAR_TEXT__': 'ALONGAMENTO DE LUXO',
    '__EST_YEAR__': 'EST. 2020',
    '__HERO_IMG__': 'hero_vivitoria.jpg',
    '__HERO_POS_Y__': '35%',
    '__OVERLAY_GRADIENT__': 'rgba(124, 58, 237, 0.7)',
    '__OVERLAY_SOLID__': 'rgba(88, 28, 135, 0.98)',
    '__BADGE_BIG__': '5.0 ★',
    '__BADGE_SMALL__': 'Google',
    '__BADGE_TEXT__': '#581c87',
    '__BADGE_ACCENT__': '#7c3aed',
    '__BADGE_TOOLTIP__': 'Nota 5.0 com mais de 80 avaliações no Google',
    '__INTRO_LABEL__': 'Olá, nós somos a',
    '__HERO_NAME__': 'Vivitória Nails',
    '__HERO_BIO__': 'Especialista em alongamentos de acabamento natural e altíssima durabilidade. Almond, Stiletto e Bailarina.',
    '__RATING_SCORE__': '5.0',
    '__REVIEWS_COUNT__': '82 avaliações',
    '__FEATURED_REVIEW_TEXT__': 'A melhor de toda região 😍 ótima profissional, ótima pessoa.',
    '__FEATURED_REVIEW_AUTHOR__': 'Lila Leal',
    '__INSTAGRAM_URL__': 'https://www.instagram.com/vivitoria.nails/',
    '__TIKTOK_URL__': 'https://www.instagram.com/vivitoria.nails/',
    '__WHATSAPP_URL__': 'https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20agendar%20meu%20alongamento.',
    '__BTN_1_SUBTITLE__': '@vivitoria.nails • 560+ posts de trabalhos',
    '__BTN_2_SUBTITLE__': '(12) 98167-6863 • Agende no WhatsApp',
    '__BTN_3_SUBTITLE__': 'Tabela completa e formatos de unhas',
    '__BTN_4_URL__': 'https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Gostaria%20de%20agendar%20um%20formato%20especial%20(Almond/Stiletto/Bailarina).',
    '__BTN_4_ICON__': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',
    '__BTN_4_TITLE__': 'Formatos Especiais',
    '__BTN_4_SUBTITLE__': 'Almond, Stiletto, Bailarina & Quadrada',
    '__REELS_IMG__': 'hero_vivitoria.jpg',
    '__REELS_TAG__': 'ALONGAMENTO NATURAL',
    '__REELS_TITLE__': 'Curvatura e espessura ultrafina.',
    '__LOCATION_TEXT__': 'Santa Inês 2, São José dos Campos',
    '__HOURS_TEXT__': 'Aberto até 18h',
    '__PIX_TYPE__': 'WhatsApp',
    '__PIX_KEY__': '12981676863',
    '__FOOTER_SIGNATURE__': 'Feito com amor • Vivitória Nails SJC',
    '__MODAL_REELS_TAG__': 'Acabamento que não parece falso',
    '__MODAL_REELS_HEADING__': 'Alongamento Red Almond Glass',
    '__MODAL_REELS_DESC__': 'Estrutura leve e confortável que acompanha o crescimento saudável da lâmina da sua unha natural.',
    '__CATALOG_ITEMS_HTML__': '''
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Alongamento Natural Resistente</h4>
          <p>Técnica exclusiva com acabamento slim e alta durabilidade • 2h15</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 195</span>
          <a href="https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Gostaria%20de%20agendar%20Alongamento%20Natural%20(R$%20195)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Nail Art Floral com Ouro</h4>
          <p>Encapsulamento botânico e folha de ouro 24k • +30min</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 50</span>
          <a href="https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Gostaria%20de%20adicionar%20Nail%20Art%20Floral%20(R$%2050)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Manutenção de Alongamento</h4>
          <p>Substituição de camada, hidratação e nova esmaltação • 1h45</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 135</span>
          <a href="https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Gostaria%20de%20agendar%20Manuten%C3%A7%C3%A3o%20(R$%20135)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Remoção Segura</h4>
          <p>Retirada sem agressão com tratamento nutritivo • 45min</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 60</span>
          <a href="https://wa.me/5512981676863?text=Ol%C3%A1%20Viviane!%20Gostaria%20de%20agendar%20Remo%C3%A7%C3%A3o%20(R$%2060)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
    '''
}

# Configuration for Client 3: Studio Tal - Nails Academy
studiotal_cfg = {
    '__TITLE__': 'Studio Tal • Nails Academy & Esmalteria',
    '__META_DESC__': 'Excelência em cuidados e formação em nail art em São José dos Campos. Biossegurança hospitalar com autoclave e atendimento mãe e filha.',
    '__BG_DARK__': '#09080b',
    '__BG_CARD__': '#b45309',
    '__BG_CARD_GRADIENT__': 'linear-gradient(180deg, #2b1f13 0%, #1c150e 45%, #0f0a07 100%)',
    '__CARD_BORDER__': 'rgba(245, 158, 11, 0.3)',
    '__GLOW_COLOR__': 'rgba(217, 119, 6, 0.25)',
    '__PILL_1_BG__': '#fef3c7',
    '__PILL_1_TEXT__': '#78350f',
    '__PILL_2_BG__': '#fed7aa',
    '__PILL_2_TEXT__': '#7c2d12',
    '__PILL_3_BG__': '#fffbeb',
    '__PILL_3_TEXT__': '#92400e',
    '__PILL_4_BG__': '#78350f',
    '__PILL_4_TEXT__': '#fef3c7',
    '__GHOST_TAGLINE__': 'STUDIO TAL • NAILS ACADEMY & ESMALTERIA',
    '__GHOST_WATERMARK__': 'STUDIO TAL',
    '__POLAROID_NOTE__': '100% esterilizado :)',
    '__POLAROID_IMG__': 'polaroid_work.jpg',
    '__POLAROID_CAPTION__': 'biossegurança total :)',
    '__TOP_BAR_TEXT__': 'ESMALTERIA & ACADEMY',
    '__EST_YEAR__': 'EST. 2019',
    '__HERO_IMG__': 'hero_studio.jpg',
    '__HERO_POS_Y__': '40%',
    '__OVERLAY_GRADIENT__': 'rgba(43, 31, 19, 0.75)',
    '__OVERLAY_SOLID__': 'rgba(15, 10, 7, 0.98)',
    '__BADGE_BIG__': '100%',
    '__BADGE_SMALL__': 'Esterilizado',
    '__BADGE_TEXT__': '#78350f',
    '__BADGE_ACCENT__': '#b45309',
    '__BADGE_TOOLTIP__': 'Biossegurança total com autoclave hospitalar',
    '__INTRO_LABEL__': 'Bem-vinda ao',
    '__HERO_NAME__': 'Studio Tal',
    '__HERO_BIO__': 'Catila & Socorro. Cuidado impecável, técnicas de alto padrão e formação de profissionais.',
    '__RATING_SCORE__': '5.0',
    '__REVIEWS_COUNT__': 'Destaque SJC',
    '__FEATURED_REVIEW_TEXT__': 'A Catila e a Socorro são excelentes no que fazem, muito capricho e dedicação.',
    '__FEATURED_REVIEW_AUTHOR__': 'Avaliação Google',
    '__INSTAGRAM_URL__': 'https://www.instagram.com/studio.tal/',
    '__TIKTOK_URL__': 'https://www.instagram.com/studio.tal/',
    '__WHATSAPP_URL__': 'https://wa.me/5512999999999?text=Ol%C3%A1%20Studio%20Tal!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20/%20conhecer%20os%20cursos.',
    '__BTN_1_SUBTITLE__': '@studio.tal • 3.400+ seguidores',
    '__BTN_2_SUBTITLE__': 'Agende seu momento personalizado',
    '__BTN_3_SUBTITLE__': 'Pé e mão tradicional, gel e blindagem',
    '__BTN_4_URL__': 'https://wa.me/5512999999999?text=Ol%C3%A1%20Catila%20e%20Socorro!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20Cursos%20da%20Nails%20Academy.',
    '__BTN_4_ICON__': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
    '__BTN_4_TITLE__': 'Nails Academy • Cursos VIP',
    '__BTN_4_SUBTITLE__': 'Capacitação profissional do zero ao pro',
    '__REELS_IMG__': 'hero_studio.jpg',
    '__REELS_TAG__': 'CURVATURA C PERFEITA',
    '__REELS_TITLE__': 'Acabamento espelhado e simetria.',
    '__LOCATION_TEXT__': 'Cidade Morumbi, SJC',
    '__HOURS_TEXT__': 'Terça a Sábado',
    '__PIX_TYPE__': 'Chave',
    '__PIX_KEY__': 'studiotalnails@gmail.com',
    '__FOOTER_SIGNATURE__': 'Feito com carinho • Studio Tal Nails Academy',
    '__MODAL_REELS_TAG__': 'Alto padrão de qualidade',
    '__MODAL_REELS_HEADING__': 'Curvatura C e Nivelamento Studio Tal',
    '__MODAL_REELS_DESC__': 'Utilizamos materiais de ponta certificados com esterilização cirúrgica em autoclave para a máxima segurança da sua saúde.',
    '__CATALOG_ITEMS_HTML__': '''
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Pé e Mão Tradicional</h4>
          <p>Cutilagem fina, esfoliação e hidratação profunda • 1h30</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 75</span>
          <a href="https://wa.me/5512999999999?text=Ol%C3%A1%20Studio%20Tal!%20Gostaria%20de%20agendar%20P%C3%A9%20e%20M%C3%A3o%20Tradicional%20(R$%2075)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Alongamento em Gel / Acrigel</h4>
          <p>Curvatura elegante, simetria e resistência • 2h30</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 190</span>
          <a href="https://wa.me/5512999999999?text=Ol%C3%A1%20Studio%20Tal!%20Gostaria%20de%20agendar%20Alongamento%20(R$%20190)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Esmaltação em Gel Duradoura</h4>
          <p>Secagem instantânea em cabine LED/UV • 1h15</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">R$ 95</span>
          <a href="https://wa.me/5512999999999?text=Ol%C3%A1%20Studio%20Tal!%20Gostaria%20de%20agendar%20Esmalta%C3%A7%C3%A3o%20em%20Gel%20(R$%2095)." target="_blank" class="catalog-book-btn">Agendar ↗</a>
        </div>
      </div>
      <div class="catalog-item">
        <div class="catalog-left">
          <h4>Curso Nails Academy VIP</h4>
          <p>Aulas práticas individuais com certificado e apostila • 16h</p>
        </div>
        <div class="catalog-right">
          <span class="catalog-price">Consulte</span>
          <a href="https://wa.me/5512999999999?text=Ol%C3%A1%20Catila%20e%20Socorro!%20Gostaria%20de%20saber%20valores%20do%20Curso%20VIP." target="_blank" class="catalog-book-btn">Vagas ↗</a>
        </div>
      </div>
    '''
}

def generate_client(folder, cfg):
    html = base_template
    for k, v in cfg.items():
        html = html.replace(k, str(v))
    out_dir = os.path.join(r'c:\portfólio\Portfólio-site\portfólio-raphael-codado-na-mão\clientes', folder)
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, 'index.html')
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated {folder}/index.html successfully!')

generate_client('izzy-mendes', izzy_cfg)
generate_client('vivitoria-nails', vivitoria_cfg)
generate_client('studio-tal', studiotal_cfg)
print('All 3 client variations generated successfully!')
