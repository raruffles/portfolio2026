const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\rapha\\AppData\\Local\\Programs\\antigravity\\.playwright-mcp\\page-2026-11-03T22-38-18-554Z.png';
fs.mkdirSync('clones/dr-ricardo/screenshots', { recursive: true });
fs.mkdirSync('C:/Users/rapha/.gemini/antigravity/brain/c7b93847-9eee-42b8-b632-cf03d8d4e7d5/screenshots', { recursive: true });

fs.copyFileSync(src, 'clones/dr-ricardo/screenshots/desktop-hero-verified.png');
fs.copyFileSync(src, 'C:/Users/rapha/.gemini/antigravity/brain/c7b93847-9eee-42b8-b632-cf03d8d4e7d5/screenshots/desktop-hero-verified.png');
console.log('✓ Desktop hero copied!');
