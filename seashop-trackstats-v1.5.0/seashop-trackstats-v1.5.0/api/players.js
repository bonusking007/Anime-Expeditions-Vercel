const { sendJson } = require('../lib/http');
const { STORAGE_PREFIX } = require('../lib/config');
const { redisRequest } = require('../lib/redis');

module.exports = async (req, res) => {
  try {
    const ids = (await redisRequest('smembers', `${STORAGE_PREFIX}:players`)) || [];
    const players = [];
    for (const id of ids) {
      const raw = await redisRequest('get', `${STORAGE_PREFIX}:player:${id}`);
      if (!raw) continue;
      try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        players.push(parsed);
      } catch {}
    }

    players.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

    sendJson(res, 200, { ok: true, players });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message, players: [] });
  }
};
