import { env } from '../config/env.js';

/**
 * Require a shared token from the browser extension.
 *
 * Header: x-extension-token
 */
export function extensionAuth(request, response, next) {
  const token = String(request.header('x-extension-token') || '').trim();

  if (!token || token !== env.EXTENSION_SHARED_TOKEN) {
    response.status(401).json({
      ok: false,
      error: {
        code: 'UNAUTHORIZED_EXTENSION',
        message: 'Invalid extension token'
      }
    });
    return;
  }

  next();
}
