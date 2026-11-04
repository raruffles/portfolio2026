const fs = require('fs');
const path = require('path');
const https = require('https');

const cssUrl = 'https://cdn.prod.website-files.com/6a42c6bb158437a90659a312/css/nova-dental-dev.webflow.shared.a3248dd12.min.css';

https.get(cssUrl, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.mkdirSync('clones/nova-dental/assets', { recursive: true });
    fs.writeFileSync('clones/nova-dental/assets/nova-dental-dev.webflow.shared.min.css', data);
    console.log('Saved CSS, size:', data.length);

    // Find all url(...) in CSS
    const urls = [...data.matchAll(/url\((?:'|"|)?([^)'"]+)(?:'|"|)?\)/gi)].map(m => m[1]);
    console.log('Found URLs in CSS:', urls.length);
    console.log('Sample CSS URLs:', urls.slice(0, 10));
  });
}).on('error', console.error);
