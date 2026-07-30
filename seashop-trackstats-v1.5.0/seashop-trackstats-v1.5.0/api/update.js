const { sendJson, readJson } = require('../lib/http');
const { requireEnv, STORAGE_PREFIX } = require('../lib/config');
const { redisRequest } = require('../lib/redis');
const { normalizePlayerPayload } = require('../lib/normalize');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Method not allowed' });

  try {
    const apiKey = requireEnv('TRACKER_API_KEY');
    if (req.headers['x-api-key'] !== apiKey) {
      return sendJson(res, 401, { ok: false, error: 'Invalid API key' });
    }

    const body = await readJson(req);
    const player = normalizePlayerPayload(body);

    if (!player.userId || !player.username) {
      return sendJson(res, 400, { ok: false, error: 'Missing userId or username' });
    }

    const playerKey = `${STORAGE_PREFIX}:player:${player.userId}`;
    const playersSet = `${STORAGE_PREFIX}:players`;

    await redisRequest('set', playerKey, JSON.stringify(player));
    await redisRequest('sadd', playersSet, String(player.userId));

    return sendJson(res, 200, {
      ok: true,
      userId: player.userId,
      username: player.username,
      itemTypes: player.itemTypes,
      totalGems: player.totalGems,
    });
  } catch (error) {
    return sendJson(res, 500, { ok: false, error: error.message });
  }
};
