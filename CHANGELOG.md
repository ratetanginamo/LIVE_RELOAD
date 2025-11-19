# Changelog - Nano LR (Live Reload Framework)

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-19
### Added
- Initial release of Nano LR for Termux.
- Fully working HTTP + WebSocket server (`lr.js`) serving `dashboard/`.
- Auto-reload feature for HTML, CSS, and JS files.
- `dashboard/` folder with sample HTML, CSS, JS files.
- Module system to extend LR functionalities.

### Modules
- **module12.js**: Real-time error scanner and live dashboard notifications.
- **accessibility_checker.js**: Checks HTML accessibility issues.
- **animation_lr.js**: Handles animations in live reload environment.
- **auto_refresh.js**: Forces auto-refresh for clients.
- **console_capture.js**: Captures console logs from clients.
- **dependency_watcher.js**: Monitors dependency changes.
- **git_sync.js**: Syncs project changes with git.
- **live_metrics.js**: Tracks performance metrics.
- **live_perf.js**: Monitors page performance.
- **mobile_preview.js**: Mobile layout preview in real-time.
- **seo_checker.js**: Monitors SEO issues in HTML.
- **style_guide_checker.js**: Checks CSS/HTML style guides compliance.

### Fixed
- Module12 now reuses main LR WebSocket server to prevent `EADDRINUSE`.
- Auto-detects project folder and reloads browser without manual script injection.
- Fixed missing module loading issues (`fs` and path errors).

### Changed
- Updated file watcher to handle recursive directories.
- Added logging for file changes and module notifications.

---

## [0.9.0] - 2025-11-18
### Added
- Prototype LR server.
- Basic modules: example_module.js.
- Manual file watching and reload simulation.
