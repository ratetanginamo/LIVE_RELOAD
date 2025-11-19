# Nano LR — Live Reload Development Environment for Termux

Nano LR is a lightweight, modular live-reload server for web development on Termux.  
It supports HTML, CSS, and JavaScript projects with **real-time file watching, live reload, animations, and error scanning**.  

---

## **Features**

- **Live Reload:** Automatically updates your browser when project files change.
- **Module12:** Scans JavaScript, CSS, and HTML for runtime errors and validation issues.
- **animation_lr.js:** Adds smooth visual animations on file changes.
- **Live Performance Monitor:** Tracks JS execution and DOM rendering times.
- **Auto Refresh:** Automatically reloads pages when critical files change.
- **Style Guide Checker:** Ensures consistent CSS rules.
- **Dependency Watcher:** Alerts if project dependencies are missing or changed.
- **Git Sync:** Displays `git status` in real-time for your project.
- **Mobile Preview:** Simulates mobile layouts in the dashboard.
- **Console Capture:** Streams console logs, warnings, and errors to dashboard.
- **Accessibility Checker:** Highlights accessibility issues in HTML.
- **SEO Checker:** Validates SEO tags and structure in your HTML.
- **Live Metrics:** Counts elements, images, scripts, and network requests in real-time.

---

## **Folder Structure**
```
myproject/
├── dashboard/ # Your web project
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── dashboard.js # WebSocket client
├── lr_pkg/ # Nano LR core + modules
│ ├── bin/
│ │ └── lr.js
│ └── modules/
│ ├── module12.js
│ ├── animation_lr.js
│ ├── live_perf.js
│ ├── auto_refresh.js
│ ├── style_guide_checker.js
│ ├── dependency_watcher.js
│ ├── git_sync.js
│ ├── mobile_preview.js
│ ├── console_capture.js
│ ├── accessibility_checker.js
│ ├── seo_checker.js
│ └── live_metrics.js
└── start.sh # Launch script
