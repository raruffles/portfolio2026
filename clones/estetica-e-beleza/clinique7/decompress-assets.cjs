const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const dir = path.join(__dirname, 'assets');
const files = fs.readdirSync(dir);

let decompressedCount = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  const buf = fs.readFileSync(filePath);
  if (buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b) {
    try {
      const decompressed = zlib.gunzipSync(buf);
      fs.writeFileSync(filePath, decompressed);
      decompressedCount++;
      console.log(`Decompressed gzip file: ${f} (${buf.length} -> ${decompressed.length} bytes)`);
    } catch (err) {
      console.error(`Failed to gunzip ${f}:`, err.message);
    }
  }
});

console.log(`Finished. Decompressed ${decompressedCount} files.`);
