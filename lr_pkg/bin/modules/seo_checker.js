// seo_checker.js
const fs = require('fs');
module.exports = {
  init: ()=>console.log('[SEO] initialized'),
  onFileChange: (projectPath, filename) => {
    if (!filename.endsWith('.html')) return;
    const content = fs.readFileSync(`${projectPath}/${filename}`, 'utf8');
    if (!/meta name="description"/i.test(content)) console.warn('[SEO] missing meta description in', filename);
    if (!/<h1/i.test(content)) console.warn('[SEO] missing H1 in', filename);
  }
};
