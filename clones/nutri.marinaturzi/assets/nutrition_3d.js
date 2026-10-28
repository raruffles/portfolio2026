// 3D Apple & Sequence Micro-Sections Controller for Dra. Marina Turzi
// Powered by Three.js

(function () {
  'use strict';

  function initNutritionSequence() {
    const canvas = document.getElementById('nutrition3DCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement || canvas;
    let width = parent.clientWidth || window.innerWidth;
    let height = parent.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Iluminação de estúdio limpa e sofisticada
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf2faeb, 1.4);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd9ecd0, 0.8);
    fillLight.position.set(-6, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
    rimLight.position.set(0, 8, -5);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. Modelo 3D da Maçã Verde Realista (Granny Smith Orgânica)
    // Geometria orgânica com covinha no topo (haste) e base
    const appleGeo = new THREE.SphereGeometry(1.4, 64, 64);
    const pos = appleGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Distorção orgânica sutil
      let r = Math.sqrt(x * x + z * z);
      let factor = 1.0;

      // Covinha no topo
      if (y > 0.8) {
        let topDepth = (y - 0.8) / 0.6;
        factor -= topDepth * 0.22;
        y -= Math.pow(topDepth, 2) * 0.18;
      }
      // Covinha na base
      if (y < -0.8) {
        let btmDepth = (-y - 0.8) / 0.6;
        factor -= btmDepth * 0.18;
        y += Math.pow(btmDepth, 2) * 0.12;
      }

      // Proporção de maçã: ombro ligeiramente mais largo que a base
      if (y > 0) {
        factor *= (1 + y * 0.08);
      } else {
        factor *= (1 + y * 0.12);
      }

      pos.setXYZ(i, x * factor, y * 1.08, z * factor);
    }
    appleGeo.computeVertexNormals();

    // Material de alta fidelidade: casca brilhante e fresca com clearcoat
    const appleMat = new THREE.MeshPhysicalMaterial({
      color: 0x6eab45,       // Verde maçã saudável vibrante
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 0.75,       // Brilho lustroso de maçã fresca lavada
      clearcoatRoughness: 0.18,
      reflectivity: 0.65
    });

    const appleMesh = new THREE.Mesh(appleGeo, appleMat);
    rootGroup.add(appleMesh);

    // Caule Natural Curvo em Madeira Marrom
    class StemCurve extends THREE.Curve {
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const tx = Math.sin(t * 0.8) * 0.12;
        const ty = 1.25 + t * 0.55;
        const tz = Math.cos(t * 0.5) * 0.08 - 0.08;
        return optionalTarget.set(tx, ty, tz);
      }
    }
    const stemPath = new StemCurve();
    const stemGeo = new THREE.TubeGeometry(stemPath, 24, 0.05, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b1f,
      roughness: 0.75,
      metalness: 0.05
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    rootGroup.add(stemMesh);

    // Folha Verde Fresca e Delicada
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.2, 0.1, 0.45, 0.35, 0.4, 0.75);
    leafShape.bezierCurveTo(0.25, 0.85, 0.05, 0.8, 0, 0.95);
    leafShape.bezierCurveTo(-0.05, 0.8, -0.25, 0.85, -0.4, 0.75);
    leafShape.bezierCurveTo(-0.45, 0.35, -0.2, 0.1, 0, 0);

    const leafExtrudeSettings = { depth: 0.02, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
    const leafGeo = new THREE.ExtrudeGeometry(leafShape, leafExtrudeSettings);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3b7d2f,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.scale.set(0.85, 0.85, 0.85);
    leafMesh.position.set(0.06, 1.42, 0.02);
    leafMesh.rotation.set(0.65, 0.4, -0.75);
    rootGroup.add(leafMesh);

    // Fita Métrica Antropométrica Dourada Espiralando Suavemente
    class TapeSpiral extends THREE.Curve {
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const turns = 3.6;
        const theta = t * Math.PI * 2 * turns;
        const radius = 1.72 + Math.sin(t * Math.PI) * 0.22;
        const tx = Math.cos(theta) * radius;
        const ty = (t - 0.5) * 3.6;
        const tz = Math.sin(theta) * radius;
        return optionalTarget.set(tx, ty, tz);
      }
    }
    const tapePath = new TapeSpiral();
    const tapeGeo = new THREE.TubeGeometry(tapePath, 140, 0.065, 12, false);
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,       // Dourado nutricional
      metalness: 0.35,
      roughness: 0.32
    });
    const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
    rootGroup.add(tapeMesh);

    // Gotículas de Vitalidade/Água orbitando
    const dropletsCount = 14;
    const dropletGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.9,
      transparent: true,
      roughness: 0.08,
      ior: 1.33
    });

    const droplets = [];
    for (let i = 0; i < dropletsCount; i++) {
      const mesh = new THREE.Mesh(dropletGeo, dropletMat);
      const angle = (i / dropletsCount) * Math.PI * 2;
      const dist = 2.1 + (i % 3) * 0.35;
      mesh.position.set(
        Math.cos(angle) * dist,
        ((i / dropletsCount) - 0.5) * 3.2,
        Math.sin(angle) * dist
      );
      mesh.userData = { angle: angle, speed: 0.006 + (i % 4) * 0.002, dist: dist };
      rootGroup.add(mesh);
      droplets.push(mesh);
    }

    // 3. Gerenciamento das Micro-seções (Cards 1 a 4) com Base no Scroll
    const triggerSection = document.getElementById('nutrition');
    const scrollWrap = triggerSection ? triggerSection.querySelector('.sequence-scroll-wrap') : null;
    const desktopCards = triggerSection ? triggerSection.querySelectorAll('.sequence-cards .statement-card') : [];
    const finalSignature = triggerSection ? triggerSection.querySelector('.sequence-final') : null;

    let scrollProgress = 0;
    let currentCardIndex = -1;

    function handleSequenceScroll() {
      if (!scrollWrap) return;
      const rect = scrollWrap.getBoundingClientRect();
      const totalH = scrollWrap.offsetHeight - window.innerHeight;
      if (totalH > 0) {
        const scrolled = -rect.top;
        scrollProgress = Math.max(0, Math.min(1, scrolled / totalH));
      }

      // Definir qual micro-seção (card) está ativa
      // 0.00 - 0.05: entrada inicial
      // 0.05 - 0.28: Card 1 (Mais Sabor) - direita
      // 0.28 - 0.52: Card 2 (Mais Energia) - esquerda
      // 0.52 - 0.76: Card 3 (Mais Leveza) - direita
      // 0.76 - 0.92: Card 4 (Zero Neura) - esquerda
      // 0.92 - 1.00: Final Title / Callout no centro
      let activeIdx = -1;
      if (scrollProgress >= 0.04 && scrollProgress < 0.27) {
        activeIdx = 0;
      } else if (scrollProgress >= 0.27 && scrollProgress < 0.51) {
        activeIdx = 1;
      } else if (scrollProgress >= 0.51 && scrollProgress < 0.75) {
        activeIdx = 2;
      } else if (scrollProgress >= 0.75 && scrollProgress < 0.93) {
        activeIdx = 3;
      } else if (scrollProgress >= 0.93) {
        activeIdx = 4; // Final
      }

      if (activeIdx !== currentCardIndex) {
        currentCardIndex = activeIdx;
        updateActiveCards(currentCardIndex);
      }
    }

    function updateActiveCards(idx) {
      if (!desktopCards || desktopCards.length === 0) return;

      desktopCards.forEach((card, i) => {
        if (i === idx) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      if (finalSignature) {
        if (idx === 4) {
          finalSignature.classList.add('is-active');
        } else {
          finalSignature.classList.remove('is-active');
        }
      }
    }

    window.addEventListener('scroll', handleSequenceScroll, { passive: true });
    handleSequenceScroll();

    // 4. Loop de Animação Fluido (60 FPS)
    let targetX = 0;
    let targetY = 0;
    let targetRotY = 0;
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ajuste de posição 3D dependendo do card ativo
      // Se card da direita está ativo (0 ou 2), a maçã vai ligeiramente para a esquerda (-1.4)
      // Se card da esquerda está ativo (1 ou 3), a maçã vai para a direita (+1.4)
      if (currentCardIndex === 0 || currentCardIndex === 2) {
        targetX = -1.25;
      } else if (currentCardIndex === 1 || currentCardIndex === 3) {
        targetX = 1.25;
      } else {
        targetX = 0;
      }

      // Em telas menores que 991px (mobile), a maçã fica centralizada no topo
      if (window.innerWidth <= 991) {
        targetX = 0;
      }

      targetY = Math.sin(elapsedTime * 1.2) * 0.12;
      targetRotY = scrollProgress * Math.PI * 4.2 + (elapsedTime * 0.18);

      // Interpolação suave (lerp)
      rootGroup.position.x += (targetX - rootGroup.position.x) * 0.08;
      rootGroup.position.y += (targetY - rootGroup.position.y) * 0.08;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.08 + (scrollProgress * 0.25);
      rootGroup.rotation.z = Math.cos(elapsedTime * 0.6) * 0.05;

      // Animar gotículas sutis
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.userData.angle += d.userData.speed;
        d.position.x = Math.cos(d.userData.angle) * d.userData.dist;
        d.position.z = Math.sin(d.userData.angle) * d.userData.dist;
        d.position.y += Math.sin(elapsedTime * 1.5 + i) * 0.003;
      }

      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      handleSequenceScroll();
    }

    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNutritionSequence);
  } else {
    initNutritionSequence();
  }
})();
