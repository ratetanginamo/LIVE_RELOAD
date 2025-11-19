SIMPLE COMMANDS (SHORT VERSION)
📦 Install
pkg install nodejs git -y

git clone https://github.com/ratetanginamo/LIve_RELOAD.git
cd LIVE_RELOAD
npm install

🚀 Run Server
node bin/lr.js public

⚡ Restart Server
```bash
pkill node
node bin/lr.js public
```
🗂 Move Files
```bash
mv index.html public/
mv style.css public/
mv script.js public/
```
🧩 Create Module
```bash
nano lr_pkg/modules/moduleX.js
```
🔥 Reload Modules
```bash
node bin/lr.js public
```
🧹 Clean
```bash
pkill node
npm cache clean --force
