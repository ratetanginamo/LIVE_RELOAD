// accessibility_checker.js (simple checks)
const fs = require('fs');
module.exports = {
  init: ()=>console.log('[A11y] initialized'),
  onFileChange: (projectPath, filename) => {
    if (!filename.endsWith('.html')) return;
    const content = fs.readFileSync(`${projectPath}/${filename}`, 'utf8');
    if (!/alt=/.test(content)) console.warn('[A11y] missing alt attributes in', filename);
  }
};
