const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexPath = path.join(dir, 'index.html');
const resPath = path.join(dir, 'residencia-alphaville.html');
const pkgPath = path.join(dir, 'package.json');

console.log('--- Transformando clones/arquitetura/juliana-donzelli (Fase 2) ---');

// 1. Atualizar package.json
const pkg = {
  name: "juliana-donzelli-arquitetura",
  version: "1.0.0",
  description: "Juliana Donzelli Arquitetura + Interiores — Landing Page de Alto Padrão (São José dos Campos)",
  scripts: {
    "dev": "npx -y http-server . -p 3004 -c-1",
    "start": "npx -y http-server . -p 3004 -c-1"
  }
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

// 2. Transformar index.html
let html = fs.readFileSync(indexPath, 'utf8');

// Social footer links & emails
html = html.replace(/https:\/\/www\.instagram\.com\/deboratoledoarquitetura\//g, 'https://www.instagram.com/judonzelli.arquiteta/');
html = html.replace(/arquitetura\.deboratoledo@gmail\.com/g, 'contato@julianadonzelli.com.br');
html = html.replace(/aria-label="Email Débora Toledo"/g, 'aria-label="Email Juliana Donzelli"');
html = html.replace(/Email Débora Toledo/g, 'Email Juliana Donzelli');

// Alts & comments
html = html.replace(/alt="Débora Toledo na Revista Viva Magazine"/g, 'alt="Juliana Donzelli - Destaque em Arquitetura e Interiores"');
html = html.replace(/alt="Fachada noturna iluminada por Débora Toledo"/g, 'alt="Fachada noturna contemporânea iluminada - Juliana Donzelli"');
html = html.replace(/alt="Metodologia Débora Toledo - Harmonia entre conceito e canteiro de obras"/g, 'alt="Metodologia Juliana Donzelli - Harmonia entre conceito e canteiro de obras"');
html = html.replace(/<!-- 2\. Imagem Autoral Débora Toledo/g, '<!-- 2. Imagem Autoral Juliana Donzelli');
html = html.replace(/id="debora-master-styles"/g, 'id="juliana-master-styles"');
html = html.replace(/id="deboraEnquiryModalScript"/g, 'id="julianaEnquiryModalScript"');

// Fix any leftover Débora in Portuguese & English
html = html.replace(/Débora Toledo/g, 'Juliana Donzelli');
html = html.replace(/DÉBORA TOLEDO/g, 'JULIANA DONZELLI');
html = html.replace(/Débora/g, 'Juliana');

fs.writeFileSync(indexPath, html, 'utf8');

// 3. residencia-alphaville.html
let resHtml = fs.readFileSync(resPath, 'utf8');
resHtml = resHtml.replace(/https:\/\/www\.instagram\.com\/deboratoledoarquitetura\//g, 'https://www.instagram.com/judonzelli.arquiteta/');
resHtml = resHtml.replace(/arquitetura\.deboratoledo@gmail\.com/g, 'contato@julianadonzelli.com.br');
resHtml = resHtml.replace(/Débora Toledo/g, 'Juliana Donzelli');
resHtml = resHtml.replace(/DÉBORA TOLEDO/g, 'JULIANA DONZELLI');
resHtml = resHtml.replace(/Débora/g, 'Juliana');
resHtml = resHtml.replace(/5511993083890/g, '5512991931919');
resHtml = resHtml.replace(/deboratoledo\.com\.br/g, 'julianadonzelli.com.br');

fs.writeFileSync(resPath, resHtml, 'utf8');

console.log('✅ Transformação Concluída 100%!');
