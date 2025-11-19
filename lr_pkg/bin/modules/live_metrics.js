// live_metrics.js (skeleton)
const { JSDOM } = require('jsdom');
const fs = require('fs');
module.exports = {
  init: ()=>console.log('[LiveMetrics] initialized'),
  onFileChange: (projectPath, filename) => {
    try {
      if (!filename.endsWith('.html')) return;
      const content = fs.readFileSync(`${projectPath}/${filename}`, 'utf8');
      const dom = new JSDOM(content);
      const doc = dom.window.document;
      const metrics = {
        images: doc.querySelectorAll('img').length,
        scripts: doc.querySelectorAll('script').length,
        links: doc.querySelectorAll('a').length
      };
      console.log('[LiveMetrics]', filename, metrics);
    } catch(e) { console.warn('[LiveMetrics] error', e.message); }
  }
};
