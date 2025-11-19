#!/bin/bash
set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
echo "[start] base: $BASE"

# Move to lr_pkg
cd "$BASE/lr_pkg"

# Install dependencies (local)
echo "[start] Installing npm dependencies (jsdom, ws, css)..."
npm install jsdom ws css || true

# Start Module12 dashboard WS (background)
node -e "
const m = require('./modules/module12.js');
if (m && typeof m.startDashboardWS === 'function') {
  m.startDashboardWS(9001);
  console.log('[start] Module12 dashboard WS started on 9001');
}
" &

# Start lr server (serve ../dashboard)
echo "[start] Starting LR server (serving $BASE/dashboard)..."
node bin/lr.js ../dashboard
