(() => {
  const BAG_ASSET_ID = 107587767759857;
  const GEM_ASSET_ID = 127345120309392;

  const ITEM_DEFINITIONS = [
    { name: "8th's Sword", assetId: 98131647273476, aliases: ['KenpachiEVOitem'] },
    { name: 'Anvil', assetId: 87373295347365, aliases: ['ExpeditionStatAnvil'] },
    { name: 'Aqua Shard', assetId: 134586230895171, aliases: ['ExpeditionMaterial3'] },
    { name: 'Battlepass EXP', assetId: 114328894217766, aliases: ['BattlepassEXP'] },
    { name: "Beginner's Ticket", assetId: 92708131788468, aliases: ['BeginnerTicket'] },
    { name: 'Black Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorBlack'] },
    { name: 'Blue Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorBlue'] },
    { name: 'Bunny Candy', assetId: 114002509716577, aliases: ['FoodItem6'] },
    { name: 'Burning Fruit', assetId: 123556219241960, aliases: ['BurningFruit'] },
    { name: 'Cobalt Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorCobalt'] },
    { name: 'Cosmic Magic', assetId: 121833778269255, aliases: ['CosmicMagic'] },
    { name: 'Crimson Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorCrimson'] },
    { name: 'Crimson Vial', assetId: 94381461409309, aliases: ['CrimsonVial'] },
    { name: 'Crow Relic', assetId: 76923936793147, aliases: ['CrowRelic'] },
    { name: "Crow's Ring", assetId: 87203191785095, aliases: ['ItachiEVOItem'] },
    { name: 'Crown', assetId: 137524761353956, aliases: ['Crown'] },
    { name: 'Cursed Boba', assetId: 86406261866497, aliases: ['FoodItem1'] },
    { name: 'Cursed Book', assetId: 82295494861028, aliases: ['ZerefEVOItem'] },
    { name: 'Cursed Timber', assetId: 136417792145357, aliases: ['ExpeditionMaterial1'] },
    { name: 'Delicious Pie', assetId: 112080191044214, aliases: ['FoodItem4'] },
    { name: 'Developer Hat Gifter', assetId: 87919600502988, aliases: ['DevHatGifter'] },
    { name: 'Elixir of Life', assetId: 125147427945388, aliases: ['ElixirOfLife'] },
    { name: 'Equipment Lock', assetId: 98479956634965, aliases: ['EquipmentLock'] },
    { name: 'Equipment Reroll', assetId: 81367008512026, aliases: ['EquipmentReroll'] },
    { name: 'Equipment Scrap', assetId: 138259000495300, aliases: ['EquipmentScrap'] },
    { name: 'Event Coin', assetId: 122283537900027, aliases: ['EventCoin'] },
    { name: 'Expedition Coin', assetId: 133127153759220, aliases: ['ExpeditionCoin'] },
    { name: 'Frown Fruit', assetId: 131512075092964, aliases: ['FoodItem3'] },
    { name: 'Fuel Cell', assetId: 104121621042535, aliases: ['ExpeditionFuel'] },
    { name: 'Gem', assetId: 127345120309392, aliases: ['Gem'] },
    { name: 'Geode', assetId: 138904987734280, aliases: ['ExpeditionGeode'] },
    { name: 'Giant Hammer', assetId: 121596631364316, aliases: ['GiantHammer'] },
    { name: 'Gold', assetId: 135239612382433, aliases: ['Gold'] },
    { name: 'Green Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorGreen'] },
    { name: 'Hollowed Visor', assetId: 117343950081695, aliases: ['HollowedVisor'] },
    { name: 'Holy Pendant', assetId: 86605157198890, aliases: ['HinataEVOItem'] },
    { name: 'Jaw Skull', assetId: 109276412279273, aliases: ['GrimmjowEVOItem'] },
    { name: 'Joker of the Nonsensical Pirates', assetId: 137441898503450, aliases: ['JokerCard'] },
    { name: 'Leaderboard Capsule', assetId: 94800308177665, aliases: ['LeaderboardCapsule'] },
    { name: 'Luck Potion', assetId: 77171016111697, aliases: ['LuckPotion'] },
    { name: 'Lush Dirt', assetId: 92084519126759, aliases: ['ExpeditionMaterial2'] },
    { name: 'Magical Amulet', assetId: 71145581264662, aliases: ['JudarEVOItem'] },
    { name: 'Mana Flask', assetId: 94316038056476, aliases: ['FoodItem5'] },
    { name: 'Orange Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorOrange'] },
    { name: 'Payload EXP', assetId: 124721389072864, aliases: ['ExpeditionPayloadEXP'] },
    { name: 'Pink Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorPink'] },
    { name: 'Player EXP', assetId: 117500362262257, aliases: ['PlayerEXP'] },
    { name: 'Puppet Heart', assetId: 84111339695232, aliases: ['PuppetHeart'] },
    { name: 'Purple Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorPurple'] },
    { name: 'Raid Token', assetId: 136240850940008, aliases: ['RaidToken'] },
    { name: 'Rainbow Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorRainbow'] },
    { name: 'Random Item', assetId: 71123287869055, aliases: ['RandomItem'] },
    { name: 'Red Flower', assetId: 132509394462607, aliases: ['FoodItem2'] },
    { name: 'Red Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorRed'] },
    { name: 'Repair Hammer', assetId: 80027541580589, aliases: ['ExpeditionRepair'] },
    { name: 'Research Point', assetId: 121721703265529, aliases: ['ResearchPoint'] },
    { name: 'Salmon', assetId: 79569140573560, aliases: ['Salmon'] },
    { name: 'Spirit City Totem', assetId: 104984239057202, aliases: ['SpiritCityTotem'] },
    { name: 'Spirit Token', assetId: 114823475742161, aliases: ['SpiritCityToken'] },
    { name: 'Sprite (Blue)', assetId: 126917557220272, aliases: ['SpriteBlue'] },
    { name: 'Sprite (Green)', assetId: 124445225421161, aliases: ['SpriteGreen'] },
    { name: 'Sprite (Grey)', assetId: 72115941471722, aliases: ['SpriteGrey'] },
    { name: 'Sprite (Pink)', assetId: 80102116113968, aliases: ['SpritePink'] },
    { name: 'Sprite (Purple)', assetId: 86386797861874, aliases: ['SpritePurple'] },
    { name: 'Sprite (Rainbow)', assetId: 90878706773915, aliases: ['SpriteRainbow'] },
    { name: 'Sprite (Red)', assetId: 112690032318535, aliases: ['SpriteRed'] },
    { name: 'Sprite (Yellow)', assetId: 92252032301356, aliases: ['SpriteYellow'] },
    { name: 'Stat Lock', assetId: 140365526846292, aliases: ['StatLock'] },
    { name: 'Stat Reroll', assetId: 136060410683336, aliases: ['StatReroll'] },
    { name: 'Student ID', assetId: 125687910025203, aliases: ['StudentID'] },
    { name: 'Super Luck Potion', assetId: 133531148635869, aliases: ['SuperLuckPotion'] },
    { name: 'Tome', assetId: 126371997272787, aliases: ['ExpeditionTome'] },
    { name: 'Trait Crystal', assetId: 112860527247753, aliases: ['TraitReroll'] },
    { name: 'Unit EXP', assetId: 118877874477600, aliases: ['UnitEXP'] },
    { name: 'Unknown Bundle', assetId: 91508523300786, aliases: ['Bundle'] },
    { name: 'Villain Battlepass EXP', assetId: 87293290668489, aliases: ['VillainBattlepassEXP'] },
    { name: 'Villain Chest', assetId: 107628615140722, aliases: ['VillainChest'] },
    { name: 'Villain Coins', assetId: 125718058013287, aliases: ['VillainCurrency'] },
    { name: 'White Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorWhite'] },
    { name: 'Yellow Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorYellow'] },
    { name: 'Yen', assetId: 131430939615770, aliases: ['Yen'] },
  ];


  const PLAYER_EXP_ASSET_ID = 117500362262257;
  const WAVE_ASSET_ID = 117858142594774;

  const TRAIT_DEFINITIONS = {
    'Bolt': { assetId: 111416911306018, rarity: 'Legendary' },
    'Draconic': { assetId: 132463966312067, rarity: 'Mythic' },
    'Enlightenment': { assetId: 81368043277537, rarity: 'Rare' },
    'Forsaken': { assetId: 78797107071554, rarity: 'Mythic' },
    'Investor': { assetId: 78971732855996, rarity: 'Legendary' },
    'Limit Breaker': { assetId: 77814428670393, rarity: 'Legendary' },
    'Optics': { assetId: 90476061747476, rarity: 'Legendary' },
    'Precision 1': { assetId: 135957413284081, rarity: 'Legendary' },
    'Precision 2': { assetId: 72453704888291, rarity: 'Legendary' },
    'Primordial': { assetId: 82606982549142, rarity: 'Mythic' },
    'Range 1': { assetId: 91354565706942, rarity: 'Rare' },
    'Range 2': { assetId: 102625735489723, rarity: 'Rare' },
    'Speed 1': { assetId: 70421108507567, rarity: 'Rare' },
    'Speed 2': { assetId: 99056239582545, rarity: 'Rare' },
    'Strength 1': { assetId: 73376492990086, rarity: 'Rare' },
    'Strength 2': { assetId: 78765716191065, rarity: 'Rare' },
    'Unbound': { assetId: 100214615698524, rarity: 'Mythic' },
  };

  const UNIT_IMAGES = {
    'crow black fire': '/assets/units/crow-black-fire.png',
    'crow': '/assets/units/crow.png',
    'shadow divine': '/assets/units/shadow-divine.png',
    'shadow': '/assets/units/shadow.png',
    '8th sword berserk': '/assets/units/eighth-sword-berserk.png',
    '8th sword': '/assets/units/eighth-sword.png',
    'eighth sword berserk': '/assets/units/eighth-sword-berserk.png',
    'eighth sword': '/assets/units/eighth-sword.png',
    'crimson brother': '/assets/units/crimson-brother.png',
    'crimson': '/assets/units/crimson.png',
    'toy maker': '/assets/units/toy-maker.png',
    'true saint holy': '/assets/units/true-saint-holy.png',
    'true saint': '/assets/units/true-saint.png',
    'cursed immortal black sun': '/assets/units/cursed-immortal-black-sun.png',
    'cursed immortal': '/assets/units/cursed-immortal.png',
    'dark mage sovereign': '/assets/units/dark-mage-sovereign.png',
    'dark mage': '/assets/units/dark-mage.png',
    'razorjaw hunter': '/assets/units/razorjaw-hunter.png',
    'razorjaw': '/assets/units/razorjaw.png',
    'cursed student true love': '/assets/units/cursed-student-true-love.png',
    'cursed student': '/assets/units/cursed-student.png',
    'elf mage unleashed': '/assets/units/elf-mage-unleashed.png',
    'elf mage': '/assets/units/elf-mage.png',
    'flame emperor reincarnate': '/assets/units/flame-emperor-reincarnate.png',
    'flame emperor': '/assets/units/flame-emperor.png',
    'hollow blaze': '/assets/units/hollow-blaze.png',
    'hollow': '/assets/units/hollow.png',
    'lady giant envy': '/assets/units/lady-giant-envy.png',
    'lady giant': '/assets/units/lady-giant.png',
    'puppet telekinetic': '/assets/units/puppet-telekinetic.png',
    'puppet': '/assets/units/puppet.png',
    'salmon sorcerer grade 1': '/assets/units/salmon-sorcerer-grade-1.png',
    'salmon sorcerer': '/assets/units/salmon-sorcerer.png',
    'reaper released': '/assets/units/reaper-released.png',
    'string demon awakened': '/assets/units/string-demon-awakened.png',
    'string demon': '/assets/units/string-demon.png',
  };

  const RARITY_ORDER = {
    Godly: 7, Secret: 6, Exclusive: 5, Mythic: 4,
    Legendary: 3, Epic: 2, Rare: 1, Unknown: 0,
  };

  const state = {
    players: [],
    avatars: new Map(),
    assetIcons: new Map(),
    query: '',
    onlineOnly: false,
    selectedInventoryUserId: null,
    selectedUnitUserId: null,
    selectedDetailsUserId: null,
    modalQuery: '',
    modalSort: 'amount',
    unitQuery: '',
    unitRarity: 'all',
    unitTrait: 'all',
    currentView: 'home',
  };

  const numberFormatter = new Intl.NumberFormat('en-US');
  const $ = (id) => document.getElementById(id);

  function normalizeItemName(value = '') {
    return String(value)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[’']/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function humanizeItemName(value = '') {
    return String(value)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeUnitName(value = '') {
    return normalizeItemName(value)
      .replace(/\bgrade i\b/g, 'grade 1')
      .replace(/\bgrade one\b/g, 'grade 1');
  }

  const itemDefinitionByKey = new Map();
  for (const definition of ITEM_DEFINITIONS) {
    const keys = [definition.name, ...(definition.aliases || [])];
    for (const key of keys) itemDefinitionByKey.set(normalizeItemName(key), definition);
  }

  const elements = {
    overviewTotal: $('overview-total'),
    overviewPlayers: $('overview-players'),
    overviewOnline: $('overview-online'),
    overviewOffline: $('overview-offline'),
    recentList: $('recent-list'),
    mainSearch: $('main-search'),
    onlineOnly: $('online-only'),
    refreshButton: $('refresh-button'),
    accountCount: $('account-count'),
    lastRefresh: $('last-refresh'),
    playerGrid: $('player-grid'),
    loading: $('loading'),
    empty: $('empty-page'),
    error: $('error-banner'),

    modal: $('modal-backdrop'),
    modalName: $('modal-name'),
    modalSubtitle: $('modal-subtitle'),
    modalAvatar: $('modal-avatar'),
    modalItemTypes: $('modal-item-types'),
    modalTotalGems: $('modal-total-gems'),
    modalLastSync: $('modal-last-sync'),
    modalClose: $('modal-close'),
    modalSearch: $('modal-search'),
    modalSort: $('modal-sort'),
    itemGrid: $('item-grid'),
    inventoryEmpty: $('inventory-empty'),

    unitModal: $('unit-backdrop'),
    unitClose: $('unit-close'),
    unitName: $('unit-name'),
    unitSubtitle: $('unit-subtitle'),
    unitAvatar: $('unit-avatar'),
    unitCount: $('unit-count'),
    unitSecretCount: $('unit-secret-count'),
    unitMythicCount: $('unit-mythic-count'),
    unitShinyCount: $('unit-shiny-count'),
    unitSearch: $('unit-search'),
    unitRarity: $('unit-rarity'),
    unitTrait: $('unit-trait'),
    unitGrid: $('unit-grid'),
    unitEmpty: $('unit-empty'),

    detailsModal: $('details-backdrop'),
    detailsClose: $('details-close'),
    detailsStatus: $('details-status'),
    detailsAvatar: $('details-avatar'),
    detailsName: $('details-name'),
    detailsServerLine: $('details-server-line'),
    detailsDescription: $('details-description'),
    detailsLevel: $('details-level'),
    detailsLevelXp: $('details-level-xp'),
    detailsTotalGems: $('details-total-gems'),
    detailsTraitRerolls: $('details-trait-rerolls'),
    detailsGold: $('details-gold'),
    detailsLastSync: $('details-last-sync'),
    detailsRunsCount: $('details-runs-count'),
    detailsGame: $('details-game'),
    detailsService: $('details-service'),
    detailsMode: $('details-mode'),
    detailsTrackerStatus: $('details-tracker-status'),
    detailsSendInterval: $('details-send-interval'),
    detailsMaxResultLogs: $('details-max-result-logs'),
    detailsCurrentWave: $('details-current-wave'),
    detailsTotalWins: $('details-total-wins'),
    detailsLogSummary: $('details-log-summary'),
    detailsLogList: $('details-log-list'),
    startDashboard: $('start-dashboard'),
    homeView: $('home'),
    dashboardView: $('dashboard'),
    navLinks: Array.from(document.querySelectorAll('.nav-link')),
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[char]);
  }

  function formatNumber(value) {
    return numberFormatter.format(Number(value) || 0);
  }

  function compactNumber(value) {
    const number = Number(value) || 0;
    if (Math.abs(number) >= 1_000_000_000) return `${(number / 1_000_000_000).toFixed(number >= 10_000_000_000 ? 0 : 2).replace(/\.00$/, '')}B`;
    if (Math.abs(number) >= 1_000_000) return `${(number / 1_000_000).toFixed(number >= 10_000_000 ? 0 : 2).replace(/\.00$/, '')}M`;
    if (Math.abs(number) >= 1_000) return `${(number / 1_000).toFixed(number >= 100_000 ? 0 : 2).replace(/\.00$/, '')}K`;
    return formatNumber(number);
  }

  function relativeTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '--';
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  function clockTime(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatDateTime(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '--';
    return date.toLocaleString([], {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  }

  function itemDefinition(rawName) {
    return itemDefinitionByKey.get(normalizeItemName(rawName)) || {
      name: humanizeItemName(rawName), assetId: null,
    };
  }

  function itemDisplayName(player, rawName) {
    const dynamicName = player?.itemDisplayNames?.[rawName];
    if (typeof dynamicName === 'string' && dynamicName.trim()) return dynamicName.trim();
    return itemDefinition(rawName).name;
  }

  function playerItemDefinition(player, rawName) {
    const displayName = itemDisplayName(player, rawName);
    const definition = itemDefinition(displayName);
    return {
      name: displayName,
      assetId: definition.assetId || itemDefinition(rawName).assetId,
    };
  }

  function itemIconFallback(name) {
    const lower = normalizeItemName(name);
    if (lower.includes('gem')) return '◆';
    if (lower.includes('gold') || lower.includes('coin') || lower.includes('yen')) return '●';
    if (lower.includes('reroll') || lower.includes('roll')) return '↻';
    if (lower.includes('exp')) return '⬢';
    if (lower.includes('token')) return '⬡';
    return '◇';
  }

  function assetIconUrl(assetId) {
    return state.assetIcons.get(Number(assetId)) || '';
  }

  function assetIconHtml(assetId, name, className = 'item-icon-image', fallback = '◇') {
    const imageUrl = assetIconUrl(assetId);
    if (imageUrl) return `<img class="${escapeHtml(className)}" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(name)}" loading="lazy">`;
    return `<span class="${escapeHtml(className)} icon-fallback" aria-hidden="true">${escapeHtml(fallback)}</span>`;
  }

  function selectedInventoryPlayer() {
    return state.players.find((player) => player.userId === state.selectedInventoryUserId) || null;
  }

  function selectedUnitPlayer() {
    return state.players.find((player) => player.userId === state.selectedUnitUserId) || null;
  }

  function selectedDetailsPlayer() {
    return state.players.find((player) => player.userId === state.selectedDetailsUserId) || null;
  }

  function avatarUrl(userId) {
    return state.avatars.get(Number(userId)) || '';
  }

  function inventoryAmount(player, aliases) {
    const wanted = new Set(aliases.map(normalizeItemName));
    let total = 0;
    for (const [rawName, amount] of Object.entries(player?.inventory || {})) {
      const names = [rawName, itemDisplayName(player, rawName)].map(normalizeItemName);
      if (names.some((name) => wanted.has(name))) total += Number(amount) || 0;
    }
    return total;
  }

  function getGemAmount(player) {
    return inventoryAmount(player, ['Gem']);
  }

  function getGoldAmount(player) {
    return inventoryAmount(player, ['Gold']);
  }

  function getTraitRerolls(player) {
    return inventoryAmount(player, ['TraitReroll', 'Trait Crystal', 'Trait Reroll']);
  }

  function playerLevel(player) {
    return Number(player?.playerProgress?.level) || 0;
  }

  function playerXpText(player) {
    const progress = player?.playerProgress || {};
    const current = Number(progress.currentXp);
    const required = Number(progress.requiredXp);
    if (Number.isFinite(current) && Number.isFinite(required) && required > 0) {
      return `${formatNumber(current)}/${formatNumber(required)} XP`;
    }
    return progress.text || '-- XP';
  }

  function playerDescription(player) {
    if (typeof player?.cardDescription === 'string' && player.cardDescription.trim()) return player.cardDescription.trim();
    return 'Live inventory tracking';
  }

  function maskPlayerName(name) {
    const value = String(name || '');
    if (value.length <= 4) return value;
    return `${value.slice(0, 2)}***${value.slice(-2)}`;
  }

  function gameTitle(player) {
    return player?.gameName || 'Anime Expeditions';
  }

  function placeSubtitle(player) {
    return player?.placeName || '';
  }

  function singlePlaceTitle(player) {
    const game = gameTitle(player).trim();
    const place = placeSubtitle(player).trim();
    if (!place) return game;
    if (normalizeItemName(place) === normalizeItemName(game)) return game;
    return place;
  }

  function setView(view) {
    state.currentView = view === 'dashboard' ? 'dashboard' : 'home';
    const isDashboard = state.currentView === 'dashboard';
    elements.homeView.hidden = isDashboard;
    elements.dashboardView.hidden = !isDashboard;
    elements.navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === state.currentView));
    if (isDashboard) requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function renderMetrics() {
    const onlineCount = state.players.filter((player) => player.online).length;
    const offlineCount = Math.max(0, state.players.length - onlineCount);
    elements.overviewTotal.textContent = formatNumber(onlineCount);
    elements.overviewPlayers.textContent = formatNumber(state.players.length);
    elements.overviewOnline.textContent = formatNumber(onlineCount);
    elements.overviewOffline.textContent = formatNumber(offlineCount);

    document.querySelectorAll('[data-static-asset-id]').forEach((target) => {
      const url = assetIconUrl(Number(target.dataset.staticAssetId));
      if (url) { target.src = url; target.hidden = false; }
    });
  }

  function renderRecent() {
    const recent = state.players.slice(0, 7);
    elements.recentList.innerHTML = recent.length
      ? recent.map((player) => `
        <div class="recent-item">
          <span class="recent-time">[${escapeHtml(clockTime(player.updatedAt))}]</span>
          <span class="recent-player">${escapeHtml(maskPlayerName(player.displayName || player.username))}</span>
          <span class="recent-state ${player.online ? 'online' : 'offline'}">${player.online ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
      `).join('')
      : '<p class="side-empty">Waiting for player data...</p>';
  }

  function filteredPlayers() {
    const query = state.query.trim().toLowerCase();
    return state.players.filter((player) => {
      if (state.onlineOnly && !player.online) return false;
      if (!query) return true;
      const playerMatch = String(player.username || '').toLowerCase().includes(query)
        || String(player.displayName || '').toLowerCase().includes(query)
        || String(player.userId).includes(query)
        || gameTitle(player).toLowerCase().includes(query)
        || placeSubtitle(player).toLowerCase().includes(query);
      const itemMatch = Object.keys(player.inventory || {}).some((rawName) => {
        const definition = playerItemDefinition(player, rawName);
        return rawName.toLowerCase().includes(query) || definition.name.toLowerCase().includes(query);
      });
      const unitMatch = (player.units || []).some((unit) => String(unit.name || unit.asset || '').toLowerCase().includes(query));
      return playerMatch || itemMatch || unitMatch;
    });
  }

  function statTile(label, value, assetId, className, small = '') {
    return `
      <div class="player-stat-tile ${escapeHtml(className)}">
        <div class="player-stat-copy"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>${small ? `<small>${escapeHtml(small)}</small>` : ''}</div>
        ${assetIconHtml(assetId, label, 'player-stat-icon', '◇')}
      </div>`;
  }

  function playerCard(player) {
    const image = avatarUrl(player.userId);
    const fallback = escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase());
    const avatarHtml = image
      ? `<img class="avatar-image" src="${escapeHtml(image)}" alt="Roblox avatar" loading="lazy">`
      : `<div class="avatar-fallback">${fallback}</div>`;

    return `
      <article class="player-card card-corners">
        <div class="player-status ${player.online ? '' : 'offline'}"><i></i>${player.online ? 'TRACKING' : 'OFFLINE'}</div>
        <div class="avatar-stage">${avatarHtml}</div>
        <div class="profile-block">
          <div class="profile-name"><span>♙</span><strong>${escapeHtml(maskPlayerName(player.displayName || player.username))}</strong></div>
          <span class="profile-game">${escapeHtml(singlePlaceTitle(player))}</span>
          <div class="profile-description">${escapeHtml(playerDescription(player))}</div>
        </div>
        <div class="player-dashboard-stats">
          ${statTile('LEVEL', formatNumber(playerLevel(player)), PLAYER_EXP_ASSET_ID, 'level', playerXpText(player))}
          ${statTile('GEMS', compactNumber(getGemAmount(player)), GEM_ASSET_ID, 'gems')}
          ${statTile('TRAIT REROLLS', compactNumber(getTraitRerolls(player)), 112860527247753, 'traits')}
          ${statTile('GOLD', compactNumber(getGoldAmount(player)), 135239612382433, 'gold')}
        </div>
        <div class="card-action">
          <div class="card-action-buttons">
            <button class="inventory-button" type="button" data-inventory-user-id="${escapeHtml(player.userId)}">
              ${assetIconHtml(BAG_ASSET_ID, 'Inventory', 'inventory-button-icon', '▣')}<span>View Inventory</span>
            </button>
            <button class="units-button" type="button" data-unit-user-id="${escapeHtml(player.userId)}"><span>♟</span><span>View Units</span></button>
            <button class="details-button" type="button" data-details-user-id="${escapeHtml(player.userId)}"><span>◎</span><span>Details</span></button>
          </div>
          <div class="card-meta"><span>⌁ ${relativeTime(player.ageSeconds)}</span><strong>${player.online ? 'LIVE' : 'IDLE'}</strong></div>
        </div>
      </article>`;
  }

  function renderPlayers() {
    const players = filteredPlayers();
    elements.accountCount.textContent = `${players.length} account${players.length === 1 ? '' : 's'}`;
    elements.playerGrid.innerHTML = players.map(playerCard).join('');
    elements.empty.hidden = players.length !== 0;
    elements.playerGrid.querySelectorAll('[data-inventory-user-id]').forEach((button) => button.addEventListener('click', () => openInventoryModal(Number(button.dataset.inventoryUserId))));
    elements.playerGrid.querySelectorAll('[data-unit-user-id]').forEach((button) => button.addEventListener('click', () => openUnitModal(Number(button.dataset.unitUserId))));
    elements.playerGrid.querySelectorAll('[data-details-user-id]').forEach((button) => button.addEventListener('click', () => openDetailsModal(Number(button.dataset.detailsUserId))));
  }

  function fillPlayerModalHeader(player, nameEl, subtitleEl, avatarEl) {
    nameEl.textContent = maskPlayerName(player.displayName || player.username);
    subtitleEl.textContent = singlePlaceTitle(player);
    const image = avatarUrl(player.userId);
    avatarEl.innerHTML = image
      ? `<img src="${escapeHtml(image)}" alt="Roblox avatar">`
      : `<span>${escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase())}</span>`;
  }

  function renderInventoryModal() {
    const player = selectedInventoryPlayer();
    if (!player) { closeInventoryModal(); return; }
    fillPlayerModalHeader(player, elements.modalName, elements.modalSubtitle, elements.modalAvatar);
    elements.modalItemTypes.textContent = formatNumber(player.itemTypes);
    elements.modalTotalGems.textContent = formatNumber(getGemAmount(player));
    elements.modalLastSync.textContent = relativeTime(player.ageSeconds);

    const query = state.modalQuery.trim().toLowerCase();
    const items = Object.entries(player.inventory || {})
      .map(([rawName, amount]) => {
        const definition = playerItemDefinition(player, rawName);
        return { rawName, displayName: definition.name, assetId: definition.assetId, amount: Number(amount) || 0 };
      })
      .filter((item) => item.rawName.toLowerCase().includes(query) || item.displayName.toLowerCase().includes(query))
      .sort((a, b) => state.modalSort === 'name' ? a.displayName.localeCompare(b.displayName) : b.amount - a.amount || a.displayName.localeCompare(b.displayName));

    elements.itemGrid.innerHTML = items.map((item) => `
      <article class="inventory-card">
        <div class="inventory-card-icon">${item.assetId ? assetIconHtml(item.assetId, item.displayName, 'inventory-large-icon', itemIconFallback(item.displayName)) : `<span class="inventory-large-icon icon-fallback">${escapeHtml(itemIconFallback(item.displayName))}</span>`}</div>
        <div class="inventory-card-copy"><strong>${escapeHtml(item.displayName)}</strong><span>${formatNumber(item.amount)}</span></div>
      </article>`).join('');
    elements.inventoryEmpty.hidden = items.length !== 0;
  }

  function unitImage(unit) {
    const candidates = [unit?.name, unit?.asset].map(normalizeUnitName).filter(Boolean);
    for (const key of candidates) if (UNIT_IMAGES[key]) return UNIT_IMAGES[key];
    return '';
  }

  function rarityClass(rarity) {
    return normalizeItemName(rarity || 'Unknown').replace(/\s+/g, '-');
  }

  function traitDefinition(name) {
    return TRAIT_DEFINITIONS[String(name || '').trim()] || null;
  }

  function traitBadge(name) {
    const value = String(name || '').trim();
    if (!value || value.toLowerCase() === 'none') return '';
    const definition = traitDefinition(value);
    const rarity = definition?.rarity || 'Unknown';
    const icon = definition?.assetId ? assetIconHtml(definition.assetId, value, 'trait-icon', '✦') : '<span class="trait-icon icon-fallback">✦</span>';
    return `<span class="trait-badge trait-${rarityClass(rarity)}">${icon}<span>${escapeHtml(value)}</span></span>`;
  }

  function syncUnitFilterOptions(units) {
    const rarities = [...new Set(units.map((unit) => unit.rarity).filter(Boolean))].sort((a, b) => (RARITY_ORDER[b] || 0) - (RARITY_ORDER[a] || 0));
    const traits = [...new Set(units.map((unit) => unit.trait).filter((trait) => trait && String(trait).toLowerCase() !== 'none'))].sort();
    elements.unitRarity.innerHTML = '<option value="all">All rarities</option>' + rarities.map((rarity) => `<option value="${escapeHtml(rarity)}">${escapeHtml(rarity)}</option>`).join('');
    elements.unitTrait.innerHTML = '<option value="all">All traits</option>' + traits.map((trait) => `<option value="${escapeHtml(trait)}">${escapeHtml(trait)}</option>`).join('');
    elements.unitRarity.value = rarities.includes(state.unitRarity) ? state.unitRarity : 'all';
    elements.unitTrait.value = traits.includes(state.unitTrait) ? state.unitTrait : 'all';
  }

  function renderUnitModal() {
    const player = selectedUnitPlayer();
    if (!player) { closeUnitModal(); return; }
    fillPlayerModalHeader(player, elements.unitName, elements.unitSubtitle, elements.unitAvatar);
    const allUnits = Array.isArray(player.units) ? player.units : [];
    elements.unitCount.textContent = formatNumber(allUnits.length);
    elements.unitSecretCount.textContent = formatNumber(allUnits.filter((unit) => String(unit.rarity).toLowerCase() === 'secret').length);
    elements.unitMythicCount.textContent = formatNumber(allUnits.filter((unit) => String(unit.rarity).toLowerCase() === 'mythic').length);
    elements.unitShinyCount.textContent = formatNumber(allUnits.filter((unit) => unit.shiny === true).length);

    const query = state.unitQuery.trim().toLowerCase();
    const units = allUnits.filter((unit) => {
      const matchesQuery = !query || [unit.name, unit.asset, unit.trait, unit.rarity].some((value) => String(value || '').toLowerCase().includes(query));
      const matchesRarity = state.unitRarity === 'all' || unit.rarity === state.unitRarity;
      const matchesTrait = state.unitTrait === 'all' || unit.trait === state.unitTrait;
      return matchesQuery && matchesRarity && matchesTrait;
    }).sort((a, b) => (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0) || (Number(b.level) || 0) - (Number(a.level) || 0) || String(a.name).localeCompare(String(b.name)));

    elements.unitGrid.innerHTML = units.map((unit) => {
      const image = unitImage(unit);
      const rarity = unit.rarity || 'Unknown';
      return `
        <article class="unit-card rarity-${rarityClass(rarity)}">
          <div class="unit-image-wrap">${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(unit.name || unit.asset)}" loading="lazy">` : `<span class="unit-image-fallback">${escapeHtml(String(unit.name || unit.asset || '?').slice(0, 2).toUpperCase())}</span>`}</div>
          <div class="unit-card-body">
            <div class="unit-title-row"><strong title="${escapeHtml(unit.name || unit.asset)}">${escapeHtml(unit.name || unit.asset)}</strong><span>Lv ${formatNumber(unit.level || 1)}</span></div>
            <div class="unit-badges"><span class="rarity-badge">${escapeHtml(rarity)}</span>${unit.shiny === true ? '<span class="shiny-badge">✦ Shiny</span>' : ''}</div>
            <div class="unit-trait-row">${traitBadge(unit.trait) || '<span class="no-trait">No trait</span>'}</div>
          </div>
        </article>`;
    }).join('');
    elements.unitEmpty.hidden = units.length !== 0;
  }

  function rewardIconFor(name) {
    const definition = itemDefinition(name);
    if (definition.assetId) return assetIconHtml(definition.assetId, definition.name, 'reward-icon', itemIconFallback(definition.name));
    return `<span class="reward-icon icon-fallback">${escapeHtml(itemIconFallback(name))}</span>`;
  }

  function resultLogs(player) {
    return Array.isArray(player?.resultLogs) ? player.resultLogs.slice() : [];
  }

  function renderDetailsModal() {
    const player = selectedDetailsPlayer();
    if (!player) { closeDetailsModal(); return; }
    elements.detailsName.textContent = maskPlayerName(player.displayName || player.username);
    elements.detailsServerLine.textContent = singlePlaceTitle(player);
    elements.detailsDescription.textContent = playerDescription(player);
    elements.detailsLevel.textContent = formatNumber(playerLevel(player));
    elements.detailsLevelXp.textContent = playerXpText(player);
    elements.detailsTotalGems.textContent = compactNumber(getGemAmount(player));
    elements.detailsTraitRerolls.textContent = compactNumber(getTraitRerolls(player));
    elements.detailsGold.textContent = compactNumber(getGoldAmount(player));
    elements.detailsLastSync.textContent = relativeTime(player.ageSeconds);
    elements.detailsGame.textContent = singlePlaceTitle(player);
    elements.detailsService.textContent = playerDescription(player);
    elements.detailsMode.textContent = 'Farm';

    const trackerSettings = player.trackerSettings || {};
    elements.detailsTrackerStatus.textContent = trackerSettings.sendEnabled === false ? 'Paused' : 'Sending';
    elements.detailsSendInterval.textContent = `${formatNumber(trackerSettings.sendInterval || 15)} SEC`;
    elements.detailsMaxResultLogs.textContent = formatNumber(trackerSettings.maxResultLogs || 20);

    const logs = resultLogs(player).sort((a, b) => (Number(b.finishedAt) || 0) - (Number(a.finishedAt) || 0));
    const wins = logs.filter((log) => String(log.result || '').toLowerCase().includes('victory')).length;
    elements.detailsRunsCount.textContent = formatNumber(logs.length);
    elements.detailsCurrentWave.textContent = formatNumber(player.currentWave || 0);
    elements.detailsTotalWins.textContent = formatNumber(wins);
    elements.detailsLogSummary.textContent = `Latest ${logs.length} run${logs.length === 1 ? '' : 's'}`;

    const image = avatarUrl(player.userId);
    const fallback = escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase());
    elements.detailsAvatar.innerHTML = image ? `<img class="details-avatar-image" src="${escapeHtml(image)}" alt="Roblox avatar" loading="lazy">` : `<div class="details-avatar-fallback">${fallback}</div>`;
    elements.detailsStatus.classList.toggle('offline', !player.online);
    elements.detailsStatus.innerHTML = `<i></i>${player.online ? 'TRACKING' : 'OFFLINE'}`;

    elements.detailsLogList.innerHTML = logs.length ? logs.map((log) => {
      const rewards = Array.isArray(log.rewards) ? log.rewards : [];
      const rewardsHtml = rewards.length ? rewards.map((reward) => `<span class="reward-chip">${rewardIconFor(reward.name)}<span>${escapeHtml(reward.name)} x${formatNumber(reward.amount)}</span></span>`).join('') : '<span class="detail-chip muted">No rewards found</span>';
      const isVictory = String(log.result || '').toLowerCase().includes('victory');
      const stageText = log.stageName || singlePlaceTitle(player);
      const dateValue = Number(log.finishedAt) ? new Date(Number(log.finishedAt) > 9_999_999_999 ? Number(log.finishedAt) : Number(log.finishedAt) * 1000) : null;
      return `
        <article class="result-entry ${isVictory ? 'victory' : 'defeat'}">
          <div class="result-entry-top">
            <div><span class="result-state">${escapeHtml(log.result || 'Victory')}</span><h3>${escapeHtml(stageText)}</h3></div>
            <div class="result-entry-side">${log.clearTime ? `<strong>${escapeHtml(log.clearTime)}</strong>` : ''}<span>${escapeHtml(dateValue ? formatDateTime(dateValue) : '--')}</span></div>
          </div>
          <div class="run-meta-row">${Number(log.wave) > 0 ? `<span class="wave-chip">${assetIconHtml(WAVE_ASSET_ID, 'Wave', 'wave-chip-icon', '≋')} Wave ${formatNumber(log.wave)}</span>` : ''}${log.description ? `<span>${escapeHtml(log.description)}</span>` : ''}</div>
          <div class="reward-row">${rewardsHtml}</div>
        </article>`;
    }).join('') : '<div class="details-empty">No run logs yet. Finish a game and let the tracker sync again.</div>';
  }

  function openInventoryModal(userId) {
    state.selectedInventoryUserId = userId; state.modalQuery = ''; state.modalSort = 'amount';
    elements.modalSearch.value = ''; elements.modalSort.value = 'amount'; elements.modal.hidden = false;
    document.body.style.overflow = 'hidden'; renderInventoryModal(); setTimeout(() => elements.modalSearch.focus(), 0);
  }
  function closeInventoryModal() { state.selectedInventoryUserId = null; elements.modal.hidden = true; unlockBody(); }

  function openUnitModal(userId) {
    state.selectedUnitUserId = userId; state.unitQuery = ''; state.unitRarity = 'all'; state.unitTrait = 'all';
    elements.unitSearch.value = ''; const player = selectedUnitPlayer(); syncUnitFilterOptions(Array.isArray(player?.units) ? player.units : []);
    elements.unitModal.hidden = false; document.body.style.overflow = 'hidden'; renderUnitModal(); setTimeout(() => elements.unitSearch.focus(), 0);
  }
  function closeUnitModal() { state.selectedUnitUserId = null; elements.unitModal.hidden = true; unlockBody(); }

  function openDetailsModal(userId) { state.selectedDetailsUserId = userId; elements.detailsModal.hidden = false; document.body.style.overflow = 'hidden'; renderDetailsModal(); }
  function closeDetailsModal() { state.selectedDetailsUserId = null; elements.detailsModal.hidden = true; unlockBody(); }
  function unlockBody() { if (elements.modal.hidden && elements.unitModal.hidden && elements.detailsModal.hidden) document.body.style.overflow = ''; }

  async function loadAvatars(players) {
    const missingIds = players.map((player) => Number(player.userId)).filter((userId) => Number.isFinite(userId) && userId > 0 && !state.avatars.has(userId));
    if (!missingIds.length) return;
    try {
      const response = await fetch(`/api/avatars?userIds=${encodeURIComponent(missingIds.slice(0, 100).join(','))}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.avatars) return;
      Object.entries(data.avatars).forEach(([rawId, imageUrl]) => { const userId = Number(rawId); if (Number.isFinite(userId) && imageUrl) state.avatars.set(userId, imageUrl); });
      renderPlayers(); if (state.selectedInventoryUserId) renderInventoryModal(); if (state.selectedUnitUserId) renderUnitModal(); if (state.selectedDetailsUserId) renderDetailsModal();
    } catch { /* fallback */ }
  }

  async function loadAssetIcons() {
    const traitIds = Object.values(TRAIT_DEFINITIONS).map((definition) => definition.assetId);
    const assetIds = [...new Set([BAG_ASSET_ID, PLAYER_EXP_ASSET_ID, WAVE_ASSET_ID, ...traitIds, ...ITEM_DEFINITIONS.map((definition) => definition.assetId)].filter(Boolean).map(Number))];
    try {
      for (let index = 0; index < assetIds.length; index += 100) {
        const chunk = assetIds.slice(index, index + 100);
        const response = await fetch(`/api/item-icons?assetIds=${encodeURIComponent(chunk.join(','))}`, { cache: 'force-cache' });
        const data = await response.json();
        if (!response.ok || !data.ok || !data.icons) continue;
        Object.entries(data.icons).forEach(([rawId, imageUrl]) => { const assetId = Number(rawId); if (Number.isFinite(assetId) && imageUrl) state.assetIcons.set(assetId, imageUrl); });
      }
      renderMetrics(); renderRecent(); renderPlayers();
      if (state.selectedInventoryUserId) renderInventoryModal(); if (state.selectedUnitUserId) renderUnitModal(); if (state.selectedDetailsUserId) renderDetailsModal();
    } catch { /* fallback */ }
  }

  async function loadPlayers() {
    elements.refreshButton.disabled = true;
    try {
      const response = await fetch('/api/players', { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Unable to load players');
      state.players = Array.isArray(data.players) ? data.players : [];
      elements.error.hidden = true; elements.lastRefresh.textContent = `Updated ${new Date().toLocaleTimeString()}`;
      renderMetrics(); renderRecent(); renderPlayers();
      if (state.selectedInventoryUserId) renderInventoryModal(); if (state.selectedUnitUserId) renderUnitModal(); if (state.selectedDetailsUserId) renderDetailsModal();
      loadAvatars(state.players);
    } catch (error) {
      elements.error.textContent = error instanceof Error ? error.message : 'Unable to load players'; elements.error.hidden = false;
    } finally { elements.loading.hidden = true; elements.refreshButton.disabled = false; }
  }

  elements.mainSearch.addEventListener('input', (event) => { state.query = event.target.value; renderPlayers(); });
  elements.onlineOnly.addEventListener('change', (event) => { state.onlineOnly = event.target.checked; renderPlayers(); });
  elements.refreshButton.addEventListener('click', loadPlayers);
  elements.modalClose.addEventListener('click', closeInventoryModal);
  elements.modal.addEventListener('mousedown', (event) => { if (event.target === elements.modal) closeInventoryModal(); });
  elements.modalSearch.addEventListener('input', (event) => { state.modalQuery = event.target.value; renderInventoryModal(); });
  elements.modalSort.addEventListener('change', (event) => { state.modalSort = event.target.value; renderInventoryModal(); });
  elements.unitClose.addEventListener('click', closeUnitModal);
  elements.unitModal.addEventListener('mousedown', (event) => { if (event.target === elements.unitModal) closeUnitModal(); });
  elements.unitSearch.addEventListener('input', (event) => { state.unitQuery = event.target.value; renderUnitModal(); });
  elements.unitRarity.addEventListener('change', (event) => { state.unitRarity = event.target.value; renderUnitModal(); });
  elements.unitTrait.addEventListener('change', (event) => { state.unitTrait = event.target.value; renderUnitModal(); });
  elements.detailsClose.addEventListener('click', closeDetailsModal);
  elements.detailsModal.addEventListener('mousedown', (event) => { if (event.target === elements.detailsModal) closeDetailsModal(); });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!elements.detailsModal.hidden) closeDetailsModal(); else if (!elements.unitModal.hidden) closeUnitModal(); else if (!elements.modal.hidden) closeInventoryModal();
  });
  elements.startDashboard.addEventListener('click', () => { setView('dashboard'); history.replaceState(null, '', '#dashboard'); });
  elements.navLinks.forEach((link) => link.addEventListener('click', (event) => {
    const view = link.dataset.nav; if (view === 'home' || view === 'dashboard') { event.preventDefault(); setView(view); history.replaceState(null, '', view === 'home' ? '#home' : '#dashboard'); }
  }));

  const initialHash = window.location.hash.toLowerCase();
  setView(initialHash === '#dashboard' ? 'dashboard' : 'home');
  loadAssetIcons(); loadPlayers(); setInterval(loadPlayers, 5000);
})();
