
    'use strict';
    /* Navigation only: no payment API, transaction, enrolment mutation or automatic redirects. */
    const menuButton = document.getElementById('menuButton');
    const dialog = document.getElementById('navDialog');
    const closeButton = document.getElementById('closeMenuButton');
    menuButton.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  