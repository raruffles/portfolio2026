// 3D Nutrition Interactive Canvas for Dra. Marina Turzi Landing Page
// Powered by Three.js (assets/three.min.js)

(function () {
  'use strict';

  function initNutrition3D() {
    const canvas = document.getElementById('nutrition3DCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement || canvas;
    const width = parent.clientWidth || window.innerWidth;
    const height = parent.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Iluminação elegante e suave (estética clínica/consultório)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xeaf3e6, 1.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xdbe7d2, 0.6);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Objeto Principal: Maçã Verde / Pera Suave Orgânica
    const appleGeo = new THREE.SphereGeometry(1.35, 64, 64);
    // Deformar sutilmente para formato orgânico natural
    const posAttr = appleGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);
      let factor = 1 - 0.12 * Math.pow(Math.abs(y / 1.35), 2);
      if (y > 0.8) factor -= 0.08 * (y - 0.8);
      posAttr.setXYZ(i, x * factor, y * 1.05, z * factor);
    }
    appleGeo.computeVertexNormals();

    const appleMat = new THREE.MeshPhysicalMaterial({
      color: 0x82b56b,
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
      reflectivity: 0.5
    });
    const appleMesh = new THREE.Mesh(appleGeo, appleMat);
    rootGroup.add(appleMesh);

    // Folha Verde Fresca
    const leafGeo = new THREE.ConeGeometry(0.35, 0.8, 16);
    leafGeo.scale(1, 0.2, 1);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x3d7036,
      roughness: 0.4
    });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.position.set(0.1, 1.45, 0);
    leafMesh.rotation.set(0.2, 0.3, 0.8);
    rootGroup.add(leafMesh);

    // Caule Pequeno
    const stemGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.35, 12);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(0, 1.4, 0);
    stemMesh.rotation.z = -0.15;
    rootGroup.add(stemMesh);

    // 2. Fita Métrica 3D Elegante (Amarelo Dourado Ouro) Espiralando
    class SpiralCurve extends THREE.Curve {
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const theta = t * Math.PI * 4.2;
        const radius = 1.75 + Math.sin(t * Math.PI) * 0.25;
        const tx = Math.cos(theta) * radius;
        const ty = (t - 0.5) * 3.4;
        const tz = Math.sin(theta) * radius;
        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new SpiralCurve(1);
    const tapeGeo = new THREE.TubeGeometry(path, 120, 0.08, 12, false);
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0xe2a123,
      metalness: 0.35,
      roughness: 0.35
    });
    const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
    rootGroup.add(tapeMesh);

    // 3. Pequenas partículas de vitalidade/água orbitando
    const dropletsCount = 18;
    const dropletGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const dropletMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.33
    });

    const droplets = [];
    for (let i = 0; i < dropletsCount; i++) {
      const mesh = new THREE.Mesh(dropletGeo, dropletMat);
      const angle = (i / dropletsCount) * Math.PI * 2;
      const dist = 2.0 + (i % 3) * 0.45;
      mesh.position.set(
        Math.cos(angle) * dist,
        ((i / dropletsCount) - 0.5) * 3.0,
        Math.sin(angle) * dist
      );
      mesh.userData = { angle: angle, speed: 0.005 + Math.random() * 0.005, dist: dist };
      rootGroup.add(mesh);
      droplets.push(mesh);
    }

    // Scroll binding para transição fluida descendo na tela
    let scrollProgress = 0;
    const triggerSection = document.getElementById('nutrition');

    function updateScrollProgress() {
      if (!triggerSection) return;
      const rect = triggerSection.getBoundingClientRect();
      const totalH = triggerSection.offsetHeight - window.innerHeight;
      if (totalH > 0) {
        const scrolled = -rect.top;
        scrollProgress = Math.max(0, Math.min(1, scrolled / totalH));
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Loop de Animação 60fps suave
    let targetY = 0;
    let targetRotY = 0;
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Translação e rotação em resposta ao scroll
      targetY = (scrollProgress - 0.5) * -2.4;
      targetRotY = scrollProgress * Math.PI * 2.8 + elapsedTime * 0.25;

      rootGroup.position.y += (targetY - rootGroup.position.y) * 0.08;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.08 + (scrollProgress * 0.2);
      rootGroup.rotation.z = Math.cos(elapsedTime * 0.6) * 0.06;

      // Animar gotículas sutis
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.userData.angle += d.userData.speed;
        d.position.x = Math.cos(d.userData.angle) * d.userData.dist;
        d.position.z = Math.sin(d.userData.angle) * d.userData.dist;
        d.position.y += Math.sin(elapsedTime * 1.5 + i) * 0.002;
      }

      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNutrition3D);
  } else {
    initNutrition3D();
  }
})();
