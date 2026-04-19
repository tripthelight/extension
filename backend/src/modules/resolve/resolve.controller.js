import { z } from 'zod';
import { env } from '../../config/env.js';
import { extensionAuth } from '../../middleware/extensionAuth.js';
import { resolveRateLimiter } from '../../middleware/rateLimiters.js';
import { resolveVideos } from '../../services/videoResolveService.js';
import { normalizeVideoIds } from '../../utils/normalizeVideoIds.js';

const resolveBodySchema = z.object({
  videoIds: z.array(z.string()).min(1).max(env.MAX_VIDEO_IDS_PER_REQUEST)
});

/**
 * Register video resolution routes.
 *
 * Current contract:
 * POST /api/v1/videos/resolve
 * {
 *   "videoIds": ["abc123", "def456"]
 * }
 *
 * Response includes:
 * - found: resolved items
 * - missing: valid IDs not returned by YouTube
 * - cached: IDs served directly from Redis cache
 * - fetched: IDs fetched from YouTube during this request
 *
 * @param {import('express').Express} app
 */
export function registerResolveRoutes(app) {
  app.post('/api/v1/videos/resolve', extensionAuth, resolveRateLimiter, async (request, response, next) => {
    try {
      const body = resolveBodySchema.parse(request.body);
      const videoIds = normalizeVideoIds(body.videoIds);

      const result = await resolveVideos(videoIds);

      response.json({
        ok: true,
        ...result
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.statusCode = 400;
        error.code = 'INVALID_BODY';
        error.message = error.issues.map((issue) => issue.message).join(', ');
      }

      next(error);
    }
  });
}
