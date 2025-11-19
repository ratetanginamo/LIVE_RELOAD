#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = 3000;
const WS_PORT = 8080;
const PROJECT_ARG = process.argv[2] ? process.argv[2] : '..';
const PROJECT_PATH = path.resolve(__dirname, PROJECT_ARG);
const MODULES_PATH = path.join(__dirname, '../modules');

console.log('[LR] starting. project:', PROJECT_PATH);

// Load modules
let modules = [];
if (fs.existsSync(MODULES_PATH)) {
  fs.readdirSync(MODULES_PATH).forEach(file => {
    if (!file.endsWith('.js')) return;
    try {
      const mod = require(path.join(MODULES_PATH, file));
      modules.push(mod);
      if (typeof mod.init === 'function') mod.init();
      console.log('[LR] loaded module:', file);
    } catch (err) {
      console.error('[LR] failed to load module', file, err.message);
    }
  });
}

// WebSocket server for LR client (used only if needed)
const wsServer = new WebSocket.Server({ port: WS_PORT });
wsServer.on('connection', socket => console.log('[LR] browser connected (ws)'));

// Watch files
fs.watch(PROJECT_PATH, { recursive: true }, (evt, filename) => {
  if (!filename) return;
  console.log('[LR] change:', filename);
  modules.forEach(m => { if (typeof m.onFileChange === 'function') m.onFileChange(PROJECT_PATH, filename); });
  wsServer.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send('reload'); });
});

// HTTP server serving PROJECT_PATH and auto-injecting client for HTML
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(PROJECT_PATH, reqPath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not Found');
      return;
    }
    if (filePath.endsWith('.html')) {
      const injected = data.replace(/<\/body>/i, `<script>
      (function(){
        const ws = new WebSocket('ws://localhost:${WS_PORT}');
        ws.onmessage = function(e){ if(e.data==='reload') location.reload(); };
      })();
      </script></body>`);
      res.writeHead(200, {'Content-Type':'text/html'}); res.end(injected);
    } else {
      // try to detect content type
      const ext = path.extname(filePath).toLowerCase();
      const map = {'.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
      const type = map[ext] || 'text/plain';
      res.writeHead(200, {'Content-Type': type});
      // send raw file chunk for binary too
      if (['.png','.jpg','.svg'].includes(ext)) {
        fs.readFile(filePath, (err2, buf) => { if (err2) { res.writeHead(500); res.end('Error'); } else res.end(buf); });
      } else res.end(data);
    }
  });
});

server.listen(PORT, () => console.log(`[LR] HTTP server running at http://localhost:${PORT}`));
  
