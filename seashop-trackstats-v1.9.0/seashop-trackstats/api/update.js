import { json, methodNotAllowed } from '../lib/http.js';
import { redisCommand, redisPipeline, PLAYER_SET_KEY, playerKey } from '../lib/redis.js';
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
      const key = playerKey(snapshot.userId);
      const previousValue = await redisCommand(['GET', key]);

      if (previousValue) {
        try {
          const previous = typeof previousValue === 'string' ? JSON.parse(previousValue) : previousValue;
          const maxLogs = Math.min(Math.max(Number(snapshot.trackerSettings?.maxResultLogs) || 20, 1), 100);
          const combined = [
            ...(Array.isArray(snapshot.resultLogs) ? snapshot.resultLogs : []),
            ...(Array.isArray(previous?.resultLogs) ? previous.resultLogs : []),
          ];
          const seen = new Set();
          snapshot.resultLogs = combined
            .sort((a, b) => Number(b?.finishedAt || 0) - Number(a?.finishedAt || 0))
            .filter((entry) => {
              const rewards = Array.isArray(entry?.rewards)
                ? entry.rewards.map((reward) => `${reward?.name || ''}:${reward?.amount || 0}`).sort().join(',')
                : '';
              const signature = [
                entry?.finishedAt || 0,
                entry?.result || '',
                entry?.stageName || '',
                entry?.clearTime || '',
                entry?.wave || 0,
                rewards,
              ].join('|');
              if (seen.has(signature)) return false;
              seen.add(signature);
              return true;
            })
            .slice(0, maxLogs);
        } catch (error) {
          console.error('Previous result-log merge failed:', error);
        }
      }

      await redisPipeline([
        ['SET', key, JSON.stringify(snapshot), 'EX', 604800],
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
