// lr.js - Nano LR fully working HTTP + WebSocket server

const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

// Project folder
const projectFolder = process.argv[2] || path.join(__dirname, '../dashboard');
console.log(`[LR] Serving project folder: ${projectFolder}`);

// -------- Load Modules --------
const modulesDir = path.join(__dirname, '../modules');
const modules = {};

if (fs.existsSync(modulesDir)) {
    fs.readdirSync(modulesDir).forEach(file => {
        if (file.endsWith('.js')) {
            try {
                const mod = require(path.join(modulesDir, file));
                modules[file] = mod;
                console.log(`[LR] Loaded module: ${file}`);
            } catch (e) {
                console.error(`[LR] Error loading ${file}:`, e.message);
            }
        }
    });
} else {
    console.warn('[LR] Modules folder not found:', modulesDir);
}

// -------- HTTP Server --------
const server = http.createServer((req, res) => {
    let filePath = path.join(projectFolder, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json'
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
            res.end(content);
        }
    });
});

server.listen(3000, () => console.log('[LR] HTTP Server running at http://localhost:3000/'));

// -------- WebSocket Server for Live Reload --------
const wss = new WebSocket.Server({ server });
wss.on('connection', ws => console.log('[LR] WebSocket client connected'));

// Broadcast reload to all clients
function broadcastReload(file) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'reload', file }));
        }
    });
}

// Initialize modules that need WS access
if (modules['module12.js'] && modules['module12.js'].init) {
    modules['module12.js'].init(wss);
}

// -------- Watch Project Folder --------
fs.watch(projectFolder, { recursive: true }, (eventType, filename) => {
    if (filename) {
        console.log(`[LR] File changed: ${filename}`);
        broadcastReload(filename);

        // Notify modules
        Object.values(modules).forEach(mod => {
            if (mod.onFileChange) mod.onFileChange(filename);
        });
    }
});
                             
