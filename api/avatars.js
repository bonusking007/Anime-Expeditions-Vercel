import { json, methodNotAllowed } from '../lib/http.js';

const MAX_USER_IDS = 100;

function parseUserIds(url) {
  const raw = new URL(url).searchParams.get('userIds') || '';
  return [...new Set(raw
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0))]
    .slice(0, MAX_USER_IDS);
}

export default {
  async fetch(request) {
    if (request.method !== 'GET') return methodNotAllowed(['GET']);

    const userIds = parseUserIds(request.url);
    if (!userIds.length) return json({ ok: true, avatars: {} });

    const endpoint = new URL('https://thumbnails.roblox.com/v1/users/avatar');
    endpoint.searchParams.set('userIds', userIds.join(','));
    endpoint.searchParams.set('size', '420x420');
    endpoint.searchParams.set('format', 'Png');
    endpoint.searchParams.set('isCircular', 'false');

    try {
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return json({ ok: false, avatars: {}, error: 'Roblox thumbnail service unavailable' }, 502);
      }

      const payload = await response.json();
      const avatars = {};

      for (const entry of Array.isArray(payload.data) ? payload.data : []) {
        const userId = Number(entry.targetId);
        if (Number.isInteger(userId) && userId > 0 && typeof entry.imageUrl === 'string') {
          avatars[String(userId)] = entry.imageUrl;
        }
      }

      return new Response(JSON.stringify({ ok: true, avatars }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      console.error('Avatar lookup failed:', error);
      return json({ ok: false, avatars: {}, error: 'Avatar lookup failed' }, 502);
    }
  },
};
