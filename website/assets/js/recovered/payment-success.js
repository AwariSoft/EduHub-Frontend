
    'use strict';
    // No payment processing or verification occurs on this static UI.
    (() => {
      const byId = (id) => document.getElementById(id);
      const menu = byId('mobileMenu');
      const menuBackdrop = byId('menuBackdrop');
      const menuButton = byId('mobileMenuButton');
      const notice = byId('routeNotice');
      const noticeBackdrop = byId('noticeBackdrop');
      let previouslyFocused = null;

      function toggleMenu(open) {
        menu.hidden = !open;
        menuBackdrop.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) menu.focus(); else menuButton.focus();
      }
      menuButton.addEventListener('click', () => toggleMenu(menu.hidden));
      byId('closeMenuButton').addEventListener('click', () => toggleMenu(false));
      menuBackdrop.addEventListener('click', () => toggleMenu(false));

      function closeNotice() {
        notice.hidden = true;
        noticeBackdrop.hidden = true;
        document.body.style.overflow = '';
        if (previouslyFocused?.focus) previouslyFocused.focus();
        previouslyFocused = null;
      }
      function showNotice(feature) {
        if (!menu.hidden) {
          menu.hidden = true;
          menuBackdrop.hidden = true;
          menuButton.setAttribute('aria-expanded', 'false');
        }
        previouslyFocused = document.activeElement;
        byId('routeNoticeTitle').textContent = `${feature} — not implemented yet`;
        byId('routeNoticeBody').textContent = `The ${feature} screen is part of the EduHub Figma project, but its HTML page has not been built yet. This is a sample confirmation, not proof of a completed payment.`;
        notice.hidden = false;
        noticeBackdrop.hidden = false;
        document.body.style.overflow = 'hidden';
        notice.focus();
      }
      document.querySelectorAll('[data-unbuilt]').forEach((control) => {
        control.addEventListener('click', (event) => {
          event.preventDefault();
          showNotice(control.dataset.unbuilt || 'Requested');
        });
      });
      byId('closeNoticeButton').addEventListener('click', closeNotice);
      byId('noticeOkButton').addEventListener('click', closeNotice);
      noticeBackdrop.addEventListener('click', closeNotice);
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!notice.hidden) closeNotice();
        else if (!menu.hidden) toggleMenu(false);
      });
    })();
  