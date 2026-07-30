const MAX_ITEMS = 600;
const MAX_ITEM_NAME_LENGTH = 80;
const MAX_DISPLAY_NAME_LENGTH = 100;
const MAX_AMOUNT = Number.MAX_SAFE_INTEGER;

function cleanText(value, fallback = '', maxLength = 80) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : fallback;
}

function cleanInteger(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : null;
}

function cleanAmount(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return null;
  return Math.min(Math.trunc(number), MAX_AMOUNT);
}

function cleanInventory(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const inventory = {};
  for (const [rawName, rawAmount] of Object.entries(value).slice(0, MAX_ITEMS)) {
    const name = rawName.trim().slice(0, MAX_ITEM_NAME_LENGTH);
    const amount = cleanAmount(rawAmount);
    if (name && amount !== null) inventory[name] = amount;
  }
  return inventory;
}

function cleanItemDisplayNames(value, inventory) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const displayNames = {};
  for (const internalName of Object.keys(inventory)) {
    const displayName = cleanText(value[internalName], '', MAX_DISPLAY_NAME_LENGTH);
    if (displayName) displayNames[internalName] = displayName;
  }
  return displayNames;
}

export function parseSnapshot(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const userId = cleanInteger(input.userId);
  const username = cleanText(input.username, '', 32);
  if (!userId || userId <= 0 || !username) return null;

  const inventory = cleanInventory(input.inventory);
  const itemDisplayNames = cleanItemDisplayNames(input.itemDisplayNames, inventory);
  const amounts = Object.values(inventory);

  return {
    username,
    displayName: cleanText(input.displayName, username, 50),
    userId,
    inventory,
    itemDisplayNames,
    itemTypes: amounts.length,
    totalAmount: amounts.reduce((total, amount) => Math.min(total + amount, MAX_AMOUNT), 0),
    placeId: cleanInteger(input.placeId),
    jobId: cleanText(input.jobId, '', 80) || null,
    session: cleanText(input.session, '', 80) || null,
    cardDescription: cleanText(input.cardDescription, '', 120) || null,
    updatedAt: new Date().toISOString(),
    clientTimestamp: cleanInteger(input.ts),
  };
}
