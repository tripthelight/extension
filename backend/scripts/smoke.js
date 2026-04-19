/**
 * Very small smoke test for local manual verification.
 *
 * Usage:
 *   1) Start the server: npm run dev
 *   2) Run: npm run smoke
 */

const response = await fetch('http://localhost:8080/api/v1/videos/resolve', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    videoIds: ['dQw4w9WgXcQ']
  })
});

const data = await response.json();
console.log(JSON.stringify({ status: response.status, data }, null, 2));
