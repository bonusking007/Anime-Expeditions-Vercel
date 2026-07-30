import { json, methodNotAllowed } from '../lib/http.js';

export default {
  async fetch(request) {
    if (request.method !== 'GET') return methodNotAllowed(['GET']);
    return json({
      ok: true,
      service: 'seashop-trackstats',
      version: '1.4.0',
      time: new Date().toISOString(),
    });
  },
};
