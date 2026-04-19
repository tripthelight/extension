/**
 * Final Express error handler.
 *
 * Normalized error shape returned to extension clients.
 * Keep this stable so front-end code can rely on it.
 */
export function errorHandler(error, request, response, next) {
  void next;

  const statusCode = error.statusCode ?? 500;
  const message = error.message ?? 'Internal Server Error';

  request.log?.error({ err: error }, 'Request failed');

  response.status(statusCode).json({
    ok: false,
    error: {
      code: error.code ?? 'INTERNAL_ERROR',
      message
    }
  });
}
