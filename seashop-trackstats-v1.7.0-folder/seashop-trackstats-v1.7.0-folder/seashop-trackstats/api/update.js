import { json, methodNotAllowed } from '../lib/http.js';
import { redisPipeline, PLAYER_SET_KEY, playerKey } from '../lib/redis.js';
import { validApiKey } from '../lib/security.js';
import { parseSnapshot } from '../lib/validation.js';

export default {
  async fetch(request) {
    if (request.method !== 'POST') return methodNotAllowed(['POST']);

    if (!process.env.TRACKER_API_KEY) {
      return json({ ok: false, error: 'TRACKER_API_KEY is not configured' }, 500);
    }

    if (!validApiKey(request)) {
      return json({ ok: false, error: 'Unauthorized' }, 401);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 512_000) {
      return json({ ok: false, error: 'Payload too large' }, 413);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400);
    }

    const snapshot = parseSnapshot(body);
    if (!snapshot) {
      return json({ ok: false, error: 'username, userId and inventory are required' }, 400);
    }

    try {
      await redisPipeline([
        ['SET', playerKey(snapshot.userId), JSON.stringify(snapshot)],
        ['SADD', PLAYER_SET_KEY, String(snapshot.userId)],
      ]);

      return json({
        ok: true,
        player: snapshot.username,
        itemTypes: snapshot.itemTypes,
        updatedAt: snapshot.updatedAt,
      });
    } catch (error) {
      console.error('Tracker update failed:', error);
      return json({ ok: false, error: 'Storage unavailable' }, 503);
    }
  },
};
