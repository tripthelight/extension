# AGENT.md

## 1) Project Summary
- This repository builds a browser extension (Manifest V3) that hides YouTube recommendations by channel/video rules.
- The currently implemented extension is `channelBlocker`.
- Runtime model: popup UI + YouTube content script.

## 2) Main Features
- Injects two custom actions into the YouTube three-dot dropdown menu:
  - `Channel recommendations off` (`btn-blocking`)
  - `Not interested` (`btn-interest`)
- `Channel recommendations off`
  - Resolves channel info from clicked `videoId`
  - Stores blocked channel names
  - Hides matching recommendation items with `blocking-recomn`
- `Not interested`
  - Stores blocked `videoId`
  - Hides matching recommendation items with `blocking-recomn`
- Shorts support:
  - Hides blocked-channel Shorts tiles in regular pages
  - On `/shorts/...`, removes current blocked Shorts and moves to next item

## 3) Stack
- Build: `vite` with custom output plugin (`vite.config.js`)
- Styling: `sass`
- Language: JS (ESM) + JSDoc typing (`checkJs`)
- Extension standard: Chrome Extension Manifest V3

## 4) Important Paths
- `src/extensions/channelBlocker/manifest.json`
  - extension metadata, permissions, popup, content script
- `src/extensions/channelBlocker/index.html`
  - popup HTML
- `src/extensions/channelBlocker/js/script.js`
  - popup entry
- `src/extensions/channelBlocker/contents.js`
  - content script entry
- `src/js/channelBlocker/popup/main.js`
  - popup logic (input/list/add/remove)
- `src/js/channelBlocker/contents/**`
  - content logic (menu injection, URL watching, DOM watching, blocking, API calls)
- `src/js/store/channelBlocker/contents/**`
  - runtime and Shorts state stores

## 5) Data Model
- IndexedDB: `extension-db-ycb` (version 1)
  - store `b`: blocked channel names (`key: channelNames`, Blob(JSON string[]))
  - store `i`: not-interested video IDs (`key: videoIds`, Blob(JSON string[]))
  - store `s`: Shorts cache (`key: shorts`, object map)
- Chrome storage local:
  - key `blockedChannels` (`{ nmes: [], urls: [], links: [] }`)
  - used by popup rendering/editing

## 6) Content Script Flow
1. Wait for `document.readyState === "complete"`
2. Initialize IndexedDB (`openDB()`)
3. Bind global click capture to detect three-dot menu clicks
4. Extract `videoId`, then inject custom buttons into active dropdown
5. On button click, persist data and immediately apply hide classes
6. Re-apply on YouTube SPA navigation (`pushState`, `replaceState`, `popstate`, `yt-navigate-finish`) and DOM mutations (`MutationObserver`)

## 7) External API Dependencies
- Channel lookup: `https://www.youtube.com/youtubei/v1/player`
- Shorts metadata lookup: `https://www.googleapis.com/youtube/v3/videos`
  - requires `import.meta.env.VITE_API_KEY`

## 8) Build and Output
- Commands:
  - `npm run dev`
  - `npm run build`
  - `npm run build:watch`
- Custom Vite plugin scans `src/extensions/*` and emits stable extension layout.
- Verified build output includes:
  - `dist/channelBlocker/manifest.json`
  - `dist/channelBlocker/index.html`
  - `dist/channelBlocker/contents.js`
  - `dist/channelBlocker/js/script.js`
  - `dist/channelBlocker/contents.css`
  - `dist/channelBlocker/css/style.css`

## 9) Current Notes / Risks
- Build was validated successfully in this environment on 2026-04-14.
- Root `index.html` and `src/main.js` are placeholder Vite template artifacts, not core extension runtime.
- Data source split exists:
  - popup list data uses `chrome.storage.local.blockedChannels`
  - content blocking uses IndexedDB stores `b`/`i`
  - this can cause state mismatch between popup list and actual blocking behavior.
- Some repository files/comments appear to have encoding issues (garbled Korean text in terminal output).

## 10) Adding Another Extension Package
- Create `src/extensions/<name>/` with:
  - `manifest.json`
  - `index.html` (popup)
  - `js/script.js` (popup entry)
  - `contents.js` (content script entry)
- The current Vite config auto-discovers this structure during build.
