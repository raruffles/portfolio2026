const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'clones', 'arquitetura', 'decor-dani-melo');

// 1. Calibrate turbopack chunk loader
const tpPath = path.join(baseDir, '_next', 'static', 'chunks', 'turbopack-0kroxf~4lmog9.js');
let tp = fs.readFileSync(tpPath, 'utf8');

const oldT = 'let t="/_next/"';
const newT = 'let t=(function(){var s=document.currentScript?document.currentScript.src:window.location.href;var i=s.indexOf("/_next/");return i!==-1?s.slice(new URL(s).origin.length,i+7):"/_next/"})()';

if (tp.includes(oldT)) {
  tp = tp.replace(oldT, newT);
  fs.writeFileSync(tpPath, tp, 'utf8');
  console.log('✅ Calibrated turbopack-0kroxf~4lmog9.js dynamic chunk prefix!');
} else {
  console.log('ℹ️ turbopack chunk prefix already updated or not found');
}

// 2. Calibrate 10u3 currentScript check so it doesn't fail if path is relative
const c10Path = path.join(baseDir, '_next', 'static', 'chunks', '10u3y4bw1ayzs.js');
let c10 = fs.readFileSync(c10Path, 'utf8');
// The check: if(-1===n)throw Object.defineProperty(new r.InvalidCurrentScriptError...
// Let's make it safe
if (c10.includes('if(-1===n)throw Object.defineProperty(new r.InvalidCurrentScriptError')) {
  c10 = c10.replace('if(-1===n)throw Object.defineProperty(new r.InvalidCurrentScriptError', 'if(false&&-1===n)throw Object.defineProperty(new r.InvalidCurrentScriptError');
  fs.writeFileSync(c10Path, c10, 'utf8');
  console.log('✅ Calibrated 10u3 currentScript error check!');
}

// 3. Calibrate 0tu image paths to relative
const c0tuPath = path.join(baseDir, '_next', 'static', 'chunks', '0tuze1pbf5c31.js');
let c0tu = fs.readFileSync(c0tuPath, 'utf8');
const oldImg = '/images/';
if (c0tu.includes(oldImg)) {
  c0tu = c0tu.replaceAll(oldImg, 'images/');
  fs.writeFileSync(c0tuPath, c0tu, 'utf8');
  console.log('✅ Calibrated 0tuze1pbf5c31.js image paths to relative!');
}

// 4. Create index.html from source.html with all original scripts and hydration preserved!
const srcHtml = fs.readFileSync(path.join(baseDir, 'source.html'), 'utf8');
let html = srcHtml;

// Replace root-absolute paths with relative paths
html = html.replaceAll('href="/_next/', 'href="_next/');
html = html.replaceAll('src="/_next/', 'src="_next/');
html = html.replaceAll('href="/images/', 'href="images/');
html = html.replaceAll('src="/images/', 'src="images/');
html = html.replaceAll('href="/favicon.svg"', 'href="favicon.svg"');
html = html.replaceAll('src="/favicon.svg"', 'src="favicon.svg"');

// In inline hydration strings: replace \/_next\/ and \/images\/ with relative
html = html.replaceAll('\\/_next\\/', '_next\\/');
html = html.replaceAll('\\/images\\/', 'images\\/');
html = html.replaceAll('/images/', 'images/');

// Add meta robots
if (!html.includes('robots')) {
  html = html.replace('<head>', '<head><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"/>');
}

fs.writeFileSync(path.join(baseDir, 'index.html'), html, 'utf8');
console.log('✅ Created complete index.html with FULL original hydration scripts! Length:', html.length);

// 5. Sync to previas/decor-dani-melo/
const prevDir = path.join(__dirname, '..', 'previas', 'decor-dani-melo');
fs.cpSync(baseDir, prevDir, { recursive: true, force: true });
console.log('✅ Copied complete build to previas/decor-dani-melo!');
