import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { globalRateLimiter } from './middleware/rateLimiters.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';
import { registerHealthRoutes } from './modules/health/health.controller.js';
import { registerResolveRoutes } from './modules/resolve/resolve.controller.js';

/**
 * Build the Express application.
 *
 * This file intentionally contains only app wiring.
 * Business logic lives in services so Codex can change one area
 * without accidentally breaking unrelated middleware.
 *
 * @returns {import('express').Express}
 */
export function createApp() {
  const app = express();

  if (env.TRUST_PROXY) {
    app.set('trust proxy', true);
  }

  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (request) => request.url === '/healthz'
      }
    })
  );

  app.use(helmet());
  app.use(cors(createCorsOptions()));
  app.use(express.json({ limit: '100kb' }));
  app.use(globalRateLimiter);

  registerHealthRoutes(app);
  registerResolveRoutes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

function createCorsOptions() {
  if (env.CORS_ORIGIN === '*') {
    return { origin: true };
  }

  const allowList = env.CORS_ORIGIN.split(',').map((value) => value.trim()).filter(Boolean);

  return {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      callback(null, allowList.includes(origin));
    }
  };
}
