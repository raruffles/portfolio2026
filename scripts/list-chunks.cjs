const fs = require('fs');

// Let's write a script to check all files downloaded from decor-dani-melo.vercel.app
const chunks = [
  '03vcybz4ldxd4.js',
  '10u3y4bw1ayzs.js',
  'turbopack-0kroxf~4lmog9.js',
  '0fsi8lw5utejl.js',
  '0d3tkj33oycf2.js',
  '0tuze1pbf5c31.js',
  '03~yq9q893hmn.js',
  '11qk_vpw_zwkf.js',
];

console.log('List of Next.js chunks in decor-dani-melo:');
chunks.forEach(c => console.log(`https://decor-dani-melo.vercel.app/_next/static/chunks/${c}`));
