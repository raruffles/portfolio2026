const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'assets', 'ever-april.webflow.shared.css');
const css = fs.readFileSync(cssPath, 'utf8');
const urls = [...css.matchAll(/url\(['"]?(.*?)['"]?\)/g)].map(m => m[1]);
console.log('URLs in CSS count:', urls.length);
console.log('Unique URLs in CSS:', Array.from(new Set(urls)));

const htmlPath = path.join(__dirname, 'source.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Find major section elements
const regex = /<(section|header|footer|div)[^>]*class=["']([^"']*(?:section|header|hero|gallery|faq|footer|navbar|layout)[^"']*)["']/gi;
const matched = [];
let match;
while ((match = regex.exec(html)) !== null) {
  matched.push({ tag: match[1], class: match[2] });
}
console.log('Matched containers count:', matched.length);
console.log('First 25 matched classes:', matched.slice(0, 25));
