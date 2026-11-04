const fs = require('fs');
const path = require('path');

const pwDir = 'C:\\Users\\rapha\\AppData\\Local\\Programs\\antigravity\\.playwright-mcp';
const projectDir = 'clones/dr-ricardo/screenshots';
const artifactDir = 'C:/Users/rapha/.gemini/antigravity/brain/c7b93847-9eee-42b8-b632-cf03d8d4e7d5/screenshots';

fs.mkdirSync(projectDir, { recursive: true });
fs.mkdirSync(artifactDir, { recursive: true });

const filesToCopy = [
  { src: 'page-2026-11-03T22-38-18-554Z.png', dest: 'desktop-hero-verified.png' },
  { src: 'page-2026-11-03T22-43-34-958Z.png', dest: 'desktop-mission-verified.png' },
  { src: 'page-2026-11-03T22-44-20-078Z.png', dest: 'desktop-doctor-verified.png' },
  { src: 'page-2026-11-03T22-45-14-434Z.png', dest: 'desktop-form-verified.png' },
  { src: 'page-2026-11-03T22-05-04-898Z.png', dest: 'mobile-hero-verified.png' },
  { src: 'page-2026-11-03T22-05-59-801Z.png', dest: 'mobile-doctor-verified.png' },
  { src: 'page-2026-11-03T22-32-44-780Z.png', dest: 'mobile-form-verified.png' },
  { src: 'page-2026-11-03T22-33-50-268Z.png', dest: 'mobile-form-bottom-verified.png' }
];

filesToCopy.forEach(f => {
  const fullSrc = path.join(pwDir, f.src);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, path.join(projectDir, f.dest));
    fs.copyFileSync(fullSrc, path.join(artifactDir, f.dest));
    console.log(`✓ Copied ${f.dest}`);
  } else {
    console.log(`✗ Source not found: ${fullSrc}`);
  }
});
