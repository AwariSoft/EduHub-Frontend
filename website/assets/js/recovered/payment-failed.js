
    'use strict';
    // Static design implementation. No payment is processed, retried or verified.
    (() => {
      const $ = (id) => document.getElementById(id);
      const menu = $('mobileMenu');
      const menuBackdrop = $('menuBackdrop');
      const menuButton = $('mobileMenuButton');
      const notice = $('routeNotice');
      const noticeBackdrop = $('noticeBackdrop');
      let restoreFocusTo = null;

      function setMenu(open, focusOnClose = true) {
        menu.hidden = !open;
        menuBackdrop.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) menu.focus();
        else if (focusOnClose) menuButton.focus();
      }
      function closeNotice() {
        notice.hidden = true;
        noticeBackdrop.hidden = true;
        document.body.style.overflow = '';
        if (restoreFocusTo && restoreFocusTo.isConnected) restoreFocusTo.focus();
        restoreFocusTo = null;
      }
      function showNotice(feature) {
        if (!menu.hidden) setMenu(false, false);
        restoreFocusTo = document.activeElement;
        $('routeNoticeTitle').textContent = feature === 'Retry checkout' ? 'Checkout integration required' : `${feature} — coming soon`;
        $('routeNoticeBody').textContent = feature === 'Retry checkout'
          ? 'The Checkout screen and payment service have not been connected yet. No new payment attempt was started or charged.'
          : `The ${feature} screen has not been implemented in this EduHub frontend yet. This payment outcome is sample data only.`;
        notice.hidden = false;
        noticeBackdrop.hidden = false;
        document.body.style.overflow = 'hidden';
        notice.focus();
      }

      menuButton.addEventListener('click', () => setMenu(menu.hidden));
      $('closeMenuButton').addEventListener('click', () => setMenu(false));
      menuBackdrop.addEventListener('click', () => setMenu(false));
      document.querySelectorAll('[data-unbuilt]').forEach((target) => {
        target.addEventListener('click', (event) => {
          event.preventDefault();
          showNotice(target.dataset.unbuilt || 'Requested');
        });
      });
      $('closeNoticeButton').addEventListener('click', closeNotice);
      $('noticeOkButton').addEventListener('click', closeNotice);
      noticeBackdrop.addEventListener('click', closeNotice);
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          if (!notice.hidden) closeNotice();
          else if (!menu.hidden) setMenu(false);
        }
      });
    })();
  