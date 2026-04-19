export function notFoundHandler(request, response) {
  response.status(404).json({
    ok: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route not found: ${request.method} ${request.originalUrl}`
    }
  });
}
