/* ZIP #13 — Notifications; append once to assets/js/main.js */
(() => {
  const list = document.getElementById('eduNotificationsList');
  if (!list || list.dataset.eduNotificationsInitialized === 'true') return;
  list.dataset.eduNotificationsInitialized = 'true';
  const cards = [...list.querySelectorAll('[data-edu-notification-id]')];
  const allButton = document.getElementById('eduNotificationsAll');
  const unreadButton = document.getElementById('eduNotificationsUnread');
  const markAllButton = document.getElementById('eduNotificationsMarkAll');
  const empty = document.getElementById('eduNotificationsEmpty');
  const status = document.getElementById('eduNotificationsStatus');
  let filter = 'all';
  const unreadCount = () => cards.filter(card => card.dataset.eduRead === 'false').length;
  function render() {
    const unread = unreadCount();
    document.getElementById('eduNotificationsTotal').textContent = String(cards.length);
    document.getElementById('eduNotificationsUnreadCount').textContent = String(unread);
    cards.forEach(card => { card.hidden = filter === 'unread' && card.dataset.eduRead === 'true'; });
    empty.hidden = cards.some(card => !card.hidden);
    markAllButton.disabled = unread === 0;
    [allButton, unreadButton].forEach(button => {
      const active = button.dataset.eduFilter === filter;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('btn-primary', active);
      button.classList.toggle('btn-outline-primary', !active);
    });
  }
  function markRead(card) {
    if (!card || card.dataset.eduRead === 'true') return;
    card.dataset.eduRead = 'true';
    card.classList.replace('is-unread', 'is-read');
    card.querySelector('.edu-notifications__status').textContent = 'Read';
    card.querySelector('[data-edu-mark-read]').hidden = true;
    const detail = {id: card.dataset.eduNotificationId, read: true};
    list.dispatchEvent(new CustomEvent('eduhub:notification-read-requested', {bubbles:true,detail}));
    render();
    status.textContent = `Marked notification ${detail.id} as read (demo only; not saved to a server).`;
  }
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-edu-mark-read]');
    if (button) markRead(button.closest('[data-edu-notification-id]'));
  });
  [allButton, unreadButton].forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.eduFilter;
    render();
  }));
  markAllButton.addEventListener('click', () => {
    const ids = cards.filter(card => card.dataset.eduRead === 'false').map(card => card.dataset.eduNotificationId);
    if (!ids.length) return;
    cards.forEach(card => {
      if (card.dataset.eduRead === 'true') return;
      card.dataset.eduRead = 'true';
      card.classList.replace('is-unread','is-read');
      card.querySelector('.edu-notifications__status').textContent = 'Read';
      card.querySelector('[data-edu-mark-read]').hidden = true;
    });
    list.dispatchEvent(new CustomEvent('eduhub:notifications-mark-all-read-requested', {bubbles:true,detail:{ids}}));
    render();
    status.textContent = `Marked ${ids.length} notifications as read (demo only; not saved to a server).`;
  });
  render();
})();
