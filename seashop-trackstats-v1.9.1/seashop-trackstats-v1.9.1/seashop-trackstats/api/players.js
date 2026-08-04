import { json, methodNotAllowed } from '../lib/http.js';
import { redisCommand, redisPipeline, PLAYER_SET_KEY, playerKey } from '../lib/redis.js';

const ONLINE_SECONDS = 45;
const PLAYER_RETENTION_SECONDS = 7 * 24 * 60 * 60;

export default {
  async fetch(request) {
    if (request.method !== 'GET') return methodNotAllowed(['GET']);

    try {
      const ids = (await redisCommand(['SMEMBERS', PLAYER_SET_KEY])) || [];
      if (!Array.isArray(ids) || ids.length === 0) {
        return json({ ok: true, players: [], generatedAt: new Date().toISOString() });
      }

      const values = await redisPipeline(ids.map((id) => ['GET', playerKey(Number(id))]));
      const now = Date.now();
      const staleIds = [];
      const players = values
        .map((value, index) => {
          const id = String(ids[index]);
          if (!value) {
            staleIds.push(id);
            return null;
          }

          try {
            const snapshot = typeof value === 'string' ? JSON.parse(value) : value;
            const updatedTime = new Date(snapshot.updatedAt).getTime();
            const ageSeconds = Number.isFinite(updatedTime)
              ? Math.max(0, Math.floor((now - updatedTime) / 1000))
              : Number.MAX_SAFE_INTEGER;

            if (ageSeconds > PLAYER_RETENTION_SECONDS) {
              staleIds.push(id);
              return null;
            }

            return {
              ...snapshot,
              ageSeconds,
              online: ageSeconds <= ONLINE_SECONDS,
            };
          } catch {
            staleIds.push(id);
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      if (staleIds.length) {
        const cleanup = [];
        for (const id of staleIds) cleanup.push(['DEL', playerKey(Number(id))]);
        cleanup.push(['SREM', PLAYER_SET_KEY, ...staleIds]);
        await redisPipeline(cleanup).catch((error) => console.error('Stale player cleanup failed:', error));
      }

      return json({ ok: true, players, generatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Player list failed:', error);
      return json({ ok: false, players: [], error: 'Storage unavailable' }, 503);
    }
  },
};
