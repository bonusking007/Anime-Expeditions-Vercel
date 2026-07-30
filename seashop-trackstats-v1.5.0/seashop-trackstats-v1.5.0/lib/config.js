const STORAGE_PREFIX = 'seashop-trackstats';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getRedisConfig() {
  return {
    url: requireEnv('UPSTASH_REDIS_REST_URL').replace(/\/$/, ''),
    token: requireEnv('UPSTASH_REDIS_REST_TOKEN')
  };
}

module.exports = {
  STORAGE_PREFIX,
  requireEnv,
  getRedisConfig,
};
