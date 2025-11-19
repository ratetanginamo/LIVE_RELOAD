// auto_refresh.js
module.exports = {
  init: ()=>console.log('[AutoRefresh] initialized'),
  onFileChange: (projectPath, filename) => {
    // You could broadcast reload through WS server if available (lr.js uses wsServer)
    console.log('[AutoRefresh] request reload for', filename);
  }
};
