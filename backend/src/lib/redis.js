import Redis from 'ioredis';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: false,
  maxRetriesPerRequest: 1,
  enableReadyCheck: true
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('error', (error) => {
  logger.error({ err: error }, 'Redis error');
});

/**
 * Build a namespaced Redis key.
 *
 * Example:
 *   redisKey('video', 'dQw4w9WgXcQ')
 *   => ytrs:video:dQw4w9WgXcQ
 *
 * @param {...string} parts
 * @returns {string}
 */
export function redisKey(...parts) {
  return [env.REDIS_PREFIX, ...parts].join(':');
}
