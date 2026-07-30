export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
      ...extraHeaders,
    },
  });
}

export function methodNotAllowed(allowed) {
  return json(
    { ok: false, error: 'Method not allowed' },
    405,
    { allow: allowed.join(', ') },
  );
}
