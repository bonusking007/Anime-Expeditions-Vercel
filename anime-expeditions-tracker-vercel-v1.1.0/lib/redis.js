function credentials() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error('Redis environment variables are missing');
  }

  return { url: url.replace(/\/$/, ''), token };
}

async function request(path, body) {
  const { url, token } = credentials();
  const response = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data) {
    throw new Error(data?.error || `Redis request failed (${response.status})`);
  }

  return data;
}

export async function redisCommand(command) {
  const data = await request('', command);
  if (data.error) throw new Error(data.error);
  return data.result;
}

export async function redisPipeline(commands) {
  const data = await request('/pipeline', commands);
  if (!Array.isArray(data)) throw new Error('Invalid Redis pipeline response');
  return data.map((entry) => {
    if (entry?.error) throw new Error(entry.error);
    return entry?.result ?? null;
  });
}

export const PLAYER_SET_KEY = 'anime-expeditions:players';
export const playerKey = (userId) => `anime-expeditions:player:${userId}`;
