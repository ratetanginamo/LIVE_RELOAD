// Module12 - Error scanner + live dashboard
const WebSocket = require('ws');

let mainWSS = null;

// Use main LR WebSocket server
function init(wsServer) {
    mainWSS = wsServer;
    console.log('[Module12] Using main LR WebSocket server');
}

// Notify clients of file changes
function notifyClients(filename) {
    if (!mainWSS) return;
    mainWSS.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'module12', file: filename }));
        }
    });
}

// Example callback when a file changes
function onFileChange(file) {
    console.log(`[Module12] Detected file change: ${file}`);
    notifyClients(file);
}

// Optional: fallback WS server (if not using main LR server)
function startDashboardWS(startPort = 9001) {
    if (mainWSS) return; // Already using main WS

    let port = startPort;
    const maxPort = 9100;

    function tryListen() {
        try {
            const wss = new WebSocket.Server({ port });
            console.log(`[Module12] Dashboard WS started on ${port}`);
            wss.on('connection', ws => console.log('[Module12] Client connected'));
        } catch (err) {
            if (err.code === 'EADDRINUSE') {
                port++;
                if (port > maxPort) throw new Error('No free ports available for Module12 WS');
                tryListen();
            } else {
                throw err;
            }
        }
    }

    tryListen();
}

module.exports = {
    init,
    startDashboardWS,
    onFileChange
};
