// dependency_watcher.js
const fs = require('fs');
module.exports = {
  init: ()=>console.log('[DepWatcher] initialized'),
  onFileChange: (projectPath, filename) => {
    // if file references local resources, quick check they exist
    const filePath = `${projectPath}/${filename}`;
    if (!fs.existsSync(filePath)) console.warn('[DepWatcher] changed file missing', filename);
  }
};
