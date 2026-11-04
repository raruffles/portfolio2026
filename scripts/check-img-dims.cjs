const fs = require('fs');
const path = require('path');

function getDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer[0] === 0x89 && buffer[1] === 0x50) { // PNG
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), type: 'png' };
  }
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
    let offset = 2;
    while (offset < buffer.length) {
      const marker = buffer.readUInt16BE(offset);
      offset += 2;
      if (marker === 0xFFC0 || marker === 0xFFC2) {
        return { height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5), type: 'jpg' };
      }
      offset += buffer.readUInt16BE(offset);
    }
  }
  return { type: 'unknown' };
}

const dir = 'clones/facetasdental(dra.adrielipereira)/assets/client/img';
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else console.log(full, getDimensions(full));
  }
}
walk(dir);
