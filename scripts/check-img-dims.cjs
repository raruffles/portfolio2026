const fs = require('fs');
const path = require('path');

function getDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), type: 'png' };
  }
  if (buf[0] === 0xFF && buf[1] === 0xD8) {
    let offset = 2;
    while (offset < buf.length) {
      const marker = buf.readUInt16BE(offset);
      offset += 2;
      if (marker === 0xFFC0 || marker === 0xFFC2) {
        return { height: buf.readUInt16BE(offset + 1), width: buf.readUInt16BE(offset + 3), type: 'jpeg' };
      }
      offset += buf.readUInt16BE(offset);
    }
  }
  return { unknown: true };
}

const dir = 'clones/estetica-e-beleza/dr.ricardo-andrade';
fs.readdirSync(dir).filter(f => f.match(/\.(png|jpg|jpeg)$/i)).forEach(f => {
  console.log(f, getDimensions(path.join(dir, f)));
});
