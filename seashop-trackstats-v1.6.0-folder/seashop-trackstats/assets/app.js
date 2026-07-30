(() => {
  const BAG_ASSET_ID = 107587767759857;
  const GEM_ASSET_ID = 127345120309392;

  const ITEM_DEFINITIONS = [
    { name: '8th\'s Sword', assetId: 98131647273476, aliases: ['KenpachiEVOitem'] },
    { name: 'Anvil', assetId: 87373295347365, aliases: ['ExpeditionStatAnvil'] },
    { name: 'Aqua Shard', assetId: 134586230895171, aliases: ['ExpeditionMaterial3'] },
    { name: 'Battlepass EXP', assetId: 114328894217766, aliases: ['BattlepassEXP'] },
    { name: 'Beginner\'s Ticket', assetId: 92708131788468, aliases: ['BeginnerTicket'] },
    { name: 'Black Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorBlack'] },
    { name: 'Blue Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorBlue'] },
    { name: 'Bunny Candy', assetId: 114002509716577, aliases: ['FoodItem6'] },
    { name: 'Burning Fruit', assetId: 123556219241960, aliases: ['BurningFruit'] },
    { name: 'Cobalt Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorCobalt'] },
    { name: 'Cosmic Magic', assetId: 121833778269255, aliases: ['CosmicMagic'] },
    { name: 'Crimson Unit Indicator Color', assetId: 86214153130821, aliases: ['AOEColorCrimson'] },
    { name: 'Crimson Vial', assetId: 94381461409309, aliases: ['CrimsonVial'] },
    { name: 'Crow Relic', assetId: 76923936793147, aliases: ['CrowRelic'] },
    { name: 'Crow\'s Ring', assetId: 87203191785095, aliases: ['ItachiEVOItem'] },
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

  const state = {
    players: [],
    avatars: new Map(),
    assetIcons: new Map(),
    query: '',
    onlineOnly: false,
    selectedUserId: null,
    modalQuery: '',
    modalSort: 'amount',
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

  const itemDefinitionByKey = new Map();
  for (const definition of ITEM_DEFINITIONS) {
    const keys = [definition.name, ...(definition.aliases || [])];
    for (const key of keys) itemDefinitionByKey.set(normalizeItemName(key), definition);
  }

  const elements = {
    overviewTotal: $('overview-total'),
    overviewPlayers: $('overview-players'),
    overviewOnline: $('overview-online'),
    overviewItems: $('overview-items'),
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
    itemTableBody: $('item-table-body'),
    inventoryEmpty: $('inventory-empty'),
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

  function itemDefinition(rawName) {
    return itemDefinitionByKey.get(normalizeItemName(rawName)) || {
      name: humanizeItemName(rawName),
      assetId: null,
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
    if (lower.includes('gold') || lower.includes('coin')) return '●';
    if (lower.includes('reroll') || lower.includes('roll')) return '↻';
    if (lower.includes('fuel')) return '▲';
    if (lower.includes('food')) return '✦';
    if (lower.includes('sprite')) return '✧';
    if (lower.includes('token')) return '⬡';
    if (lower.includes('material')) return '▣';
    if (lower.includes('lock')) return '▰';
    if (lower.includes('currency')) return '◈';
    return '◇';
  }

  function assetIconUrl(assetId) {
    return state.assetIcons.get(Number(assetId)) || '';
  }

  function assetIconHtml(assetId, name, className = 'item-icon-image', fallback = '◇') {
    const imageUrl = assetIconUrl(assetId);
    if (imageUrl) {
      return `<img class="${escapeHtml(className)}" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(name)}" loading="lazy">`;
    }
    return `<span class="${escapeHtml(className)} icon-fallback" aria-hidden="true">${escapeHtml(fallback)}</span>`;
  }

  function selectedPlayer() {
    return state.players.find((player) => player.userId === state.selectedUserId) || null;
  }

  function avatarUrl(userId) {
    return state.avatars.get(Number(userId)) || '';
  }

  function getGemAmount(player) {
    let total = 0;
    for (const [name, amount] of Object.entries(player?.inventory || {})) {
      if (normalizeItemName(itemDisplayName(player, name)) === 'gem') {
        total += Number(amount) || 0;
      }
    }
    return total;
  }

  function playerDescription(player) {
    if (typeof player?.cardDescription === 'string' && player.cardDescription.trim()) {
      return player.cardDescription.trim();
    }
    return 'Live inventory tracking';
  }

  function totalGems() {
    return state.players.reduce((sum, player) => sum + getGemAmount(player), 0);
  }

  function setView(view) {
    state.currentView = view === 'dashboard' ? 'dashboard' : 'home';
    const isDashboard = state.currentView === 'dashboard';
    elements.homeView.hidden = isDashboard;
    elements.dashboardView.hidden = !isDashboard;
    elements.navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === state.currentView);
    });
    if (isDashboard) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  }

  function renderMetrics() {
    const onlineCount = state.players.filter((player) => player.online).length;
    const itemNames = new Set(state.players.flatMap((player) =>
      Object.keys(player.inventory || {}).map((rawName) => itemDisplayName(player, rawName))));

    elements.overviewTotal.textContent = formatNumber(totalGems());
    elements.overviewPlayers.textContent = formatNumber(state.players.length);
    elements.overviewOnline.textContent = formatNumber(onlineCount);
    elements.overviewItems.textContent = formatNumber(itemNames.size);

    document.querySelectorAll('[data-static-asset-id]').forEach((target) => {
      const url = assetIconUrl(Number(target.dataset.staticAssetId));
      if (url) {
        target.src = url;
        target.hidden = false;
      }
    });
  }

  function renderRecent() {
    const recent = state.players.slice(0, 6);
    elements.recentList.innerHTML = recent.length
      ? recent.map((player) => `
        <div class="recent-item">
          <span class="recent-time">[${escapeHtml(clockTime(player.updatedAt))}]</span>
          <span class="recent-player">${escapeHtml(player.displayName || player.username)}</span>
          <span class="recent-amount">${assetIconHtml(GEM_ASSET_ID, 'Gem', 'recent-gem-icon', '◆')}${formatNumber(getGemAmount(player))}</span>
        </div>
      `).join('')
      : '<p class="side-empty">Waiting for player data...</p>';
  }

  function filteredPlayers() {
    const query = state.query.trim().toLowerCase();
    return state.players.filter((player) => {
      if (state.onlineOnly && !player.online) return false;
      if (!query) return true;
      const playerMatch = player.username.toLowerCase().includes(query)
        || (player.displayName || '').toLowerCase().includes(query)
        || playerDescription(player).toLowerCase().includes(query)
        || String(player.userId).includes(query);
      const itemMatch = Object.keys(player.inventory || {}).some((rawName) => {
        const definition = playerItemDefinition(player, rawName);
        return rawName.toLowerCase().includes(query) || definition.name.toLowerCase().includes(query);
      });
      return playerMatch || itemMatch;
    });
  }

  function playerCard(player) {
    const image = avatarUrl(player.userId);
    const fallback = escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase());
    const avatarHtml = image
      ? `<img class="avatar-image" src="${escapeHtml(image)}" alt="Roblox avatar of ${escapeHtml(player.displayName || player.username)}" loading="lazy">`
      : `<div class="avatar-fallback">${fallback}</div>`;

    return `
      <article class="player-card card-corners">
        <div class="player-status ${player.online ? '' : 'offline'}"><i></i>${player.online ? 'TRACKING' : 'OFFLINE'}</div>
        <div class="avatar-stage">${avatarHtml}</div>
        <div class="profile-block">
          <div class="profile-name"><span>♙</span><strong>${escapeHtml(player.displayName || player.username)}</strong></div>
          <small>@${escapeHtml(player.username)} · ID ${escapeHtml(player.userId)}</small>
          <span class="profile-game">Anime Expeditions</span>
          <div class="profile-description">${escapeHtml(playerDescription(player))}</div>
        </div>
        <div class="player-quick-stats">
          <div><span>Item Types</span><strong>${formatNumber(player.itemTypes)}</strong></div>
          <div class="gem-quick-stat"><span>Total Gems</span><strong>${assetIconHtml(GEM_ASSET_ID, 'Gem', 'quick-gem-icon', '◆')}${formatNumber(getGemAmount(player))}</strong></div>
        </div>
        <div class="card-action">
          <button class="inventory-button" type="button" data-user-id="${escapeHtml(player.userId)}">
            ${assetIconHtml(BAG_ASSET_ID, 'Inventory bag', 'inventory-button-icon', '▣')}
            <span>View Inventory</span>
          </button>
          <div class="card-meta">
            <span>⌁ ${relativeTime(player.ageSeconds)}</span>
            <strong>${player.online ? 'LIVE' : 'IDLE'}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function renderPlayers() {
    const players = filteredPlayers();
    elements.accountCount.textContent = `${players.length} account${players.length === 1 ? '' : 's'}`;
    elements.playerGrid.innerHTML = players.map(playerCard).join('');
    elements.empty.hidden = players.length !== 0;

    elements.playerGrid.querySelectorAll('[data-user-id]').forEach((button) => {
      button.addEventListener('click', () => openModal(Number(button.dataset.userId)));
    });
  }

  function renderModal() {
    const player = selectedPlayer();
    if (!player) {
      closeModal();
      return;
    }

    elements.modalName.textContent = player.displayName || player.username;
    elements.modalSubtitle.textContent = `@${player.username} · User ID ${player.userId}`;
    elements.modalItemTypes.textContent = formatNumber(player.itemTypes);
    elements.modalTotalGems.textContent = formatNumber(getGemAmount(player));
    elements.modalLastSync.textContent = relativeTime(player.ageSeconds);

    const image = avatarUrl(player.userId);
    elements.modalAvatar.innerHTML = image
      ? `<img src="${escapeHtml(image)}" alt="Roblox avatar of ${escapeHtml(player.displayName || player.username)}">`
      : `<span>${escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase())}</span>`;

    const query = state.modalQuery.trim().toLowerCase();
    const items = Object.entries(player.inventory || {})
      .map(([rawName, amount]) => {
        const definition = playerItemDefinition(player, rawName);
        return {
          rawName,
          displayName: definition.name,
          assetId: definition.assetId,
          amount: Number(amount) || 0,
        };
      })
      .filter((item) => item.rawName.toLowerCase().includes(query) || item.displayName.toLowerCase().includes(query))
      .sort((a, b) => state.modalSort === 'name'
        ? a.displayName.localeCompare(b.displayName)
        : b.amount - a.amount || a.displayName.localeCompare(b.displayName));

    elements.itemTableBody.innerHTML = items.map((item) => `
      <tr>
        <td>
          <div class="inventory-item">
            ${item.assetId
              ? assetIconHtml(item.assetId, item.displayName, 'item-icon-image', itemIconFallback(item.displayName))
              : `<span class="item-icon-image icon-fallback" aria-hidden="true">${escapeHtml(itemIconFallback(item.displayName))}</span>`}
            <div class="inventory-item-copy">
              <strong title="${escapeHtml(item.displayName)}">${escapeHtml(item.displayName)}</strong>
              <small>Key: ${escapeHtml(item.rawName)}</small>
            </div>
          </div>
        </td>
        <td><strong class="inventory-amount">${formatNumber(item.amount)}</strong></td>
      </tr>
    `).join('');
    elements.inventoryEmpty.hidden = items.length !== 0;
    elements.itemTableBody.closest('table').hidden = items.length === 0;
  }

  function openModal(userId) {
    state.selectedUserId = userId;
    state.modalQuery = '';
    state.modalSort = 'amount';
    elements.modalSearch.value = '';
    elements.modalSort.value = 'amount';
    elements.modal.hidden = false;
    document.body.style.overflow = 'hidden';
    renderModal();
    setTimeout(() => elements.modalSearch.focus(), 0);
  }

  function closeModal() {
    state.selectedUserId = null;
    elements.modal.hidden = true;
    document.body.style.overflow = '';
  }

  async function loadAvatars(players) {
    const missingIds = players
      .map((player) => Number(player.userId))
      .filter((userId) => Number.isFinite(userId) && userId > 0 && !state.avatars.has(userId));
    if (!missingIds.length) return;

    try {
      const response = await fetch(`/api/avatars?userIds=${encodeURIComponent(missingIds.slice(0, 100).join(','))}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.avatars) return;

      Object.entries(data.avatars).forEach(([rawId, imageUrl]) => {
        const userId = Number(rawId);
        if (Number.isFinite(userId) && typeof imageUrl === 'string' && imageUrl) {
          state.avatars.set(userId, imageUrl);
        }
      });

      renderPlayers();
      if (state.selectedUserId) renderModal();
    } catch {
      // Keep fallback initials if avatar lookup fails.
    }
  }

  async function loadAssetIcons() {
    const assetIds = [...new Set([
      BAG_ASSET_ID,
      ...ITEM_DEFINITIONS.map((definition) => definition.assetId),
    ].filter(Boolean).map(Number))];

    try {
      for (let index = 0; index < assetIds.length; index += 100) {
        const chunk = assetIds.slice(index, index + 100);
        const response = await fetch(`/api/item-icons?assetIds=${encodeURIComponent(chunk.join(','))}`, { cache: 'force-cache' });
        const data = await response.json();
        if (!response.ok || !data.ok || !data.icons) continue;

        Object.entries(data.icons).forEach(([rawId, imageUrl]) => {
          const assetId = Number(rawId);
          if (Number.isFinite(assetId) && typeof imageUrl === 'string' && imageUrl) {
            state.assetIcons.set(assetId, imageUrl);
          }
        });
      }

      renderMetrics();
      renderRecent();
      renderPlayers();
      if (state.selectedUserId) renderModal();
    } catch {
      // Keep symbol fallbacks if Roblox thumbnails are unavailable.
    }
  }

  async function loadPlayers() {
    elements.refreshButton.disabled = true;
    try {
      const response = await fetch('/api/players', { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Unable to load players');

      state.players = Array.isArray(data.players) ? data.players : [];
      elements.error.hidden = true;
      elements.lastRefresh.textContent = `Updated ${new Date().toLocaleTimeString()}`;
      renderMetrics();
      renderRecent();
      renderPlayers();
      if (state.selectedUserId) renderModal();
      loadAvatars(state.players);
    } catch (error) {
      elements.error.textContent = error instanceof Error ? error.message : 'Unable to load players';
      elements.error.hidden = false;
    } finally {
      elements.loading.hidden = true;
      elements.refreshButton.disabled = false;
    }
  }

  elements.mainSearch.addEventListener('input', (event) => {
    state.query = event.target.value;
    renderPlayers();
  });
  elements.onlineOnly.addEventListener('change', (event) => {
    state.onlineOnly = event.target.checked;
    renderPlayers();
  });
  elements.refreshButton.addEventListener('click', loadPlayers);
  elements.modalClose.addEventListener('click', closeModal);
  elements.modal.addEventListener('mousedown', (event) => {
    if (event.target === elements.modal) closeModal();
  });
  elements.modalSearch.addEventListener('input', (event) => {
    state.modalQuery = event.target.value;
    renderModal();
  });
  elements.modalSort.addEventListener('change', (event) => {
    state.modalSort = event.target.value;
    renderModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !elements.modal.hidden) closeModal();
  });
  elements.startDashboard.addEventListener('click', () => {
    setView('dashboard');
    history.replaceState(null, '', '#dashboard');
  });
  elements.navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const view = link.dataset.nav;
      if (view === 'home' || view === 'dashboard') {
        event.preventDefault();
        setView(view);
        history.replaceState(null, '', view === 'home' ? '#home' : '#dashboard');
      }
    });
  });

  const initialHash = window.location.hash.toLowerCase();
  setView(initialHash === '#dashboard' ? 'dashboard' : 'home');
  loadAssetIcons();
  loadPlayers();
  setInterval(loadPlayers, 5000);
})();
