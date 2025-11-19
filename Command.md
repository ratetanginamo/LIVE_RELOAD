# COMMANDS.md — LR (Live Reload) Full Command Reference

This document lists **all commands** used to run, manage, debug, extend, and deploy the LR server framework.

LR = Custom Live Reload Server  
Platform = Termux, Linux, Android, VPS, Local PC  
Author = You  

---

# 📦 1. Installation

## Install Node.js (Termux)
```bash
pkg install nodejs -y
```
Install Git
```bash
pkg install git -y

```
Clone LR project
```bash
git clone https://github.com/ratetanginamo/LIVE_RELOAD.git
cd LIVE_RELOAD
```
🚀 2. Running the Server
Start LR server (default)
```bash
node bin/lr.js public
```
Start with custom port
```bash
node bin/lr.js public --port 5000
```
Start using shell script
```bash
./start.sh
```
Start server in background (Termux)
``
nohup node bin/lr.js public &
``
