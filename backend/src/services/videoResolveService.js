import { fetchVideosFromYouTube } from '../lib/youtubeApi.js';
import { getCachedVideos, setCachedVideos } from './videoCacheService.js';

/**
 * In-flight dedupe map.
 *
 * Key: videoId
 * Value: Promise resolved with one video row or null when not found.
 *
 * Why it exists:
 * - If 100 users request the same videoId at the same time,
 *   the server should call YouTube once, not 100 times.
 * - Redis alone does not prevent duplicate upstream calls while the first
 *   request is still in progress.
 */
const pendingByVideoId = new Map();

/**
 * Public service used by controllers.
 *
 * It applies 3 layers in this order:
 * 1. Redis cache lookup
 * 2. In-flight dedupe for cache misses
 * 3. YouTube batch fetch only for true misses
 *
 * @param {string[]} videoIds
 * @returns {Promise<{
 *   requested: string[],
 *   found: Array<{videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>,
 *   missing: string[],
 *   cached: string[],
 *   fetched: string[]
 * }>}
 */
export async function resolveVideos(videoIds) {
  const cachedMap = await getCachedVideos(videoIds);
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

  const fetchedItems = await resolveMissesWithDedupe(misses);
  const fetchedMap = new Map(fetchedItems.map((item) => [item.videoId, item]));

  for (const videoId of misses) {
    const item = fetchedMap.get(videoId);
    if (item) {
      found.push(item);
    }
  }

  const missing = misses.filter((videoId) => !fetchedMap.has(videoId));

  return {
    requested: [...videoIds],
    found: sortByRequestOrder(videoIds, found),
    missing,
    cached,
    fetched: fetchedItems.map((item) => item.videoId)
  };
}

/**
 * Resolve cache misses with in-flight dedupe.
 *
 * Step-by-step:
 * - Reuse already-running promises when the same videoId is already being fetched.
 * - Batch only the truly new misses.
 * - Cache successful rows in Redis.
 * - Clean pending map when done.
 *
 * @param {string[]} videoIds
 * @returns {Promise<Array<{videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>>}
 */
async function resolveMissesWithDedupe(videoIds) {
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
    const batchPromise = fetchBatchAndCache(freshIds);

    for (const videoId of freshIds) {
      const singlePromise = batchPromise.then((items) => items.find((item) => item.videoId === videoId) ?? null);
      pendingByVideoId.set(videoId, singlePromise);
      waiters.push(singlePromise);
    }
  }

  const settled = await Promise.all(waiters);
  return settled.filter(Boolean);
}

/**
 * Fetch a fresh batch from YouTube, write to Redis, then clear pending map.
 *
 * @param {string[]} freshIds
 * @returns {Promise<Array<{videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>>}
 */
async function fetchBatchAndCache(freshIds) {
  try {
    const items = await fetchVideosFromYouTube(freshIds);
    await setCachedVideos(items);
    return items;
  } finally {
    for (const videoId of freshIds) {
      pendingByVideoId.delete(videoId);
    }
  }
}

function sortByRequestOrder(requestedIds, items) {
  const order = new Map(requestedIds.map((id, index) => [id, index]));
  return [...items].sort((a, b) => (order.get(a.videoId) ?? 0) - (order.get(b.videoId) ?? 0));
}
