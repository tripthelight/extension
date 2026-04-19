import { env } from '../config/env.js';
import { redis, redisKey } from '../lib/redis.js';

/**
 * Read multiple cached video rows from Redis.
 *
 * @param {string[]} videoIds
 * @returns {Promise<Map<string, {videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>>}
 */
export async function getCachedVideos(videoIds) {
  if (videoIds.length === 0) {
    return new Map();
  }

  const keys = videoIds.map((videoId) => redisKey('video', videoId));
  const values = await redis.mget(keys);
  const map = new Map();

  values.forEach((value, index) => {
    if (!value) return;
    map.set(videoIds[index], JSON.parse(value));
  });

  return map;
}

/**
 * Persist resolved videos in Redis with TTL.
 *
 * @param {Array<{videoId: string, channelId: string, channelName: string, channelHandle: string, title: string, fetchedAt: string}>} items
 * @returns {Promise<void>}
 */
export async function setCachedVideos(items) {
  if (items.length === 0) {
    return;
  }

  const pipeline = redis.pipeline();

  for (const item of items) {
    pipeline.set(
      redisKey('video', item.videoId),
      JSON.stringify(item),
      'EX',
      env.REDIS_VIDEO_TTL_SECONDS
    );
  }

  await pipeline.exec();
}
