const fs = require('fs');
const path = require('path');

const chunkDir = 'clones/arquitetura/decor-dani-melo/_next/static/chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  const hasRootNext = content.includes('/_next/');
  const hasImages = content.includes('/images/');
  console.log(`${f}: hasRootNext=${hasRootNext}, hasImages=${hasImages}`);
});
