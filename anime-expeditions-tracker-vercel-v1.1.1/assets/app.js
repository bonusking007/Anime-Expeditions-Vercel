(() => {
  const state = {
    players: [],
    avatars: new Map(),
    query: '',
    onlineOnly: false,
    selectedUserId: null,
    modalQuery: '',
    modalSort: 'amount',
  };

  const numberFormatter = new Intl.NumberFormat('en-US');
  const $ = (id) => document.getElementById(id);

  const elements = {
    players: $('metric-players'),
    online: $('metric-online'),
    offline: $('metric-offline'),
    items: $('metric-items'),
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
    modalTotalAmount: $('modal-total-amount'),
    modalLastSync: $('modal-last-sync'),
    modalClose: $('modal-close'),
    modalSearch: $('modal-search'),
    modalSort: $('modal-sort'),
    itemTableBody: $('item-table-body'),
    inventoryEmpty: $('inventory-empty'),
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

  function itemIcon(name) {
    const lower = name.toLowerCase();
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

  function selectedPlayer() {
    return state.players.find((player) => player.userId === state.selectedUserId) || null;
  }

  function avatarUrl(userId) {
    return state.avatars.get(Number(userId)) || '';
  }

  function renderMetrics() {
    const onlineCount = state.players.filter((player) => player.online).length;
    const offlineCount = Math.max(0, state.players.length - onlineCount);
    const itemNames = new Set(state.players.flatMap((player) => Object.keys(player.inventory || {})));
    const totalAmount = state.players.reduce((sum, player) => sum + (Number(player.totalAmount) || 0), 0);

    elements.players.textContent = formatNumber(state.players.length);
    elements.online.textContent = formatNumber(onlineCount);
    elements.offline.textContent = formatNumber(offlineCount);
    elements.items.textContent = formatNumber(itemNames.size);
    elements.overviewTotal.textContent = formatNumber(totalAmount);
    elements.overviewPlayers.textContent = formatNumber(state.players.length);
    elements.overviewOnline.textContent = formatNumber(onlineCount);
    elements.overviewItems.textContent = formatNumber(itemNames.size);
  }

  function renderRecent() {
    const recent = state.players.slice(0, 7);
    elements.recentList.innerHTML = recent.length
      ? recent.map((player) => `
        <div class="recent-item">
          <span class="recent-time">[${escapeHtml(clockTime(player.updatedAt))}]</span>
          <span class="recent-player">${escapeHtml(player.displayName || player.username)}</span>
          <span class="recent-amount">+${formatNumber(player.itemTypes)}</span>
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
        || String(player.userId).includes(query);
      const itemMatch = Object.keys(player.inventory || {}).some((name) => name.toLowerCase().includes(query));
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
        </div>
        <div class="card-action">
          <button class="inventory-button" type="button" data-user-id="${escapeHtml(player.userId)}">
            <span>View Inventory</span>
            <b>${formatNumber(player.itemTypes)} ITEMS →</b>
          </button>
          <div class="card-meta">
            <span>◫ ${escapeHtml(player.placeId || 'Unknown Place')}</span>
            <strong>⌁ ${relativeTime(player.ageSeconds)}</strong>
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
    elements.modalTotalAmount.textContent = formatNumber(player.totalAmount);
    elements.modalLastSync.textContent = relativeTime(player.ageSeconds);

    const image = avatarUrl(player.userId);
    elements.modalAvatar.innerHTML = image
      ? `<img src="${escapeHtml(image)}" alt="Roblox avatar of ${escapeHtml(player.displayName || player.username)}">`
      : `<span>${escapeHtml((player.displayName || player.username).slice(0, 2).toUpperCase())}</span>`;

    const query = state.modalQuery.trim().toLowerCase();
    const items = Object.entries(player.inventory || {})
      .filter(([name]) => name.toLowerCase().includes(query))
      .sort((a, b) => state.modalSort === 'name'
        ? a[0].localeCompare(b[0])
        : b[1] - a[1] || a[0].localeCompare(b[0]));

    elements.itemTableBody.innerHTML = items.map(([name, amount]) => `
      <tr>
        <td><div class="inventory-item"><b class="item-symbol">${itemIcon(name)}</b><span title="${escapeHtml(name)}">${escapeHtml(name)}</span></div></td>
        <td>${formatNumber(amount)}</td>
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
      // Keep initial-based fallbacks when Roblox thumbnails are unavailable.
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

  loadPlayers();
  setInterval(loadPlayers, 5000);
})();
