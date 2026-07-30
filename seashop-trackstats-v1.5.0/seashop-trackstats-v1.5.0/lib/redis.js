const { getRedisConfig } = require('./config');

async function redisRequest(command, ...args) {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url}/${command}/${args.map((v) => encodeURIComponent(String(v))).join('/')}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis request failed: ${response.status} ${text}`);
  }

  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function redisPost(command, bodyArgs = []) {
  const { url, token } = getRedisConfig();
  const response = await fetch(`${url}/${command}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyArgs)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis request failed: ${response.status} ${text}`);
  }
  const json = await response.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

module.exports = {
  redisRequest,
  redisPost,
};
