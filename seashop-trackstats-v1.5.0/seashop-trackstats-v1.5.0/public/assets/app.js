const INVENTORY_BAG_ASSET_ID = 107587767759857;
const REFRESH_MS = 5000;

const ITEM_REGISTRY = [
  ['KenpachiEVOitem', "8th's Sword", 98131647273476], ['ExpeditionStatAnvil', 'Anvil', 87373295347365], ['ExpeditionMaterial3', 'Aqua Shard', 134586230895171], ['BattlepassEXP', 'Battlepass EXP', 114328894217766], ['BeginnerTicket', "Beginner's Ticket", 92708131788468], ['AOEColorBlack', 'Black Unit Indicator Color', 86214153130821], ['AOEColorBlue', 'Blue Unit Indicator Color', 86214153130821], ['FoodItem6', 'Bunny Candy', 114002509716577], ['BurningFruit', 'Burning Fruit', 123556219241960], ['AOEColorCobalt', 'Cobalt Unit Indicator Color', 86214153130821], ['CosmicMagic', 'Cosmic Magic', 121833778269255], ['AOEColorCrimson', 'Crimson Unit Indicator Color', 86214153130821], ['CrimsonVial', 'Crimson Vial', 94381461409309], ['CrowRelic', 'Crow Relic', 76923936793147], ['ItachiEVOItem', "Crow's Ring", 87203191785095], ['Crown', 'Crown', 137524761353956], ['FoodItem1', 'Cursed Boba', 86406261866497], ['ZerefEVOItem', 'Cursed Book', 82295494861028], ['ExpeditionMaterial1', 'Cursed Timber', 136417792145357], ['FoodItem4', 'Delicious Pie', 112080191044214], ['DevHatGifter', 'Developer Hat Gifter', 87919600502988], ['ElixirOfLife', 'Elixir of Life', 125147427945388], ['EquipmentLock', 'Equipment Lock', 98479956634965], ['EquipmentReroll', 'Equipment Reroll', 81367008512026], ['EquipmentScrap', 'Equipment Scrap', 138259000495300], ['EventCoin', 'Event Coin', 122283537900027], ['ExpeditionCoin', 'Expedition Coin', 133127153759220], ['FoodItem3', 'Frown Fruit', 131512075092964], ['ExpeditionFuel', 'Fuel Cell', 104121621042535], ['Gem', 'Gem', 127345120309392], ['ExpeditionGeode', 'Geode', 138904987734280], ['GiantHammer', 'Giant Hammer', 121596631364316], ['Gold', 'Gold', 135239612382433], ['AOEColorGreen', 'Green Unit Indicator Color', 86214153130821], ['HollowedVisor', 'Hollowed Visor', 117343950081695], ['HinataEVOItem', 'Holy Pendant', 86605157198890], ['GrimmjowEVOItem', 'Jaw Skull', 109276412279273], ['JokerCard', 'Joker of the Nonsensical Pirates', 137441898503450], ['LeaderboardCapsule', 'Leaderboard Capsule', 94800308177665], ['LuckPotion', 'Luck Potion', 77171016111697], ['ExpeditionMaterial2', 'Lush Dirt', 92084519126759], ['JudarEVOItem', 'Magical Amulet', 71145581264662], ['FoodItem5', 'Mana Flask', 94316038056476], ['AOEColorOrange', 'Orange Unit Indicator Color', 86214153130821], ['ExpeditionPayloadEXP', 'Payload EXP', 124721389072864], ['AOEColorPink', 'Pink Unit Indicator Color', 86214153130821], ['PlayerEXP', 'Player EXP', 117500362262257], ['PuppetHeart', 'Puppet Heart', 84111339695232], ['AOEColorPurple', 'Purple Unit Indicator Color', 86214153130821], ['RaidToken', 'Raid Token', 136240850940008], ['AOEColorRainbow', 'Rainbow Unit Indicator Color', 86214153130821], ['RandomItem', 'Random Item', 71123287869055], ['FoodItem2', 'Red Flower', 132509394462607], ['AOEColorRed', 'Red Unit Indicator Color', 86214153130821], ['ExpeditionRepair', 'Repair Hammer', 80027541580589], ['ResearchPoint', 'Research Point', 121721703265529], ['Salmon', 'Salmon', 79569140573560], ['SpiritCityTotem', 'Spirit City Totem', 104984239057202], ['SpiritCityToken', 'Spirit Token', 114823475742161], ['SpriteBlue', 'Sprite (Blue)', 126917557220272], ['SpriteGreen', 'Sprite (Green)', 124445225421161], ['SpriteGrey', 'Sprite (Grey)', 72115941471722], ['SpritePink', 'Sprite (Pink)', 80102116113968], ['SpritePurple', 'Sprite (Purple)', 86386797861874], ['SpriteRainbow', 'Sprite (Rainbow)', 90878706773915], ['SpriteRed', 'Sprite (Red)', 112690032318535], ['SpriteYellow', 'Sprite (Yellow)', 92252032301356], ['StatLock', 'Stat Lock', 140365526846292], ['StatReroll', 'Stat Reroll', 136060410683336], ['StudentID', 'Student ID', 125687910025203], ['SuperLuckPotion', 'Super Luck Potion', 133531148635869], ['ExpeditionTome', 'Tome', 126371997272787], ['TraitReroll', 'Trait Crystal', 112860527247753], ['UnitEXP', 'Unit EXP', 118877874477600], ['Bundle', 'Unknown Bundle', 91508523300786], ['VillainBattlepassEXP', 'Villain Battlepass EXP', 87293290668489], ['VillainChest', 'Villain Chest', 107628615140722], ['VillainCurrency', 'Villain Coins', 125718058013287], ['AOEColorWhite', 'White Unit Indicator Color', 86214153130821], ['AOEColorYellow', 'Yellow Unit Indicator Color', 86214153130821], ['Yen', 'Yen', 131430939615770]
];

const REGISTRY_BY_KEY = Object.fromEntries(ITEM_REGISTRY.map(([key, display, assetId]) => [key, { key, displayName: display, assetId }]));
const REGISTRY_BY_DISPLAY = Object.fromEntries(ITEM_REGISTRY.map(([key, display, assetId]) => [display.toLowerCase(), { key, displayName: display, assetId }]));

const state = { players: [], selectedPlayer: null };
const els = {
  cards: document.getElementById('cards'),
  statAccounts: document.getElementById('statAccounts'),
  statOnline: document.getElementById('statOnline'),
  statGems: document.getElementById('statGems'),
  statTypes: document.getElementById('statTypes'),
  overviewGems: document.getElementById('overviewGems'),
  recentSync: document.getElementById('recentSync'),
  searchInput: document.getElementById('searchInput'),
  onlineOnly: document.getElementById('onlineOnly'),
  refreshBtn: document.getElementById('refreshBtn'),
  modal: document.getElementById('inventoryModal'),
  modalAvatar: document.getElementById('modalAvatar'),
  modalName: document.getElementById('modalName'),
  modalMeta: document.getElementById('modalMeta'),
  modalItemTypes: document.getElementById('modalItemTypes'),
  modalGems: document.getElementById('modalGems'),
  modalLastSync: document.getElementById('modalLastSync'),
  inventorySearch: document.getElementById('inventorySearch'),
  inventorySort: document.getElementById('inventorySort'),
  inventoryList: document.getElementById('inventoryList'),
  closeModal: document.getElementById('closeModal'),
};

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Number(value || 0));
}
function timeAgo(ts) {
  const diff = Date.now() - Number(ts || 0);
  if (diff < 60000) return 'just now';
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}
function assetThumb(assetId) {
  return `https://www.roblox.com/asset-thumbnail/image?assetId=${assetId}&width=96&height=96&format=png`;
}
function avatarUrl(userId) {
  return `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=180&height=180&format=png`;
}
function resolveItem(item) {
  const found = REGISTRY_BY_KEY[item.key] || REGISTRY_BY_DISPLAY[String(item.displayName || '').toLowerCase()];
  return {
    ...item,
    displayName: item.displayName || found?.displayName || item.key,
    assetId: item.assetId || found?.assetId || null,
  };
}
function normalizePlayer(player) {
  const items = (player.items || []).map(resolveItem);
  const totalGems = items.find((x) => x.key === 'Gem' || x.displayName === 'Gem')?.amount || player.totalGems || 0;
  return { ...player, items, totalGems };
}

async function fetchPlayers() {
  try {
    const response = await fetch('/api/players');
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || 'Failed to load players');
    state.players = (data.players || []).map(normalizePlayer);
    render();
  } catch (error) {
    els.cards.innerHTML = `<div class="empty">${error.message}</div>`;
  }
}

function render() {
  const query = els.searchInput.value.trim().toLowerCase();
  const onlineOnly = els.onlineOnly.checked;
  const players = state.players.filter((player) => {
    const text = [player.username, player.displayName, ...player.items.map((i) => `${i.key} ${i.displayName}`)].join(' ').toLowerCase();
    const match = !query || text.includes(query);
    const active = !onlineOnly || (Date.now() - player.updatedAt) <= 45000;
    return match && active;
  });

  const onlineCount = state.players.filter((p) => (Date.now() - p.updatedAt) <= 45000).length;
  const totalGems = state.players.reduce((sum, p) => sum + Number(p.totalGems || 0), 0);
  const totalTypes = state.players.reduce((sum, p) => sum + (p.items?.length || 0), 0);

  els.statAccounts.textContent = formatNumber(state.players.length);
  els.statOnline.textContent = formatNumber(onlineCount);
  els.statGems.textContent = formatNumber(totalGems);
  els.statTypes.textContent = formatNumber(totalTypes);
  els.overviewGems.textContent = formatNumber(totalGems);
  els.recentSync.innerHTML = state.players.length
    ? state.players.slice(0, 5).map((p) => `[${timeAgo(p.updatedAt)}] ${p.username} +${formatNumber(p.items.length)}`).join('<br>')
    : 'Waiting for player data...';

  if (!players.length) {
    els.cards.innerHTML = '<div class="empty">No player data yet.</div>';
    return;
  }

  els.cards.innerHTML = players.map((player) => {
    const online = (Date.now() - player.updatedAt) <= 45000;
    return `
      <article class="card">
        <div class="card-top">
          <img class="avatar" src="${avatarUrl(player.userId)}" alt="${player.username}" />
          <div>
            <div class="card-name">${player.username}</div>
            <div class="card-sub">Anime Expeditions</div>
            <div class="card-sub">${online ? 'TRACKING' : 'OFFLINE'} • ${timeAgo(player.updatedAt)}</div>
          </div>
        </div>
        <div class="card-stats">
          <div class="stat-box"><span>Total Gems</span><strong>${formatNumber(player.totalGems)}</strong></div>
          <div class="stat-box"><span>Item Types</span><strong>${formatNumber(player.items.length)}</strong></div>
        </div>
        <button class="view-btn" data-userid="${player.userId}">
          <img src="${assetThumb(INVENTORY_BAG_ASSET_ID)}" alt="Inventory" /> View Inventory
        </button>
      </article>`;
  }).join('');

  document.querySelectorAll('.view-btn').forEach((btn) => btn.addEventListener('click', () => openInventory(Number(btn.dataset.userid))));
}

function openInventory(userId) {
  const player = state.players.find((p) => Number(p.userId) === Number(userId));
  if (!player) return;
  state.selectedPlayer = player;
  els.modalAvatar.src = avatarUrl(player.userId);
  els.modalName.textContent = player.username;
  els.modalMeta.textContent = `@${player.displayName || player.username} • User ID ${player.userId}`;
  els.modalItemTypes.textContent = formatNumber(player.items.length);
  els.modalGems.textContent = formatNumber(player.totalGems);
  els.modalLastSync.textContent = timeAgo(player.updatedAt);
  renderInventory();
  els.modal.showModal();
}

function renderInventory() {
  const player = state.selectedPlayer;
  if (!player) return;
  const q = els.inventorySearch.value.trim().toLowerCase();
  const sort = els.inventorySort.value;
  let items = [...player.items].filter((item) => {
    const text = `${item.displayName} ${item.key}`.toLowerCase();
    return !q || text.includes(q);
  });

  items.sort((a, b) => {
    if (sort === 'amount-desc') return b.amount - a.amount;
    if (sort === 'amount-asc') return a.amount - b.amount;
    if (sort === 'name-desc') return b.displayName.localeCompare(a.displayName);
    return a.displayName.localeCompare(b.displayName);
  });

  els.inventoryList.innerHTML = items.length ? items.map((item) => `
    <div class="inventory-item-row">
      <img class="inventory-item-icon" src="${item.assetId ? assetThumb(item.assetId) : assetThumb(INVENTORY_BAG_ASSET_ID)}" alt="${item.displayName}" />
      <div class="inventory-item-main">
        <div class="inventory-item-left">
          <div class="inventory-item-name">${item.displayName}</div>
          <div class="inventory-item-key">Key: ${item.key}</div>
        </div>
        <div class="inventory-item-amount">${formatNumber(item.amount)}</div>
      </div>
    </div>
  `).join('') : '<div class="empty">No items found.</div>';
}

els.searchInput.addEventListener('input', render);
els.onlineOnly.addEventListener('change', render);
els.refreshBtn.addEventListener('click', fetchPlayers);
els.closeModal.addEventListener('click', () => els.modal.close());
els.inventorySearch.addEventListener('input', renderInventory);
els.inventorySort.addEventListener('change', renderInventory);

fetchPlayers();
setInterval(fetchPlayers, REFRESH_MS);
