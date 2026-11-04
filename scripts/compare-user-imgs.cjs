const fs = require('fs');

const f1 = 'C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.user_uploaded/media_1793815552236_29ef675f.png';
const f2 = 'C:/Users/rapha/.gemini/antigravity/brain/b2c38426-2c12-4533-9b98-494f436ee941/.user_uploaded/media_1793817842961_f2a7a019.png';

console.log('F1 size:', fs.statSync(f1).size);
console.log('F2 size:', fs.statSync(f2).size);
