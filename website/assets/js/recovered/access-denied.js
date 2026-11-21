
    'use strict';
    // Navigation remains safe until the Student Dashboard/Notifications pages are built.
    (() => {
      // Ensure the visible interface retains its icons when offline.
      document.fonts.ready.then(() => {
        const icon = document.querySelector('.brand-icon i');
        const pseudo = window.getComputedStyle(icon, '::before').content;
        const fontLoaded = document.fonts.check('900 20px "Font Awesome 6 Free"');
        document.documentElement.classList.toggle('fa-fallback', !pseudo || pseudo === 'none' || pseudo === 'normal' || !fontLoaded);
      });
      const menu = document.getElementById('mobileMenu');
      const notice = document.getElementById('pendingDialog');
      const menuButton = document.getElementById('menuToggle');
      const noticeText = document.getElementById('pendingDescription');
      const closeMenu = () => { if (menu.open) menu.close(); };
      const closeNotice = () => { if (notice.open) notice.close(); };

      menuButton.addEventListener('click', () => menu.showModal());
      document.getElementById('menuClose').addEventListener('click', closeMenu);
      document.getElementById('pendingClose').addEventListener('click', closeNotice);
      document.getElementById('pendingCloseIcon').addEventListener('click', closeNotice);
      [menu, notice].forEach(dialog => dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
      }));
      document.addEventListener('click', event => {
        const link = event.target.closest('[data-pending]');
        if (!link) return;
        event.preventDefault();
        const route = link.dataset.pending || 'This page';
        closeMenu();
        noticeText.textContent = `${route} is not implemented in this set of EduHub frontend screens yet. You can return to the Homepage or Student Profile.`;
        notice.showModal();
      });
    })();
  