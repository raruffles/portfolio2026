const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  headers: {
    'Referer': 'https://www.ever.co.id/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

const files = [
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/67f62e0d2deb47850ed1ec45_Up%20Right.json', 'assets/up-right.json'],
  ['https://cdn.prod.website-files.com/67f28d1d69b4c6d58d1cd1da/686f86f98cfd7b3f4091f97c_ever-logo.json', 'assets/ever-logo.json']
];

for (const [url, dest] of files) {
  const filePath = path.join(__dirname, dest);
  const stream = fs.createWriteStream(filePath);
  https.get(url, options, res => {
    res.pipe(stream);
    stream.on('finish', () => console.log('Saved:', dest));
  });
}
