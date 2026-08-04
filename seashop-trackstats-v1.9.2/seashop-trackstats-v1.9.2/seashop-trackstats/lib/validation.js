const MAX_ITEMS = 600;
const MAX_ITEM_NAME_LENGTH = 80;
const MAX_DISPLAY_NAME_LENGTH = 100;
const MAX_RESULTS = 100;
const MAX_UNITS = 500;
const MAX_RESULT_REWARDS = 24;
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


function cleanBoolean(value) {
  return value === true;
}

function cleanPlayerProgress(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { level: 0, currentXp: 0, requiredXp: 0, text: '' };
  }

  return {
    level: Math.max(0, cleanInteger(value.level) || 0),
    currentXp: Math.max(0, cleanAmount(value.currentXp) || 0),
    requiredXp: Math.max(0, cleanAmount(value.requiredXp) || 0),
    text: cleanText(value.text, '', 100),
  };
}

function cleanUnits(value) {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_UNITS).map((unit) => {
    if (!unit || typeof unit !== 'object' || Array.isArray(unit)) return null;
    const asset = cleanText(unit.asset, '', 100);
    const name = cleanText(unit.name, asset, 100);
    if (!asset && !name) return null;

    return {
      id: cleanText(unit.id, '', 120),
      asset: asset || name,
      name: name || asset,
      rarity: cleanText(unit.rarity, 'Unknown', 32),
      level: Math.max(1, cleanInteger(unit.level) || 1),
      trait: cleanText(unit.trait, 'None', 60),
      shiny: cleanBoolean(unit.shiny),
      equipped: cleanBoolean(unit.equipped),
      locked: cleanBoolean(unit.locked),
      favorited: cleanBoolean(unit.favorited),
      element: cleanText(unit.element, '', 40),
      archetype: cleanText(unit.archetype, '', 40),
    };
  }).filter(Boolean);
}

function cleanRewardList(value) {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_RESULT_REWARDS).map((reward) => {
    if (!reward || typeof reward !== 'object' || Array.isArray(reward)) return null;
    const name = cleanText(reward.name ?? reward.Name, '', MAX_DISPLAY_NAME_LENGTH);
    const amount = cleanAmount(reward.amount ?? reward.Amount);
    if (!name || amount === null) return null;
    return { name, amount };
  }).filter(Boolean);
}


function cleanTrackerSettings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { sendInterval: 15, maxResultLogs: 20, sendEnabled: true };
  }

  const sendInterval = cleanInteger(value.sendInterval);
  const maxResultLogs = cleanInteger(value.maxResultLogs);

  return {
    sendInterval: Math.min(Math.max(sendInterval || 15, 1), 3600),
    maxResultLogs: Math.min(Math.max(maxResultLogs || 20, 1), 100),
    sendEnabled: value.sendEnabled !== false,
  };
}

function cleanResultLogs(value) {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_RESULTS).map((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return null;

    const stageName = cleanText(entry.stageName ?? entry.StageName, '', 120);
    const result = cleanText(entry.result ?? entry.Result, '', 20) || 'Victory';
    const clearTime = cleanText(entry.clearTime ?? entry.ClearTime, '', 20);
    const description = cleanText(entry.description ?? entry.Description, '', 160);
    const mapLabel = cleanText(entry.mapLabel ?? entry.MapLabel, '', 80);
    const location = cleanText(entry.location ?? entry.Location, '', 80);
    const finishedAt = cleanInteger(entry.finishedAt ?? entry.FinishedAt ?? entry.ts) || Date.now();
    const rewards = cleanRewardList(entry.rewards ?? entry.Rewards);
    const wave = Math.max(0, cleanInteger(entry.wave ?? entry.Wave) || 0);
    const maxWave = Math.max(0, cleanInteger(entry.maxWave ?? entry.MaxWave) || 0);

    if (!stageName && rewards.length === 0 && !description) return null;

    return {
      stageName: stageName || 'Game Result',
      result,
      clearTime,
      description,
      mapLabel,
      location,
      wave,
      maxWave,
      rewards,
      finishedAt,
    };
  }).filter(Boolean);
}

export function parseSnapshot(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const userId = cleanInteger(input.userId);
  const username = cleanText(input.username, '', 32);
  if (!userId || userId <= 0 || !username) return null;

  const inventory = cleanInventory(input.inventory);
  const itemDisplayNames = cleanItemDisplayNames(input.itemDisplayNames, inventory);
  const resultLogs = cleanResultLogs(input.resultLogs);
  const trackerSettings = cleanTrackerSettings(input.trackerSettings);
  const units = cleanUnits(input.units);
  const playerProgress = cleanPlayerProgress(input.playerProgress);
  const amounts = Object.values(inventory);

  return {
    username,
    displayName: cleanText(input.displayName, username, 50),
    userId,
    inventory,
    itemDisplayNames,
    units,
    playerProgress,
    currentWave: Math.max(0, cleanInteger(input.currentWave) || 0),
    maxWave: Math.max(0, cleanInteger(input.maxWave) || 0),
    itemTypes: amounts.length,
    totalAmount: amounts.reduce((total, amount) => Math.min(total + amount, MAX_AMOUNT), 0),
    placeId: cleanInteger(input.placeId),
    jobId: cleanText(input.jobId, '', 80) || null,
    session: cleanText(input.session, '', 80) || null,
    gameName: cleanText(input.gameName, '', 80) || null,
    placeName: cleanText(input.placeName, '', 80) || null,
    cardDescription: cleanText(input.cardDescription, '', 120) || null,
    resultLogs,
    trackerSettings,
    updatedAt: new Date().toISOString(),
    clientTimestamp: cleanInteger(input.ts),
  };
}
