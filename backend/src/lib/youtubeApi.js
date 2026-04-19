import { env } from '../config/env.js';
import { chunkArray } from '../utils/chunkArray.js';

/**
 * Fetch video metadata from YouTube Data API v3.
 *
 * We request only `id` and `snippet` because this server only needs fields
 * used for block logic and cache hydration.
 *
 * @param {string[]} videoIds
 * @returns {Promise<Array<{videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>>}
 */
export async function fetchVideosFromYouTube(videoIds) {
  const chunks = chunkArray(videoIds, env.YOUTUBE_BATCH_SIZE);
  const results = [];

  for (const ids of chunks) {
    const url = buildYoutubeApiUrl('videos');
    url.searchParams.set('part', 'id,snippet');
    url.searchParams.set('id', ids.join(','));
    url.searchParams.set('key', env.YOUTUBE_API_KEY);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.YOUTUBE_API_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          accept: 'application/json'
        }
      });

      if (!response.ok) {
        const text = await response.text();
        const error = new Error(`YouTube API error: ${response.status} ${text}`);
        error.statusCode = 502;
        throw error;
      }

      const payload = await response.json();
      const items = Array.isArray(payload.items) ? payload.items : [];
      const channelHandleMap = await fetchChannelHandleMap(items);

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
    } finally {
      clearTimeout(timeout);
    }
  }

  return results;
}

/**
 * Resolve channel custom URLs and normalize them as handle tokens.
 *
 * @param {Array<{snippet?: {channelId?: string}}>} videoItems
 * @returns {Promise<Map<string, string>>}
 */
async function fetchChannelHandleMap(videoItems) {
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
  const chunks = chunkArray(channelIds, env.YOUTUBE_BATCH_SIZE);

  for (const ids of chunks) {
    const url = buildYoutubeApiUrl('channels');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('id', ids.join(','));
    url.searchParams.set('key', env.YOUTUBE_API_KEY);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.YOUTUBE_API_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          accept: 'application/json'
        }
      });

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
    } finally {
      clearTimeout(timeout);
    }
  }

  return map;
}

/**
 * Build YouTube Data API endpoint URL safely.
 *
 * NOTE:
 * - A leading slash in `new URL('/videos', base)` would drop `/youtube/v3`.
 * - A base URL without trailing slash would treat `v3` as a file segment.
 */
function buildYoutubeApiUrl(resource) {
  const baseUrl = env.YOUTUBE_API_BASE_URL.endsWith('/')
    ? env.YOUTUBE_API_BASE_URL
    : `${env.YOUTUBE_API_BASE_URL}/`;

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
