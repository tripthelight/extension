# Cloudflare Workers Upload

## Upload target

Use this `backend` folder as the upload source.

Required Worker files:

- `worker.js`
- `wrangler.toml`
- `package.json`
- `package-lock.json`

Do not upload `.env` or `node_modules`.

## Required variables

Set these in Cloudflare Workers > Settings > Variables and Secrets:

```env
EXTENSION_SHARED_TOKEN=your_extension_shared_token
YOUTUBE_API_KEY=your_youtube_data_api_key
CORS_ORIGIN=https://www.youtube.com,chrome-extension://your-extension-id
```

Optional values:

```env
YOUTUBE_API_BASE_URL=https://www.googleapis.com/youtube/v3
YOUTUBE_API_TIMEOUT_MS=7000
YOUTUBE_BATCH_SIZE=50
REDIS_PREFIX=ytrs
REDIS_VIDEO_TTL_SECONDS=604800
RATE_LIMIT_WINDOW_MS=10000
RATE_LIMIT_MAX=30
RESOLVE_RATE_LIMIT_WINDOW_MS=10000
RESOLVE_RATE_LIMIT_MAX=20
MAX_VIDEO_IDS_PER_REQUEST=100
```

## Cache options

The Worker runs without a cache, but caching is recommended to reduce YouTube API calls.

Option 1: Cloudflare KV

1. Create a KV namespace in Cloudflare.
2. Bind it to the Worker with the name `CACHE_KV`.
3. If deploying with Wrangler, uncomment the `kv_namespaces` block in `wrangler.toml`.

Option 2: Upstash Redis REST

Set these Worker secrets:

```env
UPSTASH_REDIS_REST_URL=your_upstash_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
```

## Rate limiting

Wrangler deploys two Cloudflare Workers Rate Limiting bindings:

- `GLOBAL_RATE_LIMITER`: 60 requests per 60 seconds per client identity
- `RESOLVE_RATE_LIMITER`: 30 resolve requests per 60 seconds per client identity

The Worker also keeps the existing in-memory limiter as a fallback for local
development or web-upload deployments without rate limit bindings.

## Cost safety switches

These variables are deployed through `wrangler.toml`:

```env
WORKER_ENABLED=true
REQUIRE_ALLOWED_ORIGIN=true
DAILY_YOUTUBE_FETCH_LIMIT=1000
MAX_VIDEO_IDS_PER_REQUEST=50
CHALLENGE_REQUIRED=true
CHALLENGE_TTL_SECONDS=60
```

Set `WORKER_ENABLED=false` in Cloudflare Worker variables and redeploy/save the
Worker to immediately close all non-health routes.

`DAILY_YOUTUBE_FETCH_LIMIT` caps daily upstream YouTube fetch batches. Cached
responses continue to avoid YouTube API calls.

`CHALLENGE_REQUIRED=true` requires clients to call `POST /api/v1/challenge`
before `POST /api/v1/videos/resolve`. The challenge is short-lived, signed by
the Worker with `CHALLENGE_SECRET`, and can only be used once.

Set this Worker secret before deploying challenge enforcement:

```bash
npx wrangler secret put CHALLENGE_SECRET
```

## Local checks

```bash
npm run check
npm run check:worker
npm run worker:dry-run
```

## Endpoints

- `GET /healthz`
- `POST /api/v1/challenge`
- `GET /api/v1/stats`
- `POST /api/v1/videos/resolve`

The challenge, stats, and resolve endpoints require this header:

```http
x-extension-token: your_extension_shared_token
```

`GET /api/v1/stats` returns daily Worker-side counters for upstream YouTube API
requests made after this stats code was deployed.
