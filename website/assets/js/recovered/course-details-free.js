
    /* ============================================================
       Interactions: preview, enrollment notice, menu, and navigation
       No mocked successful enrollment, payment, or course playback.
       ============================================================ */
    (() => {
      'use strict';
      const byId = id => document.getElementById(id);
      const previewDialog = byId('previewDialog');
      const enrollmentDialog = byId('enrollmentDialog');
      const menuDialog = byId('menuDialog');
      const toast = byId('toast');
      const openDialog = dialog => {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open','');
      };
      document.querySelectorAll('[data-open-preview]').forEach(button => button.addEventListener('click', () => openDialog(previewDialog)));
      byId('enrollFreeButton').addEventListener('click', () => openDialog(enrollmentDialog));
      byId('menuOpen').addEventListener('click', () => openDialog(menuDialog));
      document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => {
        const dialog = byId(button.dataset.close);
        if (dialog?.open && typeof dialog.close === 'function') dialog.close();
        else dialog?.removeAttribute('open');
      }));
      document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
      }));
      document.querySelectorAll('[data-notice]').forEach(button => button.addEventListener('click', () => {
        toast.textContent = button.dataset.notice;
        toast.hidden = false;
      }));
      document.addEventListener('keydown', event => { if (event.key === 'Escape') toast.hidden = true; });
      toast.addEventListener('click', () => { toast.hidden = true; });
      // Integration point: POST /api/enrollments with authenticated user + course ID.
      // Only after a verified API response should the app navigate to Course Learning.
    })();
  