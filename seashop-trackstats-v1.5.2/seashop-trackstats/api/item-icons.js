import { json, methodNotAllowed } from '../lib/http.js';

const MAX_ASSET_IDS = 100;

function parseAssetIds(url) {
  const raw = new URL(url).searchParams.get('assetIds') || '';
  return [...new Set(raw
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isSafeInteger(value) && value > 0))]
    .slice(0, MAX_ASSET_IDS);
}

export default {
  async fetch(request) {
    if (request.method !== 'GET') return methodNotAllowed(['GET']);

    const assetIds = parseAssetIds(request.url);
    if (!assetIds.length) return json({ ok: true, icons: {} });

    const endpoint = new URL('https://thumbnails.roblox.com/v1/assets');
    endpoint.searchParams.set('assetIds', assetIds.join(','));
    endpoint.searchParams.set('returnPolicy', 'PlaceHolder');
    endpoint.searchParams.set('size', '150x150');
    endpoint.searchParams.set('format', 'Png');
    endpoint.searchParams.set('isCircular', 'false');

    try {
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return json({ ok: false, icons: {}, error: 'Roblox item thumbnail service unavailable' }, 502);
      }

      const payload = await response.json();
      const icons = {};

      for (const entry of Array.isArray(payload.data) ? payload.data : []) {
        const assetId = Number(entry.targetId);
        if (Number.isSafeInteger(assetId) && assetId > 0 && typeof entry.imageUrl === 'string' && entry.imageUrl) {
          icons[String(assetId)] = entry.imageUrl;
        }
      }

      return new Response(JSON.stringify({ ok: true, icons }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      console.error('Item icon lookup failed:', error);
      return json({ ok: false, icons: {}, error: 'Item icon lookup failed' }, 502);
    }
  },
};
