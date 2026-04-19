import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { redis } from './lib/redis.js';

const app = createApp();

async function bootstrap() {
  try {
    await redis.ping();
    logger.info({ redis: 'ok' }, 'Redis connection check passed');

    app.listen(env.PORT, () => {
      logger.info(
        {
          port: env.PORT,
          env: env.NODE_ENV
        },
        'Server started'
      );
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

bootstrap();
