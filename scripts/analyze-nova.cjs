const fs = require('fs');
const html = fs.readFileSync('clones/nova-dental/source.html', 'utf8');

const css = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('CSS:', css);

const js = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('JS:', js);

const imgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('IMG count:', imgs.length);

const inlineBg = [...html.matchAll(/url\((?:'|"|)?([^)'"]+)(?:'|"|)?\)/gi)].map(m => m[1]);
console.log('BG count:', inlineBg.length);

// Also check all assets mentioned in srcset, data-src, etc.
const allUrls = [...html.matchAll(/https?:\/\/[^\s"'<>\)]+/gi)].map(m => m[0]);
console.log('Total URLs found:', allUrls.length);
