import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

// Limpar e recriar diretório dist
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Arquivos raiz exclusivos do portfólio oficial
const filesToCopy = [
  'index.html',
  'style.css',
  'script.js',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  'mask.svg',
  'mais-solidario.html',
  'mais-solidario-case.css',
  'mais-solidario-case.js',
  'guuh-sc.html',
  'blog-admin.html'
];

for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(dist, file));
  }
}

// Copiar imagens PNG raiz pertencentes ao portfólio
for (const item of fs.readdirSync('.')) {
  if (item.endsWith('.png') && fs.statSync(item).isFile()) {
    fs.copyFileSync(item, path.join(dist, item));
  }
}

// Copiar pastas de assets exclusivos do portfólio
const dirsToCopy = ['src', 'guuhsc'];
for (const dir of dirsToCopy) {
  if (fs.existsSync(dir)) {
    fs.cpSync(dir, path.join(dist, dir), { recursive: true });
  }
}

console.log('✓ Build concluído com sucesso em /dist (apenas cases oficiais do portfólio)');
