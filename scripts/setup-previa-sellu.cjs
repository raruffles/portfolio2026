const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. SELLU MARCENARIA
const selluSrc = path.join(rootDir, 'clones', 'marcearia', 'Sellu');
const selluDest = path.join(rootDir, 'previas', 'sellu');

fs.mkdirSync(selluDest, { recursive: true });
fs.cpSync(selluSrc, selluDest, { recursive: true, force: true });
console.log('✓ Copied clones/marcearia/Sellu to previas/sellu');

// Also copy to previas/sellu-marcenaria for convenience
const selluAltDest = path.join(rootDir, 'previas', 'sellu-marcenaria');
fs.mkdirSync(selluAltDest, { recursive: true });
fs.cpSync(selluSrc, selluAltDest, { recursive: true, force: true });
console.log('✓ Copied clones/marcearia/Sellu to previas/sellu-marcenaria');

// Create root shortcuts
const selluShortcutHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0; url=previas/sellu/">
  <title>Prévia Exclusiva — Sellu Marcenaria | Móveis Planejados de Alto Padrão</title>
</head>
<body style="background:#faf9f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; color:#1a1918;">
  <div style="text-align:center; padding: 24px;">
    <h1 style="font-weight: 300; letter-spacing: 0.15em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 8px;">Sellu Marcenaria — Móveis Sob Medida</h1>
    <p style="opacity: 0.7; font-size: 0.95rem;">Redirecionando para a prévia interativa... <a href="previas/sellu/" style="color:#b28351; font-weight:500;">Clique aqui se não carregar automaticamente</a>.</p>
  </div>
  <script>
    window.location.replace("previas/sellu/");
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'previa-sellu.html'), selluShortcutHtml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'previa-sellu-marcenaria.html'), selluShortcutHtml, 'utf8');
console.log('✓ Created previa-sellu.html and previa-sellu-marcenaria.html');

// 2. DEBORA TOLEDO (BCG BUILDING DESIGN)
const deboraSrc = path.join(rootDir, 'clones', 'arquitetura', 'bcg-building-design');
if (fs.existsSync(deboraSrc)) {
  const deboraDest = path.join(rootDir, 'previas', 'debora-toledo');
  fs.mkdirSync(deboraDest, { recursive: true });
  fs.cpSync(deboraSrc, deboraDest, { recursive: true, force: true });
  console.log('✓ Copied clones/arquitetura/bcg-building-design to previas/debora-toledo');

  const deboraShortcutHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <meta http-equiv="refresh" content="0; url=previas/debora-toledo/">
  <title>Prévia Exclusiva — Débora Toledo | Arquitetura</title>
</head>
<body style="background:#f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; color:#222;">
  <div style="text-align:center; padding: 24px;">
    <h1 style="font-weight: 300; letter-spacing: 0.15em; font-size: 1.4rem; text-transform: uppercase; margin-bottom: 8px;">Débora Toledo — Arquitetura</h1>
    <p style="opacity: 0.7; font-size: 0.95rem;">Redirecionando para a prévia interativa... <a href="previas/debora-toledo/" style="color:#8c7355; font-weight:500;">Clique aqui se não carregar automaticamente</a>.</p>
  </div>
  <script>
    window.location.replace("previas/debora-toledo/");
  </script>
</body>
</html>
`;
  fs.writeFileSync(path.join(rootDir, 'previa-debora-toledo.html'), deboraShortcutHtml, 'utf8');
  console.log('✓ Created previa-debora-toledo.html');
}
