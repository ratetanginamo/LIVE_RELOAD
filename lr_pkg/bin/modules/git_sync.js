// git_sync.js
const { exec } = require('child_process');
module.exports = {
  init: ()=>console.log('[GitSync] initialized'),
  onFileChange: (projectPath, filename) => {
    exec(`cd "${projectPath}" && git status -s`, (err, out) => {
      if(err) console.warn('[GitSync] git not available or error');
      else console.log('[GitSync] status:\n', out.trim());
    });
  }
};
