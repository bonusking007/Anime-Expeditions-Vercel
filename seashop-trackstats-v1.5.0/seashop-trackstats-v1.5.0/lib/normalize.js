const { resolveItem } = require('./item-registry');

function normalizeInventory(input) {
  const items = [];

  if (Array.isArray(input)) {
    for (const entry of input) {
      const key = String(entry.key || entry.internalName || entry.name || '').trim();
      const amount = Number(entry.amount ?? 0);
      if (!key || !Number.isFinite(amount)) continue;
      const resolved = resolveItem(key) || resolveItem(entry.displayName || entry.name);
      items.push({
        key,
        displayName: entry.displayName || resolved?.display || key,
        amount,
        assetId: entry.assetId || resolved?.assetId || null,
      });
    }
  } else if (input && typeof input === 'object') {
    for (const [key, raw] of Object.entries(input)) {
      const amount = Number(raw?.Amount ?? raw ?? 0);
      if (!Number.isFinite(amount)) continue;
      const resolved = resolveItem(key);
      items.push({
        key,
        displayName: resolved?.display || key,
        amount,
        assetId: resolved?.assetId || null,
      });
    }
  }

  items.sort((a, b) => a.displayName.localeCompare(b.displayName));
  return items;
}

function normalizePlayerPayload(body) {
  const items = normalizeInventory(body.items || body.inventory || {});
  const gemItem = items.find((item) => item.key === 'Gem' || item.displayName === 'Gem');
  return {
    userId: Number(body.userId),
    username: String(body.username || body.name || ''),
    displayName: String(body.displayName || body.username || body.name || ''),
    placeId: Number(body.placeId || 0),
    jobId: String(body.jobId || ''),
    session: String(body.session || ''),
    updatedAt: Date.now(),
    totalGems: gemItem ? Number(gemItem.amount || 0) : 0,
    itemTypes: items.length,
    items,
  };
}

module.exports = {
  normalizeInventory,
  normalizePlayerPayload,
};
