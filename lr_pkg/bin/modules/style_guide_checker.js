// style_guide_checker.js (simple rule checker)
const fs = require('fs');
module.exports = {
  init: ()=>console.log('[StyleGuide] initialized'),
  onFileChange: (projectPath, filename) => {
    if (!filename.endsWith('.css')) return;
    const content = fs.readFileSync(`${projectPath}/${filename}`, 'utf8');
    if (content.includes('!important')) console.warn('[StyleGuide] found !important in', filename);
  }
};
