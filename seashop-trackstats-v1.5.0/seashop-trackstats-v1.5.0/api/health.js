const { sendJson } = require('../lib/http');

module.exports = async (req, res) => {
  sendJson(res, 200, { ok: true, service: 'seashop-trackstats', version: '1.5.0' });
};
