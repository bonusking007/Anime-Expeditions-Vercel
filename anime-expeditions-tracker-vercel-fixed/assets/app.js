(() => {
  'use strict';

  const state = { players: [], query: '', onlineOnly: false, selectedUserId: null, modalQuery: '', modalSort: 'amount' };
  const numberFormatter = new Intl.NumberFormat('en-US');
  const $ = (id) => document.getElementById(id);

  const elements = {
    players: $('metric-players'), online: $('metric-online'), items: $('metric-items'), total: $('metric-total'),
    mainSearch: $('main-search'), onlineOnly: $('online-only'), refreshButton: $('refresh-button'),
    accountCount: $('account-count'), lastRefresh: $('last-refresh'), playerGrid: $('player-grid'),
    loading: $('loading'), empty: $('empty-page'), error: $('error-banner'), modal: $('modal-backdrop'),
    modalName: $('modal-name'), modalSubtitle: $('modal-subtitle'), modalClose: $('modal-close'),
    modalSearch: $('modal-search'), modalSort: $('modal-sort'), itemGrid: $('item-grid'),
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  }

  function formatNumber(value) { return numberFormatter.format(Number(value) || 0); }
  function relativeTime(seconds) {
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
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

  function selectedPlayer() { return state.players.find((player) => player.userId === state.selectedUserId) || null; }

  function renderMetrics() {
    const online = state.players.filter((player) => player.online).length;
    const itemNames = new Set(state.players.flatMap((player) => Object.keys(player.inventory || {})));
    const total = state.players.reduce((sum, player) => sum + (Number(player.totalAmount) || 0), 0);
    elements.players.textContent = formatNumber(state.players.length);
    elements.online.textContent = formatNumber(online);
    elements.items.textContent = formatNumber(itemNames.size);
    elements.total.textContent = formatNumber(total);
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
    const topItems = Object.entries(player.inventory || {}).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const topItemsHtml = topItems.length
      ? topItems.map(([name, amount]) => `<div><span><b>${itemIcon(name)}</b>${escapeHtml(name)}</span><strong>${formatNumber(amount)}</strong></div>`).join('')
      : '<div class="no-items">No items received yet</div>';

    return `<article class="player-card">
      <div class="player-head">
        <div class="avatar">${escapeHtml(player.username.slice(0, 2).toUpperCase())}</div>
        <div class="player-name"><strong>${escapeHtml(player.displayName || player.username)}</strong><span>@${escapeHtml(player.username)} · ${escapeHtml(player.userId)}</span></div>
        <div class="status ${player.online ? 'online' : 'offline'}"><i></i>${player.online ? 'Online' : 'Offline'}</div>
      </div>
      <div class="player-stats">
        <div><span>Item types</span><strong>${formatNumber(player.itemTypes)}</strong></div>
        <div><span>Total amount</span><strong>${formatNumber(player.totalAmount)}</strong></div>
        <div><span>Updated</span><strong>${relativeTime(player.ageSeconds)}</strong></div>
      </div>
      <div class="top-items">${topItemsHtml}</div>
      <button class="inventory-button" type="button" data-user-id="${escapeHtml(player.userId)}">View all ${formatNumber(player.itemTypes)} items <span>→</span></button>
    </article>`;
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
    if (!player) return closeModal();

    elements.modalName.textContent = player.displayName || player.username;
    elements.modalSubtitle.textContent = `@${player.username} · ${player.userId}`;
    const query = state.modalQuery.trim().toLowerCase();
    const items = Object.entries(player.inventory || {})
      .filter(([name]) => name.toLowerCase().includes(query))
      .sort((a, b) => state.modalSort === 'name' ? a[0].localeCompare(b[0]) : b[1] - a[1] || a[0].localeCompare(b[0]));

    elements.itemGrid.innerHTML = items.length
      ? items.map(([name, amount]) => `<article class="item-card"><div class="item-symbol">${itemIcon(name)}</div><div class="item-copy"><span title="${escapeHtml(name)}">${escapeHtml(name)}</span><strong>${formatNumber(amount)}</strong></div></article>`).join('')
      : '<div class="empty-state">No matching items.</div>';
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
      renderPlayers();
      if (state.selectedUserId) renderModal();
    } catch (error) {
      elements.error.textContent = error instanceof Error ? error.message : 'Unable to load players';
      elements.error.hidden = false;
    } finally {
      elements.loading.hidden = true;
      elements.refreshButton.disabled = false;
    }
  }

  elements.mainSearch.addEventListener('input', (event) => { state.query = event.target.value; renderPlayers(); });
  elements.onlineOnly.addEventListener('change', (event) => { state.onlineOnly = event.target.checked; renderPlayers(); });
  elements.refreshButton.addEventListener('click', loadPlayers);
  elements.modalClose.addEventListener('click', closeModal);
  elements.modal.addEventListener('mousedown', (event) => { if (event.target === elements.modal) closeModal(); });
  elements.modalSearch.addEventListener('input', (event) => { state.modalQuery = event.target.value; renderModal(); });
  elements.modalSort.addEventListener('change', (event) => { state.modalSort = event.target.value; renderModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !elements.modal.hidden) closeModal(); });

  loadPlayers();
  setInterval(loadPlayers, 5000);
})();
