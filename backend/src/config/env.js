import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  LOG_LEVEL: z.string().default('info'),
  TRUST_PROXY: z
    .string()
    .default('false')
    .transform((value) => value === 'true'),
  CORS_ORIGIN: z.string().default('https://www.youtube.com'),
  EXTENSION_SHARED_TOKEN: z
    .string()
    .min(32)
    .refine((value) => value !== 'replace_with_long_random_token', {
      message: 'EXTENSION_SHARED_TOKEN must be changed from the default placeholder'
    }),
  YOUTUBE_API_KEY: z.string().min(1),
  YOUTUBE_API_BASE_URL: z.string().url().default('https://www.googleapis.com/youtube/v3'),
  YOUTUBE_API_TIMEOUT_MS: z.coerce.number().int().positive().default(7000),
  YOUTUBE_BATCH_SIZE: z.coerce.number().int().positive().max(50).default(50),
  REDIS_URL: z.string().min(1),
  REDIS_PREFIX: z.string().min(1).default('ytrs'),
  REDIS_VIDEO_TTL_SECONDS: z.coerce.number().int().positive().default(60 * 60 * 24 * 7),
  REDIS_PENDING_TTL_SECONDS: z.coerce.number().int().positive().default(30),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(10_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),
  RESOLVE_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(10_000),
  RESOLVE_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),
  MAX_VIDEO_IDS_PER_REQUEST: z.coerce.number().int().positive().max(500).default(100)
});

/**
 * Centralized env object.
 *
 * If validation fails, the process stops immediately.
 * That makes operational mistakes obvious during local development,
 * CI, and deployment.
 */
export const env = envSchema.parse(process.env);
