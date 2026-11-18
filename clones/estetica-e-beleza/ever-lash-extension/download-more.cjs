const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68e8de998f5eb7f2f4d4020f_logogram%20EVER%20(1)_32%20x%2032%20px%20brown.jpg', dest: 'assets/images/favicon-32.jpg' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/68e8dea82f23eec5eb4c0a24_logogram%20EVER%20(1)_256%20x%20256%20px%20brown.jpg', dest: 'assets/images/favicon-256.jpg' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f62e0d2deb47850ed1ec45_Up%20Right.js', dest: 'assets/up-right.js' },
  { url: 'https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/686f86f98cfd7b3f4091f97c_ever-logo.js', dest: 'assets/ever-logo.js' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, dest));
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded:', dest);
        resolve();
      });
    }).on('error', err => reject(err));
  });
}

Promise.all(files.map(f => download(f.url, f.dest))).then(() => console.log('Done additional downloads!'));
