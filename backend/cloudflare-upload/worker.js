const DEFAULTS = {
  CORS_ORIGIN: 'https://www.youtube.com',
  YOUTUBE_API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
  YOUTUBE_API_TIMEOUT_MS: 7000,
  YOUTUBE_BATCH_SIZE: 50,
  REDIS_PREFIX: 'ytrs',
  REDIS_VIDEO_TTL_SECONDS: 60 * 60 * 24 * 7,
  RATE_LIMIT_WINDOW_MS: 10_000,
  RATE_LIMIT_MAX: 30,
  RESOLVE_RATE_LIMIT_WINDOW_MS: 10_000,
  RESOLVE_RATE_LIMIT_MAX: 20,
  MAX_VIDEO_IDS_PER_REQUEST: 100,
  DAILY_YOUTUBE_FETCH_LIMIT: 1_000,
  CHALLENGE_TTL_SECONDS: 60
};

const PLACEHOLDER_EXTENSION_TOKEN = 'replace_with_long_random_token';

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer'
};

const pendingByVideoId = new Map();
const rateLimitBuckets = new Map();

export default {
  async fetch(request, env, ctx) {
    const startedAt = Date.now();
    const config = buildConfig(env);
    const corsHeaders = buildCorsHeaders(request, config);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    try {
      const url = new URL(request.url);

      if (url.pathname !== '/healthz' && !config.WORKER_ENABLED) {
        return jsonError('WORKER_DISABLED', 'Worker is temporarily disabled', 503, corsHeaders);
      }

      if (url.pathname !== '/healthz' && config.REQUIRE_ALLOWED_ORIGIN && !isAllowedOrigin(request, config)) {
        return jsonError('FORBIDDEN_ORIGIN', 'Origin is not allowed', 403, corsHeaders);
      }

      if (url.pathname !== '/healthz') {
        const globalLimit = await checkWorkerRateLimit(request, env.GLOBAL_RATE_LIMITER, {
          windowMs: config.RATE_LIMIT_WINDOW_MS,
          max: config.RATE_LIMIT_MAX,
          name: 'Global',
          scope: 'global',
          key: getClientIdentity(request)
        });

        if (!globalLimit.ok) {
          return jsonError('RATE_LIMITED', globalLimit.message, 429, corsHeaders);
        }
      }

      if (url.pathname === '/healthz' && request.method === 'GET') {
        const cache = await checkCacheHealth(env, config);
        return jsonResponse({
          ok: true,
          app: 'up',
          runtime: 'cloudflare-workers',
          cache,
          workerEnabled: config.WORKER_ENABLED,
          requiredVariables: buildRequiredVariableStatus(config),
          rateLimitBindings: {
            global: Boolean(env.GLOBAL_RATE_LIMITER),
            resolve: Boolean(env.RESOLVE_RATE_LIMITER)
          },
          dailyLimits: {
            youtubeFetchLimit: config.DAILY_YOUTUBE_FETCH_LIMIT
          },
          challenge: {
            required: config.CHALLENGE_REQUIRED,
            ttlSeconds: config.CHALLENGE_TTL_SECONDS,
            configured: Boolean(config.CHALLENGE_SECRET)
          }
        }, 200, corsHeaders);
      }

      if (url.pathname === '/api/v1/challenge' && request.method === 'POST') {
        return await handleChallenge(request, config, corsHeaders);
      }

      if (url.pathname === '/api/v1/stats' && request.method === 'GET') {
        return await handleStats(request, env, config, corsHeaders);
      }

      if (url.pathname === '/api/v1/videos/resolve' && request.method === 'POST') {
        return await handleResolve(request, env, config, corsHeaders);
      }

      return jsonError('NOT_FOUND', 'Route not found', 404, corsHeaders);
    } catch (error) {
      console.error('Worker request failed', {
        message: error?.message,
        stack: error?.stack,
        elapsedMs: Date.now() - startedAt
      });

      return jsonError(
        error?.code ?? 'INTERNAL_ERROR',
        error?.message ?? 'Internal Server Error',
        error?.statusCode ?? 500,
        corsHeaders
      );
    }
  }
};

async function handleStats(request, env, config, corsHeaders) {
  assertRequiredConfig(config);

  const token = String(request.headers.get('x-extension-token') ?? '').trim();
  if (!token || token !== config.EXTENSION_SHARED_TOKEN) {
    return jsonError('UNAUTHORIZED_EXTENSION', 'Invalid extension token', 401, corsHeaders);
  }

  if (!env.CACHE_KV) {
    return jsonError('STATS_UNAVAILABLE', 'Stats store is unavailable', 503, corsHeaders);
  }

  const date = getUtcDateKey();
  const stats = await readDailyStats(env, config, date);

  return jsonResponse({
    ok: true,
    date,
    stats
  }, 200, corsHeaders);
}

async function handleChallenge(request, config, corsHeaders) {
  assertRequiredConfig(config);

  const token = String(request.headers.get('x-extension-token') ?? '').trim();
  if (!token || token !== config.EXTENSION_SHARED_TOKEN) {
    return jsonError('UNAUTHORIZED_EXTENSION', 'Invalid extension token', 401, corsHeaders);
  }

  const origin = getRequestOrigin(request);
  if (!origin) {
    return jsonError('FORBIDDEN_ORIGIN', 'Origin is required', 403, corsHeaders);
  }

  const nonce = createNonce();
  const expiresAt = Date.now() + (config.CHALLENGE_TTL_SECONDS * 1000);
  const signature = await signChallenge(config, nonce, expiresAt, origin);

  return jsonResponse({
    ok: true,
    nonce,
    expiresAt,
    signature
  }, 200, corsHeaders);
}

async function handleResolve(request, env, config, corsHeaders) {
  assertRequiredConfig(config);

  const token = String(request.headers.get('x-extension-token') ?? '').trim();
  if (!token || token !== config.EXTENSION_SHARED_TOKEN) {
    return jsonError('UNAUTHORIZED_EXTENSION', 'Invalid extension token', 401, corsHeaders);
  }

  if (config.CHALLENGE_REQUIRED) {
    const challengeResult = await verifyChallenge(request, env, config);
    if (!challengeResult.ok) {
      return jsonError(challengeResult.code, challengeResult.message, challengeResult.status, corsHeaders);
    }
  }

  const resolveLimit = await checkWorkerRateLimit(request, env.RESOLVE_RATE_LIMITER, {
    windowMs: config.RESOLVE_RATE_LIMIT_WINDOW_MS,
    max: config.RESOLVE_RATE_LIMIT_MAX,
    name: 'Resolve',
    scope: 'resolve',
    key: getAuthenticatedClientIdentity(request, token)
  });

  if (!resolveLimit.ok) {
    return jsonError('RATE_LIMITED', resolveLimit.message, 429, corsHeaders);
  }

  const body = await readJsonBody(request);
  const rawVideoIds = body?.videoIds;

  if (!Array.isArray(rawVideoIds)) {
    return jsonError('INVALID_BODY', 'videoIds must be an array', 400, corsHeaders);
  }

  if (rawVideoIds.length < 1) {
    return jsonError('INVALID_BODY', 'videoIds must contain at least 1 item', 400, corsHeaders);
  }

  if (rawVideoIds.length > config.MAX_VIDEO_IDS_PER_REQUEST) {
    return jsonError(
      'INVALID_BODY',
      `videoIds must contain at most ${config.MAX_VIDEO_IDS_PER_REQUEST} items`,
      400,
      corsHeaders
    );
  }

  const videoIds = normalizeVideoIds(rawVideoIds);
  if (videoIds.length === 0) {
    return jsonError('INVALID_BODY', 'videoIds must contain at least 1 non-empty item', 400, corsHeaders);
  }

  const result = await resolveVideos(videoIds, env, config);

  return jsonResponse({
    ok: true,
    ...result
  }, 200, corsHeaders);
}

async function resolveVideos(videoIds, env, config) {
  const cachedMap = await getCachedVideos(videoIds, env, config);
  const cached = [];
  const found = [];
  const misses = [];

  for (const videoId of videoIds) {
    const cachedItem = cachedMap.get(videoId);

    if (cachedItem) {
      cached.push(videoId);
      found.push(cachedItem);
      continue;
    }

    misses.push(videoId);
  }

  const fetchedItems = await resolveMissesWithDedupe(misses, env, config);
  const fetchedMap = new Map(fetchedItems.map((item) => [item.videoId, item]));

  for (const videoId of misses) {
    const item = fetchedMap.get(videoId);
    if (item) {
      found.push(item);
    }
  }

  return {
    requested: [...videoIds],
    found: sortByRequestOrder(videoIds, found),
    missing: misses.filter((videoId) => !fetchedMap.has(videoId)),
    cached,
    fetched: fetchedItems.map((item) => item.videoId)
  };
}

async function resolveMissesWithDedupe(videoIds, env, config) {
  if (videoIds.length === 0) {
    return [];
  }

  const waiters = [];
  const freshIds = [];

  for (const videoId of videoIds) {
    const existingPromise = pendingByVideoId.get(videoId);

    if (existingPromise) {
      waiters.push(existingPromise);
      continue;
    }

    freshIds.push(videoId);
  }

  if (freshIds.length > 0) {
    const batchPromise = fetchBatchAndCache(freshIds, env, config);

    for (const videoId of freshIds) {
      const singlePromise = batchPromise.then((items) => items.find((item) => item.videoId === videoId) ?? null);
      pendingByVideoId.set(videoId, singlePromise);
      waiters.push(singlePromise);
    }
  }

  const settled = await Promise.all(waiters);
  return settled.filter(Boolean);
}

async function fetchBatchAndCache(freshIds, env, config) {
  try {
    await assertYoutubeFetchBudget(env, config);
    const items = await fetchVideosFromYouTube(freshIds, env, config);
    await setCachedVideos(items, env, config);
    return items;
  } finally {
    for (const videoId of freshIds) {
      pendingByVideoId.delete(videoId);
    }
  }
}

async function assertYoutubeFetchBudget(env, config) {
  if (!env.CACHE_KV || config.DAILY_YOUTUBE_FETCH_LIMIT <= 0) {
    return;
  }

  const key = `budget:youtube-fetch:${getUtcDateKey()}`;
  const current = Number.parseInt((await env.CACHE_KV.get(key)) ?? '0', 10);

  if (Number.isFinite(current) && current >= config.DAILY_YOUTUBE_FETCH_LIMIT) {
    const error = new Error('Daily YouTube fetch limit exceeded');
    error.statusCode = 503;
    error.code = 'DAILY_UPSTREAM_LIMIT_EXCEEDED';
    throw error;
  }

  await env.CACHE_KV.put(key, String((Number.isFinite(current) ? current : 0) + 1), {
    expirationTtl: 60 * 60 * 48
  });
}

async function incrementDailyStat(env, config, name, amount) {
  if (!env.CACHE_KV) {
    return;
  }

  const key = getDailyStatKey(config, getUtcDateKey(), name);
  const current = Number.parseInt((await env.CACHE_KV.get(key)) ?? '0', 10);
  const next = (Number.isFinite(current) ? current : 0) + amount;

  await env.CACHE_KV.put(key, String(next), {
    expirationTtl: 60 * 60 * 24 * 30
  });
}

async function readDailyStats(env, config, date) {
  const names = [
    'youtubeVideosRequests',
    'youtubeVideoIdsRequested',
    'youtubeChannelsRequests',
    'youtubeChannelIdsRequested'
  ];

  const values = await Promise.all(
    names.map((name) => env.CACHE_KV.get(getDailyStatKey(config, date, name)))
  );

  return Object.fromEntries(
    names.map((name, index) => [name, Number.parseInt(values[index] ?? '0', 10) || 0])
  );
}

function getDailyStatKey(config, date, name) {
  return redisKey(config, 'stats', date, name);
}

async function verifyChallenge(request, env, config) {
  if (!env.CACHE_KV) {
    return {
      ok: false,
      status: 503,
      code: 'CHALLENGE_STORE_UNAVAILABLE',
      message: 'Challenge store is unavailable'
    };
  }

  const nonce = String(request.headers.get('x-resolver-nonce') ?? '').trim();
  const expiresAt = Number.parseInt(String(request.headers.get('x-resolver-expires-at') ?? ''), 10);
  const signature = String(request.headers.get('x-resolver-signature') ?? '').trim();
  const origin = getRequestOrigin(request);

  if (!nonce || !Number.isFinite(expiresAt) || !signature || !origin) {
    return {
      ok: false,
      status: 401,
      code: 'INVALID_CHALLENGE',
      message: 'Missing resolver challenge'
    };
  }

  if (expiresAt < Date.now()) {
    return {
      ok: false,
      status: 401,
      code: 'EXPIRED_CHALLENGE',
      message: 'Resolver challenge expired'
    };
  }

  if (expiresAt > Date.now() + (config.CHALLENGE_TTL_SECONDS * 1000) + 5_000) {
    return {
      ok: false,
      status: 401,
      code: 'INVALID_CHALLENGE',
      message: 'Resolver challenge is outside the allowed time window'
    };
  }

  const expectedSignature = await signChallenge(config, nonce, expiresAt, origin);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return {
      ok: false,
      status: 401,
      code: 'INVALID_CHALLENGE',
      message: 'Resolver challenge signature is invalid'
    };
  }

  const usedKey = redisKey(config, 'challenge', 'used', nonce);
  const alreadyUsed = await env.CACHE_KV.get(usedKey);
  if (alreadyUsed) {
    return {
      ok: false,
      status: 401,
      code: 'REPLAYED_CHALLENGE',
      message: 'Resolver challenge was already used'
    };
  }

  await env.CACHE_KV.put(usedKey, '1', {
    expirationTtl: Math.max(60, config.CHALLENGE_TTL_SECONDS * 2)
  });

  return { ok: true };
}

async function signChallenge(config, nonce, expiresAt, origin) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(config.CHALLENGE_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${nonce}.${expiresAt}.${origin}`)
  );

  return base64UrlEncode(new Uint8Array(signature));
}

function createNonce() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

async function fetchVideosFromYouTube(videoIds, env, config) {
  const chunks = chunkArray(videoIds, config.YOUTUBE_BATCH_SIZE);
  const results = [];

  for (const ids of chunks) {
    const url = buildYoutubeApiUrl('videos', config);
    url.searchParams.set('part', 'id,snippet');
    url.searchParams.set('id', ids.join(','));
    url.searchParams.set('key', config.YOUTUBE_API_KEY);

    await incrementDailyStat(env, config, 'youtubeVideosRequests', 1);
    await incrementDailyStat(env, config, 'youtubeVideoIdsRequested', ids.length);

    const response = await fetchWithTimeout(url, config.YOUTUBE_API_TIMEOUT_MS);

    if (!response.ok) {
      const text = await response.text();
      const error = new Error(`YouTube API error: ${response.status} ${text}`);
      error.statusCode = 502;
      error.code = 'YOUTUBE_API_ERROR';
      throw error;
    }

    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    const channelHandleMap = await fetchChannelHandleMap(items, env, config);

    for (const item of items) {
      const channelId = item?.snippet?.channelId ?? '';
      results.push({
        videoId: item.id,
        channelId,
        channelName: item?.snippet?.channelTitle ?? '',
        channelHandle: channelHandleMap.get(channelId) ?? '',
        title: item?.snippet?.title ?? '',
        fetchedAt: new Date().toISOString()
      });
    }
  }

  return results;
}

async function fetchChannelHandleMap(videoItems, env, config) {
  const channelIds = Array.from(
    new Set(
      videoItems
        .map((item) => item?.snippet?.channelId ?? '')
        .filter((channelId) => channelId !== '')
    )
  );

  if (channelIds.length === 0) {
    return new Map();
  }

  const map = new Map();
  const chunks = chunkArray(channelIds, config.YOUTUBE_BATCH_SIZE);

  for (const ids of chunks) {
    const url = buildYoutubeApiUrl('channels', config);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('id', ids.join(','));
    url.searchParams.set('key', config.YOUTUBE_API_KEY);

    await incrementDailyStat(env, config, 'youtubeChannelsRequests', 1);
    await incrementDailyStat(env, config, 'youtubeChannelIdsRequested', ids.length);

    const response = await fetchWithTimeout(url, config.YOUTUBE_API_TIMEOUT_MS);
    if (!response.ok) {
      continue;
    }

    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];

    for (const item of items) {
      const channelId = String(item?.id ?? '');
      if (!channelId) continue;

      map.set(channelId, normalizeChannelHandle(item?.snippet?.customUrl ?? ''));
    }
  }

  return map;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        accept: 'application/json'
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function getCachedVideos(videoIds, env, config) {
  const map = new Map();
  if (videoIds.length === 0) {
    return map;
  }

  if (env.CACHE_KV) {
    const values = await Promise.all(videoIds.map((videoId) => env.CACHE_KV.get(redisKey(config, 'video', videoId))));

    values.forEach((value, index) => {
      if (!value) return;
      map.set(videoIds[index], JSON.parse(value));
    });

    return map;
  }

  if (!hasUpstashConfig(config)) {
    return map;
  }

  const commands = videoIds.map((videoId) => ['GET', redisKey(config, 'video', videoId)]);
  const values = await upstashPipeline(commands, config);

  values.forEach((entry, index) => {
    if (!entry?.result) return;
    map.set(videoIds[index], JSON.parse(entry.result));
  });

  return map;
}

async function setCachedVideos(items, env, config) {
  if (items.length === 0) {
    return;
  }

  if (env.CACHE_KV) {
    await Promise.all(
      items.map((item) =>
        env.CACHE_KV.put(redisKey(config, 'video', item.videoId), JSON.stringify(item), {
          expirationTtl: config.REDIS_VIDEO_TTL_SECONDS
        })
      )
    );
    return;
  }

  if (!hasUpstashConfig(config)) {
    return;
  }

  const commands = items.map((item) => [
    'SET',
    redisKey(config, 'video', item.videoId),
    JSON.stringify(item),
    'EX',
    config.REDIS_VIDEO_TTL_SECONDS
  ]);

  await upstashPipeline(commands, config);
}

async function checkCacheHealth(env, config) {
  if (env.CACHE_KV) {
    return 'kv';
  }

  if (!hasUpstashConfig(config)) {
    return 'disabled';
  }

  try {
    const [entry] = await upstashPipeline([['PING']], config);
    return entry?.result === 'PONG' ? 'upstash' : 'unknown';
  } catch {
    return 'down';
  }
}

async function upstashPipeline(commands, config) {
  const response = await fetch(`${config.UPSTASH_REDIS_REST_URL.replace(/\/+$/, '')}/pipeline`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.UPSTASH_REDIS_REST_TOKEN}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(commands)
  });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`Redis REST error: ${response.status} ${text}`);
    error.statusCode = 502;
    error.code = 'REDIS_REST_ERROR';
    throw error;
  }

  return response.json();
}

function checkRateLimit(request, options) {
  const now = Date.now();
  const key = `${options.scope}:${options.key || getClientIdentity(request)}`;
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs
    });
    cleanupRateLimitBuckets(now);
    return { ok: true };
  }

  bucket.count += 1;
  if (bucket.count > options.max) {
    return {
      ok: false,
      message: `${options.name} rate limit exceeded`
    };
  }

  return { ok: true };
}

async function checkWorkerRateLimit(request, limiter, options) {
  if (limiter?.limit) {
    const result = await limiter.limit({
      key: `${options.scope}:${options.key || getClientIdentity(request)}`
    });

    if (!result.success) {
      return {
        ok: false,
        message: `${options.name} rate limit exceeded`
      };
    }
  }

  return checkRateLimit(request, options);
}

function getAuthenticatedClientIdentity(request, token) {
  return `${getClientIdentity(request)}:${token.slice(0, 16)}`;
}

function getClientIdentity(request) {
  return request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('cf-ray') ||
    'unknown';
}

function cleanupRateLimitBuckets(now) {
  if (rateLimitBuckets.size < 10_000) {
    return;
  }

  for (const [key, bucket] of rateLimitBuckets) {
    if (now >= bucket.resetAt) {
      rateLimitBuckets.delete(key);
    }
  }
}

async function readJsonBody(request) {
  const text = await request.text();

  if (text.length > 100 * 1024) {
    const error = new Error('Request body too large');
    error.statusCode = 413;
    error.code = 'BODY_TOO_LARGE';
    throw error;
  }

  try {
    return JSON.parse(text);
  } catch {
    const error = new Error('Request body must be valid JSON');
    error.statusCode = 400;
    error.code = 'INVALID_JSON';
    throw error;
  }
}

function buildConfig(env) {
  return {
    NODE_ENV: readString(env.NODE_ENV, 'production'),
    CORS_ORIGIN: readString(env.CORS_ORIGIN, DEFAULTS.CORS_ORIGIN),
    EXTENSION_SHARED_TOKEN: readString(env.EXTENSION_SHARED_TOKEN, ''),
    YOUTUBE_API_KEY: readString(env.YOUTUBE_API_KEY, ''),
    YOUTUBE_API_BASE_URL: readString(env.YOUTUBE_API_BASE_URL, DEFAULTS.YOUTUBE_API_BASE_URL),
    YOUTUBE_API_TIMEOUT_MS: readPositiveInt(env.YOUTUBE_API_TIMEOUT_MS, DEFAULTS.YOUTUBE_API_TIMEOUT_MS),
    YOUTUBE_BATCH_SIZE: readPositiveInt(env.YOUTUBE_BATCH_SIZE, DEFAULTS.YOUTUBE_BATCH_SIZE, 50),
    REDIS_PREFIX: readString(env.REDIS_PREFIX, DEFAULTS.REDIS_PREFIX),
    REDIS_VIDEO_TTL_SECONDS: readPositiveInt(env.REDIS_VIDEO_TTL_SECONDS, DEFAULTS.REDIS_VIDEO_TTL_SECONDS),
    RATE_LIMIT_WINDOW_MS: readPositiveInt(env.RATE_LIMIT_WINDOW_MS, DEFAULTS.RATE_LIMIT_WINDOW_MS),
    RATE_LIMIT_MAX: readPositiveInt(env.RATE_LIMIT_MAX, DEFAULTS.RATE_LIMIT_MAX),
    RESOLVE_RATE_LIMIT_WINDOW_MS: readPositiveInt(
      env.RESOLVE_RATE_LIMIT_WINDOW_MS,
      DEFAULTS.RESOLVE_RATE_LIMIT_WINDOW_MS
    ),
    RESOLVE_RATE_LIMIT_MAX: readPositiveInt(env.RESOLVE_RATE_LIMIT_MAX, DEFAULTS.RESOLVE_RATE_LIMIT_MAX),
    MAX_VIDEO_IDS_PER_REQUEST: readPositiveInt(
      env.MAX_VIDEO_IDS_PER_REQUEST,
      DEFAULTS.MAX_VIDEO_IDS_PER_REQUEST,
      500
    ),
    DAILY_YOUTUBE_FETCH_LIMIT: readNonNegativeInt(
      env.DAILY_YOUTUBE_FETCH_LIMIT,
      DEFAULTS.DAILY_YOUTUBE_FETCH_LIMIT
    ),
    WORKER_ENABLED: readBoolean(env.WORKER_ENABLED, true),
    REQUIRE_ALLOWED_ORIGIN: readBoolean(env.REQUIRE_ALLOWED_ORIGIN, true),
    CHALLENGE_REQUIRED: readBoolean(env.CHALLENGE_REQUIRED, true),
    CHALLENGE_TTL_SECONDS: readPositiveInt(env.CHALLENGE_TTL_SECONDS, DEFAULTS.CHALLENGE_TTL_SECONDS, 300),
    CHALLENGE_SECRET: readString(env.CHALLENGE_SECRET, ''),
    UPSTASH_REDIS_REST_URL: readString(env.UPSTASH_REDIS_REST_URL, ''),
    UPSTASH_REDIS_REST_TOKEN: readString(env.UPSTASH_REDIS_REST_TOKEN, '')
  };
}

function assertRequiredConfig(config) {
  const missing = getMissingRequiredVariables(config);

  if (missing.length > 0) {
    const error = new Error(`Missing required Worker variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    error.code = 'CONFIG_ERROR';
    throw error;
  }
}

function getMissingRequiredVariables(config) {
  const missing = [];

  if (!config.EXTENSION_SHARED_TOKEN) {
    missing.push('EXTENSION_SHARED_TOKEN');
  } else if (config.EXTENSION_SHARED_TOKEN === PLACEHOLDER_EXTENSION_TOKEN) {
    missing.push('EXTENSION_SHARED_TOKEN must not use the default placeholder');
  }
  if (config.CHALLENGE_REQUIRED && !config.CHALLENGE_SECRET) {
    missing.push('CHALLENGE_SECRET');
  }
  if (!config.YOUTUBE_API_KEY) missing.push('YOUTUBE_API_KEY');

  return missing;
}

function buildRequiredVariableStatus(config) {
  const missing = getMissingRequiredVariables(config);

  return {
    ok: missing.length === 0,
    missing
  };
}

function buildCorsHeaders(request, config) {
  const requestOrigin = request.headers.get('origin');
  const allowedOrigins = config.CORS_ORIGIN.split(',').map((value) => value.trim()).filter(Boolean);
  const allowOrigin = allowedOrigins.includes('*')
    ? '*'
    : allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0] ?? DEFAULTS.CORS_ORIGIN;

  return {
    'access-control-allow-origin': allowOrigin,
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': [
      'content-type',
      'x-extension-token',
      'x-resolver-nonce',
      'x-resolver-expires-at',
      'x-resolver-signature'
    ].join(','),
    'access-control-max-age': '86400',
    vary: 'Origin'
  };
}

function getRequestOrigin(request) {
  return String(request.headers.get('origin') ?? '').trim();
}

function isAllowedOrigin(request, config) {
  const requestOrigin = request.headers.get('origin');
  if (!requestOrigin) {
    return false;
  }

  const allowedOrigins = config.CORS_ORIGIN.split(',').map((value) => value.trim()).filter(Boolean);
  return allowedOrigins.includes('*') || allowedOrigins.includes(requestOrigin);
}

function jsonResponse(payload, status, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders
    }
  });
}

function jsonError(code, message, status, extraHeaders = {}) {
  return jsonResponse({
    ok: false,
    error: {
      code,
      message
    }
  }, status, extraHeaders);
}

function normalizeVideoIds(rawVideoIds) {
  const seen = new Set();
  const normalized = [];

  for (const rawValue of rawVideoIds) {
    const value = String(rawValue).trim();
    if (!value) continue;
    if (seen.has(value)) continue;

    seen.add(value);
    normalized.push(value);
  }

  return normalized;
}

function sortByRequestOrder(requestedIds, items) {
  const order = new Map(requestedIds.map((id, index) => [id, index]));
  return [...items].sort((a, b) => (order.get(a.videoId) ?? 0) - (order.get(b.videoId) ?? 0));
}

function buildYoutubeApiUrl(resource, config) {
  const baseUrl = config.YOUTUBE_API_BASE_URL.endsWith('/')
    ? config.YOUTUBE_API_BASE_URL
    : `${config.YOUTUBE_API_BASE_URL}/`;

  return new URL(resource, baseUrl);
}

function normalizeChannelHandle(rawValue) {
  const value = String(rawValue ?? '').trim();
  if (!value) return '';

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  const match = decoded.match(/@([^/?#\s]+)/);
  if (match?.[1]) {
    return match[1].trim().toLowerCase();
  }

  return decoded.replace(/^\/+/, '').replace(/^@/, '').trim().toLowerCase();
}

function chunkArray(input, size) {
  const chunks = [];

  for (let index = 0; index < input.length; index += size) {
    chunks.push(input.slice(index, index + size));
  }

  return chunks;
}

function redisKey(config, ...parts) {
  return [config.REDIS_PREFIX, ...parts].join(':');
}

function hasUpstashConfig(config) {
  return Boolean(config.UPSTASH_REDIS_REST_URL && config.UPSTASH_REDIS_REST_TOKEN);
}

function readString(value, fallback) {
  const stringValue = String(value ?? '').trim();
  return stringValue || fallback;
}

function readPositiveInt(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  const number = Number.parseInt(String(value ?? ''), 10);

  if (!Number.isInteger(number) || number <= 0) {
    return fallback;
  }

  return Math.min(number, max);
}

function readNonNegativeInt(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  const number = Number.parseInt(String(value ?? ''), 10);

  if (!Number.isInteger(number) || number < 0) {
    return fallback;
  }

  return Math.min(number, max);
}

function readBoolean(value, fallback) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return String(value).trim().toLowerCase() === 'true';
}

function getUtcDateKey() {
  return new Date().toISOString().slice(0, 10);
}
