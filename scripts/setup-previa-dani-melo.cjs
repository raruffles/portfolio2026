const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const cloneDir = path.join(rootDir, 'clones', 'arquitetura', 'decor-dani-melo');
const previaDir = path.join(rootDir, 'previas', 'decor-dani-melo');

fs.mkdirSync(previaDir, { recursive: true });

// Copy the full clone to previas/decor-dani-melo so it is 100% self-contained on GitHub Pages
fs.cpSync(cloneDir, previaDir, { recursive: true, force: true });
console.log('Copied clones/arquitetura/decor-dani-melo to previas/decor-dani-melo!');

// Create root redirect shortcut previa-decor-dani-melo.html
const shortcutHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0; url=previas/decor-dani-melo/">
  <title>Prévia Exclusiva — Daniella Melo | Arquitetura & Interiores</title>
</head>
<body style="background:#1c1b19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; color:#f5f3ef;">
  <div style="text-align:center; padding: 24px;">
    <h1 style="font-weight: 300; letter-spacing: 0.15em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 8px;">Daniella Melo — Arquitetura & Interiores</h1>
    <p style="opacity: 0.7; font-size: 0.95rem;">Redirecionando para a prévia interativa... <a href="previas/decor-dani-melo/" style="color:#d4af37; font-weight:500;">Clique aqui se não carregar automaticamente</a>.</p>
  </div>
  <script>
    window.location.replace("previas/decor-dani-melo/");
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'previa-decor-dani-melo.html'), shortcutHtml, 'utf8');
console.log('Created previa-decor-dani-melo.html root shortcut!');
