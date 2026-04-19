import { redis } from '../../lib/redis.js';

/**
 * Register health routes.
 *
 * These routes stay intentionally tiny and dependency-free so probes can
 * detect app or Redis problems quickly.
 *
 * @param {import('express').Express} app
 */
export function registerHealthRoutes(app) {
  app.get('/healthz', async (request, response, next) => {
    try {
      const pong = await redis.ping();

      response.json({
        ok: true,
        app: 'up',
        redis: pong === 'PONG' ? 'up' : 'unknown'
      });
    } catch (error) {
      next(error);
    }
  });
}
