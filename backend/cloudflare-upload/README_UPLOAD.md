# Web Direct Upload

Upload this `cloudflare-upload` folder instead of the full `backend` folder.

This folder intentionally excludes:

- `.env`
- `node_modules`
- source-only Express server files
- local build artifacts
- `wrangler.toml`

Files included:

- `_worker.js` for Cloudflare Pages Direct Upload flows
- `worker.js` as the same Worker code for single-file Workers upload flows

If the web uploader blocks `worker.js`, upload only `_worker.js`.

After upload, set these Cloudflare variables or secrets:

```env
EXTENSION_SHARED_TOKEN=your_extension_shared_token
YOUTUBE_API_KEY=your_youtube_data_api_key
CORS_ORIGIN=https://www.youtube.com,chrome-extension://your-extension-id
```
