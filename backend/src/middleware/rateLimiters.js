import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

function buildLimiter({ windowMs, limit, name }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      ok: false,
      error: {
        code: 'RATE_LIMITED',
        message: `${name} rate limit exceeded`
      }
    }
  });
}

export const globalRateLimiter = buildLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  name: 'Global'
});

export const resolveRateLimiter = buildLimiter({
  windowMs: env.RESOLVE_RATE_LIMIT_WINDOW_MS,
  limit: env.RESOLVE_RATE_LIMIT_MAX,
  name: 'Resolve'
});
