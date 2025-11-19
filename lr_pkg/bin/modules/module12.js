// module12.js - full-featured scanner (uses jsdom + css)
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const css = require('css');
const WebSocket = require('ws');

let wsClients = [];
let wss = null;

function sendToClients(payload) {
  if (!wsClients.length) return;
  const data = JSON.stringify(payload);
  wsClients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(data); });
}

module.exports = {
  init: function() { console.log('[Module12] Error Scanner initialized'); },

  onFileChange: function(projectPath, filename) {
    const filePath = path.join(projectPath, filename);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];

    try {
      if (filename.endsWith('.js')) {
        try { new Function(content); } catch (e) { errors.push({file:filename,type:'JS Error',message:e.message}); }
      }
      if (filename.endsWith('.css')) {
        try {
          const ast = css.parse(content, { silent: true });
          if (ast.stylesheet.parsingErrors && ast.stylesheet.parsingErrors.length) {
            ast.stylesheet.parsingErrors.forEach(pe => errors.push({file:filename,type:'CSS Error',message:pe.reason}));
          }
        } catch (e) { errors.push({file:filename,type:'CSS Parse Error',message:e.message}); }
      }
      if (filename.endsWith('.html')) {
        try {
          const dom = new JSDOM(content);
          const doc = dom.window.document;
          if (!doc.querySelector('title')) errors.push({file:filename,type:'HTML Error',message:'Missing <title>'});
          if (!doc.querySelector('body')) errors.push({file:filename,type:'HTML Error',message:'Missing <body>'});
        } catch (e) { errors.push({file:filename,type:'HTML Parse Error',message:e.message}); }
      }
    } catch (e) {
      errors.push({file:filename,type:'Scanner Error',message:e.message});
    }

    // send errors to dashboard clients
    sendToClients(errors);
    // also log
    if (errors.length) errors.forEach(er => console.log('[Module12]', er.file, er.type, er.message));
  },

  startDashboardWS: function(wsPort=9001) {
    if (wss) return wss;
    wss = new WebSocket.Server({ port: wsPort });
    wss.on('connection', (ws) => {
      wsClients.push(ws);
      ws.on('close', () => wsClients = wsClients.filter(c => c !== ws));
      // send empty initially
      ws.send(JSON.stringify([]));
      console.log('[Module12] dashboard client connected');
    });
    console.log('[Module12] Dashboard WS listening on', wsPort);
    return wss;
  }
};
                                   
