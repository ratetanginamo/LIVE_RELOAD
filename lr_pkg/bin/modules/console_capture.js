// console_capture.js (skeleton)
module.exports = {
  init: ()=>console.log('[ConsoleCapture] initialized'),
  onFileChange: (projectPath, filename) => {
    // To capture console logs requires injected client code. Placeholder:
    console.log('[ConsoleCapture] noticed change', filename);
  }
};
